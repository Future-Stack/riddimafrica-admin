"use client";

import GenericTable, { Column } from "@/app/components/reusable/GenericTable";
import PageHeader from "@/app/components/reusable/PageHeader";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { OrderDetailsModal, OrderItem, OrderStatus } from "./OrderDetailsModal";

const INITIAL_ORDERS: OrderItem[] = [
    { id: "1", orderId: "ORD-0001", customer: "Teni", handle: "jide001", location: "Lagos", items: "Teni Limited Hoodie", seller: "Teni", sellerRole: "Artist", amount: 18420, totalSales: 12, date: "2 Mar 2025", status: "Packaging", lastUpdated: "Just now" },
    { id: "2", orderId: "ORD-0002", customer: "Teni", handle: "jide001", location: "Lagos", items: "Teni Limited Hoodie", seller: "AfroBeatsNG", sellerRole: "Seller", amount: 11200, totalSales: 15, date: "2 Mar 2025", status: "Seller Shipped", lastUpdated: "2 hrs ago" },
    { id: "3", orderId: "ORD-0003", customer: "Teni", handle: "jide001", location: "Lagos", items: "Teni Limited Hoodie", seller: "AfroBeatsNG", sellerRole: "Seller", amount: 22200, totalSales: 8, date: "2 Mar 2025", status: "Cancelled", lastUpdated: "Yesterday" },
    { id: "4", orderId: "ORD-0004", customer: "Teni", handle: "jide001", location: "Lagos", items: "Teni Limited Hoodie", seller: "AfroBeatsNG", sellerRole: "Seller", amount: 8000, totalSales: 20, date: "2 Mar 2025", status: "New", lastUpdated: "1 hr ago" },
    { id: "5", orderId: "ORD-0005", customer: "Teni", handle: "jide001", location: "Lagos", items: "Teni Limited Hoodie", seller: "AfroBeatsNG", sellerRole: "Seller", amount: 22200, totalSales: 5, date: "2 Mar 2025", status: "New", lastUpdated: "Just now" },
    { id: "6", orderId: "ORD-0006", customer: "Teni", handle: "jide001", location: "Lagos", items: "Teni Limited Hoodie", seller: "AfroBeatsNG", sellerRole: "Seller", amount: 8000, totalSales: 19, date: "2 Mar 2025", status: "Delivered", lastUpdated: "3 days ago" },
    { id: "7", orderId: "ORD-0007", customer: "Teni", handle: "jide001", location: "Lagos", items: "Teni Limited Hoodie", seller: "AfroBeatsNG", sellerRole: "Seller", amount: 22200, totalSales: 11, date: "2 Mar 2025", status: "Received at Office", lastUpdated: "Just now" },
    { id: "8", orderId: "ORD-0008", customer: "Teni", handle: "jide001", location: "Lagos", items: "Teni Limited Hoodie", seller: "AfroBeatsNG", sellerRole: "Seller", amount: 8000, totalSales: 14, date: "2 Mar 2025", status: "Dispatched", lastUpdated: "4 hrs ago" },
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

export function OrdersTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"All" | OrderStatus>("All");
    const [filterOpen, setFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setFilterOpen(false);
            }
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
        currentPage * PAGE_SIZE
    );

    const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
        setOrders((prev) =>
            prev.map((o) =>
                o.orderId === orderId
                    ? { ...o, status: newStatus, lastUpdated: "Just now" }
                    : o
            )
        );
        setSelectedOrder((prev) =>
            prev && prev.orderId === orderId
                ? { ...prev, status: newStatus, lastUpdated: "Just now" }
                : prev
        );
    };

    const statusBadgeClass = (status: OrderStatus) => {
        switch (status) {
            case "Packaging":
                return "bg-[#B75432] text-white";
            case "Seller Shipped":
            case "Dispatched":
                return "bg-[#6D2B55] text-white";
            case "Cancelled":
                return "bg-[#C9000A] text-white";
            case "New":
                return "bg-[#052787] text-white";
            case "Delivered":
            case "Received at Office":
            case "Quality Inspection":
                return "bg-[#0f8a70] text-white";
            default:
                return "bg-gray-500 text-white";
        }
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
                    <p className="font-medium text-sm font-inter text-gray-800 leading-5 mb-1">{row.seller}</p>
                    <p className="text-xs text-[#787A7F] leading-4 font-normal ">{row.sellerRole}</p>
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
                <span
                    className={`inline-flex items-center justify-center min-w-[104px] px-3 py-2 text-xs font-bold rounded-full ${statusBadgeClass(
                        row.status
                    )}`}
                >
                    {row.status}
                </span>
            ),
        },
        {
            header: "Action",
            key: "action",
            className: "text-center",
            render: (row) => (
                <button
                    onClick={() => setSelectedOrder(row)}
                    className="bg-[#eab308] text-white px-4 py-2 rounded-md text-xs font-bold hover:bg-yellow-600 transition-colors flex items-center justify-center gap-1 mx-auto cursor-pointer"
                >
                    Process <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6.00003 4C6.00003 4 9.99999 6.94596 10 8.00003C10 9.05411 6 12 6 12" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            ),
        },
    ];

    return (
        <div className="w-full">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <PageHeader
                    title="Orders Management"
                    description="Track and manage all customer orders through fulfilment"
                />

                <div className="flex items-center gap-3">
                    {/* Search Box */}
                    <div className="relative">
                        <Search
                            size={16}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder="Search products or sellers..."
                            className="pl-9 pr-4 py-3.5 rounded-full bg-white border border-[#E8DCC8] text-sm text-[#897766] w-56 focus:outline-none focus:ring-2 focus:ring-[#c19a56]/30"
                        />
                    </div>

                    {/* Filter Dropdown */}
                    <div ref={filterRef} className="relative">
                        <button
                            onClick={() => setFilterOpen((v) => !v)}
                            className="flex items-center gap-2 px-4 py-3.5 rounded-full bg-[#D8CBB880] border border-gray-200 text-sm font-medium text-[#897766]"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M3 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M3 17H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M18 17L21 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M15 7L21 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="15" cy="17" r="3" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                            Filter
                        </button>

                        {filterOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-20">
                                <p className="text-xs font-bold text-gray-400 mb-2 ">Order Status</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {STATUS_OPTIONS.map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => {
                                                setStatusFilter(status);
                                                setCurrentPage(1);
                                            }}
                                            className={`px-3 py-1 rounded-full text-xs font-bold border cursor-pointer transition-colors ${statusFilter === status
                                                    ? "bg-[#3c182f] text-white border-[#3c182f]"
                                                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Generic Table */}
            <GenericTable
                data={paginatedOrders}
                columns={columns}
                headerBgColor="bg-[#3c182f]"
                pagination={{
                    currentPage: currentPage,
                    totalPages: totalPages,
                    onPageChange: (page) => setCurrentPage(page),
                }}
            />

            {/* Order Process Modal */}
            <OrderDetailsModal
                isOpen={!!selectedOrder}
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
                onUpdateStatus={handleUpdateStatus}
            />
        </div>
    );
}