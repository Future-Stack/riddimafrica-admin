import GenericTable, { Column } from "@/app/components/reusable/GenericTable";
import PageHeader from "@/app/components/reusable/PageHeader";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import SellerCard from "./SellerCard";
import { SellerProfileData, SellerProfileModal } from "./SellerProfileModal";
import { SellerSuspendModal } from "./SellerSuspendModal";


type SellerStatus = "Active" | "Pending" | "Rejected" | "Suspended";
type KycStatus = "Pending" | "Complete";

interface SellerData {
    id: number;
    sellerId: string;
    name: string;
    handle: string;
    phone: string;
    email: string;
    avatar: string;
    business: string;
    businessType: string;
    paymentMethod: string;
    accountMasked: string;
    kycStatus: KycStatus;
    products: number;
    amountUGX: number;
    joined: string;
    verificationRequest: KycStatus;
    status: SellerStatus;
    featuredOnHomepage: boolean;
    totalOrders: number;
    returns: number;
    rating: number;
    responseRate: number;
    kycDocuments: { name: string; linkLabel: string }[];
    recentPayouts: { date: string; amountUGX: number; status: "Paid" | "Pending" }[];
    verificationDocuments: { name: string; fileName: string; date: string }[];
    verificationSubmittedAt: string;
}

const AVATAR = "https://i.pravatar.cc/64?img=13";

const DEFAULT_KYC_DOCS = [
    { name: "Government ID (NIN/Int'l Passport)", linkLabel: "View/Download" },
    { name: "CAC Certificate", linkLabel: "View/Download" },
    { name: "Bank Statement (3 months)", linkLabel: "View/Download" },
];

const DEFAULT_PAYOUTS: { date: string; amountUGX: number; status: "Paid" | "Pending" }[] = [
    { date: "10 Jun 2025", amountUGX: 820000, status: "Paid" },
    { date: "10 Jun 2025", amountUGX: 820000, status: "Paid" },
    { date: "10 Jun 2025", amountUGX: 820000, status: "Paid" },
];

const DEFAULT_VERIFICATION_DOCS = [
    { name: "Business Licence", fileName: "business_Licence.pdf", date: "8 Jun 2025" },
];

const baseSeller = {
    handle: "seller",
    phone: "+234 803 456 7890",
    businessType: "Registered Business (LLC)",
    paymentMethod: "MTN Money",
    accountMasked: "****6789",
    featuredOnHomepage: false,
    totalOrders: 23,
    returns: 1,
    rating: 4.7,
    responseRate: 98,
    kycDocuments: DEFAULT_KYC_DOCS,
    recentPayouts: DEFAULT_PAYOUTS,
    verificationDocuments: DEFAULT_VERIFICATION_DOCS,
    verificationSubmittedAt: "8 Jun 2025, 10:24",
};

const INITIAL_SELLERS: SellerData[] = [
    { id: 1, sellerId: "SL-0001", name: "AfroBeatsNG",   email: "Info@Afrobeatsng.Com", avatar: AVATAR, business: "Clothing & Merch", kycStatus: "Pending", products: 10, amountUGX: 18420, joined: "2 Mar 2025", verificationRequest: "Pending", status: "Suspended", ...baseSeller },
    { id: 2, sellerId: "SL-0001", name: "LagosThreads",  email: "Hello@Lagosthreads.Ng", avatar: AVATAR, business: "Fashion", kycStatus: "Complete", products: 8, amountUGX: 11200, joined: "2 Mar 2025", verificationRequest: "Complete", status: "Active", ...baseSeller },
    { id: 3, sellerId: "SL-0001", name: "AbujaVibes",    email: "Abujavibes@Mail.Com", avatar: AVATAR, business: "Clothing & Merch", kycStatus: "Complete", products: 5, amountUGX: 22200, joined: "2 Mar 2025", verificationRequest: "Pending", status: "Pending", ...baseSeller },
    { id: 4, sellerId: "SL-0001", name: "Adekunle Gold", email: "Afropop", avatar: AVATAR, business: "Clothing & Merch", kycStatus: "Complete", products: 4, amountUGX: 8000, joined: "2 Mar 2025", verificationRequest: "Complete", status: "Rejected", ...baseSeller },
    { id: 5, sellerId: "SL-0001", name: "Adekunle Gold", email: "Afropop", avatar: AVATAR, business: "Clothing & Merch", kycStatus: "Complete", products: 4, amountUGX: 22200, joined: "2 Mar 2025", verificationRequest: "Complete", status: "Active", ...baseSeller },
    { id: 6, sellerId: "SL-0001", name: "Adekunle Gold", email: "Afropop", avatar: AVATAR, business: "Clothing & Merch", kycStatus: "Complete", products: 4, amountUGX: 8000, joined: "2 Mar 2025", verificationRequest: "Complete", status: "Active", ...baseSeller },
    { id: 7, sellerId: "SL-0001", name: "Adekunle Gold", email: "Afropop", avatar: AVATAR, business: "Clothing & Merch", kycStatus: "Complete", products: 4, amountUGX: 22200, joined: "2 Mar 2025", verificationRequest: "Complete", status: "Active", ...baseSeller },
    { id: 8, sellerId: "SL-0001", name: "Adekunle Gold", email: "Afropop", avatar: AVATAR, business: "Clothing & Merch", kycStatus: "Complete", products: 4, amountUGX: 8000, joined: "2 Mar 2025", verificationRequest: "Complete", status: "Active", ...baseSeller },
];

