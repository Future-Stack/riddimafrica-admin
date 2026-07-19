import React, { useState } from 'react';

interface SuspendReasonModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (reason: string) => void;
}

export const SuspendReasonModal: React.FC<SuspendReasonModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
}) => {
    const [reason, setReason] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm(reason);
        setReason('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-8">
                <h2 className="mb-6 text-center text-xl font-bold text-[#2B1B12] sm:text-2xl">
                    Are you sure you want to Suspend <br className="hidden sm:inline" /> the User Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-[#52443B]">
                            Reason
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Suspend reason"
                            rows={4}
                            required
                            className="w-full resize-none rounded-xl border border-red-200 bg-[#FFF5F5] p-3 text-sm text-red-900 placeholder-red-300 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100"
                        />
                    </div>

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full rounded-xl border border-slate-300 py-3 text-center text-sm font-semibold text-[#52443B] transition hover:bg-slate-50 focus:outline-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-[#E03121] py-3 text-center text-sm font-semibold text-white transition hover:bg-[#c8281a] focus:outline-none"
                        >
                            Suspend
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};