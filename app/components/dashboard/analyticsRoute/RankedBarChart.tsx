import { ReactNode } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, ResponsiveContainer } from "recharts";

export interface RankedBarItem {
    label: string;
    value: number;
    displayValue: string;
    color?: string;
}

export interface RankedBarLegendChip {
    label: string;
    displayValue: string;
    color: string;
    dotColor?: string;
}

interface RankedBarChartProps {
    title: string;
    subtitle?: string;
    items: RankedBarItem[];
    defaultColor?: string;
    legendChips?: RankedBarLegendChip[];
    footer?: ReactNode;
    height?: number;
}

function formatShort(n: number) {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
    return `${n}`;
}

/** Recharts' default tick text auto-wraps to fit the given width, which mangles long labels
 * mid-word ("Accessories" -> "Access" / "ories") and can even break short number ticks.
 * These custom ticks render one plain <text> line instead, truncating with an ellipsis
 * only if a category label is actually too long to fit.
 */
function CategoryTick({ x, y, payload, maxChars = 11 }: any) {
    const raw = String(payload.value);
    const text = raw.length > maxChars ? `${raw.slice(0, maxChars - 1)}…` : raw;
    return (
        <text x={x} y={y} dy={4} textAnchor="end" fontSize={12} fill="#787A7F">
            {text}
        </text>
    );
}

function ValueTick({ x, y, payload }: any) {
    return (
        <text x={x} y={y} dy={10} textAnchor="middle" fontSize={11} fill="#9CA3AF">
            {formatShort(payload.value)}
        </text>
    );
}

/** Rounds the max value up to a "nice" number so the axis ticks land on clean steps (0, .8M, 1.6M, 2.4M, 3.2M ...) */
function niceMax(rawMax: number, steps = 4) {
    if (rawMax <= 0) return steps;
    const magnitude = Math.pow(10, Math.floor(Math.log10(rawMax)));
    const normalized = rawMax / magnitude;
    let niceNormalized;
    if (normalized <= 1) niceNormalized = 1;
    else if (normalized <= 2) niceNormalized = 2;
    else if (normalized <= 4) niceNormalized = 4;
    else if (normalized <= 8) niceNormalized = 8;
    else niceNormalized = 10;
    const max = niceNormalized * magnitude;
    // round up to a multiple of `steps` so ticks divide evenly
    return Math.ceil(max / steps) * steps;
}

export function RankedBarChart({
    title,
    subtitle,
    items,
    defaultColor = "#6B4630",
    legendChips,
    footer,
    height = 200,
}: RankedBarChartProps) {
    const steps = 4;
    const axisMax = niceMax(Math.max(0, ...items.map((i) => i.value)), steps);
    const ticks = Array.from({ length: steps + 1 }, (_, i) => (axisMax / steps) * i);

    return (
        <div className="bg-[#FAF7F3] rounded-xl border border-[#C4CDD566] h-full font-inter p-5">
            <h3 className="text-base md:text-lg font-medium text-[#101828] font-inter leading-7">{title}</h3>
            {subtitle && <p className="text-xs text-[#624D3B] font-medium leading-4 mt-0.5 mb-3">{subtitle}</p>}

            <div style={{ height }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={items} layout="vertical" margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                        <CartesianGrid horizontal vertical={false} strokeDasharray="4 4" stroke="#00000026" />
                        <XAxis
                            type="number"
                            domain={[0, axisMax]}
                            ticks={ticks}
                            tick={<ValueTick />}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            type="category"
                            dataKey="label"
                            width={92}
                            tick={<CategoryTick />}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={14} background={{ fill: "transparent" }}>
                            {items.map((item, i) => (
                                <Cell key={i} fill={item.color ?? defaultColor} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {legendChips && (
                <div className="flex flex-wrap gap-2 mt-3">
                    {legendChips.map((chip) => (
                        <span
                            key={chip.label}
                            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium text-white"
                            style={{ backgroundColor: chip.color }}
                        >
                            {chip.dotColor && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: chip.dotColor }} />}
                            {chip.label} <span className="opacity-80">{chip.displayValue}</span>
                        </span>
                    ))}
                </div>
            )}

            {footer}
        </div>
    );
}