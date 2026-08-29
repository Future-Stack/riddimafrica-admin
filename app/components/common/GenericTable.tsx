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
    <div className="w-full  font-inter overflow-hidden">
      <div className="p-4  bg-[#FAF7F3] border border-[#E4E6E7] rounded-xl">
        {/* Table Wrapper (Responsive Overflow Container) */}
        <div
          className="w-full overflow-x-auto border border-[#EEF2FF]  rounded-lg "
          style={{ borderColor }}
        >
          <table className="w-full text-left border-collapse  table-auto min-w-[1200px]">
            {/* Header Line */}
            <thead>
              <tr className={`${headerBgColor} ${headerTextColor}`}>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className={`py-4 px-5 text-sm sm:text-base leading-6 border-r last:border-r-0 font-medium border-[#EEF2FF] ${
                      col.className ?? ""
                    }`}
                    style={{ borderColor }}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body Rows */}
            <tbody className="bg-[#FAF7F3] text-[#2c2c2c]">
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`transition-colors border-b border-[#EEF2FF] ${rowHoverBg}`}
                  >
                    {columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className={`py-4 px-5 text-sm sm:text-base text-center leading-6  border-r last:border-r-0 font-medium font-inter ${col.className || "border-[#EEF2FF]"}`}
                        style={{ borderColor }}
                      >
                        {col.render ? col.render(row) : (row as any)[col.key]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-12 text-center text-gray-500 text-base"
                  >
                    No data matches your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Component - conditional render */}
      {pagination && (
        <div className="flex items-center justify-center gap-2 mt-6 py-2 text-sm font-medium select-none text-[#444]">
          <button
            onClick={() =>
              pagination.onPageChange(Math.max(1, pagination.currentPage - 1))
            }
            disabled={pagination.currentPage === 1}
            className="flex items-center gap-1 px-2 py-1 text-black text-sm font-medium leading-5 font-inter disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="5"
              height="9"
              viewBox="0 0 5 9"
              fill="none"
            >
              <path
                d="M4.5 8.5L0.5 4.5L4.5 0.5"
                stroke="#09090B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>{" "}
            Previous
          </button>

          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => pagination.onPageChange(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-md border text-sm font-medium leading-5 font-inter cursor-pointer transition-colors ${
                  pagination.currentPage === page
                    ? "bg-[#FBF1E1] border-[#624D3B] text-black"
                    : "bg-transparent border-transparent hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ),
          )}

          <span className="text-gray-400 px-1">...</span>

          <button
            onClick={() =>
              pagination.onPageChange(
                Math.min(pagination.totalPages, pagination.currentPage + 1),
              )
            }
            disabled={pagination.currentPage === pagination.totalPages}
            className="flex items-center gap-1 px-2 py-1 text-black text-sm font-medium leading-5 font-inter disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
          >
            Next{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="#09090B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
