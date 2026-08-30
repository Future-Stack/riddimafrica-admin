import CommonButton from "@/app/components/common/button/CommonButton";
import CustomSwitch from "@/app/components/common/button/CustomSwitch";
import StatusBadge from "@/app/components/common/button/StatusBadge";
import CommonHeader from "@/app/components/common/header/CommonHeader";
import InfoField from "@/app/components/common/header/InfoField";
import ModalShell from "@/app/components/common/ModalSeel";
import { BadgeCheck } from "lucide-react";
import { useState } from "react";
import {
  VerificationBadgeReviewModal,
  VerificationReviewData,
} from "./VerificationRequiestModal";

export interface SellerKycDocument {
  name: string;
  linkLabel: string;
}

export interface SellerPayout {
  date: string;
  amountUGX: number;
  status: "Paid" | "Pending";
}

export interface SellerProfileData {
  id: number;
  name: string;
  email: string;
  avatar: string;
  business: string;
  status: "Active" | "Pending" | "Rejected" | "Suspended";
  kycStatus: "Verified" | "Pending";
  productsListed: number;
  totalSalesUGX: number;
  joined: string;
  featuredOnHomepage: boolean;
  totalOrders: number;
  returns: number;
  rating: number;
  responseRate: number;
  kycDocuments: SellerKycDocument[];
  recentPayouts: SellerPayout[];
  verificationRequestStatus: "Pending" | "Complete";
  verificationReview: VerificationReviewData;
}

interface SellerProfileModalProps {
  isOpen: boolean;
  seller: SellerProfileData | null;
  onClose: () => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onMessage: (id: number) => void;
  onToggleFeatured: (id: number, value: boolean) => void;
}

export const SellerProfileModal = ({
  isOpen,
  seller,
  onClose,
  onApprove,
  onReject,
  onMessage,
  onToggleFeatured,
}: SellerProfileModalProps) => {
  const [reviewOpen, setReviewOpen] = useState(false);

  if (!seller) return null;

  const verificationLabel =
    seller.verificationRequestStatus === "Complete" ? "Verified" : "Pending";

  const activityStats = [
    { label: "Total Orders", value: seller.totalOrders },
    { label: "Returns", value: String(seller.returns).padStart(2, "0") },
    { label: "Rating", value: `${seller.rating} / 5` },
    { label: "Response Rate", value: `${seller.responseRate}%` },
  ];

  return (
    <>
      <ModalShell
        isOpen={isOpen && !reviewOpen}
        onClose={onClose}
        title="Seller Details"
        maxWidthClassName="max-w-2xl"
        roundedClassName="rounded-2xl"
      >
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={seller.avatar}
                alt={seller.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <CommonHeader size="lg" className="text-[#3E2723]!">
                  {seller.name}
                </CommonHeader>
                <CommonHeader size="sm" className="text-[#787A7F]!">
                  {seller.email}
                </CommonHeader>
              </div>
            </div>

            <CustomSwitch
              checked={seller.featuredOnHomepage}
              onCheckedChange={(value) => onToggleFeatured(seller.id, value)}
              label="Feature on Homepage"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <CommonHeader size="lg" className="text-[#3E2723]!">
              Account Information
            </CommonHeader>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setReviewOpen(true)}
                className="flex items-center gap-1 text-sm font-medium text-[#3E2723] underline font-inter cursor-pointer"
              >
                <BadgeCheck size={20} className="text-[#3BB515]" />
                Verification Badge Request
              </button>
              <StatusBadge status={verificationLabel} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
            <InfoField label="Name" value={seller.name} />
            <InfoField label="Email" value={seller.email} />
            <InfoField label="Business" value={seller.business} />
            <InfoField
              label="Status"
              value={<StatusBadge status={seller.status} />}
            />
            <InfoField label="KYC" value={seller.kycStatus} />
            <InfoField label="Products Listed" value={seller.productsListed} />
            <InfoField
              label="Total Sales"
              value={`UGX ${seller.totalSalesUGX.toLocaleString()}`}
            />
            <InfoField label="Joined" value={seller.joined} />
          </div>
        </div>

        <div className="space-y-4">
          <CommonHeader size="lg" className="text-[#3E2723]!">
            Activity History
          </CommonHeader>
          <div className="flex flex-col gap-2">
            {activityStats.map((stat) => (
              <div
                key={stat.label}
                className="flex justify-between items-center bg-[#E8DCC8]/30 px-4 py-3 rounded-lg text-sm text-[#3E2723] leading-5"
              >
                <span className="text-titleColor leading-5 font-normal">
                  {stat.label}
                </span>
                <span className="text-titleColor leading-5 font-medium">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <CommonHeader size="lg" className="text-[#3E2723]!">
              KYC Documents
            </CommonHeader>
            <div className="space-y-2">
              {seller.kycDocuments.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between bg-[#EBF2F2] rounded-lg px-3 py-2.5"
                >
                  <span className="text-sm leading-5 text-green-600 font-medium">
                    {doc.name}
                  </span>
                  <span className="text-[10px] text-yellow font-medium leading-4 cursor-pointer">
                    {doc.linkLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <CommonHeader size="lg" className="text-[#3E2723]!">
              Recent Payouts
            </CommonHeader>
            <div className="space-y-2">
              {seller.recentPayouts.map((payout, i) => (
                <div
                  key={`${payout.date}-${i}`}
                  className="flex items-center justify-between gap-2 bg-[#EBF2F2] rounded-lg px-3 py-2.5"
                >
                  <span className="text-sm leading-5 text-green-600 font-medium">
                    {payout.date}
                  </span>
                  <span className="text-sm leading-5 font-medium text-black">
                    UGX {payout.amountUGX.toLocaleString()}
                  </span>
                  <StatusBadge status={payout.status} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4 w-full">
          <CommonButton
            onClick={() => onApprove(seller.id)}
            variant="primary"
            className="w-full!"
          >
            Approve
          </CommonButton>
          <CommonButton
            onClick={() => onReject(seller.id)}
            variant="danger"
            className="w-full!"
          >
            Reject
          </CommonButton>
          <CommonButton
            onClick={() => onMessage(seller.id)}
            variant="secondary"
            className="w-full! bg-[#1E4345]! hover:bg-[#163334]!"
          >
            Message Seller
          </CommonButton>
        </div>
      </ModalShell>

      <VerificationBadgeReviewModal
        isOpen={reviewOpen}
        data={seller.verificationReview}
        onClose={() => setReviewOpen(false)}
        onApprove={() => {
          setReviewOpen(false);
          onApprove(seller.id);
        }}
        onReject={() => {
          setReviewOpen(false);
          onReject(seller.id);
        }}
      />
    </>
  );
};
