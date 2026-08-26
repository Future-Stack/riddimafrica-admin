import { ReactNode } from "react";

export interface LiveStat {
    label: string;
    value: string;
    icon: ReactNode;
    iconBgClassName: string;
    valueColorClassName?: string;
}

interface LiveStatsCardProps {
    title?: string;
    stats: LiveStat[];
}

export function LiveStatsCard({ title = "Live Stats", stats }: LiveStatsCardProps) {
    return (
        <div className="bg-[#FAF7F3] rounded-xl border border-[#C4CDD566] font-inter p-5">
            <h3 className="text-base md:text-lg font-medium text-[#3D2513] leading-6 mb-5">{title}</h3>

            <div className="space-y-4">
                {stats.map((s) => (
                    <div key={s.label} className="flex items-center gap-3">
                        <span className={`w-9 h-9 rounded-[6px] flex items-center justify-center shrink-0 ${s.iconBgClassName}`}>
                            {s.icon}
                        </span>
                        <div>
                            <p className="text-xs text-[#787A7F] font-medium leading-4">{s.label}</p>
                            <p className={`text-sm md:text-base font-bold leading-5 mt-0.5 ${s.valueColorClassName ?? "text-[#101828]"}`}>
                                {s.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}