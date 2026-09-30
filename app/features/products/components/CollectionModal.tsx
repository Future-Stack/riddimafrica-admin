import CommonButton from "@/app/components/common/button/CommonButton";
import CustomSwitch from "@/app/components/common/button/CustomSwitch";
import CommonHeader from "@/app/components/common/header/CommonHeader";
import ModalShell from "@/app/components/common/ModalSeel";
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

export const CollectionFormModal = ({
  isOpen,
  mode,
  initialValues,
  onClose,
  onSubmit,
}: CollectionFormModalProps) => {
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
      <div className="flex items-center justify-between">
        <div>
          <CommonHeader size="md" className="text-[#3E2723]!">
            Active
          </CommonHeader>
          <CommonHeader size="xs" className="text-[#787A7F]!">
            Visible to sellers when listing products
          </CommonHeader>
        </div>
        <CustomSwitch
          checked={values.active}
          onCheckedChange={(active) => setValues((v) => ({ ...v, active }))}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#787A7F] leading-5">
          Name *
        </label>
        <input
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          placeholder="Festive Collection"
          className="w-full rounded-lg border border-[#5F9597] bg-[#EBF2F2] px-3 py-2.5 text-sm text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#036B2C]/20"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#787A7F] leading-5">
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

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4 w-full">
        <CommonButton
          onClick={handleSubmit}
          variant="primary"
          className="w-full!"
          disabled={!canSubmit}
        >
          {isEdit ? "Save Changes" : "Create Collection"}
        </CommonButton>
        <CommonButton
          onClick={handleClose}
          variant="secondary"
          className="w-full!"
        >
          Cancel
        </CommonButton>
      </div>
    </ModalShell>
  );
};
