"use client";
import { useState } from "react";
import { Wallet, ShoppingBag, Percent, Radio, UserPlus, TrendingUp } from "lucide-react";
import PageHeader from "@/app/components/reusable/PageHeader";
import { StatsCard } from "@/app/components/reusable/StatsCard";
import { RevenueAndCombination } from "@/app/components/dashboard/analyticsRoute/TrendChart";
import { TopPerformingProductsSection, TopProductRow } from "@/app/components/dashboard/analyticsRoute/TopPerformingProducts";
import { AnalyticsFilterBar } from "@/app/components/dashboard/analyticsRoute/AnalyticsFilterBar";
import { RankedBarChart } from "@/app/components/dashboard/analyticsRoute/RankedBarChart";
import { FunnelBars } from "@/app/components/dashboard/analyticsRoute/FunnelBars";
import { MiniStatRow } from "@/app/components/dashboard/analyticsRoute/MiniStachip";
import DonutSplitChart, { DonutSlice } from "@/app/components/dashboard/analyticsRoute/DonitSpiltChart";
import OrdersByCitySection from "@/app/components/dashboard/analyticsRoute/OrdersByCitySection";

// ---- demo data (swap for real API responses when the backend is wired up) ----

const REVENUE_COMMISSION_DATA = [
    { label: "Jan", revenue: 1_100_000, commission: 380_000 },
    { label: "Feb", revenue: 2_840_000, commission: 1_840_000 },
    { label: "Mar", revenue: 1_600_000, commission: 560_000 },
    { label: "Apr", revenue: 900_000, commission: 310_000 },
    { label: "May", revenue: 1_950_000, commission: 680_000 },
    { label: "Jun", revenue: 2_400_000, commission: 840_000 },
];

const ORDER_STATUS_SLICES = [
    { label: "Delivered", value: 52, percent: "52%", color: "#23BA7D" },
    { label: "Shipped", value: 16, percent: "16%", color: "#E6A400" },
    { label: "Packaging", value: 14, percent: "14%", color: "#FD7562" },
    { label: "At Office", value: 9, percent: "9%", color: "#E6A400" },
    { label: "New", value: 9, percent: "9%", color: "#7D7DF9" },
];

const REVENUE_BY_CATEGORY = [
    { label: "Apparel", value: 5_200_000, displayValue: "UGX 5.2M" },
    { label: "Accessories", value: 3_400_000, displayValue: "UGX 3.4M" },
    { label: "Prints", value: 2_100_000, displayValue: "UGX 2.1M" },
    { label: "Apparel", value: 1_600_000, displayValue: "UGX 1.6M" },
    { label: "Other", value: 900_000, displayValue: "UGX 0.9M" },
];

const REVENUE_BY_CATEGORY_LEGEND = [
    { label: "Apparel", displayValue: "UGX 7.2M", dotColor:"#E6A400", color: "#6E5A40" },
    { label: "Accessories", displayValue: "UGX 7.2M", dotColor:"#7D7DF9", color: "#6E5A40" },
    { label: "Prints", displayValue: "UGX 7.2M", dotColor:"#FD7562", color: "#6E5A40" },
    { label: "Apparel", displayValue: "UGX 7.2M", dotColor:"#E6A400", color: "#6E5A40" },
    { label: "Other", displayValue: "UGX 7.2M", dotColor:"#FFFFFF", color: "#6E5A40" },
];

const CITIES = [
    { city: "Lagos", orders: 340, color: "#E6A400" },
    { city: "Abuja", orders: 170, color: "#64284E" },
    { city: "Prints/Posters", orders: 90, color: "#327071" },
    { city: "T-shirt", orders: 60, color: "#7D7DF9" },
    { city: "Other", orders: 30, color: "#E600D7" },
];

const FUNNEL_STAGES = [
    { label: "Visited", percent: 100, color: "#C5B79A" },
    { label: "Browsed Products", percent: 72, color: "#FD7562" },
    { label: "Added to Cart", percent: 38, color: "#E6A400" },
    { label: "Purchased", percent: 22, color: "#23BA7D" },
];

const PLATFORM_GROWTH_DATA = [
    { label: "Jan", buyers: 800, sellers: 40, artists: 10 },
    { label: "Feb", buyers: 1200, sellers: 44, artists: 12 },
    { label: "Mar", buyers: 1600, sellers: 48, artists: 15 },
    { label: "Apr", buyers: 2100, sellers: 52, artists: 18 },
    { label: "May", buyers: 2600, sellers: 55, artists: 20 },
    { label: "Jun", buyers: 2960, sellers: 58, artists: 22 },
];

