import CommonButton from "@/app/components/common/button/CommonButton";
import CustomSwitch from "@/app/components/common/button/CustomSwitch";
import { Pencil, Trash2 } from "lucide-react";

export interface CollectionCardData {
  id: number;
  name: string;
  active: boolean;
  productAvatars: string[];
  productCount: number;
}

interface CollectionCardProps {
  collection: CollectionCardData;
  onToggleActive: (id: number, value: boolean) => void;
  onEdit: (collection: CollectionCardData) => void;
  onDelete: (id: number) => void;
}

export const CollectionCard = ({
  collection,
  onToggleActive,
  onEdit,
  onDelete,
}: CollectionCardProps) => {
  return (
    <div className="bg-[#F9F5EF] border border-[#EEE2C7] rounded-xl p-4 flex flex-col font-inter">
      <div className="flex items-start justify-between mb-3">
        <p className="text-base md:text-lg font-semibold text-[#101828] leading-6">
          {collection.name}
        </p>
        <CustomSwitch
          checked={collection.active}
          onCheckedChange={(value) => onToggleActive(collection.id, value)}
        />
      </div>

      <div className="flex items-center mb-4">
        {collection.productAvatars.slice(0, 3).map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="w-9 h-9 rounded-full object-cover border-2 border-[#F9F5EF] -ml-2 first:ml-0"
          />
        ))}
        {collection.productAvatars.length > 3 && (
          <span className="w-9 h-9 rounded-full bg-gray-200 text-[10px] font-semibold text-gray-600 flex items-center justify-center -ml-2 border-2 border-[#F9F5EF]">
            +{collection.productAvatars.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#C1D6D7] mt-auto">
        <span
          className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
            collection.active
              ? "bg-[#3BB51533] border border-[#3BB51533] text-[#3BB515]"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {collection.active ? "ACTIVE" : "INACTIVE"}
        </span>
        <span className="text-xs text-[#787A7F] font-bold leading-4">
          {collection.productCount} product
          {collection.productCount === 1 ? "" : "s"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <CommonButton
          onClick={() => onEdit(collection)}
          variant="primary"
          className="flex-1!"
          leftIcon={<Pencil size={16} />}
        >
          Edit
        </CommonButton>
        <button
          type="button"
          onClick={() => onDelete(collection.id)}
          className="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-[#DB321C33] text-[#DB321C] hover:opacity-80 transition-opacity cursor-pointer"
          aria-label={`Delete ${collection.name}`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
