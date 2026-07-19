"use client";

import React, { useState } from "react";
import { Search, Menu, Bell } from "lucide-react";
import Link from "next/link";
import NotificationModal from "./NotificationModal";


interface DashboardHeaderProps {
    onMenuClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick }) => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    return (
        <header className="w-full bg-[#3E2413] rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm h-[80px]">
            <div className="flex items-center gap-4">
                {/* Hamburger - mobile only */}
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
                        className="w-full bg-[#63542C4D] placeholder:text-gray-400 rounded-full py-2.5 pl-8 pr-12 text-sm text-gray-800 focus:outline-none shadow-sm"
                    />
                    <button className="absolute left-1 top-1/2 -translate-y-1/2  p-2 rounded-full text-white hover:bg-[#112240] transition-colors">
                        <Search size={14} />
                    </button>
                </div>

                {/* Notification Bell — wrapper div holds both the button and the dropdown as siblings */}
                <div className="relative">
                    <button
                        onClick={() => setIsNotificationOpen((prev) => !prev)}
                        className="bg-[#63542C4D] p-2.5 rounded-full text-[#0a192f] hover:bg-[#63542C] transition-colors shadow-sm cursor-pointer relative"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M3.92773 9.27681C3.92777 4.84136 7.54406 1.24985 11.9999 1.24985C16.4557 1.24985 20.072 4.84139 20.072 9.27687C20.0721 10.3086 20.1415 11.0872 20.6172 11.7871C20.7983 12.0496 21.1412 12.4934 21.3695 12.8504C21.6254 13.2501 21.8753 13.7323 21.9612 14.294C22.2415 16.1268 20.9493 17.3135 19.6624 17.8452C15.1297 19.7181 8.87004 19.7181 4.33734 17.8452C3.05043 17.3135 1.75824 16.1268 2.03855 14.294C2.12447 13.7323 2.3744 13.2501 2.63021 12.8504C2.85861 12.4934 3.20156 12.0495 3.38259 11.787C3.85826 11.0872 3.92764 10.3085 3.92773 9.27681Z" fill="#F5F7FF" />
                            <path d="M14.7775 21.9509C13.9741 22.4562 13.0186 22.7476 11.9983 22.7476C10.9781 22.7476 10.0226 22.4562 9.21922 21.9509C8.50617 21.5025 8.14965 21.2783 8.27441 20.9056C8.39918 20.5328 8.89114 20.5746 9.87506 20.6581C11.2822 20.7774 12.7144 20.7774 14.1216 20.6581C15.1055 20.5746 15.5975 20.5328 15.7223 20.9056C15.847 21.2783 15.4905 21.5025 14.7775 21.9509Z" fill="#F5F7FF" stroke="#73777C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white hidden"></span>
                    </button>

                    <NotificationModal
                        open={isNotificationOpen}
                        onClose={() => setIsNotificationOpen(false)}
                    />
                </div>

                {/* Profile */}
                <Link href="/dashboard/settings">
                    <div className="bg-[#63542C4D] rounded-[8px] p-1 flex items-center gap-3 pr-4 shadow-sm hover:bg-[#63542C] transition-colors cursor-pointer">
                        <div className="h-11 w-11 rounded-full overflow-hidden ">
                            <img
                                src="/Ellipse 6.svg"
                                alt="User"
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Admin&background=0a192f&color=fff";
                                }}
                            />
                        </div>
                        <div className=" flex flex-col">
                            <span className="text-sm font-medium text-white font-inter leading-tight">Admin</span>
                            <span className="text-[13px] text-white font-inter font-normal leading-tight">riddim@admin.com</span>
                        </div>
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default DashboardHeader;