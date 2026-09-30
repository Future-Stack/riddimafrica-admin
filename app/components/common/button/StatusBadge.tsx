export type KnownStatus =
  | "complete"
  | "completed"
  | "delivered"
  | "packaging"
  | "cancel"
  | "cancelled"
  | "new"
  | "shipped"
  | "active"
  | "suspend"
  | "suspended"
  | "approved"
  | "rejected"
  | "pending"
  | "live"
  | "draft"
  | "verified"
  | "paid"
  | "pending inspection"
  | "review"
  | "published"
  | "scheduled"
  | "on hold"
  | "seller shipped"
  | "received at office"
  | "quality inspection"
  | "dispatched"
  | "approve sellers"
  | "review products"
  | "process payouts"
  | "payout completed"
  | "ready"
  | "processing"
  | "requested"
  | "open"
  | "resolved";

export type Status = KnownStatus | (string & {});

export type BadgeRound = "pill" | "round";

interface StatusBadgeProps {
  status: Status;
  label?: string;
  round?: BadgeRound;
  className?: string;
}

const ROUND_STYLES: Record<BadgeRound, string> = {
  pill: "rounded-full",
  round: "rounded-[6px]",
};

const STATUS_STYLES: Record<KnownStatus, string> = {
  complete: "bg-[#008471] text-white",
  completed: "bg-[#008471] text-white",
  delivered: "bg-[#008471] text-white",
  packaging: "bg-[#B75432] text-white",
  cancel: "bg-[#C9000A] text-white",
  cancelled: "bg-[#C9000A] text-white",
  new: "bg-[#052787] text-white",
  shipped: "bg-[#6D2B55] text-white",
  active: "bg-[#0b663b] text-white",
  suspend: "bg-[#b84b42] text-white",
  suspended: "bg-[#b84b42] text-white",
  approved: "bg-[#036B2C] text-white",
  rejected: "bg-[#b84b42] text-white",
  pending: "bg-[#E6A400] text-white",
  live: "bg-[#B5D3C1] text-[#09633F]",
  draft: "bg-gray-100 text-gray-500",
  verified: "bg-[#036B2C] text-white",
  paid: "bg-[#008471] text-white",
  "pending inspection": "bg-[#E6A400] text-white",
  review: "bg-[#63274D] text-white",
  published: "bg-[#2D6365] text-white",
  scheduled: "bg-[#15AC51] text-white",
  "on hold": "bg-[#E6C200] text-white",
  "seller shipped": "bg-[#6D2B55] text-white",
  "received at office": "bg-[#0f8a70] text-white",
  "quality inspection": "bg-[#0f8a70] text-white",
  dispatched: "bg-[#6D2B55] text-white",
  "approve sellers": "bg-[#E6A40033] text-[#D99B26]",
  "review products": "bg-[#23BA7D33] text-[#2E7D52]",
  "process payouts": "bg-[#FD756233] text-[#C96860]",
  "payout completed": "bg-[#124D00] text-white",
  ready: "bg-[#00C950] text-white",
  processing: "bg-[#C2A31F] text-white",
  requested: "bg-[#9A463B] text-white",
  open: "bg-[#6D2B55] text-white",
  resolved: "bg-[#008471] text-white",
};

const DEFAULT_LABELS: Record<KnownStatus, string> = {
  complete: "Complete",
  completed: "Completed",
  delivered: "Delivered",
  packaging: "Packaging",
  cancel: "Cancelled",
  cancelled: "Cancelled",
  new: "New",
  shipped: "Shipped",
  active: "Active",
  suspend: "Suspend",
  suspended: "Suspended",
  approved: "Approved",
  rejected: "Rejected",
  pending: "Pending",
  live: "Live",
  draft: "Draft",
  verified: "Verified",
  paid: "Paid",
  "pending inspection": "Pending Inspection",
  review: "Review",
  published: "Published",
  scheduled: "Scheduled",
  "on hold": "On-Hold",
  "seller shipped": "Seller Shipped",
  "received at office": "Received at Office",
  "quality inspection": "Quality Inspection",
  dispatched: "Dispatched",

  "approve sellers": "Approve Sellers",
  "review products": "Review Products",
  "process payouts": "Process Payouts",
  "payout completed": "Payout completed",
  ready: "Ready",
  processing: "Processing",
  requested: "Requested",
  open: "Open",
  resolved: "Resolved",
};

const StatusBadge = ({
  status,
  label,
  round = "pill",
  className = "",
}: StatusBadgeProps) => {
  const key = status.trim().toLowerCase().replace(/-/g, " ") as KnownStatus;
  const styles = STATUS_STYLES[key] ?? STATUS_STYLES.new;

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap ${round === "pill" ? "px-3 py-2" : "px-5 py-3"}  text-xs font-bold ${ROUND_STYLES[round]} ${styles} ${className}`}
    >
      {label ?? DEFAULT_LABELS[key] ?? status}
    </span>
  );
};

export default StatusBadge;
