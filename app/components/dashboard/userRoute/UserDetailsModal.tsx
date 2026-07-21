
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
        songsPlayed: string;
        purchasesMade:string
    };
}

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ isOpen, onClose, onSuspendTrigger, user }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center  p-4 backdrop-blur-xs">
            <div className="w-full max-w-2xl bg-white border border-[#EFEAE2] rounded-2xl p-6 shadow-xl relative">
                {/* Close Header Button */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl md:text-2xl  font-bold text-titleColor leading-7 font-inter">User Details</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3E2723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15 9L9 15" stroke="#3E2723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M9 9L15 15" stroke="#3E2723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <h3 className="text-base sm:text-lg font-medium text-titleColor font-inter leading-7 mb-3">Account Information</h3>
                        <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-medium text-black leading-5 font-inter">
                            <input type="checkbox" checked={isAuthorized} onChange={() => setIsAuthorized(!isAuthorized)} className="sr-only peer" />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#543D2B]"></div>
                            <span>Authorized as Presenter</span>
                        </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm font-inter">
                        <div><span className="block text-sm font-inter font-medium text-[#6D4C41] leading-5">Name</span><span className="font-medium text-[#3E2723]">{user.name}</span></div>
                        <div><span className="block text-sm font-inter font-medium text-[#6D4C41] leading-5">Email</span><span className="font-medium text-[#3E2723]">{user.email}</span></div>
                        <div><span className="block text-sm font-inter font-medium text-[#6D4C41] leading-5">Status</span><span className="font-medium  text-[#3E2723]">{user.status}</span></div>
                        <div><span className="block text-sm font-inter font-medium text-[#6D4C41] leading-5">Country</span><span className="font-medium text-[#3E2723]">{user.country}</span></div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-base sm:text-lg font-medium text-titleColor font-inter leading-7 mb-3">Activity History</h3>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center bg-[#E8DCC84D] px-3 py-3 rounded-[4px] border border-[#F4EFE6] text-sm">
                            <span className="text-titleColor leading-5  font-normal">Total Logins</span>
                            <span className="text-titleColor leading-5  font-medium">{user.totalLogins}</span>
                        </div>
                        <div className="flex justify-between items-center bg-[#FAF6F0] px-4 py-3 rounded-lg border border-[#F4EFE6] text-sm">
                            <span className="text-titleColor leading-5  ont-normal">Last Login</span>
                            <span className="text-titleColor leading-5  font-medium">{user.lastLogin}</span>
                        </div>
                        <div className="flex justify-between items-center bg-[#FAF6F0] px-4 py-3 rounded-lg border border-[#F4EFE6] text-sm">
                            <span className="text-titleColor leading-5  ont-normal">Songs Played</span>
                            <span className="text-titleColor leading-5  font-medium">1,234</span>
                        </div>
                        <div className="flex justify-between items-center bg-[#FAF6F0] px-4 py-3 rounded-lg border border-[#F4EFE6] text-sm">
                            <span className="text-titleColor leading-5  ont-normal">Purchases Made</span>
                            <span className="text-titleColor leading-5  font-medium">23</span>
                        </div>
                    </div>
                </div>

                <button onClick={onSuspendTrigger} className="w-full rounded-xl bg-[#D4183D] py-3.5 text-center text-sm font-bold text-white hover:bg-[#B5122F] transition-colors cursor-pointer">
                    Suspend Account
                </button>
            </div>
        </div>
    );
};