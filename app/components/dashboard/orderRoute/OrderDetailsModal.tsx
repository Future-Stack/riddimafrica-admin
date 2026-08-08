"use client";

import React from "react";
import { CheckCircle2, Circle, CircleX } from "lucide-react";

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

    // পরবর্তী স্ট্যাটাসে নেওয়ার নিয়ম
    const getNextStatus = (status: OrderStatus): OrderStatus | null => {
        const idx = TIMELINE_STEPS.indexOf(status);
        if (idx !== -1 && idx < TIMELINE_STEPS.length - 1) {
            return TIMELINE_STEPS[idx + 1];
        }
        return null;
    };

    const nextStatus = getNextStatus(order.status);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40  p-6">
            <div className="bg-[#fdfaf4] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-titleColor cursor-pointer"
                >
                    <CircleX className="w-6 h-6" />
                </button>

                {/* Header Section */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-titleColor font-inter leading-7">
                        Order {order.orderId}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#787A7F] font-medium mt-2 leading-5">
                        @{order.handle} • {order.location} • UGX {order.amount.toLocaleString()}
                    </p>
                </div>

                {/* Modal Body */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Business Info */}
                    <div>
                        <h3 className="text-sm font-bold text-[#3c182f] mb-3">Business Info</h3>
                        <div className="bg-[#f7f2e7] p-4 rounded-xl space-y-3 text-xs sm:text-sm">
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
                    <div>
                        <h3 className="text-sm font-bold text-[#3c182f] mb-4">Order Timeline</h3>
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
                                    <div key={item.label} className="relative flex items-center gap-3">
                                        {/* Line Connector */}
                                        {!isLast && (
                                            <span
                                                className={`absolute left-[9px] top-5 w-[2px] h-6 ${currentStepIndex > item.step ? "bg-emerald-500" : "bg-gray-200"
                                                    }`}
                                            />
                                        )}

                                        {/* Icon */}
                                        {isCompleted ? (
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500 z-10 bg-white rounded-full" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-gray-300 z-10 bg-white rounded-full" />
                                        )}

                                        <span
                                            className={`text-xs font-bold ${isCompleted ? "text-gray-900" : "text-gray-400"
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
            </div>
        </div>
    );
}