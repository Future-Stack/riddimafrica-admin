import CommonButton from "@/app/components/common/button/CommonButton";
import CustomSwitch from "@/app/components/common/button/CustomSwitch";
import { Pencil, Trash2 } from "lucide-react";

export interface CategoryCardData {
  id: number;
  name: string;
  description: string;
  createdDate: string;
  active: boolean;
  productCount: number;
}

interface CategoryCardProps {
  category: CategoryCardData;
  onToggleActive: (id: number, value: boolean) => void;
  onEdit: (category: CategoryCardData) => void;
  onDelete: (id: number) => void;
}

export const CategoryCard = ({
  category,
  onToggleActive,
  onEdit,
  onDelete,
}: CategoryCardProps) => {
  return (
    <div className="bg-[#F9F5EF] border border-[#EEE2C7] rounded-xl p-4 flex flex-col font-inter">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-medium text-[#1A0D07] leading-5">
            {category.name}
          </p>
          <p className="text-xs text-[#787A7F] font-bold leading-4 mt-0.5">
            {category.createdDate}
          </p>
        </div>
        <CustomSwitch
          checked={category.active}
          onCheckedChange={(value) => onToggleActive(category.id, value)}
        />
      </div>

      <p className="text-sm text-[#787A7F] leading-4 mb-4">
        {category.description}
      </p>

      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#C1D6D7] mt-auto">
        <span
          className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
            category.active
              ? "bg-[#3BB51533] border border-[#3BB51533] text-[#3BB515]"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {category.active ? "ACTIVE" : "INACTIVE"}
        </span>
        <span className="text-xs text-[#787A7F] font-bold leading-4">
          {category.productCount} product
          {category.productCount === 1 ? "" : "s"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <CommonButton
          onClick={() => onEdit(category)}
          variant="primary"
          className="flex-1!"
          leftIcon={<Pencil size={16} />}
        >
          Edit
        </CommonButton>
        <button
          type="button"
          onClick={() => onDelete(category.id)}
          className="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-[#DB321C33] text-[#DB321C] hover:opacity-80 transition-opacity cursor-pointer"
          aria-label={`Delete ${category.name}`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
