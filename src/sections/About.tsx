import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, Award, Users, TrendingUp } from 'lucide-react';
import api from '../api/axios';

interface AboutContent {
  title: string;
  description: string;
  experience_years: string;
}

const features = [
  { icon: CheckCircle, text: 'جودة عالية مضمونة 100%' },
  { icon: Award, text: 'شهادات معتمدة دولياً' },
  { icon: Users, text: 'فريق متخصص ومحترف' },
  { icon: TrendingUp, text: 'نمو مستمر وتطوير' },
];

export default function About() {
  const [content, setContent] = useState<AboutContent>({
    title: 'شركة ليبية متخصصة في استيراد المواد الغذائية',
    description: 'نركز على الجودة والموثوقية في كل شحنة. نعمل مع شبكة عالمية من الموردين لنقدم لعملائنا الأفضل دائماً.',
    experience_years: '15',
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await api.get('/content/about');
      const data = response.data;
      setContent({
        title: data.title?.value || content.title,
        description: data.description?.value || content.description,
        experience_years: data.experience_years?.value || content.experience_years,
      });
    } catch (error) {
      console.error('Error fetching about content:', error);
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div ref={imageRef} className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src="/about-warehouse.jpg"
                  alt="مستودع الشركة"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>

              {/* Experience Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-8 -right-8 bg-gradient-to-br from-green to-green-dark text-white rounded-2xl p-6 shadow-food"
              >
                <div className="text-5xl font-bold mb-1">{content.experience_years}+</div>
                <div className="text-white/90">سنة من الخبرة</div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -top-4 -left-4 w-24 h-24 border-4 border-orange/30 rounded-2xl"
              />
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2 text-right">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-green/10 text-green font-semibold text-sm mb-4">
                من نحن
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6 leading-tight"
            >
              {content.title.split('استيراد')[0]}
              <span className="text-green"> استيراد المواد الغذائية</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 mb-8 leading-relaxed"
            >
              {content.description}
            </motion.p>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-green/5 transition-colors"
                >
                  <feature.icon className="w-5 h-5 text-green flex-shrink-0" />
                  <span className="text-sm font-medium text-dark">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-orange text-white font-bold shadow-orange hover:shadow-lg transition-shadow"
              >
                <span>اكتشف خدماتنا</span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
