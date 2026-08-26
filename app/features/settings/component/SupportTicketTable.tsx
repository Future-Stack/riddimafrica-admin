"use client";

import GenericTable, { Column } from "@/app/components/reusable/GenericTable";
import PageHeader from "@/app/components/reusable/PageHeader";
import { Ticket, TicketStatus } from "@/app/types/supportType";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";


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
                return "bg-[#F4D242] text-white";
            case "Open":
                return "bg-[#6D2B55] text-white";
            case "Rejected":
                return "bg-[#C9000A] text-white";
            case "Resolved":
                return "bg-[#008471] text-white";
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
                <span className="text-[#6A7282] block max-w-[200px] text-xs ">{row.reason}</span>
            ),
        },
        {
            header: "Order ID",
            key: "orderId",
            render: (row) => (
                <span className="bg-[#E1EBEC] text-[#326F72] px-4 py-2 rounded-md  font-medium text-sm">
                    {row.orderId}
                </span>
            ),
        },
        {
            header: "Media",
            key: "media",
            render: (row) => (
                <div className="flex gap-2 items-center -space-x-1">
                    {row.media.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt="media"
                            className="w-7 h-8 rounded-sm border border-[#181B1F] object-cover"
                        />
                    ))}
                    {row.media.length > 0 && (
                        <span className="w-7 h-8 bg-black text-[#787A7F] text-[10px] font-bold rounded flex items-center justify-center">
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
                <span className="text-[#3D2513] block max-w-[220px] ">{row.lastMessage}</span>
            ),
        },
        {
            header: "Updated",
            key: "updated",
            render: (row) => <span className="text-[#3D2513] font-medium whitespace-nowrap">{row.updated}</span>,
        },
        {
            header: "Status",
            key: "status",
            render: (row) => (
                <span className={`px-3 py-2 rounded-full font-normal text-xs inline-block ${getStatusBadge(row.status)}`}>
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
                    className="bg-[#E6A4001A] hover:bg-[#E6A40033] text-[#E6A400] border border-[#E6A40033] font-bold px-3 py-1.5 rounded-[6px] text-xs flex items-center gap-1 transition-colors cursor-pointer"
                >
                    View chat <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                        <path d="M3.78516 8.52346L6.30861 6.00001L3.78516 3.47656" stroke="#E6A400" stroke-width="0.84115" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            ),
        },
    ];

    return (
        <div className="w-full  min-h-screen">
            {/* Header Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <PageHeader
                        title="Support Tickets"
                        description=""
                    />
                    <p className="text-xs sm:text-sm text-[#787A7F] font-normal mt-1">
                        <span className="text-[#E6A400]">5 unread</span> • 4 open • 1 pending • 2 resolved
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search user name ..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="pl-9 pr-4 py-3.5 rounded-full bg-white border border-[#E8DCC8] text-sm text-[#897766] w-56 focus:outline-none focus:ring-2 focus:ring-[#c19a56]/30"
                        />
                    </div>

                    {/* Filter Dropdown */}
                    <div className="relative" ref={filterRef}>
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center gap-2 px-4 py-3.5 rounded-full bg-[#D8CBB880] border border-gray-200 text-sm font-medium text-[#897766]"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3 7H6" stroke="#897766" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M3 17H9" stroke="#897766" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18 17L21 17" stroke="#897766" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15 7L21 7" stroke="#897766" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z" stroke="#897766" stroke-width="1.5" />
                                <path d="M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z" stroke="#897766" stroke-width="1.5" />
                            </svg>
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