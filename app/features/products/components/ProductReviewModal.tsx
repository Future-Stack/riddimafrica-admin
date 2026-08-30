import CommonButton from "@/app/components/common/button/CommonButton";
import CommonHeader from "@/app/components/common/header/CommonHeader";
import InfoField from "@/app/components/common/header/InfoField";
import ModalShell from "@/app/components/common/ModalSeel";
import { CalendarDays, Plus } from "lucide-react";
import { useRef, useState } from "react";
import { AddToCollectionModal, CollectionOption } from "./AddtoCollectionModal";
import { RejectProductModal } from "./RejectProductModal";
import {
  InspectionLocationOption,
  ScheduleInspectionModal,
  ScheduleInspectionPayload,
} from "./ScheduleInspectionModal";

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
  onApproveAndPublish: (
    id: number,
    updated: {
      images: string[];
      inspection: ProductInspectionState;
      variants: ProductVariantRow[];
    },
  ) => void;
  /** Optional overrides for the sub-modals; falls back to sensible demo defaults */
  collectionOptions?: CollectionOption[];
  inspectionLocations?: InspectionLocationOption[];
}

const INSPECTION_ITEMS: {
  key: keyof ProductInspectionState;
  title: string;
  description: string;
}[] = [
  {
    key: "qualityCheck",
    title: "Quality Check",
    description: "Material & finish meet standards",
  },
  {
    key: "authenticityVerified",
    title: "Authenticity Verified",
    description: "Genuine, not counterfeit",
  },
  {
    key: "noDefectsFound",
    title: "No Defects Found",
    description: "No visible damage",
  },
  {
    key: "sizeSpecsAccurate",
    title: "Size/Specs Accurate",
    description: "Matches submitted description",
  },
];

