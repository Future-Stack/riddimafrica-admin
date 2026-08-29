"use client";

import { ReactNode, useState } from "react";
import { ChevronDown, Radio as LiveDot } from "lucide-react";
import {
    ComposedChart,
    Area,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export interface TrendSeries {
    key: string;
    label: string;
    /** Color used to actually draw the area/line on the chart */
    color: string;
    /** Optional distinct color for the legend dot (defaults to `color`) — lets the legend label a series without that series being the one visually drawn */
    legendColor?: string;
    kind?: "area" | "line";
    /** If false, the series still feeds the tooltip (and the axis domain) but is not drawn on the chart. Default true. */
    visible?: boolean;
}

interface TrendChartProps {
    title: string;
    subtitle?: string;
    data: Record<string, number | string>[];
    xKey?: string;
    series: TrendSeries[];
    rangeOptions?: string[];
    range?: string;
    onRangeChange?: (range: string) => void;
    live?: boolean;
    footer?: ReactNode;
    height?: number;
}

function formatShort(n: number) {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return String(n);
}

function TrendTooltip({ active, payload, label, series }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-[#19A59A] text-white rounded-lg px-3 py-2 text-xs shadow-lg">
            <p className="font-semibold mb-1">{label}</p>
            {series.map((s: TrendSeries) => {
                const point = payload.find((p: any) => p.dataKey === s.key);
                if (!point) return null;
                return (
                    <p key={s.key}>
                        {s.label}: {formatShort(Number(point.value))}
                    </p>
                );
            })}
        </div>
    );
}

export function RevenueAndCombination({
    title,
    subtitle,
    data,
    xKey = "label",
    series,
    rangeOptions,
    range,
    onRangeChange,
    live = false,
    footer,
    height = 240,
}: TrendChartProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-[#FAF7F3] rounded-xl border border-[#C4CDD566] font-inter p-5">
            <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                <div>
                    <h3 className="text-base md:text-lg font-medium text-[#101828] font-inter leading-7">{title}</h3>
                    {subtitle && <p className="text-xs text-[#624D3B] font-medium leading-4 mt-0.5">{subtitle}</p>}
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 text-xs text-[#787A7F] font-normal">
                        {series.map((s) => (
                            <span key={s.key} className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.legendColor ?? s.color }} />
                                {s.label}
                            </span>
                        ))}
                    </div>

                    {live && (
                        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                            <LiveDot size={12} className="animate-pulse" /> LIVE
                        </span>
                    )}

                    {!live && rangeOptions && range && onRangeChange && (
                        <div className="relative">
                            <button
                                onClick={() => setOpen((o) => !o)}
                                className="flex items-center gap-1.5 rounded-lg bg-[#D8CBB880] px-3 py-2 text-sm font-normal text-[#101828] cursor-pointer"
                            >
                                {range}
                                <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
                            </button>
                            {open && (
                                <div className="absolute right-0 mt-1 w-40 bg-[#D8CBB880] rounded-lg z-10 overflow-hidden">
                                    {rangeOptions.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => {
                                                onRangeChange(opt);
                                                setOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 text-xs cursor-pointer hover:bg-[#EFEAE2] ${opt === range ? "font-semibold text-[#101828]" : "text-gray-500"
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div style={{ height }}>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <defs>
                            {series.map((s) => (
                                <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={s.color} stopOpacity={0.25} />
                                    <stop offset="100%" stopColor={s.color} stopOpacity={0.02} />
                                </linearGradient>
                            ))}
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="#897766" />
                        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                        <YAxis
                            tickFormatter={(v) => formatShort(v)}
                            tick={{ fontSize: 11, fill: "#9CA3AF" }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<TrendTooltip series={series} />} />
                        {series.map((s) => {
                            const isVisible = s.visible !== false;
                            return s.kind === "line" ? (
                                <Line
                                    key={s.key}
                                    type="monotone"
                                    dataKey={s.key}
                                    stroke={isVisible ? s.color : "transparent"}
                                    strokeWidth={isVisible ? 2 : 0}
                                    dot={isVisible ? { r: 3, fill: s.color } : false}
                                    activeDot={isVisible ? undefined : false}
                                />
                            ) : (
                                <Area
                                    key={s.key}
                                    type="monotone"
                                    dataKey={s.key}
                                    stroke={isVisible ? s.color : "transparent"}
                                    strokeWidth={isVisible ? 2 : 0}
                                    fill={isVisible ? `url(#grad-${s.key})` : "transparent"}
                                    activeDot={isVisible ? undefined : false}
                                />
                            );
                        })}
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {footer}
        </div>
    );
}