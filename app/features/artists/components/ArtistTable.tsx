"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Search } from "lucide-react";

import GenericTable, { Column } from "@/app/components/common/GenericTable";
import PageHeader from "@/app/components/common/PageHeader";
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

export function ArtistTable() {
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
        <span className="text-[#E6A400] font-normal">{row.stageName}</span>
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
              : "text-[#E6A400] font-normal"
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
              : "text-[#E6A400] font-normal"
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
        <span
          className={`inline-flex items-center justify-center w-24 mx-auto px-3 py-2 text-xs font-bold rounded-full ${
            row.status === "Approved"
              ? "bg-[#036B2C] text-white"
              : row.status === "Rejected"
                ? "bg-[#b84b42] text-white"
                : "bg-[#E6A400] text-white"
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
            onClick={() => setProfileTarget(row)}
            aria-label={`View ${row.name}`}
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
                stroke="#655042"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.46997 3.71997 5.17997 5.79997 2.88997 9.39997C1.98997 10.81 1.98997 13.18 2.88997 14.59C5.17997 18.19 8.46997 20.27 12 20.27Z"
                stroke="#655042"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            className="hover:text-[#C9A96C] cursor-pointer"
            onClick={() => setMerchTarget(row)}
            aria-label={`Merch for ${row.name}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15 4L12 6L9 4C8.41425 4.50941 7.07071 5.29343 7.00348 6.14565C6.97434 6.51512 7.12883 6.71716 7.43782 7.12122C8.11164 8.00239 8.87991 8.52009 8.87991 10H15.1201C15.1201 8.52009 15.8884 8.00239 16.5622 7.12122C16.8712 6.71716 17.0257 6.51512 16.9965 6.14565C16.9293 5.29343 15.5858 4.50941 15 4Z"
                stroke="#E5B54F"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.8632 17.8082C19.1589 15.1179 17.3658 12.6502 16.1811 11.2368C15.3314 10.2231 14.7041 10 13.3704 10H10.6296C9.29591 10 8.66864 10.2231 7.81893 11.2368C6.63423 12.6502 4.8411 15.1179 4.13677 17.8082C3.70683 19.4504 4.29064 20.3493 5.88646 20.9301C7.32124 21.4523 9.43708 22 12 22C14.5629 22 16.6788 21.4523 18.1135 20.9301C19.7094 20.3493 20.2932 19.4504 19.8632 17.8082Z"
                stroke="#E5B54F"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 4V2"
                stroke="#E5B54F"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15 4V2"
                stroke="#E5B54F"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 15C14 15 16 18 16 21.5M10 15C10 15 8 18 8 21.5"
                stroke="#E5B54F"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            className="hover:text-[#0b663b] cursor-pointer"
            onClick={() => setPerformanceTarget(row)}
            aria-label={`Performance for ${row.name}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 21H10C6.70017 21 5.05025 21 4.02513 19.9749C3 18.9497 3 17.2998 3 14V3"
                stroke="#3BB515"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M7.99707 16.999C11.5286 16.999 18.9122 15.5348 18.6979 6.43269M16.4886 8.04302L18.3721 6.14612C18.5656 5.95127 18.8798 5.94981 19.0751 6.14286L20.9971 8.04302"
                stroke="#3BB515"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
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
            title="Artist Management"
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
                  {statusOptions.map((s) => (
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
                      {s}
                    </button>
                  ))}
                </div>

                <p className="text-xs font-semibold text-gray-400 mb-2">
                  Sales
                </p>
                <div className="flex flex-wrap gap-2">
                  {(
                    ["All", "High Revenue", "Low Revenue", "No Sales"] as const
                  ).map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSalesFilter(s);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1 rounded-full text-xs border ${
                        salesFilter === s
                          ? "bg-[#0a192f] text-white border-[#0a192f]"
                          : "bg-white text-gray-500 border-gray-200"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="my-6">
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
}
