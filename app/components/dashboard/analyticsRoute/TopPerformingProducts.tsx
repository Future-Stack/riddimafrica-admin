import GenericTable, { Column } from "../../reusable/GenericTable";

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

export function TopPerformingProductsSection({ products }: TopPerformingProductsSectionProps) {
    const columns: Column<TopProductRow>[] = [
        {
            header: "#",
            key: "rank",
            render: (row) => (
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#E6A400] text-white text-xs font-bold">
                    {row.rank}
                </span>
            ),
        },
        { header: "Product", key: "product", render: (row) => <span className="font-medium text-[#101828]">{row.product}</span> },
        { header: "Seller", key: "seller" },
        { header: "Units Sold", key: "unitsSold" },
        { header: "Revenue", key: "revenueUGX", render: (row) => <span>UGX {(row.revenueUGX / 1_000_000).toFixed(2)}M</span> },
        {
            header: "Growth",
            key: "growthPercent",
            render: (row) => (
                <span className="text-emerald-600 font-semibold text-xs">↑ {row.growthPercent}%</span>
            ),
        },
    ];

    return (
        <div className="bg-white rounded-2xl border border-[#EFEAE2] p-5">
            <h3 className="text-base font-bold text-[#101828] font-inter leading-6 mb-1">Top Performing Products</h3>
            <p className="text-xs text-[#787A7F] font-normal leading-4 mb-4">Ranked by units sold in selected period</p>
            <GenericTable data={products} columns={columns} headerBgColor="bg-[#3C182F]" />
        </div>
    );
}