"use client";

import { Check } from "lucide-react";
import { useState } from "react";

interface CustomCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
}

const CustomCheckbox = ({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
}: CustomCheckboxProps) => {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = isControlled ? checked : internalChecked;

  const toggle = () => {
    const next = !isChecked;
    if (!isControlled) setInternalChecked(next);
    onCheckedChange?.(next);
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isChecked}
      onClick={toggle}
      className={`
        flex items-center gap-2
        cursor-pointer
      `}
    >
      <span
        className={`
          flex h-6 w-6 items-center justify-center
          rounded-[6px]
          border-2
          transition-all duration-200
          ${isChecked ? "border-yellow bg-yellow" : "border-br bg-white"}
        `}
      >
        {isChecked && (
          <Check size={26} strokeWidth={3} className="text-white" />
        )}
      </span>
      {label && (
        <span className="text-sm font-medium text-black">{label}</span>
      )}
    </button>
  );
};

export default CustomCheckbox;
