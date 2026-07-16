"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const sellersData = [
    { name: 'Alise', sales: 3.05 },
    { name: 'LagosThreads', sales: 2.25 },
    { name: 'AbujaVibes', sales: 1.95 },
    { name: 'NigerianSwag', sales: 1.35 },
    { name: 'AfroMerch', sales: 0.98 },
];

export default function TopSellersChart() {
    return (
        <div className="w-full bg-[#FAF7F3] p-5 rounded-xl border border-[#C4CDD566] rounded-xl text-[#3a2211]">
            <div className="mb-5">
                <h2 className="text-base sm:text-lg font-medium leaidng-7 text-titleColor font-inter">
                    Top Sellers
                </h2>
                <p className="text-xs  text-descColor font-medium font-inter leading-4 mt-0.5">
                    This month
                </p>
            </div>
            <div className="w-full h-[280px] sm:h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={sellersData}
                        layout="vertical"
                        margin={{ top: 5, right: 20, left: 35, bottom: 5 }}
                        barCategoryGap="25%"
                    >
                        <CartesianGrid
                            horizontal={true}
                            vertical={false}
                            strokeDasharray="3 3"
                            stroke="#655042"
                            opacity={0.7}
                            syncWithTicks={true}
                        />
                        <XAxis
                            type="number"
                            domain={[0, 3.2]}
                            ticks={[0, 0.8, 1.6, 2.4, 3.2]}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(val) => `${val === 0 ? '0M' : val.toFixed(1) + 'M'}`}
                            tick={{ fill: '#806D49', fontSize: 13, fontWeight: 500 }}
                            dy={0}
                        />
                        <YAxis
                            dataKey="name"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#806D49', fontSize: 13, fontWeight: 500 }}
                           
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-[#3a1c2b] text-white px-3 py-1.5 rounded text-xs font-semibold shadow-md">
                                            {payload[0].value}M Sales
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar
                            dataKey="sales"
                            fill="#3C182F"
                            radius={[0, 8, 8, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}