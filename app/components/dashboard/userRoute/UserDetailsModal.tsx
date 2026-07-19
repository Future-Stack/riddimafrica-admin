// UserDetailsModal.tsx
import React, { useState } from 'react';

interface UserDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuspendTrigger: () => void;
    user: {
        name: string;
        email: string;
        status: string;
        country: string;
        totalLogins: number;
        lastLogin: string;
    };
}

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ isOpen, onClose, onSuspendTrigger, user }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
            <div className="w-full max-w-2xl bg-white border border-[#EFEAE2] rounded-2xl p-6 shadow-xl relative">
                {/* Close Header Button */}
                <div className="flex items-center justify-between border-b border-[#F4EFE6] pb-4 mb-5">
                    <h2 className="text-xl font-bold text-[#3D2612]">User Details</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <h3 className="text-sm font-bold text-[#543D2B] tracking-wide uppercase">Account Information</h3>
                        <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-medium text-[#3D2612]">
                            <input type="checkbox" checked={isAuthorized} onChange={() => setIsAuthorized(!isAuthorized)} className="sr-only peer" />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#543D2B]"></div>
                            <span>Authorized as Presenter</span>
                        </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                        <div><span className="block text-xs font-medium text-[#A3968A]">Name</span><span className="font-medium text-[#3D2612]">{user.name}</span></div>
                        <div><span className="block text-xs font-medium text-[#A3968A]">Email</span><span className="font-medium text-[#3D2612]">{user.email}</span></div>
                        <div><span className="block text-xs font-medium text-[#A3968A]">Status</span><span className="font-medium text-[#3D2612]">{user.status}</span></div>
                        <div><span className="block text-xs font-medium text-[#A3968A]">Country</span><span className="font-medium text-[#3D2612]">{user.country}</span></div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-sm font-bold text-[#543D2B] tracking-wide uppercase mb-3">Activity History</h3>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center bg-[#FAF6F0] px-4 py-3 rounded-lg border border-[#F4EFE6] text-sm">
                            <span className="text-[#7A6D63] font-medium">Total Logins</span>
                            <span className="text-[#3D2612] font-semibold">{user.totalLogins}</span>
                        </div>
                        <div className="flex justify-between items-center bg-[#FAF6F0] px-4 py-3 rounded-lg border border-[#F4EFE6] text-sm">
                            <span className="text-[#7A6D63] font-medium">Last Login</span>
                            <span className="text-[#3D2612] font-semibold">{user.lastLogin}</span>
                        </div>
                    </div>
                </div>

                <button onClick={onSuspendTrigger} className="w-full rounded-xl bg-[#D11A3A] py-3.5 text-center text-sm font-bold text-white hover:bg-[#B5122F] transition-colors cursor-pointer">
                    Suspend Account
                </button>
            </div>
        </div>
    );
};