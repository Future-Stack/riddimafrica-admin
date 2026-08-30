"use client";

import React from "react";

import logo from "@/public/logo.svg";
import Image from "next/image";
import CommonButton from "../common/button/CommonButton";
import SectionHeader from "../common/header/SectionHeader";
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
          <Image src={logo} alt="logo" />
        </div>

        {/* Text */}
        <div className="text-center mb-6">
          <SectionHeader
            title="Are You Sure You Want to Logout?"
            size="xl"
            description="You will need to enter your credentials again to access your
            account."
            desSize="sm"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 w-full">
          <CommonButton variant="cancel" onClick={onCancel} className="w-full!">
            Cancel
          </CommonButton>
          <CommonButton onClick={onConfirm} className="w-full!">
            {" "}
            Yes, Logout
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
