export interface CategoryRevenueItem {
    label: string;
    valueUGX: number;
    /** 0-100, controls the visual bar length independently of the displayed value */
    barPercent: number;
}

interface CategoryRevenueListProps {
    items: CategoryRevenueItem[];
}

export function CategoryRevenueList({ items }: CategoryRevenueListProps) {
    return (
        <div className="bg-[#FAF7F3] rounded-xl border border-[#C4CDD566] font-inter p-5">
            <h3 className="text-base md:text-lg font-medium text-[#101828] font-inter leading-7">By Category</h3>
            <p className="text-xs text-[#624D3B] font-medium leading-4  mt-0.5 mb-5">Revenue Generate</p>

            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.label}>
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-medium text-[#121418] leading-5">{item.label}</span>
                            <span className="text-sm font-medium text-black leading-5">
                                UGX {(item.valueUGX / 1_000_000).toFixed(1)}M
                            </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-[#E5B54F33]">
                            <div
                                className="h-full rounded-full bg-[#E6A400]"
                                style={{ width: `${Math.min(100, Math.max(0, item.barPercent))}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}