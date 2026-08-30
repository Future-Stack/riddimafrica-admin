"use client";

import ActionButton from "@/app/components/common/button/ActionButton";
import CommonSelect from "@/app/components/common/button/CommonSelect";
import FilterPanel from "@/app/components/common/button/FilterPanel";
import StatusBadge from "@/app/components/common/button/StatusBadge";
import GenericTable, { Column } from "@/app/components/common/GenericTable";
import DashboardTopSection from "@/app/components/common/header/DashboardTopSection";
import { useEffect, useMemo, useRef, useState } from "react";
import { OrderDetailsModal, OrderItem, OrderStatus } from "./OrderDetailsModal";

const INITIAL_ORDERS: OrderItem[] = [
  {
    id: "1",
    orderId: "ORD-0001",
    customer: "Teni",
    handle: "jide001",
    location: "Lagos",
    items: "Teni Limited Hoodie",
    seller: "Teni",
    sellerRole: "Artist",
    amount: 18420,
    totalSales: 12,
    date: "2 Mar 2025",
    status: "Packaging",
    lastUpdated: "Just now",
  },
  {
    id: "2",
    orderId: "ORD-0002",
    customer: "Teni",
    handle: "jide001",
    location: "Lagos",
    items: "Teni Limited Hoodie",
    seller: "AfroBeatsNG",
    sellerRole: "Seller",
    amount: 11200,
    totalSales: 15,
    date: "2 Mar 2025",
    status: "Seller Shipped",
    lastUpdated: "2 hrs ago",
  },
  {
    id: "3",
    orderId: "ORD-0003",
    customer: "Teni",
    handle: "jide001",
    location: "Lagos",
    items: "Teni Limited Hoodie",
    seller: "AfroBeatsNG",
    sellerRole: "Seller",
    amount: 22200,
    totalSales: 8,
    date: "2 Mar 2025",
    status: "Cancelled",
    lastUpdated: "Yesterday",
  },
  {
    id: "4",
    orderId: "ORD-0004",
    customer: "Teni",
    handle: "jide001",
    location: "Lagos",
    items: "Teni Limited Hoodie",
    seller: "AfroBeatsNG",
    sellerRole: "Seller",
    amount: 8000,
    totalSales: 20,
    date: "2 Mar 2025",
    status: "New",
    lastUpdated: "1 hr ago",
  },
  {
    id: "5",
    orderId: "ORD-0005",
    customer: "Teni",
    handle: "jide001",
    location: "Lagos",
    items: "Teni Limited Hoodie",
    seller: "AfroBeatsNG",
    sellerRole: "Seller",
    amount: 22200,
    totalSales: 5,
    date: "2 Mar 2025",
    status: "New",
    lastUpdated: "Just now",
  },
  {
    id: "6",
    orderId: "ORD-0006",
    customer: "Teni",
    handle: "jide001",
    location: "Lagos",
    items: "Teni Limited Hoodie",
    seller: "AfroBeatsNG",
    sellerRole: "Seller",
    amount: 8000,
    totalSales: 19,
    date: "2 Mar 2025",
    status: "Delivered",
    lastUpdated: "3 days ago",
  },
  {
    id: "7",
    orderId: "ORD-0007",
    customer: "Teni",
    handle: "jide001",
    location: "Lagos",
    items: "Teni Limited Hoodie",
    seller: "AfroBeatsNG",
    sellerRole: "Seller",
    amount: 22200,
    totalSales: 11,
    date: "2 Mar 2025",
    status: "Received at Office",
    lastUpdated: "Just now",
  },
  {
    id: "8",
    orderId: "ORD-0008",
    customer: "Teni",
    handle: "jide001",
    location: "Lagos",
    items: "Teni Limited Hoodie",
    seller: "AfroBeatsNG",
    sellerRole: "Seller",
    amount: 8000,
    totalSales: 14,
    date: "2 Mar 2025",
    status: "Dispatched",
    lastUpdated: "4 hrs ago",
  },
];

const PAGE_SIZE = 8;

const STATUS_OPTIONS: ("All" | OrderStatus)[] = [
  "All",
  "New",
  "Packaging",
  "Seller Shipped",
  "Received at Office",
  "Quality Inspection",
  "Dispatched",
  "Delivered",
  "Cancelled",
];

export const OrdersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | OrderStatus>("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (filterRef.current?.contains(target)) return;
      if (target?.closest("[data-slot='select-content']")) return;
      if (target?.closest("[data-slot='select-item']")) return;
      setFilterOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        o.orderId.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.seller.toLowerCase().includes(q) ||
        o.items.toLowerCase().includes(q);

      const matchesStatus = statusFilter === "All" || o.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.orderId === orderId
          ? { ...o, status: newStatus, lastUpdated: "Just now" }
          : o,
      ),
    );
    setSelectedOrder((prev) =>
      prev && prev.orderId === orderId
        ? { ...prev, status: newStatus, lastUpdated: "Just now" }
        : prev,
    );
  };

  const columns: Column<OrderItem>[] = [
    { header: "Order ID", key: "orderId" },
    { header: "Customer", key: "customer" },
    { header: "Items", key: "items" },
    {
      header: "Seller/Artist",
      key: "seller",
      render: (row) => (
        <div className="flex flex-col items-start justify-center">
          <p className="font-medium text-sm font-inter text-gray-800 leading-5 mb-1">
            {row.seller}
          </p>
          <p className="text-xs text-[#787A7F] leading-4 font-normal">
            {row.sellerRole}
          </p>
        </div>
      ),
    },
    {
      header: "Amount",
      key: "amount",
      render: (row) => <span>UGX {row.amount.toLocaleString()}</span>,
    },
    { header: "Date", key: "date" },
    {
      header: "Status",
      key: "status",
      render: (row) => (
        <StatusBadge
          status={row.status}
          className="min-w-[104px] mx-auto justify-center"
        />
      ),
    },
    {
      header: "Action",
      key: "action",
      className: "text-center",
      render: (row) => (
        <ActionButton type="process" onClick={() => setSelectedOrder(row)} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="">
        <DashboardTopSection
          title="Orders Management"
          description="Track and manage all customer orders through fulfilment"
          searchPlaceholder="Search products or sellers..."
          searchValue={searchQuery}
          onSearchChange={(value) => {
            setSearchQuery(value);
            setCurrentPage(1);
          }}
          showFilter
          onFilterClick={() => setFilterOpen((v) => !v)}
          filterRef={filterRef}
          filterContent={
            filterOpen ? (
              <FilterPanel>
                <CommonSelect
                  fullWidth
                  value={statusFilter}
                  item={STATUS_OPTIONS.map((status) => ({
                    label: status === "All" ? "All Status" : status,
                    value: status,
                  }))}
                  placeholder="All Status"
                  onValueChange={(value) => {
                    setStatusFilter(value);
                    setCurrentPage(1);
                  }}
                />
              </FilterPanel>
            ) : null
          }
        />
      </div>

      <GenericTable
        data={paginatedOrders}
        columns={columns}
        headerBgColor="bg-[#3C182F]"
        pagination={{
          currentPage: currentPage,
          totalPages: totalPages,
          onPageChange: (page) => setCurrentPage(page),
        }}
      />

      <OrderDetailsModal
        isOpen={!!selectedOrder}
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};
