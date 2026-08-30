"use client";

import ActionButton from "@/app/components/common/button/ActionButton";
import CommonButton from "@/app/components/common/button/CommonButton";
import StatusBadge from "@/app/components/common/button/StatusBadge";
import GenericTable, { Column } from "@/app/components/common/GenericTable";
import {
  StatsCardGrid,
  type StatsCardProps,
} from "@/app/components/common/card/StatsCard";
import DashboardTopSection from "@/app/components/common/header/DashboardTopSection";
import {
  CategoryRevenueItem,
  CategoryRevenueList,
} from "@/app/features/revenue/component/ByCategory";
import {
  RevenueSplitChart,
  RevenueSplitSlice,
} from "@/app/features/revenue/component/RevenueSpilt";
import RevenueTrendChart, {
  RevenueTrendPoint,
} from "@/app/features/revenue/component/RevenueTrendChart";
import {
  Clock,
  Download,
  Percent,
  ShoppingCart,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";

export type PayoutStatus =
  | "Payout completed"
  | "Ready"
  | "Processing"
  | "Requested";

export interface PayoutRow {
  id: number;
  sellerName: string;
  sellerRole: "Artist" | "Seller";
  orderId: string;
  paymentMethod: string;
  amountDueUGX: number;
  status: PayoutStatus;
}

const INITIAL_PAYOUTS: PayoutRow[] = [
  {
    id: 1,
    sellerName: "AfroBeatsNG",
    sellerRole: "Seller",
    orderId: "ORD-0001",
    paymentMethod: "Airtel Money**4521",
    amountDueUGX: 1240000,
    status: "Payout completed",
  },
  {
    id: 2,
    sellerName: "AfroBeatsNG",
    sellerRole: "Artist",
    orderId: "ORD-0001",
    paymentMethod: "Airtel Money**4521",
    amountDueUGX: 1240000,
    status: "Ready",
  },
  {
    id: 3,
    sellerName: "AfroBeatsNG",
    sellerRole: "Seller",
    orderId: "ORD-0001",
    paymentMethod: "Airtel Money**4521",
    amountDueUGX: 1240000,
    status: "Processing",
  },
  {
    id: 4,
    sellerName: "AfroBeatsNG",
    sellerRole: "Seller",
    orderId: "ORD-0001",
    paymentMethod: "Airtel Money**4521",
    amountDueUGX: 1240000,
    status: "Processing",
  },
  {
    id: 5,
    sellerName: "AfroBeatsNG",
    sellerRole: "Seller",
    orderId: "ORD-0001",
    paymentMethod: "Airtel Money**4521",
    amountDueUGX: 1240000,
    status: "Processing",
  },
  {
    id: 6,
    sellerName: "AfroBeatsNG",
    sellerRole: "Seller",
    orderId: "ORD-0001",
    paymentMethod: "Airtel Money**4521",
    amountDueUGX: 1240000,
    status: "Processing",
  },
  {
    id: 7,
    sellerName: "Teni",
    sellerRole: "Artist",
    orderId: "ORD-0002",
    paymentMethod: "MTN MoMo**7732",
    amountDueUGX: 860000,
    status: "Requested",
  },
  {
    id: 8,
    sellerName: "Riddim Prints",
    sellerRole: "Seller",
    orderId: "ORD-0003",
    paymentMethod: "Airtel Money**9012",
    amountDueUGX: 430000,
    status: "Requested",
  },
];

const REVENUE_TREND: RevenueTrendPoint[] = [
  { month: "Jan", revenueUGX: 1_100_000, payoutUGX: 700_000 },
  { month: "Feb", revenueUGX: 2_840_000, payoutUGX: 1_840_000 },
  { month: "Mar", revenueUGX: 1_600_000, payoutUGX: 1_050_000 },
  { month: "Apr", revenueUGX: 900_000, payoutUGX: 600_000 },
  { month: "May", revenueUGX: 1_950_000, payoutUGX: 1_300_000 },
  { month: "Jun", revenueUGX: 2_400_000, payoutUGX: 1_600_000 },
];

const REVENUE_SPLIT: RevenueSplitSlice[] = [
  { label: "Platform (35%)", percent: 35, color: "#E6A400" },
  { label: "Sellers & Artists (65%)", percent: 65, color: "#23BA7D" },
];

const CATEGORY_REVENUE: CategoryRevenueItem[] = [
  { label: "Apparel", valueUGX: 7_200_000, barPercent: 60 },
  { label: "Accessories", valueUGX: 7_200_000, barPercent: 42 },
  { label: "Prints/Posters", valueUGX: 7_200_000, barPercent: 26 },
  { label: "T-shirt", valueUGX: 7_200_000, barPercent: 14 },
  { label: "Other", valueUGX: 7_200_000, barPercent: 6 },
];

const PAGE_SIZE = 6;

type PayoutTabKey = "queue" | "request";

const PAYOUT_TABS: { key: PayoutTabKey; label: string }[] = [
  { key: "queue", label: "Payouts Queue" },
  { key: "request", label: "Payouts Request" },
];

const revenueStats: StatsCardProps[] = [
  {
    bgColor: "bg-[#3C182F]",
    value: "UGX 18.4M",
    headerProps: {
      title: "Total Revenue",
      icon: <Clock size={18} className="text-amber-500" />,
      iconBgColor: "bg-[#E6A40026]",
    },
    footerProps: {
      description: (
        <span className="flex items-center gap-1">
          <span>↑ 24%</span> this month
        </span>
      ),
      actionText: "View Report →",
      actionHref: "/revenue/report",
    },
  },
  {
    bgColor: "bg-[#3C4762]",
    value: "UGX 6.44M",
    headerProps: {
      title: "Platform Commission (35%)",
      icon: <Percent size={18} className="text-pink-400" />,
      iconBgColor: "bg-[#FF525238]",
    },
    footerProps: {
      description: (
        <span className="flex items-center gap-1">
          <span>↑ 24%</span> platform earnings
        </span>
      ),
      actionText: "View Report →",
      actionHref: "/revenue/commission",
    },
  },
  {
    bgColor: "bg-[#23432E]",
    value: "UGX 4.2M",
    headerProps: {
      title: "Pending Payouts",
      icon: <ShoppingCart size={18} className="text-[#377A7D]" />,
      iconBgColor: "bg-[#A3C2C3]",
    },
    footerProps: {
      description: "Total Pay-outs",
      actionText: "View All →",
      actionHref: "/payouts",
    },
  },
  {
    bgColor: "bg-[#AB6331]",
    value: "UGX 7.76M",
    headerProps: {
      title: "Paid Out This Month",
      icon: <Wallet size={18} className="text-[#FD7562]" />,
      iconBgColor: "bg-[#FFC0C0]",
    },
    footerProps: {
      description: "To sellers & artists",
      actionText: "Manage →",
      actionHref: "/payouts/manage",
    },
  },
];

const RevenueManagement = () => {
  const [payouts, setPayouts] = useState<PayoutRow[]>(INITIAL_PAYOUTS);
  const [activeTab, setActiveTab] = useState<PayoutTabKey>("queue");
  const [currentPage, setCurrentPage] = useState(1);
  const [trendRange, setTrendRange] = useState("Last 6 month");

  const filteredPayouts = useMemo(
    () =>
      payouts.filter((p) =>
        activeTab === "queue"
          ? p.status !== "Requested"
          : p.status === "Requested",
      ),
    [payouts, activeTab],
  );

  const totalPages = Math.max(1, Math.ceil(filteredPayouts.length / PAGE_SIZE));
  const paginatedPayouts = filteredPayouts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleReleasePayout = (id: number) => {
    setPayouts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Payout completed" } : p)),
    );
  };

  const handleExportReport = () => {
    console.log("Exporting monthly revenue report...");
  };

  const columns: Column<PayoutRow>[] = [
    {
      header: "Seller/Artist",
      key: "sellerName",
      render: (row) => (
        <div className="text-left font-inter">
          <p className="text-sm text-gray-800 font-medium leading-6">
            {row.sellerName}
          </p>
          <p className="text-xs text-[#787A7F] font-normal leading-4.5">
            {row.sellerRole}
          </p>
        </div>
      ),
    },
    { header: "Orders id", key: "orderId" },
    { header: "Payment Method", key: "paymentMethod" },
    {
      header: "Amount Due",
      key: "amountDueUGX",
      render: (row) => (
        <span>UGX {(row.amountDueUGX / 1_000_000).toFixed(2)}M</span>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (row) => (
        <StatusBadge
          status={row.status}
          className="min-w-[120px] mx-auto justify-center"
        />
      ),
    },
    {
      header: "Action",
      key: "action",
      className: "text-center",
      render: (row) => (
        <ActionButton
          type="release"
          onClick={() => handleReleasePayout(row.id)}
          disabled={row.status === "Payout completed"}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DashboardTopSection
        title="Revenue Management"
        description="Platform earnings, payout queue, and financial reports"
        extra={
          <CommonButton
            size="sm"
            variant="primary"
            shape="rounded"
            leftIcon={<Download size={16} />}
            onClick={handleExportReport}
            className="whitespace-nowrap shrink-0"
          >
            Export Monthly Report
          </CommonButton>
        }
      />

      <StatsCardGrid items={revenueStats} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        <RevenueTrendChart
          data={REVENUE_TREND}
          range={trendRange}
          onRangeChange={setTrendRange}
        />
        <RevenueSplitChart slices={REVENUE_SPLIT} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        <div className="bg-[#FAF7F3] rounded-xl border border-[#C4CDD566] font-inter p-5">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {PAYOUT_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setActiveTab(tab.key);
                  setCurrentPage(1);
                }}
                className={`px-5 py-2 rounded-[6px] text-base font-medium font-inter leading-5 cursor-pointer transition-colors ${
                  activeTab === tab.key
                    ? "bg-[#E6A400] text-white"
                    : "bg-white text-yellow border border-[#E6A400]"
                }`}
              >
                {tab.label}
              </button>
            ))}
            <a
              href="#"
              className="ml-auto text-xs font-semibold text-yellow hover:opacity-80"
            >
              View all →
            </a>
          </div>

          <GenericTable
            data={paginatedPayouts}
            columns={columns}
            headerBgColor="bg-[#3C182F]"
            pagination={{
              currentPage,
              totalPages,
              onPageChange: (page) => setCurrentPage(page),
            }}
          />
        </div>

        <CategoryRevenueList items={CATEGORY_REVENUE} />
      </div>
    </div>
  );
};

export default RevenueManagement;
