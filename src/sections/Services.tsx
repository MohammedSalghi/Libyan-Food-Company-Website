import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GlowingEffect } from '../components/ui/glowing-effect';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const iconMap: Record<string, string> = {
  'Wheat': '🌾',
  'Milk': '🥛',
  'Package': '📦',
  'Truck': '🚚',
  'Warehouse': '🏭',
  'Lightbulb': '💡',
};

export default function Services() {
  const [services] = useState<Service[]>([
    {
      id: 1,
      title: 'استيراد المواد الأساسية',
      description: 'نحن متخصصون في استيراد السلع الغذائية الأساسية مثل الدقيق، السكر، والزيوت النباتية بأعلى معايير الجودة العالمية.',
      icon: 'Wheat',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      id: 2,
      title: 'منتجات الألبان والأجبان',
      description: 'توفير تشكيلة واسعة من أجود أنواع الألبان والأجبان المستوردة من أرقى المزارع العالمية.',
      icon: 'Milk',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 3,
      title: 'الاستيراد والتصدير المخصص',
      description: 'حلول مخصصة للشركات والمصانع الراغبة في استيراد مواد خام غذائية محددة.',
      icon: 'Package',
      color: 'from-orange-400 to-orange-600'
    },
    {
      id: 4,
      title: 'حلول النقل اللوجستي',
      description: 'أسطول مجهز ونظام تتبع متكامل لضمان وصول الشحنات في وقتها وبحالته الممتازة.',
      icon: 'Truck',
      color: 'from-green-400 to-green-600'
    },
    {
      id: 5,
      title: 'التخزين المبرد والجاف',
      description: 'مستودعات حديثة مجهزة بأحدث أنظمة التبريد والتحكم في الحرارة لضمان سلامة الأغذية.',
      icon: 'Warehouse',
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 6,
      title: 'استشارات السوق الغذائي',
      description: 'دراسات سوقية وافية وتحليلات لمساعدة شركائنا على اتخاذ أفضل قرارات الشراء.',
      icon: 'Lightbulb',
      color: 'from-red-400 to-red-600'
    }
  ]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-gray-50 overflow-hidden min-h-[400px]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <>
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 rounded-full bg-green/10 text-green font-semibold text-sm mb-4"
            >
              خدماتنا
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4"
            >
              نقدم مجموعة متكاملة من
              <span className="text-green"> الخدمات</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              نغطي جميع مراحل سلسلة الإمداد الغذائي من الاستيراد إلى التوزيع
            </motion.p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group relative p-1 rounded-2xl transition-all duration-300"
              >
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={2}
                />

                <div className="relative h-full bg-white rounded-xl p-8 shadow-card group-hover:shadow-card-hover transition-all duration-300 overflow-hidden">
                  {/* Background Gradient on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="relative w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow text-4xl"
                  >
                    {iconMap[service.icon] || '✨'}
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-green transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Decorative Corner */}
                  <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <p className="text-gray-600 mb-4">هل تحتاج إلى خدمة مخصصة؟</p>
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-dark text-white font-bold hover:bg-dark/90 transition-colors"
            >
              <span>اطلب استشارة مجانية</span>
            </motion.a>
          </motion.div>
        </>
      </div>
    </section>
  );
}
