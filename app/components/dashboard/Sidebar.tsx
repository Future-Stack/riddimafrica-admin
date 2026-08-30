"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegChartBar, FaUsers } from "react-icons/fa";
import { GiMicrophone } from "react-icons/gi";
import { IoBagHandleOutline } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { PiPackageBold, PiRadioThin, PiShoppingCart } from "react-icons/pi";
import { RiSettingsLine } from "react-icons/ri";
import { TbArrowDownFromArc, TbMoneybag } from "react-icons/tb";
import LogoutModal from "./LogoutModal";

import { CiGrid42 } from "react-icons/ci";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const menuItems: NavItem[] = [
    { label: "Dashboard", icon: <CiGrid42 />, path: "/dashboard" },
    { label: "User Management", icon: <FaUsers />, path: "/dashboard/users" },
    { label: "Artists", icon: <GiMicrophone />, path: "/dashboard/artist" },
    {
      label: "Sellers",
      icon: <IoBagHandleOutline />,
      path: "/dashboard/sellers",
    },
    { label: "Products", icon: <PiPackageBold />, path: "/dashboard/products" },
    { label: "Orders", icon: <PiShoppingCart />, path: "/dashboard/orders" },
    { label: "Radio", icon: <PiRadioThin />, path: "/dashboard/radio" },
    { label: "Revenue", icon: <TbMoneybag />, path: "/dashboard/revenue" },
    {
      label: "Analytics",
      icon: <FaRegChartBar />,
      path: "/dashboard/analytics",
    },
    {
      label: "Support",
      icon: <MdSupportAgent />,
      path: "/dashboard/support",
    },
  ];

  const bottomItems: NavItem[] = [
    {
      label: "Settings",
      icon: <RiSettingsLine />,
      path: "/dashboard/settings",
    },
  ];

  const handleLogout = async () => {
    try {
      router.replace("/site/login");
    } catch {
      /* ignore */
    }
  };

  const renderNavLink = (item: NavItem) => {
    const active =
      item.path === "/dashboard"
        ? pathname === "/dashboard"
        : pathname.startsWith(item.path);

    return (
      <li key={item.label}>
        <Link
          href={item.path}
          onClick={() => setSidebarOpen(false)}
          className={`flex items-center gap-2 px-4 py-3 text-base rounded-lg transition-all duration-200 group ${
            active
              ? "bg-[#63542C] text-white font-bold"
              : "text-white hover:bg-white/5 hover:text-white"
          }`}
        >
          <span
            className={
              active ? "text-white" : "text-white group-hover:text-white"
            }
          >
            {item.icon}
          </span>
          <span className="text-sm tracking-wide">{item.label}</span>
        </Link>
      </li>
    );
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
          <ul className="space-y-2">{menuItems.map(renderNavLink)}</ul>

          <ul className="space-y-2 mt-auto pb-6 pt-8">
            {bottomItems.map(renderNavLink)}
            <li>
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(true)}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 group text-white cursor-pointer hover:text-white"
              >
                <span className="text-white text-2xl rotate-90 ">
                  <TbArrowDownFromArc />
                </span>
                <span className="text-sm tracking-wide text-white">
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
};

export default Sidebar;
