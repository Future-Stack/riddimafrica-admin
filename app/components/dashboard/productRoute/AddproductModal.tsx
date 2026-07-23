import { useRef, useState } from "react";
import { CircleX, Upload, CheckCircle2, Circle, Plus, Palette } from "lucide-react";

export interface NewProductDetailRow {
    colour: string;
    variants: string;
    finalPriceUGX: string;
    stockUnits: string;
}

export interface NewProductPayload {
    productName: string;
    category: string;
    collection: string;
    description: string;
    assignTo: "Seller" | "Artist";
    assignId: string;
    details: NewProductDetailRow[];
    images: File[];
}

interface AddProductModalProps {
    isOpen: boolean;
    categories: string[];
    collections: string[];
    onClose: () => void;
    onPublish: (payload: NewProductPayload) => void;
}

const emptyDetailRow: NewProductDetailRow = { colour: "", variants: "", finalPriceUGX: "", stockUnits: "" };

export function AddProductModal({ isOpen, categories, collections, onClose, onPublish }: AddProductModalProps) {
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [collection, setCollection] = useState("");
    const [description, setDescription] = useState("");
    const [assignTo, setAssignTo] = useState<"Seller" | "Artist">("Seller");
    const [assignId, setAssignId] = useState("");
    const [details, setDetails] = useState<NewProductDetailRow[]>([{ ...emptyDetailRow }]);
    const [images, setImages] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const resetAndClose = () => {
        setProductName("");
        setCategory("");
        setCollection("");
        setDescription("");
        setAssignTo("Seller");
        setAssignId("");
        setDetails([{ ...emptyDetailRow }]);
        setImages([]);
        onClose();
    };

    const handleChooseFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (files.length) setImages((prev) => [...prev, ...files]);
        e.target.value = "";
    };

    const updateDetail = (index: number, field: keyof NewProductDetailRow, value: string) => {
        setDetails((prev) => prev.map((d, i) => (i === index ? { ...d, [field]: value } : d)));
    };

    const addDetailRow = () => setDetails((prev) => [...prev, { ...emptyDetailRow }]);

    const productNameEntered = productName.trim().length > 0;
    const priceSet = details.some((d) => d.finalPriceUGX.trim().length > 0);
    const imageUploaded = images.length > 0;
    const canPublish = productNameEntered && priceSet && imageUploaded && assignId.trim().length > 0;

    const handlePublish = () => {
        if (!canPublish) return;
        onPublish({
            productName: productName.trim(),
            category,
            collection,
            description: description.trim(),
            assignTo,
            assignId: assignId.trim(),
            details,
            images,
        });
        resetAndClose();
    };

    const ChecklistRow = ({ done, label }: { done: boolean; label: string }) => (
        <div className="flex items-center gap-2">
            {done ? <CheckCircle2 size={16} className="text-[#036B2C]" /> : <Circle size={16} className="text-gray-300" />}
            <span className={`text-xs ${done ? "text-[#036B2C]" : "text-gray-400"}`}>{label}</span>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl p-6 font-inter shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-start justify-between mb-1">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-[#101828] leading-7">Add Product</h2>
                        <p className="text-xs text-gray-500 mt-0.5">Admin-created listing — publishes directly to seller's catalog</p>
                    </div>
                    <button onClick={resetAndClose} className="text-[#3E2723] hover:text-black cursor-pointer" aria-label="Close">
                        <CircleX size={20} />
                    </button>
                </div>
                <div className="border-t border-gray-100 my-4" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="mb-1 block text-xs font-medium text-[#101828]">Product Name *</label>
                            <input
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                placeholder="e.g. Teni Limited Edition Hoodie"
                                className="w-full rounded-lg border border-[#E8DCC8] bg-[#FAF7F1] px-3 py-2.5 text-sm text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E6A400]/30"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-medium text-[#101828]">Product Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full rounded-lg border border-[#E8DCC8] bg-[#FAF7F1] px-3 py-2.5 text-sm text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#E6A400]/30"
                            >
                                <option value="">Clothing</option>
                                {categories.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-medium text-[#101828]">Add to Collection</label>
                            <select
                                value={collection}
                                onChange={(e) => setCollection(e.target.value)}
                                className="w-full rounded-lg border border-[#E8DCC8] bg-[#FAF7F1] px-3 py-2.5 text-sm text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#E6A400]/30"
                            >
                                <option value="">Festive Collection</option>
                                {collections.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-medium text-[#101828]">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe the product — materials, sizing, authenticity details..."
                                rows={3}
                                className="w-full resize-none rounded-lg border border-[#E8DCC8] bg-[#FAF7F1] px-3 py-2.5 text-sm text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E6A400]/30"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-medium text-[#101828]">Assign to Seller / Artist *</label>
                            <div className="flex items-center gap-4 mb-2">
                                <label className="flex items-center gap-1.5 text-sm text-[#101828] cursor-pointer">
                                    <input
                                        type="radio"
                                        checked={assignTo === "Seller"}
                                        onChange={() => setAssignTo("Seller")}
                                        className="accent-[#101828]"
                                    />
                                    Seller
                                </label>
                                <label className="flex items-center gap-1.5 text-sm text-[#101828] cursor-pointer">
                                    <input
                                        type="radio"
                                        checked={assignTo === "Artist"}
                                        onChange={() => setAssignTo("Artist")}
                                        className="accent-[#101828]"
                                    />
                                    Artist
                                </label>
                            </div>
                            <input
                                value={assignId}
                                onChange={(e) => setAssignId(e.target.value)}
                                placeholder="e.g seller id"
                                className="w-full rounded-lg border border-[#E8DCC8] bg-[#FAF7F1] px-3 py-2.5 text-sm text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E6A400]/30"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-[#101828]">Product Images *</label>
                        <div className="rounded-xl border-2 border-dashed border-[#E8DCC8] bg-[#FAF7F1] flex flex-col items-center justify-center text-center px-4 py-8">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                                <Upload size={18} className="text-gray-500" />
                            </div>
                            <p className="text-sm font-medium text-[#101828] mb-1">Upload product images</p>
                            <p className="text-[10px] text-gray-400 mb-3">PNG, JPG, WEBP - up to 10MB each</p>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="rounded-lg bg-[#E6A400] px-4 py-2 text-xs font-semibold text-white hover:bg-[#dd951b] cursor-pointer"
                            >
                                Choose Files
                            </button>
                            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleChooseFiles} />
                        </div>
                        {images.length > 0 && (
                            <p className="text-[10px] text-gray-500 mt-2">{images.length} image{images.length > 1 ? "s" : ""} selected</p>
                        )}

                        <div className="space-y-1.5 mt-4">
                            <ChecklistRow done={productNameEntered} label="Product name entered" />
                            <ChecklistRow done={priceSet} label="Price set" />
                            <ChecklistRow done={imageUploaded} label="At least one image uploaded" />
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-[#101828]">Product Details</p>
                        <button
                            onClick={addDetailRow}
                            className="flex items-center gap-1 text-xs font-medium text-[#036B2C] hover:opacity-80 cursor-pointer"
                        >
                            <Plus size={14} />
                            Add more
                        </button>
                    </div>

                    <div className="space-y-3">
                        {details.map((row, i) => (
                            <div key={i} className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="mb-1 block text-[10px] text-gray-500">Colour</label>
                                    <div className="flex items-center rounded-lg border border-[#E8DCC8] bg-[#FAF7F1] px-3 py-2.5">
                                        <input
                                            value={row.colour}
                                            onChange={(e) => updateDetail(i, "colour", e.target.value)}
                                            placeholder="Red"
                                            className="w-full bg-transparent text-sm text-[#101828] placeholder-gray-400 focus:outline-none"
                                        />
                                        <Palette size={14} className="text-gray-400" />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-1 block text-[10px] text-gray-500">Variants</label>
                                    <input
                                        value={row.variants}
                                        onChange={(e) => updateDetail(i, "variants", e.target.value)}
                                        placeholder="S, M, L, XL"
                                        className="w-full rounded-lg border border-[#E8DCC8] bg-[#FAF7F1] px-3 py-2.5 text-sm text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E6A400]/30"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-[10px] text-gray-500">Final Price</label>
                                    <div className="flex items-center rounded-lg border border-[#E8DCC8] bg-[#FAF7F1] px-3 py-2.5">
                                        <span className="text-xs text-gray-400 mr-1">UGX</span>
                                        <input
                                            value={row.finalPriceUGX}
                                            onChange={(e) => updateDetail(i, "finalPriceUGX", e.target.value)}
                                            placeholder="18500"
                                            className="w-full bg-transparent text-sm text-[#101828] placeholder-gray-400 focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-1 block text-[10px] text-gray-500">Stock Units</label>
                                    <input
                                        value={row.stockUnits}
                                        onChange={(e) => updateDetail(i, "stockUnits", e.target.value)}
                                        placeholder="50"
                                        className="w-full rounded-lg border border-[#E8DCC8] bg-[#FAF7F1] px-3 py-2.5 text-sm text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E6A400]/30"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3 mt-6">
                    <button
                        onClick={handlePublish}
                        disabled={!canPublish}
                        className="rounded-lg bg-[#E6A400] py-3 px-7 text-sm font-semibold text-white hover:bg-[#dd951b] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Publish
                    </button>
                    <button
                        onClick={resetAndClose}
                        className="rounded-lg bg-[#7C8591] py-3 px-7 text-sm font-medium text-white hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}