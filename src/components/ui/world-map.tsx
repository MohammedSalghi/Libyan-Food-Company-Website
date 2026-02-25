import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

interface MapProps {
    dots?: Array<{
        start: { lat: number; lng: number; label?: string };
        end: { lat: number; lng: number; label?: string };
    }>;
    lineColor?: string;
}

// Pre-compute the map ONCE at module level — outside component, never re-runs
const map = new DottedMap({ height: 100, grid: "diagonal" });
const svgMap = map.getSVG({
    radius: 0.22,
    color: "#00000020",
    shape: "circle",
    backgroundColor: "white",
});
const encodedSvg = `data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`;

const projectPoint = (lat: number, lng: number) => ({
    x: (lng + 180) * (800 / 360),
    y: (90 - lat) * (400 / 180),
});

const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
};

export function WorldMap({ dots = [], lineColor = "#22c55e" }: MapProps) {
    const svgRef = useRef<SVGSVGElement>(null);

    // Memoize projected points so they don't recompute on re-renders
    const projectedDots = useMemo(
        () =>
            dots.map((dot) => ({
                start: projectPoint(dot.start.lat, dot.start.lng),
                end: projectPoint(dot.end.lat, dot.end.lng),
            })),
        [dots]
    );

    return (
        <div className="w-full aspect-[2/1] bg-white rounded-3xl relative overflow-hidden">
            {/* Static dotted world map — rendered once */}
            <img
                src={encodedSvg}
                className="h-full w-full object-cover pointer-events-none select-none"
                style={{
                    maskImage: 'linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)',
                }}
                alt="world map"
                draggable={false}
                loading="eager"
            />

            {/* SVG overlay for paths and dots */}
            <svg
                ref={svgRef}
                viewBox="0 0 800 400"
                className="w-full h-full absolute inset-0 pointer-events-none select-none"
                style={{ willChange: 'auto' }}
            >
                <defs>
                    <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
                        <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Animated curved trade routes */}
                {projectedDots.map((dot, i) => (
                    <motion.path
                        key={`path-${i}`}
                        d={createCurvedPath(dot.start, dot.end)}
                        fill="none"
                        stroke="url(#path-gradient)"
                        strokeWidth="1.5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.5 * i, ease: "easeOut" }}
                    />
                ))}

                {/* Pulsing dots — using CSS animations (cheaper than framer) */}
                {projectedDots.map((dot, i) => (
                    <g key={`dots-${i}`}>
                        {/* Start */}
                        <circle cx={dot.start.x} cy={dot.start.y} r="2.5" fill={lineColor} />
                        <circle cx={dot.start.x} cy={dot.start.y} r="2.5" fill={lineColor} opacity="0.4">
                            <animate attributeName="r" from="2.5" to="8" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                            <animate attributeName="opacity" from="0.4" to="0" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                        </circle>

                        {/* End */}
                        <circle cx={dot.end.x} cy={dot.end.y} r="2.5" fill={lineColor} />
                        <circle cx={dot.end.x} cy={dot.end.y} r="2.5" fill={lineColor} opacity="0.4">
                            <animate attributeName="r" from="2.5" to="8" dur="2s" begin={`${0.5 + i * 0.3}s`} repeatCount="indefinite" />
                            <animate attributeName="opacity" from="0.4" to="0" dur="2s" begin={`${0.5 + i * 0.3}s`} repeatCount="indefinite" />
                        </circle>
                    </g>
                ))}
            </svg>
        </div>
    );
}
