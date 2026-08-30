"use client";
import { Search } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const DashboardSearch: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
  placeholder = "Search",
  className,
}) => {
  return (
    <div className="relative w-full min-w-0 lg:w-56">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#897766]"
      />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        placeholder={placeholder}
        className={cn(
          "w-full pl-9 pr-4 py-3.5 rounded-full bg-white border border-[#E8DCC8] text-sm text-[#897766] outline-none",
          className,
        )}
      />
    </div>
  );
};

export default DashboardSearch;
