import { BarChart2, X } from "lucide-react";

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

const StatCard: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
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

    const maxUnits = Math.max(...artist.monthlyUnits.map((m) => m.units), 1);

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

                <div className="grid grid-cols-4 gap-2 mb-6">
                    <StatCard icon="" label="Total Sales" value={`UGX ${artist.totalSalesUGX.toLocaleString()}`} />
                    <StatCard icon="👤" label="Followers" value={artist.followers} />
                    <StatCard icon="🛍️" label="Merch Items" value={String(artist.merchItemsCount).padStart(2, "0")} />
                    <StatCard icon="📈" label="Units (6mo)" value={String(artist.unitsLast6mo)} />
                </div>

                <p className="text-sm font-semibold text-[#3D2612] mb-3">Monthly Units Sold</p>
                <div className="flex items-end justify-between gap-3 h-40 mb-4 px-2">
                    {artist.monthlyUnits.map((m) => (
                        <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full flex items-end justify-center h-32">
                                <div
                                    className="w-6 sm:w-8 rounded-t-md bg-[#3EB56F]"
                                    style={{ height: `${(m.units / maxUnits) * 100}%` }}
                                    title={`${m.units} units`}
                                />
                            </div>
                            <span className="text-[10px] text-[#A3968A]">{m.month}</span>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#F4EFE6]">
                    <span className="text-[10px] px-2 py-1 rounded-full bg-[#7234CA29] text-[#7234CA] border border-[#7234CA57]">
                        {artist.genre}
                    </span>
                    <div className="flex items-center gap-4 text-xs">
                        <span className="text-[#A3968A]">
                            KYC: <span className="text-[#F5A623] font-medium">{artist.kycStatus}</span>
                        </span>
                        <span className="text-[#A3968A]">
                            Status: <span className="text-[#166534] font-medium">{artist.approvalStatus}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}