"use client";

import CommonHeader from "@/app/components/common/header/CommonHeader";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export interface RevenueSplitSlice {
  label: string;
  percent: number;
  color: string;
}

interface RevenueSplitChartProps {
  slices: RevenueSplitSlice[];
}

export const RevenueSplitChart = ({ slices }: RevenueSplitChartProps) => {
  return (
    <div className="bg-[#FAF7F3] rounded-xl border border-[#C4CDD566] font-inter p-5">
      <CommonHeader size="lg" className="text-[#101828]!">
        Revenue Split
      </CommonHeader>
      <CommonHeader size="xs" className="text-[#624D3B]! mb-7">
        Platform vs Sellers/Artists
      </CommonHeader>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={slices}
              dataKey="percent"
              nameKey="label"
              innerRadius={50}
              outerRadius={72}
              paddingAngle={3}
              stroke="none"
            >
              {slices.map((s) => (
                <Cell key={s.label} fill={s.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2 mt-2">
        {slices.map((s) => (
          <div
            key={s.label}
            className="flex items-center justify-between text-xs"
          >
            <span className="flex items-center gap-2 text-gray-800 font-normal leading-4.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              {s.label}
            </span>
            <span className="font-medium text-sm text-yellow">{s.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
