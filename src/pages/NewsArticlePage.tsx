import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';

const newsData = [
    {
        id: '1',
        title: 'توسيع شبكة الموردين العالمية',
        excerpt: 'أعلنت الشركة اليوم عن توقيع اتفاقيات جديدة مع موردين رائدين في أمريكا اللاتينية لضمان استقرار إمدادات الحبوب.',
        content: `وقّعت الشركة الليبية للغذاء سلسلة من مذكرات التفاهم مع كبار منتجي الصويا والذرة في البرازيل والأرجنتين. تأتي هذه الخطوة في إطار خطة استراتيجية لتعزيز الأمن الغذائي وتنويع مصادر الاستيراد لضمان أفضل الأسعار والجودة للمستهلك الليبي.

تتضمن الاتفاقيات الجديدة ضمانات بتوريد ما يزيد على 200,000 طن من الحبوب سنوياً خلال السنوات الثلاث القادمة، مما يُرسّخ مكانة الشركة بوصفها المورّد الاستراتيجي الأول لمادة الدقيق في ليبيا.

وقال المدير التنفيذي للشركة خلال حفل التوقيع الذي أُقيم في مدينة ساو باولو البرازيلية: "هذه الخطوة تمثّل تحولاً نوعياً في قدراتنا على الإمداد الغذائي الآمن والمستدام لوطننا. لقد عملنا لأشهر طويلة على بناء علاقات الثقة مع هؤلاء الشركاء، ونحن واثقون أن هذه الاتفاقيات ستعود بالنفع الكبير على المستهلك الليبي."

أهمية التنويع في مصادر الاستيراد

يمثّل تنويع المصادر ركيزةً جوهريةً في استراتيجية الشركة لضمان استمرارية الإمداد حتى في أوقات الأزمات والاضطرابات العالمية. فقد أثبتت جائحة كوفيد-19 والأزمات الجيوسياسية الأخيرة مدى هشاشة سلاسل الإمداد التي تعتمد على مصادر أحادية.

من خلال هذه الاتفاقيات، باتت الشركة ترتكز على منظومة متنوعة تشمل دولاً في أمريكا اللاتينية وأوروبا الشرقية وآسيا، مما يمنحها مرونة استثنائية في مواجهة أي اضطرابات محتملة.

الخطوات القادمة

تخطط الشركة خلال الأشهر المقبلة لـ:
- تطوير منظومة تتبع الشحنات في الوقت الفعلي
- توسيع الطاقة التخزينية في الموانئ الليبية الرئيسية
- إطلاق برنامج شراكة للموزعين الإقليميين
- تعزيز الاستدامة البيئية في عمليات النقل والتخزين`,
        image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1200&q=80',
        category: 'إنجازات',
        categoryColor: 'bg-green text-white',
        author: 'الإدارة العامة',
        date: '15 مايو 2024',
        readTime: '5 دقائق',
    },
    {
        id: '2',
        title: 'إطلاق تطبيق "شريك الغذاء" للموزعين',
        excerpt: 'نظام رقمي جديد يتيح للموزعين تتبع طلباتهم وشحناتهم بشكل لحظي وتسهيل التعاملات المالية.',
        content: `في خطوة نحو التحول الرقمي الشامل، أطلقت الشركة الليبية للغذاء تطبيقها الجديد "شريك الغذاء" المخصص لشركائها التجاريين والموزعين في كافة أرجاء ليبيا. يهدف التطبيق إلى تبسيط عملية الطلب، وتوفير شفافية كاملة في سلسلة الإمداد، وتمكين الموزعين من تتبع شحناتهم لحظة بلحظة.

الميزات الرئيسية لتطبيق "شريك الغذاء"

يتضمن التطبيق ميزات متقدمة مصممة بعناية لتلبية احتياجات الموزعين:

إدارة الطلبات: يستطيع الموزع تقديم طلباته بضغطة واحدة واختيار المنتجات من الكتالوج الإلكتروني الشامل مع إمكانية تحديد الكميات والمواعيد المطلوبة.

التتبع اللحظي: نظام GPS متكامل يتيح متابعة الشحنة من لحظة مغادرة المستودع حتى وصولها للموزّع، مع إشعارات فورية على كل مرحلة.

إدارة الفواتير: منظومة فواتير إلكترونية تُصدر تلقائياً وتُحفظ بأمان في السحابة مع إمكانية التصدير بصيغ متعددة.

قناة دعم مباشر: تواصل فوري مع فريق خدمة عملاء متخصص عبر الدردشة الحية على مدار الساعة طوال أيام الأسبوع.

تقارير المبيعات: لوحة تحليلية تعرض أداء المبيعات بيانياً مع مقارنات زمنية ومؤشرات أداء رئيسية.

التأثير المتوقع

يُتوقع أن يُقلّص التطبيق دورة الطلب من 48 ساعة إلى أقل من 6 ساعات، مما يعني قدرةً أعلى على الاستجابة للطلب المتغير في السوق. كما يُقدّر المختصون أن هذا الحل الرقمي سيخفّض تكاليف المعاملات الإدارية بنسبة تصل إلى 40%.`,
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
        category: 'تكنولوجيا',
        categoryColor: 'bg-orange text-white',
        author: 'قسم التطوير الرقمي',
        date: '10 مايو 2024',
        readTime: '4 دقائق',
    },
    {
        id: '3',
        title: 'الشركة تحصد جائزة الجودة العالمية ISO 22000',
        excerpt: 'تم منح شركتنا شهادة الأيزو العالمية في جودة الخدمات اللوجستية وتخزين المواد الغذائية.',
        content: `بعد فحوصات دقيقة وتدقيق شامل استمر لأكثر من 6 أشهر، حصلت الشركة الليبية للغذاء على شهادة الجودة الدولية ISO 22000:2018، وهو المعيار الدولي المتكامل لإدارة سلامة الغذاء على امتداد سلسلة الإمداد بالكامل.

ما هو معيار ISO 22000؟

ISO 22000 هو معيار دولي صادر عن المنظمة الدولية للمعايير، ويُعدّ المرجع العالمي الأشمل لأنظمة إدارة سلامة الغذاء. يغطي المعيار جميع مراحل سلسلة الإمداد الغذائي، بدءاً من الإنتاج الأولي وصولاً إلى المستهلك النهائي، ويُلزم المؤسسات بتطبيق أعلى معايير السلامة والجودة في كل خطوة.

رحلة الحصول على الشهادة

أعدّت الشركة لهذه اللحظة بعمل مؤسسي ممنهج على مدار عامين، تضمّن:
- مراجعة شاملة لجميع إجراءات التخزين والنقل والتحميل
- تدريب أكثر من 200 موظف على معايير سلامة الغذاء
- تحديث الأنظمة الإدارية والبنية التحتية التقنية
- إجراء 3 مراجعات داخلية قبل التدقيق الخارجي

شهادة فريق التدقيق

أشاد فريق التدقيق الدولي المكوّن من خبراء من ألمانيا وسويسرا بمستوى الأنظمة الإدارية والبنية التحتية المعتمَدة. وأفاد التقرير الرسمي بأن الشركة تجاوزت الحد الأدنى لمتطلبات المعيار في ما يخص أنظمة التتبع ورقابة درجات الحرارة وإدارة المخاطر.

تُرحّب الشركة بهذه الشهادة المرموقة وتعتبرها منطلقاً نحو مزيد من الريادة والتميز في خدمة الأمن الغذائي الوطني.`,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80',
        category: 'جوائز',
        categoryColor: 'bg-blue-500 text-white',
        author: 'مكتب الإعلام',
        date: '2 مايو 2024',
        readTime: '6 دقائق',
    },
];

