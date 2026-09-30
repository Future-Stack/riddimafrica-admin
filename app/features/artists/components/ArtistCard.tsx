import {
  StatsCardGrid,
  type StatsCardProps,
} from "@/app/components/common/card/StatsCard";
import { Radio, ShieldAlert, UserCheck, Users } from "lucide-react";

const artistStats: StatsCardProps[] = [
  {
    title: "Total Registered Artist",
    value: "200",
    bgColor: "bg-[#3C182F]",
    iconBgColor: "bg-[#E6A40026]",
    icon: <Users size={18} className="text-yellow" />,
  },
  {
    title: "Active Artist",
    value: "180",
    bgColor: "bg-[#3C4762]",
    iconBgColor: "bg-[#95A3C7]",
    icon: <UserCheck size={18} className="text-[#091E51]" />,
  },
  {
    title: "KYC Pending",
    value: "10",
    bgColor: "bg-[#23432E]",
    iconBgColor: "bg-[#A3C2C3]",
    icon: <ShieldAlert size={18} className="text-[#377A7D]" />,
  },
  {
    title: "New this month",
    value: "+14",
    bgColor: "bg-[#AB6331]",
    iconBgColor: "bg-[#FFC0C0]",
    icon: <Radio size={18} className="text-[#FD7562]" />,
  },
];

const ArtistCard = () => {
  return <StatsCardGrid items={artistStats} />;
};

export default ArtistCard;
