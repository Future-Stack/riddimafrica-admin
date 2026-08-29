"use client";

import { Check } from "lucide-react";
import { useState } from "react";

const CustomCheckbox = () => {
  const [checked, setChecked] = useState(false);

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => setChecked((prev) => !prev)}
      className={`
        flex h-6 w-6 items-center justify-center
        rounded-[6px]
        border-2
        cursor-pointer
        transition-all duration-200
        ${checked ? "border-yellow bg-yellow" : "border-br bg-white"}
      `}
    >
      {checked && <Check size={26} strokeWidth={3} className="text-white" />}
    </button>
  );
};

export default CustomCheckbox;
