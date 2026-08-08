"use client";

import React from "react";
import { ModalShell } from "../../reusable/ModalSeel";

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
    "New", // Order Placed
    "Packaging", // Payment Confirmed
    "Seller Shipped",
    "Received at Office",
    "Quality Inspection",
    "Dispatched",
    "Delivered",
];

export function OrderDetailsModal({
    isOpen,
    order,
    onClose,
    onUpdateStatus,
}: OrderDetailsModalProps) {
    if (!isOpen || !order) return null;

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
            <div className="border-t border-gray-200 mb-6" />

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Business Info */}
                <div className="md:col-span-2">
                    <h3 className="text-base md:text-lg font-medium text-[#3c182f] leading-6 mb-3">Business Info</h3>
                    <div className="bg-[#F9F5EF] p-6 rounded-xl space-y-3 text-xs sm:text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Items</span>
                            <span className="font-bold text-gray-900">{order.items}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Seller/Artist</span>
                            <span className="font-bold text-teal-600">{order.seller}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Amount</span>
                            <span className="font-bold text-emerald-600">
                                UGX {order.amount.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Total Sales</span>
                            <span className="font-bold text-gray-900">{order.totalSales}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Delivery Address</span>
                            <span className="font-bold text-gray-900">{order.location}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Last Updated</span>
                            <span className="font-bold text-gray-900">{order.lastUpdated}</span>
                        </div>
                    </div>

                    {/* Status Control */}
                    <div className="mt-6">
                        <label className="block text-xs font-bold text-gray-500 mb-1">
                            Order Status
                        </label>
                        <div className="w-full p-3 rounded-lg border border-teal-500 bg-teal-50/50 text-xs sm:text-sm font-bold text-gray-800">
                            {order.status}
                        </div>

                        {/* Action Button to trigger next status */}
                        {nextStatus && order.status !== "Cancelled" && (
                            <button
                                onClick={() => onUpdateStatus(order.orderId, nextStatus)}
                                className="mt-3 w-full bg-[#3c182f] text-white py-2.5 px-4 rounded-lg font-bold text-xs hover:bg-[#2e1224] transition-colors cursor-pointer"
                            >
                                {nextStatus}
                            </button>
                        )}
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex items-center gap-3 mt-6">
                        <button className="flex-1 bg-[#eab308] text-white font-bold py-2.5 rounded-lg text-xs hover:bg-yellow-600 cursor-pointer">
                            Contact Seller
                        </button>
                        {order.status !== "Cancelled" && (
                            <button
                                onClick={() => onUpdateStatus(order.orderId, "Cancelled")}
                                className="flex-1 bg-red-600 text-white font-bold py-2.5 rounded-lg text-xs hover:bg-red-700 cursor-pointer"
                            >
                                Cancel Order
                            </button>
                        )}
                    </div>
                </div>

                {/* Right Column: Order Timeline */}
                <div className="md:col-span-1">
                    <h3 className="text-base md:text-lg font-medium text-[#3c182f] leading-6 mb-4">
                        Order Timeline
                    </h3>

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
                                    {/* Line Connector */}
                                    {!isLast && (
                                        <span
                                            className={`absolute left-[11px] top-5 w-[2px] h-6 ${currentStepIndex > item.step
                                                    ? "bg-emerald-500"
                                                    : "bg-gray-200"
                                                }`}
                                        />
                                    )}

                                    {/* Icon Background */}
                                    <div
                                        className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center ${isCompleted
                                            ? "bg-[#3BB51533]"
                                                : "bg-gray-300"
                                            }`}
                                    >
                                        {isCompleted ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="12"
                                                height="12"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                            >
                                                <path
                                                    d="M13.6003 6.49179C14.3112 7.2026 14.6666 7.55801 14.6666 7.99966C14.6666 8.4413 14.3112 8.79675 13.6003 9.50756C13.1225 9.98539 12.9757 10.294 12.9757 10.9649C12.9757 11.4959 13.0787 12.2514 12.6603 12.6663C12.2451 13.078 11.4928 12.9755 10.9652 12.9755C10.3176 12.9755 10.0057 13.1022 9.54354 13.5644C9.14998 13.9579 8.6224 14.6663 7.99993 14.6663C7.37745 14.6663 6.84987 13.9579 6.4563 13.5644C5.99411 13.1022 5.68224 12.9755 5.03463 12.9755C4.50704 12.9755 3.75471 13.078 3.33958 12.6663C2.92112 12.2514 3.0241 11.4959 3.0241 10.9649C3.0241 10.294 2.87736 9.9854 2.3995 9.50756C1.68868 8.79675 1.33326 8.4413 1.33325 7.99966C1.33326 7.55801 1.68867 7.2026 2.39949 6.49179C2.82605 6.06522 3.0241 5.64253 3.0241 5.03438C3.0241 4.50678 2.92158 3.75444 3.33325 3.3393C3.7482 2.92086 4.50365 3.02385 5.03464 3.02385C5.64277 3.02385 6.06546 2.82581 6.49202 2.39925C7.20285 1.68842 7.55826 1.33301 7.99992 1.33301C8.44157 1.33301 8.79699 1.68842 9.50782 2.39925"
                                                    stroke="#3BB515"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />

                                                <path
                                                    d="M5.66675 6.33333L8.00008 8.66667L14.0002 2"
                                                    stroke="#3BB515"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                    <circle cx="7" cy="7" r="6" stroke="#919EAB" stroke-width="2" />
                                                </svg>
                                        )}
                                    </div>

                                    {/* Label */}
                                    <span
                                        className={`text-xs font-bold ${isCompleted
                                                ? "text-gray-900"
                                                : "text-gray-400"
                                            }`}
                                    >
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
}