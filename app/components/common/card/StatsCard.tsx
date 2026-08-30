"use client";

import Link from "next/link";
import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

import CommonHeader from "../header/CommonHeader";

export interface StatsCardHeaderProps {
  title: string;
  icon: ReactNode;
  iconBgColor?: string;
}

export interface StatsCardFooterProps {
  description?: ReactNode;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
}

export interface StatsCardProps {
  title?: string;
  icon?: ReactNode;
  iconBgColor?: string;
  value: string | number;
  bgColor: string;
  description?: ReactNode;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
  className?: string;
  headerProps?: StatsCardHeaderProps;
  footerProps?: StatsCardFooterProps;
}

export const StatsCardHeader: React.FC<StatsCardHeaderProps> = ({
  title,
  icon,
  iconBgColor = "bg-white/10",
}) => {
  return (
    <div className="flex items-start justify-between w-full gap-3">
      <CommonHeader size="sm" className="text-[#E8D3B9]! font-medium leading-5">
        {title}
      </CommonHeader>
      <div
        className={cn(
          "shrink-0 p-2 rounded-lg flex items-center justify-center",
          iconBgColor,
        )}
      >
        {icon}
      </div>
    </div>
  );
};

export const StatsCardFooter: React.FC<StatsCardFooterProps> = ({
  description,
  actionText,
  actionHref,
  onActionClick,
}) => {
  if (!description && !actionText) return null;

  const showArrow = Boolean(actionText && !actionText.includes("→"));
  const actionClassName =
    "inline-flex items-center gap-1 font-medium text-yellow hover:text-amber-300 font-inter transition-colors group text-sm leading-6 shrink-0";

  const actionContent = (
    <>
      {actionText}
      {showArrow && (
        <span
          aria-hidden
          className="transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      )}
    </>
  );

  return (
    <div className="flex items-end justify-between w-full gap-3 mt-auto pt-4">
      {description ? (
        <CommonHeader
          size="xs"
          className="text-white/70! font-medium leading-4"
        >
          {description}
        </CommonHeader>
      ) : (
        <span />
      )}

      {actionText &&
        (actionHref ? (
          <Link href={actionHref} className={actionClassName}>
            {actionContent}
          </Link>
        ) : (
          <button
            type="button"
            onClick={onActionClick}
            className={actionClassName}
          >
            {actionContent}
          </button>
        ))}
    </div>
  );
};

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  icon,
  iconBgColor,
  value,
  bgColor,
  description,
  actionText,
  actionHref,
  onActionClick,
  className,
  headerProps,
  footerProps,
}) => {
  const resolvedTitle = title ?? headerProps?.title ?? "";
  const resolvedIcon = icon ?? headerProps?.icon;
  const resolvedIconBg = iconBgColor ?? headerProps?.iconBgColor;
  const resolvedDescription = description ?? footerProps?.description;
  const resolvedActionText = actionText ?? footerProps?.actionText;
  const resolvedActionHref = actionHref ?? footerProps?.actionHref;
  const resolvedActionClick = onActionClick ?? footerProps?.onActionClick;

  return (
    <div
      className={cn(
        "flex flex-col h-full p-5 rounded-xl text-white shadow-lg",
        bgColor,
        className,
      )}
    >
      <StatsCardHeader
        title={resolvedTitle}
        icon={resolvedIcon}
        iconBgColor={resolvedIconBg}
      />

      <CommonHeader
        size="3xl"
        as="h2"
        className="mt-4 text-[#E6E8EB]! font-bold tracking-tight"
      >
        {value}
      </CommonHeader>

      <StatsCardFooter
        description={resolvedDescription}
        actionText={resolvedActionText}
        actionHref={resolvedActionHref}
        onActionClick={resolvedActionClick}
      />
    </div>
  );
};

interface StatsCardGridProps {
  items: StatsCardProps[];
  className?: string;
}

export const StatsCardGrid: React.FC<StatsCardGridProps> = ({
  items,
  className,
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
        className,
      )}
    >
      {items.map((item, index) => (
        <StatsCard
          key={`${item.title ?? item.headerProps?.title ?? "stat"}-${index}`}
          {...item}
        />
      ))}
    </div>
  );
};
