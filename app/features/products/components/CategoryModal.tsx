"use client";

import CommonButton from "@/app/components/common/button/CommonButton";
import CustomSwitch from "@/app/components/common/button/CustomSwitch";
import CommonHeader from "@/app/components/common/header/CommonHeader";
import ModalShell from "@/app/components/common/ModalSeel";
import { useGetCategoryByIdQuery } from "@/store/features/category/categoryAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().trim().min(1, "Category name is required"),
  description: z.string().trim(),
  active: z.boolean(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

interface CategoryFormModalProps {
  isOpen: boolean;
  mode: "add" | "edit";
  categoryId?: string;
  initialValues?: CategoryFormValues;
  onClose: () => void;
  onSubmit: (values: CategoryFormValues) => Promise<void>;
}

const DEFAULT_VALUES: CategoryFormValues = {
  name: "",
  description: "",
  active: true,
};

export const CategoryFormModal = ({
  isOpen,
  mode,
  categoryId,
  initialValues,
  onClose,
  onSubmit,
}: CategoryFormModalProps) => {
  const isEdit = mode === "edit";

  const { data: categoryResponse } = useGetCategoryByIdQuery(categoryId ?? "", {
    skip: !isOpen || !isEdit || !categoryId,
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (!isOpen) return;
    reset(initialValues ?? DEFAULT_VALUES);
  }, [isOpen, initialValues, reset]);

  useEffect(() => {
    const category = categoryResponse?.data;
    if (!isOpen || !isEdit || !category || isDirty) return;

    reset({
      name: category.title ?? "",
      description: category.description ?? "",
      active: category.status === "ACTIVE",
    });
  }, [categoryResponse, isDirty, isEdit, isOpen, reset]);

  if (!isOpen) return null;

  const handleClose = () => {
    reset(DEFAULT_VALUES);
    onClose();
  };

  const submitForm = handleSubmit(async (values) => {
    try {
      await onSubmit(values);
      handleClose();
    } catch {
      // The API layer already shows the error toast.
    }
  });

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={handleClose}
      title={isEdit ? "Edit Category" : "Add New Category"}
      subtitle={
        isEdit
          ? "Update this product category"
          : "Create a new product category"
      }
      maxWidthClassName="max-w-[602px]"
      roundedClassName="rounded-2xl"
    >
      <form onSubmit={submitForm} noValidate className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <CommonHeader size="md" className="text-[#3E2723]!">
              Active
            </CommonHeader>
            <CommonHeader size="xs" className="text-[#787A7F]!">
              Visible to sellers when listing products
            </CommonHeader>
          </div>
          <Controller
            control={control}
            name="active"
            render={({ field }) => (
              <CustomSwitch
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={isSubmitting}
              />
            )}
          />
        </div>

        <div>
          <label
            htmlFor="category-name"
            className="mb-1.5 block text-sm font-medium text-[#787A7F] leading-5"
          >
            Category Name *
          </label>
          <input
            id="category-name"
            {...register("name")}
            placeholder="e.g. Streetwear"
            className="w-full rounded-lg border border-[#5F9597] bg-[#EBF2F2] px-3 py-2.5 text-sm text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#036B2C]/20"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="category-description"
            className="mb-1.5 block text-sm font-medium text-[#787A7F] leading-5"
          >
            Description
          </label>
          <textarea
            id="category-description"
            {...register("description")}
            placeholder="Describe the product — materials, sizing, authenticity details..."
            rows={4}
            className="w-full resize-none rounded-lg border border-[#5F9597] bg-[#EBF2F2] px-3 py-2.5 text-sm text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#036B2C]/20"
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4 w-full">
          <CommonButton
            type="submit"
            variant="primary"
            className="w-full!"
            isLoading={isSubmitting}
            loadingText={isEdit ? "Save Changes" : "Create Category"}
          >
            {isEdit ? "Save Changes" : "Create Category"}
          </CommonButton>
          <CommonButton
            type="button"
            onClick={handleClose}
            variant="secondary"
            className="w-full!"
            disabled={isSubmitting}
          >
            Cancel
          </CommonButton>
        </div>
      </form>
    </ModalShell>
  );
};
