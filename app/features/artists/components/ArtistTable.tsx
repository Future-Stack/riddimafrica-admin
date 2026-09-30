"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import ActionButton from "@/app/components/common/button/ActionButton";
import CommonSelect from "@/app/components/common/button/CommonSelect";
import FilterPanel from "@/app/components/common/button/FilterPanel";
import StatusBadge from "@/app/components/common/button/StatusBadge";
import GenericTable, { Column } from "@/app/components/common/GenericTable";
import DashboardTopSection from "@/app/components/common/header/DashboardTopSection";
import ArtistCard from "./ArtistCard";
import {
  ArtistMerchData,
  ArtistMerchModal,
  MerchProduct,
} from "./ArtistMerchModal";
import {
  ArtistPerformanceData,
  ArtistPerformanceModal,
  MonthlyUnits,
} from "./ArtistPerformanceModal";
import { ArtistProfileData, ArtistProfileModal } from "./ArtistProfileModal";

type VerificationStatus = "Pending" | "Approved" | "Rejected";
type KycStatus = "Pending" | "Complete";

interface ArtistData {
  id: number;
  name: string;
  stageName: string;
  genre: string;
  avatar: string;
  kycStatus: KycStatus;
  merchItemsCount: number;
  amountUGX: number;
  verificationRequest: KycStatus;
  status: VerificationStatus;
  followers: string;
  bio: string;
  totalSalesUGX: number;
  merchandiseItems: string[];
  products: MerchProduct[];
  monthlyUnits: MonthlyUnits[];
}

const AVATAR = "https://i.pravatar.cc/64?img=13";

const SAMPLE_PRODUCTS: MerchProduct[] = [
  {
    id: 1,
    name: "Artist Tee",
    category: "Apparel",
    priceUGX: 9800,
    stock: 50,
    sold: 40,
    status: "Live",
  },
  {
    id: 2,
    name: "Poster",
    category: "Apparel",
    priceUGX: 9800,
    stock: 50,
    sold: 40,
    status: "Live",
  },
  {
    id: 3,
    name: "T-Shirt",
    category: "Apparel",
    priceUGX: 9800,
    stock: 50,
    sold: 40,
    status: "Live",
  },
];

const SAMPLE_MONTHLY: MonthlyUnits[] = [
  { month: "Jan", units: 50 },
  { month: "Feb", units: 68 },
  { month: "Mar", units: 45 },
  { month: "Apr", units: 72 },
  { month: "May", units: 58 },
  { month: "Jun", units: 57 },
];

