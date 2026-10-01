import {
  StatsCardGrid,
  type StatsCardProps,
} from "@/app/components/common/card/StatsCard";
import type { UserStats } from "@/store/features/user/types/userTypes";
import { Radio, ShoppingCart, UserCheck, Users } from "lucide-react";

interface UserCardProps {
  stats?: UserStats;
}

const UserCard = ({ stats }: UserCardProps) => {
  const userStats: StatsCardProps[] = [
    {
      title: "Total Users",
      value: stats?.totalUsers ?? 0,
      bgColor: "bg-[#3C182F]",
      iconBgColor: "bg-[#E6A40026]",
      icon: <Users size={18} className="text-yellow" />,
    },
    {
      title: "Active User",
      value: stats?.activeUsers ?? 0,
      bgColor: "bg-[#3C4762]",
      iconBgColor: "bg-[#95A3C7]",
      icon: <UserCheck size={18} className="text-[#091E51]" />,
    },
    {
      title: "New Today",
      value: `+${stats?.newToday ?? 0}`,
      bgColor: "bg-[#23432E]",
      iconBgColor: "bg-[#A3C2C3]",
      icon: <ShoppingCart size={18} className="text-[#377A7D]" />,
    },
    {
      title: "New this month",
      value: `+${stats?.newThisMonth ?? 0}`,
      bgColor: "bg-[#AB6331]",
      iconBgColor: "bg-[#FFC0C0]",
      icon: <Radio size={18} className="text-[#FD7562]" />,
    },
  ];

  return <StatsCardGrid items={userStats} />;
};

export default UserCard;
