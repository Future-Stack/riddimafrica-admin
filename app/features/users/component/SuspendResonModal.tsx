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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 ">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ">
                <h2 className="mb-6 text-center text-xl font-medium leading-7 font-inter text-black sm:text-2xl">
                    Are you sure you want to Suspend <br className="hidden sm:inline" /> the User Account
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
                            className="w-full resize-none rounded-lg border border-[#FFA8A9] bg-[#FF00041A] p-3 text-sm text-[#DB321C] placeholder-[DB321C]focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100"
                        />
                    </div>

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4">
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-[#DB321C] py-3 text-center text-sm font-semibold text-white transition hover:bg-[#c8281a] cursor-pointer focus:outline-none"
                        >
                            Suspend
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full rounded-xl border border-slate-300 py-3 cursor-pointer text-center text-sm font-semibold text-[#52443B] transition bg-gray-100 hover:bg-slate-50 focus:outline-none"
                        >
                            Cancel
                        </button>
                     
                    </div>
                </form>
            </div>
        </div>
    );
};