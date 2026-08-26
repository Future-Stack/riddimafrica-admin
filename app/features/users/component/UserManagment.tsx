import { useEffect, useMemo, useRef, useState } from "react";

import GenericTable, { Column } from "@/app/components/reusable/GenericTable";
import PageHeader from "@/app/components/reusable/PageHeader";
import { Ban, Search } from "lucide-react";

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
// "Login activity" bucket threshold — adjust to whatever counts as
// "high" vs "low" activity for your product.
const LOGIN_ACTIVITY_THRESHOLD = 150;

export function UserManagementSection() {
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
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setFilterOpen(false);
      }
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
          ? u.loginCount >= LOGIN_ACTIVITY_THRESHOLD
          : u.loginCount < LOGIN_ACTIVITY_THRESHOLD);

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
        <span
          className={`inline-flex items-center justify-center w-20 mx-auto px-3 py-2 text-xs font-bold rounded-full ${
            row.status === "Active"
              ? "bg-[#0b663b] text-white"
              : "bg-[#b84b42] text-white"
          }`}
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
        <div className="flex items-center justify-center gap-3 text-gray-400">
          <button
            className="hover:text-black cursor-pointer"
            onClick={() => openDetails(row)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15.58 11.9999C15.58 13.9799 13.98 15.5799 12 15.5799C10.02 15.5799 8.42004 13.9799 8.42004 11.9999C8.42004 10.0199 10.02 8.41992 12 8.41992C13.98 8.41992 15.58 10.0199 15.58 11.9999Z"
                stroke="#897766"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.46997 3.71997 5.17997 5.79997 2.88997 9.39997C1.98997 10.81 1.98997 13.18 2.88997 14.59C5.17997 18.19 8.46997 20.27 12 20.27Z"
                stroke="#897766"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            className="hover:text-red-600 text-[#D4183D] cursor-pointer"
            onClick={() => openSuspendFromRow(row)}
          >
            <Ban className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <PageHeader
            title="User Management"
            description="Manage artist profiles, KYC verification, and featured placements"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#897766]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search"
              className="pl-9 pr-4 py-3.5 rounded-full bg-white border border-[#E8DCC8] text-sm text-[#897766] w-56 focus:outline-none focus:ring-2 focus:ring-[#c19a56]/30"
            />
          </div>

          <div ref={filterRef} className="relative">
            <button
              onClick={() => setFilterOpen((v) => !v)}
              className="flex items-center gap-2 px-4 py-3.5 rounded-full bg-[#D8CBB880] border border-gray-200 text-sm font-medium text-[#897766]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 7H6"
                  stroke="#897766"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 17H9"
                  stroke="#897766"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 17L21 17"
                  stroke="#897766"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 7L21 7"
                  stroke="#897766"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z"
                  stroke="#897766"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z"
                  stroke="#897766"
                  strokeWidth="1.5"
                />
              </svg>
              Filter
            </button>

            {filterOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-10">
                <p className="text-xs font-semibold text-gray-400 mb-2">
                  Status
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(["All", "Active", "Suspend"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setStatusFilter(s);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1 rounded-full text-xs border ${
                        statusFilter === s
                          ? "bg-[#0a192f] text-white border-[#0a192f]"
                          : "bg-white text-gray-500 border-gray-200"
                      }`}
                    >
                      {s === "Suspend" ? "Inactive" : s}
                    </button>
                  ))}
                </div>

                <p className="text-xs font-semibold text-gray-400 mb-2">
                  Country
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {countryOptions.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCountryFilter(c);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1 rounded-full text-xs border ${
                        countryFilter === c
                          ? "bg-[#0a192f] text-white border-[#0a192f]"
                          : "bg-white text-gray-500 border-gray-200"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <p className="text-xs font-semibold text-gray-400 mb-2">
                  Login Activity
                </p>
                <div className="flex flex-wrap gap-2">
                  {(["All", "High", "Low"] as const).map((a) => (
                    <button
                      key={a}
                      onClick={() => {
                        setLoginActivityFilter(a);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1 rounded-full text-xs border ${
                        loginActivityFilter === a
                          ? "bg-[#0a192f] text-white border-[#0a192f]"
                          : "bg-white text-gray-500 border-gray-200"
                      }`}
                    >
                      {a === "All" ? "All" : `${a} Activity`}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="my-6">
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
}
