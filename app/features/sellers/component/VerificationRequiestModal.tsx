import { X, Eye, Download, FileText, CircleX } from "lucide-react";

export interface VerificationDocument {
    name: string;
    fileName: string;
    date: string;
}

export interface VerificationReviewData {
    kycId: string;
    submittedAt: string;
    name: string;
    handle: string;
    email: string;
    phone: string;
    business: string;
    businessType: string;
    paymentMethod: string;
    accountMasked: string;
    documents: VerificationDocument[];
}

interface VerificationBadgeReviewModalProps {
    isOpen: boolean;
    data: VerificationReviewData | null;
    onClose: () => void;
    onApprove: () => void;
    onReject: () => void;
}

export function VerificationBadgeReviewModal({
    isOpen,
    data,
    onClose,
    onApprove,
    onReject,
}: VerificationBadgeReviewModalProps) {
    if (!isOpen || !data) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-2xl w-full max-w-3xl p-6 font-inter shadow-xl">
                <div className="flex items-start justify-between mb-1">
                    <h2 className="text-xl md:text-2xl  font-bold text-titleColor leading-7 font-inter">Verification Badge Review</h2>
                    <button onClick={onClose} className="text-brown-400 hover:text-black cursor-pointer" aria-label="Close">
                        <CircleX size={20} />
                    </button>
                </div>
                <p className="text-sm text-[#787A7F] font-medium font-inter leading-5 mb-6">
                    {data.kycId} · Submitted {data.submittedAt}
                </p>

                <div className="grid grid-cols-2 gap-x-16 gap-y-4 mb-5 bg-[#F9F5EF] p-5 rounded-xl mb-6">
                    <div>
                        <p className="text-sm font-medium font-inter leading-5 text-black mb-2">Seller Profile</p>
                        <div className="space-y-2.5 ">
                            <div className="flex justify-between text-xs font-medium font-inter border-b border-[#181B1F1A] pb-1.5">
                                <span className="text-gray-700 leading-4.5">Name</span>
                                <span className="text-sm font-medium font-inter leading-5 text-black ">{data.name}</span>
                            </div>
                            <div className="flex justify-between text-xs font-medium font-inter border-b border-[#181B1F1A] pb-1.5">
                                <span className="text-gray-700 leading-4.5">Handle</span>
                                <span className="text-sm font-medium font-inter leading-5 text-black ">@{data.handle}</span>
                            </div>
                            <div className="flex justify-between text-xs font-medium font-inter border-b border-[#181B1F1A] pb-1.5">
                                <span className="text-gray-700 leading-4.5">Email</span>
                                <span className="ttext-sm font-medium font-inter leading-5 text-black ">{data.email}</span>
                            </div>
                            <div className="flex justify-between text-xs font-medium font-inter border-b border-[#181B1F1A] pb-1.5">
                                <span className="text-gray-700 leading-4.5">Phone</span>
                                <span className="text-sm font-medium font-inter leading-5 text-black ">{data.phone}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-medium font-inter leading-5 text-black mb-2">Business Details</p>
                        <div className="space-y-2.5">
                            <div className="flex justify-between text-xs font-medium font-inter border-b border-[#181B1F1A]">
                                <span className="text-gray-700 leading-4.5">Business</span>
                                <span className="text-sm font-medium font-inter leading-5 text-black  text-right">{data.business}</span>
                            </div>
                            <div className="flex justify-between text-xs font-medium font-inter border-b border-[#181B1F1A]">
                                <span className="text-gray-700 leading-4.5">Type</span>
                                <span className="text-sm font-medium font-inter leading-5 text-black  text-right">{data.businessType}</span>
                            </div>
                            <div className="flex justify-between text-xs font-medium font-inter border-b border-[#181B1F1A]">
                                <span className="text-gray-700 leading-4.5">Payment Method</span>
                                <span className="text-sm font-medium font-inter leading-5 text-black ">{data.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between text-xs font-medium font-inter border-b border-[#181B1F1A]">
                                <span className="text-gray-700 leading-4.5">Account</span>
                                <span className="text-sm font-medium font-inter leading-5 text-black ">{data.accountMasked}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-base sm:text-lg font-sbold text-gray-700 font-inter leading-7 mb-4">Submitted Documents</p>
                <div className="space-y-2 mb-15">
                    {data.documents.map((doc) => (
                        <div
                            key={doc.fileName}
                            className="flex items-center justify-between bg-[#F1EAEE] border border-[#592346] rounded-[12px] p-4"
                        >
                            <div className="flex items-center gap-2.5">
                                <span className="text-[#3C182F] bg-[#431A34] p-2 rounded-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M4.66675 11.9998V10.3332M4.66675 10.3332V9.33317C4.66675 9.0189 4.66675 8.86177 4.76926 8.76413C4.87177 8.6665 5.03676 8.6665 5.36675 8.6665H5.83341C6.31666 8.6665 6.70841 9.0396 6.70841 9.49984C6.70841 9.96007 6.31666 10.3332 5.83341 10.3332H4.66675ZM14.0001 8.6665H13.1251C12.5751 8.6665 12.3001 8.6665 12.1293 8.82922C11.9584 8.99194 11.9584 9.25383 11.9584 9.77761V10.3332M11.9584 11.9998V10.3332M11.9584 10.3332H13.4167M10.5001 10.3332C10.5001 11.2536 9.71658 11.9998 8.75008 11.9998C8.532 11.9998 8.42297 11.9998 8.34175 11.9552C8.14729 11.8483 8.16675 11.6318 8.16675 11.4443V9.22206C8.16675 9.03453 8.14729 8.81808 8.34175 8.71116C8.42297 8.6665 8.532 8.6665 8.75008 8.6665C9.71658 8.6665 10.5001 9.4127 10.5001 10.3332Z" stroke="#EBF2F2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M9.99992 14.6665H7.15143C4.9773 14.6665 3.89023 14.6665 3.1353 14.1346C2.919 13.9822 2.72697 13.8015 2.56505 13.5979C1.99992 12.8874 1.99992 11.8643 1.99992 9.81802V8.12105C1.99992 6.1456 1.99992 5.15788 2.31254 4.36901C2.81513 3.10079 3.87801 2.10043 5.22549 1.62741C6.06367 1.33317 7.11313 1.33317 9.21204 1.33317C10.4114 1.33317 11.0111 1.33317 11.4901 1.50131C12.2601 1.7716 12.8674 2.34324 13.1546 3.06793C13.3333 3.51872 13.3333 4.08313 13.3333 5.21196V6.6665" stroke="#EBF2F2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M2.00008 8C2.00008 6.7727 2.995 5.77778 4.2223 5.77778C4.66616 5.77778 5.18944 5.85555 5.62099 5.73992C6.00443 5.63718 6.30392 5.33768 6.40667 4.95424C6.5223 4.52269 6.44453 3.99941 6.44453 3.55556C6.44453 2.32826 7.43945 1.33333 8.66675 1.33333" stroke="#EBF2F2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                                <div>
                                    <p className="text-sm font-medium text-gray-800 font-inter leading-5 mb-1">{doc.name}</p>
                                    <p className="text-xs text-[#787A7F] font-medium leading-4 font-inter">{doc.fileName} · {doc.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 ">
                                <button className="text-white bg-[#E5B54F] py-2 px-2.5 rounded-md hover:opacity-80 cursor-pointer" aria-label="Preview">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M10.3866 7.99995C10.3866 9.31995 9.31995 10.3866 7.99995 10.3866C6.67995 10.3866 5.61328 9.31995 5.61328 7.99995C5.61328 6.67995 6.67995 5.61328 7.99995 5.61328C9.31995 5.61328 10.3866 6.67995 10.3866 7.99995Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M7.9999 13.5133C10.3532 13.5133 12.5466 12.1266 14.0732 9.72665C14.6732 8.78665 14.6732 7.20665 14.0732 6.26665C12.5466 3.86665 10.3532 2.47998 7.9999 2.47998C5.64656 2.47998 3.45323 3.86665 1.92656 6.26665C1.32656 7.20665 1.32656 8.78665 1.92656 9.72665C3.45323 12.1266 5.64656 13.5133 7.9999 13.5133Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                                <button className="flex items-center gap-1 bg-[#431A34] text-white text-[11px] font-medium px-3 py-1.5 rounded-md hover:opacity-90 cursor-pointer">
                                    <Download size={12} />
                                    Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={onApprove}
                        className="rounded-lg bg-[#E6A400] py-3 px-7 text-center text-sm font-medium font-inter leading-5 text-white hover:bg-[#dd951b] transition-colors cursor-pointer"
                    >
                        Approve
                    </button>
                    <button
                        onClick={onReject}
                        className="rounded-lg bg-[#D4183D1A] border border-[#D4183D4D] py-3 px-7 text-center text-sm font-medium font-inter leading-5 text-[#FF6467] hover:bg-[#ffeaea] transition-colors cursor-pointer"
                    >
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
}