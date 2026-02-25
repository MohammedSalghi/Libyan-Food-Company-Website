import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2 } from 'lucide-react';
import api from '../api/axios';

interface ContentItem {
  value: string;
  type: string;
  updated_at: string;
}

interface ContentSection {
  [key: string]: ContentItem;
}

interface SiteContent {
  [section: string]: ContentSection;
}

const contentStructure = {
  hero: {
    title: { label: 'العنوان الرئيسي', type: 'text' },
    subtitle: { label: 'العنوان الفرعي', type: 'text' },
    cta_text: { label: 'نص زر الدعوة', type: 'text' },
    stats_experience: { label: 'سنوات الخبرة', type: 'text' },
    stats_clients: { label: 'عدد العملاء', type: 'text' },
    stats_shipments: { label: 'عدد الشحنات', type: 'text' },
  },
  about: {
    title: { label: 'عنوان من نحن', type: 'text' },
    description: { label: 'وصف من نحن', type: 'textarea' },
    experience_years: { label: 'سنوات الخبرة', type: 'text' },
  },
  contact: {
    address: { label: 'العنوان', type: 'text' },
    phone: { label: 'رقم الهاتف', type: 'text' },
    email: { label: 'البريد الإلكتروني', type: 'text' },
    working_hours: { label: 'ساعات العمل', type: 'text' },
  },
};

export default function ContentManager() {
  const [content, setContent] = useState<SiteContent>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await api.get('/content');
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (section: string, key: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: {
          ...prev[section]?.[key],
          value,
        },
      },
    }));
  };

  const handleSave = async (section: string, key: string) => {
    setSaving(true);
    setMessage('');
    try {
      const value = content[section]?.[key]?.value || '';
      await api.put(`/content/${section}/${key}`, { value });
      setMessage('تم الحفظ بنجاح!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving content:', error);
      setMessage('حدث خطأ أثناء الحفظ');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-green" />
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-dark mb-2">إدارة المحتوى</h1>
        <p className="text-gray-500">تعديل محتوى الموقع الرئيسي</p>
      </motion.div>

      {/* Success Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-xl ${
            message.includes('نجاح') ? 'bg-green/10 text-green' : 'bg-red/10 text-red'
          }`}
        >
          {message}
        </motion.div>
      )}

      {/* Content Sections */}
      <div className="space-y-8">
        {Object.entries(contentStructure).map(([section, fields], sectionIndex) => (
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-card"
          >
            <h2 className="text-xl font-bold text-dark mb-6 capitalize">
              {section === 'hero' && 'الصفحة الرئيسية'}
              {section === 'about' && 'قسم من نحن'}
              {section === 'contact' && 'معلومات التواصل'}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(fields).map(([key, field]) => (
                <div key={key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <div className="flex gap-3">
                    {field.type === 'textarea' ? (
                      <textarea
                        value={content[section]?.[key]?.value || ''}
                        onChange={(e) => handleChange(section, key, e.target.value)}
                        rows={4}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-green focus:ring-2 focus:ring-green/20 transition-all outline-none resize-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={content[section]?.[key]?.value || ''}
                        onChange={(e) => handleChange(section, key, e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-green focus:ring-2 focus:ring-green/20 transition-all outline-none"
                      />
                    )}
                    <motion.button
                      onClick={() => handleSave(section, key)}
                      disabled={saving}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-3 rounded-xl bg-green text-white hover:bg-green-dark transition-colors disabled:opacity-50"
                    >
                      {saving ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Save className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