const RADIO_LISTENER_DATA = [
    { label: "00:00", listeners: 320 },
    { label: "04:00", listeners: 180 },
    { label: "08:00", listeners: 540 },
    { label: "12:00", listeners: 980 },
    { label: "16:00", listeners: 1284 },
    { label: "20:00", listeners: 960 },
    { label: "23:59", listeners: 742 },
];

const TOP_PRODUCTS: TopProductRow[] = [
    { id: 1, rank: 1, product: "Teni Hoodie", seller: "AfroBeatsNG", unitsSold: 340, revenueUGX: 4_760_000, growthPercent: 24 },
    { id: 2, rank: 2, product: "Burna Vinyl LP", seller: "AfroBeatsNG", unitsSold: 340, revenueUGX: 4_760_000, growthPercent: 24 },
    { id: 3, rank: 3, product: "Teni Hoodie", seller: "AfroBeatsNG", unitsSold: 340, revenueUGX: 4_760_000, growthPercent: 24 },
    { id: 4, rank: 4, product: "Teni Hoodie", seller: "AfroBeatsNG", unitsSold: 340, revenueUGX: 4_760_000, growthPercent: 24 },
    { id: 5, rank: 5, product: "Teni Hoodie", seller: "AfroBeatsNG", unitsSold: 340, revenueUGX: 4_760_000, growthPercent: 24 },
    { id: 6, rank: 6, product: "Teni Hoodie", seller: "AfroBeatsNG", unitsSold: 340, revenueUGX: 4_760_000, growthPercent: 24 },
];

const FILTER_RANGES = ["7 days", "30 days", "90 days", "1 year", "Custom"];

