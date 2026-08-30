"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pages: (number | string)[] = [];

  if (totalPages <= 4) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    const left = Math.max(currentPage - 1, 2);
    const right = Math.min(currentPage + 1, totalPages - 1);

    pages.push(1);

    if (left > 2) pages.push("...");

    for (let i = left; i <= right; i++) pages.push(i);

    if (right < totalPages - 1) pages.push("...");

    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 text-sm font-medium font-inter select-none text-[#444]">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-black disabled:cursor-not-allowed disabled:opacity-30 hover:bg-[#FBF1E1] cursor-pointer"
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-3 py-1.5 text-gray-400">
            ...
          </span>
        ) : (
          <button
            type="button"
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`min-w-8 h-8 px-3 py-1.5 rounded-md border cursor-pointer transition-colors ${
              currentPage === page
                ? "bg-[#FBF1E1] border-[#624D3B] text-black"
                : "bg-transparent border-transparent hover:bg-[#FBF1E1]"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-black disabled:cursor-not-allowed disabled:opacity-30 hover:bg-[#FBF1E1] cursor-pointer"
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
