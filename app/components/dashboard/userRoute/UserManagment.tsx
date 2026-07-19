import { useState } from "react";

import { Eye, Ban } from "lucide-react";
import GenericTable, { Column } from "../../reusable/GenericTable";
import { UserDetailsModal } from "./UserDetailsModal";
import { SuspendReasonModal } from "./SuspendResonModal";


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
    { id: 1, name: "Sarah Johnson", email: "sarah.j@email.com", country: "Nigeria", loginCount: 245, lastLogin: "2 hours ago", status: "Suspend" },
    { id: 2, name: "Sarah Johnson", email: "sarah.j@email.com", country: "Ghana", loginCount: 245, lastLogin: "5 hours ago", status: "Active" },
    { id: 3, name: "Sarah Johnson", email: "sarah.j@email.com", country: "Nigeria", loginCount: 245, lastLogin: "2 hours ago", status: "Suspend" },
    { id: 4, name: "Sarah Johnson", email: "sarah.j@email.com", country: "Ghana", loginCount: 245, lastLogin: "5 hours ago", status: "Active" },
    { id: 5, name: "Sarah Johnson", email: "sarah.j@email.com", country: "Nigeria", loginCount: 245, lastLogin: "2 hours ago", status: "Suspend" },
    { id: 6, name: "Sarah Johnson", email: "sarah.j@email.com", country: "Ghana", loginCount: 245, lastLogin: "5 hours ago", status: "Active" },
    { id: 7, name: "Sarah Johnson", email: "sarah.j@email.com", country: "Nigeria", loginCount: 245, lastLogin: "2 hours ago", status: "Suspend" },
    { id: 8, name: "Sarah Johnson", email: "sarah.j@email.com", country: "Ghana", loginCount: 245, lastLogin: "5 hours ago", status: "Active" },
];

export function UserManagementSection() {
    const [currentPage, setCurrentPage] = useState(2);
    const [users, setUsers] = useState<UserData[]>(INITIAL_USERS);

    // The user currently shown in the "View" details modal
    const [viewedUser, setViewedUser] = useState<UserData | null>(null);
    // The user currently targeted for suspension (opens the reason modal)
    const [suspendTarget, setSuspendTarget] = useState<UserData | null>(null);

    const openDetails = (row: UserData) => setViewedUser(row);
    const closeDetails = () => setViewedUser(null);

    // Ban icon in the table row -> straight to the reason modal
    const openSuspendFromRow = (row: UserData) => setSuspendTarget(row);

    // "Suspend Account" inside the details modal -> close details, open reason modal
    const openSuspendFromDetails = () => {
        if (!viewedUser) return;
        setSuspendTarget(viewedUser);
        setViewedUser(null);
    };

    const closeSuspendModal = () => setSuspendTarget(null);

    const confirmSuspend = (reason: string) => {
        if (!suspendTarget) return;
        // TODO: call your suspend API here with { id: suspendTarget.id, reason }
        console.log(`Suspending user ${suspendTarget.id} — reason: ${reason}`);

        setUsers((prev) =>
            prev.map((u) => (u.id === suspendTarget.id ? { ...u, status: "Suspend" } : u))
        );
        setSuspendTarget(null);
    };

    const columns: Column<UserData>[] = [
        {
            header: "User",
            key: "name",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <img src="/Container.svg" />
                    <span className="font-medium text-sm sm:text-base text-[#101828] leading-5 font-inter mb-1">{row.name}</span>
                </div>
            )
        },
        { header: "Email", key: "email", className: "text-left border-r border-[#EEF2FF]" },
        { header: "Country", key: "country" },
        { header: "Login", key: "loginCount", },
        { header: "Last Login", key: "lastLogin" },
        {
            header: "Status",
            key: "status",

            render: (row) => (
                <span
                    className={`inline-flex items-center justify-center w-20 mx-auto px-3 py-2 text-xs font-bold rounded-full ${row.status === "Active"
                        ? "bg-[#0b663b] text-white"
                        : "bg-[#b84b42] text-white"
                        }`}
                >
                    {row.status}
                </span>
            )
        },
        {
            header: "Action",
            key: "action",
            className: "text-center",
            render: (row) => (
                <div className="flex items-center justify-center gap-3 text-gray-400">
                    <button className="hover:text-black cursor-pointer" onClick={() => openDetails(row)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15.58 11.9999C15.58 13.9799 13.98 15.5799 12 15.5799C10.02 15.5799 8.42004 13.9799 8.42004 11.9999C8.42004 10.0199 10.02 8.41992 12 8.41992C13.98 8.41992 15.58 10.0199 15.58 11.9999Z" stroke="#897766" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.46997 3.71997 5.17997 5.79997 2.88997 9.39997C1.98997 10.81 1.98997 13.18 2.88997 14.59C5.17997 18.19 8.46997 20.27 12 20.27Z" stroke="#897766" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                    <button className="hover:text-red-600 text-[#D4183D] cursor-pointer" onClick={() => openSuspendFromRow(row)}>
                        <Ban className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="mt-6">
            <GenericTable
                data={users}
                columns={columns}
                headerBgColor="bg-[#3C182F]"
                pagination={{
                    currentPage: currentPage,
                    totalPages: 3,
                    onPageChange: (page) => setCurrentPage(page),
                }}
            />

            <UserDetailsModal
                isOpen={!!viewedUser}
                onClose={closeDetails}
                onSuspendTrigger={openSuspendFromDetails}
                user={{
                    name: viewedUser?.name ?? '',
                    email: viewedUser?.email ?? '',
                    status: viewedUser?.status ?? '',
                    country: viewedUser?.country ?? '',
                    totalLogins: viewedUser?.loginCount ?? 0,
                    lastLogin: viewedUser?.lastLogin ?? '',
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