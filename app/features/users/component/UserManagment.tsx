"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import GenericTable, { Column } from "@/app/components/common/GenericTable";

import ActionButton from "@/app/components/common/button/ActionButton";
import CommonSelect from "@/app/components/common/button/CommonSelect";
import FilterPanel from "@/app/components/common/button/FilterPanel";
import StatusBadge from "@/app/components/common/button/StatusBadge";
import DashboardTopSection from "@/app/components/common/header/DashboardTopSection";
import { SuspendReasonModal } from "./SuspendResonModal";
import UserCard from "./UserCard";
import { UserDetailsModal } from "./UserDetailsModal";

interface UserData {
  id: number;
  name: string;
  email: string;
  country: string;
  loginCount: number;
  lastLogin: string;
  status: "Active" | "Suspend";
}

const INITIAL_USERS: UserData[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    country: "Nigeria",
    loginCount: 245,
    lastLogin: "2 hours ago",
    status: "Suspend",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    country: "Ghana",
    loginCount: 245,
    lastLogin: "5 hours ago",
    status: "Active",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    country: "Nigeria",
    loginCount: 245,
    lastLogin: "2 hours ago",
    status: "Suspend",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    country: "Ghana",
    loginCount: 245,
    lastLogin: "5 hours ago",
    status: "Active",
  },
  {
    id: 5,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    country: "Nigeria",
    loginCount: 245,
    lastLogin: "2 hours ago",
    status: "Suspend",
  },
  {
    id: 6,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    country: "Ghana",
    loginCount: 245,
    lastLogin: "5 hours ago",
    status: "Active",
  },
  {
    id: 7,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    country: "Nigeria",
    loginCount: 245,
    lastLogin: "2 hours ago",
    status: "Suspend",
  },
  {
    id: 8,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    country: "Ghana",
    loginCount: 245,
    lastLogin: "5 hours ago",
    status: "Active",
  },
];

const PAGE_SIZE = 8;
const LOGIN_ACTIVITY_HIGH = 200;
const LOGIN_ACTIVITY_LOW = 50;

const STATUS_OPTIONS = [
  { label: "All Status", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Suspend", value: "Suspend" },
] as const;

const LOGIN_ACTIVITY_OPTIONS = [
  { label: "Login Activity", value: "All" },
  { label: "High (>200 login)", value: "High" },
  { label: "Low (<50 login)", value: "Low" },
] as const;

export const UserManagementSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<UserData[]>(INITIAL_USERS);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Suspend"
  >("All");
  const [countryFilter, setCountryFilter] = useState<string>("All");
  const [loginActivityFilter, setLoginActivityFilter] = useState<
    "All" | "High" | "Low"
  >("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const [viewedUser, setViewedUser] = useState<UserData | null>(null);

  const [suspendTarget, setSuspendTarget] = useState<UserData | null>(null);

  const openDetails = (row: UserData) => setViewedUser(row);
  const closeDetails = () => setViewedUser(null);

  const openSuspendFromRow = (row: UserData) => setSuspendTarget(row);
  const openSuspendFromDetails = () => {
    if (!viewedUser) return;
    setSuspendTarget(viewedUser);
    setViewedUser(null);
  };

  const closeSuspendModal = () => setSuspendTarget(null);

  const confirmSuspend = (reason: string) => {
    if (!suspendTarget) return;
    console.log(`Suspending user ${suspendTarget.id} — reason: ${reason}`);

    setUsers((prev) =>
      prev.map((u) =>
        u.id === suspendTarget.id ? { ...u, status: "Suspend" } : u,
      ),
    );
    setSuspendTarget(null);
  };

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

  const countryOptions = useMemo(() => {
    const unique = Array.from(new Set(users.map((u) => u.country)));
    return ["All", ...unique];
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);

      const matchesStatus = statusFilter === "All" || u.status === statusFilter;
      const matchesCountry =
        countryFilter === "All" || u.country === countryFilter;

      const matchesActivity =
        loginActivityFilter === "All" ||
        (loginActivityFilter === "High"
          ? u.loginCount > LOGIN_ACTIVITY_HIGH
          : u.loginCount < LOGIN_ACTIVITY_LOW);

      return (
        matchesSearch && matchesStatus && matchesCountry && matchesActivity
      );
    });
  }, [users, searchQuery, statusFilter, countryFilter, loginActivityFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const columns: Column<UserData>[] = [
    {
      header: "User",
      key: "name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src="/Container.svg" />
          <span className="font-medium text-sm sm:text-base text-[#101828] leading-5 font-inter mb-1">
            {row.name}
          </span>
        </div>
      ),
    },
    {
      header: "Email",
      key: "email",
      className: "text-left border-r border-[#EEF2FF]",
    },
    { header: "Country", key: "country" },
    { header: "Login", key: "loginCount" },
    { header: "Last Login", key: "lastLogin" },
    {
      header: "Status",
      key: "status",

      render: (row) => (
        <StatusBadge
          status={row.status}
          className="w-20 mx-auto justify-center"
        />
      ),
    },
    {
      header: "Action",
      key: "action",
      className: "text-center",
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          <ActionButton type="view" onClick={() => openDetails(row)} />
          <ActionButton
            type="suspend"
            onClick={() => openSuspendFromRow(row)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="">
        <DashboardTopSection
          title="User Management"
          description="Manage artist profiles, KYC verification, and featured placements"
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
                  item={STATUS_OPTIONS}
                  placeholder="All Status"
                  onValueChange={(value) => {
                    setStatusFilter(value);
                    setCurrentPage(1);
                  }}
                />
                <CommonSelect
                  fullWidth
                  value={countryFilter}
                  item={countryOptions.map((country) => ({
                    label: country === "All" ? "All Country" : country,
                    value: country,
                  }))}
                  placeholder="All Country"
                  onValueChange={(value) => {
                    setCountryFilter(value);
                    setCurrentPage(1);
                  }}
                />
                <CommonSelect
                  fullWidth
                  value={loginActivityFilter}
                  item={LOGIN_ACTIVITY_OPTIONS}
                  placeholder="Login Activity"
                  onValueChange={(value) => {
                    setLoginActivityFilter(value);
                    setCurrentPage(1);
                  }}
                />
              </FilterPanel>
            ) : null
          }
        />
      </div>

      <div className="">
        <UserCard />
      </div>

      <GenericTable
        data={paginatedUsers}
        columns={columns}
        headerBgColor="bg-[#3C182F]"
        pagination={{
          currentPage: currentPage,
          totalPages: totalPages,
          onPageChange: (page) => setCurrentPage(page),
        }}
      />

      <UserDetailsModal
        isOpen={!!viewedUser}
        onClose={closeDetails}
        onSuspendTrigger={openSuspendFromDetails}
        user={{
          name: viewedUser?.name ?? "",
          email: viewedUser?.email ?? "",
          status: viewedUser?.status ?? "",
          country: viewedUser?.country ?? "",
          totalLogins: viewedUser?.loginCount ?? 0,
          lastLogin: viewedUser?.lastLogin ?? "",
          songsPlayed: viewedUser?.lastLogin ?? "",
          purchasesMade: viewedUser?.lastLogin ?? "",
        }}
      />

      <SuspendReasonModal
        isOpen={!!suspendTarget}
        onClose={closeSuspendModal}
        onConfirm={confirmSuspend}
      />
    </div>
  );
};
