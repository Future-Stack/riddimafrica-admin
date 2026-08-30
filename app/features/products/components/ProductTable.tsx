"use client";

import ActionButton from "@/app/components/common/button/ActionButton";
import CommonSelect from "@/app/components/common/button/CommonSelect";
import FilterPanel from "@/app/components/common/button/FilterPanel";
import StatusBadge from "@/app/components/common/button/StatusBadge";
import GenericTable, { Column } from "@/app/components/common/GenericTable";
import DashboardTopSection from "@/app/components/common/header/DashboardTopSection";
import { Eye, MoreVertical, Star } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AddProductModal, NewProductPayload } from "./AddproductModal";
import { CategoryTab } from "./CategoryTab";
import { CollectionTab } from "./CollectionTab";
import {
  ProductInspectionState,
  ProductReviewData,
  ProductReviewModal,
  ProductVariantRow,
} from "./ProductReviewModal";
import {
  ProductReviewItem,
  UserReviewsData,
  UserReviewsModal,
} from "./UserReviewsModal";

type ProductStatus =
  | "Pending Inspection"
  | "Review"
  | "Rejected"
  | "Published"
  | "Scheduled"
  | "On-Hold";

interface ProductData {
  id: number;
  productId: string;
  productName: string;
  submittedByName: string;
  submittedByRole: "Artist" | "Seller";
  submittedByAvatar: string;
  category: string;
  sampleImages: string[];
  amountUGX: number;
  date: string;
  dateISO: string;
  status: ProductStatus;
  description: string;
  listedPriceUGX: number;
  inspection: ProductInspectionState;
  inspectionSchedule?: { label: string; location: string };
  variants: ProductVariantRow[];
  reviews: ProductReviewItem[];
}

const AVATAR = "https://i.pravatar.cc/64?img=13";
const SAMPLE_IMG = "https://i.pravatar.cc/64?img=5";

const baseVariants: ProductVariantRow[] = [
  { colour: "Red", variant: "M", stock: 50, finalPriceUGX: 18500 },
  { colour: "Red", variant: "M", stock: 50, finalPriceUGX: 18500 },
];

const baseInspection: ProductInspectionState = {
  qualityCheck: false,
  authenticityVerified: false,
  noDefectsFound: false,
  sizeSpecsAccurate: false,
};

const REVIEWER_AVATAR = "https://i.pravatar.cc/64?img=32";

const sampleReviews: ProductReviewItem[] = [
  {
    id: 1,
    name: "Tunde Fashola",
    handle: "tunde_lg",
    avatar: REVIEWER_AVATAR,
    rating: 5,
    date: "18 Jun 2025",
    title: "ABSOLUTELY FIRE 🔥",
    body: "Got the Teni hoodie and I'm obsessed. Quality is top-notch, fits perfectly. The embroidery is clean. Will definitely buy again from Riddim Africa!",
  },
  {
    id: 2,
    name: "Amaka Obi",
    handle: "amaka.o",
    avatar: REVIEWER_AVATAR,
    rating: 4,
    date: "16 Jun 2025",
    title: "Great fit, fast delivery",
    body: "Really happy with this — sizing was accurate and it arrived earlier than expected.",
  },
  {
    id: 3,
    name: "Femi Adio",
    handle: "femi_a",
    avatar: REVIEWER_AVATAR,
    rating: 3,
    date: "12 Jun 2025",
    title: "Good but pricey",
    body: "Nice quality overall, just wish it was a bit cheaper for what you get.",
  },
];

const emptyReviews: ProductReviewItem[] = [];

