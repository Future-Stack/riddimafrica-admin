import { cn } from "@/lib/utils";

interface CustomSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  checked,
  onCheckedChange,
  label,
  disabled = false,
  className,
}) => {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium text-black leading-5 font-inter",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className,
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        disabled={disabled}
        className="sr-only peer"
      />

      <div
        className={cn(
          "relative w-11 h-6 rounded-full",
          "bg-gray-200",
          "after:content-[''] after:absolute after:top-0.5 after:start-[2px]",
          "after:bg-white after:border-gray-300 after:border",
          "after:rounded-full after:h-5 after:w-5",
          "after:transition-all",
          "peer-checked:after:translate-x-full",
          "peer-checked:after:border-white",
          "peer-checked:bg-[#543D2B]",
        )}
      />

      {label && <span>{label}</span>}
    </label>
  );
};

export default CustomSwitch;
