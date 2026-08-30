import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import CommonHeader from "./CommonHeader";

interface InfoFieldProps {
  label: string;
  value: ReactNode;
  className?: string;
  /** stack = label above value (default); inline = label left, value right with divider */
  variant?: "stack" | "inline";
}

const InfoField = ({
  label,
  value,
  className,
  variant = "stack",
}: InfoFieldProps) => {
  if (variant === "inline") {
    return (
      <div
        className={cn(
          "flex justify-between items-center gap-3 border-b border-[#181B1F1A] pb-1.5 text-xs font-medium font-inter",
          className,
        )}
      >
        <CommonHeader size="sm" className="text-[#6D4C41]! shrink-0">
          {label}
        </CommonHeader>
        {typeof value === "string" || typeof value === "number" ? (
          <CommonHeader
            size="sm"
            className="text-[#3E2723]! text-right justify-end"
          >
            {value}
          </CommonHeader>
        ) : (
          <div className="text-right">{value}</div>
        )}
      </div>
    );
  }

  return (
    <div className={cn(className)}>
      <CommonHeader size="sm" className="text-[#6D4C41]!">
        {label}
      </CommonHeader>
      {typeof value === "string" || typeof value === "number" ? (
        <CommonHeader size="sm" className="text-[#3E2723]!">
          {value}
        </CommonHeader>
      ) : (
        <div className="mt-1">{value}</div>
      )}
    </div>
  );
};

export default InfoField;