const INITIAL_PRODUCTS: ProductData[] = [
  {
    id: 1,
    productId: "SP-0001",
    productName: "Teni Limited Hoodie",
    submittedByName: "Teni",
    submittedByRole: "Artist",
    submittedByAvatar: AVATAR,
    category: "Apparel",
    sampleImages: [SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG],
    amountUGX: 18420,
    date: "2 Mar 2025",
    dateISO: "2025-03-02",
    status: "Pending Inspection",
    description:
      "Limited edition apparel merchandise from Teni. Artist-approved and authentic.",
    listedPriceUGX: 18500,
    inspection: baseInspection,
    inspectionSchedule: {
      label: "Wed 17 Jun · 09:00",
      location: "Riddim Africa HQ",
    },
    variants: baseVariants,
    reviews: emptyReviews,
  },
  {
    id: 2,
    productId: "SP-0001",
    productName: "Teni Limited Hoodie",
    submittedByName: "AfroBeatsNG",
    submittedByRole: "Seller",
    submittedByAvatar: AVATAR,
    category: "Accessories",
    sampleImages: [SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG],
    amountUGX: 11200,
    date: "2 Mar 2025",
    dateISO: "2025-03-02",
    status: "Review",
    description:
      "Limited edition apparel merchandise. Seller-listed and pending review.",
    listedPriceUGX: 11200,
    inspection: baseInspection,
    variants: baseVariants,
    reviews: emptyReviews,
  },
  {
    id: 3,
    productId: "SP-0001",
    productName: "Teni Limited Hoodie",
    submittedByName: "AfroBeatsNG",
    submittedByRole: "Seller",
    submittedByAvatar: AVATAR,
    category: "Prints",
    sampleImages: [SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG],
    amountUGX: 22200,
    date: "2 Mar 2025",
    dateISO: "2025-03-02",
    status: "Rejected",
    description: "Limited edition print merchandise.",
    listedPriceUGX: 22200,
    inspection: baseInspection,
    variants: baseVariants,
    reviews: emptyReviews,
  },
  {
    id: 4,
    productId: "SP-0001",
    productName: "Teni Limited Hoodie",
    submittedByName: "AfroBeatsNG",
    submittedByRole: "Seller",
    submittedByAvatar: AVATAR,
    category: "T-shirt",
    sampleImages: [SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG],
    amountUGX: 8000,
    date: "2 Mar 2025",
    dateISO: "2025-03-02",
    status: "Published",
    description: "Limited edition t-shirt merchandise.",
    listedPriceUGX: 8000,
    inspection: {
      qualityCheck: true,
      authenticityVerified: true,
      noDefectsFound: true,
      sizeSpecsAccurate: true,
    },
    variants: baseVariants,
    reviews: sampleReviews,
  },
  {
    id: 5,
    productId: "SP-0001",
    productName: "Teni Limited Hoodie",
    submittedByName: "AfroBeatsNG",
    submittedByRole: "Seller",
    submittedByAvatar: AVATAR,
    category: "Accessories",
    sampleImages: [SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG],
    amountUGX: 22200,
    date: "2 Mar 2025",
    dateISO: "2025-03-02",
    status: "Published",
    description: "Limited edition accessory merchandise.",
    listedPriceUGX: 22200,
    inspection: {
      qualityCheck: true,
      authenticityVerified: true,
      noDefectsFound: true,
      sizeSpecsAccurate: true,
    },
    inspectionSchedule: {
      label: "Fri 19 Jun · 11:00",
      location: "Riddim Africa HQ",
    },
    variants: baseVariants,
    reviews: sampleReviews,
  },
  {
    id: 6,
    productId: "SP-0001",
    productName: "Teni Limited Hoodie",
    submittedByName: "AfroBeatsNG",
    submittedByRole: "Seller",
    submittedByAvatar: AVATAR,
    category: "Accessories",
    sampleImages: [SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG],
    amountUGX: 8000,
    date: "2 Mar 2025",
    dateISO: "2025-03-02",
    status: "Published",
    description: "Limited edition accessory merchandise.",
    listedPriceUGX: 8000,
    inspection: {
      qualityCheck: true,
      authenticityVerified: true,
      noDefectsFound: true,
      sizeSpecsAccurate: true,
    },
    variants: baseVariants,
    reviews: emptyReviews,
  },
  {
    id: 7,
    productId: "SP-0001",
    productName: "Teni Limited Hoodie",
    submittedByName: "AfroBeatsNG",
    submittedByRole: "Seller",
    submittedByAvatar: AVATAR,
    category: "Apparel",
    sampleImages: [SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG],
    amountUGX: 22200,
    date: "2 Mar 2025",
    dateISO: "2025-03-02",
    status: "Published",
    description: "Limited edition apparel merchandise.",
    listedPriceUGX: 22200,
    inspection: {
      qualityCheck: true,
      authenticityVerified: true,
      noDefectsFound: true,
      sizeSpecsAccurate: true,
    },
    variants: baseVariants,
    reviews: emptyReviews,
  },
  {
    id: 8,
    productId: "SP-0001",
    productName: "Teni Limited Hoodie",
    submittedByName: "AfroBeatsNG",
    submittedByRole: "Seller",
    submittedByAvatar: AVATAR,
    category: "Prints",
    sampleImages: [SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG],
    amountUGX: 8000,
    date: "2 Mar 2025",
    dateISO: "2025-03-02",
    status: "On-Hold",
    description: "Limited edition print merchandise.",
    listedPriceUGX: 8000,
    inspection: baseInspection,
    variants: baseVariants,
    reviews: emptyReviews,
  },
];

