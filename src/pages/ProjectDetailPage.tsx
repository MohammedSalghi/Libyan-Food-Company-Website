import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Package, TrendingUp, CheckCircle2 } from 'lucide-react';

const projectsData = [
    {
        id: '1',
        title: 'مشروع الأمن الغذائي الوطني',
        description: 'تأمين احتياجات السوق الليبي من الدقيق والحبوب الأساسية على مدار 12 شهراً متواصلاً.',
        content: `يعدّ مشروع الأمن الغذائي الوطني من أضخم عمليات الاستيراد التي نفّذتها الشركة الليبية للغذاء في تاريخها. انطلق المشروع في مطلع عام 2024 استجابةً لمتطلبات متصاعدة في السوق المحلية، إذ كانت ليبيا تواجه ضغوطاً على الإمداد الغذائي جراء الاضطرابات في سلاسل التوريد العالمية.

الأهداف الاستراتيجية

تمحورت أهداف المشروع حول ثلاثة محاور رئيسية:
- تأمين مخزون استراتيجي من الحبوب يكفي لتغطية 12 شهراً على الأقل
- تنويع مصادر التوريد للحد من الاعتماد على مصدر بعينه
- تثبيت أسعار المواد الغذائية الأساسية في السوق المحلية

سير العمليات التنفيذية

اتضمن المشروع إدارة أكثر من 80 شحنة بحرية وصلت عبر موانئ طرابلس وبنغازي ومصراتة. وتولّت الشركة التنسيق الكامل مع هيئة الجمارك الليبية والجهات الصحية المختصة لضمان سلاسة العمليات.

اعتمد الفريق التنفيذي على منظومة تتبع رقمية متكاملة تتيح مراقبة درجات الحرارة وحالة الحاويات طوال رحلة النقل البحري لضمان الحفاظ على جودة البضاعة.

التأثير على السوق

أسهمت الكميات الضخمة المُوَّرَدة في تحقيق استقرار ملحوظ في أسعار الدقيق والحبوب خلال الفترة الممتدة بين يناير وسبتمبر 2024، وهو ما أكده تقرير أسعار المستهلك الصادر عن مركز الدراسات الاقتصادية الليبي.`,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
        location: 'طرابلس، بنغازي، مصراتة',
        date: 'يناير 2024',
        qty: '+500K طن',
        tag: 'حبوب واستيراد',
        accent: 'from-orange to-amber-400',
        stats: [
            { label: 'إجمالي الطن', value: '+500,000', icon: Package },
            { label: 'شحنات بحرية', value: '80+', icon: TrendingUp },
            { label: 'مناطق توزيع', value: '12', icon: MapPin },
            { label: 'موردون دوليون', value: '6', icon: CheckCircle2 },
        ],
        highlights: [
            'إدارة 80+ شحنة بحرية بكفاءة عالية',
            'تنسيق مفصّل مع الجمارك الليبية في 3 موانئ',
            'نظام تتبع رقمي للحرارة والجودة أثناء النقل',
            'شبكة توزيع تغطي 12 منطقة جغرافية',
            'تثبيت الأسعار في السوق المحلية',
        ],
    },
    {
        id: '2',
        title: 'تجهيز مستودعات الخمس المطورة',
        description: 'تطوير وتجهيز أكبر مستودع مبرد في المنطقة الغربية بأحدث أنظمة التبريد والتحكم في الحرارة.',
        content: `يمثّل مشروع تجهيز مستودعات الخمس المطورة قفزةً نوعيةً في البنية التحتية اللوجستية للشركة الليبية للغذاء. يمتد المشروع على مساحة إجمالية تبلغ 7500 متر مربع، ويضم ثلاثة أقسام رئيسية مصممة لأغراض تخزينية مختلفة.

مكونات المشروع

القسم الأول - التخزين المجمّد (تحت الصفر): يعمل بدرجات حرارة تتراوح بين -18 و-25 درجة مئوية، ومخصص لتخزين المنتجات المجمدة واللحوم والأسماك والدواجن.

القسم الثاني - التخزين المبرد: يعمل بدرجات بين 2 و8 درجات مئوية، ومثالي لمنتجات الألبان والأجبان والعصائر والمنتجات الطازجة.

القسم الثالث - التخزين الجاف المتحكم به: بيئة جافة مع تحكم دقيق في الرطوبة، مخصصة للحبوب والمواد الغذائية الجافة التي تحتاج إلى حماية من الرطوبة.

المواصفات التقنية

تم تزويد المستودعات بأنظمة تبريد متعددة الطبقات مع مولدات كهربائية احتياطية تضمن استمرارية التبريد حتى في حالة انقطاع التيار. كما تشمل البنية التحتية نظام إنذار مبكر لأي تغير في درجات الحرارة مع ربطه بمركز المراقبة على مدار الساعة.`,
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
        location: 'الخمس، ليبيا',
        date: 'مارس 2024',
        qty: '7,500 M²',
        tag: 'بنية تحتية',
        accent: 'from-green to-emerald-400',
        stats: [
            { label: 'المساحة الإجمالية', value: '7,500 M²', icon: Package },
            { label: 'أقسام التبريد', value: '3', icon: TrendingUp },
            { label: 'طاقة التخزين', value: '15K طن', icon: MapPin },
            { label: 'معدل الكفاءة', value: '98%', icon: CheckCircle2 },
        ],
        highlights: [
            '3 أقسام تبريد بدرجات حرارة مختلفة',
            'مولدات كهربائية احتياطية للاستمرارية',
            'نظام إنذار مبكر 24/7 لمراقبة الحرارة',
            'طاقة تخزينية تصل لـ 15,000 طن',
            'مطابقة معايير ISO 22000 الدولية',
        ],
    },
    {
        id: '3',
        title: 'توريد الزيوت النباتية للسوق',
        description: 'توريد 100 ألف عبوة زيت نباتي عالي الجودة بأسعار تنافسية عبر شراكات استراتيجية دولية.',
        content: `يأتي مشروع توريد الزيوت النباتية استجابةً مباشرة لتنامي الطلب على هذه المادة الأساسية في السوق الليبية. انطلق المشروع في أبريل 2024 بحجم أولي من 100,000 عبوة بأحجام مختلفة، ليصبح أحد أكبر صفقات استيراد الزيوت النباتية في ليبيا للعام الجاري.

مصادر التوريد

اختارت الشركة الليبية للغذاء شركاءها الدوليين بعناية فائقة لضمان أعلى معايير الجودة وأفضل الأسعار التنافسية:
- ماليزيا: الموردون الرئيسيون لزيت النخيل بدرجة الطعام الممتازة
- أوكرانيا: مورّدو زيت عباد الشمس المكرّر عالي الجودة
- إندونيسيا: توريد زيت الصويا وزيوت نباتية متخصصة

أنواع الزيوت المستوردة

- زيت عباد الشمس المكرر (بعلب 1، 2، 4، 5 لترات)
- زيت النخيل الخام والمكرر (للاستخدام الصناعي والمنزلي)
- زيت الصويا (للصناعات الغذائية والاستخدام الأسري)
- زيوت نباتية مخلوطة (بأسعار اقتصادية للفئات ذات الدخل المحدود)

شبكة التوزيع

وُزّعت الشحنات على أكثر من 20 نقطة توزيع رئيسية في طرابلس وبنغازي وسبها ومصراتة والخمس، مع إتاحة خيار التوصيل المباشر لكبار الموزعين في المناطق الأخرى.`,
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=80',
        location: 'الموانئ الليبية',
        date: 'مايو 2024',
        qty: '100K عبوة',
        tag: 'زيوت وسلع',
        accent: 'from-blue-500 to-blue-400',
        stats: [
            { label: 'إجمالي العبوات', value: '100,000', icon: Package },
            { label: 'نقاط التوزيع', value: '20+', icon: MapPin },
            { label: 'أنواع الزيوت', value: '4', icon: TrendingUp },
            { label: 'دول المصدر', value: '3', icon: CheckCircle2 },
        ],
        highlights: [
            '4 أنواع من الزيوت النباتية عالية الجودة',
            'شراكات مع موردين في 3 دول مختلفة',
            '20+ نقطة توزيع في المدن الليبية',
            'أسعار تنافسية للجميع بما فيهم محدودو الدخل',
            'مراقبة جودة دقيقة لكل دفعة استيراد',
        ],
    },
];

