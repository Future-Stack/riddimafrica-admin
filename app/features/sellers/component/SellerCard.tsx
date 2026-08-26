import { StatsCard } from "@/app/components/reusable/StatsCard";
import { Radio } from "lucide-react";

export default function SellerCard() {
  return (
    <main className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          bgColor="bg-[#3C182F]"
          value="200"
          headerProps={{
            title: "Total Registered Seller",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M13.8493 12C14.3488 12 14.7462 11.6856 15.1029 11.2461C15.8332 10.3463 14.6342 9.62723 14.1768 9.27507C13.712 8.91708 13.1929 8.71428 12.6666 8.66667M11.9999 7.33333C12.9204 7.33333 13.6666 6.58714 13.6666 5.66667C13.6666 4.74619 12.9204 4 11.9999 4"
                  stroke="#E6A400"
                  stroke-linecap="round"
                />
                <path
                  d="M2.1506 12C1.65106 12 1.25374 11.6856 0.89699 11.2461C0.166685 10.3463 1.36574 9.62723 1.82306 9.27507C2.28794 8.91708 2.80701 8.71428 3.33329 8.66667M3.66663 7.33333C2.74615 7.33333 1.99996 6.58714 1.99996 5.66667C1.99996 4.74619 2.74615 4 3.66663 4"
                  stroke="#E6A400"
                  stroke-linecap="round"
                />
                <path
                  d="M5.3891 10.074C4.70792 10.4953 2.92189 11.3553 4.0097 12.4315C4.54108 12.9573 5.13291 13.3333 5.87698 13.3333H10.1228C10.8669 13.3333 11.4587 12.9573 11.9901 12.4315C13.0779 11.3553 11.2919 10.4953 10.6107 10.074C9.01333 9.08632 6.98647 9.08632 5.3891 10.074Z"
                  stroke="#E6A400"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.3332 5.00008C10.3332 6.28875 9.28856 7.33341 7.9999 7.33341C6.71123 7.33341 5.66656 6.28875 5.66656 5.00008C5.66656 3.71142 6.71123 2.66675 7.9999 2.66675C9.28856 2.66675 10.3332 3.71142 10.3332 5.00008Z"
                  stroke="#E6A400"
                />
              </svg>
            ),
            iconBgColor: "bg-[#E6A40026]",
          }}
        />

        <StatsCard
          bgColor="bg-[#3C4762]"
          value="180"
          headerProps={{
            title: "Active Seller",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M8.00002 8.00016C9.84097 8.00016 11.3334 6.50778 11.3334 4.66683C11.3334 2.82588 9.84097 1.3335 8.00002 1.3335C6.15907 1.3335 4.66669 2.82588 4.66669 4.66683C4.66669 6.50778 6.15907 8.00016 8.00002 8.00016Z"
                  stroke="#E200E6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.27332 14.6667C2.27332 12.0867 4.83998 10 7.99998 10C8.63998 10 9.25999 10.0867 9.83999 10.2467"
                  stroke="#E200E6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.6666 12.0002C14.6666 12.5002 14.5267 12.9735 14.28 13.3735C14.14 13.6135 13.96 13.8268 13.7533 14.0002C13.2866 14.4202 12.6733 14.6668 12 14.6668C11.0266 14.6668 10.18 14.1468 9.71997 13.3735C9.4733 12.9735 9.33331 12.5002 9.33331 12.0002C9.33331 11.1602 9.71998 10.4068 10.3333 9.92017C10.7933 9.5535 11.3733 9.3335 12 9.3335C13.4733 9.3335 14.6666 10.5268 14.6666 12.0002Z"
                  stroke="#E200E6"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.96 12L11.62 12.66L13.04 11.3467"
                  stroke="#E200E6"
                  stroke-width="0.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ),
            iconBgColor: "bg-[#FF525238]",
          }}
        />

        <StatsCard
          bgColor="bg-[#23432E]"
          value="10"
          headerProps={{
            title: "KYC Pending",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M5.33333 10.6666H10.1755C13.1672 10.6666 13.6222 8.78715 14.174 6.04597C14.3332 5.25533 14.4128 4.86001 14.2214 4.59663C14.03 4.33325 13.6631 4.33325 12.9294 4.33325H12.6667M4 4.33325H5"
                  stroke="#377A7D"
                  stroke-width="1.2"
                  stroke-linecap="round"
                />
                <path
                  d="M7 4.66667C7 4.66667 7.66667 4.66667 8.33333 6C8.33333 6 10.451 2.66667 12.3333 2"
                  stroke="#377A7D"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.33329 10.6666L3.58578 2.3432C3.43739 1.74965 2.90408 1.33325 2.29226 1.33325H1.66663"
                  stroke="#377A7D"
                  stroke-width="1.2"
                  stroke-linecap="round"
                />
                <path
                  d="M5.92 10.6667H5.64571C4.73681 10.6667 4 11.4343 4 12.381C4 12.5388 4.1228 12.6667 4.27429 12.6667H11.6667"
                  stroke="#377A7D"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle
                  cx="7"
                  cy="13.6667"
                  r="1"
                  stroke="#377A7D"
                  stroke-width="1.2"
                />
                <circle
                  cx="11.6666"
                  cy="13.6667"
                  r="1"
                  stroke="#377A7D"
                  stroke-width="1.2"
                />
              </svg>
            ),
            iconBgColor: "bg-[#A3C2C3]",
          }}
        />

        <StatsCard
          bgColor="bg-[#AB6331]"
          value="+14"
          headerProps={{
            title: "New this month",
            icon: <Radio size={18} className="text-[#FD7562]" />,
            iconBgColor: "bg-[#FFC0C0]",
          }}
        />
      </div>
    </main>
  );
}
