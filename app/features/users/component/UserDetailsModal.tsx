import CommonButton from "@/app/components/common/button/CommonButton";
import CustomSwitch from "@/app/components/common/button/CustomSwitch";
import CommonHeader from "@/app/components/common/header/CommonHeader";
import InfoField from "@/app/components/common/header/InfoField";
import ModalShell from "@/app/components/common/ModalSeel";
import React, { useEffect, useState } from "react";

export interface UserDetailsData {
  id: string;
  name: string;
  email: string;
  status: string;
  country: string;
  totalLogins: string | number;
  lastLogin: string;
  isPresenter: boolean;
}

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuspendTrigger: () => void;
  onPresenterChange: (isPresenter: boolean) => Promise<void>;
  user: UserDetailsData;
}

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  isOpen,
  onClose,
  onSuspendTrigger,
  onPresenterChange,
  user,
}) => {
  const [isAuthorized, setIsAuthorized] = useState(user.isPresenter);
  const [isUpdatingPresenter, setIsUpdatingPresenter] = useState(false);

  useEffect(() => {
    setIsAuthorized(user.isPresenter);
  }, [user.id, user.isPresenter]);

  const handlePresenterChange = async (checked: boolean) => {
    setIsAuthorized(checked);
    setIsUpdatingPresenter(true);
    try {
      await onPresenterChange(checked);
    } catch {
      setIsAuthorized(!checked);
    } finally {
      setIsUpdatingPresenter(false);
    }
  };

  const userStats = [
    { label: "Total Logins", value: user.totalLogins },
    { label: "Last Login", value: user.lastLogin },
    { label: "Songs Played", value: "—" },
    { label: "Purchases Made", value: "—" },
  ];

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="User Details"
      maxWidthClassName="max-w-2xl"
      roundedClassName="rounded-2xl"
    >
      <div className=" space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CommonHeader size="lg" className="text-[#3E2723]!">
            Account Information
          </CommonHeader>
          <CustomSwitch
            checked={isAuthorized}
            onCheckedChange={handlePresenterChange}
            label="Authorized as Presenter"
            disabled={isUpdatingPresenter}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
          <InfoField label="Name" value={user.name} />
          <InfoField label="Email" value={user.email} />
          <InfoField label="Status" value={user.status} />
          <InfoField label="Country" value={user.country} />
        </div>
      </div>

      <div className=" space-y-4">
        <CommonHeader size="lg" className="text-[#3E2723]!">
          Activity History
        </CommonHeader>
        <div className="flex flex-col gap-2">
          {userStats.map((stat) => (
            <div
              key={stat.label}
              className="flex justify-between items-center bg-[#E8DCC8]/30 px-4 py-3 rounded-lg  text-sm text-[#3E2723] leading-5"
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

      <CommonButton
        onClick={onSuspendTrigger}
        variant="danger"
        className="w-full!"
      >
        Suspend Account
      </CommonButton>
    </ModalShell>
  );
};
