import { useState } from "react";
import { CircleX } from "lucide-react";

export interface CategoryFormValues {
    name: string;
    description: string;
    active: boolean;
}

interface CategoryFormModalProps {
    isOpen: boolean;
    mode: "add" | "edit";
    initialValues?: CategoryFormValues;
    onClose: () => void;
    onSubmit: (values: CategoryFormValues) => void;
}

const DEFAULT_VALUES: CategoryFormValues = { name: "", description: "", active: true };

export function CategoryFormModal({ isOpen, mode, initialValues, onClose, onSubmit }: CategoryFormModalProps) {
    const [values, setValues] = useState<CategoryFormValues>(initialValues ?? DEFAULT_VALUES);
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
        onSubmit({ ...values, name: values.name.trim(), description: values.description.trim() });
        handleClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 font-inter shadow-xl">
                <div className="flex items-start justify-between mb-1">
                    <h2 className="text-xl md:text-2xl font-bold text-[#101828] leading-7">
                        {isEdit ? "Edit Category" : "Add New Category"}
                    </h2>
                    <button onClick={handleClose} className="text-[#3E2723] hover:text-black cursor-pointer" aria-label="Close">
                        <CircleX size={20} />
                    </button>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                    {isEdit ? "Update this product category" : "Create a new product category"}
                </p>

                <div className="border-t border-gray-100 mb-5" />

                <div className="flex items-center justify-between mb-5">
                    <div>
                        <p className="text-sm font-semibold text-[#101828]">Active</p>
                        <p className="text-xs text-gray-400">Visible to sellers when listing products</p>
                    </div>
                    <button
                        onClick={() => setValues((v) => ({ ...v, active: !v.active }))}
                        className={`w-11 h-6 rounded-full relative transition-colors cursor-pointer shrink-0 ${values.active ? "bg-[#E6A400]" : "bg-gray-300"
                            }`}
                        aria-label="Toggle category active"
                    >
                        <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${values.active ? "translate-x-5" : ""
                                }`}
                        />
                    </button>
                </div>

                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-[#101828]">Category Name *</label>
                    <input
                        value={values.name}
                        onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                        placeholder="e.g. Streetwear"
                        className="w-full rounded-lg border border-[#DCEFE3] bg-[#F5FAF7] px-3 py-2.5 text-sm text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#036B2C]/20"
                    />
                </div>

                <div className="mb-6">
                    <label className="mb-1 block text-sm font-medium text-[#101828]">Description</label>
                    <textarea
                        value={values.description}
                        onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))}
                        placeholder="Describe the product — materials, sizing, authenticity details..."
                        rows={4}
                        className="w-full resize-none rounded-lg border border-[#DCEFE3] bg-[#F5FAF7] px-3 py-2.5 text-sm text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#036B2C]/20"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSubmit}
                        disabled={!canSubmit}
                        className="rounded-lg bg-[#E6A400] py-3 px-7 text-sm font-semibold text-white hover:bg-[#dd951b] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isEdit ? "Save Changes" : "Create Category"}
                    </button>
                    <button
                        onClick={handleClose}
                        className="rounded-lg bg-[#7C8591] py-3 px-7 text-sm font-medium text-white hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}