import { cn } from "@/lib/utils";
import {
  Ban,
  ChevronRight,
  Eye,
  Pencil,
  Plus,
  ShoppingBag,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { PiSlidersHorizontal } from "react-icons/pi";

type ActionType =
  | "view"
  | "disable"
  | "filter"
  | "add"
  | "suspend"
  | "delete"
  | "edit"
  | "merch"
  | "performance"
  | "process"
  | "release"
  | "chat";

type ActionButtonProps = {
  type: ActionType;
  label?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const iconOnlyClassName =
  "h-8 w-8 rounded-md inline-flex items-center justify-center hover:bg-[#F4F6F8]";

const actionConfig = {
  view: {
    icon: Eye,
    label: "View",
    showLabel: false,
    className: cn(iconOnlyClassName, "text-[#897766]"),
  },
  disable: {
    icon: Ban,
    label: "Disable",
    showLabel: false,
    className: cn(
      iconOnlyClassName,
      "text-[#D4183D] hover:text-[#E53935]",
    ),
  },
  suspend: {
    icon: Ban,
    label: "Suspend",
    showLabel: false,
    className: cn(
      iconOnlyClassName,
      "text-[#D4183D] hover:text-[#E53935]",
    ),
  },
  delete: {
    icon: Trash2,
    label: "Delete",
    showLabel: false,
    className: cn(
      iconOnlyClassName,
      "text-[#D4183D] hover:text-[#E53935]",
    ),
  },
  edit: {
    icon: Pencil,
    label: "Edit",
    showLabel: false,
    className: cn(iconOnlyClassName, "text-[#897766]"),
  },
  merch: {
    icon: ShoppingBag,
    label: "Merch",
    showLabel: false,
    className: cn(iconOnlyClassName, "text-[#E5B54F]"),
  },
  performance: {
    icon: TrendingUp,
    label: "Performance",
    showLabel: false,
    className: cn(iconOnlyClassName, "text-[#3BB515]"),
  },
  process: {
    icon: ChevronRight,
    label: "Process",
    showLabel: true,
    iconPosition: "right" as const,
    className:
      "bg-[#eab308] text-white px-4 py-2 rounded-md text-xs font-bold hover:bg-yellow-600 transition-colors inline-flex items-center justify-center gap-1 whitespace-nowrap",
  },
  release: {
    icon: ChevronRight,
    label: "Release Payout",
    showLabel: true,
    iconPosition: "right" as const,
    className:
      "bg-[#326F72] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#0d281b] transition-colors inline-flex items-center justify-center gap-1 whitespace-nowrap",
  },
  chat: {
    icon: ChevronRight,
    label: "View chat",
    showLabel: true,
    iconPosition: "right" as const,
    className:
      "bg-[#E6A4001A] hover:bg-[#E6A40033] text-yellow border border-[#E6A40033] font-bold px-3 py-1.5 rounded-[6px] text-xs inline-flex items-center justify-center gap-1 transition-colors whitespace-nowrap",
  },
  filter: {
    icon: PiSlidersHorizontal,
    label: "Filter",
    showLabel: true,
    className:
      "bg-[#D8CBB8]/50 p-4 text-[#897766] rounded-full flex items-center gap-2 text-sm font-medium shrink-0 whitespace-nowrap",
  },
  add: {
    icon: Plus,
    label: "Add Product",
    showLabel: true,
    className:
      "px-5 py-3.5 rounded-md bg-yellow text-white text-sm font-medium font-inter hover:bg-[#dd951b] transition-colors whitespace-nowrap flex items-center gap-2",
  },
} as const;

const ActionButton = ({
  type,
  label: labelOverride,
  onClick,
  className,
  disabled = false,
}: ActionButtonProps) => {
  const config = actionConfig[type];
  const {
    icon: Icon,
    label: defaultLabel,
    showLabel,
    className: typeClassName,
  } = config;
  const label = labelOverride ?? defaultLabel;
  const iconOnRight =
    "iconPosition" in config && config.iconPosition === "right";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
        typeClassName,
        className,
      )}
    >
      {showLabel && iconOnRight && label}
      {showLabel ? (
        <Icon className={iconOnRight ? "h-4 w-4" : "h-5 w-5"} />
      ) : (
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      )}
      {showLabel && !iconOnRight && label}
    </button>
  );
};

export default ActionButton;
