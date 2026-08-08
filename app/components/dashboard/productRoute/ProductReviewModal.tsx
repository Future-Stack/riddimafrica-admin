import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { ModalShell } from "../../reusable/ModalSeel";
import { InspectionLocationOption, ScheduleInspectionModal, ScheduleInspectionPayload } from "./ScheduleInspectionModal";
import { AddToCollectionModal, CollectionOption } from "./AddtoCollectionModal";
import { RejectProductModal } from "./RejectProductModal";



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
    onSchedule: (id: number, details?: ScheduleInspectionPayload) => void;
    onRejectWithFeedback: (id: number, feedback: string) => void;
    onAddToCollection: (id: number, collectionId?: string) => void;
    onApproveAndPublish: (id: number, updated: { images: string[]; inspection: ProductInspectionState; variants: ProductVariantRow[] }) => void;
    /** Optional overrides for the sub-modals; falls back to sensible demo defaults */
    collectionOptions?: CollectionOption[];
    inspectionLocations?: InspectionLocationOption[];
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
    collectionOptions,
    inspectionLocations,
}: ProductReviewModalProps) {
    const [images, setImages] = useState<string[]>(product?.images ?? []);
    const [inspection, setInspection] = useState<ProductInspectionState>(
        product?.inspection ?? { qualityCheck: false, authenticityVerified: false, noDefectsFound: false, sizeSpecsAccurate: false }
    );
    const [variants, setVariants] = useState<ProductVariantRow[]>(product?.variants ?? []);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loadedForId, setLoadedForId] = useState<number | null>(null);

    // sub-modal visibility
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [collectionModalOpen, setCollectionModalOpen] = useState(false);
    const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

    if (!isOpen || !product) return null;

    // sync local state when a new product is opened
    if (loadedForId !== product.id) {
        setLoadedForId(product.id);
        setImages(product.images);
        setInspection(product.inspection);
        setVariants(product.variants);
        setRejectModalOpen(false);
        setCollectionModalOpen(false);
        setScheduleModalOpen(false);
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
        <>
            <ModalShell
                isOpen={isOpen}
                onClose={onClose}
                title="Product Review"
                subtitle={`${product.submittedByName} (${product.submittedByRole}) · ${product.category} · ${product.submittedDate}`}
                maxWidthClassName="max-w-[1152px]"
                roundedClassName="rounded-xl"
            >
                <div className="bg-[#F9F5EF] rounded-xl py-5.5 px-7 my-4 grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 gap-2">
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
                    <div className="xl:pl-9">
                        <p className="text-sm text-gray-600 font-normal leading-5 mb-1 ">Description</p>
                        <p className="text-xs text-black font-medium leading-4">{product.description}</p>
                    </div>
                    <div className="sm:text-right">
                        <p className="text-sm text-gray-600 font-normal leading-5 mb-1">Listed Price</p>
                        <p className="text-base md:text-lg font-medium leading-7 text-[#E6A400]">UGX {product.listedPriceUGX.toLocaleString()}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-inter mb-5">
                    <div className="col-span-2">
                        <div className="flex flex-col mb-4">
                            <p className="text-sm sm:text-base font-medium text-[#101828] leading-6">Product Images</p>
                            <span className="text-xs text-[#787A7F] font-normal leading-4">{images.length} images</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {images.map((src, i) => (
                                <img key={i} src={src} alt="" className="w-full h-[162px] aspect-square object-cover rounded-lg" />
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

                    <div className="col-span-1">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-sm sm:text-base font-medium text-[#101828] leading-6">Inspection</p>
                            <span className="text-xs text-[#787A7F] font-normal leading-4">{passedCount}/{INSPECTION_ITEMS.length} passed</span>
                        </div>
                        <div className="space-y-2">
                            {INSPECTION_ITEMS.map((item) => (
                                <label
                                    key={item.key}
                                    className="flex items-start gap-3 bg-[#EBF2F2] border border-[#79A6A8] rounded-xl px-3 py-3 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={Boolean(inspection[item.key])}
                                        onChange={(e) =>
                                            setInspection((prev) => ({
                                                ...prev,
                                                [item.key]: e.target.checked,
                                            }))
                                        }
                                        className="mt-0.5 h-5 w-5 appearance-none rounded border border-[#036B2C] checked:bg-[#036B2C] checked:border-[#036B2C] cursor-pointer transition-all bg-no-repeat bg-center checked:bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22white%22%20stroke-width=%223%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22><polyline%20points=%2220%206%209%2017%204%2012%22/></svg>')]"
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-[#101828] leading-5">{item.title}</p>
                                        <p className="text-xs text-[#787A7F] leading-4">{item.description}</p>
                                    </div>
                                </label>
                            ))}

                        </div>

                        {product.inspectionSchedule && (
                            <div className="flex items-center gap-2 bg-[#23BA7D0D] border border-[#23BA7D4D] rounded-[8px] px-3 py-2.5 mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M7.33325 8.6665H10.6666M5.33325 8.6665H5.33924M8.66659 11.3332H5.33325M10.6666 11.3332H10.6606" stroke="#23BA7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12 1.3335V2.66683M4 1.3335V2.66683" stroke="#23BA7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M1.66675 8.16216C1.66675 5.25729 1.66675 3.80486 2.50149 2.90243C3.33624 2 4.67974 2 7.36675 2H8.63341C11.3204 2 12.6639 2 13.4987 2.90243C14.3334 3.80486 14.3334 5.25729 14.3334 8.16216V8.5045C14.3334 11.4094 14.3334 12.8618 13.4987 13.7642C12.6639 14.6667 11.3204 14.6667 8.63341 14.6667H7.36675C4.67974 14.6667 3.33624 14.6667 2.50149 13.7642C1.66675 12.8618 1.66675 11.4094 1.66675 8.5045V8.16216Z" stroke="#23BA7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2 5.3335H14" stroke="#23BA7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p className="text-sm  text-[#23BA7D]">
                                    <span
                                        className="font-medium  cursor-pointer leading-5"
                                        onClick={() => setScheduleModalOpen(true)}
                                    >
                                        Inspection Scheduled — Reschedule?
                                    </span>
                                    <br />
                                    <p className="text-[#787A7F] text-xs font-medium leading-4">
                                        {product.inspectionSchedule.label} · {product.inspectionSchedule.location}
                                    </p>
                                </p>

                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-3 mb-6 border-t border-green-100 ">
                    {variants.map((v, i) => (
                        <div key={i} className="grid grid-cols-2 sm:grid-cols-4 mt-4 gap-3">
                            <div>
                                <p className="text-xs text-[#787A7F] font-medium leading-5 mb-1.5  ">Colour</p>
                                <input
                                    value={v.colour}
                                    onChange={(e) => updateVariant(i, "colour", e.target.value)}
                                    className="w-full rounded-lg text-sm text-gray-700 font-medium bg-[#EBF2F2] border border-[#5F9597]  px-3 py-4  focus:outline-none focus:ring-2 focus:ring-[#036B2C]/20"
                                />
                            </div>
                            <div>
                                <p className="text-xs text-[#787A7F] font-medium leading-5 mb-1.5  ">Variants</p>
                                <input
                                    value={v.variant}
                                    onChange={(e) => updateVariant(i, "variant", e.target.value)}
                                    className="w-full rounded-lg text-sm text-gray-700 font-medium bg-[#EBF2F2] border border-[#5F9597]  px-3 py-4  focus:outline-none focus:ring-2 focus:ring-[#036B2C]/20"
                                />
                            </div>
                            <div>
                                <p className="text-xs text-[#787A7F] font-medium leading-5 mb-1.5  ">Stock</p>
                                <input
                                    value={v.stock}
                                    onChange={(e) => updateVariant(i, "stock", e.target.value)}
                                    className="w-full rounded-lg text-sm text-gray-700 font-medium bg-[#EBF2F2] border border-[#5F9597]  px-3 py-4  focus:outline-none focus:ring-2 focus:ring-[#036B2C]/20"
                                />
                            </div>
                            <div>
                                <p className="text-xs text-[#787A7F] font-medium leading-5 mb-1.5  ">Final Price</p>
                                <div className="flex items-center rounded-lg text-sm text-gray-700 font-medium bg-[#EBF2F2] border border-[#5F9597]  px-3 py-4  focus:outline-none focus:ring-2 focus:ring-[#036B2C]/20">
                                    <span className="mr-1">UGX</span>
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

                <div className="flex flex-col md:flex-row md:flex-wrap items-stretch md:items-center gap-3">
                    <button
                        onClick={() => setScheduleModalOpen(true)}
                        className="w-full md:w-auto rounded-lg bg-[#23BA7D] border border-[#23BA7D] py-2 px-4 text-sm font-medium text-white hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        Schedule
                    </button>
                    <button
                        onClick={() => setRejectModalOpen(true)}
                        className="w-full md:w-auto rounded-lg bg-[#D4183D26] border border-[#D4183D26] py-2 px-4 text-sm font-medium text-[#FF6467] hover:bg-[#ffeaea] transition-colors cursor-pointer"
                    >
                        Reject with Feedback
                    </button>
                    <button
                        onClick={() => setCollectionModalOpen(true)}
                        className="w-full md:w-auto rounded-lg bg-[#E9DFE6] border border-[#6F2C57] py-2 px-4 text-sm font-medium text-[#64284E] hover:bg-[#e6d9f5] transition-colors cursor-pointer"
                    >
                        Add to Collection
                    </button>
                    <button
                        onClick={() => onApproveAndPublish(product.id, { images, inspection, variants })}
                        className="w-full md:w-auto ml-auto rounded-[8px] bg-[#E6A400] py-2 px-6 text-sm font-semibold text-white hover:bg-[#dd951b] transition-colors cursor-pointer"
                    >
                        Approve &amp; Publish
                    </button>
                </div>
            </ModalShell>

            <RejectProductModal
                isOpen={rejectModalOpen}
                productName={product.productName}
                onClose={() => setRejectModalOpen(false)}
                onConfirm={(feedback) => {
                    setRejectModalOpen(false);
                    onRejectWithFeedback(product.id, feedback);
                }}
            />

            <AddToCollectionModal
                isOpen={collectionModalOpen}
                productName={product.productName}
                collections={collectionOptions}
                onClose={() => setCollectionModalOpen(false)}
                onSave={(collectionId) => {
                    setCollectionModalOpen(false);
                    onAddToCollection(product.id, collectionId);
                }}
            />

            <ScheduleInspectionModal
                isOpen={scheduleModalOpen}
                productName={product.productName}
                sellerName={product.submittedByName}
                locations={inspectionLocations}
                onClose={() => setScheduleModalOpen(false)}
                onConfirm={(payload) => {
                    setScheduleModalOpen(false);
                    onSchedule(product.id, payload);
                }}
            />
        </>
    );
}