export default function ProjectDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const project = projectsData.find((p) => p.id === id);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-2xl font-bold text-dark mb-4">المشروع غير موجود</p>
                    <button onClick={() => navigate('/')} className="px-6 py-3 bg-green text-white rounded-full font-bold">
                        العودة للرئيسية
                    </button>
                </div>
            </div>
        );
    }

    const paragraphs = project.content.split('\n\n');

    return (
        <div className="min-h-screen bg-white" dir="rtl">

            {/* Sticky top bar */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <motion.button
                        whileHover={{ x: 4 }}
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-dark font-bold text-sm hover:text-orange transition-colors"
                    >
                        <ArrowRight size={18} />
                        <span>العودة لقائمة المشاريع</span>
                    </motion.button>
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
                        {project.tag}
                    </span>
                </div>
            </div>

            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-72 sm:h-96 lg:h-[480px] overflow-hidden"
            >
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.accent} opacity-40 mix-blend-multiply`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap items-center gap-4 text-white/80 text-sm font-semibold mb-4"
                        >
                            <div className="flex items-center gap-1.5">
                                <MapPin size={15} />
                                <span>{project.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar size={15} />
                                <span>{project.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Package size={15} />
                                <span>{project.qty}</span>
                            </div>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                            className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight"
                        >
                            {project.title}
                        </motion.h1>
                    </div>
                </div>
            </motion.div>

            {/* Stats */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {project.stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i, duration: 0.5 }}
                                className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100"
                            >
                                <stat.icon size={22} className="mx-auto mb-2 text-orange" />
                                <div className="text-2xl font-black text-dark">{stat.value}</div>
                                <div className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Article body */}
            <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid lg:grid-cols-3 gap-12"
            >
                {/* Main content */}
                <div className="lg:col-span-2">
                    {/* Lead */}
                    <p className="text-xl text-gray-700 leading-relaxed font-medium border-r-4 border-orange pr-5 mb-10">
                        {project.description}
                    </p>

                    <div className="space-y-6">
                        {paragraphs.map((para, i) => {
                            const isHeading = para.length < 60 && !para.endsWith('.');
                            if (isHeading) {
                                return (
                                    <motion.h2
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: '-40px' }}
                                        transition={{ duration: 0.4 }}
                                        className="text-xl sm:text-2xl font-black text-dark pt-6 pb-1 border-b border-gray-100"
                                    >
                                        {para}
                                    </motion.h2>
                                );
                            }
                            return (
                                <motion.p
                                    key={i}
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ duration: 0.4 }}
                                    className="text-gray-600 text-base sm:text-lg leading-loose"
                                >
                                    {para}
                                </motion.p>
                            );
                        })}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Highlights */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="bg-gray-50 rounded-3xl p-6 border border-gray-100"
                    >
                        <h3 className="font-black text-dark mb-5 text-base">أبرز النقاط</h3>
                        <ul className="space-y-3">
                            {project.highlights.map((h, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 + i * 0.07 }}
                                    className="flex items-start gap-3 text-sm text-gray-600 font-medium"
                                >
                                    <CheckCircle2 size={16} className="text-green mt-0.5 shrink-0" />
                                    <span>{h}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className={`bg-gradient-to-br ${project.accent} rounded-3xl p-6 text-white text-center`}
                    >
                        <p className="font-bold text-sm mb-4">هل أنت مهتم بمشروع مشابه؟</p>
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => { navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300); }}
                            className="w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-2xl font-black text-sm transition-colors"
                        >
                            تواصل معنا
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>

        </div>
    );
}
