import { useState, FormEvent } from "react";
import { CircleX } from "lucide-react";

interface SellerSuspendModalProps {
    isOpen: boolean;
    sellerName: string;
    onClose: () => void;
    onConfirm: (reason: string) => void;
}

export function SellerSuspendModal({ isOpen, sellerName, onClose, onConfirm }: SellerSuspendModalProps) {
    const [reason, setReason] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!reason.trim()) return;
        onConfirm(reason.trim());
        setReason("");
    };

    const handleClose = () => {
        setReason("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl relative">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-[#3E2723] hover:text-black cursor-pointer "
                    aria-label="Close"
                >
                    <CircleX size={20} />
                </button>

                <h2 className="mb-6 text-center text-xl font-medium leading-7 font-inter text-black sm:text-2xl mt-4">
                    Are you sure you want to Suspend <br className="hidden sm:inline" />
                    <span className="font-medium text-[#101828]">{sellerName}</span>?
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-titleColor font-inter">
                            Reason
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Suspend reason"
                            rows={4}
                            required
                            className="w-full resize-none rounded-lg border border-[#FFA8A9] bg-[#FF00041A] p-3 text-sm text-[#DB321C] placeholder-[#DB321C]/60 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100"
                        />
                    </div>

                    <div className="flex items-center justify-center gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 rounded-lg border border-gray-200 py-3 px-7 text-sm font-medium font-inter leading-5 text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!reason.trim()}
                            className="flex-1 rounded-lg bg-[#b84b42] py-3 px-7 text-sm font-medium font-inter leading-5 text-white cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Suspend
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}