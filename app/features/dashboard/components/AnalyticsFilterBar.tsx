"use client";

import { Download } from "lucide-react";

interface AnalyticsFilterBarProps {
    ranges: string[];
    activeRange: string;
    onRangeChange: (range: string) => void;
    onExport: () => void;
}

export function AnalyticsFilterBar({ ranges, activeRange, onRangeChange, onExport }: AnalyticsFilterBarProps) {
    return (
        <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 bg-[#327071] rounded-[8px] p-1.5">
                {ranges.map((r) => (
                    <button
                        key={r}
                        onClick={() => onRangeChange(r)}
                        className={`px-3.5 py-1.5 rounded-[6px] text-xs font-medium cursor-pointer transition-colors ${r === activeRange ? "bg-[#E6A400] text-white" : "text-white/80 hover:text-white"
                            }`}
                    >
                        {r}
                    </button>
                ))}
            </div>

            <button
                onClick={onExport}
                className="inline-flex items-center gap-2 rounded-[6px] bg-[#E6A400] px-4 py-3 text-xs font-semibold text-white hover:bg-[#dd951b] transition-colors cursor-pointer whitespace-nowrap"
            >
                <Download size={14} />
                Export
            </button>
        </div>
    );
}