/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Pagination from "./button/Pagination";

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

const GenericTable = <T,>({
  data,
  columns,
  headerBgColor = "bg-[#3C182F]",
  headerTextColor = "text-white",
  borderColor = "border-[#E4E6E7]/20",
  rowHoverBg = "hover:bg-[#f7f3eb]/50",
  pagination,
}: GenericTableProps<T>) => {
  return (
    <div className="w-full   overflow-hidden">
      <div
        className="w-full overflow-x-auto border border-[#E4E6E7]/20  rounded-lg "
        style={{ borderColor }}
      >
        <table className="w-full text-left border-collapse  table-auto min-w-225">
          <thead>
            <tr className={`${headerBgColor} ${headerTextColor}`}>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`py-4 px-5 text-sm sm:text-base leading-6 border-r last:border-r-0 font-medium border-[#E4E6E7]/20 ${
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
                  className={`transition-colors border-b border-[#E4E6E7]/20 ${rowHoverBg}`}
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`py-4 px-5 text-sm sm:text-base text-center leading-6  border-r last:border-r-0 font-medium font-inter ${col.className || "border-[#E4E6E7]/20"}`}
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

      {pagination && (
        <div className="mt-6 py-2">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default GenericTable;
