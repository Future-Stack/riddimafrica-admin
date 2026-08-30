import CommonHeader from "@/app/components/common/header/CommonHeader";
import InfoField from "@/app/components/common/header/InfoField";
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

export const LiveStatsCard = ({
  title = "Live Stats",
  stats,
}: LiveStatsCardProps) => {
  return (
    <div className="bg-[#FAF7F3] rounded-xl border border-[#C4CDD566] font-inter p-5">
      <CommonHeader size="lg" className="text-[#3D2513]! mb-5">
        {title}
      </CommonHeader>

      <div className="space-y-4">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <span
              className={`w-9 h-9 rounded-[6px] flex items-center justify-center shrink-0 ${s.iconBgClassName}`}
            >
              {s.icon}
            </span>
            <InfoField
              className="min-w-0"
              label={s.label}
              value={
                <span
                  className={`text-sm md:text-base font-bold leading-5 ${s.valueColorClassName ?? "text-[#101828]"}`}
                >
                  {s.value}
                </span>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};
