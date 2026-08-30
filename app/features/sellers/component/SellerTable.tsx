"use client";

import ActionButton from "@/app/components/common/button/ActionButton";
import CommonSelect from "@/app/components/common/button/CommonSelect";
import FilterPanel from "@/app/components/common/button/FilterPanel";
import StatusBadge from "@/app/components/common/button/StatusBadge";
import GenericTable, { Column } from "@/app/components/common/GenericTable";
import DashboardTopSection from "@/app/components/common/header/DashboardTopSection";
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
  recentPayouts: {
    date: string;
    amountUGX: number;
    status: "Paid" | "Pending";
  }[];
  verificationDocuments: { name: string; fileName: string; date: string }[];
  verificationSubmittedAt: string;
}

const AVATAR = "https://i.pravatar.cc/64?img=13";

const DEFAULT_KYC_DOCS = [
  { name: "Government ID (NIN/Int'l Passport)", linkLabel: "View/Download" },
  { name: "CAC Certificate", linkLabel: "View/Download" },
  { name: "Bank Statement (3 months)", linkLabel: "View/Download" },
];

const DEFAULT_PAYOUTS: {
  date: string;
  amountUGX: number;
  status: "Paid" | "Pending";
}[] = [
  { date: "10 Jun 2025", amountUGX: 820000, status: "Paid" },
  { date: "10 Jun 2025", amountUGX: 820000, status: "Paid" },
  { date: "10 Jun 2025", amountUGX: 820000, status: "Paid" },
];

const DEFAULT_VERIFICATION_DOCS = [
  {
    name: "Business Licence",
    fileName: "business_Licence.pdf",
    date: "8 Jun 2025",
  },
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
  {
    id: 1,
    sellerId: "SL-0001",
    name: "AfroBeatsNG",
    email: "Info@Afrobeatsng.Com",
    avatar: AVATAR,
    business: "Clothing & Merch",
    kycStatus: "Pending",
    products: 10,
    amountUGX: 18420,
    joined: "2 Mar 2025",
    verificationRequest: "Pending",
    status: "Suspended",
    ...baseSeller,
  },
  {
    id: 2,
    sellerId: "SL-0001",
    name: "LagosThreads",
    email: "Hello@Lagosthreads.Ng",
    avatar: AVATAR,
    business: "Fashion",
    kycStatus: "Complete",
    products: 8,
    amountUGX: 11200,
    joined: "2 Mar 2025",
    verificationRequest: "Complete",
    status: "Active",
    ...baseSeller,
  },
  {
    id: 3,
    sellerId: "SL-0001",
    name: "AbujaVibes",
    email: "Abujavibes@Mail.Com",
    avatar: AVATAR,
    business: "Clothing & Merch",
    kycStatus: "Complete",
    products: 5,
    amountUGX: 22200,
    joined: "2 Mar 2025",
    verificationRequest: "Pending",
    status: "Pending",
    ...baseSeller,
  },
  {
    id: 4,
    sellerId: "SL-0001",
    name: "Adekunle Gold",
    email: "Afropop",
    avatar: AVATAR,
    business: "Clothing & Merch",
    kycStatus: "Complete",
    products: 4,
    amountUGX: 8000,
    joined: "2 Mar 2025",
    verificationRequest: "Complete",
    status: "Rejected",
    ...baseSeller,
  },
  {
    id: 5,
    sellerId: "SL-0001",
    name: "Adekunle Gold",
    email: "Afropop",
    avatar: AVATAR,
    business: "Clothing & Merch",
    kycStatus: "Complete",
    products: 4,
    amountUGX: 22200,
    joined: "2 Mar 2025",
    verificationRequest: "Complete",
    status: "Active",
    ...baseSeller,
  },
  {
    id: 6,
    sellerId: "SL-0001",
    name: "Adekunle Gold",
    email: "Afropop",
    avatar: AVATAR,
    business: "Clothing & Merch",
    kycStatus: "Complete",
    products: 4,
    amountUGX: 8000,
    joined: "2 Mar 2025",
    verificationRequest: "Complete",
    status: "Active",
    ...baseSeller,
  },
  {
    id: 7,
    sellerId: "SL-0001",
    name: "Adekunle Gold",
    email: "Afropop",
    avatar: AVATAR,
    business: "Clothing & Merch",
    kycStatus: "Complete",
    products: 4,
    amountUGX: 22200,
    joined: "2 Mar 2025",
    verificationRequest: "Complete",
    status: "Active",
    ...baseSeller,
  },
  {
    id: 8,
    sellerId: "SL-0001",
    name: "Adekunle Gold",
    email: "Afropop",
    avatar: AVATAR,
    business: "Clothing & Merch",
    kycStatus: "Complete",
    products: 4,
    amountUGX: 8000,
    joined: "2 Mar 2025",
    verificationRequest: "Complete",
    status: "Active",
    ...baseSeller,
  },
];

