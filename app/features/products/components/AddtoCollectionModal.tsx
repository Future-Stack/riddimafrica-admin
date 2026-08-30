import CommonButton from "@/app/components/common/button/CommonButton";
import ModalShell from "@/app/components/common/ModalSeel";
import { useState } from "react";

export interface CollectionOption {
  id: string;
  name: string;
  productCount: number;
}

interface AddToCollectionModalProps {
  isOpen: boolean;
  productName?: string;
  collections?: CollectionOption[];
  onClose: () => void;
  onSave: (collectionId: string) => void;
}

const DEFAULT_COLLECTIONS: CollectionOption[] = [
  { id: "trending", name: "Trending", productCount: 3 },
  { id: "featured", name: "Featured", productCount: 3 },
  { id: "new-arrivals", name: "New Arrivals", productCount: 3 },
  { id: "limited-addition", name: "Limited Addition", productCount: 3 },
];

export const AddToCollectionModal = ({
  isOpen,
  productName,
  collections = DEFAULT_COLLECTIONS,
  onClose,
  onSave,
}: AddToCollectionModalProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleClose = () => {
    setSelectedId(null);
    onClose();
  };

  const handleSave = () => {
    if (!selectedId) return;
    onSave(selectedId);
    setSelectedId(null);
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={handleClose}
      title="Add to Collection"
      subtitle={productName}
      maxWidthClassName="max-w-md"
      roundedClassName="rounded-2xl"
    >
      <div className="space-y-2.5 mb-6">
        {collections.map((c) => (
          <label
            key={c.id}
            className="flex items-center justify-between bg-[#F9F5EF] rounded-lg px-4 py-3 cursor-pointer"
          >
            <div>
              <p className="text-sm font-semibold text-[#101828] leading-5">
                {c.name}
              </p>
              <p className="text-xs text-[#787A7F] font-normal leading-4 mt-0.5">
                {c.productCount} products
              </p>
            </div>
            <input
              type="radio"
              name="collection"
              checked={selectedId === c.id}
              onChange={() => setSelectedId(c.id)}
              className="w-[18px] h-[18px] accent-[#275759] cursor-pointer"
            />
          </label>
        ))}
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4 w-full">
        <CommonButton
          onClick={handleSave}
          variant="primary"
          className="w-full!"
          disabled={!selectedId}
        >
          Save
        </CommonButton>
        <CommonButton
          onClick={handleClose}
          variant="cancel"
          className="w-full!"
        >
          Cancel
        </CommonButton>
      </div>
    </ModalShell>
  );
};
