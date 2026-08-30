"use client";

import CommonButton from "@/app/components/common/button/CommonButton";
import CustomSwitch from "@/app/components/common/button/CustomSwitch";
import CommonHeader from "@/app/components/common/header/CommonHeader";
import DashboardTopSection from "@/app/components/common/header/DashboardTopSection";
import { cn } from "@/lib/utils";
import {
  Bell,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  CircleDot,
  Lock,
  MapPin,
  Percent,
  Save,
  Shield,
  Truck,
} from "lucide-react";
import { ReactNode, useState } from "react";

type SettingsTab =
  | "platform"
  | "kyc"
  | "notifications"
  | "delivery"
  | "security";

const TABS: {
  key: SettingsTab;
  label: string;
  icon: ReactNode;
}[] = [
  { key: "platform", label: "Platform", icon: <Percent size={16} /> },
  { key: "kyc", label: "KYC", icon: <CircleDot size={16} /> },
  { key: "notifications", label: "Notifications", icon: <Bell size={16} /> },
  { key: "delivery", label: "Delivery Rates", icon: <Truck size={16} /> },
  { key: "security", label: "Security", icon: <Shield size={16} /> },
];

const inputClassName =
  "w-full rounded-lg border border-[#C4CDD5] bg-[#E8EEF2] px-4 py-3 text-sm text-[#101828] outline-none focus:ring-2 focus:ring-[#E6A40033]";

const labelClassName = "block text-sm font-medium text-[#3D2513] mb-2";

const SettingsCard = ({
  icon,
  title,
  description,
  children,
}: {
  icon: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
}) => (
  <div className="bg-[#FAF7F3] rounded-2xl border border-[#C4CDD566] p-5 md:p-6">
    <div className="flex items-start gap-3 mb-6">
      <span className="w-9 h-9 rounded-lg bg-[#E6A400] text-white flex items-center justify-center shrink-0">
        {icon}
      </span>
      <div>
        <CommonHeader size="lg" className="text-[#101828]!">
          {title}
        </CommonHeader>
        {description && (
          <CommonHeader size="xs" className="text-[#624D3B]!">
            {description}
          </CommonHeader>
        )}
      </div>
    </div>
    {children}
  </div>
);

const SaveButton = ({ onClick }: { onClick?: () => void }) => (
  <CommonButton
    size="sm"
    variant="primary"
    shape="rounded"
    leftIcon={<CheckSquare size={16} />}
    onClick={onClick}
    className="mt-6"
  >
    Save Changes
  </CommonButton>
);

const PlatformPanel = () => {
  const [rate, setRate] = useState("35");
  const [frequency, setFrequency] = useState<"Daily" | "Weekly" | "Monthly">(
    "Weekly",
  );

  const frequencies: {
    key: "Daily" | "Weekly" | "Monthly";
    className: string;
  }[] = [
    { key: "Daily", className: "bg-[#2D6365] text-white" },
    { key: "Weekly", className: "bg-[#AB6331] text-white" },
    { key: "Monthly", className: "bg-[#63274D] text-white" },
  ];

  return (
    <SettingsCard
      icon={<Percent size={18} />}
      title="Commission & Payouts"
      description="Configure platform revenue sharing and payout rules."
    >
      <div className="space-y-5">
        <div>
          <label className={labelClassName}>Platform Commission Rate (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className={inputClassName}
          />
        </div>

        <div>
          <label className={labelClassName}>Payout Frequency</label>
          <div className="flex flex-wrap gap-3">
            {frequencies.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFrequency(f.key)}
                className={cn(
                  "px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-opacity",
                  f.className,
                  frequency === f.key ? "opacity-100 ring-2 ring-offset-2 ring-[#E6A400]" : "opacity-80 hover:opacity-100",
                )}
              >
                {f.key}
              </button>
            ))}
          </div>
        </div>
      </div>
      <SaveButton />
    </SettingsCard>
  );
};

