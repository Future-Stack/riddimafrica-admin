import StatusBadge from "@/app/components/common/button/StatusBadge";
import CommonHeader from "@/app/components/common/header/CommonHeader";
import ModalShell from "@/app/components/common/ModalSeel";
import { BarChart2, Boxes, Package, ShoppingBag, Users } from "lucide-react";
import { ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export interface MonthlyUnits {
  month: string;
  units: number;
}

export interface ArtistPerformanceData {
  id: number;
  name: string;
  stageName: string;
  genre: string;
  totalSalesUGX: number;
  followers: string;
  merchItemsCount: number;
  unitsLast6mo: number;
  kycStatus: "Pending" | "Complete";
  approvalStatus: "Pending" | "Approved" | "Rejected";
  monthlyUnits: MonthlyUnits[];
}

interface ArtistPerformanceModalProps {
  isOpen: boolean;
  artist: ArtistPerformanceData | null;
  onClose: () => void;
}
interface ChartDataPoint {
  month: string;
  value: number;
}
const data: ChartDataPoint[] = [
  { month: "Jan", value: 40 },
  { month: "Feb", value: 55 },
  { month: "Mar", value: 48 },
  { month: "Apr", value: 72 },
  { month: "May", value: 60 },
  { month: "Jun", value: 85 },
];

const StatCard: React.FC<{ icon: ReactNode; label: string; value: string }> = ({
  icon,
  label,
  value,
}) => (
  <div className="bg-[#F9F5EF] border border-[#F4EFE6] rounded-lg px-3 py-3  gap-2">
    <span className="w-7 h-7  flex items-center justify-center text-sm mb-4">
      {icon}
    </span>
    <div>
      <p className="text-base sm:text-lg font-medium text-black font-inter leading-tight mb-3">
        {value}
      </p>
      <p className="text-sm text-[#787A7F] font-inter font-medium leading-tight">
        {label}
      </p>
    </div>
  </div>
);

export const ArtistPerformanceModal = ({
  isOpen,
  artist,
  onClose,
}: ArtistPerformanceModalProps) => {
  if (!artist) return null;

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      maxWidthClassName="max-w-2xl"
      roundedClassName="rounded-2xl"
      header={
        <div className="flex items-center gap-2">
          <span className="w-10 h-10 rounded-lg bg-[#23BA7D1A] flex items-center justify-center">
            <BarChart2 size={15} className="text-[#23BA7D]" />
          </span>
          <div>
            <p className="text-xl md:text-[26px] font-bold text-[#3E2723] leading-7">
              {artist.stageName} — Performance
            </p>
            <p className="text-sm text-[#23BA7D] font-medium font-inter leading-5">
              Sales &amp; reach over the last 6 months
            </p>
          </div>
        </div>
      }
    >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <StatCard
            icon={<ShoppingBag size={16} className="text-yellow" />}
            label="Total Sales"
            value={`UGX ${artist.totalSalesUGX.toLocaleString()}`}
          />
          <StatCard
            icon={<Users size={16} className="text-[#23BA7D]" />}
            label="Followers"
            value={artist.followers}
          />
          <StatCard
            icon={<Package size={16} className="text-[#C45F3F]" />}
            label="Merch Items"
            value={String(artist.merchItemsCount).padStart(2, "0")}
          />
          <StatCard
            icon={<Boxes size={16} className="text-[#0840DF]" />}
            label="Units (6mo)"
            value={String(artist.unitsLast6mo)}
          />
        </div>

        <CommonHeader size="sm" className="text-[#787A7F]!">
          Monthly Units Sold
        </CommonHeader>

        <div className="w-full h-[280px] sm:h-[320px] mb-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              barGap={8}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#181B1F"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#787A7F", fontSize: 13, fontWeight: 400 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                ticks={[0, 20, 40, 60, 80]}
                domain={[0, 85]}
                tick={{ fill: "#787A7F", fontSize: 13, fontWeight: 400 }}
              />
              <Bar
                dataKey="value"
                fill="#10B981"
                radius={[4, 4, 0, 0]}
                maxBarSize={64}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-green-100">
          <div className="flex items-center gap-3">
            <span className="text-xs font-normal leading-4 px-3 py-2 rounded-[6px] bg-[#6F2C57] text-[#FAF7F3]">
              {artist.genre}
            </span>
            <span className="text-[#787A7F] font-medium text-sm font-inter leading-6">
              KYC: <span className="text-yellow">{artist.kycStatus}</span>
            </span>
          </div>
          <StatusBadge status={artist.approvalStatus} />
        </div>
    </ModalShell>
  );
};
