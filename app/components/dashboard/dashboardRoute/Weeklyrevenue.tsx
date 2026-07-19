/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
    { name: 'Mon', revenue: 1.10, commission: 0.71 },
    { name: 'Tue', revenue: 1.6, commission: 1.84 },
    { name: 'Wed', revenue: 1.30, commission: 0.84 },
    { name: 'Thu', revenue: 2.10, commission: 1.36 },
    { name: 'Fri', revenue: 2.90, commission: 1.88 },
    { name: 'Sat', revenue: 3.15, commission: 2.05 },
    { name: 'Sun', revenue: 2.40, commission: 1.56 },
];


const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-[#14b8a6] text-white px-4 py-3 rounded-lg border-0 shadow-md min-w-[160px]">
                <p className="font-extrabold text-xs uppercase tracking-wider">{data.name === 'Tue' ? 'TUE' : data.name.toUpperCase()}</p>
                <p className="text-xs text-teal-50 font-medium mt-1">
                    Revenue: <span className="font-bold">UGX {data.revenue.toFixed(2)}M</span>
                </p>
                <p className="text-xs text-teal-50 font-medium mt-0.5">
                    Commission: <span className="font-bold">UGX {data.commission.toFixed(2)}M</span>
                </p>
            </div>
        );
    }
    return null;
};

export default function WeeklyRevenueChart() {
    return (
        <div className="w-full bg-[#FAF7F3] p-5 rounded-xl border border-[#C4CDD566] rounded-xl text-[#3a2211]">

          
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ">
                <div className='mb-5'>
                    <h2 className="text-base sm:text-lg font-medium leaidng-7 text-titleColor font-inter">
                        Weekly Revenue
                    </h2>
                    <p className="text-xs  text-descColor font-medium font-inter leading-4 mt-0.5">
                        Revenue vs Platform Commission
                    </p>
                </div>

               
                <div className="flex items-center gap-4 text-xs font-normal text-[#787A7F] font-inter">
                    <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-[#E6A400]" />
                        <span>Revenue</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-[#624D3B]" />
                        <span>Commission (35%)</span>
                    </div>
                </div>
            </div>

            
            <div className="w-full h-[260px] sm:h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="weeklyRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#115e59" stopOpacity={0.12} />
                                <stop offset="95%" stopColor="#115e59" stopOpacity={0.01} />
                            </linearGradient>
                        </defs>

                        
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#88A8A3" syncWithTicks={true} />

                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#787A7F', fontSize: 13, fontWeight: 500 }}
                            dy={10}
                        />

                        <YAxis
                            domain={[0, 3.5]}
                            ticks={[0, 0.8, 1.6, 2.4, 3.2]}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(val) => `${val === 0 ? '0M' : val.toFixed(1) + 'M'}`}
                            tick={{ fill: '#787A7F', fontSize: 13, fontWeight: 500 }}
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ stroke: '#115e59', strokeWidth: 1, opacity: 0.4 }}
                        />

                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#115e59"
                            strokeWidth={2.5}
                            fill="#C2DFDB80"
                            activeDot={{ r: 5, fill: '#14b8a6', stroke: '#fdfaf4', strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}