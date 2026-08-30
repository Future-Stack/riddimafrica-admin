"use client";
import type { ReactNode, Ref } from "react";

import ActionButton from "../button/ActionButton";
import DashboardSearch from "../DashboardSearch";
import CommonHeader from "./CommonHeader";

interface DashboardTopSectionProps {
  title: string;
  description?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showFilter?: boolean;
  onFilterClick?: () => void;
  filterRef?: Ref<HTMLDivElement>;
  filterContent?: ReactNode;
  actionLabel?: string;
  onActionClick?: () => void;
  extra?: ReactNode;
}

const DashboardTopSection = ({
  title,
  description,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  showFilter = false,
  onFilterClick,
  filterRef,
  filterContent,
  actionLabel,
  onActionClick,
  extra,
}: DashboardTopSectionProps) => {
  return (
    <div className="flex min-w-0 flex-col gap-5 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
      <div className="min-w-0 max-w-full lg:max-w-[min(100%,28rem)] xl:max-w-md">
        <h1 className="text-[26px] font-bold leading-tight text-[#3D2513]">
          {title}
        </h1>

        {description && (
          <CommonHeader size="xs" className="block min-w-0">
            {description}
          </CommonHeader>
        )}
      </div>

      <div className="flex w-full min-w-0 flex-wrap items-center gap-3 sm:gap-4 lg:w-auto lg:max-w-full lg:flex-1 lg:justify-end xl:flex-none">
        {(onSearchChange || showFilter) && (
          <div className="flex min-w-0 max-w-full items-center gap-3 sm:gap-4">
            {onSearchChange && (
              <div className="min-w-0 w-[min(100%,14rem)] sm:w-56">
                <DashboardSearch
                  searchQuery={searchValue}
                  setSearchQuery={onSearchChange}
                  placeholder={searchPlaceholder}
                />
              </div>
            )}

            {showFilter && (
              <div ref={filterRef} className="relative shrink-0">
                <ActionButton type="filter" onClick={onFilterClick} />
                {filterContent}
              </div>
            )}
          </div>
        )}

        {actionLabel && (
          <ActionButton
            type="add"
            label={actionLabel}
            onClick={onActionClick}
            className="shrink-0 max-w-full"
          />
        )}

        {extra}
      </div>
    </div>
  );
};

export default DashboardTopSection;
