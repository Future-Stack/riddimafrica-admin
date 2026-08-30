"use client";

import { CircleX } from "lucide-react";
import { ReactNode } from "react";

interface ModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: ReactNode;
  header?: ReactNode;
  maxWidthClassName?: string;
  roundedClassName?: string;
  children: ReactNode;
}
const ModalShell: React.FC<ModalShellProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  header,
  maxWidthClassName = "max-w-xl",
  roundedClassName = "rounded-2xl",
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div
        className={`bg-white ${roundedClassName} w-full ${maxWidthClassName} p-6  shadow-xl max-h-[90vh] overflow-y-auto space-y-6`}
      >
        <div className="flex items-start justify-between ">
          {header ?? (
            <div>
              <h2 className="text-xl md:text-[26px] font-bold text-[#3E2723] leading-7 mb-1.5">
                {title}
              </h2>
              {subtitle && (
                <p className="text-sm text-[#787A7F] font-medium leading-5">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          <button
            onClick={onClose}
            className="text-[#3E2723] hover:text-black cursor-pointer shrink-0"
            aria-label="Close"
          >
            <CircleX size={20} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default ModalShell;
