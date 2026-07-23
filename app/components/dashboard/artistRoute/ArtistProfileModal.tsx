import { useState } from "react";
import { CircleX, X } from "lucide-react";

export interface ArtistProfileData {
    id: number;
    name: string;
    stageName: string;
    genre: string;
    avatar: string;
    followers: string;
    bio: string;
    authorizedAsPresenter: boolean;
    featuredOnHomepage: boolean;
    verificationStatus: "Pending" | "Approved" | "Rejected";
    merchItemsCount: number;
    totalSalesUGX: number;
    kycStatus: "Pending" | "Complete";
    approveRequestStatus: "Pending" | "Approved" | "Rejected";
    merchandiseItems: string[];
}

interface ArtistProfileModalProps {
    isOpen: boolean;
    artist: ArtistProfileData | null;
    onClose: () => void;
    onApprove: (id: number) => void;
    onReject: (id: number) => void;
    onMessage: (id: number) => void;
}

const StatChip: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="bg-[#F9F5EF] rounded-[8px] px-4 py-3 ">
        <p className="text-sm text-[#787A7F] font-medium font-inter leading-5.5 mb-1.5">{label}</p>
        <p className="text-base md:text-lg font-medium font-inter leading-7 text-black">{value}</p>
    </div>
);

export function ArtistProfileModal({
    isOpen,
    artist,
    onClose,
    onApprove,
    onReject,
    onMessage,
}: ArtistProfileModalProps) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);

    if (!isOpen || !artist) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 ">
            <div className="w-full max-w-3xl bg-white border border-[#EFEAE2] rounded-2xl p-6 shadow-xl relative">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl md:text-2xl  font-bold text-titleColor leading-7 font-inter">Artist Profile</h2>
                    <button onClick={onClose} className="text-[#3E2723] hover:text-gray-600 cursor-pointer">
                        <CircleX />
                    </button>
                </div>

             <div className="flex items-center justify-between mb-6">
                    <div className="flex items-start justify-between gap-3 ">
                        <div className="flex items-center gap-3">
                            <img src={artist.avatar} alt={artist.name} className="w-12 h-12 rounded-full object-cover" />
                            <div>
                                <p className="text-base md:text-lg font-medium text-black font-inter leading-7">{artist.name}</p>
                                <p className="text-sm text-[#E6A400] font-medium font-inter leading-5">@{artist.stageName}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs font-normal font-inter px-3 py-1.5 rounded-full bg-[#F4D24233] text-[#E5B54F]">{artist.genre}</span>
                                    <span className="text-xs font-normal font-inter px-3 py-1.5 rounded-full bg-[#F4D24233] text-[#E5B54F]">{artist.followers} Followers</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 ">
                        <label className="flex items-center justify-end gap-2 cursor-pointer text-sm font-medium text-black leading-5 font-inter">
                            <span>Authorized as Presenter</span>
                            <input type="checkbox" checked={isAuthorized} onChange={() => setIsAuthorized(!isAuthorized)} className="sr-only peer" />
                            <div
                                onClick={() => setIsAuthorized(!isAuthorized)}
                                className={`relative w-11 h-6 rounded-full transition-colors ${isAuthorized ? "bg-[#543D2B]" : "bg-gray-200"}`}
                            >
                                <div className={`absolute top-0.5 h-5 w-5 bg-white border border-gray-300 rounded-full transition-all ${isAuthorized ? "left-[22px]" : "left-[2px]"}`} />
                            </div>
                        </label>
                        <label className="flex items-center justify-end gap-2 cursor-pointer text-sm font-medium text-black leading-5 font-inter">
                            <span>Feature on Homepage</span>
                            <div
                                onClick={() => setIsFeatured(!isFeatured)}
                                className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${isFeatured ? "bg-[#543D2B]" : "bg-gray-200"}`}
                            >
                                <div className={`absolute top-0.5 h-5 w-5 bg-white border border-gray-300 rounded-full transition-all ${isFeatured ? "left-[22px]" : "left-[2px]"}`} />
                            </div>
                        </label>
                    </div>

             </div>
            

                <div className="flex items-center justify-between mb-6">
                    <span className="flex items-center gap-1 text-sm md:text-base font-medium text-black leading-6 underline font-inter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18.9905 19H19M18.9905 19C18.3678 19.6175 17.2393 19.4637 16.4479 19.4637C15.4765 19.4637 15.0087 19.6537 14.3154 20.347C13.7251 20.9374 12.9337 22 12 22C11.0663 22 10.2749 20.9374 9.68457 20.347C8.99128 19.6537 8.52349 19.4637 7.55206 19.4637C6.76068 19.4637 5.63218 19.6175 5.00949 19C4.38181 18.3776 4.53628 17.2444 4.53628 16.4479C4.53628 15.4414 4.31616 14.9786 3.59938 14.2618C2.53314 13.1956 2.00002 12.6624 2 12C2.00001 11.3375 2.53312 10.8044 3.59935 9.73817C4.2392 9.09832 4.53628 8.46428 4.53628 7.55206C4.53628 6.76065 4.38249 5.63214 5 5.00944C5.62243 4.38178 6.7556 4.53626 7.55208 4.53626C8.46427 4.53626 9.09832 4.2392 9.73815 3.59937C10.8044 2.53312 11.3375 2 12 2C12.6625 2 13.1956 2.53312 14.2618 3.59937C14.9015 4.23907 15.5355 4.53626 16.4479 4.53626C17.2393 4.53626 18.3679 4.38247 18.9906 5C19.6182 5.62243 19.4637 6.75559 19.4637 7.55206C19.4637 8.55858 19.6839 9.02137 20.4006 9.73817C21.4669 10.8044 22 11.3375 22 12C22 12.6624 21.4669 13.1956 20.4006 14.2618C19.6838 14.9786 19.4637 15.4414 19.4637 16.4479C19.4637 17.2444 19.6182 18.3776 18.9905 19Z" stroke="#3BB515" stroke-width="1.5" />
                            <path d="M9 12.8929C9 12.8929 10.2 13.5447 10.8 14.5C10.8 14.5 12.6 10.75 15 9.5" stroke="#3BB515" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                         Verification Badge Request</span>
                    <span
                        className={`text-sm md:text-base  font-bold px-4 py-2 rounded-full ${artist.verificationStatus === "Approved"
                            ? "bg-[#0b663b] text-white"
                            : artist.verificationStatus === "Rejected"
                                ? "bg-[#b84b42] text-white"
                                : "bg-[#E6A400] text-white"
                            }`}
                    >
                        {artist.verificationStatus}
                    </span>
                </div>
                <p className="text-sm sm:text-base font-medium font-inter text-gray-700 leading-4 mb-3">{artist.bio}</p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                    <StatChip label="Merch Items" value={String(artist.merchItemsCount)} />
                    <StatChip label="Total Sales" value={`UGX ${artist.totalSalesUGX.toLocaleString()}`} />
                    <StatChip label="KYC Status" value={artist.kycStatus} />
                    <StatChip label="Approve Request" value={artist.approveRequestStatus} />
                </div>

                <div className="mb-13">
                    <p className="text-sm sm:text-base font-medium font-inter text-gray-700 leading-4 mb-3">Merchandise Items</p>
                    <div className="flex flex-wrap gap-2">
                        {artist.merchandiseItems.map((item) => (
                            <span key={item} className="text-sm sm:text-base font-medium font-inter leading-6 px-5 py-3 rounded-[8px] bg-[#EBF2F2]  text-green-600 ">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => onApprove(artist.id)}
                        className=" rounded-lg bg-[#E6A400] py-3 px-7 text-center text-sm font-medium font-inter leading-5 text-white hover:bg-[#dd951b] transition-colors cursor-pointer"
                    >
                        Approve
                    </button>
                    <button
                        onClick={() => onReject(artist.id)}
                        className=" rounded-lg bg-[#D4183D1A] border border-[#D4183D4D] py-3 px-7 text-center text-sm font-medium font-inter leading-5 text-[#FF6467] hover:bg-[#ffeaea] transition-colors cursor-pointer"
                    >
                        Reject
                    </button>
                    <button
                        onClick={() => onMessage(artist.id)}
                        className=" rounded-lg bg-[#1E4345] border border-[#377A7D] py-3 px-7 text-center text-sm font-medium font-inter leading-5 text-white hover:bg-[#0d281b] transition-colors cursor-pointer"
                    >
                        Message Artist
                    </button>
                </div>
            </div>
        </div>
    );
}