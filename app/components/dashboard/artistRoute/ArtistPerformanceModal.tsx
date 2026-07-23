import { BarChart2, X } from "lucide-react";
import { ReactNode } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";

export interface MonthlyUnits {
    month: string;
    units: number;
}

export interface ArtistPerformanceData {
    id: number;
    name: string;
    stageName: string;
    genre: string;
    totalSalesUGX: number;
    followers: string;
    merchItemsCount: number;
    unitsLast6mo: number;
    kycStatus: "Pending" | "Complete";
    approvalStatus: "Pending" | "Approved" | "Rejected";
    monthlyUnits: MonthlyUnits[];
}

interface ArtistPerformanceModalProps {
    isOpen: boolean;
    artist: ArtistPerformanceData | null;
    onClose: () => void;
}
interface ChartDataPoint {
    month: string;
    value: number;
}
const data: ChartDataPoint[] = [
    { month: "Jan", value: 40 },
    { month: "Feb", value: 55 },
    { month: "Mar", value: 48 },
    { month: "Apr", value: 72 },
    { month: "May", value: 60 },
    { month: "Jun", value: 85 },
];

const StatCard: React.FC<{ icon: ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="bg-[#F9F5EF] border border-[#F4EFE6] rounded-lg px-3 py-3  gap-2">
        <span className="w-7 h-7  flex items-center justify-center text-sm mb-4">{icon}</span>
        <div>
            <p className="text-base sm:text-lg font-medium text-black font-inter leading-tight mb-3">{value}</p>
            <p className="text-sm text-[#787A7F] font-inter font-medium leading-tight">{label}</p>
        </div>
    </div>
);

