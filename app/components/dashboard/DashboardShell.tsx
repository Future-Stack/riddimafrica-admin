"use client";

import { useState, type ReactNode } from "react";

import DashboardHeader from "./Dashboardheader";
import Sidebar from "./Sidebar";

const DashboardShell = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white p-3 md:p-5 gap-3 md:gap-5  overflow-hidden scrollber-hide">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col gap-3 md:gap-5 overflow-hidden ">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardShell;