const KycPanel = () => {
  const [items, setItems] = useState([
    {
      id: "gov-id",
      label: "Government-issued ID (NIN / Intl Passport / Driver's License)",
      required: true,
    },
    {
      id: "cac",
      label: "CAC Certificate (for business accounts)",
      required: true,
    },
    {
      id: "passport",
      label: "Passport verification",
      required: true,
    },
    {
      id: "utility",
      label: "Utility bill (address verification)",
      required: false,
    },
  ]);

  return (
    <SettingsCard
      icon={<Shield size={18} />}
      title="KYC Requirements"
      description="Toggle which documents sellers and artists must provide."
    >
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 rounded-xl bg-[#E8EEF2] px-4 py-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <CustomSwitch
                checked={item.required}
                onCheckedChange={(checked) =>
                  setItems((prev) =>
                    prev.map((p) =>
                      p.id === item.id ? { ...p, required: checked } : p,
                    ),
                  )
                }
              />
              <span className="text-sm text-[#101828] font-medium">
                {item.label}
              </span>
            </div>
            <span className="text-xs font-semibold text-[#787A7F] shrink-0">
              Required
            </span>
          </div>
        ))}
      </div>
      <SaveButton />
    </SettingsCard>
  );
};

const NotificationsPanel = () => {
  const [templates, setTemplates] = useState({
    sellerApproval:
      "Your seller account has been approved! You can now list products on Riddim Africa.",
    productRejection:
      "Unfortunately your product submission has been rejected. Reason: {reason}",
    orderStatus:
      "Your Riddim Africa order #{order_id} is now {status}. Track it in the app.",
    payout:
      "{amount} has been sent to your {bank_name} account ending in {last4}.",
  });

  const fields: { key: keyof typeof templates; label: string }[] = [
    { key: "sellerApproval", label: "Seller Approval Email" },
    { key: "productRejection", label: "Product Rejection Message" },
    { key: "orderStatus", label: "Order Status Update SMS" },
    { key: "payout", label: "Payout Confirmation" },
  ];

  return (
    <SettingsCard
      icon={<Bell size={18} />}
      title="Notification Templates"
      description="Configure automated notification messages"
    >
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.key}>
            <label className={labelClassName}>{field.label}</label>
            <textarea
              rows={3}
              value={templates[field.key]}
              onChange={(e) =>
                setTemplates((prev) => ({
                  ...prev,
                  [field.key]: e.target.value,
                }))
              }
              className={cn(inputClassName, "resize-y min-h-[88px]")}
            />
          </div>
        ))}
      </div>
      <SaveButton />
    </SettingsCard>
  );
};

type Zone = {
  id: string;
  name: string;
  enabled: boolean;
  base: string;
  perKm: string;
  perMin: string;
};