export function ArtistPerformanceModal({ isOpen, artist, onClose }: ArtistPerformanceModalProps) {
    if (!isOpen || !artist) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
            <div className="w-full max-w-2xl bg-white border border-[#EFEAE2] rounded-2xl p-6 shadow-xl relative">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <span className="w-10 h-10 rounded-lg bg-[#23BA7D1A] flex items-center justify-center text-[#0b663b]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <path d="M11.25 12.5V6.25" stroke="#23BA7D" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M7.5 12.5V2.5" stroke="#23BA7D" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M3.75 12.5V8.75" stroke="#23BA7D" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                        <div>
                            <p className="text-xl md:text-2xl  font-bold text-titleColor leading-7 font-inter">{artist.stageName} — Performance</p>
                            <p className="text-xs text-[#23BA7D] font-medium font-inter leading-5 ">Sales &amp; reach over the last 6 months</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3E2723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15 9L9 15" stroke="#3E2723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M9 9L15 15" stroke="#3E2723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-3">
                    <StatCard 
                    icon={<svg xmlns=" http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 1.33325L2 3.99992V13.3333C2 13.6869 2.14048 14.026 2.39052 14.2761C2.64057 14.5261 2.97971 14.6666 3.33333 14.6666H12.6667C13.0203 14.6666 13.3594 14.5261 13.6095 14.2761C13.8595 14.026 14 13.6869 14 13.3333V3.99992L12 1.33325H4Z" stroke="#E6A400" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M2 4H14" stroke="#E6A400" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.6666 6.66675C10.6666 7.37399 10.3856 8.05227 9.88554 8.55237C9.38544 9.05246 8.70716 9.33341 7.99992 9.33341C7.29267 9.33341 6.6144 9.05246 6.1143 8.55237C5.6142 8.05227 5.33325 7.37399 5.33325 6.66675" stroke="#E6A400" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                </svg>} 
                 label="Total Sales" value={`UGX ${artist.totalSalesUGX.toLocaleString()}`} />
                    <StatCard 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M12 4.77325C11.96 4.76659 11.9133 4.76659 11.8733 4.77325C10.9533 4.73992 10.22 3.98659 10.22 3.05325C10.22 2.09992 10.9866 1.33325 11.94 1.33325C12.8933 1.33325 13.66 2.10659 13.66 3.05325C13.6533 3.98659 12.92 4.73992 12 4.77325Z" stroke="#23BA7D" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.3132 9.62669C12.2265 9.78003 13.2332 9.62003 13.9399 9.14669C14.8799 8.52003 14.8799 7.49336 13.9399 6.86669C13.2265 6.39336 12.2065 6.23336 11.2932 6.39336" stroke="#23BA7D" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M3.98007 4.77325C4.02007 4.76659 4.06674 4.76659 4.10674 4.77325C5.02674 4.73992 5.76007 3.98659 5.76007 3.05325C5.76007 2.09992 4.9934 1.33325 4.04007 1.33325C3.08674 1.33325 2.32007 2.10659 2.32007 3.05325C2.32674 3.98659 3.06007 4.73992 3.98007 4.77325Z" stroke="#23BA7D" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M4.66663 9.62669C3.75329 9.78003 2.74663 9.62003 2.03996 9.14669C1.09996 8.52003 1.09996 7.49336 2.03996 6.86669C2.75329 6.39336 3.77329 6.23336 4.68663 6.39336" stroke="#23BA7D" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7.99997 9.75323C7.95997 9.74657 7.9133 9.74657 7.8733 9.75323C6.9533 9.7199 6.21997 8.96657 6.21997 8.03323C6.21997 7.0799 6.98664 6.31323 7.93997 6.31323C8.8933 6.31323 9.65997 7.08657 9.65997 8.03323C9.6533 8.96657 8.91997 9.72657 7.99997 9.75323Z" stroke="#23BA7D" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6.05998 11.8532C5.11998 12.4799 5.11998 13.5066 6.05998 14.1332C7.12665 14.8466 8.87331 14.8466 9.93998 14.1332C10.88 13.5066 10.88 12.4799 9.93998 11.8532C8.87998 11.1466 7.12665 11.1466 6.05998 11.8532Z" stroke="#23BA7D" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>}
                     label="Followers" value={artist.followers} />
                    <StatCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M2.11328 4.95996L7.99994 8.36662L13.8466 4.97994" stroke="#C45F3F" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8 14.4065V8.35986" stroke="#C45F3F" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M14.4066 6.11325V9.88661C14.4066 9.91994 14.4066 9.94658 14.3999 9.97991C13.9333 9.57325 13.3333 9.33326 12.6666 9.33326C12.0399 9.33326 11.4599 9.55327 10.9999 9.91993C10.3866 10.4066 9.99992 11.1599 9.99992 11.9999C9.99992 12.4999 10.1399 12.9733 10.3866 13.3733C10.4466 13.4799 10.5199 13.5799 10.5999 13.6733L9.37992 14.3466C8.61992 14.7733 7.37991 14.7733 6.61991 14.3466L3.05992 12.3733C2.25325 11.9266 1.59326 10.8066 1.59326 9.88661V6.11325C1.59326 5.19325 2.25325 4.07327 3.05992 3.6266L6.61991 1.65325C7.37991 1.22659 8.61992 1.22659 9.37992 1.65325L12.9399 3.6266C13.7466 4.07327 14.4066 5.19325 14.4066 6.11325Z" stroke="#C45F3F" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15.3333 11.9999C15.3333 12.7999 14.98 13.5133 14.4267 13.9999C13.9533 14.4133 13.34 14.6666 12.6667 14.6666C11.1933 14.6666 10 13.4733 10 11.9999C10 11.1599 10.3867 10.4066 11 9.91992C11.46 9.55326 12.04 9.33325 12.6667 9.33325C14.14 9.33325 15.3333 10.5266 15.3333 11.9999Z" stroke="#C45F3F" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12.8333 11.1665V12.1665L12 12.6665" stroke="#C45F3F" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>}
                    label="Merch Items" value={String(artist.merchItemsCount).padStart(2, "0")} />
                    <StatCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3.99984 2.66675L6.6665 2.66675M2.6665 6.66675L2.6665 4.00008M7.99984 4.00008L7.99984 6.66675M3.99984 8.00008H6.6665M9.33317 8.00008L11.9998 8.00008M13.3332 9.33341V12.0001M7.99984 9.33341L7.99984 12.0001M9.33317 13.3334H11.9998" stroke="#0840DF" stroke-linecap="round" stroke-linejoin="round" />
                            <circle cx="2.66683" cy="2.66683" r="1.33333" stroke="#0840DF" stroke-linecap="round" stroke-linejoin="round" />
                            <circle cx="2.66683" cy="8.00008" r="1.33333" stroke="#0840DF" stroke-linecap="round" stroke-linejoin="round" />
                            <circle cx="7.99984" cy="2.66683" r="1.33333" stroke="#0840DF" stroke-linecap="round" stroke-linejoin="round" />
                            <circle cx="7.99984" cy="8.00008" r="1.33333" stroke="#0840DF" stroke-linecap="round" stroke-linejoin="round" />
                            <circle cx="13.3333" cy="8.00008" r="1.33333" stroke="#0840DF" stroke-linecap="round" stroke-linejoin="round" />
                            <circle cx="7.99984" cy="13.3333" r="1.33333" stroke="#0840DF" stroke-linecap="round" stroke-linejoin="round" />
                            <circle cx="13.3333" cy="13.3333" r="1.33333" stroke="#0840DF" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>}
                     label="Units (6mo)" value={String(artist.unitsLast6mo)} />
                </div>

                <p className="text-sm font-medium text-[#787A7F] leading-5 font-inter mb-4">Monthly Units Sold</p>
          

                <div className="w-full h-[280px] sm:h-[320px] mb-3">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            barGap={8}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#181B1F"
                            />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#787A7F", fontSize: 13, fontWeight: 400 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                ticks={[0, 20, 40, 60, 80]}
                                domain={[0, 85]}
                                tick={{ fill: "#787A7F", fontSize: 13, fontWeight: 400 }}
                            />
                            <Bar
                                dataKey="value"
                                fill="#10B981"
                                radius={[4, 4, 0, 0]} 
                                maxBarSize={64}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex items-center justify-between pt-3 pb-6 border-t border-green-100">
                    <div className="flex items-center justify-center gap-3">
                        <span className="text-xs font-normal leading-4 px-3 py-2 mt-3 rounded-[6px] bg-[#6F2C57] text-[#FAF7F3]">
                            {artist.genre}
                        </span>
                        <span className="text-[#787A7F] font-medium text-sm font-inter leading-6 mt-2">
                            KYC: <span className="text-[#E6A400] ">{artist.kycStatus}</span>
                        </span>
                 </div>
                    <div className=" mt-4">
                        <span className="text-[#787A7F] font-medium text-sm font-inter leading-6">
                            Status: <span className="text-[#3BB515] ">{artist.approvalStatus}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}