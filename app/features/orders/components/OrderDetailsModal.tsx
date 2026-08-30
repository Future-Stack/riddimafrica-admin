"use client";

import CommonButton from "@/app/components/common/button/CommonButton";
import StatusBadge from "@/app/components/common/button/StatusBadge";
import CommonHeader from "@/app/components/common/header/CommonHeader";
import InfoField from "@/app/components/common/header/InfoField";
import ModalShell from "@/app/components/common/ModalSeel";
import { BadgeCheck, Circle } from "lucide-react";

export type OrderStatus =
  | "New"
  | "Packaging"
  | "Seller Shipped"
  | "Received at Office"
  | "Quality Inspection"
  | "Dispatched"
  | "Delivered"
  | "Cancelled";

export interface OrderItem {
  id: string;
  orderId: string;
  customer: string;
  handle: string;
  location: string;
  items: string;
  seller: string;
  sellerRole: string;
  amount: number;
  totalSales: number;
  date: string;
  status: OrderStatus;
  lastUpdated: string;
}

interface OrderDetailsModalProps {
  isOpen: boolean;
  order: OrderItem | null;
  onClose: () => void;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
}

const TIMELINE_STEPS: OrderStatus[] = [
  "New",
  "Packaging",
  "Seller Shipped",
  "Received at Office",
  "Quality Inspection",
  "Dispatched",
  "Delivered",
];

export const OrderDetailsModal = ({
  isOpen,
  order,
  onClose,
  onUpdateStatus,
}: OrderDetailsModalProps) => {
  if (!order) return null;

  const currentStepIndex = TIMELINE_STEPS.indexOf(order.status);

  const getNextStatus = (status: OrderStatus): OrderStatus | null => {
    const idx = TIMELINE_STEPS.indexOf(status);
    if (idx !== -1 && idx < TIMELINE_STEPS.length - 1) {
      return TIMELINE_STEPS[idx + 1];
    }
    return null;
  };

  const nextStatus = getNextStatus(order.status);

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title={`Order ${order.orderId}`}
      subtitle={`@${order.handle} • ${order.location} • UGX ${order.amount.toLocaleString()}`}
      maxWidthClassName="max-w-[788px]"
      roundedClassName="rounded-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-3">
            <CommonHeader size="lg" className="text-[#3E2723]!">
              Business Info
            </CommonHeader>
            <div className="bg-[#F9F5EF] p-6 rounded-xl space-y-2.5">
              <InfoField variant="inline" label="Items" value={order.items} />
              <InfoField
                variant="inline"
                label="Seller/Artist"
                value={order.seller}
              />
              <InfoField
                variant="inline"
                label="Amount"
                value={`UGX ${order.amount.toLocaleString()}`}
              />
              <InfoField
                variant="inline"
                label="Total Sales"
                value={order.totalSales}
              />
              <InfoField
                variant="inline"
                label="Delivery Address"
                value={order.location}
              />
              <InfoField
                variant="inline"
                label="Last Updated"
                value={order.lastUpdated}
              />
            </div>
          </div>

          <div className="space-y-3">
            <CommonHeader size="sm" className="text-[#787A7F]!">
              Order Status
            </CommonHeader>
            <div className="w-full py-2 px-3 rounded-md border border-[#5F9597] bg-[#EBF2F2]">
              <StatusBadge status={order.status} />
            </div>

            {nextStatus && order.status !== "Cancelled" && (
              <CommonButton
                onClick={() => onUpdateStatus(order.orderId, nextStatus)}
                variant="secondary"
                className="bg-[#63274D]! hover:bg-[#4a1c3a]! border-0!"
              >
                {nextStatus}
              </CommonButton>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <CommonButton variant="primary">Contact Seller</CommonButton>
            {order.status !== "Cancelled" && (
              <CommonButton
                onClick={() => onUpdateStatus(order.orderId, "Cancelled")}
                variant="danger"
              >
                Cancel Order
              </CommonButton>
            )}
            {order.status === "Dispatched" && (
              <CommonButton
                onClick={() => {
                  console.log("Refund order:", order.orderId);
                }}
                variant="secondary"
                className="bg-[#326F72]! hover:bg-[#1e4445]! border-0!"
              >
                Refund
              </CommonButton>
            )}
          </div>
        </div>

        <div className="md:col-span-1 space-y-4">
          <CommonHeader size="lg" className="text-[#3E2723]!">
            Order Timeline
          </CommonHeader>

          <div className="relative pl-2 space-y-5">
            {[
              { label: "Order Placed", step: 0 },
              { label: "Payment Confirmed", step: 1 },
              { label: "Seller Shipped", step: 2 },
              { label: "Received at Office", step: 3 },
              { label: "Quality Inspection", step: 4 },
              { label: "Dispatched", step: 5 },
              { label: "Delivered", step: 6 },
            ].map((item, index, arr) => {
              const isCompleted =
                order.status !== "Cancelled" && currentStepIndex >= item.step;
              const isLast = index === arr.length - 1;

              return (
                <div
                  key={item.label}
                  className="relative flex items-center gap-3"
                >
                  {!isLast && (
                    <span
                      className={`absolute left-[11px] top-5 w-[2px] h-6 ${
                        currentStepIndex > item.step
                          ? "bg-emerald-500"
                          : "bg-gray-200"
                      }`}
                    />
                  )}

                  <div
                    className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center ${
                      isCompleted ? "bg-[#3BB51533]" : "bg-gray-300"
                    }`}
                  >
                    {isCompleted ? (
                      <BadgeCheck size={12} className="text-[#3BB515]" />
                    ) : (
                      <Circle size={14} className="text-[#919EAB]" />
                    )}
                  </div>

                  <span className="font-medium text-black text-sm leading-5">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ModalShell>
  );
};
