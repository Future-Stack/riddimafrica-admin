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

export function CategoryCard({ category, onToggleActive, onEdit, onDelete }: CategoryCardProps) {
    return (
        <div className="bg-[#F9F5EF] border border-[#EFE5D8] rounded-xl p-4 flex flex-col font-inter">
            <div className="flex items-start justify-between mb-1">
                <div>
                    <p className="text-sm font-semibold text-[#101828]">{category.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{category.createdDate}</p>
                </div>
                <button
                    onClick={() => onToggleActive(category.id, !category.active)}
                    className={`w-9 h-5 rounded-full relative transition-colors cursor-pointer shrink-0 ${category.active ? "bg-[#E6A400]" : "bg-gray-300"
                        }`}
                    aria-label={`Toggle ${category.name} active`}
                >
                    <span
                        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${category.active ? "translate-x-4" : ""
                            }`}
                    />
                </button>
            </div>

            <p className="text-xs text-gray-500 leading-4 mb-4">{category.description}</p>

            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#EFE5D8] mt-auto">
                <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${category.active ? "bg-[#DFF3E4] text-[#036B2C]" : "bg-gray-200 text-gray-500"
                        }`}
                >
                    {category.active ? "ACTIVE" : "INACTIVE"}
                </span>
                <span className="text-xs text-gray-500">
                    {category.productCount} product{category.productCount === 1 ? "" : "s"}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onEdit(category)}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-[#E6A400] py-2.5 text-sm font-medium text-white hover:bg-[#dd951b] transition-colors cursor-pointer"
                >
                    <Pencil size={14} />
                    Edit
                </button>
                <button
                    onClick={() => onDelete(category.id)}
                    className="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-[#FBDCE0] text-[#b84b42] hover:opacity-80 transition-opacity cursor-pointer"
                    aria-label={`Delete ${category.name}`}
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
}