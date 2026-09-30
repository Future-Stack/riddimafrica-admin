import {
  StatsCardGrid,
  type StatsCardProps,
} from "@/app/components/common/card/StatsCard";
import { Radio, ShoppingCart, UserCheck, Users } from "lucide-react";

const userStats: StatsCardProps[] = [
  {
    title: "Total Users",
    value: "200",
    bgColor: "bg-[#3C182F]",
    iconBgColor: "bg-[#E6A40026]",
    icon: <Users size={18} className="text-yellow" />,
  },
  {
    title: "Active User",
    value: "180",
    bgColor: "bg-[#3C4762]",
    iconBgColor: "bg-[#95A3C7]",
    icon: <UserCheck size={18} className="text-[#091E51]" />,
  },
  {
    title: "New Today",
    value: "+7",
    bgColor: "bg-[#23432E]",
    iconBgColor: "bg-[#A3C2C3]",
    icon: <ShoppingCart size={18} className="text-[#377A7D]" />,
  },
  {
    title: "New this month",
    value: "+14",
    bgColor: "bg-[#AB6331]",
    iconBgColor: "bg-[#FFC0C0]",
    icon: <Radio size={18} className="text-[#FD7562]" />,
  },
];

const UserCard = () => {
  return <StatsCardGrid items={userStats} />;
};

export default UserCard;
