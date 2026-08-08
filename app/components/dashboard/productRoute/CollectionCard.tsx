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
        <div className="bg-[#F9F5EF] border border-[#EFE5D8] rounded-xl p-4 flex flex-col font-inter">
            <div className="flex items-start justify-between mb-3">
                <p className="text-sm font-semibold text-[#101828]">{collection.name}</p>
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

            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#EFE5D8] mt-auto">
                <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${collection.active ? "bg-[#DFF3E4] text-[#036B2C]" : "bg-gray-200 text-gray-500"
                        }`}
                >
                    {collection.active ? "ACTIVE" : "INACTIVE"}
                </span>
                <span className="text-xs text-gray-500">
                    {collection.productCount} product{collection.productCount === 1 ? "" : "s"}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onEdit(collection)}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-[#E6A400] py-2.5 text-sm font-medium text-white hover:bg-[#dd951b] transition-colors cursor-pointer"
                >
                    <Pencil size={14} />
                    Edit
                </button>
                <button
                    onClick={() => onDelete(collection.id)}
                    className="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-[#FBDCE0] text-[#b84b42] hover:opacity-80 transition-opacity cursor-pointer"
                    aria-label={`Delete ${collection.name}`}
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
}