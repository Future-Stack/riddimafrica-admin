/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";


export interface Column<T> {
    header: string;
    key: string;
    
    render?: (row: T) => React.ReactNode;
    className?: string;
}


interface GenericTableProps<T> {
    data: T[];
    columns: Column<T>[];
 
    headerBgColor?: string;
    headerTextColor?: string;
    borderColor?: string;
    rowHoverBg?: string;
 
    pagination?: {
        currentPage: number;
        totalPages: number;
        onPageChange: (page: number) => void;
    };
}

export default function GenericTable<T>({
    data,
    columns,
    headerBgColor = "bg-[#3C182F]", 
    headerTextColor = "text-white",
    borderColor = "border-[#E4E6E733]",
    rowHoverBg = "hover:bg-[#f7f3eb]/50",
    pagination,
}: GenericTableProps<T>) {
    return (
        <div className="w-full  rounded-xl font-inter overflow-hidden">

            {/* Table Wrapper (Responsive Overflow Container) */}
            <div className="w-full overflow-x-auto border border-[#EEF2FF] rounded-lg shadow-sm" style={{ borderColor }}>
                <table className="w-full text-left border-collapse table-auto min-w-[700px]">

                    {/* Header Line */}
                    <thead>
                        <tr className={`${headerBgColor} ${headerTextColor}`}>
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    className={`py-3.5 px-5 text-sm sm:text-base font-medium leading-5 text-center tracking-wide border-r last:border-r-0 ${col.className || ""}`}
                                    style={{ borderColor: "#E4E6E733" }}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Body Rows */}
                    <tbody className="divide-y devide-[#EEF2FF] text-[#2c2c2c]" >
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex} className={`transition-colors ${rowHoverBg}`}>
                                {columns.map((col, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className={`py-4 px-5 text-sm sm:text-base leading-6  border-r last:border-r-0 font-medium ${col.className || "border-[#EEF2FF]"}`}
                                        style={{ borderColor }}
                                    >
                                        {col.render ? col.render(row) : (row as any)[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Component - conditional render */}
            {pagination && (
                <div className="flex items-center justify-center gap-2 mt-6 py-2 text-sm font-medium select-none text-[#444]">
                    <button
                        onClick={() => pagination.onPageChange(Math.max(1, pagination.currentPage - 1))}
                        disabled={pagination.currentPage === 1}
                        className="flex items-center gap-1 px-2 py-1 hover:text-black disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                    >
                        ‹ Previous
                    </button>

                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => pagination.onPageChange(page)}
                            className={`w-8 h-8 flex items-center justify-center rounded-md border text-xs font-bold cursor-pointer transition-colors ${pagination.currentPage === page
                                    ? "bg-[#ede2d1] border-[#c5baab] text-black"
                                    : "bg-transparent border-transparent hover:bg-gray-100"
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    <span className="text-gray-400 px-1">...</span>

                    <button
                        onClick={() => pagination.onPageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
                        disabled={pagination.currentPage === pagination.totalPages}
                        className="flex items-center gap-1 px-2 py-1 hover:text-black disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                    >
                        Next ›
                    </button>
                </div>
            )}
        </div>
    );
}