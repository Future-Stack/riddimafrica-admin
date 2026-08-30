import CommonButton from "@/app/components/common/button/CommonButton";
import ModalShell from "@/app/components/common/ModalSeel";
import React, { useState } from "react";

interface SuspendReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export const SuspendReasonModal: React.FC<SuspendReasonModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(reason);
    setReason("");
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="   Are you sure you want to Suspend
          the User Account"
      subtitle={""}
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
          <CommonButton type="submit" variant="danger" className="w-full!">
            Suspend
          </CommonButton>
          <CommonButton onClick={onClose} variant="cancel" className="w-full!">
            Cancel
          </CommonButton>
        </div>
      </form>
    </ModalShell>
  );
};