export const ProductReviewModal = ({
  isOpen,
  product,
  onClose,
  onSchedule,
  onRejectWithFeedback,
  onAddToCollection,
  onApproveAndPublish,
  collectionOptions,
  inspectionLocations,
}: ProductReviewModalProps) => {
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [inspection, setInspection] = useState<ProductInspectionState>(
    product?.inspection ?? {
      qualityCheck: false,
      authenticityVerified: false,
      noDefectsFound: false,
      sizeSpecsAccurate: false,
    },
  );
  const [variants, setVariants] = useState<ProductVariantRow[]>(
    product?.variants ?? [],
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loadedForId, setLoadedForId] = useState<number | null>(null);

  // sub-modal visibility
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [collectionModalOpen, setCollectionModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  if (!product) return null;

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

  const updateVariant = (
    index: number,
    field: keyof ProductVariantRow,
    value: string,
  ) => {
    setVariants((prev) =>
      prev.map((v, i) =>
        i === index
          ? {
              ...v,
              [field]:
                field === "stock" || field === "finalPriceUGX"
                  ? Number(value) || 0
                  : value,
            }
          : v,
      ),
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
        <div className="bg-[#F9F5EF] rounded-xl py-5.5 px-7 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <InfoField label="Product Name" value={product.productName} />
          <InfoField
            label="Seller / Artist"
            value={
              <div className="flex items-center gap-1.5">
                <img
                  src={product.submittedByAvatar}
                  alt={product.submittedByName}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="text-sm text-[#3E2723] font-medium leading-5">
                  {product.submittedByName}
                </span>
                <span className="text-[10px] bg-[#23BA7D26] text-[#23BA7D] px-3 py-0.5 leading-4 rounded-sm font-medium">
                  {product.submittedByRole}
                </span>
              </div>
            }
          />
          <InfoField label="Description" value={product.description} />
          <InfoField
            label="Listed Price"
            value={
              <CommonHeader size="md" className="text-yellow! font-medium">
                UGX {product.listedPriceUGX.toLocaleString()}
              </CommonHeader>
            }
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-inter">
          <div className="col-span-2">
            <div className="flex flex-col mb-4">
              <CommonHeader size="md" className="text-[#3E2723]!">
                Product Images
              </CommonHeader>
              <span className="text-xs text-[#787A7F] font-normal leading-4">
                {images.length} images
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-full h-[162px] aspect-square object-cover rounded-lg"
                />
              ))}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-[#E6A400] hover:text-yellow cursor-pointer"
              >
                <Plus size={18} />
                <span className="text-[10px] mt-1">Add photo</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAddPhoto}
              />
            </div>
          </div>

          <div className="col-span-1">
            <div className="flex items-center justify-between mb-3">
              <CommonHeader size="md" className="text-[#3E2723]!">
                Inspection
              </CommonHeader>
              <span className="text-xs text-[#787A7F] font-normal leading-4">
                {passedCount}/{INSPECTION_ITEMS.length} passed
              </span>
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
                    <p className="text-sm font-medium text-[#101828] leading-5">
                      {item.title}
                    </p>
                    <p className="text-xs text-[#787A7F] leading-4">
                      {item.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            {product.inspectionSchedule && (
              <div className="flex items-center gap-2 bg-[#23BA7D0D] border border-[#23BA7D4D] rounded-[8px] px-3 py-2.5 mt-2">
                <CalendarDays size={16} className="text-[#23BA7D]" />
                <div className="text-sm text-[#23BA7D]">
                  <button
                    type="button"
                    className="font-medium cursor-pointer leading-5 underline"
                    onClick={() => setScheduleModalOpen(true)}
                  >
                    Inspection Scheduled — Reschedule?
                  </button>
                  <p className="text-[#787A7F] text-xs font-medium leading-4">
                    {product.inspectionSchedule.label} ·{" "}
                    {product.inspectionSchedule.location}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3 border-t border-green-100">
          {variants.map((v, i) => (
            <div key={i} className="grid grid-cols-2 sm:grid-cols-4 mt-4 gap-3">
              <div>
                <p className="text-xs text-[#787A7F] font-medium leading-5 mb-1.5">
                  Colour
                </p>
                <input
                  value={v.colour}
                  onChange={(e) => updateVariant(i, "colour", e.target.value)}
                  className="w-full rounded-lg text-sm text-gray font-medium bg-[#EBF2F2] border border-[#5F9597] px-3 py-4 focus:outline-none focus:ring-2 focus:ring-[#036B2C]/20"
                />
              </div>
              <div>
                <p className="text-xs text-[#787A7F] font-medium leading-5 mb-1.5">
                  Variants
                </p>
                <input
                  value={v.variant}
                  onChange={(e) => updateVariant(i, "variant", e.target.value)}
                  className="w-full rounded-lg text-sm text-gray font-medium bg-[#EBF2F2] border border-[#5F9597] px-3 py-4 focus:outline-none focus:ring-2 focus:ring-[#036B2C]/20"
                />
              </div>
              <div>
                <p className="text-xs text-[#787A7F] font-medium leading-5 mb-1.5">
                  Stock
                </p>
                <input
                  value={v.stock}
                  onChange={(e) => updateVariant(i, "stock", e.target.value)}
                  className="w-full rounded-lg text-sm text-gray font-medium bg-[#EBF2F2] border border-[#5F9597] px-3 py-4 focus:outline-none focus:ring-2 focus:ring-[#036B2C]/20"
                />
              </div>
              <div>
                <p className="text-xs text-[#787A7F] font-medium leading-5 mb-1.5">
                  Final Price
                </p>
                <div className="flex items-center rounded-lg text-sm text-gray font-medium bg-[#EBF2F2] border border-[#5F9597] px-3 py-4">
                  <span className="mr-1">UGX</span>
                  <input
                    value={v.finalPriceUGX}
                    onChange={(e) =>
                      updateVariant(i, "finalPriceUGX", e.target.value)
                    }
                    className="w-full bg-transparent text-sm text-[#101828] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:flex-wrap sm:items-center w-full">
          <CommonButton
            onClick={() => setScheduleModalOpen(true)}
            variant="secondary"
            className="w-full! sm:w-auto! bg-[#23BA7D]! hover:bg-[#1ea06c]! border-0!"
          >
            Schedule
          </CommonButton>
          <CommonButton
            onClick={() => setRejectModalOpen(true)}
            variant="danger"
            className="w-full! sm:w-auto! bg-[#D4183D26]! text-[#FF6467]! hover:bg-[#ffeaea]! border border-[#D4183D26]!"
          >
            Reject with Feedback
          </CommonButton>
          <CommonButton
            onClick={() => setCollectionModalOpen(true)}
            variant="secondary"
            className="w-full! sm:w-auto! bg-[#E9DFE6]! text-[#64284E]! hover:bg-[#e6d9f5]! border border-[#6F2C57]!"
          >
            Add to Collection
          </CommonButton>
          <CommonButton
            onClick={() =>
              onApproveAndPublish(product.id, { images, inspection, variants })
            }
            variant="primary"
            className="w-full! sm:w-auto! sm:ml-auto"
          >
            Approve &amp; Publish
          </CommonButton>
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
};
