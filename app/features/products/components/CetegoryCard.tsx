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
        <div className="bg-[#F9F5EF] border border-[#EEE2C7] rounded-xl p-4 flex flex-col font-inter">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <p className="text-sm font-medium text-[#1A0D07] leading-5">{category.name}</p>
                    <p className="text-xs text-[#787A7F] font-bold leading-4 mt-0.5">{category.createdDate}</p>
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

            <p className="text-sm text-[#787A7F] leading-4 mb-4">{category.description}</p>

            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#C1D6D7] mt-auto">
                <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${category.active ? "bg-[#3BB51533] border border-[#3BB51533] text-[#3BB515]" : "bg-gray-200 text-gray-500"
                        }`}
                >
                    {category.active ? "ACTIVE" : "INACTIVE"}
                </span>
                <span className="text-xs text-[#787A7F] font-bold leading-4">
                    {category.productCount} product{category.productCount === 1 ? "" : "s"}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onEdit(category)}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-[#E6A400] py-2.5 text-sm font-medium text-white hover:bg-[#dd951b] transition-colors cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8.83958 2.39982L3.36624 8.19315C3.15958 8.41315 2.95958 8.84649 2.91958 9.14649L2.67291 11.3065C2.58624 12.0865 3.14624 12.6198 3.91958 12.4865L6.06624 12.1198C6.36624 12.0665 6.78624 11.8465 6.99291 11.6198L12.4662 5.82649C13.4129 4.82649 13.8396 3.68649 12.3662 2.29315C10.8996 0.913152 9.78624 1.39982 8.83958 2.39982Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7.92676 3.3667C8.21342 5.2067 9.70676 6.61337 11.5601 6.80003" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M2 14.6665H14" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Edit
                </button>
                <button
                    onClick={() => onDelete(category.id)}
                    className="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-[#DB321C33] text-[#DB321C] hover:opacity-80 transition-opacity cursor-pointer"
                    aria-label={`Delete ${category.name}`}
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
}