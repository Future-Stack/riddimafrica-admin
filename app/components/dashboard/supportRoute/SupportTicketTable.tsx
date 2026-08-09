"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import GenericTable, { Column } from "../../reusable/GenericTable";
import { Ticket, TicketStatus } from "@/app/types/supportType";


interface SupportTicketsTableProps {
    tickets: Ticket[];
    onViewChat: (ticket: Ticket) => void;
}

const STATUSES: TicketStatus[] = ["Open", "Pending", "Resolved", "Rejected"];
const PAGE_SIZE = 8;

export function SupportTicketsTable({ tickets, onViewChat }: SupportTicketsTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredTickets = tickets.filter((t) => {
        const matchesSearch =
            t.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.orderId.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "All" || t.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.max(1, Math.ceil(filteredTickets.length / PAGE_SIZE));
    const paginatedTickets = filteredTickets.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const getStatusBadge = (status: TicketStatus) => {
        switch (status) {
            case "Pending":
                return "bg-[#f5d061] text-gray-900";
            case "Open":
                return "bg-[#5c2443] text-white";
            case "Rejected":
                return "bg-[#cc0000] text-white";
            case "Resolved":
                return "bg-[#0f766e] text-white";
            default:
                return "bg-gray-200 text-gray-800";
        }
    };

    const columns: Column<Ticket>[] = [
        {
            header: "Ticket",
            key: "ticketId",
            render: (row) => <span className="font-normal text-[#101828]">{row.ticketId}</span>,
        },
        {
            header: "User",
            key: "userName",
            render: (row) => (
                <div className="flex items-center gap-2.5">
                    <img
                        src={row.userAvatar}
                        alt={row.userName}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                        <p className="font-normal text-[#101828] leading-tight">{row.userName}</p>
                        <p className="text-sm text-[#6A7282] font-normal">{row.userEmail}</p>
                    </div>
                </div>
            ),
        },
        {
            header: "Reason",
            key: "reason",
            render: (row) => (
                <span className="text-[#6A7282] block max-w-[200px] text-xs truncate">{row.reason}</span>
            ),
        },
        {
            header: "Order ID",
            key: "orderId",
            render: (row) => (
                <span className="bg-[#e2f1ee] text-[#115e59] px-2.5 py-1 rounded font-bold text-[11px]">
                    {row.orderId}
                </span>
            ),
        },
        {
            header: "Media",
            key: "media",
            render: (row) => (
                <div className="flex items-center -space-x-1">
                    {row.media.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt="media"
                            className="w-7 h-7 rounded border border-white object-cover"
                        />
                    ))}
                    {row.media.length > 0 && (
                        <span className="w-7 h-7 bg-black text-white text-[10px] font-bold rounded flex items-center justify-center">
                            +{row.media.length}
                        </span>
                    )}
                </div>
            ),
        },
        {
            header: "Last Message",
            key: "lastMessage",
            render: (row) => (
                <span className="text-gray-600 block max-w-[220px] truncate">{row.lastMessage}</span>
            ),
        },
        {
            header: "Updated",
            key: "updated",
            render: (row) => <span className="text-gray-500 font-medium whitespace-nowrap">{row.updated}</span>,
        },
        {
            header: "Status",
            key: "status",
            render: (row) => (
                <span className={`px-3 py-1 rounded-full font-bold text-[11px] inline-block ${getStatusBadge(row.status)}`}>
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
                    onClick={() => onViewChat(row)}
                    className="bg-[#fef3c7] hover:bg-[#fde68a] text-[#92400e] font-bold px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                >
                    View chat ›
                </button>
            ),
        },
    ];

    return (
        <div className="w-full bg-[#fcf9f2] p-4 sm:p-6 rounded-2xl min-h-screen">
            {/* Header Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[#3c182f]">Support Tickets</h1>
                    <p className="text-xs sm:text-sm text-[#8c6b51] font-medium mt-1">
                        <span className="font-bold">5 unread</span> • 4 open • 1 pending • 2 resolved
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search products id ..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full text-xs sm:text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#3c182f]"
                        />
                    </div>

                    {/* Filter Dropdown */}
                    <div className="relative" ref={filterRef}>
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#eae3d2] hover:bg-[#dfd4bd] text-xs sm:text-sm font-semibold text-[#3c182f] rounded-full transition-colors cursor-pointer"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filter
                        </button>

                        {isFilterOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl p-3 z-30">
                                <p className="text-xs font-bold text-gray-400 mb-2 uppercase">Status</p>
                                <div className="flex flex-col gap-1">
                                    <button
                                        onClick={() => {
                                            setStatusFilter("All");
                                            setCurrentPage(1);
                                            setIsFilterOpen(false);
                                        }}
                                        className={`text-left px-3 py-1.5 rounded-lg text-xs font-semibold ${statusFilter === "All" ? "bg-[#3c182f] text-white" : "hover:bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        All
                                    </button>
                                    {STATUSES.map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => {
                                                setStatusFilter(status);
                                                setCurrentPage(1);
                                                setIsFilterOpen(false);
                                            }}
                                            className={`text-left px-3 py-1.5 rounded-lg text-xs font-semibold ${statusFilter === status ? "bg-[#3c182f] text-white" : "hover:bg-gray-100 text-gray-700"
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

            {/* Reusable Generic Table */}
            <GenericTable
                data={paginatedTickets}
                columns={columns}
                headerBgColor="bg-[#3c182f]"
                pagination={{
                    currentPage: currentPage,
                    totalPages: totalPages,
                    onPageChange: (page) => setCurrentPage(page),
                }}
            />
        </div>
    );
}