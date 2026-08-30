import CommonHeader from "@/app/components/common/header/CommonHeader";

export interface CategoryRevenueItem {
  label: string;
  valueUGX: number;
  /** 0-100, controls the visual bar length independently of the displayed value */
  barPercent: number;
}

interface CategoryRevenueListProps {
  items: CategoryRevenueItem[];
}

export const CategoryRevenueList = ({ items }: CategoryRevenueListProps) => {
  return (
    <div className="bg-[#FAF7F3] rounded-xl border border-[#C4CDD566] font-inter p-5">
      <CommonHeader size="lg" className="text-[#101828]!">
        By Category
      </CommonHeader>
      <CommonHeader size="xs" className="text-[#624D3B]! mb-5">
        Revenue Generate
      </CommonHeader>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-[#121418] leading-5">
                {item.label}
              </span>
              <span className="text-sm font-medium text-black leading-5">
                UGX {(item.valueUGX / 1_000_000).toFixed(1)}M
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[#E5B54F33]">
              <div
                className="h-full rounded-full bg-[#E6A400]"
                style={{
                  width: `${Math.min(100, Math.max(0, item.barPercent))}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
