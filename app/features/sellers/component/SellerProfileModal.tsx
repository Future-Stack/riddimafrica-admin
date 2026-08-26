import { ModalShell } from "@/app/components/reusable/ModalSeel";
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

export function SellerProfileModal({
  isOpen,
  seller,
  onClose,
  onApprove,
  onReject,
  onMessage,
  onToggleFeatured,
}: SellerProfileModalProps) {
  const [reviewOpen, setReviewOpen] = useState(false);

  if (!isOpen || !seller) return null;

  const statusBadgeClass =
    seller.verificationRequestStatus === "Complete"
      ? "bg-[#036B2C] text-white"
      : "bg-[#E6A400] text-white";

  return (
    <>
      <ModalShell
        isOpen={!reviewOpen}
        onClose={onClose}
        title="Seller Profile"
        maxWidthClassName="max-w-3xl"
        roundedClassName="rounded-2xl"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={seller.avatar}
              alt={seller.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-base md:text-lg font-medium text-black font-inter leading-7">
                {seller.name}
              </p>
              <p className="text-sm text-[#787A7F] font-medium font-inter leading-5">
                {seller.email}
              </p>
            </div>
          </div>

          <label className="flex items-center justify-end gap-2 cursor-pointer text-sm font-medium text-black leading-5 font-inter">
            <span className="text-xs text-[#101828] font-medium">
              Feature on Homepage
            </span>
            <button
              onClick={() =>
                onToggleFeatured(seller.id, !seller.featuredOnHomepage)
              }
              className={`w-9 h-5 rounded-full relative transition-colors cursor-pointer ${
                seller.featuredOnHomepage ? "bg-[#655042]" : "bg-gray-300"
              }`}
              aria-label="Toggle featured on homepage"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  seller.featuredOnHomepage ? "translate-x-4" : ""
                }`}
              />
            </button>
          </label>
        </div>

        <div className="flex items-center justify-between mb-7">
          <button
            onClick={() => setReviewOpen(true)}
            className="flex items-center gap-1 text-sm md:text-base font-medium text-black leading-6 underline font-inter cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18.9905 19H19M18.9905 19C18.3678 19.6175 17.2393 19.4637 16.4479 19.4637C15.4765 19.4637 15.0087 19.6537 14.3154 20.347C13.7251 20.9374 12.9337 22 12 22C11.0663 22 10.2749 20.9374 9.68457 20.347C8.99128 19.6537 8.52349 19.4637 7.55206 19.4637C6.76068 19.4637 5.63218 19.6175 5.00949 19C4.38181 18.3776 4.53628 17.2444 4.53628 16.4479C4.53628 15.4414 4.31616 14.9786 3.59938 14.2618C2.53314 13.1956 2.00002 12.6624 2 12C2.00001 11.3375 2.53312 10.8044 3.59935 9.73817C4.2392 9.09832 4.53628 8.46428 4.53628 7.55206C4.53628 6.76065 4.38249 5.63214 5 5.00944C5.62243 4.38178 6.7556 4.53626 7.55208 4.53626C8.46427 4.53626 9.09832 4.2392 9.73815 3.59937C10.8044 2.53312 11.3375 2 12 2C12.6625 2 13.1956 2.53312 14.2618 3.59937C14.9015 4.23907 15.5355 4.53626 16.4479 4.53626C17.2393 4.53626 18.3679 4.38247 18.9906 5C19.6182 5.62243 19.4637 6.75559 19.4637 7.55206C19.4637 8.55858 19.6839 9.02137 20.4006 9.73817C21.4669 10.8044 22 11.3375 22 12C22 12.6624 21.4669 13.1956 20.4006 14.2618C19.6838 14.9786 19.4637 15.4414 19.4637 16.4479C19.4637 17.2444 19.6182 18.3776 18.9905 19Z"
                stroke="#3BB515"
                strokeWidth="1.5"
              />
              <path
                d="M9 12.8929C9 12.8929 10.2 13.5447 10.8 14.5C10.8 14.5 12.6 10.75 15 9.5"
                stroke="#3BB515"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Verification Badge Request
          </button>

          <span
            className={`inline-flex items-center justify-center px-4 py-1.5 text-sm sm:text-base font-medium rounded-full ${statusBadgeClass}`}
          >
            {seller.verificationRequestStatus === "Complete"
              ? "Verified"
              : "Pending"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm font-medium text-[#787A7F] font-inter leading-5 mb-3">
              Business Info
            </p>
            <div className="bg-[#F9F5EF] rounded-xl p-4">
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#787A7F] text-xs font-normal leading-4.5 font-inter">
                    Business
                  </span>
                  <span className="text-black text-sm font-normal leading-5">
                    {seller.business}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#787A7F] text-xs font-normal leading-4.5 font-inter">
                    Status
                  </span>
                  <span className="text-green-700 text-sm font-normal leading-5">
                    {seller.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#787A7F] text-xs font-normal leading-4.5 font-inter">
                    KYC
                  </span>
                  <span
                    className={
                      seller.kycStatus === "Verified"
                        ? "text-[#3BB515] text-sm font-normal leading-5"
                        : "text-[#E6A400] text-sm font-normal leading-5"
                    }
                  >
                    {seller.kycStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#787A7F] text-xs font-normal leading-4.5 font-inter">
                    Products Listed
                  </span>
                  <span className="text-black text-sm font-normal leading-5">
                    {seller.productsListed}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#787A7F] text-xs font-normal leading-4.5 font-inter">
                    Total Sales
                  </span>
                  <span className="text-black text-sm font-normal leading-5">
                    UGX {seller.totalSalesUGX.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#787A7F] text-xs font-normal leading-4.5 font-inter">
                    Joined
                  </span>
                  <span className="text-black text-sm font-normal leading-5">
                    {seller.joined}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-[#787A7F] font-inter leading-5 mb-3">
              Activity Summary
            </p>
            <div className="grid grid-cols-2 gap-3 bg-[#F9F5EF] p-4 rounded-xl">
              <div className="bg-[#F3E9DC] rounded-xl p-3">
                <p className="text-gray-600 text-xs font-normal leading-4.5 font-inter mb-2">
                  Total Orders
                </p>
                <p className="text-base font-medium text-[#101828]">
                  {seller.totalOrders}
                </p>
              </div>
              <div className="bg-[#F3E9DC] rounded-xl p-3">
                <p className="text-gray-600 text-xs font-normal leading-4.5 font-inter mb-2">
                  Returns
                </p>
                <p className="text-base font-medium text-[#101828]">
                  {String(seller.returns).padStart(2, "0")}
                </p>
              </div>
              <div className="bg-[#F3E9DC] rounded-xl p-3">
                <p className="text-gray-600 text-xs font-normal leading-4.5 font-inter mb-2">
                  Rating
                </p>
                <p className="text-base font-medium text-[#101828]">
                  {seller.rating} / 5
                </p>
              </div>
              <div className="bg-[#F3E9DC] rounded-xl p-3">
                <p className="text-gray-600 text-xs font-normal leading-4.5 font-inter mb-2">
                  Response Rate
                </p>
                <p className="text-base font-medium text-[#101828]">
                  {seller.responseRate}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14 ">
          <div>
            <p className="text-sm font-medium text-[#787A7F] font-inter leading-5 mb-3">
              KYC Documents
            </p>
            <div className="space-y-2">
              {seller.kycDocuments.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between bg-[#EBF2F2] rounded-lg px-3 py-2.5"
                >
                  <span className="text-sm leading-5 text-green-600 font-medium">
                    {doc.name}
                  </span>
                  <span className="text-[10px] text-[#E6A400] font-medium leading-4  cursor-pointer">
                    {doc.linkLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-[#787A7F] font-inter leading-5 mb-3">
              Recent Payouts
            </p>
            <div className="space-y-2">
              {seller.recentPayouts.map((payout, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-[#EBF2F2] rounded-lg px-3 py-2.5"
                >
                  <span className="text-sm leading-5 text-green-600 font-medium">
                    {payout.date}
                  </span>
                  <span className="text-sm leading-5  font-medium text-black">
                    UGX {payout.amountUGX.toLocaleString()}
                  </span>
                  <span className="text-sm leading-5 text-[#3BB515] font-normal">
                    {payout.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onApprove(seller.id)}
            className="rounded-lg bg-[#E6A400] py-3 px-7 text-center text-sm font-medium font-inter leading-5 text-white hover:bg-[#dd951b] transition-colors cursor-pointer"
          >
            Approve
          </button>
          <button
            onClick={() => onReject(seller.id)}
            className="rounded-lg bg-[#D4183D1A] border border-[#D4183D4D] py-3 px-7 text-center text-sm font-medium font-inter leading-5 text-[#FF6467] hover:bg-[#ffeaea] transition-colors cursor-pointer"
          >
            Reject
          </button>
          <button
            onClick={() => onMessage(seller.id)}
            className="rounded-lg bg-[#1E4345] border border-[#377A7D] py-3 px-7 text-center text-sm font-medium font-inter leading-5 text-white hover:bg-[#0d281b] transition-colors cursor-pointer"
          >
            Message Seller
          </button>
        </div>
      </ModalShell>

      {/* Verification Badge Review — opens on top, seller profile card above is hidden while this is open */}
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
}
