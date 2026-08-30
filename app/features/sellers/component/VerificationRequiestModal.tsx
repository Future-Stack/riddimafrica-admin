import CommonButton from "@/app/components/common/button/CommonButton";
import CommonHeader from "@/app/components/common/header/CommonHeader";
import InfoField from "@/app/components/common/header/InfoField";
import ModalShell from "@/app/components/common/ModalSeel";
import { Download, Eye, FileText } from "lucide-react";

export interface VerificationDocument {
  name: string;
  fileName: string;
  date: string;
}

export interface VerificationReviewData {
  kycId: string;
  submittedAt: string;
  name: string;
  handle: string;
  email: string;
  phone: string;
  business: string;
  businessType: string;
  paymentMethod: string;
  accountMasked: string;
  documents: VerificationDocument[];
}

interface VerificationBadgeReviewModalProps {
  isOpen: boolean;
  data: VerificationReviewData | null;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export const VerificationBadgeReviewModal = ({
  isOpen,
  data,
  onClose,
  onApprove,
  onReject,
}: VerificationBadgeReviewModalProps) => {
  if (!data) return null;

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Verification Badge Review"
      subtitle={`${data.kycId} · Submitted ${data.submittedAt}`}
      maxWidthClassName="max-w-3xl"
      roundedClassName="rounded-2xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 bg-[#F9F5EF] p-5 rounded-xl">
        <div className="space-y-3">
          <CommonHeader size="md" className="text-[#3E2723]! font-semibold">
            Seller Profile
          </CommonHeader>
          <div className="space-y-2.5">
            <InfoField variant="inline" label="Name" value={data.name} />
            <InfoField
              variant="inline"
              label="Handle"
              value={`@${data.handle}`}
            />
            <InfoField variant="inline" label="Email" value={data.email} />
            <InfoField variant="inline" label="Phone" value={data.phone} />
          </div>
        </div>

        <div className="space-y-3">
          <CommonHeader size="md" className="text-[#3E2723]! font-semibold">
            Business Details
          </CommonHeader>
          <div className="space-y-2.5">
            <InfoField variant="inline" label="Business" value={data.business} />
            <InfoField variant="inline" label="Type" value={data.businessType} />
            <InfoField
              variant="inline"
              label="Payment Method"
              value={data.paymentMethod}
            />
            <InfoField
              variant="inline"
              label="Account"
              value={data.accountMasked}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <CommonHeader size="lg" className="text-[#3E2723]!">
          Submitted Documents
        </CommonHeader>
        <div className="space-y-2">
          {data.documents.map((doc) => (
            <div
              key={doc.fileName}
              className="flex items-center justify-between bg-[#F1EAEE] border border-[#592346] rounded-[12px] p-4"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-[#3C182F] bg-[#431A34] p-2 rounded-sm">
                  <FileText size={16} className="text-[#EBF2F2]" />
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-800 font-inter leading-5 mb-1">
                    {doc.name}
                  </p>
                  <p className="text-xs text-[#787A7F] font-medium leading-4 font-inter">
                    {doc.fileName} · {doc.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="text-white bg-[#E5B54F] py-2 px-2.5 rounded-md hover:opacity-80 cursor-pointer"
                  aria-label="Preview"
                >
                  <Eye size={16} />
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 bg-[#431A34] text-white text-[11px] font-medium px-3 py-1.5 rounded-md hover:opacity-90 cursor-pointer"
                >
                  <Download size={12} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4 w-full">
        <CommonButton onClick={onApprove} variant="primary" className="w-full!">
          Approve
        </CommonButton>
        <CommonButton onClick={onReject} variant="danger" className="w-full!">
          Reject
        </CommonButton>
      </div>
    </ModalShell>
  );
};
