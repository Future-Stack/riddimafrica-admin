import GenericTable, { Column } from "@/app/components/reusable/GenericTable";

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

export function TopPerformingProductsSection({
  products,
}: TopPerformingProductsSectionProps) {
  const columns: Column<TopProductRow>[] = [
    {
      header: "#",
      key: "rank",
      render: (row) => (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#E6A40033] text-[#E6A400] text-xs font-bold">
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
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
          >
            <path
              d="M10.0833 3.20703L6.18746 7.10286L3.89579 4.8112L0.916626 7.79036"
              stroke="#05DF72"
              stroke-width="0.916667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.33337 3.20703H10.0834V5.95703"
              stroke="#05DF72"
              stroke-width="0.916667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>{" "}
          {row.growthPercent}%
        </span>
      ),
    },
  ];

  return (
    <div className="bg-[#FAF7F3] rounded-xl border border-[#C4CDD566] font-inter p-5">
      <h3 className="text-base font-bold text-[#101828] font-inter leading-6">
        Top Performing Products
      </h3>
      <p className="text-xs text-[#787A7F] font-normal leading-4 mt-0.5 mb-4.5">
        Ranked by units sold in selected period
      </p>
      <GenericTable
        data={products}
        columns={columns}
        headerBgColor="bg-[#3C182F]"
      />
    </div>
  );
}
