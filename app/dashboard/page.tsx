"use client";

import Card from "../components/dashboard/dashboardRoute/Card";
import QuickActionsPage from "../components/dashboard/dashboardRoute/QuickActions";
import { RecentOrdersSection } from "../components/dashboard/dashboardRoute/RecentOrder";
import TopSeller from "../components/dashboard/dashboardRoute/TopSeller";
import WeeklyRevenueChart from "../components/dashboard/dashboardRoute/Weeklyrevenue";



;

export default function DashboardPage() {


    return (
        <div className="">
        <Card/>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-5">
        <WeeklyRevenueChart/>
        <TopSeller/>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <div className="lg:col-span-8 h-full">
                    <RecentOrdersSection />
                </div>

                <div className="lg:col-span-4 h-full">
                    <QuickActionsPage />
                </div>
            </div>
        </div>
    );
}