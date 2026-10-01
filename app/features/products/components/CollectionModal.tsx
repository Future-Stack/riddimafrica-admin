"use client";

import CommonButton from "@/app/components/common/button/CommonButton";
import CustomSwitch from "@/app/components/common/button/CustomSwitch";
import CommonHeader from "@/app/components/common/header/CommonHeader";
import ModalShell from "@/app/components/common/ModalSeel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export const collectionFormSchema = z.object({
  name: z.string().trim().min(1, "Collection name is required"),
  description: z.string().trim(),
  active: z.boolean(),
});

export type CollectionFormValues = z.infer<typeof collectionFormSchema>;

interface CollectionFormModalProps {
  isOpen: boolean;
  mode: "add" | "edit";
  initialValues?: CollectionFormValues;
  onClose: () => void;
  onSubmit: (values: CollectionFormValues) => Promise<void>;
}

const DEFAULT_VALUES: CollectionFormValues = {
  name: "",
  description: "",
  active: true,
};

export const CollectionFormModal = ({
  isOpen,
  mode,
  initialValues,
  onClose,
  onSubmit,
}: CollectionFormModalProps) => {
  const isEdit = mode === "edit";

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CollectionFormValues>({
    resolver: zodResolver(collectionFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (!isOpen) return;
    reset(initialValues ?? DEFAULT_VALUES);
  }, [isOpen, initialValues, reset]);

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
      title={isEdit ? "Edit Collection" : "Create Collection"}
      subtitle="Collections group products for the buyer app"
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
            htmlFor="collection-name"
            className="mb-1.5 block text-sm font-medium text-[#787A7F] leading-5"
          >
            Name *
          </label>
          <input
            id="collection-name"
            {...register("name")}
            placeholder="Festive Collection"
            className="w-full rounded-lg border border-[#5F9597] bg-[#EBF2F2] px-3 py-2.5 text-sm text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#036B2C]/20"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="collection-description"
            className="mb-1.5 block text-sm font-medium text-[#787A7F] leading-5"
          >
            Description
          </label>
          <textarea
            id="collection-description"
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
            loadingText={isEdit ? "Save Changes" : "Create Collection"}
          >
            {isEdit ? "Save Changes" : "Create Collection"}
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
