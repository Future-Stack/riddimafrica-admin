import ModalShell from "@/app/components/common/ModalSeel";
import { BadgeCheck, Circle, Palette, PlusCircle, Upload } from "lucide-react";
import { useRef, useState } from "react";

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

const emptyDetailRow: NewProductDetailRow = {
  colour: "",
  variants: "",
  finalPriceUGX: "",
  stockUnits: "",
};

export const AddProductModal = ({
  isOpen,
  categories,
  collections,
  onClose,
  onPublish,
}: AddProductModalProps) => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [collection, setCollection] = useState("");
  const [description, setDescription] = useState("");
  const [assignTo, setAssignTo] = useState<"Seller" | "Artist">("Seller");
  const [assignId, setAssignId] = useState("");
  const [details, setDetails] = useState<NewProductDetailRow[]>([
    { ...emptyDetailRow },
  ]);
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

  const updateDetail = (
    index: number,
    field: keyof NewProductDetailRow,
    value: string,
  ) => {
    setDetails((prev) =>
      prev.map((d, i) => (i === index ? { ...d, [field]: value } : d)),
    );
  };

  const addDetailRow = () =>
    setDetails((prev) => [...prev, { ...emptyDetailRow }]);

  const productNameEntered = productName.trim().length > 0;
  const priceSet = details.some((d) => d.finalPriceUGX.trim().length > 0);
  const imageUploaded = images.length > 0;
  const canPublish =
    productNameEntered &&
    priceSet &&
    imageUploaded &&
    assignId.trim().length > 0;

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
    <div className="flex items-center text-[#787A7F] font-normal text-sm leading-4 gap-2.5">
      {done ? (
        <BadgeCheck size={20} className="text-[#377A7D]" />
      ) : (
        <Circle size={18} className="text-[#79A6A8]" />
      )}
      <span className={`text-xs ${done ? "text-[#036B2C]" : "text-gray-400"}`}>
        {label}
      </span>
    </div>
  );

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={resetAndClose}
      title="Add Product"
      subtitle="Admin-created listing — publishes directly to seller's catalog"
      maxWidthClassName="max-w-[933px]"
      roundedClassName="rounded-2xl"
    >
      <div className="border-t border-[#C1D6D7] mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#787A7F] leading-6">
              Product Name *
            </label>
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. Teni Limited Edition Hoodie"
              className="w-full rounded-lg border border-[#5F9597] bg-[#EBF2F2] px-3 py-2.5 text-sm text-[#919EAB] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5F9597]/30 "
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#787A7F] leading-6">
              Product Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-[#5F9597] bg-[#EBF2F2] px-3 py-2.5 text-sm text-[#919EAB] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5F9597]/30  "
            >
              <option value="">Clothing</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#787A7F] leading-6">
              Add to Collection
            </label>
            <select
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
              className="w-full rounded-lg border border-[#5F9597] bg-[#EBF2F2] px-3 py-2.5 text-sm text-[#919EAB] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5F9597]/30  "
            >
              <option value="">Festive Collection</option>
              {collections.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#787A7F] leading-6">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the product — materials, sizing, authenticity details..."
              rows={3}
              className="w-full resize-none rounded-lg border border-[#5F9597] bg-[#EBF2F2] px-3 py-2.5 text-sm text-[#919EAB] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5F9597]/30  "
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#787A7F] leading-6">
              Assign to Seller / Artist *
            </label>
            <div className="flex items-center gap-4 mb-2">
              <label className="flex items-center gap-1.5 text-sm text-black cursor-pointer">
                <input
                  type="radio"
                  checked={assignTo === "Seller"}
                  onChange={() => setAssignTo("Seller")}
                  className="accent-[#275759]"
                />
                Seller
              </label>
              <label className="flex items-center gap-1.5 text-sm text-black cursor-pointer">
                <input
                  type="radio"
                  checked={assignTo === "Artist"}
                  onChange={() => setAssignTo("Artist")}
                  className="accent-[#275759]"
                />
                Artist
              </label>
            </div>
            <input
              value={assignId}
              onChange={(e) => setAssignId(e.target.value)}
              placeholder="e.g seller id"
              className="w-full rounded-lg border border-[#5F9597] bg-[#EBF2F2] px-3 py-2.5 text-sm text-[#919EAB] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5F9597]/30  "
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#787A7F] leading-6 ">
            Product Images *
          </label>
          <div className="rounded-xl border-2 border-dashed border-[#1E4345] bg-[#EBF2F2] flex flex-col items-center justify-center text-center px-7 py-8">
            <div className="w-10 h-10 rounded-full bg-[#C1D6D7] flex items-center justify-center mb-2">
              <Upload size={18} className="text-[#326F72]" />
            </div>
            <p className="text-sm md:text-base font-medium text-black leading-6 mb-1">
              Upload product images
            </p>
            <p className="text-xs text-gray font-normal leading-4 mb-3">
              PNG, JPG, WEBP - up to 10MB each
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg bg-[#E6A400] px-4 py-2 text-sm font-medium text-white hover:bg-[#dd951b] cursor-pointer"
            >
              Choose Files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleChooseFiles}
            />
          </div>
          {images.length > 0 && (
            <p className="text-[10px] text-gray-500 mt-2">
              {images.length} image{images.length > 1 ? "s" : ""} selected
            </p>
          )}

          <div className="space-y-1.5 mt-4">
            <ChecklistRow
              done={productNameEntered}
              label="Product name entered"
            />
            <ChecklistRow done={priceSet} label="Price set" />
            <ChecklistRow
              done={imageUploaded}
              label="At least one image uploaded"
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-[#787A7F] leading-6 ">
            Product Details
          </p>
          <button
            onClick={addDetailRow}
            className="flex items-center gap-1 text-sm font-medium text-[#275759] hover:opacity-80 cursor-pointer"
          >
            <PlusCircle size={14} />
            Add more
          </button>
        </div>

        <div className="space-y-3">
          {details.map((row, i) => (
            <div key={i} className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm text-gray-500">
                  Colour
                </label>
                <div className="flex items-center rounded-lg border border-[#5F9597] bg-[#EBF2F2] px-3 py-2.5 text-sm text-[#919EAB] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5F9597]/30 ">
                  <input
                    value={row.colour}
                    onChange={(e) => updateDetail(i, "colour", e.target.value)}
                    placeholder="Red"
                    className="w-full bg-transparent text-sm text-[#101828] placeholder-gray-500 focus:outline-none"
                  />
                  <Palette size={14} className="text-[#919EAB] shrink-0" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-500">
                  Variants
                </label>
                <input
                  value={row.variants}
                  onChange={(e) => updateDetail(i, "variants", e.target.value)}
                  placeholder="S, M, L, XL"
                  className="w-full rounded-lg border border-[#5F9597] bg-[#EBF2F2] px-3 py-2.5 text-sm text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5F9597]/30  "
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-500">
                  Final Price
                </label>
                <div className="flex items-center rounded-lg border border-[#5F9597] bg-[#EBF2F2] px-3 py-2.5 text-sm text-[#919EAB] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5F9597]/30">
                  <span className="text-sm text-gray-500 mr-1 border-r border-[#79A6A8] px-2">
                    UGX
                  </span>
                  <input
                    value={row.finalPriceUGX}
                    onChange={(e) =>
                      updateDetail(i, "finalPriceUGX", e.target.value)
                    }
                    placeholder="18500"
                    className="w-full bg-transparent text-sm text-[#101828] placeholder-gray-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-500">
                  Stock Units
                </label>
                <input
                  value={row.stockUnits}
                  onChange={(e) =>
                    updateDetail(i, "stockUnits", e.target.value)
                  }
                  placeholder="50"
                  className="w-full rounded-lg border border-[#5F9597] bg-[#EBF2F2] px-3 py-2.5 text-sm text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5F9597]/30  "
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
    </ModalShell>
  );
};