const DeliveryPanel = () => {
  const [base, setBase] = useState("18500");
  const [perKm, setPerKm] = useState("150");
  const [perMin, setPerMin] = useState("8");
  const [expanded, setExpanded] = useState<string | null>("lagos");
  const [zones, setZones] = useState<Zone[]>([
    {
      id: "lagos",
      name: "Lagos",
      enabled: true,
      base: "800",
      perKm: "200",
      perMin: "10",
    },
    {
      id: "abuja",
      name: "Abuja FCT",
      enabled: true,
      base: "900",
      perKm: "180",
      perMin: "12",
    },
    {
      id: "kano",
      name: "Kano",
      enabled: false,
      base: "700",
      perKm: "160",
      perMin: "9",
    },
    {
      id: "ibadan",
      name: "Ibadan",
      enabled: true,
      base: "750",
      perKm: "170",
      perMin: "10",
    },
  ]);

  const updateZone = (id: string, patch: Partial<Zone>) => {
    setZones((prev) => prev.map((z) => (z.id === id ? { ...z, ...patch } : z)));
  };

  return (
    <div className="space-y-4">
      <SettingsCard
        icon={<Truck size={18} />}
        title="Delivery Rate Formula"
        description="Admin-only formula: Total Fee = Base Fare + (Per-km × Distance) + (Per-min × Time)."
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Base Fare", value: base, set: setBase },
            { label: "Per-km Rate", value: perKm, set: setPerKm },
            { label: "Per-min Rate", value: perMin, set: setPerMin },
          ].map((field) => (
            <div key={field.label}>
              <label className={labelClassName}>{field.label}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#787A7F]">
                  UGX
                </span>
                <input
                  type="number"
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                  className={cn(inputClassName, "pl-12")}
                />
              </div>
            </div>
          ))}
        </div>
        <SaveButton />
      </SettingsCard>

      <SettingsCard
        icon={<MapPin size={18} />}
        title="City / Zone Overrides"
        description="Each city can have its own rates. Toggle to enable/disable delivery to that zone. Click any zone to expand and edit."
      >
        <div className="space-y-3">
          {zones.map((zone) => {
            const isOpen = expanded === zone.id;
            return (
              <div
                key={zone.id}
                className="rounded-xl border border-[#C4CDD566] bg-white overflow-hidden"
              >
                <div className="flex items-center gap-3 px-4 py-3">
                  <CustomSwitch
                    checked={zone.enabled}
                    onCheckedChange={(checked) =>
                      updateZone(zone.id, { enabled: checked })
                    }
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setExpanded((prev) => (prev === zone.id ? null : zone.id))
                    }
                    className="flex-1 flex items-center justify-between gap-3 text-left cursor-pointer min-w-0"
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      <MapPin size={16} className="text-[#E6A400] shrink-0" />
                      <span className="font-semibold text-[#101828]">
                        {zone.name}
                      </span>
                      <span className="text-xs text-[#787A7F] truncate hidden sm:inline">
                        Base UGX {zone.base} · UGX {zone.perKm}/km · UGX{" "}
                        {zone.perMin}/min
                      </span>
                    </span>
                    {isOpen ? (
                      <ChevronUp size={18} className="text-[#787A7F]" />
                    ) : (
                      <ChevronDown size={18} className="text-[#787A7F]" />
                    )}
                  </button>
                </div>

                {isOpen && (
                  <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#C4CDD566] pt-4">
                    {[
                      {
                        label: "Base Fare",
                        value: zone.base,
                        key: "base" as const,
                      },
                      {
                        label: "Per-km Rate",
                        value: zone.perKm,
                        key: "perKm" as const,
                      },
                      {
                        label: "Per-min Rate",
                        value: zone.perMin,
                        key: "perMin" as const,
                      },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className={labelClassName}>{field.label}</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#787A7F]">
                            UGX
                          </span>
                          <input
                            type="number"
                            value={field.value}
                            onChange={(e) =>
                              updateZone(zone.id, {
                                [field.key]: e.target.value,
                              })
                            }
                            className={cn(inputClassName, "pl-12")}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <SaveButton />
      </SettingsCard>
    </div>
  );
};

const SecurityPanel = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactor, setTwoFactor] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30");

  return (
    <SettingsCard
      icon={<Lock size={18} />}
      title="Security"
      description="Manage admin password and account protection settings."
    >
      <div className="space-y-5">
        <div>
          <label className={labelClassName}>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={inputClassName}
            placeholder="••••••••"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClassName}>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputClassName}
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className={labelClassName}>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClassName}
              placeholder="••••••••"
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-xl bg-[#E8EEF2] px-4 py-3">
          <div>
            <p className="text-sm font-medium text-[#101828]">
              Two-factor authentication
            </p>
            <p className="text-xs text-[#787A7F]">
              Require a second step when signing in
            </p>
          </div>
          <CustomSwitch checked={twoFactor} onCheckedChange={setTwoFactor} />
        </div>
        <div>
          <label className={labelClassName}>Session timeout (minutes)</label>
          <input
            type="number"
            value={sessionTimeout}
            onChange={(e) => setSessionTimeout(e.target.value)}
            className={inputClassName}
          />
        </div>
      </div>
      <CommonButton
        size="sm"
        variant="primary"
        shape="rounded"
        leftIcon={<Save size={16} />}
        className="mt-6"
      >
        Save Changes
      </CommonButton>
    </SettingsCard>
  );
};

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>("platform");

  return (
    <div className="space-y-6">
      <DashboardTopSection
        title="Admin Settings"
        description="Configure platform-wide settings and policies"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 items-start">
        <aside className="bg-white rounded-2xl border border-[#C4CDD566] p-3 space-y-1">
          {TABS.map((tab) => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer",
                  active
                    ? "bg-[#F5E6D3] text-[#3D2513]"
                    : "text-[#6A7282] hover:bg-[#FAF7F3]",
                )}
              >
                <span
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    active
                      ? "bg-[#E6A400] text-white"
                      : "bg-[#F4F6F8] text-[#897766]",
                  )}
                >
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            );
          })}
        </aside>

        <div className="min-w-0">
          {activeTab === "platform" && <PlatformPanel />}
          {activeTab === "kyc" && <KycPanel />}
          {activeTab === "notifications" && <NotificationsPanel />}
          {activeTab === "delivery" && <DeliveryPanel />}
          {activeTab === "security" && <SecurityPanel />}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
