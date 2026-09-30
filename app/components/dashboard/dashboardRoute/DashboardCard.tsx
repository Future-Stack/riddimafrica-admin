import { Clock, Radio } from "lucide-react";

import { PiShoppingCart } from "react-icons/pi";
import {
  StatsCardGrid,
  type StatsCardProps,
} from "../../common/card/StatsCard";

const dashboardStats: StatsCardProps[] = [
  {
    title: "Pending Approvals",
    value: "12",
    bgColor: "bg-[#3C182F]",
    iconBgColor: "bg-[#3A222D]",
    icon: <Clock size={18} className="text-amber-500" />,
    description: "Sellers + Products",
    actionText: "View All",
    actionHref: "/approvals",
  },
  {
    title: "Today's Revenue",
    value: "UGX 2.84M",
    bgColor: "bg-[#3C4762]",
    iconBgColor: "bg-[#FF525238]",
    icon: <Clock size={18} className="text-pink-400" />,
    description: (
      <span className="flex items-center gap-1">
        <span>↑ 18%</span> vs yesterday
      </span>
    ),
    actionText: "View Report",
    actionHref: "/reports/revenue",
  },
  {
    title: "Active Orders",
    value: "12",
    bgColor: "bg-[#23432E]",
    iconBgColor: "bg-[#A3C2C3]",
    icon: <PiShoppingCart size={18} className="text-[#377A7D]" />,
    description: "8 need attention",
    actionText: "View All",
    actionHref: "/orders",
  },
  {
    title: "Radio Listeners",
    value: "1,264",
    bgColor: "bg-[#AB6331]",
    iconBgColor: "bg-[#FFC0C0]",
    icon: <Radio size={18} className="text-[#FD7562]" />,
    description: "Stream: LIVE 99.8%",
    actionText: "Manage",
    actionHref: "/radio/manage",
  },
];

const DashboardCard = () => {
  return <StatsCardGrid items={dashboardStats} />;
};

export default DashboardCard;