const PAGE_SIZE = 8;

type TabKey = "sample" | "published" | "category" | "collections";

const TABS: { key: TabKey; label: string }[] = [
  { key: "sample", label: "Sample Products" },
  { key: "published", label: "Published Products" },
  { key: "category", label: "Product Category" },
  { key: "collections", label: "Collections" },
];

export const ProductTable = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("sample");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<ProductData[]>(INITIAL_PRODUCTS);

  const [searchQuery, setSearchQuery] = useState("");
  const [sellerFilter, setSellerFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const [reviewTarget, setReviewTarget] = useState<ProductData | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [openActionMenuId, setOpenActionMenuId] = useState<number | null>(null);
  const [reviewsTarget, setReviewsTarget] = useState<ProductData | null>(null);

  useEffect(() => {
    const handleClickOutsideAction = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-action-menu]")) {
        setOpenActionMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideAction);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideAction);
  }, []);

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

  const sellerOptions = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.submittedByName)));
    return ["All", ...unique];
  }, [products]);

  const categoryOptions = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return ["All", ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (activeTab === "published" && p.status !== "Published") return false;

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        p.productName.toLowerCase().includes(q) ||
        p.submittedByName.toLowerCase().includes(q) ||
        p.productId.toLowerCase().includes(q);

      const matchesSeller =
        sellerFilter === "All" || p.submittedByName === sellerFilter;
      const matchesCategory =
        categoryFilter === "All" || p.category === categoryFilter;

      const productDate = new Date(p.dateISO).getTime();
      const matchesFrom =
        !dateFrom || productDate >= new Date(dateFrom).getTime();
      const matchesTo = !dateTo || productDate <= new Date(dateTo).getTime();

      return (
        matchesSearch &&
        matchesSeller &&
        matchesCategory &&
        matchesFrom &&
        matchesTo
      );
    });
  }, [
    products,
    activeTab,
    searchQuery,
    sellerFilter,
    categoryFilter,
    dateFrom,
    dateTo,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE),
  );
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleSchedule = (id: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: "Scheduled",
              inspectionSchedule: p.inspectionSchedule ?? {
                label: "TBD",
                location: "Riddim Africa HQ",
              },
            }
          : p,
      ),
    );
    setReviewTarget(null);
  };

  const handleRejectWithFeedback = (id: number, _feedback: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Rejected" } : p)),
    );
    setReviewTarget(null);
  };

  const handleAddToCollection = (id: number) => {
    console.log(`Add product ${id} to collection`);
  };

  const handleApproveAndPublish = (
    id: number,
    updated: {
      images: string[];
      inspection: ProductInspectionState;
      variants: ProductVariantRow[];
    },
  ) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: "Published",
              sampleImages: updated.images,
              inspection: updated.inspection,
              variants: updated.variants,
            }
          : p,
      ),
    );
    setReviewTarget(null);
  };

  const handlePublishNewProduct = (payload: NewProductPayload) => {
    const nextId = Math.max(0, ...products.map((p) => p.id)) + 1;
    const today = new Date();
    setProducts((prev) => [
      {
        id: nextId,
        productId: `SP-${String(nextId).padStart(4, "0")}`,
        productName: payload.productName,
        submittedByName: payload.assignId,
        submittedByRole: payload.assignTo,
        submittedByAvatar: AVATAR,
        category: payload.category || "Uncategorized",
        sampleImages: payload.images.map(() => SAMPLE_IMG),
        amountUGX: Number(payload.details[0]?.finalPriceUGX) || 0,
        date: today.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        dateISO: today.toISOString().slice(0, 10),
        status: "Published",
        description: payload.description,
        listedPriceUGX: Number(payload.details[0]?.finalPriceUGX) || 0,
        inspection: {
          qualityCheck: true,
          authenticityVerified: true,
          noDefectsFound: true,
          sizeSpecsAccurate: true,
        },
        variants: payload.details.map((d) => ({
          colour: d.colour,
          variant: d.variants,
          stock: Number(d.stockUnits) || 0,
          finalPriceUGX: Number(d.finalPriceUGX) || 0,
        })),
        reviews: [],
      },
      ...prev,
    ]);
  };

  const buildReviewsData = (product: ProductData): UserReviewsData => {
    const visibleReviews = product.reviews;
    const total = visibleReviews.length;
    const avg = total
      ? visibleReviews.reduce((sum, r) => sum + r.rating, 0) / total
      : 0;
    const breakdown = ([5, 4, 3, 2, 1] as const).map((star) => ({
      star,
      count: visibleReviews.filter((r) => r.rating === star).length,
    }));
    return {
      productName: product.productName,
      averageRating: avg,
      totalReviews: total,
      breakdown,
      reviews: visibleReviews,
    };
  };

  const handleHideReview = (reviewId: number) => {
    if (!reviewsTarget) return;
    setProducts((prev) =>
      prev.map((p) =>
        p.id === reviewsTarget.id
          ? {
              ...p,
              reviews: p.reviews.map((r) =>
                r.id === reviewId ? { ...r, hidden: !r.hidden } : r,
              ),
            }
          : p,
      ),
    );
    setReviewsTarget((prev) =>
      prev
        ? {
            ...prev,
            reviews: prev.reviews.map((r) =>
              r.id === reviewId ? { ...r, hidden: !r.hidden } : r,
            ),
          }
        : prev,
    );
  };

  const handleDeleteReview = (reviewId: number) => {
    if (!reviewsTarget) return;
    setProducts((prev) =>
      prev.map((p) =>
        p.id === reviewsTarget.id
          ? { ...p, reviews: p.reviews.filter((r) => r.id !== reviewId) }
          : p,
      ),
    );
    setReviewsTarget((prev) =>
      prev
        ? { ...prev, reviews: prev.reviews.filter((r) => r.id !== reviewId) }
        : prev,
    );
  };

  const columns: Column<ProductData>[] = [
    { header: "S-Product Id", key: "productId" },
    {
      header: "Product",
      key: "productName",
      render: (row) => (
        <span className="font-medium text-[#101828]">{row.productName}</span>
      ),
    },
    {
      header: "Submitted By",
      key: "submittedByName",
      render: (row) => (
        <div className="text-left pl-4 font-inter">
          <p className="text-sm text-gray-800 font-medium leading-6">
            {row.submittedByName}
          </p>
          <p className="text-xs text-[#787A7F] font-normal leading-4.5">
            {row.submittedByRole}
          </p>
        </div>
      ),
    },
    {
      header: "Category",
      key: "category",
      render: (row) => (
        <span className="inline-block bg-[#EEE8E0] text-[#101828] w-[110px] mx-auto text-sm font-medium font-inter px-4 py-2 rounded-md">
          {row.category}
        </span>
      ),
    },
    {
      header: "Sample Images",
      key: "sampleImages",
      render: (row) => (
        <div className="flex items-center gap-3">
          {row.sampleImages.slice(0, 3).map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="w-8 h-8 rounded-md object-cover border border-[#181B1F] -ml-2 first:ml-0"
            />
          ))}
          {row.sampleImages.length > 3 && (
            <span className="w-8 h-8 rounded-md bg-[#121418] text-[10px] font-medium text-[#787A7F] flex items-center justify-center -ml-2 border border-[#181B1F]">
              +{row.sampleImages.length - 3}
            </span>
          )}
        </div>
      ),
    },
    {
      header: "Amount",
      key: "amountUGX",
      render: (row) => <span>UGX {row.amountUGX.toLocaleString()}</span>,
    },
    { header: "Date", key: "date" },
    {
      header: "Status",
      key: "status",
      render: (row) => (
        <StatusBadge
          status={row.status}
          className="mx-auto justify-center px-5"
        />
      ),
    },
    {
      header: "Action",
      key: "action",
      className: "text-center",
      render: (row) =>
        activeTab === "published" ? (
          <div className="relative inline-block" data-action-menu>
            <button
              className="text-black hover:text-black cursor-pointer p-1"
              onClick={() =>
                setOpenActionMenuId((prev) => (prev === row.id ? null : row.id))
              }
              aria-label={`Actions for ${row.productName}`}
            >
              <MoreVertical size={18} />
            </button>

            {openActionMenuId === row.id && (
              <div className="absolute right-0 mt-1 w-[188px] bg-[#3C182F] border border-[#181B1F] text-white rounded-lg  z-20 py-2  text-left">
                <button
                  onClick={() => {
                    setReviewTarget(row);
                    setOpenActionMenuId(null);
                  }}
                  className="w-full text-left px-3 py-2 text-base font-inter leading-5 flex items-center gap-2  cursor-pointer"
                >
                  <Eye size={16} strokeWidth={1.5} />
                  View Product
                </button>
                <button
                  onClick={() => {
                    setReviewsTarget(row);
                    setOpenActionMenuId(null);
                  }}
                  className="w-full text-left px-3 py-2 text-base flex items-center gap-2 leading-5 font-inter  cursor-pointer"
                >
                  <Star size={16} strokeWidth={1.5} />
                  Product Reviews
                </button>
              </div>
            )}
          </div>
        ) : (
          <ActionButton
            type="view"
            onClick={() => setReviewTarget(row)}
          />
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="">
        <DashboardTopSection
          title="Product Management"
          description="Review submissions, upload professional photos, and publish to the catalogue"
          searchPlaceholder="Search products or sellers..."
          searchValue={searchQuery}
          onSearchChange={(value) => {
            setSearchQuery(value);
            setCurrentPage(1);
          }}
          showFilter
          onFilterClick={() => setFilterOpen((v) => !v)}
          filterRef={filterRef}
          actionLabel="Add Product"
          onActionClick={() => setAddOpen(true)}
          filterContent={
            filterOpen ? (
              <FilterPanel>
                <CommonSelect
                  fullWidth
                  value={sellerFilter}
                  item={sellerOptions.map((seller) => ({
                    label: seller === "All" ? "All Sellers" : seller,
                    value: seller,
                  }))}
                  placeholder="All Sellers"
                  onValueChange={(value) => {
                    setSellerFilter(value);
                    setCurrentPage(1);
                  }}
                />
                <CommonSelect
                  fullWidth
                  value={categoryFilter}
                  item={categoryOptions.map((category) => ({
                    label: category === "All" ? "All Categories" : category,
                    value: category,
                  }))}
                  placeholder="All Categories"
                  onValueChange={(value) => {
                    setCategoryFilter(value);
                    setCurrentPage(1);
                  }}
                />
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => {
                      setDateFrom(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full rounded-lg border border-gray-200 px-2 py-1.5 text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#c19a56]/30"
                  />
                  <span className="text-xs text-gray-400">to</span>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => {
                      setDateTo(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full rounded-lg border border-gray-200 px-2 py-1.5 text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#c19a56]/30"
                  />
                </div>
              </FilterPanel>
            ) : null
          }
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setCurrentPage(1);
            }}
            className={`px-7 py-2 rounded-md text-sm font-medium font-inter border border-[#63274D]  leading-5 cursor-pointer transition-colors ${
              activeTab === tab.key
                ? "bg-[#63274D] text-white border-[#63274D]"
                : "bg-white text-[#3C182F] border-[#63274D] hover:bg-[#3C182F]/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "category" ? (
        <CategoryTab />
      ) : activeTab === "collections" ? (
        <CollectionTab />
      ) : (
        <GenericTable
          data={paginatedProducts}
          columns={columns}
          headerBgColor="bg-[#3C182F]"
          pagination={{
            currentPage: currentPage,
            totalPages: totalPages,
            onPageChange: (page) => setCurrentPage(page),
          }}
        />
      )}

      <ProductReviewModal
        isOpen={!!reviewTarget}
        product={
          reviewTarget &&
          ({
            id: reviewTarget.id,
            productName: reviewTarget.productName,
            submittedByName: reviewTarget.submittedByName,
            submittedByRole: reviewTarget.submittedByRole,
            submittedByAvatar: reviewTarget.submittedByAvatar,
            category: reviewTarget.category,
            submittedDate: reviewTarget.date,
            description: reviewTarget.description,
            listedPriceUGX: reviewTarget.listedPriceUGX,
            images: reviewTarget.sampleImages,
            inspection: reviewTarget.inspection,
            inspectionSchedule: reviewTarget.inspectionSchedule,
            variants: reviewTarget.variants,
          } as ProductReviewData)
        }
        onClose={() => setReviewTarget(null)}
        onSchedule={handleSchedule}
        onRejectWithFeedback={handleRejectWithFeedback}
        onAddToCollection={handleAddToCollection}
        onApproveAndPublish={handleApproveAndPublish}
      />

      <AddProductModal
        isOpen={addOpen}
        categories={categoryOptions.filter((c) => c !== "All")}
        collections={["Festive Collection", "Summer Drop", "Artist Exclusives"]}
        onClose={() => setAddOpen(false)}
        onPublish={handlePublishNewProduct}
      />

      <UserReviewsModal
        isOpen={!!reviewsTarget}
        data={reviewsTarget ? buildReviewsData(reviewsTarget) : null}
        onClose={() => setReviewsTarget(null)}
        onHideReview={handleHideReview}
        onDeleteReview={handleDeleteReview}
      />
    </div>
  );
};
