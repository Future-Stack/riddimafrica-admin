import Image from "next/image";
import GenericTable, { Column } from "../../reusable/GenericTable";


interface OrderData {
    orderId: string;
    customer: { name: string; email: string; avatar: string };
    product: string;
    amount: string;
    status: "Packaging" | "Delivered" | "Cancelled" | "New" | "Shipped";
}

export function RecentOrdersSection() {
    const orders: OrderData[] = [
        { orderId: "ORD-3941", customer: { name: "Sarah Johnson", email: "sarah.j@email.com", avatar: "/avatar.png" }, product: "Teni Hoodie", amount: "UGX 18,500", status: "Packaging" },
        { orderId: "ORD-3941", customer: { name: "Sarah Johnson", email: "sarah.j@email.com", avatar: "/avatar.png" }, product: "Burna Vinyl LP", amount: "UGX 18,500", status: "Delivered" },
        { orderId: "ORD-3941", customer: { name: "Sarah Johnson", email: "sarah.j@email.com", avatar: "/avatar.png" }, product: "Teni Hoodie", amount: "UGX 18,500", status: "Packaging" },
        { orderId: "ORD-3941", customer: { name: "Sarah Johnson", email: "sarah.j@email.com", avatar: "/avatar.png" }, product: "Burna Vinyl LP", amount: "UGX 18,500", status: "Delivered" },
        { orderId: "ORD-3941", customer: { name: "Sarah Johnson", email: "sarah.j@email.com", avatar: "/avatar.png" }, product: "Teni Hoodie", amount: "UGX 18,500", status: "Packaging" },
        { orderId: "ORD-3941", customer: { name: "Sarah Johnson", email: "sarah.j@email.com", avatar: "/avatar.png" }, product: "Burna Vinyl LP", amount: "UGX 18,500", status: "Delivered" },
    ];

    const columns: Column<OrderData>[] = [
        {
            header: "Order ID",
            key: "orderId",
            render: (row) => <span className="text-[#E6A400] text-sm sm:text-base font-medium leading-5">{row.orderId}</span>
        },
        {
            header: "Customer",
            key: "customer",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <img src="/Container.svg"  /> 
                    <div>
                        <p className="font-medium text-sm sm:text-base text-[#101828] leading-5 font-inter mb-1">{row.customer.name}</p>
                        <p className="text-xs sm:text-sm text-[#6A7282] font-normal font-inter leading-5">{row.customer.email}</p>
                    </div>
                </div>
            )
        },
        {
            header: "Product",
            key: "product",
            render: (row) => row.product,
        },
        {
            header: "Amount",
            key: "amount",
            render: (row) => row.amount,
        },
        {
            header: "Status",
            key: "status",
            render: (row) => {
                const badgeColors: Record<string, string> = {
                    Packaging: "bg-[#B75432] text-white",
                    Delivered: "bg-[#008471] text-white",
                    Cancelled: "bg-[#C9000A] text-white",
                    New: "bg-[#052787] text-white",
                    Shipped: "bg-[#6D2B55] text-white",
                };
                return (
                    <span className={`px-3 py-2 text-xs font-bold rounded-full ${badgeColors[row.status]}`}>
                        {row.status}
                    </span>
                );
            }
        },
        {
            header: "Action",
            key: "action",
            className: "text-center",
            render: () => <button className="text-[#E6A400] text-xs hover:underline font-bold cursor-pointer">View</button>
        }
    ];

    return (
        <div className=" bg-[#FAF7F3] rounded-xl border border-[#E4E6E7] h-full">
            <div className="flex justify-between items-center  px-5 pt-5">
                <h2 className="text-base sm:text-lg font-medium leaidng-7 text-titleColor font-inter">Recent Orders</h2>
                <button className="text-[#E6A400] text-xs font-medium hover:underline cursor-pointer">View all →</button>
            </div>
            <GenericTable data={orders} columns={columns} />
        </div>
    );
}