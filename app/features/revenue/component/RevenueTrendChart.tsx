/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CommonHeader from "@/app/components/common/header/CommonHeader";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface RevenueTrendPoint {
  month: string;
  revenueUGX: number;
  payoutUGX: number;
}

interface RevenueTrendChartProps {
  data: RevenueTrendPoint[];
  rangeOptions?: string[];
  range: string;
  onRangeChange: (range: string) => void;
}

const formatShort = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const revenue =
    payload.find((p: any) => p.dataKey === "revenueUGX")?.value ?? 0;
  const payout =
    payload.find((p: any) => p.dataKey === "payoutUGX")?.value ?? 0;
  return (
    <div className="bg-[#19A59A] text-white rounded-lg px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold mb-1">{label}</p>
      <p>Revenue: UGX {formatShort(revenue)}</p>
      <p>Payout: UGX {formatShort(payout)}</p>
    </div>
  );
};

const RevenueTrendChart = ({
  data,
  rangeOptions = ["Last 3 month", "Last 6 month", "Last 12 month"],
  range,
  onRangeChange,
}: RevenueTrendChartProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#FAF7F3] rounded-xl border border-[#C4CDD566] font-inter p-5">
      <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
        <div>
          <CommonHeader size="lg" className="text-[#101828]!">
            Revenue Trend
          </CommonHeader>
          <CommonHeader size="xs" className="text-[#624D3B]!">
            Monthly revenue vs payouts
          </CommonHeader>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-xs text-[#787A7F] font-normal">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E6A400]" /> Revenue
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2D6365]" /> Pay-out
            </span>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-1.5 rounded-lg bg-[#D8CBB880] px-3 py-2 text-sm font-normal text-[#101828] cursor-pointer"
            >
              {range}
              <ChevronDown
                size={14}
                className={`transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
            {open && (
              <div className="absolute right-0 mt-1 w-40 bg-[#D8CBB880] rounded-lg z-10 overflow-hidden">
                {rangeOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      onRangeChange(opt);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs cursor-pointer hover:bg-[#EFEAE2] ${
                      opt === range
                        ? "font-semibold text-[#101828]"
                        : "text-gray-500"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#115e59" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#115e59" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="4 4"
              stroke="#897766"
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `${formatShort(v)}`}
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenueUGX"
              stroke="#115e59"
              strokeWidth={2}
              fill="url(#revenueFill)"
            />
            <Area
              type="monotone"
              dataKey="payoutUGX"
              stroke="#E6A400"
              strokeWidth={0}
              fill="transparent"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueTrendChart;
