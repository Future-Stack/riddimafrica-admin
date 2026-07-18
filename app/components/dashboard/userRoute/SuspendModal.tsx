import React, { useState } from 'react';

interface SuspendModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (reason: string) => void;
}

export const SuspendModal: React.FC<SuspendModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const [reason, setReason] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!reason.trim()) return;
        onConfirm(reason);
        setReason('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-[#EFEAE2]">
                <h3 className="text-center text-xl font-medium text-[#3D2612] px-4 leading-snug mb-5">
                    Are you sure you want to Suspend the User Account
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-[#7A6D63]">Reason</label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Suspend reason"
                            required
                            className="w-full h-28 rounded-xl border border-[#F8C1BA] bg-[#FDE2DE]/30 p-3 text-sm text-[#C96860] placeholder-[#C96860]/60 focus:outline-none focus:ring-1 focus:ring-[#C96860] resize-none"
                        />
                    </div>

                    <div className="flex gap-3 mt-2">
                        <button
                            type="submit"
                            className="flex-1 rounded-xl bg-[#D93822] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#BC2F1B]"
                        >
                            Suspend
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-xl border border-[#D0D5DD] bg-white py-3 text-sm font-medium text-[#475467] transition-colors hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};