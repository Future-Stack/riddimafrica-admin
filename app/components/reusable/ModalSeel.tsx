import { ReactNode } from "react";
import { CircleX } from "lucide-react";

interface ModalShellProps {
    isOpen: boolean;
    onClose: () => void;
    /** Simple string title, rendered as the default h2/subtitle header. Ignored if `header` is provided. */
    title?: string;
    subtitle?: ReactNode;
    /** Custom header content (e.g. icon + title + subtitle combos). Overrides `title`/`subtitle` when provided; the close button is still rendered alongside it. */
    header?: ReactNode;
    /** Tailwind max-width class, e.g. "max-w-xl", "max-w-[1152px]" */
    maxWidthClassName?: string;
    /** Tailwind rounded class for the card, e.g. "rounded-xl", "rounded-2xl" */
    roundedClassName?: string;
    children: ReactNode;
}

/**
 * Shared modal shell used across admin review/product modals.
 * Handles the backdrop, card container, header (title/subtitle or custom) and close icon,
 * so individual modals only need to supply their own body content.
 */
export function ModalShell({
    isOpen,
    onClose,
    title,
    subtitle,
    header,
    maxWidthClassName = "max-w-xl",
    roundedClassName = "rounded-2xl",
    children,
}: ModalShellProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className={`bg-white ${roundedClassName} w-full ${maxWidthClassName} p-6 font-inter shadow-xl max-h-[90vh] overflow-y-auto`}>
                <div className="flex items-start justify-between mb-6">
                    {header ?? (
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-[#3E2723] leading-7 mb-1.5">{title}</h2>
                            {subtitle && (
                                <p className="text-sm text-[#787A7F] font-medium leading-5">{subtitle}</p>
                            )}
                        </div>
                    )}
                    <button onClick={onClose} className="text-[#3E2723] hover:text-black cursor-pointer shrink-0" aria-label="Close">
                        <CircleX size={20} />
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
} 
