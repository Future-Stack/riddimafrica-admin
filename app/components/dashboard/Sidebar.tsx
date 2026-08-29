/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import LogoutModal from "./LogoutModal";
import {
  AnalyticsIcon,
  ArtistsIcon,
  DashboardIcon,
  LogoutIcon,
  OrderIcon,
  ProductsIcon,
  RadioIcon,
  RevenueIcon,
  SellersIcon,
  SettingsIcon,
  UsersIcon,
} from "./SidebarIcon";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [logout, setLogout] = useState();

  const menuItems: NavItem[] = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { label: "User Management", icon: <UsersIcon />, path: "/dashboard/users" },
    { label: "Artists", icon: <ArtistsIcon />, path: "/dashboard/artist" },
    { label: "Sellers", icon: <SellersIcon />, path: "/dashboard/sellers" },
    { label: "Products", icon: <ProductsIcon />, path: "/dashboard/products" },
    { label: "Orders", icon: <OrderIcon />, path: "/dashboard/orders" },
    { label: "Radio", icon: <RadioIcon />, path: "/dashboard/radio" },
    { label: "Revenue", icon: <RevenueIcon />, path: "/dashboard/revenue" },
    {
      label: "Analytics",
      icon: <AnalyticsIcon />,
      path: "/dashboard/analytics",
    },
    { label: "Support", icon: <AnalyticsIcon />, path: "/dashboard/support" },
  ];

  const handleLogout = async () => {
    try {
      router.replace("/site/login");
    } catch (error: any) {}
  };
  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          bg-offYellow text-white w-[260px] flex flex-col rounded-2xl
          fixed top-3 bottom-3 left-3 z-50 transition-transform duration-300 overflow-y-auto shadow-lg
          md:static md:h-auto md:translate-x-0 md:flex-shrink-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-[110%]"}
        `}
      >
        <button
          className="absolute top-4 right-4 md:hidden text-gray-400 hover:text-white"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="p-8 flex justify-center mb- ">
          <div className="w-[99px] h-[47px]">
            <img src="/logo.svg" alt="logo" className="object-contain" />
          </div>
        </div>

        <nav className="flex-1 flex flex-col px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              // Exact match or partial match for paths (e.g., /dashboard/users/...)
              const active =
                item.path === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.path);

              return (
                <li key={item.label}>
                  <Link
                    href={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3 text-base rounded-lg transition-all duration-200 group ${
                      active
                        ? "bg-[#63542C] text-white font-bold [#C9A96C]"
                        : "text-white hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span
                      className={
                        active
                          ? "text-white"
                          : "text-white group-hover:text-white"
                      }
                    >
                      {item.icon}
                    </span>
                    <span className="text-sm tracking-wide">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul className="space-y-2 mt-auto pb-6 pt-8">
            {/* Settings — normal nav link */}
            <li>
              <Link
                href="/dashboard/settings"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  pathname.startsWith("/dashboard/settings")
                    ? "bg-[#C9A96C99] text-white font-bold border-l-4 border-[#C9A96C]"
                    : "text-white hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="text-white group-hover:text-white">
                  <SettingsIcon />
                </span>
                <span className="text-sm tracking-wide">Settings</span>
              </Link>
            </li>

            {/* Log Out — opens confirmation modal instead of navigating */}
            <li>
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(true)}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group text-white hover:bg-white/5 cursor-pointer hover:text-white"
              >
                <span className="text-white group-hover:text-white">
                  <LogoutIcon />
                </span>
                <span className="text-sm tracking-wide text-red-500">
                  Log Out
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
}
