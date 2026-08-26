import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export interface RevenueSplitSlice {
    label: string;
    percent: number;
    color: string;
}

interface RevenueSplitChartProps {
    slices: RevenueSplitSlice[];
}

export function RevenueSplitChart({ slices }: RevenueSplitChartProps) {
    return (
        <div className="bg-[#FAF7F3] rounded-xl border border-[#C4CDD566] font-inter p-5">
            <h3 className="text-base md:text-lg font-medium text-[#101828] font-inter leading-7">Revenue Split</h3>
            <p className="text-xs text-[#624D3B] font-medium leading-4 mt-0.5 mb-7">Platform vs Sellers/Artists</p>

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
                    <div key={s.label} className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 text-gray-800 font-normal leading-4.5">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                            {s.label}
                        </span>
                        <span className="font-medium text-sm text-[#E6A400]">{s.percent}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}