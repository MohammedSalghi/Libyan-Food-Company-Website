import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Loader2
} from 'lucide-react';
import api from '../api/axios';
import { WorldMap } from '../components/ui/world-map';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await api.post('/contact', formData);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'حدث خطأ أثناء إرسال الرسالة');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-gray-50 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full bg-green/10 text-green font-semibold text-sm mb-4"
          >
            تواصل معنا
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4"
          >
            نحن هنا <span className="text-green">لمساعدتك</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            تواصل معنا للاستفسارات أو لطلب عرض سعر
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1 space-y-4"
          >
            {[
              { icon: MapPin, title: 'العنوان', content: 'طرابلس، ليبيا - شارع الجمهورية', color: 'bg-green/10 text-green' },
              { icon: Phone, title: 'الهاتف', content: '+218 91 234 5678', color: 'bg-orange/10 text-orange' },
              { icon: Mail, title: 'البريد الإلكتروني', content: 'info@foodcompany.ly', color: 'bg-blue/10 text-blue' },
              { icon: Clock, title: 'ساعات العمل', content: 'السبت - الخميس: 8ص - 5م', color: 'bg-purple/10 text-purple' },
            ].map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ x: -5 }}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${info.color} flex items-center justify-center flex-shrink-0`}>
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-dark mb-1">{info.title}</h4>
                    <p className="text-gray-600">{info.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-card"
            >
              <h4 className="font-bold text-dark mb-4">تابعنا على</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card">
              <h3 className="text-2xl font-bold text-dark mb-6">أرسل لنا رسالة</h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10 }}
                    className="w-20 h-20 rounded-full bg-green/10 flex items-center justify-center mb-4"
                  >
                    <CheckCircle className="w-10 h-10 text-green" />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-dark mb-2">تم الإرسال بنجاح!</h4>
                  <p className="text-gray-600">سنقوم بالرد عليك في أقرب وقت ممكن</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 rounded-xl bg-red/10 text-red text-center">
                      {error}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">
                        الاسم الكامل *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-green focus:ring-4 focus:ring-green/10 transition-all outline-none"
                        placeholder="أدخل اسمك"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">
                        البريد الإلكتروني *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-green focus:ring-4 focus:ring-green/10 transition-all outline-none"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-green focus:ring-4 focus:ring-green/10 transition-all outline-none"
                      placeholder="+218 XX XXX XXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                      الرسالة *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-green focus:ring-4 focus:ring-green/10 transition-all outline-none resize-none"
                      placeholder="اكتب رسالتك هنا..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-green to-green-dark text-white font-bold hover:shadow-food transition-shadow disabled:opacity-50"
                  >
                    {submitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>إرسال الرسالة</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* World Map — trade routes */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-dark mb-2">
              شبكة إمداد <span className="text-green">عالمية</span>
            </h3>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              نربط ليبيا بأكبر موردي الحبوب والزيوت في العالم عبر مسارات شحن مجربة وموثوقة
            </p>
          </div>

          {/* Map */}
          <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-lg">
            <WorldMap
              lineColor="#f97316"
              dots={[
                // Libya (Tripoli) → Brazil (São Paulo) — grain supplier
                { start: { lat: 32.8872, lng: 13.1913, label: 'طرابلس' }, end: { lat: -23.5505, lng: -46.6333, label: 'ساو باولو' } },
                // Libya → Argentina (Buenos Aires) — soy
                { start: { lat: 32.8872, lng: 13.1913 }, end: { lat: -34.6037, lng: -58.3816, label: 'بوينس أيرس' } },
                // Libya → Ukraine (Odessa) — wheat
                { start: { lat: 32.8872, lng: 13.1913 }, end: { lat: 46.4825, lng: 30.7233, label: 'أوديسا' } },
                // Libya → Malaysia (Kuala Lumpur) — palm oil
                { start: { lat: 32.8872, lng: 13.1913 }, end: { lat: 3.1390, lng: 101.6869, label: 'كوالالمبور' } },
                // Libya → Turkey (Istanbul) — trade hub
                { start: { lat: 32.8872, lng: 13.1913 }, end: { lat: 41.0082, lng: 28.9784, label: 'إسطنبول' } },
                // Libya → Rotterdam — European port
                { start: { lat: 32.8872, lng: 13.1913 }, end: { lat: 51.9244, lng: 4.4777, label: 'روتردام' } },
              ]}
            />
          </div>

          {/* Route legend */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs text-gray-500 font-semibold">
            {[
              { label: 'البرازيل والأرجنتين', dot: 'bg-orange' },
              { label: 'أوكرانيا (قمح)', dot: 'bg-orange' },
              { label: 'ماليزيا (زيت النخيل)', dot: 'bg-orange' },
              { label: 'تركيا وأوروبا', dot: 'bg-orange' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${item.dot}`} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
