import { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export interface StatCardGrowth {
    value: string; // e.g. "+24%"
    direction: "up" | "down";
}

export interface StatCardProps {
    title: string;
    value: string;
    subtitle?: string;
    growth?: StatCardGrowth;
    icon: ReactNode;
    /** Tailwind background class for the whole card, e.g. "bg-[#3C182F]" */
    bgClassName: string;
    /** Tailwind background class for the small icon badge, defaults to translucent white */
    iconBgClassName?: string;
}

/**
 * Reusable dark stat card — used for revenue/product summary metrics.
 * Pass a solid `bgClassName` per card to get the mixed color-block look.
 */
export const StatCard = ({
    title,
    value,
    subtitle,
    growth,
    icon,
    bgClassName,
    iconBgClassName = "bg-white/15",
}: StatCardProps) => {
    return (
        <div className={`rounded-2xl p-5 ${bgClassName} relative overflow-hidden`}>
            <div className="flex items-start justify-between mb-6">
                <p className="text-sm text-white/70 font-medium font-inter leading-5">{title}</p>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${iconBgClassName}`}>
                    {icon}
                </span>
            </div>

            <p className="text-2xl font-bold text-white font-inter leading-8 mb-1.5">{value}</p>

            <div className="flex items-center gap-1.5 text-xs font-medium">
                {growth && (
                    <span
                        className={`inline-flex items-center gap-0.5 font-semibold ${growth.direction === "up" ? "text-emerald-400" : "text-red-400"
                            }`}
                    >
                        {growth.direction === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {growth.value}
                    </span>
                )}
                {subtitle && <span className="text-white/60">{subtitle}</span>}
            </div>
        </div>
    );
};