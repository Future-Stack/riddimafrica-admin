"use client";

import StatusBadge from "@/app/components/common/button/StatusBadge";
import ViewButton from "@/app/components/common/button/ViewButton";
import GenericTable, { Column } from "../../common/GenericTable";
import CardContainer from "../../common/card/CardContainer";
import CardSectionHeader from "../../common/header/CardSectionHeader";
import CommonHeader from "../../common/header/CommonHeader";

interface OrderData {
  orderId: string;
  customer: { name: string; email: string; avatar: string };
  product: string;
  amount: string;
  status: "Packaging" | "Delivered" | "Cancelled" | "New" | "Shipped";
}

export const RecentOrdersSection = () => {
  const orders: OrderData[] = [
    {
      orderId: "ORD-3941",
      customer: {
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        avatar: "/avatar.png",
      },
      product: "Teni Hoodie",
      amount: "UGX 18,500",
      status: "Packaging",
    },
    {
      orderId: "ORD-3941",
      customer: {
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        avatar: "/avatar.png",
      },
      product: "Burna Vinyl LP",
      amount: "UGX 18,500",
      status: "Delivered",
    },
    {
      orderId: "ORD-3941",
      customer: {
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        avatar: "/avatar.png",
      },
      product: "Teni Hoodie",
      amount: "UGX 18,500",
      status: "Packaging",
    },
    {
      orderId: "ORD-3941",
      customer: {
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        avatar: "/avatar.png",
      },
      product: "Burna Vinyl LP",
      amount: "UGX 18,500",
      status: "Delivered",
    },
    {
      orderId: "ORD-3941",
      customer: {
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        avatar: "/avatar.png",
      },
      product: "Teni Hoodie",
      amount: "UGX 18,500",
      status: "Packaging",
    },
    {
      orderId: "ORD-3941",
      customer: {
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        avatar: "/avatar.png",
      },
      product: "Burna Vinyl LP",
      amount: "UGX 18,500",
      status: "Delivered",
    },
  ];

  const columns: Column<OrderData>[] = [
    {
      header: "Order ID",
      key: "orderId",
      render: (row) => (
        <CommonHeader className="text-yellow" size="md">
          {row.orderId}
        </CommonHeader>
      ),
    },
    {
      header: "Customer",
      key: "customer",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src="/Container.svg" />
          <div>
            <CommonHeader className="text-[#101828]" size="md">
              {row.customer.name}
            </CommonHeader>
            <CommonHeader className="" size="sm">
              {row.customer.email}
            </CommonHeader>
          </div>
        </div>
      ),
    },
    {
      header: "Product",
      key: "product",
      render: (row) => (
        <CommonHeader className="text-[#3D2513]!" size="md">
          {row.product}
        </CommonHeader>
      ),
    },
    {
      header: "Amount",
      key: "amount",
      render: (row) => (
        <CommonHeader className="text-[#3D2513]!" size="md">
          {row.amount}
        </CommonHeader>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: "Action",
      key: "action",
      className: "text-center",
      render: () => <ViewButton onClick={() => {}} text="View" />,
    },
  ];

  return (
    <CardContainer className="h-full flex flex-col">
      <div className="flex justify-between items-center">
        <CardSectionHeader title="Recent Orders" />

        <ViewButton onClick={() => {}} text="View all" isIcon />
      </div>
      <GenericTable data={orders} columns={columns} />
    </CardContainer>
  );
};