const INITIAL_ARTISTS: ArtistData[] = [
  {
    id: 1,
    name: "Adekunle Gold",
    stageName: "AG Baby",
    genre: "Afropop",
    avatar: AVATAR,
    kycStatus: "Pending",
    merchItemsCount: 10,
    amountUGX: 18420,
    verificationRequest: "Pending",
    status: "Pending",
    followers: "2.1M",
    bio: "Soulful singer known for romantic Afropop anthems.",
    totalSalesUGX: 0,
    merchandiseItems: ["Limited Hoodie", "Tour Poster", "Vinyl LP"],
    products: SAMPLE_PRODUCTS,
    monthlyUnits: SAMPLE_MONTHLY,
  },
  {
    id: 2,
    name: "Adekunle Gold",
    stageName: "AG Baby",
    genre: "Afropop",
    avatar: AVATAR,
    kycStatus: "Complete",
    merchItemsCount: 8,
    amountUGX: 11200,
    verificationRequest: "Pending",
    status: "Approved",
    followers: "2.1M",
    bio: "Soulful singer known for romantic Afropop anthems.",
    totalSalesUGX: 0,
    merchandiseItems: ["Limited Hoodie", "Tour Poster", "Vinyl LP"],
    products: SAMPLE_PRODUCTS,
    monthlyUnits: SAMPLE_MONTHLY,
  },
  {
    id: 3,
    name: "Adekunle Gold",
    stageName: "AG Baby",
    genre: "Afropop",
    avatar: AVATAR,
    kycStatus: "Complete",
    merchItemsCount: 5,
    amountUGX: 22200,
    verificationRequest: "Pending",
    status: "Approved",
    followers: "2.1M",
    bio: "Soulful singer known for romantic Afropop anthems.",
    totalSalesUGX: 0,
    merchandiseItems: ["Limited Hoodie", "Tour Poster", "Vinyl LP"],
    products: SAMPLE_PRODUCTS,
    monthlyUnits: SAMPLE_MONTHLY,
  },
  {
    id: 4,
    name: "Adekunle Gold",
    stageName: "AG Baby",
    genre: "Afropop",
    avatar: AVATAR,
    kycStatus: "Complete",
    merchItemsCount: 4,
    amountUGX: 8000,
    verificationRequest: "Pending",
    status: "Approved",
    followers: "2.1M",
    bio: "Soulful singer known for romantic Afropop anthems.",
    totalSalesUGX: 0,
    merchandiseItems: ["Limited Hoodie", "Tour Poster", "Vinyl LP"],
    products: SAMPLE_PRODUCTS,
    monthlyUnits: SAMPLE_MONTHLY,
  },
  {
    id: 5,
    name: "Adekunle Gold",
    stageName: "AG Baby",
    genre: "Afropop",
    avatar: AVATAR,
    kycStatus: "Complete",
    merchItemsCount: 4,
    amountUGX: 22200,
    verificationRequest: "Pending",
    status: "Approved",
    followers: "2.1M",
    bio: "Soulful singer known for romantic Afropop anthems.",
    totalSalesUGX: 0,
    merchandiseItems: ["Limited Hoodie", "Tour Poster", "Vinyl LP"],
    products: SAMPLE_PRODUCTS,
    monthlyUnits: SAMPLE_MONTHLY,
  },
  {
    id: 6,
    name: "Adekunle Gold",
    stageName: "AG Baby",
    genre: "Afropop",
    avatar: AVATAR,
    kycStatus: "Complete",
    merchItemsCount: 4,
    amountUGX: 8000,
    verificationRequest: "Complete",
    status: "Approved",
    followers: "2.1M",
    bio: "Soulful singer known for romantic Afropop anthems.",
    totalSalesUGX: 0,
    merchandiseItems: ["Limited Hoodie", "Tour Poster", "Vinyl LP"],
    products: SAMPLE_PRODUCTS,
    monthlyUnits: SAMPLE_MONTHLY,
  },
  {
    id: 7,
    name: "Adekunle Gold",
    stageName: "AG Baby",
    genre: "Afropop",
    avatar: AVATAR,
    kycStatus: "Complete",
    merchItemsCount: 4,
    amountUGX: 22200,
    verificationRequest: "Complete",
    status: "Approved",
    followers: "2.1M",
    bio: "Soulful singer known for romantic Afropop anthems.",
    totalSalesUGX: 0,
    merchandiseItems: ["Limited Hoodie", "Tour Poster", "Vinyl LP"],
    products: SAMPLE_PRODUCTS,
    monthlyUnits: SAMPLE_MONTHLY,
  },
  {
    id: 8,
    name: "Adekunle Gold",
    stageName: "AG Baby",
    genre: "Afropop",
    avatar: AVATAR,
    kycStatus: "Complete",
    merchItemsCount: 4,
    amountUGX: 8000,
    verificationRequest: "Complete",
    status: "Approved",
    followers: "2.1M",
    bio: "Soulful singer known for romantic Afropop anthems.",
    totalSalesUGX: 0,
    merchandiseItems: ["Limited Hoodie", "Tour Poster", "Vinyl LP"],
    products: SAMPLE_PRODUCTS,
    monthlyUnits: SAMPLE_MONTHLY,
  },
];

const PAGE_SIZE = 8;
const LOW_REVENUE_CEILING = 15000;

type SalesFilterType = "All" | "High Revenue" | "Low Revenue" | "No Sales";

