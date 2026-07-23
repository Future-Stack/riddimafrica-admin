import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Filter as FilterIcon, Eye, MoreVertical } from "lucide-react";
import GenericTable, { Column } from "../../reusable/GenericTable";
import PageHeader from "../../reusable/PageHeader";
import { ProductReviewModal, ProductReviewData, ProductInspectionState, ProductVariantRow } from "./ProductReviewModal";
import { ProductReviewItem, UserReviewsData, UserReviewsModal } from "./UserReviewsModal";
import { AddProductModal, NewProductPayload } from "./AddproductModal";


type ProductStatus = "Pending Inspection" | "Review" | "Rejected" | "Published" | "Scheduled" | "On-Hold";

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
    { id: 1, name: "Tunde Fashola", handle: "tunde_lg", avatar: REVIEWER_AVATAR, rating: 5, date: "18 Jun 2025", title: "ABSOLUTELY FIRE 🔥", body: "Got the Teni hoodie and I'm obsessed. Quality is top-notch, fits perfectly. The embroidery is clean. Will definitely buy again from Riddim Africa!" },
    { id: 2, name: "Amaka Obi", handle: "amaka.o", avatar: REVIEWER_AVATAR, rating: 4, date: "16 Jun 2025", title: "Great fit, fast delivery", body: "Really happy with this — sizing was accurate and it arrived earlier than expected." },
    { id: 3, name: "Femi Adio", handle: "femi_a", avatar: REVIEWER_AVATAR, rating: 3, date: "12 Jun 2025", title: "Good but pricey", body: "Nice quality overall, just wish it was a bit cheaper for what you get." },
];

const emptyReviews: ProductReviewItem[] = [];

const INITIAL_PRODUCTS: ProductData[] = [
    { id: 1, productId: "SP-0001", productName: "Teni Limited Hoodie", submittedByName: "Teni", submittedByRole: "Artist", submittedByAvatar: AVATAR, category: "Apparel", sampleImages: [SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG], amountUGX: 18420, date: "2 Mar 2025", dateISO: "2025-03-02", status: "Pending Inspection", description: "Limited edition apparel merchandise from Teni. Artist-approved and authentic.", listedPriceUGX: 18500, inspection: baseInspection, inspectionSchedule: { label: "Wed 17 Jun · 09:00", location: "Riddim Africa HQ" }, variants: baseVariants, reviews: emptyReviews },
    { id: 2, productId: "SP-0001", productName: "Teni Limited Hoodie", submittedByName: "AfroBeatsNG", submittedByRole: "Seller", submittedByAvatar: AVATAR, category: "Accessories", sampleImages: [SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG], amountUGX: 11200, date: "2 Mar 2025", dateISO: "2025-03-02", status: "Review", description: "Limited edition apparel merchandise. Seller-listed and pending review.", listedPriceUGX: 11200, inspection: baseInspection, variants: baseVariants, reviews: emptyReviews },
    { id: 3, productId: "SP-0001", productName: "Teni Limited Hoodie", submittedByName: "AfroBeatsNG", submittedByRole: "Seller", submittedByAvatar: AVATAR, category: "Prints", sampleImages: [SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG], amountUGX: 22200, date: "2 Mar 2025", dateISO: "2025-03-02", status: "Rejected", description: "Limited edition print merchandise.", listedPriceUGX: 22200, inspection: baseInspection, variants: baseVariants, reviews: emptyReviews },
    { id: 4, productId: "SP-0001", productName: "Teni Limited Hoodie", submittedByName: "AfroBeatsNG", submittedByRole: "Seller", submittedByAvatar: AVATAR, category: "T-shirt", sampleImages: [SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG], amountUGX: 8000, date: "2 Mar 2025", dateISO: "2025-03-02", status: "Published", description: "Limited edition t-shirt merchandise.", listedPriceUGX: 8000, inspection: { qualityCheck: true, authenticityVerified: true, noDefectsFound: true, sizeSpecsAccurate: true }, variants: baseVariants, reviews: sampleReviews },
    { id: 5, productId: "SP-0001", productName: "Teni Limited Hoodie", submittedByName: "AfroBeatsNG", submittedByRole: "Seller", submittedByAvatar: AVATAR, category: "Accessories", sampleImages: [SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG], amountUGX: 22200, date: "2 Mar 2025", dateISO: "2025-03-02", status: "Published", description: "Limited edition accessory merchandise.", listedPriceUGX: 22200, inspection: { qualityCheck: true, authenticityVerified: true, noDefectsFound: true, sizeSpecsAccurate: true }, inspectionSchedule: { label: "Fri 19 Jun · 11:00", location: "Riddim Africa HQ" }, variants: baseVariants, reviews: sampleReviews },
    { id: 6, productId: "SP-0001", productName: "Teni Limited Hoodie", submittedByName: "AfroBeatsNG", submittedByRole: "Seller", submittedByAvatar: AVATAR, category: "Accessories", sampleImages: [SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG], amountUGX: 8000, date: "2 Mar 2025", dateISO: "2025-03-02", status: "Published", description: "Limited edition accessory merchandise.", listedPriceUGX: 8000, inspection: { qualityCheck: true, authenticityVerified: true, noDefectsFound: true, sizeSpecsAccurate: true }, variants: baseVariants, reviews: emptyReviews },
    { id: 7, productId: "SP-0001", productName: "Teni Limited Hoodie", submittedByName: "AfroBeatsNG", submittedByRole: "Seller", submittedByAvatar: AVATAR, category: "Apparel", sampleImages: [SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG], amountUGX: 22200, date: "2 Mar 2025", dateISO: "2025-03-02", status: "Published", description: "Limited edition apparel merchandise.", listedPriceUGX: 22200, inspection: { qualityCheck: true, authenticityVerified: true, noDefectsFound: true, sizeSpecsAccurate: true }, variants: baseVariants, reviews: emptyReviews },
    { id: 8, productId: "SP-0001", productName: "Teni Limited Hoodie", submittedByName: "AfroBeatsNG", submittedByRole: "Seller", submittedByAvatar: AVATAR, category: "Prints", sampleImages: [SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG, SAMPLE_IMG], amountUGX: 8000, date: "2 Mar 2025", dateISO: "2025-03-02", status: "On-Hold", description: "Limited edition print merchandise.", listedPriceUGX: 8000, inspection: baseInspection, variants: baseVariants, reviews: emptyReviews },
];

