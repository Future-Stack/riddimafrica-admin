import CommonButton from "@/app/components/common/button/CommonButton";
import CustomSwitch from "@/app/components/common/button/CustomSwitch";
import StatusBadge from "@/app/components/common/button/StatusBadge";
import CommonHeader from "@/app/components/common/header/CommonHeader";
import InfoField from "@/app/components/common/header/InfoField";
import ModalShell from "@/app/components/common/ModalSeel";
import { BadgeCheck } from "lucide-react";
import { useState } from "react";

export interface ArtistProfileData {
  id: number;
  name: string;
  stageName: string;
  genre: string;
  avatar: string;
  followers: string;
  bio: string;
  authorizedAsPresenter: boolean;
  featuredOnHomepage: boolean;
  verificationStatus: "Pending" | "Approved" | "Rejected";
  merchItemsCount: number;
  totalSalesUGX: number;
  kycStatus: "Pending" | "Complete";
  approveRequestStatus: "Pending" | "Approved" | "Rejected";
  merchandiseItems: string[];
}

interface ArtistProfileModalProps {
  isOpen: boolean;
  artist: ArtistProfileData | null;
  onClose: () => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onMessage: (id: number) => void;
}

export const ArtistProfileModal = ({
  isOpen,
  artist,
  onClose,
  onApprove,
  onReject,
  onMessage,
}: ArtistProfileModalProps) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  if (!artist) return null;

  const artistStats = [
    { label: "Merch Items", value: artist.merchItemsCount },
    {
      label: "Total Sales",
      value: `UGX ${artist.totalSalesUGX.toLocaleString()}`,
    },
    { label: "KYC Status", value: artist.kycStatus },
    { label: "Approve Request", value: artist.approveRequestStatus },
  ];

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Artist Details"
      maxWidthClassName="max-w-3xl"
      roundedClassName="rounded-2xl"
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={artist.avatar}
              alt={artist.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <CommonHeader size="lg" className="text-[#3E2723]!">
                {artist.name}
              </CommonHeader>
              <CommonHeader size="sm" className="text-yellow!">
                @{artist.stageName}
              </CommonHeader>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            <CustomSwitch
              checked={isAuthorized}
              onCheckedChange={setIsAuthorized}
              label="Authorized as Presenter"
            />
            <CustomSwitch
              checked={isFeatured}
              onCheckedChange={setIsFeatured}
              label="Feature on Homepage"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CommonHeader size="lg" className="text-[#3E2723]!">
            Account Information
          </CommonHeader>
          <span className="flex items-center gap-1 text-sm font-medium text-[#3E2723] underline font-inter">
            <BadgeCheck size={20} className="text-[#3BB515]" />
            Verification Badge Request
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
          <InfoField label="Name" value={artist.name} />
          <InfoField label="Stage Name" value={artist.stageName} />
          <InfoField label="Genre" value={artist.genre} />
          <InfoField
            label="Status"
            value={<StatusBadge status={artist.verificationStatus} />}
          />
          <InfoField label="Followers" value={artist.followers} />
          <InfoField label="KYC Status" value={artist.kycStatus} />
        </div>
      </div>

      {artist.bio && <InfoField label="Bio" value={artist.bio} />}

      <div className="space-y-4">
        <CommonHeader size="lg" className="text-[#3E2723]!">
          Activity History
        </CommonHeader>
        <div className="flex flex-col gap-2">
          {artistStats.map((stat) => (
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

      {artist.merchandiseItems.length > 0 && (
        <div className="space-y-3">
          <CommonHeader size="lg" className="text-[#3E2723]!">
            Merchandise Items
          </CommonHeader>
          <div className="flex flex-wrap gap-2">
            {artist.merchandiseItems.map((item) => (
              <span
                key={item}
                className="text-sm font-medium font-inter leading-6 px-5 py-3 rounded-[8px] bg-[#EBF2F2] text-green-600"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4 w-full">
        <CommonButton
          onClick={() => onApprove(artist.id)}
          variant="primary"
          className="w-full!"
        >
          Approve
        </CommonButton>
        <CommonButton
          onClick={() => onReject(artist.id)}
          variant="danger"
          className="w-full!"
        >
          Reject
        </CommonButton>
        <CommonButton
          onClick={() => onMessage(artist.id)}
          variant="secondary"
          className="w-full! bg-[#1E4345]! hover:bg-[#163334]!"
        >
          Message Artist
        </CommonButton>
      </div>
    </ModalShell>
  );
};
