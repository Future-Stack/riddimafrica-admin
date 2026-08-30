import CommonButton from "@/app/components/common/button/CommonButton";
import ModalShell from "@/app/components/common/ModalSeel";
import { useState, type FormEvent } from "react";

interface SellerSuspendModalProps {
  isOpen: boolean;
  sellerName: string;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export const SellerSuspendModal = ({
  isOpen,
  sellerName,
  onClose,
  onConfirm,
}: SellerSuspendModalProps) => {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    onConfirm(reason.trim());
    setReason("");
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={handleClose}
      title={`Are you sure you want to Suspend ${sellerName}?`}
      maxWidthClassName="max-w-md"
      roundedClassName="rounded-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#3E2723]">
            Reason
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Suspend reason"
            rows={4}
            required
            className="w-full resize-none rounded-lg bg-[#FF0004]/10 border border-[#FFA8A9] text-[#DB321C] p-2"
          />
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4 w-full">
          <CommonButton
            type="submit"
            variant="danger"
            className="w-full!"
            disabled={!reason.trim()}
          >
            Suspend
          </CommonButton>
          <CommonButton
            onClick={handleClose}
            variant="cancel"
            className="w-full!"
          >
            Cancel
          </CommonButton>
        </div>
      </form>
    </ModalShell>
  );
};
