"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface SelectOption<T extends string> {
  label: string;
  value: T;
}

interface SelectProps<T extends string> {
  value: T | undefined;
  item: readonly SelectOption<T>[];
  w?: number;
  onValueChange: (val: T) => void;
  className?: string;
  contentClassName?: string;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

const CommonSelect = <T extends string>({
  value,
  item,
  w = 120,
  onValueChange,
  disabled = false,
  className,
  contentClassName,
  placeholder,
  fullWidth = false,
}: SelectProps<T>) => {
  return (
    <Select
      value={value || undefined}
      onValueChange={(next) => {
        if (next == null) return;
        onValueChange(next);
      }}
      disabled={disabled}
    >
      <SelectTrigger
        style={fullWidth ? undefined : { minWidth: w }}
        className={cn(
          "bg-white border border-[#E8DCC8]! px-3 h-11 cursor-pointer rounded-lg text-sm text-[#543D2B] transition-all duration-200",
          fullWidth && "w-full",
          disabled && "opacity-50 cursor-not-allowed",
          className,
        )}
      >
        <SelectValue placeholder={placeholder || "Select an option"}>
          {item.find((option) => option.value === value)?.label}
        </SelectValue>
      </SelectTrigger>

      <SelectContent
        align="start"
        className={cn(
          "bg-white border border-[#E8DCC8] rounded-lg shadow-md",
          contentClassName,
        )}
      >
        {item.map((option, index) => (
          <SelectItem
            key={option.value + index}
            value={option.value}
            className="cursor-pointer px-4 py-2 hover:bg-gray-100 transition-colors rounded"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CommonSelect;
