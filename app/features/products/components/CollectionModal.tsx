import { ModalShell } from "@/app/components/reusable/ModalSeel";
import { useState } from "react";

export interface CollectionFormValues {
  name: string;
  description: string;
  active: boolean;
}

interface CollectionFormModalProps {
  isOpen: boolean;
  mode: "add" | "edit";
  initialValues?: CollectionFormValues;
  onClose: () => void;
  onSubmit: (values: CollectionFormValues) => void;
}

const DEFAULT_VALUES: CollectionFormValues = {
  name: "",
  description: "",
  active: true,
};

export function CollectionFormModal({
  isOpen,
  mode,
  initialValues,
  onClose,
  onSubmit,
}: CollectionFormModalProps) {
  const [values, setValues] = useState<CollectionFormValues>(
    initialValues ?? DEFAULT_VALUES,
  );
  const [loadedKey, setLoadedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const key = `${mode}-${initialValues?.name ?? "new"}`;
  if (loadedKey !== key) {
    setLoadedKey(key);
    setValues(initialValues ?? DEFAULT_VALUES);
  }

  const isEdit = mode === "edit";
  const canSubmit = values.name.trim().length > 0;

  const handleClose = () => {
    setValues(DEFAULT_VALUES);
    setLoadedKey(null);
    onClose();
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit({
      ...values,
      name: values.name.trim(),
      description: values.description.trim(),
    });
    handleClose();
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={handleClose}
      title={isEdit ? "Edit Collection" : "Create Collection"}
      subtitle="Collections group products for the buyer app"
      maxWidthClassName="max-w-[602px]"
      roundedClassName="rounded-2xl"
    >
      <div className="border-t border-[#C1D6D7] mb-6" />

      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-base font-medium text-[#101828] leading-6">
            Active
          </p>
          <p className="text-xs text-[#787A7F] font-medium leading-4">
            Visible to sellers when listing products
          </p>
        </div>
        <button
          onClick={() => setValues((v) => ({ ...v, active: !v.active }))}
          className={`w-11 h-6 rounded-full relative transition-colors cursor-pointer shrink-0 ${
            values.active ? "bg-[#E6A400]" : "bg-gray-300"
          }`}
          aria-label="Toggle collection active"
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
              values.active ? "translate-x-5" : ""
            }`}
          />
        </button>
      </div>

      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-[#787A7F] leading-5 ">
          Name *
        </label>
        <input
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          placeholder="Festive Collection"
          className="w-full rounded-lg border border-[#5F9597] bg-[#EBF2F2] px-3 py-2.5 text-sm text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#036B2C]/20"
        />
      </div>

      <div className="mb-6">
        <label className="mb-1.5 block text-sm font-medium text-[#787A7F] leading-5 ">
          Description
        </label>
        <textarea
          value={values.description}
          onChange={(e) =>
            setValues((v) => ({ ...v, description: e.target.value }))
          }
          placeholder="Describe the product — materials, sizing, authenticity details..."
          rows={4}
          className="w-full resize-none rounded-lg border border-[#5F9597] bg-[#EBF2F2] px-3 py-2.5 text-sm text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#036B2C]/20"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="rounded-lg bg-[#E6A400] py-3 px-7 text-sm font-semibold text-white hover:bg-[#dd951b] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isEdit ? "Save Changes" : "Create Collection"}
        </button>
        <button
          onClick={handleClose}
          className="rounded-lg bg-[#7C8591] py-3 px-7 text-sm font-medium text-white hover:opacity-90 transition-opacity cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </ModalShell>
  );
}
