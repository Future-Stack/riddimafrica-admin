import { useRef, useState } from "react";
import { CircleX, Plus, CalendarClock } from "lucide-react";

export interface ProductVariantRow {
    colour: string;
    variant: string;
    stock: number;
    finalPriceUGX: number;
}

export interface ProductInspectionState {
    qualityCheck: boolean;
    authenticityVerified: boolean;
    noDefectsFound: boolean;
    sizeSpecsAccurate: boolean;
}

export interface InspectionSchedule {
    label: string; // e.g. "Wed 17 Jun · 09:00"
    location: string; // e.g. "Riddim Africa HQ"
}

export interface ProductReviewData {
    id: number;
    productName: string;
    submittedByName: string;
    submittedByRole: "Artist" | "Seller";
    submittedByAvatar: string;
    category: string;
    submittedDate: string;
    description: string;
    listedPriceUGX: number;
    images: string[];
    inspection: ProductInspectionState;
    inspectionSchedule?: InspectionSchedule;
    variants: ProductVariantRow[];
}

interface ProductReviewModalProps {
    isOpen: boolean;
    product: ProductReviewData | null;
    onClose: () => void;
    onSchedule: (id: number) => void;
    onRejectWithFeedback: (id: number, feedback: string) => void;
    onAddToCollection: (id: number) => void;
    onApproveAndPublish: (id: number, updated: { images: string[]; inspection: ProductInspectionState; variants: ProductVariantRow[] }) => void;
}

const INSPECTION_ITEMS: { key: keyof ProductInspectionState; title: string; description: string }[] = [
    { key: "qualityCheck", title: "Quality Check", description: "Material & finish meet standards" },
    { key: "authenticityVerified", title: "Authenticity Verified", description: "Genuine, not counterfeit" },
    { key: "noDefectsFound", title: "No Defects Found", description: "No visible damage" },
    { key: "sizeSpecsAccurate", title: "Size/Specs Accurate", description: "Matches submitted description" },
];