const PAGE_SIZE = 8;

type BusinessFilterType = "All" | string;

export function SellerTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [sellers, setSellers] = useState<SellerData[]>(INITIAL_SELLERS);

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"All" | SellerStatus>("All");
    const [businessFilter, setBusinessFilter] = useState<BusinessFilterType>("All");
    const [filterOpen, setFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    const [profileTarget, setProfileTarget] = useState<SellerData | null>(null);
    const [suspendTarget, setSuspendTarget] = useState<SellerData | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setFilterOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const statusOptions = useMemo(() => {
        const unique = Array.from(new Set(sellers.map((s) => s.status)));
        return ["All", ...unique] as const;
    }, [sellers]);

    const businessOptions = useMemo(() => {
        const unique = Array.from(new Set(sellers.map((s) => s.business)));
        return ["All", ...unique] as const;
    }, [sellers]);

    const filteredSellers = useMemo(() => {
        return sellers.filter((s) => {
            const q = searchQuery.toLowerCase();
            const matchesSearch =
                s.name.toLowerCase().includes(q) ||
                s.sellerId.toLowerCase().includes(q) ||
                s.email.toLowerCase().includes(q);

            const matchesStatus = statusFilter === "All" || s.status === statusFilter;
            const matchesBusiness = businessFilter === "All" || s.business === businessFilter;

            return matchesSearch && matchesStatus && matchesBusiness;
        });
    }, [sellers, searchQuery, statusFilter, businessFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredSellers.length / PAGE_SIZE));
    const paginatedSellers = filteredSellers.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    // Called from Approve button (profile modal footer AND verification review modal)
    const handleApprove = (id: number) => {
        setSellers((prev) =>
            prev.map((s) =>
                s.id === id ? { ...s, verificationRequest: "Complete", status: "Active" } : s
            )
        );
        setProfileTarget(null);
    };

    // Called from Reject button (profile modal footer AND verification review modal)
    const handleReject = (id: number) => {
        setSellers((prev) =>
            prev.map((s) =>
                s.id === id ? { ...s, verificationRequest: "Complete", status: "Rejected" } : s
            )
        );
        setProfileTarget(null);
    };

    const handleMessage = (id: number) => {
        console.log(`Message seller ${id}`);
    };

    const handleToggleFeatured = (id: number, value: boolean) => {
        setSellers((prev) => prev.map((s) => (s.id === id ? { ...s, featuredOnHomepage: value } : s)));
        // keep the open modal's target in sync so the toggle reflects immediately
        setProfileTarget((prev) => (prev && prev.id === id ? { ...prev, featuredOnHomepage: value } : prev));
    };

    const handleSuspendConfirm = (id: number) => {
        setSellers((prev) =>
            prev.map((s) => (s.id === id ? { ...s, status: "Suspended" } : s))
        );
        setSuspendTarget(null);
    };

    const statusBadgeClass = (status: SellerStatus) =>
        status === "Active"
            ? "bg-[#036B2C] text-white"
            : status === "Rejected"
                ? "bg-[#b84b42] text-white"
                : status === "Suspended"
                    ? "bg-[#655042] text-white"
                    : "bg-[#E6A400] text-white";

    const columns: Column<SellerData>[] = [
        { header: "Seller Id", key: "sellerId" },
        {
            header: "Seller Name",
            key: "name",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <img src={row.avatar} alt={row.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                        <p className="font-medium text-sm sm:text-base text-[#101828] leading-5 font-inter text-left">{row.name}</p>
                        <p className="text-xs text-gray-600 text-left">{row.email}</p>
                    </div>
                </div>
            ),
        },
        { header: "Business", key: "business" },
        {
            header: "KYC Status",
            key: "kycStatus",
            render: (row) => (
                <span className={row.kycStatus === "Complete" ? "text-[#05DF72] font-normal" : "text-[#E6A400] font-normal"}>
                    {row.kycStatus}
                </span>
            ),
        },
        { header: "Products", key: "products" },
        {
            header: "Amount",
            key: "amountUGX",
            render: (row) => <span>UGX {row.amountUGX.toLocaleString()}</span>,
        },
        { header: "Joined", key: "joined" },
        {
            header: "Status",
            key: "status",
            render: (row) => (
                <span
                    className={`inline-flex items-center justify-center w-24 mx-auto px-3 py-2 text-xs font-bold rounded-full ${statusBadgeClass(row.status)}`}
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
                    <button className="hover:text-black cursor-pointer" onClick={() => setProfileTarget(row)} aria-label={`View ${row.name}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15.58 11.9999C15.58 13.9799 13.98 15.5799 12 15.5799C10.02 15.5799 8.42004 13.9799 8.42004 11.9999C8.42004 10.0199 10.02 8.41992 12 8.41992C13.98 8.41992 15.58 10.0199 15.58 11.9999Z" stroke="#655042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.46997 3.71997 5.17997 5.79997 2.88997 9.39997C1.98997 10.81 1.98997 13.18 2.88997 14.59C5.17997 18.19 8.46997 20.27 12 20.27Z" stroke="#655042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button className="hover:text-[#b84b42] cursor-pointer" onClick={() => setSuspendTarget(row)} aria-label={`Suspend ${row.name}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="9" stroke="#b84b42" strokeWidth="1.5" />
                            <path d="M5.5 5.5L18.5 18.5" stroke="#b84b42" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
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
                        title="Seller Management"
                        description="Manage seller accounts, KYC verification, and store status"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#897766]" />
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3 7H6" stroke="#897766" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3 17H9" stroke="#897766" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18 17L21 17" stroke="#897766" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15 7L21 7" stroke="#897766" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z" stroke="#897766" strokeWidth="1.5" />
                                <path d="M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z" stroke="#897766" strokeWidth="1.5" />
                            </svg>
                            Filter
                        </button>

                        {filterOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-10">
                                <p className="text-xs font-semibold text-gray-400 mb-2">Status</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {statusOptions.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => {
                                                setStatusFilter(s);
                                                setCurrentPage(1);
                                            }}
                                            className={`px-3 py-1 rounded-full text-xs border ${statusFilter === s ? "bg-[#0a192f] text-white border-[#0a192f]" : "bg-white text-gray-500 border-gray-200"
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>

                                <p className="text-xs font-semibold text-gray-400 mb-2">Business</p>
                                <div className="flex flex-wrap gap-2">
                                    {businessOptions.map((b) => (
                                        <button
                                            key={b}
                                            onClick={() => {
                                                setBusinessFilter(b);
                                                setCurrentPage(1);
                                            }}
                                            className={`px-3 py-1 rounded-full text-xs border ${businessFilter === b ? "bg-[#0a192f] text-white border-[#0a192f]" : "bg-white text-gray-500 border-gray-200"
                                                }`}
                                        >
                                            {b}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
           <div className="my-6">
             <SellerCard/>
           </div>
            <GenericTable
                data={paginatedSellers}
                columns={columns}
                headerBgColor="bg-[#3C182F]"
                pagination={{
                    currentPage: currentPage,
                    totalPages: totalPages,
                    onPageChange: (page) => setCurrentPage(page),
                }}
            />

            <SellerProfileModal
                isOpen={!!profileTarget}
                seller={
                    profileTarget && ({
                        id: profileTarget.id,
                        name: profileTarget.name,
                        email: profileTarget.email,
                        avatar: profileTarget.avatar,
                        business: profileTarget.business,
                        status: profileTarget.status,
                        kycStatus: profileTarget.kycStatus === "Complete" ? "Verified" : "Pending",
                        productsListed: profileTarget.products,
                        totalSalesUGX: profileTarget.amountUGX,
                        joined: profileTarget.joined,
                        featuredOnHomepage: profileTarget.featuredOnHomepage,
                        totalOrders: profileTarget.totalOrders,
                        returns: profileTarget.returns,
                        rating: profileTarget.rating,
                        responseRate: profileTarget.responseRate,
                        kycDocuments: profileTarget.kycDocuments,
                        recentPayouts: profileTarget.recentPayouts,
                        verificationRequestStatus: profileTarget.verificationRequest,
                        verificationReview: {
                            kycId: profileTarget.sellerId,
                            submittedAt: profileTarget.verificationSubmittedAt,
                            name: profileTarget.name,
                            handle: profileTarget.handle,
                            email: profileTarget.email,
                            phone: profileTarget.phone,
                            business: profileTarget.business,
                            businessType: profileTarget.businessType,
                            paymentMethod: profileTarget.paymentMethod,
                            accountMasked: profileTarget.accountMasked,
                            documents: profileTarget.verificationDocuments,
                        },
                    } as SellerProfileData)
                }
                onClose={() => setProfileTarget(null)}
                onApprove={handleApprove}
                onReject={handleReject}
                onMessage={handleMessage}
                onToggleFeatured={handleToggleFeatured}
            />

            <SellerSuspendModal
                isOpen={!!suspendTarget}
                sellerName={suspendTarget?.name ?? ""}
                onClose={() => setSuspendTarget(null)}
                onConfirm={() => suspendTarget && handleSuspendConfirm(suspendTarget.id)}
            />
        </div>
    );
}