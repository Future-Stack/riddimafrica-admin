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

export function FunnelBars({ title, subtitle, stages, overallLabel = "Overall conversion", overallValue }: FunnelBarsProps) {
    return (
        <div className="bg-[#FAF7F3] rounded-xl border border-[#C4CDD566] font-inter p-5">
            <h3 className="text-base font-bold text-[#101828] font-inter leading-6">{title}</h3>
            {subtitle && <p className="text-xs text-[#787A7F] font-normal leading-4 mt-0.5 mb-4.5">{subtitle}</p>}
            <div className="space-y-3">
                {stages.map((s) => (
                    <div key={s.label}>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-[#121418] leading-4">
                                {s.label}
                            </span>

                            {/* Right side percentage */}
                            <span className="text-xs font-semibold text-[#E6A400]">
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
                                {/* Percentage inside colored bar */}
                                <span className="text-[10px] font-semibold text-white">
                                    {s.percent}%
                                </span>
                            </div>
                        </div>
                        {/* <div className="h-2 w-full rounded-full bg-[#C5B79A]"> */}
                            <div
                                className="h-full rounded-[6px]"
                                style={{ width: `${s.percent}%`, backgroundColor: s.color }}
                            />
                        {/* </div> */}
                    </div>
                ))}
            </div>

            {overallValue && (
                <div className="mt-8  border-t border-[#E6A400] ">
                    <p className="text-xs text-[#787A7F] font-medium leading-4 mt-3">{overallLabel}</p>
                    <p className="text-lg font-medium text-[#E6A400] leading-7">{overallValue}</p>
                </div>
            )}
        </div>
    );
}