export function ProductReviewModal({
    isOpen,
    product,
    onClose,
    onSchedule,
    onRejectWithFeedback,
    onAddToCollection,
    onApproveAndPublish,
}: ProductReviewModalProps) {
    const [images, setImages] = useState<string[]>(product?.images ?? []);
    const [inspection, setInspection] = useState<ProductInspectionState>(
        product?.inspection ?? { qualityCheck: false, authenticityVerified: false, noDefectsFound: false, sizeSpecsAccurate: false }
    );
    const [variants, setVariants] = useState<ProductVariantRow[]>(product?.variants ?? []);
    const [rejectOpen, setRejectOpen] = useState(false);
    const [feedback, setFeedback] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loadedForId, setLoadedForId] = useState<number | null>(null);

    if (!isOpen || !product) return null;

    // sync local state when a new product is opened
    if (loadedForId !== product.id) {
        setLoadedForId(product.id);
        setImages(product.images);
        setInspection(product.inspection);
        setVariants(product.variants);
        setRejectOpen(false);
        setFeedback("");
    }

    const passedCount = Object.values(inspection).filter(Boolean).length;

    const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setImages((prev) => [...prev, url]);
        e.target.value = "";
    };

    const updateVariant = (index: number, field: keyof ProductVariantRow, value: string) => {
        setVariants((prev) =>
            prev.map((v, i) =>
                i === index
                    ? {
                        ...v,
                        [field]: field === "stock" || field === "finalPriceUGX" ? Number(value) || 0 : value,
                    }
                    : v
            )
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-2xl w-full max-w-3xl p-6 font-inter shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-[#3E2723] leading-7 mb-1.5">Product Review</h2>
                        <p className="text-sm text-[#787A7F] font-medium leading-5">
                            {product.submittedByName} ({product.submittedByRole}) · {product.category} · {product.submittedDate}
                        </p>
                    </div>
                    <button onClick={onClose} className="text-[#3E2723] hover:text-black cursor-pointer" aria-label="Close">
                        <CircleX size={20} />
                    </button>
                </div>
                {/* <div>
                    <label className="flex items-center justify-end gap-2 cursor-pointer text-sm font-medium text-black leading-5 font-inter">
                        <span className="text-xs text-[#101828] font-medium">Feature on Homepage</span>
                        <button
                        
                            className={`w-9 h-5 rounded-full relative transition-colors cursor-pointer ${ ? "bg-[#655042]" : "bg-gray-300"
                                }`}
                            aria-label="Toggle featured on homepage"
                        >
                            <span
                                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${seller.featuredOnHomepage ? "translate-x-4" : ""
                                    }`}
                            />
                        </button>
                    </label>
                </div> */}

                <div className="bg-[#F9F5EF] rounded-xl py-5.5 px-7 my-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                        <p className="text-sm text-gray-600 font-normal leading-5 mb-1">Product Name</p>
                        <p className="text-base font-medium text-black leading-6">{product.productName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 font-normal leading-5 mb-1">Seller / Artist</p>
                        <div className="flex items-center gap-1.5">
                            <img src={product.submittedByAvatar} alt={product.submittedByName} className="w-5 h-5 rounded-full object-cover" />
                            <span className="text-sm text-black font-medium leading-5">{product.submittedByName}</span>
                            <span className="text-[10px] bg-[#23BA7D26] text-[#23BA7D] px-3 py-0.5 leading-4 rounded-sm font-medium">
                                {product.submittedByRole}
                            </span>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 font-normal leading-5 mb-1">Description</p>
                        <p className="text-xs text-black font-medium leading-4">{product.description}</p>
                    </div>
                    <div className="sm:text-right">
                        <p className="text-sm text-gray-600 font-normal leading-5 mb-1">Listed Price</p>
                        <p className="text-sm font-bold text-[#E6A400]">UGX {product.listedPriceUGX.toLocaleString()}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-[#101828]">Product Images</p>
                            <span className="text-xs text-gray-400">{images.length} images</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {images.map((src, i) => (
                                <img key={i} src={src} alt="" className="w-full aspect-square object-cover rounded-lg" />
                            ))}
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-[#E6A400] hover:text-[#E6A400] cursor-pointer"
                            >
                                <Plus size={18} />
                                <span className="text-[10px] mt-1">Add photo</span>
                            </button>
                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAddPhoto} />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-[#101828]">Inspection</p>
                            <span className="text-xs text-gray-400">{passedCount}/{INSPECTION_ITEMS.length} passed</span>
                        </div>
                        <div className="space-y-2">
                            {INSPECTION_ITEMS.map((item) => (
                                <label
                                    key={item.key}
                                    className="flex items-start gap-2.5 bg-[#EAF3EF] rounded-lg px-3 py-2.5 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={inspection[item.key]}
                                        onChange={(e) => setInspection((prev) => ({ ...prev, [item.key]: e.target.checked }))}
                                        className="mt-0.5 accent-[#036B2C]"
                                    />
                                    <div>
                                        <p className="text-xs font-medium text-[#101828]">{item.title}</p>
                                        <p className="text-[10px] text-gray-500">{item.description}</p>
                                    </div>
                                </label>
                            ))}
                        </div>

                        {product.inspectionSchedule && (
                            <div className="flex items-center gap-2 bg-[#EAF6EF] rounded-lg px-3 py-2.5 mt-2">
                                <CalendarClock size={14} className="text-[#036B2C] shrink-0" />
                                <p className="text-xs text-[#036B2C]">
                                    <span className="font-medium underline cursor-pointer" onClick={() => onSchedule(product.id)}>
                                        Inspection Scheduled — Reschedule?
                                    </span>
                                    <br />
                                    {product.inspectionSchedule.label} · {product.inspectionSchedule.location}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-3 mb-6">
                    {variants.map((v, i) => (
                        <div key={i} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div>
                                <p className="text-[10px] text-gray-500 mb-1">Colour</p>
                                <input
                                    value={v.colour}
                                    onChange={(e) => updateVariant(i, "colour", e.target.value)}
                                    className="w-full rounded-lg border border-[#DCEFE3] bg-[#F5FAF7] px-3 py-2 text-sm text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#036B2C]/20"
                                />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 mb-1">Variants</p>
                                <input
                                    value={v.variant}
                                    onChange={(e) => updateVariant(i, "variant", e.target.value)}
                                    className="w-full rounded-lg border border-[#DCEFE3] bg-[#F5FAF7] px-3 py-2 text-sm text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#036B2C]/20"
                                />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 mb-1">Stock</p>
                                <input
                                    value={v.stock}
                                    onChange={(e) => updateVariant(i, "stock", e.target.value)}
                                    className="w-full rounded-lg border border-[#DCEFE3] bg-[#F5FAF7] px-3 py-2 text-sm text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#036B2C]/20"
                                />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 mb-1">Final Price</p>
                                <div className="flex items-center rounded-lg border border-[#DCEFE3] bg-[#F5FAF7] px-3 py-2">
                                    <span className="text-xs text-gray-400 mr-1">UGX</span>
                                    <input
                                        value={v.finalPriceUGX}
                                        onChange={(e) => updateVariant(i, "finalPriceUGX", e.target.value)}
                                        className="w-full bg-transparent text-sm text-[#101828] focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {rejectOpen && (
                    <div className="mb-4">
                        <label className="mb-1 block text-xs font-medium text-[#DB321C]">Feedback for rejection</label>
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            rows={3}
                            placeholder="Explain what needs to change..."
                            className="w-full resize-none rounded-lg border border-[#FFA8A9] bg-[#FF00041A] p-3 text-sm text-[#DB321C] placeholder-[#DB321C]/60 focus:outline-none focus:ring-2 focus:ring-red-100"
                        />
                        <div className="flex justify-end gap-2 mt-2">
                            <button
                                onClick={() => setRejectOpen(false)}
                                className="px-4 py-2 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (!feedback.trim()) return;
                                    onRejectWithFeedback(product.id, feedback.trim());
                                }}
                                disabled={!feedback.trim()}
                                className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#b84b42] text-white hover:opacity-90 disabled:opacity-50 cursor-pointer"
                            >
                                Send Rejection
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={() => onSchedule(product.id)}
                        className="rounded-lg bg-[#036B2C] py-3 px-6 text-sm font-medium text-white hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        Schedule
                    </button>
                    <button
                        onClick={() => setRejectOpen((v) => !v)}
                        className="rounded-lg bg-[#D4183D1A] border border-[#D4183D4D] py-3 px-6 text-sm font-medium text-[#FF6467] hover:bg-[#ffeaea] transition-colors cursor-pointer"
                    >
                        Reject with Feedback
                    </button>
                    <button
                        onClick={() => onAddToCollection(product.id)}
                        className="rounded-lg bg-[#EFE7F7] border border-[#D9C6F0] py-3 px-6 text-sm font-medium text-[#6B3FA0] hover:bg-[#e6d9f5] transition-colors cursor-pointer"
                    >
                        Add to Collection
                    </button>
                    <button
                        onClick={() => onApproveAndPublish(product.id, { images, inspection, variants })}
                        className="ml-auto rounded-lg bg-[#E6A400] py-3 px-6 text-sm font-semibold text-white hover:bg-[#dd951b] transition-colors cursor-pointer"
                    >
                        Approve &amp; Publish
                    </button>
                </div>
            </div>
        </div>
    );
}