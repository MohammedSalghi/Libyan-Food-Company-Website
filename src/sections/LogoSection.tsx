import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';


// Fallback: use text-based logos since SVG URLs can be unreliable
const textLogos = [
    { name: 'Cargill', color: 'text-blue-600' },
    { name: 'Louis Dreyfus', color: 'text-red-600' },
    { name: 'Bunge Global', color: 'text-cyan-700' },
    { name: 'COFCO Intl', color: 'text-red-700' },
    { name: 'Maersk', color: 'text-blue-800' },
    { name: 'DHL Express', color: 'text-yellow-600' },
    { name: 'MSC Shipping', color: 'text-gray-700' },
    { name: 'Viterra', color: 'text-green-700' },
    { name: 'ADM Trading', color: 'text-gray-800' },
    { name: 'Olam Group', color: 'text-lime-700' },
];

export default function LogoSection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <section ref={ref} className="py-14 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.22em] mb-2">شركاؤنا العالميون</p>
                    <h3 className="text-xl sm:text-2xl font-black text-gray-800">
                        نتعاون مع <span className="text-orange">أبرز المؤسسات</span> الدولية
                    </h3>
                </motion.div>

                {/* Infinite Slider — text-based logos, always visible */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                >
                    {/* Left/Right fade masks */}
                    <div className="pointer-events-none absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-white to-transparent z-10" />
                    <div className="pointer-events-none absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-10" />

                    {/* Border lines */}
                    <div className="border-t border-b border-gray-100 py-5">
                        {/* We render two rows: one normal, one reverse */}
                        <div className="flex overflow-hidden">
                            <motion.div
                                animate={{ x: ['0%', '-50%'] }}
                                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                className="flex gap-12 shrink-0"
                                style={{ willChange: 'transform', translateZ: 0 }}
                            >
                                {[...textLogos, ...textLogos].map((logo, i) => (
                                    <div
                                        key={i}
                                        className={`shrink-0 text-sm font-black uppercase tracking-wider opacity-40 hover:opacity-80 transition-opacity cursor-default ${logo.color}`}
                                    >
                                        {logo.name}
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Trust badge row */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-gray-400 font-semibold"
                >
                    {['ISO 22000 معتمد', '+25 سنة خبرة', '+500 عميل نشط', 'حضور في 3 قارات'].map((badge, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green" />
                            <span>{badge}</span>
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
