import CommonHeader from "@/app/components/common/header/CommonHeader";

export interface MiniStat {
  label: string;
  value: string;
  growth?: string;
  valueColorClassName?: string;
}

interface MiniStatRowProps {
  stats: MiniStat[];
}

export const MiniStatRow = ({ stats }: MiniStatRowProps) => {
  return (
    <div
      className="grid gap-2 mt-6"
      style={{
        gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`,
      }}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-[#6E5A40] rounded-[6px] px-3 py-2.5"
        >
          <CommonHeader size="xs" className="text-gray-300!">
            {s.label}
          </CommonHeader>
          <p
            className={`text-sm font-medium leading-5 mt-0.5 ${s.valueColorClassName ?? "text-white"}`}
          >
            {s.value}
          </p>
          {s.growth && (
            <CommonHeader size="xs" className="text-emerald-600! mt-0.5">
              {s.growth}
            </CommonHeader>
          )}
        </div>
      ))}
    </div>
  );
};
