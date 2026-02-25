#!/usr/bin/env python3
"""
Backend API for Libyan Food Company Website
Using Flask, SQLite, and JWT Authentication
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import sqlite3
import os
import json
from datetime import datetime
import uuid

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'libyan-food-company-secret-key-2024'
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

CORS(app)
jwt = JWTManager(app)

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(os.path.join(app.config['UPLOAD_FOLDER'], 'images'), exist_ok=True)

# Database initialization
def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT DEFAULT 'admin',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Site content table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS site_content (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            section TEXT NOT NULL,
            key TEXT NOT NULL,
            value TEXT,
            type TEXT DEFAULT 'text',
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(section, key)
        )
    ''')
    
    # Services table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            icon TEXT,
            color TEXT,
            order_num INTEGER DEFAULT 0,
            is_active BOOLEAN DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Projects table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            image TEXT,
            location TEXT,
            date TEXT,
            weight TEXT,
            order_num INTEGER DEFAULT 0,
            is_active BOOLEAN DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Testimonials table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS testimonials (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            position TEXT,
            content TEXT,
            image TEXT,
            rating INTEGER DEFAULT 5,
            order_num INTEGER DEFAULT 0,
            is_active BOOLEAN DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # News table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS news (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            excerpt TEXT,
            content TEXT,
            image TEXT,
            category TEXT,
            author TEXT,
            date TEXT,
            is_featured BOOLEAN DEFAULT 0,
            is_active BOOLEAN DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Contact messages table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS contact_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            message TEXT NOT NULL,
            is_read BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Insert default admin user if not exists
    cursor.execute("SELECT * FROM users WHERE username = 'admin'")
    if not cursor.fetchone():
        password_hash = generate_password_hash('admin123')
        cursor.execute('''
            INSERT INTO users (username, email, password_hash, role)
            VALUES (?, ?, ?, ?)
        ''', ('admin', 'admin@foodcompany.ly', password_hash, 'admin'))
    
    # Insert default content
    default_content = [
        ('hero', 'title', 'أفضل الحلول لاستيراد المواد الغذائية', 'text'),
        ('hero', 'subtitle', 'نوفر منتجات غذائية عالية الجودة للمؤسسات والمتاجر المحلية', 'text'),
        ('hero', 'cta_text', 'تواصل معنا', 'text'),
        ('hero', 'stats_experience', '15', 'text'),
        ('hero', 'stats_clients', '500', 'text'),
        ('hero', 'stats_shipments', '1000', 'text'),
        ('about', 'title', 'شركة ليبية متخصصة في استيراد المواد الغذائية', 'text'),
        ('about', 'description', 'نركز على الجودة والموثوقية في كل شحنة. نعمل مع شبكة عالمية من الموردين لنقدم لعملائنا الأفضل دائماً.', 'text'),
        ('about', 'experience_years', '15', 'text'),
        ('contact', 'address', 'طرابلس، ليبيا - شارع الجمهورية', 'text'),
        ('contact', 'phone', '+218 91 234 5678', 'text'),
        ('contact', 'email', 'info@foodcompany.ly', 'text'),
        ('contact', 'working_hours', 'السبت - الخميس: 8ص - 5م', 'text'),
    ]
    
    for section, key, value, type_ in default_content:
        cursor.execute('''
            INSERT OR IGNORE INTO site_content (section, key, value, type)
            VALUES (?, ?, ?, ?)
        ''', (section, key, value, type_))
    
    # Insert default services
    cursor.execute("SELECT COUNT(*) FROM services")
    if cursor.fetchone()[0] == 0:
        default_services = [
            ('استيراد المواد الأساسية', 'نحن متخصصون في استيراد السلع الغذائية الأساسية مثل الدقيق، السكر، والزيوت النباتية بأعلى معايير الجودة العالمية.', 'Wheat', 'from-yellow-400 to-yellow-600', 1),
            ('منتجات الألبان والأجبان', 'توفير تشكيلة واسعة من أجود أنواع الألبان والأجبان المستوردة من أرقى المزارع العالمية.', 'Milk', 'from-blue-400 to-blue-600', 2),
            ('الاستيراد والتصدير المخصص', 'حلول مخصصة للشركات والمصانع الراغبة في استيراد مواد خام غذائية محددة.', 'Package', 'from-orange-400 to-orange-600', 3),
            ('حلول النقل اللوجستي', 'أسطول مجهز ونظام تتبع متكامل لضمان وصول الشحنات في وقتها وبحالته الممتازة.', 'Truck', 'from-green-400 to-green-600', 4),
            ('التخزين المبرد والجاف', 'مستودعات حديثة مجهزة بأحدث أنظمة التبريد والتحكم في الحرارة لضمان سلامة الأغذية.', 'Warehouse', 'from-purple-400 to-purple-600', 5),
            ('استشارات السوق الغذائي', 'دراسات سوقية وافية وتحليلات لمساعدة شركائنا على اتخاذ أفضل قرارات الشراء.', 'Lightbulb', 'from-red-400 to-red-600', 6)
        ]
        cursor.executemany('''
            INSERT INTO services (title, description, icon, color, order_num)
            VALUES (?, ?, ?, ?, ?)
        ''', default_services)

    # Insert default projects
    cursor.execute("SELECT COUNT(*) FROM projects")
    if cursor.fetchone()[0] == 0:
        default_projects = [
            ('شحنة الدقيق الكبرى 2024', 'تأمين 250,000 طن من أجود أنواع الدقيق لتلبية احتياجات السوق المحلي.', '/project-2.jpg', 'طرابلس، بنغازي', 'يناير 2024', '250K Ton', 1),
            ('تجهيز مستودعات طرابلس المركزية', 'تطوير وتجهيز أكبر مستودع مبرد في المنطقة الغربية بأحدث التقنيات.', '/project-3.jpg', 'طرابلس - قصر بن غشير', 'مارس 2024', 'M² 5000', 2),
            ('اتفاقية توريد منتجات الألبان', 'توقيع اتفاقية حصرية مع كبار المنتجين الأوروبيين لتوريد أجود أنواع الأجبان.', '/project-4.jpg', 'الخمس، مصراتة', 'مايو 2024', '150 Containers', 3)
        ]
        cursor.executemany('''
            INSERT INTO projects (title, description, image, location, date, weight, order_num)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', default_projects)

    # Insert default testimonials
    cursor.execute("SELECT COUNT(*) FROM testimonials")
    if cursor.fetchone()[0] == 0:
        default_testimonials = [
            ('محمد السويحلي', 'مدير سلسلة متاجر الغذاء', 'شراكتنا مع الشركة الليبية للغذاء ممتدة لأكثر من 5 سنوات، ونحن نعتبرهم الركيزة الأساسية في توفير المنتجات عالية الجودة لعملائنا.', '/client-1.jpg', 5, 1),
            ('سارة محمود', 'مديرة مشتريات مجموعة الفنادق', 'الالتزام بالمواعيد والجودة هو ما يميز هذه الشركة. لم يسبق وأن تأخرت أي شحنة طلبتها، والمنتجات دائماً طازجة.', '/client-2.jpg', 5, 2),
            ('عمر مختار', 'صاحب مصنع للمخبوزات', 'الدقيق الذي توفره الشركة هو الأفضل في السوق. الجودة مستقرة وهذا ما يساعدنا في الحفاظ على مستوى إنتاجنا.', '/client-3.jpg', 5, 3)
        ]
        cursor.executemany('''
            INSERT INTO testimonials (name, position, content, image, rating, order_num)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', default_testimonials)

    # Insert default news
    cursor.execute("SELECT COUNT(*) FROM news")
    if cursor.fetchone()[0] == 0:
        default_news = [
            ('توسيع شبكة الموردين العالمية', 'أعلنت الشركة اليوم عن توقيع اتفاقيات جديدة مع موردين رائدين في أمريكا اللاتينية لضمان استقرار إمدادات الحبوب.', 'وقعت الشركة الليبية للغذاء سلسلة من مذكرات التفاهم مع كبار منتجي الصويا والذرة في البرازيل والأرجنتين. تأتي هذه الخطوة في إطار خطة استراتيجية لتعزيز الأمن الغذائي وتنويع مصادر الاستيراد لضمان أفضل الأسعار والجودة للمستهلك الليبي.', '/hero-bg.jpg', 'إنجازات', 'الإدارة العامة', '2024-05-15', 1),
            ('إطلاق تطبيق "شريك الغذاء" للموزعين', 'نظام رقمي جديد يتيح للموزعين تتبع طلباتهم وشحناتهم بشكل لحظي وتسهيل التعاملات المالية.', 'في خطوة نحو التحول الرقمي، أطلقت الشركة تطبيقها الجديد المخصص لشركائها التجاريين والموزعين، والذي يهدف إلى تبسيط عملية الطلب وتوفير شفافية كاملة في سلسلة الإمداد.', '/news-2.jpg', 'تكنولوجيا', 'قسم التطوير الرقمي', '2024-05-10', 0),
            ('الشركة تحصد جائزة الجودة العالمية', 'تم منح شركتنا شهادة الأيزو العالمية في جودة الخدمات اللوجستية وتخزين المواد الغذائية.', 'بعد فحوصات دقيقة وتدقيق شامل، حصلت الشركة الليبية للغذاء على شهادة الجودة الدولية، مما يؤكد التزامنا بأعلى المعايير العالمية في التعامل مع المواد الغذائية وتخزينها.', '/news-3.jpg', 'جوائز', 'مكتب الإعلام', '2024-05-02', 0)
        ]
        cursor.executemany('''
            INSERT INTO news (title, excerpt, content, image, category, author, date, is_featured)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', default_news)

    conn.commit()
    conn.close()
    print("Database initialized successfully!")

# Helper function to get database connection
def get_db():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

# ==================== AUTH ROUTES ====================

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
    user = cursor.fetchone()
    conn.close()
    
    if user and check_password_hash(user['password_hash'], password):
        access_token = create_access_token(identity=user['username'])
        return jsonify({
            'access_token': access_token,
            'user': {
                'username': user['username'],
                'email': user['email'],
                'role': user['role']
            }
        })
    
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/auth/me', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user = get_jwt_identity()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT username, email, role FROM users WHERE username = ?', (current_user,))
    user = cursor.fetchone()
    conn.close()
    
    if user:
        return jsonify(dict(user))
    return jsonify({'error': 'User not found'}), 404

# ==================== CONTENT ROUTES ====================

@app.route('/api/content', methods=['GET'])
def get_all_content():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM site_content')
    rows = cursor.fetchall()
    conn.close()
    
    content = {}
    for row in rows:
        section = row['section']
        if section not in content:
            content[section] = {}
        content[section][row['key']] = {
            'value': row['value'],
            'type': row['type'],
            'updated_at': row['updated_at']
        }
    
    return jsonify(content)

@app.route('/api/content/<section>', methods=['GET'])
def get_section_content(section):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM site_content WHERE section = ?', (section,))
    rows = cursor.fetchall()
    conn.close()
    
    content = {}
    for row in rows:
        content[row['key']] = {
            'value': row['value'],
            'type': row['type'],
            'updated_at': row['updated_at']
        }
    
    return jsonify(content)

@app.route('/api/content/<section>/<key>', methods=['PUT'])
@jwt_required()
def update_content(section, key):
    data = request.get_json()
    value = data.get('value')
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO site_content (section, key, value, updated_at)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(section, key) DO UPDATE SET
        value = excluded.value,
        updated_at = excluded.updated_at
    ''', (section, key, value, datetime.now()))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Content updated successfully'})

# ==================== SERVICES ROUTES ====================

@app.route('/api/services', methods=['GET'])
def get_services():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM services WHERE is_active = 1 ORDER BY order_num')
    rows = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

@app.route('/api/services', methods=['POST'])
@jwt_required()
def create_service():
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO services (title, description, icon, color, order_num)
        VALUES (?, ?, ?, ?, ?)
    ''', (data.get('title'), data.get('description'), data.get('icon'), 
          data.get('color'), data.get('order_num', 0)))
    conn.commit()
    service_id = cursor.lastrowid
    conn.close()
    return jsonify({'id': service_id, 'message': 'Service created successfully'}), 201

@app.route('/api/services/<int:service_id>', methods=['PUT'])
@jwt_required()
def update_service(service_id):
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE services SET
        title = ?, description = ?, icon = ?, color = ?, order_num = ?, is_active = ?
        WHERE id = ?
    ''', (data.get('title'), data.get('description'), data.get('icon'),
          data.get('color'), data.get('order_num'), data.get('is_active', 1), service_id))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Service updated successfully'})

@app.route('/api/services/<int:service_id>', methods=['DELETE'])
@jwt_required()
def delete_service(service_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM services WHERE id = ?', (service_id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Service deleted successfully'})

# ==================== PROJECTS ROUTES ====================

@app.route('/api/projects', methods=['GET'])
def get_projects():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM projects WHERE is_active = 1 ORDER BY order_num')
    rows = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

@app.route('/api/projects', methods=['POST'])
@jwt_required()
def create_project():
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO projects (title, description, image, location, date, weight, order_num)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (data.get('title'), data.get('description'), data.get('image'),
          data.get('location'), data.get('date'), data.get('weight'), data.get('order_num', 0)))
    conn.commit()
    project_id = cursor.lastrowid
    conn.close()
    return jsonify({'id': project_id, 'message': 'Project created successfully'}), 201

@app.route('/api/projects/<int:project_id>', methods=['PUT'])
@jwt_required()
def update_project(project_id):
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE projects SET
        title = ?, description = ?, image = ?, location = ?, date = ?, weight = ?, order_num = ?, is_active = ?
        WHERE id = ?
    ''', (data.get('title'), data.get('description'), data.get('image'),
          data.get('location'), data.get('date'), data.get('weight'),
          data.get('order_num'), data.get('is_active', 1), project_id))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Project updated successfully'})

@app.route('/api/projects/<int:project_id>', methods=['DELETE'])
@jwt_required()
def delete_project(project_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM projects WHERE id = ?', (project_id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Project deleted successfully'})

# ==================== TESTIMONIALS ROUTES ====================

@app.route('/api/testimonials', methods=['GET'])
def get_testimonials():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM testimonials WHERE is_active = 1 ORDER BY order_num')
    rows = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

@app.route('/api/testimonials', methods=['POST'])
@jwt_required()
def create_testimonial():
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO testimonials (name, position, content, image, rating, order_num)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (data.get('name'), data.get('position'), data.get('content'),
          data.get('image'), data.get('rating', 5), data.get('order_num', 0)))
    conn.commit()
    testimonial_id = cursor.lastrowid
    conn.close()
    return jsonify({'id': testimonial_id, 'message': 'Testimonial created successfully'}), 201

@app.route('/api/testimonials/<int:testimonial_id>', methods=['PUT'])
@jwt_required()
def update_testimonial(testimonial_id):
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE testimonials SET
        name = ?, position = ?, content = ?, image = ?, rating = ?, order_num = ?, is_active = ?
        WHERE id = ?
    ''', (data.get('name'), data.get('position'), data.get('content'),
          data.get('image'), data.get('rating'), data.get('order_num'),
          data.get('is_active', 1), testimonial_id))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Testimonial updated successfully'})

@app.route('/api/testimonials/<int:testimonial_id>', methods=['DELETE'])
@jwt_required()
def delete_testimonial(testimonial_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM testimonials WHERE id = ?', (testimonial_id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Testimonial deleted successfully'})

# ==================== NEWS ROUTES ====================

@app.route('/api/news', methods=['GET'])
def get_news():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM news WHERE is_active = 1 ORDER BY created_at DESC')
    rows = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

@app.route('/api/news', methods=['POST'])
@jwt_required()
def create_news():
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO news (title, excerpt, content, image, category, author, date, is_featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (data.get('title'), data.get('excerpt'), data.get('content'),
          data.get('image'), data.get('category'), data.get('author'),
          data.get('date'), data.get('is_featured', 0)))
    conn.commit()
    news_id = cursor.lastrowid
    conn.close()
    return jsonify({'id': news_id, 'message': 'News created successfully'}), 201

@app.route('/api/news/<int:news_id>', methods=['PUT'])
@jwt_required()
def update_news(news_id):
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE news SET
        title = ?, excerpt = ?, content = ?, image = ?, category = ?, author = ?, date = ?, is_featured = ?, is_active = ?
        WHERE id = ?
    ''', (data.get('title'), data.get('excerpt'), data.get('content'),
          data.get('image'), data.get('category'), data.get('author'),
          data.get('date'), data.get('is_featured'), data.get('is_active', 1), news_id))
    conn.commit()
    conn.close()
    return jsonify({'message': 'News updated successfully'})

@app.route('/api/news/<int:news_id>', methods=['DELETE'])
@jwt_required()
def delete_news(news_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM news WHERE id = ?', (news_id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'News deleted successfully'})

# ==================== CONTACT MESSAGES ROUTES ====================

@app.route('/api/contact', methods=['POST'])
def submit_contact():
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO contact_messages (name, email, phone, message)
        VALUES (?, ?, ?, ?)
    ''', (data.get('name'), data.get('email'), data.get('phone'), data.get('message')))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Message sent successfully'}), 201

@app.route('/api/contact', methods=['GET'])
@jwt_required()
def get_contact_messages():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM contact_messages ORDER BY created_at DESC')
    rows = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

@app.route('/api/contact/<int:message_id>/read', methods=['PUT'])
@jwt_required()
def mark_message_read(message_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('UPDATE contact_messages SET is_read = 1 WHERE id = ?', (message_id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Message marked as read'})

@app.route('/api/contact/<int:message_id>', methods=['DELETE'])
@jwt_required()
def delete_message(message_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM contact_messages WHERE id = ?', (message_id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Message deleted successfully'})

# ==================== FILE UPLOAD ROUTES ====================

@app.route('/api/upload', methods=['POST'])
@jwt_required()
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    filename = secure_filename(file.filename)
    unique_filename = f"{uuid.uuid4()}_{filename}"
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], 'images', unique_filename)
    file.save(filepath)
    
    return jsonify({
        'filename': unique_filename,
        'url': f'/uploads/images/{unique_filename}'
    })

@app.route('/uploads/images/<filename>')
def serve_image(filename):
    return send_from_directory(os.path.join(app.config['UPLOAD_FOLDER'], 'images'), filename)

from flask import send_from_directory

# ==================== DASHBOARD STATS ====================

@app.route('/api/stats', methods=['GET'])
@jwt_required()
def get_stats():
    conn = get_db()
    cursor = conn.cursor()
    
    stats = {}
    
    cursor.execute('SELECT COUNT(*) as count FROM services WHERE is_active = 1')
    stats['services'] = cursor.fetchone()['count']
    
    cursor.execute('SELECT COUNT(*) as count FROM projects WHERE is_active = 1')
    stats['projects'] = cursor.fetchone()['count']
    
    cursor.execute('SELECT COUNT(*) as count FROM testimonials WHERE is_active = 1')
    stats['testimonials'] = cursor.fetchone()['count']
    
    cursor.execute('SELECT COUNT(*) as count FROM news WHERE is_active = 1')
    stats['news'] = cursor.fetchone()['count']
    
    cursor.execute('SELECT COUNT(*) as count FROM contact_messages WHERE is_read = 0')
    stats['unread_messages'] = cursor.fetchone()['count']
    
    cursor.execute('SELECT COUNT(*) as count FROM contact_messages')
    stats['total_messages'] = cursor.fetchone()['count']
    
    conn.close()
    return jsonify(stats)

# ==================== ERROR HANDLERS ====================

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# Initialize database on startup
init_db()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