const PAGE_SIZE = 8;

type TabKey = "sample" | "published" | "category" | "collections";

const TABS: { key: TabKey; label: string }[] = [
    { key: "sample", label: "Sample Products" },
    { key: "published", label: "Published Products" },
    { key: "category", label: "Product Category" },
    { key: "collections", label: "Collections" },
];

export function ProductTable() {
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
        return () => document.removeEventListener("mousedown", handleClickOutsideAction);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setFilterOpen(false);
            }
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

            const matchesSeller = sellerFilter === "All" || p.submittedByName === sellerFilter;
            const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;

            const productDate = new Date(p.dateISO).getTime();
            const matchesFrom = !dateFrom || productDate >= new Date(dateFrom).getTime();
            const matchesTo = !dateTo || productDate <= new Date(dateTo).getTime();

            return matchesSearch && matchesSeller && matchesCategory && matchesFrom && matchesTo;
        });
    }, [products, activeTab, searchQuery, sellerFilter, categoryFilter, dateFrom, dateTo]);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const statusBadgeClass = (status: ProductStatus) => {
        switch (status) {
            case "Pending Inspection":
                return "bg-[#E6A400] text-white";
            case "Review":
                return "bg-[#63274D] text-white";
            case "Rejected":
                return "bg-[#C9000A] text-white";
            case "Published":
                return "bg-[#2D6365] text-white";
            case "Scheduled":
                return "bg-[#15AC51] text-white";
            case "On-Hold":
                return "bg-[#E6C200] text-white";
        }
    };

    const handleSchedule = (id: number) => {
        setProducts((prev) =>
            prev.map((p) =>
                p.id === id
                    ? { ...p, status: "Scheduled", inspectionSchedule: p.inspectionSchedule ?? { label: "TBD", location: "Riddim Africa HQ" } }
                    : p
            )
        );
        setReviewTarget(null);
    };

    const handleRejectWithFeedback = (id: number, _feedback: string) => {
        setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, status: "Rejected" } : p)));
        setReviewTarget(null);
    };

    const handleAddToCollection = (id: number) => {
        console.log(`Add product ${id} to collection`);
    };

    const handleApproveAndPublish = (
        id: number,
        updated: { images: string[]; inspection: ProductInspectionState; variants: ProductVariantRow[] }
    ) => {
        setProducts((prev) =>
            prev.map((p) =>
                p.id === id
                    ? { ...p, status: "Published", sampleImages: updated.images, inspection: updated.inspection, variants: updated.variants }
                    : p
            )
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
                date: today.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
                dateISO: today.toISOString().slice(0, 10),
                status: "Published",
                description: payload.description,
                listedPriceUGX: Number(payload.details[0]?.finalPriceUGX) || 0,
                inspection: { qualityCheck: true, authenticityVerified: true, noDefectsFound: true, sizeSpecsAccurate: true },
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
        const avg = total ? visibleReviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;
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
                    ? { ...p, reviews: p.reviews.map((r) => (r.id === reviewId ? { ...r, hidden: !r.hidden } : r)) }
                    : p
            )
        );
        setReviewsTarget((prev) =>
            prev ? { ...prev, reviews: prev.reviews.map((r) => (r.id === reviewId ? { ...r, hidden: !r.hidden } : r)) } : prev
        );
    };

    const handleDeleteReview = (reviewId: number) => {
        if (!reviewsTarget) return;
        setProducts((prev) =>
            prev.map((p) => (p.id === reviewsTarget.id ? { ...p, reviews: p.reviews.filter((r) => r.id !== reviewId) } : p))
        );
        setReviewsTarget((prev) => (prev ? { ...prev, reviews: prev.reviews.filter((r) => r.id !== reviewId) } : prev));
    };

    const columns: Column<ProductData>[] = [
        { header: "S-Product Id", key: "productId" },
        {
            header: "Product",
            key: "productName",
            render: (row) => <span className="font-medium text-[#101828]">{row.productName}</span>,
        },
        {
            header: "Submitted By",
            key: "submittedByName",
            render: (row) => (
                <div className="text-left pl-4 font-inter">
                    <p className="text-sm text-gray-800 font-medium leading-6">{row.submittedByName}</p>
                    <p className="text-xs text-[#787A7F] font-normal leading-4.5">{row.submittedByRole}</p>
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
                <span className={`inline-flex items-center justify-center px-5 py-2 text-xs font-medium font-inter leading-4 rounded-full ${statusBadgeClass(row.status)}`}>
                    {row.status}
                </span>
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
                            onClick={() => setOpenActionMenuId((prev) => (prev === row.id ? null : row.id))}
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M10.3866 7.99995C10.3866 9.31995 9.31995 10.3866 7.99995 10.3866C6.67995 10.3866 5.61328 9.31995 5.61328 7.99995C5.61328 6.67995 6.67995 5.61328 7.99995 5.61328C9.31995 5.61328 10.3866 6.67995 10.3866 7.99995Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M7.9999 13.5133C10.3532 13.5133 12.5466 12.1266 14.0732 9.72665C14.6732 8.78665 14.6732 7.20665 14.0732 6.26665C12.5466 3.86665 10.3532 2.47998 7.9999 2.47998C5.64656 2.47998 3.45323 3.86665 1.92656 6.26665C1.32656 7.20665 1.32656 8.78665 1.92656 9.72665C3.45323 12.1266 5.64656 13.5133 7.9999 13.5133Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    View Product
                                </button>
                                <button
                                    onClick={() => {
                                        setReviewsTarget(row);
                                        setOpenActionMenuId(null);
                                    }}
                                    className="w-full text-left px-3 py-2 text-base flex items-center gap-2 leading-5 font-inter  cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M9.15192 2.29628L10.3251 4.66208C10.4851 4.99141 10.9117 5.3073 11.2717 5.36779L13.3981 5.724C14.758 5.95251 15.0779 6.94722 14.098 7.92849L12.4449 9.5953C12.1649 9.87759 12.0116 10.422 12.0983 10.8118L12.5715 12.8752C12.9448 14.5084 12.0849 15.1401 10.6518 14.2866L8.65864 13.097C8.29868 12.8819 7.70541 12.8819 7.33879 13.097L5.34567 14.2866C3.91917 15.1401 3.05259 14.5016 3.42589 12.8752L3.89917 10.8118C3.98582 10.422 3.83251 9.87759 3.55254 9.5953L1.89939 7.92849C0.926163 6.94722 1.23946 5.95251 2.59931 5.724L4.72574 5.36779C5.07904 5.3073 5.50566 4.99141 5.66564 4.66208L6.83884 2.29628C7.47877 1.01257 8.51866 1.01257 9.15192 2.29628Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    Product Reviews
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        className="text-gray-400 hover:text-black cursor-pointer"
                        onClick={() => setReviewTarget(row)}
                        aria-label={`View ${row.productName}`}
                    >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M15.58 11.9999C15.58 13.9799 13.98 15.5799 12 15.5799C10.02 15.5799 8.42004 13.9799 8.42004 11.9999C8.42004 10.0199 10.02 8.41992 12 8.41992C13.98 8.41992 15.58 10.0199 15.58 11.9999Z" stroke="#655042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 20.2697C15.53 20.2697 18.82 18.1897 21.11 14.5897C22.01 13.1797 22.01 10.8097 21.11 9.39973C18.82 5.79973 15.53 3.71973 12 3.71973C8.46997 3.71973 5.17997 5.79973 2.88997 9.39973C1.98997 10.8097 1.98997 13.1797 2.88997 14.5897C5.17997 18.1897 8.46997 20.2697 12 20.2697Z" stroke="#655042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                    </button>
                ),
        },
    ];

    return (
        <div className="">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
                <PageHeader
                    title="Product Management"
                    description="Review submissions, upload professional photos, and publish to the catalogue"
                />

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
                            placeholder="Search products or sellers..."
                            className="pl-9 pr-4 py-3.5 rounded-full bg-white border border-[#E8DCC8] text-sm text-[#897766] w-64 focus:outline-none focus:ring-2 focus:ring-[#c19a56]/30"
                        />
                    </div>

                    <div ref={filterRef} className="relative">
                        <button
                            onClick={() => setFilterOpen((v) => !v)}
                            className="flex items-center gap-2 px-4 py-3.5 rounded-full bg-[#D8CBB880] border border-gray-200 text-sm font-medium text-[#897766] cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3 7H6" stroke="#897766" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M3 17H9" stroke="#897766" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18 17L21 17" stroke="#897766" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15 7L21 7" stroke="#897766" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z" stroke="#897766" stroke-width="1.5" />
                                <path d="M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z" stroke="#897766" stroke-width="1.5" />
                            </svg>
                            Filter
                        </button>

                        {filterOpen && (
                            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-10">
                                <p className="text-xs font-semibold text-gray-400 mb-2">Seller / Artist</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {sellerOptions.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => {
                                                setSellerFilter(s);
                                                setCurrentPage(1);
                                            }}
                                            className={`px-3 py-1 rounded-full text-xs border cursor-pointer ${sellerFilter === s ? "bg-[#3E2413] text-white border-[#0a192f]" : "bg-white text-gray-500 border-gray-200"
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>

                                <p className="text-xs font-semibold text-gray-400 mb-2">Category</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {categoryOptions.map((c) => (
                                        <button
                                            key={c}
                                            onClick={() => {
                                                setCategoryFilter(c);
                                                setCurrentPage(1);
                                            }}
                                            className={`px-3 py-1 rounded-full text-xs border cursor-pointer ${categoryFilter === c ? "bg-[#3E2413] text-white border-[#0a192f]" : "bg-white text-gray-500 border-gray-200"
                                                }`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>

                                <p className="text-xs font-semibold text-gray-400 mb-2">Date Range</p>
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
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => setAddOpen(true)}
                        className="px-5 py-3.5 rounded-md bg-[#E6A400] text-white text-sm font-medium font-inter hover:bg-[#dd951b] transition-colors cursor-pointer whitespace-nowrap"
                    >
                        + Add Product
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-4">
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => {
                            setActiveTab(tab.key);
                            setCurrentPage(1);
                        }}
                        className={`px-7 py-2 rounded-md text-sm font-medium font-inter border border-[#63274D]  leading-5 cursor-pointer transition-colors ${activeTab === tab.key
                            ? "bg-[#63274D] text-white border-[#63274D]"
                            : "bg-white text-[#3C182F] border-[#63274D] hover:bg-[#3C182F]/5"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === "category" || activeTab === "collections" ? (
                <div className="bg-white border border-gray-100 rounded-xl p-10 text-center text-sm text-gray-400">
                    {activeTab === "category" ? "Product Category" : "Collections"} view design coming soon.
                </div>
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
                    reviewTarget && ({
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
}