export default function AnalyticsPage() {
    const [activeRange, setActiveRange] = useState("30 days");

    const handleExport = () => {
        // Hook this up to the real export/report-generation endpoint.
        console.log(`Exporting analytics for range: ${activeRange}`);
    };

    return (
        <div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-5">
                <PageHeader
                    title="Analytics"
                    description="Platform performance across revenue, orders, products, and radio"
                />
                <AnalyticsFilterBar
                    ranges={FILTER_RANGES}
                    activeRange={activeRange}
                    onRangeChange={setActiveRange}
                    onExport={handleExport}
                />
            </div>

            {/* 6 top-level stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 mb-5">
                <StatsCard
                    bgColor="bg-[#3C182F]"
                    value="UGX 18.4M"
                    headerProps={{ title: "Total Revenue", icon: <Wallet size={16} className="text-amber-400" />, iconBgColor: "bg-[#3A222D]" }}
                    footerProps={{ description: "↑ 24%" }}
                />
                <StatsCard
                    bgColor="bg-[#558587]"
                    value="812"
                    headerProps={{ title: "Total Orders", icon: <ShoppingBag size={16} className="text-white" />, iconBgColor: "bg-white/15" }}
                    footerProps={{ description: "" }}
                />
                <StatsCard
                    bgColor="bg-[#AC3D32]"
                    value="UGX 4.4M"
                    headerProps={{ title: "Commission Earned", icon: <Percent size={16} className="text-pink-200" />, iconBgColor: "bg-white/15" }}
                    footerProps={{ description: "↑ 24%" }}
                />
                <StatsCard
                    bgColor="bg-[#3C4762]"
                    value="1,140"
                    headerProps={{ title: "Avg. Radio Listeners", icon: <Radio size={16} className="text-white" />, iconBgColor: "bg-white/15" }}
                    footerProps={{ description: "-6%" }}
                />
                <StatsCard
                    bgColor="bg-[#1E4B2E]"
                    value="+11"
                    headerProps={{ title: "New Sellers/Artists", icon: <UserPlus size={16} className="text-white" />, iconBgColor: "bg-white/15" }}
                    footerProps={{ description: "" }}
                />
                <StatsCard
                    bgColor="bg-[#AB6331]"
                    value="5.8%"
                    headerProps={{ title: "Conversion Rate", icon: <TrendingUp size={16} className="text-white" />, iconBgColor: "bg-white/15" }}
                    footerProps={{ description: "" }}
                />
            </div>

            {/* Revenue & Commission + Order Status Split */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 mb-5">
                <RevenueAndCombination
                    title="Revenue & Commission"
                    subtitle="Revenue vs 35% platform commission over selected period"
                    data={REVENUE_COMMISSION_DATA}
                    series={[
                        { key: "revenue", label: "Revenue", color: "#115e59", legendColor: "#E6A400" },
                        { key: "commission", label: "Commission", color: "#101828", visible: false },
                    ]}
                />
                <DonutSplitChart title="Order Status Split" subtitle="Current period breakdown" slices={ORDER_STATUS_SLICES} />
            </div>

            {/* Revenue by Category + Orders by City + Purchase Funnel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
                <RankedBarChart
                    title="Revenue by Category"
                    subtitle="Sales distribution across product types"
                    items={REVENUE_BY_CATEGORY}
                    legendChips={REVENUE_BY_CATEGORY_LEGEND}
                />
                <OrdersByCitySection cities={CITIES} topCity="Lagos" avgOrderUGX="UGX 14.2K" deliveryRate="94%" />
                <FunnelBars
                    title="Purchase Funnel"
                    subtitle="Visitor → buyer conversion" 
                    stages={FUNNEL_STAGES}
                    overallValue="22%"
                />
            </div>

            {/* Platform Growth + Radio Listener Trend */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
                <RevenueAndCombination
                    title="Platform Growth"
                    subtitle="Buyers, sellers, and artists over 6 months"
                    data={PLATFORM_GROWTH_DATA}
                    series={[
                        { key: "buyers", label: "Buyers", color: "#E6A400", kind: "line" },
                        { key: "sellers", label: "Sellers", color: "#23BA7D", kind: "line" },
                        { key: "artists", label: "Artists", color: "#7D7DF9", kind: "line" },
                    ]}
                    footer={
                        <MiniStatRow
                            stats={[
                                {
                                    label: "Total Buyers",
                                    value: "2,960",
                                    growth: "+12%",
                                    valueColorClassName: "text-[#E6A400]",
                                },
                                {
                                    label: "Active Sellers",
                                    value: "58",
                                    growth: "+4%",
                                    valueColorClassName: "text-[#23BA7D]",
                                },
                                {
                                    label: "Artists",
                                    value: "22",
                                    growth: "+16%",
                                    valueColorClassName: "text-[#7D7DF9]",
                                },
                            ]}
                        />
                    }
                />
                <RevenueAndCombination
                    title="Radio Listener Trend"
                    subtitle="Hourly listener count — today"
                    data={RADIO_LISTENER_DATA}
                    series={[{ key: "listeners", label: "Listeners", color: "#7D7DF9" }]}
                    live
                    footer={
                        <MiniStatRow
                            stats={[
                                { label: "Peak Today", value: "1,284" },
                                { label: "Avg", value: "742" },
                                { label: "Uptime", value: "99.8%" },
                                { label: "Tracks Played", value: "74" },
                            ]}
                        />
                    }
                />
            </div>

            {/* Top Performing Products + secondary Revenue by Category widget */}
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-stretch mb-5">
                <div className="lg:col-span-4 h-full">
                    <TopPerformingProductsSection products={TOP_PRODUCTS} />
                </div>

                <div className="lg:col-span-2 h-full">
                    <RankedBarChart
                        title="Revenue by Category"
                        subtitle="Sales distribution across product types"
                        items={REVENUE_BY_CATEGORY}
                        defaultColor="#327071"
                        footer={
                            <div className="space-y-2 mt-3">
                                {["Burna Boy", "Burna Boy", "Burna Boy", "Burna Boy"].map((name, i) => (
                                    <div key={i} className="flex items-center justify-between bg-[#6E5A40] rounded-lg px-3 py-2 text-xs">
                                        <span className="flex items-center gap-2">
                                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#E6A40033] text-[#E6A400] text-[10px] font-bold shrink-0">
                                                {i + 1}
                                            </span>
                                            <span className="font-medium text-[#E6E8EB] text-sm leading-5">{name}</span>
                                        </span>
                                        <span className="text-[#FAF7F3] text-xs font-medium leading-5">
                                            {50 + i * 4} orders  <span className="font-semibold text-[#E6A400] pl-2">UGX {(4.76 + i * 0.3).toFixed(1)}M</span>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
}