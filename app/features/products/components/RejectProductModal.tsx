import CommonButton from "@/app/components/common/button/CommonButton";
import ModalShell from "@/app/components/common/ModalSeel";
import { useState } from "react";

interface RejectProductModalProps {
  isOpen: boolean;
  productName?: string;
  onClose: () => void;
  onConfirm: (feedback: string) => void;
}

export const RejectProductModal = ({
  isOpen,
  productName,
  onClose,
  onConfirm,
}: RejectProductModalProps) => {
  const [feedback, setFeedback] = useState("");

  if (!isOpen) return null;

  const canReject = feedback.trim().length > 0;

  const handleConfirm = () => {
    if (!canReject) return;
    onConfirm(feedback.trim());
    setFeedback("");
  };

  const handleClose = () => {
    setFeedback("");
    onClose();
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={handleClose}
      title={`Are you sure you want to reject${productName ? ` "${productName}"` : " the product"}?`}
      maxWidthClassName="max-w-md"
      roundedClassName="rounded-2xl"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-[#3E2723]">
          Reason
        </label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
          placeholder="Explain what needs to change..."
          className="w-full resize-none rounded-lg bg-[#FF0004]/10 border border-[#FFA8A9] text-[#DB321C] p-2 placeholder-[#DB321C]/60"
        />
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4 w-full">
        <CommonButton
          onClick={handleConfirm}
          variant="danger"
          className="w-full!"
          disabled={!canReject}
        >
          Reject Product
        </CommonButton>
        <CommonButton
          onClick={handleClose}
          variant="cancel"
          className="w-full!"
        >
          Cancel
        </CommonButton>
      </div>
    </ModalShell>
  );
};
