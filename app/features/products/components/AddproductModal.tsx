import { ModalShell } from "@/app/components/common/ModalSeel";
import { Circle, PlusCircle, Upload } from "lucide-react";
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

export function AddProductModal({
  isOpen,
  categories,
  collections,
  onClose,
  onPublish,
}: AddProductModalProps) {
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M17.0009 8.11498C17.8894 9.0035 18.3337 9.44776 18.3337 9.99982C18.3336 10.5519 17.8894 10.9962 17.0008 11.8847C16.4035 12.482 16.2201 12.8677 16.2201 13.7064C16.2201 14.3702 16.3488 15.3145 15.8258 15.8332C15.3068 16.3477 14.3664 16.2196 13.7069 16.2196C12.8974 16.2196 12.5076 16.3779 11.9299 16.9557C11.4379 17.4476 10.7784 18.3332 10.0003 18.3332C9.22224 18.3332 8.56276 17.4477 8.0708 16.9557C7.49306 16.3779 7.10323 16.2196 6.29371 16.2196C5.63422 16.2196 4.69381 16.3477 4.1749 15.8332C3.65183 15.3145 3.78056 14.3702 3.78056 13.7064C3.78056 12.8677 3.59712 12.482 2.99981 11.8847C2.11127 10.9962 1.66701 10.5519 1.66699 9.99982C1.667 9.44776 2.11126 9.0035 2.99979 8.11498C3.53299 7.58177 3.78056 7.0534 3.78056 6.29322C3.78056 5.63372 3.6524 4.69329 4.16699 4.17437C4.68568 3.65132 5.63 3.78005 6.29372 3.78005C7.05389 3.78005 7.58226 3.53251 8.11545 2.99931C9.00399 2.11077 9.44826 1.6665 10.0003 1.6665C10.5524 1.6665 10.9967 2.11077 11.8852 2.99931M15.8258 15.8332H15.8337"
            stroke="#377A7D"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.66699 8.58958C6.66699 8.58958 8.54199 8.33317 10.0003 11.6665C10.0003 11.6665 14.216 3.33317 18.3337 1.6665"
            stroke="#377A7D"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_41366_4225)">
                      <path
                        d="M6.97017 9.5275L7.24361 10.6911L6.97017 11.7477C6.33391 11.7477 5.56276 11.896 5.00823 11.6689C4.42006 11.4281 4.05502 10.7992 3.61279 10.357L4.15967 9.26338L5.18301 8.78711C5.64017 9.2446 6.27219 9.5275 6.97017 9.5275Z"
                        fill="#EE61EB"
                      />
                      <path
                        d="M5.18291 8.78716V8.78746L3.61269 10.3574C3.18312 9.9278 2.56203 9.44363 2.32176 8.87562C2.08147 8.30752 2.22199 7.65559 2.22199 7L3.39974 6.72656L4.44252 7C4.44255 7.69765 4.72544 8.32967 5.18291 8.78716Z"
                        fill="#0065A3"
                      />
                      <path
                        d="M5.18295 5.21277C4.72549 5.67023 4.44257 6.30228 4.44257 6.99995H2.22204C2.22204 6.40892 2.02926 5.65171 2.2266 5.12978C2.46704 4.49384 3.14087 4.11445 3.61274 3.64258L4.77622 4.25921L5.18295 5.21277Z"
                        fill="#99EEFF"
                      />
                      <path
                        d="M6.9702 2.25181L7.24363 3.36314L6.9702 4.47204C6.27195 4.47204 5.6402 4.75524 5.18301 5.2127L3.61279 3.64248C4.04236 3.21291 4.2805 2.5918 4.84857 2.3515C5.41663 2.11123 6.31463 2.25181 6.9702 2.25181Z"
                        fill="#93E300"
                      />
                      <path
                        d="M10.3276 3.64279L9.77779 4.73947L8.75768 5.2127C8.30021 4.75524 7.66816 4.47232 6.97021 4.47232V2.25209C7.60257 2.25209 8.47945 2.1023 9.03119 2.32671C9.62341 2.56758 9.88265 3.19799 10.3276 3.64279Z"
                        fill="#FFF375"
                      />
                      <path
                        d="M11.7182 6.99995L10.6 7.27339L9.49771 6.99995C9.49771 6.30198 9.21481 5.66995 8.75732 5.21249L10.3272 3.64258H10.3275C10.7723 4.08738 11.4028 4.34662 11.6436 4.93889C11.868 5.49066 11.7182 6.3676 11.7182 6.99995Z"
                        fill="#FFC34D"
                      />
                      <path
                        d="M11.7182 7C11.7182 7.63238 12.0595 8.42726 11.8351 8.97898C11.5942 9.57138 10.7723 9.91268 10.3272 10.3574L9.29083 9.86787L8.75732 8.78749C9.21479 8.33003 9.49771 7.69798 9.49771 7.00003H11.7182V7Z"
                        fill="#FF3377"
                      />
                      <path
                        d="M10.3276 10.3571C9.89788 10.7866 9.46837 11.4078 8.90033 11.648C8.33232 11.8883 7.62578 11.7478 6.97021 11.7478V9.5275C7.66819 9.5275 8.30021 9.2446 8.75768 8.78711L10.3276 10.3571Z"
                        fill="#FF5CA8"
                      />
                      <path
                        d="M6.96972 11.7482L7.24316 12.9154L6.96972 13.9997C5.04081 13.9919 3.2963 13.2039 2.03516 11.9346L2.54588 10.877L3.61234 10.3574C4.47151 11.2166 5.65859 11.7482 6.96972 11.7482Z"
                        fill="#C331C8"
                      />
                      <path
                        d="M11.9347 11.9645C10.6692 13.2225 8.92557 14 7.00013 14C6.99026 14 6.98009 14 6.97021 13.9997V11.7481C8.28135 11.7481 9.46815 11.2166 10.3276 10.3574L11.4877 10.9707L11.9347 11.9645Z"
                        fill="#FF3377"
                      />
                      <path
                        d="M13.9997 7C13.9997 8.94053 13.2099 10.6969 11.9342 11.9645L10.3271 10.3574C11.1866 9.49851 11.7182 8.31141 11.7182 7L12.8786 6.72656L13.9997 7Z"
                        fill="#E50048"
                      />
                      <path
                        d="M13.9999 6.99963H11.7183C11.7183 5.6885 11.1868 4.50143 10.3276 3.64226L10.8678 2.55507L11.9344 2.03516C13.2101 3.3027 13.9999 5.0591 13.9999 6.99963Z"
                        fill="#FF9933"
                      />
                      <path
                        d="M11.9347 2.03552L10.3279 3.64263H10.3276C9.46812 2.78346 8.28132 2.25192 6.97021 2.25192L6.69678 1.2305L6.97021 0.000300781C6.98009 0 6.99026 0 7.00013 0C8.92557 0 10.6692 0.777547 11.9347 2.03552Z"
                        fill="#FFDE46"
                      />
                      <path
                        d="M6.96972 0.000976562V2.2526C5.65861 2.2526 4.47151 2.78413 3.61234 3.6433L2.56418 3.14201L2.03516 2.06611C3.2963 0.796816 5.04081 0.00879688 6.96972 0.000976562Z"
                        fill="#00DA26"
                      />
                      <path
                        d="M3.61271 3.64262C2.75352 4.50179 2.22198 5.68886 2.22198 6.99999L1.02996 7.27343L0 6.99999C0 5.07455 0.777547 3.33095 2.03552 2.06543L3.61271 3.64262Z"
                        fill="#33DDFF"
                      />
                      <path
                        d="M3.61271 10.3574L2.03552 11.9346C0.777547 10.669 0 8.92544 0 7H2.22198C2.22198 8.31113 2.75352 9.49821 3.61271 10.3574Z"
                        fill="#194D80"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_41366_4225">
                        <rect width="14" height="14" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
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
}
