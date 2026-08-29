"use client";

import clsx from "clsx";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import ButtonWithLoading from "./ButtonWithLoading";

const BASE_STYLE =
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-full sm:w-auto";

const SHAPE_STYLE = {
  pill: "rounded-full",
  rounded: "rounded-[10px]",
} as const;

const SIZE_STYLE = {
  sm: "px-4 py-2 text-sm [&_svg]:size-4",
  md: "px-5 py-2.5 text-base [&_svg]:size-5",
  lg: "px-6 py-3.5 text-lg [&_svg]:size-5",
  xl: "px-8 py-4 text-xl [&_svg]:size-6",
} as const;

const VARIANT_STYLE = {
  primary:
    "text-white bg-gradient-to-br from-[#E6A400] to-[#E6B652] shadow-[0_8px_24px_0_rgba(187,72,61,0.25)]",
  cancel:
    "bg-[#F4F6F8] shadow-[0_8px_24px_0_rgba(244,210,66,0.20)] border border-br text-[#637381] hover:bg-[#F4F6F8]/80",
  outline: "text-primary-green border-2 border-primary-green hover:bg-green-50",
  outlineBlue: "text-[#155DFC] border-2 border-[#155DFC] hover:bg-[#155DFC]/10",
  destructive: "bg-red-500 text-white shadow-sm hover:opacity-90",
  secondary: "bg-[#6A7282] text-white hover:bg-[#6A7282]/90",
  ghost: "text-primary-green hover:bg-primary-green hover:text-white",
} as const;

interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  size?: keyof typeof SIZE_STYLE;
  variant?: keyof typeof VARIANT_STYLE;
  shape?: keyof typeof SHAPE_STYLE;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showDefaultIcon?: boolean;
  to?: string;
  isLoading?: boolean;
  loadingText?: string;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  className,
  size = "md",
  variant = "primary",
  shape = "rounded",
  leftIcon,
  rightIcon,
  showDefaultIcon = false,
  type = "button",
  to,
  disabled,
  isLoading = false,
  loadingText = "Loading...",
  ...props
}) => {
  const classes = clsx(
    BASE_STYLE,
    SHAPE_STYLE[shape],
    SIZE_STYLE[size],
    VARIANT_STYLE[variant],
    className,
  );

  const isDisabled = disabled || isLoading;

  const content = isLoading ? (
    <ButtonWithLoading title={loadingText} />
  ) : (
    <>
      {leftIcon ?? (showDefaultIcon && <Plus />)}
      {children}
      {rightIcon}
    </>
  );

  if (to) {
    return (
      <Link
        href={to}
        className={clsx(
          classes,
          isDisabled && "pointer-events-none opacity-50",
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <button disabled={isDisabled} type={type} className={classes} {...props}>
      {content}
    </button>
  );
};

export default CommonButton;
