"use client";

import {
  categoryAPI,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/store/features/category/categoryAPI";
import type { Category } from "@/store/features/category/types/categoryTypes";
import { useAppDispatch } from "@/store/hooks";
import { useMemo, useState } from "react";
import { CategoryFormModal, CategoryFormValues } from "./CategoryModal";
import { CategoryCard, CategoryCardData } from "./CetegoryCard";

const formatCreatedDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const toCategoryCard = (category: Category): CategoryCardData => ({
  id: category.categoryId,
  name: category.title,
  description: category.description ?? "",
  createdDate: formatCreatedDate(category.createdAt),
  active: category.status === "ACTIVE",
  productCount: category.products ?? 0,
});

const toPayload = (values: CategoryFormValues) => ({
  title: values.name,
  description: values.description,
  status: values.active ? ("ACTIVE" as const) : ("INACTIVE" as const),
});

export const CategoryTab = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editTarget, setEditTarget] = useState<CategoryCardData | null>(null);
  const [formDefaults, setFormDefaults] = useState<
    CategoryFormValues | undefined
  >(undefined);

  const categories = useMemo(
    () => (data?.data ?? []).map(toCategoryCard),
    [data],
  );

  const activeCount = categories.filter((category) => category.active).length;
  const inactiveCount = categories.length - activeCount;

  const handleToggleActive = async (id: string, value: boolean) => {
    const patch = dispatch(
      categoryAPI.util.updateQueryData("getCategories", undefined, (draft) => {
        const category = draft.data?.find((item) => item.categoryId === id);
        if (category) {
          category.status = value ? "ACTIVE" : "INACTIVE";
        }
      }),
    );

    try {
      await updateCategory({
        id,
        data: { status: value ? "ACTIVE" : "INACTIVE" },
      }).unwrap();
    } catch {
      patch.undo();
    }
  };

  const handleOpenAdd = () => {
    setModalMode("add");
    setEditTarget(null);
    setFormDefaults(undefined);
    setModalOpen(true);
  };

  const handleOpenEdit = (category: CategoryCardData) => {
    setModalMode("edit");
    setEditTarget(category);
    setFormDefaults({
      name: category.name,
      description: category.description,
      active: category.active,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const patch = dispatch(
      categoryAPI.util.updateQueryData("getCategories", undefined, (draft) => {
        if (!Array.isArray(draft.data)) return;
        draft.data = draft.data.filter(
          (category) => category.categoryId !== id,
        );
      }),
    );

    try {
      await deleteCategory(id).unwrap();
    } catch {
      patch.undo();
    }
  };

  const handleSubmit = async (values: CategoryFormValues) => {
    const payload = toPayload(values);

    if (modalMode === "edit" && editTarget) {
      await updateCategory({ id: editTarget.id, data: payload }).unwrap();
      return;
    }

    await createCategory(payload).unwrap();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-[#787A7F] font-medium leading-4 ">
          {activeCount} active · {inactiveCount} inactive
        </p>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#904238] text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer "
        >
          + Add Category
        </button>
      </div>

      {isLoading ? (
        <div className="bg-white border border-gray-100 rounded-xl p-10 text-center text-sm text-gray-400">
          Loading categories...
        </div>
      ) : isError ? (
        <div className="bg-white border border-gray-100 rounded-xl p-10 text-center text-sm text-gray-400">
          Unable to load categories.
        </div>
      ) : categories.length === 0 ? (
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
        categoryId={modalMode === "edit" ? editTarget?.id : undefined}
        initialValues={formDefaults}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
