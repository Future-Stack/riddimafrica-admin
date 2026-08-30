"use client";

import ActionButton from "@/app/components/common/button/ActionButton";
import CommonSelect from "@/app/components/common/button/CommonSelect";
import FilterPanel from "@/app/components/common/button/FilterPanel";
import StatusBadge from "@/app/components/common/button/StatusBadge";
import GenericTable, { Column } from "@/app/components/common/GenericTable";
import DashboardTopSection from "@/app/components/common/header/DashboardTopSection";
import { Ticket, TicketStatus } from "@/app/types/supportType";
import { useEffect, useMemo, useRef, useState } from "react";

interface SupportTicketsTableProps {
  tickets: Ticket[];
  onViewChat: (ticket: Ticket) => void;
}

const STATUSES: TicketStatus[] = ["Open", "Pending", "Resolved", "Rejected"];
const PAGE_SIZE = 8;

export const SupportTicketsTable = ({
  tickets,
  onViewChat,
}: SupportTicketsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (filterRef.current?.contains(target)) return;
      if (target?.closest("[data-slot='select-content']")) return;
      if (target?.closest("[data-slot='select-item']")) return;
      setIsFilterOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const stats = useMemo(() => {
    const unread = tickets.filter((t) => t.status === "Open" || t.status === "Pending").length;
    const open = tickets.filter((t) => t.status === "Open").length;
    const pending = tickets.filter((t) => t.status === "Pending").length;
    const resolved = tickets.filter((t) => t.status === "Resolved").length;
    return `${unread} unread · ${open} open · ${pending} pending · ${resolved} resolved`;
  }, [tickets]);

  const filteredTickets = tickets.filter((t) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      t.ticketId.toLowerCase().includes(q) ||
      t.userName.toLowerCase().includes(q) ||
      t.orderId.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "All" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredTickets.length / PAGE_SIZE));
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const columns: Column<Ticket>[] = [
    {
      header: "Ticket",
      key: "ticketId",
      render: (row) => (
        <span className="font-normal text-[#101828]">{row.ticketId}</span>
      ),
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
            <p className="font-normal text-[#101828] leading-tight">
              {row.userName}
            </p>
            <p className="text-sm text-[#6A7282] font-normal">{row.userEmail}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Reason",
      key: "reason",
      render: (row) => (
        <span className="text-[#6A7282] block max-w-[200px] text-xs">
          {row.reason}
        </span>
      ),
    },
    {
      header: "Order ID",
      key: "orderId",
      render: (row) => (
        <span className="bg-[#E1EBEC] text-[#326F72] px-4 py-2 rounded-md font-medium text-sm">
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
        <span className="text-[#3D2513] block max-w-[220px]">
          {row.lastMessage}
        </span>
      ),
    },
    {
      header: "Updated",
      key: "updated",
      render: (row) => (
        <span className="text-[#3D2513] font-medium whitespace-nowrap">
          {row.updated}
        </span>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (row) => (
        <StatusBadge
          status={row.status}
          className="min-w-[88px] justify-center"
        />
      ),
    },
    {
      header: "Action",
      key: "action",
      className: "text-center",
      render: (row) => (
        <ActionButton type="chat" onClick={() => onViewChat(row)} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DashboardTopSection
        title="Support Tickets"
        description={stats}
        searchPlaceholder="Search products id..."
        searchValue={searchQuery}
        onSearchChange={(value) => {
          setSearchQuery(value);
          setCurrentPage(1);
        }}
        showFilter
        onFilterClick={() => setIsFilterOpen((v) => !v)}
        filterRef={filterRef}
        filterContent={
          isFilterOpen ? (
            <FilterPanel>
              <CommonSelect
                fullWidth
                value={statusFilter}
                item={[
                  { label: "All Status", value: "All" },
                  ...STATUSES.map((status) => ({
                    label: status,
                    value: status,
                  })),
                ]}
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

      <GenericTable
        data={paginatedTickets}
        columns={columns}
        headerBgColor="bg-[#3c182f]"
        pagination={{
          currentPage,
          totalPages,
          onPageChange: (page) => setCurrentPage(page),
        }}
      />
    </div>
  );
};
