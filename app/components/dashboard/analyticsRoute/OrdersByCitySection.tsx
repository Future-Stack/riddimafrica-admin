import { MiniStatRow } from "@/app/components/dashboard/analyticsRoute/MiniStachip";

export interface CityOrder {
    city: string;
    orders: number;
    color: string;
}

interface OrdersByCitySectionProps {
    cities: CityOrder[];
    topCity: string;
    avgOrderUGX: string;
    deliveryRate: string;
}

export default function OrdersByCitySection({ cities, topCity, avgOrderUGX, deliveryRate }: OrdersByCitySectionProps) {
    const maxOrders = Math.max(1, ...cities.map((c) => c.orders));

    return (
        <div className="bg-[#FAF7F3] rounded-xl border border-[#C4CDD566] font-inter p-5">
            <h3 className="text-base md:text-lg font-medium text-[#101828] font-inter leading-7">Orders by City</h3>
            <p className="text-xs text-[#624D3B] font-medium leading-4 mt-0.5 mb-5">Geographic distribution of orders</p>

            <div className="space-y-3">
                {cities.map((c) => (
                    <div key={c.city}>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-[#101828] leading-5">{c.city}</span>
                            <span className="text-sm text-black font-medium leading-5">{c.orders} orders</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-[#F3E9DC]">
                            <div
                                className="h-full rounded-full"
                                style={{ width: `${(c.orders / maxOrders) * 100}%`, backgroundColor: c.color }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <MiniStatRow
                stats={[
                    { label: "Top City", value: topCity },
                    { label: "Avg Order", value: avgOrderUGX },
                    { label: "Delivery Rate", value: deliveryRate },
                ]}
            />
        </div>
    );
}