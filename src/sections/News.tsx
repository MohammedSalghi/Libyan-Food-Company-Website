import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, ArrowLeft, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  categoryColor: string;
  author: string;
  date: string;
  readTime: string;
  is_featured: boolean;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: 'توسيع شبكة الموردين العالمية',
    excerpt: 'أعلنت الشركة اليوم عن توقيع اتفاقيات جديدة مع موردين رائدين في أمريكا اللاتينية لضمان استقرار إمدادات الحبوب.',
    image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&q=80',
    category: 'إنجازات',
    categoryColor: 'bg-green text-white',
    author: 'الإدارة العامة',
    date: '15 مايو 2024',
    readTime: '5 دقائق',
    is_featured: true,
  },
  {
    id: 2,
    title: 'إطلاق تطبيق "شريك الغذاء" للموزعين',
    excerpt: 'نظام رقمي جديد يتيح للموزعين تتبع طلباتهم وشحناتهم بشكل لحظي وتسهيل التعاملات المالية.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    category: 'تكنولوجيا',
    categoryColor: 'bg-orange text-white',
    author: 'قسم التطوير الرقمي',
    date: '10 مايو 2024',
    readTime: '4 دقائق',
    is_featured: false,
  },
  {
    id: 3,
    title: 'الشركة تحصد جائزة الجودة العالمية',
    excerpt: 'تم منح شركتنا شهادة الأيزو العالمية في جودة الخدمات اللوجستية وتخزين المواد الغذائية.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
    category: 'جوائز',
    categoryColor: 'bg-blue-500 text-white',
    author: 'مكتب الإعلام',
    date: '2 مايو 2024',
    readTime: '6 دقائق',
    is_featured: false,
  },
];

export default function News() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const navigate = useNavigate();

  const featuredNews = newsData.find((item) => item.is_featured);
  const regularNews = newsData.filter((item) => !item.is_featured).slice(0, 2);

  return (
    <section
      id="news"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div className="text-right mb-6 md:mb-0">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 rounded-full bg-orange/10 text-orange font-semibold text-sm mb-4"
            >
              أخبارنا ومقالاتنا
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark"
            >
              آخر <span className="text-orange">الأخبار</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 text-sm"
          >
            انقر على أي خبر لقراءة المقال كاملاً
          </motion.p>
        </div>

        {/* News Grid */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Featured Article */}
          {featuredNews && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              onClick={() => navigate(`/news/${featuredNews.id}`)}
              className="group relative lg:row-span-2 cursor-pointer"
            >
              <div className="relative h-full bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500">
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  <motion.img
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className={`absolute top-4 right-4 px-4 py-1 rounded-full text-sm font-semibold shadow ${featuredNews.categoryColor}`}>
                    {featuredNews.category}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                    {featuredNews.readTime} للقراءة
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredNews.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{featuredNews.author}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-dark mb-3 group-hover:text-green transition-colors">
                    {featuredNews.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{featuredNews.excerpt}</p>
                  <motion.div whileHover={{ x: -5 }} className="inline-flex items-center gap-2 text-green font-semibold">
                    <span>اقرأ المزيد</span>
                    <ArrowLeft className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Secondary Articles */}
          {regularNews.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 * (index + 1) }}
              onClick={() => navigate(`/news/${article.id}`)}
              className="group cursor-pointer"
            >
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative sm:w-2/5 h-48 sm:h-auto overflow-hidden">
                    <motion.img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.07 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold shadow ${article.categoryColor}`}>
                      {article.category}
                    </div>
                  </div>
                  <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{article.date}</span>
                        </div>
                        <span className="text-gray-300">·</span>
                        <span className="text-xs text-gray-400">{article.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-dark mb-2 group-hover:text-green transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{article.excerpt}</p>
                    </div>
                    <motion.div whileHover={{ x: -5 }} className="inline-flex items-center gap-2 text-green font-semibold text-sm mt-4">
                      <span>اقرأ المزيد</span>
                      <ArrowLeft className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-green to-green-dark rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">اشترك في نشرتنا الإخبارية</h3>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">احصل على آخر الأخبار والعروض الخاصة مباشرة إلى بريدك الإلكتروني</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-1 px-6 py-4 rounded-full text-dark placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-orange text-white font-bold hover:bg-orange-dark transition-colors"
            >
              اشترك الآن
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
