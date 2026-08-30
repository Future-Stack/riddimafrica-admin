import GenericTable, { Column } from "@/app/components/common/GenericTable";
import CommonHeader from "@/app/components/common/header/CommonHeader";
import { TrendingUp } from "lucide-react";

export interface TopProductRow {
  id: number;
  rank: number;
  product: string;
  seller: string;
  unitsSold: number;
  revenueUGX: number;
  growthPercent: number;
}

interface TopPerformingProductsSectionProps {
  products: TopProductRow[];
}

export const TopPerformingProductsSection = ({
  products,
}: TopPerformingProductsSectionProps) => {
  const columns: Column<TopProductRow>[] = [
    {
      header: "#",
      key: "rank",
      render: (row) => (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#E6A40033] text-yellow text-xs font-bold">
          {row.rank}
        </span>
      ),
    },
    {
      header: "Product",
      key: "product",
      render: (row) => (
        <span className="font-medium text-[#101828]">{row.product}</span>
      ),
    },
    { header: "Seller", key: "seller" },
    { header: "Units Sold", key: "unitsSold" },
    {
      header: "Revenue",
      key: "revenueUGX",
      render: (row) => (
        <span>UGX {(row.revenueUGX / 1_000_000).toFixed(2)}M</span>
      ),
    },
    {
      header: "Growth",
      key: "growthPercent",
      render: (row) => (
        <span className="text-[#05DF72] font-semibold text-xs flex items-center gap-2">
          <TrendingUp size={11} strokeWidth={1.5} className="text-[#05DF72]" />{" "}
          {row.growthPercent}%
        </span>
      ),
    },
  ];

  return (
    <div className="bg-[#FAF7F3] rounded-xl border border-[#C4CDD566] font-inter p-5">
      <CommonHeader size="lg" className="text-[#101828]!">
        Top Performing Products
      </CommonHeader>
      <CommonHeader size="xs" className="text-[#787A7F]! mb-4.5">
        Ranked by units sold in selected period
      </CommonHeader>
      <GenericTable
        data={products}
        columns={columns}
        headerBgColor="bg-[#3C182F]"
      />
    </div>
  );
};