export default function NewsArticlePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const article = newsData.find((n) => n.id === id);

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-2xl font-bold text-dark mb-4">المقال غير موجود</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-green text-white rounded-full font-bold"
                    >
                        العودة للرئيسية
                    </button>
                </div>
            </div>
        );
    }

    const paragraphs = article.content.split('\n\n');

    return (
        <div className="min-h-screen bg-white" dir="rtl">

            {/* Back button */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <motion.button
                        whileHover={{ x: 4 }}
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-dark font-bold text-sm hover:text-green transition-colors"
                    >
                        <ArrowRight size={18} />
                        <span>العودة</span>
                    </motion.button>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow ${article.categoryColor}`}>
                        {article.category}
                    </span>
                </div>
            </div>

            {/* Hero image */}
            <motion.div
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-72 sm:h-96 lg:h-[480px] overflow-hidden"
            >
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Title over image */}
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
                    <div className="max-w-4xl mx-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4"
                        >
                            {article.title}
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.35 }}
                            className="flex flex-wrap items-center gap-5 text-white/80 text-sm font-semibold"
                        >
                            <div className="flex items-center gap-1.5">
                                <Calendar size={15} />
                                <span>{article.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <User size={15} />
                                <span>{article.author}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock size={15} />
                                <span>{article.readTime} للقراءة</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Article body */}
            <motion.article
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16"
            >
                {/* Lead paragraph (excerpt) */}
                <p className="text-xl text-gray-700 leading-relaxed font-medium border-r-4 border-green pr-5 mb-10 text-right">
                    {article.excerpt}
                </p>

                {/* Full content */}
                <div className="space-y-6 text-right">
                    {paragraphs.map((para, i) => {
                        // Section heading heuristic: short line ending without punctuation = heading
                        const isHeading = para.length < 50 && !para.endsWith('.');
                        if (isHeading) {
                            return (
                                <motion.h2
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{ duration: 0.5 }}
                                    className="text-xl sm:text-2xl font-black text-dark pt-6 pb-1 border-b border-gray-100"
                                >
                                    {para}
                                </motion.h2>
                            );
                        }
                        return (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.45, delay: 0.05 }}
                                className="text-gray-600 text-base sm:text-lg leading-loose"
                            >
                                {para}
                            </motion.p>
                        );
                    })}
                </div>

                {/* Footer CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 p-8 bg-gradient-to-br from-green/10 to-emerald-50 rounded-3xl border border-green/20 text-center"
                >
                    <p className="text-dark font-bold text-lg mb-6">هل تريد معرفة المزيد؟ تواصل معنا الآن</p>
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => { navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300); }}
                        className="px-8 py-4 bg-gradient-to-r from-green to-green-dark text-white font-black rounded-full shadow-lg text-sm"
                    >
                        تواصل معنا
                    </motion.button>
                </motion.div>
            </motion.article>

        </div>
    );
}