const PAGE_SIZE = 8;

type BusinessFilterType = "All" | string;

export const SellerTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sellers, setSellers] = useState<SellerData[]>(INITIAL_SELLERS);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | SellerStatus>("All");
  const [businessFilter, setBusinessFilter] =
    useState<BusinessFilterType>("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const [profileTarget, setProfileTarget] = useState<SellerData | null>(null);
  const [suspendTarget, setSuspendTarget] = useState<SellerData | null>(null);

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
      const matchesBusiness =
        businessFilter === "All" || s.business === businessFilter;

      return matchesSearch && matchesStatus && matchesBusiness;
    });
  }, [sellers, searchQuery, statusFilter, businessFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredSellers.length / PAGE_SIZE));
  const paginatedSellers = filteredSellers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // Called from Approve button (profile modal footer AND verification review modal)
  const handleApprove = (id: number) => {
    setSellers((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, verificationRequest: "Complete", status: "Active" }
          : s,
      ),
    );
    setProfileTarget(null);
  };

  // Called from Reject button (profile modal footer AND verification review modal)
  const handleReject = (id: number) => {
    setSellers((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, verificationRequest: "Complete", status: "Rejected" }
          : s,
      ),
    );
    setProfileTarget(null);
  };

  const handleMessage = (id: number) => {
    console.log(`Message seller ${id}`);
  };

  const handleToggleFeatured = (id: number, value: boolean) => {
    setSellers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, featuredOnHomepage: value } : s)),
    );
    // keep the open modal's target in sync so the toggle reflects immediately
    setProfileTarget((prev) =>
      prev && prev.id === id ? { ...prev, featuredOnHomepage: value } : prev,
    );
  };

  const handleSuspendConfirm = (id: number, _reason: string) => {
    setSellers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Suspended" } : s)),
    );
    setSuspendTarget(null);
  };

  const columns: Column<SellerData>[] = [
    { header: "Seller Id", key: "sellerId" },
    {
      header: "Seller Name",
      key: "name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar}
            alt={row.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-sm sm:text-base text-[#101828] leading-5 font-inter text-left">
              {row.name}
            </p>
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
        <span
          className={
            row.kycStatus === "Complete"
              ? "text-[#05DF72] font-normal"
              : "text-yellow font-normal"
          }
        >
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
        <StatusBadge
          status={row.status}
          className="w-24 mx-auto justify-center"
        />
      ),
    },
    {
      header: "Action",
      key: "action",
      className: "text-center",
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          <ActionButton type="view" onClick={() => setProfileTarget(row)} />
          <ActionButton type="suspend" onClick={() => setSuspendTarget(row)} />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="">
        <DashboardTopSection
          title="Seller Management"
          description="Manage seller accounts, KYC verification, and store status"
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
                  item={statusOptions.map((status) => ({
                    label: status === "All" ? "All Status" : status,
                    value: status,
                  }))}
                  placeholder="All Status"
                  onValueChange={(value) => {
                    setStatusFilter(value);
                    setCurrentPage(1);
                  }}
                />
                <CommonSelect
                  fullWidth
                  value={businessFilter}
                  item={businessOptions.map((business) => ({
                    label: business === "All" ? "All Business" : business,
                    value: business,
                  }))}
                  placeholder="All Business"
                  onValueChange={(value) => {
                    setBusinessFilter(value);
                    setCurrentPage(1);
                  }}
                />
              </FilterPanel>
            ) : null
          }
        />
      </div>
      <div className="">
        <SellerCard />
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
          profileTarget &&
          ({
            id: profileTarget.id,
            name: profileTarget.name,
            email: profileTarget.email,
            avatar: profileTarget.avatar,
            business: profileTarget.business,
            status: profileTarget.status,
            kycStatus:
              profileTarget.kycStatus === "Complete" ? "Verified" : "Pending",
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
        onConfirm={(reason) =>
          suspendTarget && handleSuspendConfirm(suspendTarget.id, reason)
        }
      />
    </div>
  );
};
