"use client";

import StatusBadge from "@/app/components/common/button/StatusBadge";
import React from "react";
import { PiPackageBold } from "react-icons/pi";
import ViewButton from "../../common/button/ViewButton";
import CardContainer from "../../common/card/CardContainer";
import CardSectionHeader from "../../common/header/CardSectionHeader";
import CommonHeader from "../../common/header/CommonHeader";

interface QuickAction {
  id: string;
  onClick: () => void;
}

interface ActivityItem {
  text: string;
  time: string;
}

const activities: ActivityItem[] = [
  {
    text: "Seller AfroBeatsNG submitted 3 products",
    time: "5m ago",
  },
  {
    text: "Order #ORD-3942 delivered to Lagos",
    time: "22m ago",
  },
  {
    text: "Artist Teni profile approved",
    time: "22m ago",
  },
  {
    text: "Order #ORD-3942 delivered to Lagos",
    time: "22m ago",
  },
  {
    text: "Order #ORD-3942 delivered to Lagos",
    time: "22m ago",
  },
];

const QuickActionsPage: React.FC = () => {
  // --- Mock Data ---
  const quickActions: QuickAction[] = [
    {
      id: "approve-sellers",
      onClick: () => console.log("Approve Sellers clicked"),
    },
    {
      id: "review-products",
      onClick: () => console.log("Review Products clicked"),
    },
    {
      id: "process-payouts",
      onClick: () => console.log("Process Payouts clicked"),
    },
  ];

  return (
    <div className="h-full w-full flex flex-col gap-6">
      <CardContainer>
        <CardSectionHeader title="Quick Actions" />

        <div className="flex flex-wrap gap-4 ">
          {quickActions.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={action.onClick}
              className="flex-1 cursor-pointer border-0 bg-transparent p-0 sm:flex-initial transition-transform active:scale-95 duration-150"
            >
              <StatusBadge
                status={action.id}
                round="round"
                className="w-full justify-center"
              />
            </button>
          ))}
        </div>
      </CardContainer>
      <CardContainer className="flex-1">
        <CardSectionHeader title="Recent Activity" />
        <div className="flex flex-col gap-5">
          {activities.map((item, index) => (
            <div
              key={item.text + index}
              className="flex items-start justify-between gap-4 "
            >
              <div className="flex items-start gap-4">
                <div className=" bg-[#121418] rounded-full p-2">
                  <PiPackageBold className="text-[#23BA7D]! text-3xl" />
                </div>

                <div className="flex flex-col">
                  <CommonHeader size="xs" className="text-[#897766]!">
                    {item.text}
                  </CommonHeader>
                  <CommonHeader size="xs"> {item.time}</CommonHeader>
                </div>
              </div>

              <ViewButton onClick={() => {}} text="View" />
            </div>
          ))}
        </div>
      </CardContainer>
    </div>
  );
};

export default QuickActionsPage;
