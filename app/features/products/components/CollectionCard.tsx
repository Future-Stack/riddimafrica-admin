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

export function CollectionCard({ collection, onToggleActive, onEdit, onDelete }: CollectionCardProps) {
    return (
        <div className="bg-[#F9F5EF] border border-[#EEE2C7] rounded-xl p-4 flex flex-col font-inter">
            <div className="flex items-start justify-between mb-3">
                <p className="text-base md:text-lg font-semibold text-[#101828] leading-6">{collection.name}</p>
                <button
                    onClick={() => onToggleActive(collection.id, !collection.active)}
                    className={`w-9 h-5 rounded-full relative transition-colors cursor-pointer shrink-0 ${collection.active ? "bg-[#E6A400]" : "bg-gray-300"
                        }`}
                    aria-label={`Toggle ${collection.name} active`}
                >
                    <span
                        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${collection.active ? "translate-x-4" : ""
                            }`}
                    />
                </button>
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
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${collection.active ? "bg-[#3BB51533] border border-[#3BB51533] text-[#3BB515]" : "bg-gray-200 text-gray-500"
                        }`}
                >
                    {collection.active ? "ACTIVE" : "INACTIVE"}
                </span>
                <span className="text-xs text-[#787A7F] font-bold leading-4">
                    {collection.productCount} product{collection.productCount === 1 ? "" : "s"}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onEdit(collection)}
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
                    onClick={() => onDelete(collection.id)}
                    className="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-[#DB321C33] text-[#DB321C] hover:opacity-80 transition-opacity cursor-pointer"
                    aria-label={`Delete ${collection.name}`}
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
}