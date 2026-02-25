import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  content: string;
  image: string;
  rating: number;
}

export default function Testimonials() {
  const [testimonials] = useState<Testimonial[]>([
    {
      id: 1,
      name: 'محمد السويحلي',
      position: 'مدير سلسلة متاجر الغذاء',
      content: 'شراكتنا مع الشركة الليبية للغذاء ممتدة لأكثر من 5 سنوات، ونحن نعتبرهم الركيزة الأساسية في توفير المنتجات عالية الجودة لعملائنا.',
      image: '/client-1.jpg',
      rating: 5
    },
    {
      id: 2,
      name: 'سارة محمود',
      position: 'مديرة مشتريات مجموعة الفنادق',
      content: 'الالتزام بالمواعيد والجودة هو ما يميز هذه الشركة. لم يسبق وأن تأخرت أي شحنة طلبتها، والمنتجات دائماً طازجة.',
      image: '/client-2.jpg',
      rating: 5
    },
    {
      id: 3,
      name: 'عمر مختار',
      position: 'صاحب مصنع للمخبوزات',
      content: 'الدقيق الذي توفره الشركة هو الأفضل في السوق. الجودة مستقرة وهذا ما يساعدنا في الحفاظ على مستوى إنتاجنا.',
      image: '/client-3.jpg',
      rating: 5
    }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-gray-50 overflow-hidden min-h-[500px]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-3xl" />
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
              آراء العملاء
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4"
            >
              ماذا يقول
              <span className="text-green"> عملاؤنا</span> عنا
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              نفخر بثقة عملائنا وشركائنا فينا
            </motion.p>
          </div>

          {/* Testimonials Slider */}
          <div className="relative max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative bg-white rounded-3xl p-8 md:p-12 shadow-card"
            >
              <div className="absolute -top-6 right-8 w-12 h-12 bg-gradient-to-br from-green to-green-dark rounded-xl flex items-center justify-center shadow-food">
                <Quote className="w-6 h-6 text-white" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonials[currentIndex]?.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-orange text-orange" />
                    ))}
                  </div>

                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
                    "{testimonials[currentIndex]?.content}"
                  </p>

                  <div className="flex flex-col items-center">
                    <motion.img
                      src={testimonials[currentIndex]?.image || '/placeholder-avatar.jpg'}
                      alt={testimonials[currentIndex]?.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-green/20 mb-4"
                      whileHover={{ scale: 1.1 }}
                    />
                    <h4 className="text-lg font-bold text-dark">
                      {testimonials[currentIndex]?.name}
                    </h4>
                    <p className="text-gray-500">
                      {testimonials[currentIndex]?.position}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
                <motion.button
                  onClick={prevTestimonial}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-dark hover:text-green hover:shadow-xl transition-all pointer-events-auto"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
                <motion.button
                  onClick={nextTestimonial}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-dark hover:text-green hover:shadow-xl transition-all pointer-events-auto"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-green w-8' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>

          {/* Client Logos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20"
          >
            <p className="text-center text-gray-500 mb-8">نفتخر بخدمة أكثر من 500 عميل</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
              {['مطعم الشام', 'بقالة الأمل', 'فندق القصر', 'مصنع النور', 'سوبرماركت السلام'].map((client, index) => (
                <motion.div
                  key={index}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  className="text-xl font-bold text-gray-400 hover:text-green transition-colors cursor-pointer"
                >
                  {client}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      </div>
    </section>
  );
}
