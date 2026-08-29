"use client";

import { useState } from "react";
import { CategoryCard, CategoryCardData } from "./CetegoryCard";
import { CategoryFormModal, CategoryFormValues } from "./CategoryModal";


const INITIAL_CATEGORIES: CategoryCardData[] = [
    { id: 1, name: "Apparel", description: "Clothing, hoodies, t-shirts, and wearables", createdDate: "1 Jan 2025", active: true, productCount: 1 },
    { id: 2, name: "Music", description: "Digital and physical music products", createdDate: "1 Jan 2025", active: true, productCount: 1 },
    { id: 3, name: "Accessories", description: "Caps, jewellery, sunglasses, and extras", createdDate: "1 Jan 2025", active: true, productCount: 1 },
    { id: 4, name: "Prints", description: "Posters, art prints, and photography", createdDate: "1 Jan 2025", active: true, productCount: 1 },
    { id: 5, name: "Bags", description: "Tote bags, backpacks, and pouches", createdDate: "1 Jan 2025", active: true, productCount: 1 },
    { id: 6, name: "Digital Products", description: "Digital image", createdDate: "1 Jan 2025", active: true, productCount: 1 },
];

export function CategoryTab() {
    const [categories, setCategories] = useState<CategoryCardData[]>(INITIAL_CATEGORIES);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [editTarget, setEditTarget] = useState<CategoryCardData | null>(null);

    const handleToggleActive = (id: number, value: boolean) => {
        setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, active: value } : c)));
    };

    const handleOpenAdd = () => {
        setModalMode("add");
        setEditTarget(null);
        setModalOpen(true);
    };

    const handleOpenEdit = (category: CategoryCardData) => {
        setModalMode("edit");
        setEditTarget(category);
        setModalOpen(true);
    };

    const handleDelete = (id: number) => {
        setCategories((prev) => prev.filter((c) => c.id !== id));
    };

    const handleSubmit = (values: CategoryFormValues) => {
        if (modalMode === "edit" && editTarget) {
            setCategories((prev) => prev.map((c) => (c.id === editTarget.id ? { ...c, ...values } : c)));
        } else {
            const nextId = Math.max(0, ...categories.map((c) => c.id)) + 1;
            setCategories((prev) => [
                ...prev,
                {
                    id: nextId,
                    name: values.name,
                    description: values.description,
                    active: values.active,
                    createdDate: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
                    productCount: 0,
                },
            ]);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-[#787A7F] font-medium leading-4 ">
                    {categories.filter((c) => c.active).length} active · {categories.filter((c) => !c.active).length} inactive
                </p>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#904238] text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer "
                >
                    + Add Category
                </button>
            </div>

            {categories.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-xl p-10 text-center text-sm text-gray-400">
                    No categories yet — add one to get started.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            onToggleActive={handleToggleActive}
                            onEdit={handleOpenEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            <CategoryFormModal
                isOpen={modalOpen}
                mode={modalMode}
                initialValues={
                    modalMode === "edit" && editTarget
                        ? { name: editTarget.name, description: editTarget.description, active: editTarget.active }
                        : undefined
                }
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </div>
    );
}