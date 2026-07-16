"use client";

import React from "react";
import { LogOut } from "lucide-react";

interface LogoutModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
    isOpen,
    onConfirm,
    onCancel,
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-4"
            onClick={onCancel}
        >
            <div
                className="w-full max-w-sm bg-gray-100 rounded-2xl shadow-2xl p-6 sm:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Icon */}
                <div className="flex justify-center mb-5 h-24">
                    <img src="/img/logoo.png" alt="logo" />
                </div>

                {/* Text */}
                <div className="text-center mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-[#0a192f] mb-2">
                        Are You Sure You Want to Logout?
                    </h2>
                    <p className="text-sm text-gray-500">
                        You will need to enter your credentials again to access your
                        account.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-3 border border-gray-300   rounded-xl text-gray-600 font-semibold hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-3 bg-primaryColor hover:scale-105 cursor-pointer text-white font-semibold rounded-xl transition-colors"
                    >
                        Yes, Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;