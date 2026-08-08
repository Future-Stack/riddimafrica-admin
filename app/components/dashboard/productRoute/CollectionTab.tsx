import { useState } from "react";
import { CollectionFormModal, CollectionFormValues } from "./CollectionModal";
import { CollectionCard, CollectionCardData } from "./CollectionCard";


const AVATAR_1 = "https://i.pravatar.cc/64?img=13";
const AVATAR_2 = "https://i.pravatar.cc/64?img=5";
const AVATAR_3 = "https://i.pravatar.cc/64?img=32";

const INITIAL_COLLECTIONS: CollectionCardData[] = [
    { id: 1, name: "Trending", active: true, productAvatars: [AVATAR_1, AVATAR_2, AVATAR_3], productCount: 3 },
    { id: 2, name: "Featured", active: true, productAvatars: [AVATAR_1, AVATAR_2], productCount: 3 },
    { id: 3, name: "New Arrivals", active: true, productAvatars: [AVATAR_1, AVATAR_2], productCount: 3 },
    { id: 4, name: "Limited Edition", active: true, productAvatars: [AVATAR_1, AVATAR_2], productCount: 3 },
];

export function CollectionTab() {
    const [collections, setCollections] = useState<CollectionCardData[]>(INITIAL_COLLECTIONS);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [editTarget, setEditTarget] = useState<CollectionCardData | null>(null);

    const handleToggleActive = (id: number, value: boolean) => {
        setCollections((prev) => prev.map((c) => (c.id === id ? { ...c, active: value } : c)));
    };

    const handleOpenAdd = () => {
        setModalMode("add");
        setEditTarget(null);
        setModalOpen(true);
    };

    const handleOpenEdit = (collection: CollectionCardData) => {
        setModalMode("edit");
        setEditTarget(collection);
        setModalOpen(true);
    };

    const handleDelete = (id: number) => {
        setCollections((prev) => prev.filter((c) => c.id !== id));
    };

    const handleSubmit = (values: CollectionFormValues) => {
        if (modalMode === "edit" && editTarget) {
            setCollections((prev) => prev.map((c) => (c.id === editTarget.id ? { ...c, name: values.name, active: values.active } : c)));
        } else {
            const nextId = Math.max(0, ...collections.map((c) => c.id)) + 1;
            setCollections((prev) => [
                ...prev,
                { id: nextId, name: values.name, active: values.active, productAvatars: [], productCount: 0 },
            ]);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">
                    {collections.filter((c) => c.active).length} active · {collections.filter((c) => !c.active).length} inactive
                </p>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#3C182F] text-white text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                >
                    + Create Collection
                </button>
            </div>

            {collections.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-xl p-10 text-center text-sm text-gray-400">
                    No collections yet — create one to get started.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {collections.map((collection) => (
                        <CollectionCard
                            key={collection.id}
                            collection={collection}
                            onToggleActive={handleToggleActive}
                            onEdit={handleOpenEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            <CollectionFormModal
                isOpen={modalOpen}
                mode={modalMode}
                initialValues={
                    modalMode === "edit" && editTarget
                        ? { name: editTarget.name, description: "", active: editTarget.active }
                        : undefined
                }
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </div>
    );
}