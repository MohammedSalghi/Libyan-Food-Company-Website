import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Calendar, Package, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const projects = [
  {
    id: 1,
    title: 'مشروع الأمن الغذائي الوطني',
    description: 'تأمين احتياجات السوق الليبي من الدقيق والحبوب الأساسية على مدار 12 شهراً.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    location: 'طرابلس، بنغازي، مصراتة',
    date: 'يناير 2024',
    qty: '+500K طن',
    tag: 'حبوب واستيراد',
    accent: 'from-orange to-amber-400',
    tagBg: 'bg-orange/10 text-orange',
    enterFrom: { opacity: 0, x: -80, y: 40 },
  },
  {
    id: 2,
    title: 'تجهيز مستودعات الخمس المطورة',
    description: 'تطوير وتجهيز أكبر مستودع مبرد في المنطقة الغربية بأحدث أنظمة التبريد.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    location: 'الخمس، ليبيا',
    date: 'مارس 2024',
    qty: '7,500 M²',
    tag: 'بنية تحتية',
    accent: 'from-green to-emerald-400',
    tagBg: 'bg-green/10 text-green',
    enterFrom: { opacity: 0, y: 80 },
  },
  {
    id: 3,
    title: 'توريد الزيوت النباتية للسوق',
    description: 'توريد 100 ألف عبوة زيت نباتي عالي الجودة بأسعار تنافسية.',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
    location: 'الموانئ الليبية',
    date: 'مايو 2024',
    qty: '100K عبوة',
    tag: 'زيوت وسلع',
    accent: 'from-blue-500 to-blue-400',
    tagBg: 'bg-blue-500/10 text-blue-600',
    enterFrom: { opacity: 0, x: 80, y: 40 },
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const navigate = useNavigate();

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-gray-50 overflow-hidden"
    >
      {/* Animated background blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.09, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-orange rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-green rounded-full blur-[100px] pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, type: 'spring', stiffness: 260, damping: 18 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white shadow-sm border border-orange/20 mb-6"
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-orange"
            />
            <span className="text-dark font-black text-[11px] uppercase tracking-[0.2em]">أبرز مشاريعنا</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-dark mb-5 leading-tight"
          >
            إنجازات <span className="text-orange">نفخر</span> بها
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed"
          >
            انقر على أي مشروع لعرض تفاصيله الكاملة
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={project.enterFrom}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.1 * index,
                type: 'spring',
                stiffness: 75,
                damping: 16,
              }}
              whileHover={{ y: -12, transition: { type: 'spring', stiffness: 300, damping: 18 } }}
              onClick={() => navigate(`/projects/${project.id}`)}
              className="group bg-white rounded-3xl overflow-hidden cursor-pointer"
              style={{ boxShadow: '0 4px 28px 0 rgba(0,0,0,0.08)' }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                />
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-t ${project.accent} mix-blend-multiply`}
                  initial={{ opacity: 0.25 }}
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Qty badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.35 + index * 0.12, type: 'spring', stiffness: 280 }}
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl px-3 py-1.5 flex items-center gap-2 shadow-md"
                >
                  <Package size={13} className="text-orange" />
                  <span className="text-xs font-black text-dark">{project.qty}</span>
                </motion.div>

                {/* Tag */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-sm bg-white/80 ${project.tagBg}`}>
                  {project.tag}
                </div>

                {/* Hover arrow */}
                <motion.div
                  initial={{ opacity: 0, x: 14, y: -14 }}
                  whileHover={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className="absolute top-4 right-4 w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-lg"
                >
                  <ArrowUpRight size={17} className="text-dark" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-7 space-y-4">
                <h3 className="text-lg font-black text-dark group-hover:text-orange transition-colors duration-300 leading-snug">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* Progress bar */}
                <div className="h-[3px] w-full rounded-full bg-gray-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${65 + index * 12}%` } : {}}
                    transition={{ duration: 1.4, delay: 0.45 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className={`h-full rounded-full bg-gradient-to-r ${project.accent}`}
                  />
                </div>

                {/* Meta */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-bold">
                  <div className="flex items-center gap-1">
                    <MapPin size={12} className="text-orange" />
                    <span className="truncate max-w-[110px]">{project.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={12} className="text-green" />
                    <span>{project.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
