import CommonHeader from "@/app/components/common/header/CommonHeader";

export interface FunnelStage {
  label: string;
  percent: number;
  color: string;
}

interface FunnelBarsProps {
  title: string;
  subtitle?: string;
  stages: FunnelStage[];
  overallLabel?: string;
  overallValue?: string;
}

export const FunnelBars = ({
  title,
  subtitle,
  stages,
  overallLabel = "Overall conversion",
  overallValue,
}: FunnelBarsProps) => {
  return (
    <div className="bg-[#FAF7F3] rounded-xl border border-[#C4CDD566] font-inter p-5">
      <CommonHeader size="lg" className="text-[#101828]!">
        {title}
      </CommonHeader>
      {subtitle && (
        <CommonHeader size="xs" className="text-[#787A7F]! mb-4.5">
          {subtitle}
        </CommonHeader>
      )}
      <div className="space-y-3">
        {stages.map((s) => (
          <div key={s.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-[#121418] leading-4">
                {s.label}
              </span>
              <span className="text-xs font-semibold text-yellow">
                {s.percent}%
              </span>
            </div>

            <div className="h-6 w-full rounded-[6px] bg-[#C5B79A] overflow-hidden">
              <div
                className="h-full rounded-[6px] flex items-center justify-start pl-2"
                style={{
                  width: `${s.percent}%`,
                  backgroundColor: s.color,
                }}
              >
                <span className="text-[10px] font-semibold text-white">
                  {s.percent}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {overallValue && (
        <div className="mt-8 border-t border-[#E6A400]">
          <CommonHeader size="xs" className="text-[#787A7F]! mt-3">
            {overallLabel}
          </CommonHeader>
          <p className="text-lg font-medium text-yellow leading-7">
            {overallValue}
          </p>
        </div>
      )}
    </div>
  );
};
