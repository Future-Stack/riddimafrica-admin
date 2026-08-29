"use client";

import { Menu, Search } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { GoBellFill } from "react-icons/go";
import NotificationModal from "./NotificationModal";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  return (
    <header className="w-full bg-offYellow rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm h-20">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
          onClick={onMenuClick}
        >
          <Menu size={22} />
        </button>

        {/* Title */}
        <h1 className="text-white text-xl md:text-[28px] hidden md:block font-bold tracking-wide">
          Welcome Back !
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Search */}
        <div className="relative hidden md:block w-64 lg:w-80">
          <input
            type="text"
            placeholder="Search ..."
            className="w-full bg-[#63542C]/30 placeholder:text-gray-400 rounded-full py-2.5 pl-8 pr-12 text-sm text-[#C4CDD5]  shadow-sm"
          />
          <button className="absolute left-1 top-1/2 -translate-y-1/2  p-2.5 rounded-full text-[#F4F6F8]  transition-colors">
            <Search size={16} />
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsNotificationOpen((prev) => !prev)}
            className="bg-[#63542C4D] p-2.5 rounded-full text-[#0a192f] hover:bg-[#63542C] transition-colors shadow-sm cursor-pointer relative"
          >
            <GoBellFill className="text-white" size={22} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white hidden"></span>
          </button>

          <NotificationModal
            open={isNotificationOpen}
            onClose={() => setIsNotificationOpen(false)}
          />
        </div>

        {/* Profile */}
        <Link href="/dashboard/settings">
          <div className="bg-[#63542C4D] rounded-[8px] p-2 flex items-center gap-3 pr-4 shadow-sm hover:bg-[#63542C] transition-colors cursor-pointer">
            <div className="h-11 w-11 rounded-full overflow-hidden ">
              <img
                src="/Ellipse 6.svg"
                alt="User"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://ui-avatars.com/api/?name=Admin&background=0a192f&color=fff";
                }}
              />
            </div>
            <div className=" flex flex-col">
              <span className="text-sm font-medium text-white font-inter leading-tight">
                Admin
              </span>
              <span className="text-[13px] text-white font-inter font-normal leading-tight">
                riddim@admin.com
              </span>
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default DashboardHeader;
