import { useState } from "react";
import { ModalShell } from "../../reusable/ModalSeel";

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

export function AddToCollectionModal({
    isOpen,
    productName,
    collections = DEFAULT_COLLECTIONS,
    onClose,
    onSave,
}: AddToCollectionModalProps) {
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
                            <p className="text-sm font-semibold text-[#101828] leading-5">{c.name}</p>
                            <p className="text-xs text-[#787A7F] font-normal leading-4 mt-0.5">{c.productCount} products</p>
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

            <div className="flex items-center gap-3">
                <button
                    onClick={handleSave}
                    disabled={!selectedId}
                    className="rounded-lg bg-[#E6A400] py-2.5 px-6 text-sm font-semibold text-white hover:bg-[#dd951b] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Save
                </button>
                <button
                    onClick={handleClose}
                    className="rounded-lg border border-gray-300 bg-white py-2.5 px-6 text-sm font-medium text-[#101828] hover:bg-gray-50 transition-colors cursor-pointer"
                >
                    Cancel
                </button>
            </div>
        </ModalShell>
    );
}