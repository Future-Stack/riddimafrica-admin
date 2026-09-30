import DashboardTopSection from "../components/common/header/DashboardTopSection";
import DashboardCard from "../components/dashboard/dashboardRoute/DashboardCard";
import QuickActionsPage from "../components/dashboard/dashboardRoute/QuickActions";
import { RecentOrdersSection } from "../components/dashboard/dashboardRoute/RecentOrder";
import TopSeller from "../components/dashboard/dashboardRoute/TopSeller";
import WeeklyRevenueChart from "../components/dashboard/dashboardRoute/Weeklyrevenue";

const DashboardPage = () => {
  return (
    <div className=" space-y-6">
      <DashboardTopSection
        title="Dashboard Management"
        description="Review activity, monitor performance, and manage your platform from one place."
      />
      <DashboardCard />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
        <WeeklyRevenueChart />
        <TopSeller />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 flex min-h-0">
          <RecentOrdersSection />
        </div>

        <div className="lg:col-span-4 flex min-h-0">
          <QuickActionsPage />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