export const ArtistTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [artists, setArtists] = useState<ArtistData[]>(INITIAL_ARTISTS);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | VerificationStatus>(
    "All",
  );
  const [salesFilter, setSalesFilter] = useState<SalesFilterType>("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const [profileTarget, setProfileTarget] = useState<ArtistData | null>(null);
  const [merchTarget, setMerchTarget] = useState<ArtistData | null>(null);
  const [performanceTarget, setPerformanceTarget] = useState<ArtistData | null>(
    null,
  );

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
    const unique = Array.from(new Set(artists.map((a) => a.status)));
    return ["All", ...unique] as const;
  }, [artists]);

  const filteredArtists = useMemo(() => {
    return artists.filter((a) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        a.name.toLowerCase().includes(q) ||
        a.stageName.toLowerCase().includes(q);

      const matchesStatus = statusFilter === "All" || a.status === statusFilter;

      const matchesSales =
        salesFilter === "All" ||
        (salesFilter === "No Sales"
          ? a.amountUGX === 0
          : salesFilter === "Low Revenue"
            ? a.amountUGX > 0 && a.amountUGX < LOW_REVENUE_CEILING
            : a.amountUGX >= LOW_REVENUE_CEILING);

      return matchesSearch && matchesStatus && matchesSales;
    });
  }, [artists, searchQuery, statusFilter, salesFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredArtists.length / PAGE_SIZE));
  const paginatedArtists = filteredArtists.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleApprove = (id: number) => {
    setArtists((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Approved" } : a)),
    );
    setProfileTarget(null);
  };

  const handleReject = (id: number) => {
    setArtists((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Rejected" } : a)),
    );
    setProfileTarget(null);
  };

  const handleMessage = (id: number) => {
    console.log(`Message artist ${id}`);
  };

  const columns: Column<ArtistData>[] = [
    {
      header: "User",
      key: "name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar}
            alt={row.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-sm sm:text-base text-[#101828] leading-5 font-inter">
              {row.name}
            </p>
            <p className="text-xs text-gray-600 text-left">{row.genre}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Stage Name",
      key: "stageName",
      render: (row) => (
        <span className="text-yellow font-normal">{row.stageName}</span>
      ),
    },
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
    { header: "Merch Items", key: "merchItemsCount" },
    {
      header: "Amount",
      key: "amountUGX",
      render: (row) => <span>UGX {row.amountUGX.toLocaleString()}</span>,
    },
    {
      header: "Verification request",
      key: "verificationRequest",
      render: (row) => (
        <span
          className={
            row.verificationRequest === "Complete"
              ? "text-[#05DF72] font-normal"
              : "text-yellow font-normal"
          }
        >
          {row.verificationRequest}
        </span>
      ),
    },
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
          <ActionButton type="merch" onClick={() => setMerchTarget(row)} />
          <ActionButton
            type="performance"
            onClick={() => setPerformanceTarget(row)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="">
        <DashboardTopSection
          title="Artist Management"
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
                  value={salesFilter}
                  item={
                    [
                      { label: "All Sales", value: "All" },
                      { label: "High Revenue", value: "High Revenue" },
                      { label: "Low Revenue", value: "Low Revenue" },
                      { label: "No Sales", value: "No Sales" },
                    ] as const
                  }
                  placeholder="All Sales"
                  onValueChange={(value) => {
                    setSalesFilter(value);
                    setCurrentPage(1);
                  }}
                />
              </FilterPanel>
            ) : null
          }
        />
      </div>

      <div className="">
        <ArtistCard />
      </div>

      <GenericTable
        data={paginatedArtists}
        columns={columns}
        headerBgColor="bg-[#3C182F]"
        pagination={{
          currentPage: currentPage,
          totalPages: totalPages,
          onPageChange: (page) => setCurrentPage(page),
        }}
      />

      <ArtistProfileModal
        isOpen={!!profileTarget}
        artist={
          profileTarget &&
          ({
            id: profileTarget.id,
            name: profileTarget.name,
            stageName: profileTarget.stageName,
            genre: profileTarget.genre,
            avatar: profileTarget.avatar,
            followers: profileTarget.followers,
            bio: profileTarget.bio,
            authorizedAsPresenter: false,
            featuredOnHomepage: false,
            verificationStatus: profileTarget.status,
            merchItemsCount: profileTarget.merchItemsCount,
            totalSalesUGX: profileTarget.totalSalesUGX,
            kycStatus: profileTarget.kycStatus,
            approveRequestStatus: profileTarget.status,
            merchandiseItems: profileTarget.merchandiseItems,
          } as ArtistProfileData)
        }
        onClose={() => setProfileTarget(null)}
        onApprove={handleApprove}
        onReject={handleReject}
        onMessage={handleMessage}
      />

      <ArtistMerchModal
        isOpen={!!merchTarget}
        artist={
          merchTarget &&
          ({
            id: merchTarget.id,
            name: merchTarget.name,
            stageName: merchTarget.stageName,
            products: merchTarget.products,
          } as ArtistMerchData)
        }
        onClose={() => setMerchTarget(null)}
      />

      <ArtistPerformanceModal
        isOpen={!!performanceTarget}
        artist={
          performanceTarget &&
          ({
            id: performanceTarget.id,
            name: performanceTarget.name,
            stageName: performanceTarget.stageName,
            genre: performanceTarget.genre,
            totalSalesUGX: performanceTarget.totalSalesUGX,
            followers: performanceTarget.followers,
            merchItemsCount: performanceTarget.merchItemsCount,
            unitsLast6mo: performanceTarget.monthlyUnits.reduce(
              (sum, m) => sum + m.units,
              0,
            ),
            kycStatus: performanceTarget.kycStatus,
            approvalStatus: performanceTarget.status,
            monthlyUnits: performanceTarget.monthlyUnits,
          } as ArtistPerformanceData)
        }
        onClose={() => setPerformanceTarget(null)}
      />
    </div>
  );
};
