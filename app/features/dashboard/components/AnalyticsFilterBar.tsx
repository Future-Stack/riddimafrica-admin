"use client";

import CommonButton from "@/app/components/common/button/CommonButton";
import { Download } from "lucide-react";

interface AnalyticsFilterBarProps {
  ranges: string[];
  activeRange: string;
  onRangeChange: (range: string) => void;
  onExport: () => void;
}

export const AnalyticsFilterBar = ({
  ranges,
  activeRange,
  onRangeChange,
  onExport,
}: AnalyticsFilterBarProps) => {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-1 bg-[#327071] rounded-[8px] p-1.5">
        {ranges.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => onRangeChange(r)}
            className={`px-3.5 py-1.5 rounded-[6px] text-xs font-medium cursor-pointer transition-colors ${
              r === activeRange
                ? "bg-[#E6A400] text-white"
                : "text-white/80 hover:text-white"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <CommonButton
        size="sm"
        variant="primary"
        shape="rounded"
        leftIcon={<Download size={14} />}
        onClick={onExport}
        className="whitespace-nowrap shrink-0"
      >
        Export
      </CommonButton>
    </div>
  );
};
