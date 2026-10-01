"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import GenericTable, { Column } from "@/app/components/common/GenericTable";

import ActionButton from "@/app/components/common/button/ActionButton";
import CommonSelect from "@/app/components/common/button/CommonSelect";
import FilterPanel from "@/app/components/common/button/FilterPanel";
import StatusBadge from "@/app/components/common/button/StatusBadge";
import DashboardTopSection from "@/app/components/common/header/DashboardTopSection";
import {
  useGetUsersQuery,
  useGetUserStatsQuery,
  useSuspendUserMutation,
  useToggleUserPresenterMutation,
} from "@/store/features/user/userAPI";
import type {
  AdminUser,
  GetUsersParams,
  UserStatus,
} from "@/store/features/user/types/userTypes";
import { SuspendReasonModal } from "./SuspendResonModal";
import UserCard from "./UserCard";
import { UserDetailsModal } from "./UserDetailsModal";

interface UserRow {
  id: string;
  name: string;
  email: string;
  username: string;
  phoneNumber: string;
  profileImage: string | null;
  country: string;
  loginCount: string;
  lastLogin: string;
  status: UserStatus;
  isPresenter: boolean;
}

const PAGE_SIZE = 8;

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

const EMPTY_DETAILS = {
  id: "",
  name: "",
  email: "",
  status: "",
  country: "—",
  totalLogins: "—",
  lastLogin: "—",
  isPresenter: false,
};

const toUserRow = (user: AdminUser): UserRow => ({
  id: user.userId,
  name: user.fullName,
  email: user.email,
  username: user.username,
  phoneNumber: user.phoneNumber ?? "—",
  profileImage: user.profileImage,
  country: "—",
  loginCount: "—",
  lastLogin: "—",
  status: user.status,
  isPresenter: user.isPresenter ?? false,
});

const toApiStatus = (
  statusFilter: "All" | "Active" | "Suspend",
): UserStatus | undefined => {
  if (statusFilter === "Active") return "active";
  if (statusFilter === "Suspend") return "suspend";
  return undefined;
};

export const UserManagementSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Suspend"
  >("All");
  const [countryFilter, setCountryFilter] = useState<string>("All");
  const [loginActivityFilter, setLoginActivityFilter] = useState<
    "All" | "High" | "Low"
  >("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const [viewedUser, setViewedUser] = useState<UserRow | null>(null);
  const [suspendTarget, setSuspendTarget] = useState<UserRow | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
      setCurrentPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const queryArgs: GetUsersParams = useMemo(() => {
    const status = toApiStatus(statusFilter);
    return {
      page: currentPage,
      limit: PAGE_SIZE,
      ...(debouncedSearch ? { search: debouncedSearch } : {}),
      ...(status ? { status } : {}),
    };
  }, [currentPage, debouncedSearch, statusFilter]);

  const statsArgs: GetUsersParams = useMemo(() => {
    const status = toApiStatus(statusFilter);
    return {
      ...(debouncedSearch ? { search: debouncedSearch } : {}),
      ...(status ? { status } : {}),
    };
  }, [debouncedSearch, statusFilter]);

  const { data: usersResponse } = useGetUsersQuery(queryArgs);
  const { data: statsResponse } = useGetUserStatsQuery(statsArgs);
  const [suspendUser] = useSuspendUserMutation();
  const [toggleUserPresenter] = useToggleUserPresenterMutation();

  const users = useMemo(
    () => (usersResponse?.data ?? []).map(toUserRow),
    [usersResponse],
  );
  const totalPages = Math.max(1, usersResponse?.meta?.totalPages ?? 1);

  const openDetails = (row: UserRow) => setViewedUser(row);
  const closeDetails = () => setViewedUser(null);

  const openSuspendFromRow = (row: UserRow) => setSuspendTarget(row);
  const openSuspendFromDetails = () => {
    if (!viewedUser) return;
    setSuspendTarget(viewedUser);
    setViewedUser(null);
  };

  const closeSuspendModal = () => setSuspendTarget(null);

  const confirmSuspend = async (reason: string) => {
    if (!suspendTarget) return;
    await suspendUser({ id: suspendTarget.id, reason }).unwrap();
    setSuspendTarget(null);
  };

  const handlePresenterChange = async (isPresenter: boolean) => {
    if (!viewedUser) return;
    await toggleUserPresenter({
      id: viewedUser.id,
      isPresenter,
    }).unwrap();
    setViewedUser((current) =>
      current ? { ...current, isPresenter } : current,
    );
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

  const countryOptions = ["All"];

  const columns: Column<UserRow>[] = [
    {
      header: "User",
      key: "name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.profileImage || "/Container.svg"}
            alt=""
            className="h-8 w-8 rounded-full object-cover"
            onError={(event) => {
              (event.target as HTMLImageElement).src = "/Container.svg";
            }}
          />
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
        <UserCard stats={statsResponse?.data} />
      </div>

      <GenericTable
        data={users}
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
        onPresenterChange={handlePresenterChange}
        user={
          viewedUser
            ? {
                id: viewedUser.id,
                name: viewedUser.name,
                email: viewedUser.email,
                status:
                  viewedUser.status === "active" ? "Active" : "Suspend",
                country: viewedUser.country,
                totalLogins: viewedUser.loginCount,
                lastLogin: viewedUser.lastLogin,
                isPresenter: viewedUser.isPresenter,
              }
            : EMPTY_DETAILS
        }
      />

      <SuspendReasonModal
        isOpen={!!suspendTarget}
        onClose={closeSuspendModal}
        onConfirm={confirmSuspend}
      />
    </div>
  );
};
