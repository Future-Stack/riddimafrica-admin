import { ModalShell } from "@/app/components/reusable/ModalSeel";
import { useState } from "react";

interface RejectProductModalProps {
  isOpen: boolean;
  productName?: string;
  onClose: () => void;
  onConfirm: (feedback: string) => void;
}

export function RejectProductModal({
  isOpen,
  productName,
  onClose,
  onConfirm,
}: RejectProductModalProps) {
  const [feedback, setFeedback] = useState("");
  const [loadedForOpen, setLoadedForOpen] = useState(false);

  // reset the textarea each time the modal is (re)opened
  if (isOpen && !loadedForOpen) {
    setLoadedForOpen(true);
    setFeedback("");
  } else if (!isOpen && loadedForOpen) {
    setLoadedForOpen(false);
  }

  const canReject = feedback.trim().length > 0;

  const handleConfirm = () => {
    if (!canReject) return;
    onConfirm(feedback.trim());
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      maxWidthClassName="max-w-[420px]"
      roundedClassName="rounded-2xl"
      header={
        <div className="flex-1 pl-6">
          <h2 className="text-lg sm:text-xl font-semibold text-[#101828] leading-7 text-center">
            Are you sure you want to reject
            {productName ? ` "${productName}"` : " the product"}?
          </h2>
        </div>
      }
    >
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#787A7F] leading-5">
          Reason
        </label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
          placeholder="Explain what needs to change..."
          className="w-full resize-none rounded-lg border border-[#FFA8A9] bg-[#FF00041A] p-3 text-sm text-[#DB321C] placeholder-[#DB321C]/60 focus:outline-none focus:ring-2 focus:ring-red-100"
        />
      </div>

      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={handleConfirm}
          disabled={!canReject}
          className="rounded-lg bg-[#D4183D] py-2.5 px-6 text-sm font-semibold text-white hover:bg-[#B5122F] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reject Product
        </button>
        <button
          onClick={onClose}
          className="rounded-lg border border-gray-300 bg-white py-2.5 px-6 text-sm font-medium text-[#101828] hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </ModalShell>
  );
}
