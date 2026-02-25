import { cn } from '@/lib/utils';
import { useMotionValue, animate, motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import useMeasure from 'react-use-measure';

type InfiniteSliderProps = {
    children: React.ReactNode;
    gap?: number;
    duration?: number;
    durationOnHover?: number;
    speed?: number;
    speedOnHover?: number;
    direction?: 'horizontal' | 'vertical';
    reverse?: boolean;
    className?: string;
};

export function InfiniteSlider({
    children,
    gap = 16,
    duration,
    durationOnHover,
    speed = 25,
    speedOnHover,
    direction = 'horizontal',
    reverse = false,
    className,
}: InfiniteSliderProps) {
    const effectiveDuration = duration ?? speed;
    const effectiveDurationOnHover = durationOnHover ?? speedOnHover;

    const [currentDuration, setCurrentDuration] = useState(effectiveDuration);
    const [ref, { width, height }] = useMeasure();
    const translation = useMotionValue(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [key, setKey] = useState(0);
    // Track whether the slider has been measured
    const measuredRef = useRef(false);

    useEffect(() => {
        const size = direction === 'horizontal' ? width : height;
        if (size === 0) return; // wait until measured

        measuredRef.current = true;
        const contentSize = size + gap;
        const from = reverse ? -contentSize / 2 : 0;
        const to = reverse ? 0 : -contentSize / 2;

        let controls: ReturnType<typeof animate>;

        if (isTransitioning) {
            controls = animate(translation, [translation.get(), to], {
                ease: 'linear',
                duration: currentDuration * Math.abs((translation.get() - to) / contentSize),
                onComplete: () => {
                    setIsTransitioning(false);
                    setKey((k) => k + 1);
                },
            });
        } else {
            controls = animate(translation, [from, to], {
                ease: 'linear',
                duration: currentDuration,
                repeat: Infinity,
                repeatType: 'loop',
                repeatDelay: 0,
                onRepeat: () => { translation.set(from); },
            });
        }

        return () => controls?.stop();
    }, [key, currentDuration, width, height, gap, isTransitioning, direction, reverse]);
    // NOTE: `translation` intentionally excluded from deps to avoid restart loops

    const hoverProps = effectiveDurationOnHover
        ? {
            onHoverStart: () => {
                setIsTransitioning(true);
                setCurrentDuration(effectiveDurationOnHover);
            },
            onHoverEnd: () => {
                setIsTransitioning(true);
                setCurrentDuration(effectiveDuration);
            },
        }
        : {};

    return (
        <div className={cn('overflow-hidden', className)}>
            <motion.div
                className="flex w-max"
                style={{
                    ...(direction === 'horizontal' ? { x: translation } : { y: translation }),
                    gap: `${gap}px`,
                    flexDirection: direction === 'horizontal' ? 'row' : 'column',
                    willChange: 'transform',
                }}
                ref={ref}
                {...hoverProps}
            >
                {children}
                {children}
            </motion.div>
        </div>
    );
}
