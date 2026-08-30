"use client";

import CommonHeader from "@/app/components/common/header/CommonHeader";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export interface DonutSlice {
  label: string;
  value: number;
  percent: string;
  color: string;
}

interface DonutSplitChartProps {
  title: string;
  subtitle?: string;
  slices: DonutSlice[];
}

const DonutSplitChart = ({ title, subtitle, slices }: DonutSplitChartProps) => {
  return (
    <div className="bg-[#FAF7F3] rounded-xl border border-[#C4CDD566] font-inter p-5">
      <CommonHeader size="lg" className="text-[#101828]!">
        {title}
      </CommonHeader>
      {subtitle && (
        <CommonHeader size="xs" className="text-[#624D3B]!">
          {subtitle}
        </CommonHeader>
      )}

      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={slices}
              dataKey="value"
              nameKey="label"
              innerRadius={42}
              outerRadius={60}
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

      <div className="space-y-1.5 mt-2">
        {slices.map((s) => (
          <div
            key={s.label}
            className="flex items-center justify-between text-xs"
          >
            <span className="flex items-center gap-2 text-gray-600 font-medium">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              {s.label}
            </span>
            <span className="text-[#787A7F]">{s.percent}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutSplitChart;
