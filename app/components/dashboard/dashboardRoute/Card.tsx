import { Clock, Radio } from "lucide-react";
import { StatsCard } from "../../common/StatsCard";

export default function Card() {
  return (
    <main className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          bgColor="bg-[#3C182F]"
          value="12"
          headerProps={{
            title: "Pending Approvals",
            icon: <Clock size={18} className="text-amber-500" />,
            iconBgColor: "bg-[#3A222D]",
          }}
          footerProps={{
            description: "Sellers + Products",
            actionText: "View All →",
            actionHref: "/approvals",
          }}
        />

        <StatsCard
          bgColor="bg-[#3C4762]"
          value="UGX 2.84M"
          headerProps={{
            title: "Today's Revenue",
            icon: <Clock size={18} className="text-pink-400" />,
            iconBgColor: "bg-[#FF525238]",
          }}
          footerProps={{
            description: (
              <span className="flex items-center gap-1">
                <span className="">↑ 18%</span> vs yesterday
              </span>
            ),
            actionText: "View Report →",
            actionHref: "/reports/revenue",
          }}
        />

        <StatsCard
          bgColor="bg-[#23432E]"
          value="12"
          headerProps={{
            title: "Active Orders",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M5.33333 10.6666H10.1755C13.1672 10.6666 13.6222 8.78721 14.174 6.04603C14.3332 5.25539 14.4128 4.86007 14.2214 4.59669C14.03 4.33331 13.6631 4.33331 12.9294 4.33331H12.6667M4 4.33331H5"
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
                  d="M5.33329 10.6666L3.58578 2.34326C3.43739 1.74971 2.90408 1.33331 2.29226 1.33331H1.66663"
                  stroke="#377A7D"
                  stroke-width="1.2"
                  stroke-linecap="round"
                />
                <path
                  d="M5.92 10.6667H5.64571C4.73681 10.6667 4 11.4342 4 12.381C4 12.5388 4.1228 12.6667 4.27429 12.6667H11.6667"
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
          footerProps={{
            description: "8 need attention",
            actionText: "View All →",
            actionHref: "/orders",
          }}
        />

        <StatsCard
          bgColor="bg-[#AB6331]"
          value="1,264"
          headerProps={{
            title: "Radio Listeners",
            icon: <Radio size={18} className="text-[#FD7562]" />,
            iconBgColor: "bg-[#FFC0C0]",
          }}
          footerProps={{
            description: "Stream: LIVE 99.8%",
            actionText: "Manage →",
            actionHref: "/radio/manage",
          }}
        />
      </div>
    </main>
  );
}
