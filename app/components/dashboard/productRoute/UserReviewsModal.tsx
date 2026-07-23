import { Star, CircleX, EyeOff, Trash2 } from "lucide-react";

export interface ProductReviewItem {
    id: number;
    name: string;
    handle: string;
    avatar: string;
    rating: number;
    date: string;
    title: string;
    body: string;
    hidden?: boolean;
}

export interface UserReviewsData {
    productName: string;
    averageRating: number;
    totalReviews: number;
    breakdown: { star: 5 | 4 | 3 | 2 | 1; count: number }[];
    reviews: ProductReviewItem[];
}

interface UserReviewsModalProps {
    isOpen: boolean;
    data: UserReviewsData | null;
    onClose: () => void;
    onHideReview: (reviewId: number) => void;
    onDeleteReview: (reviewId: number) => void;
}

export function UserReviewsModal({ isOpen, data, onClose, onHideReview, onDeleteReview }: UserReviewsModalProps) {
    if (!isOpen || !data) return null;

    const maxCount = Math.max(1, ...data.breakdown.map((b) => b.count));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-2xl w-full max-w-xl p-6 font-inter shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-start justify-between mb-1">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-[#101828] leading-7">User Reviews</h2>
                        <p className="text-sm text-[#787A7F] mt-0.5">{data.productName}</p>
                    </div>
                    <button onClick={onClose} className="text-[#3E2723] hover:text-black cursor-pointer" aria-label="Close">
                        <CircleX size={20} />
                    </button>
                </div>

                <div className="border-t border-gray-100 my-4" />

                <div className="flex items-start gap-8 mb-6">
                    <div className="shrink-0">
                        <p className="text-4xl font-bold text-[#3C182F] leading-none">{data.averageRating.toFixed(1)}</p>
                        <div className="flex items-center gap-0.5 mt-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star
                                    key={i}
                                    size={16}
                                    className={i <= Math.round(data.averageRating) ? "text-[#E6A400] fill-[#E6A400]" : "text-gray-300"}
                                />
                            ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{data.totalReviews} reviews</p>
                    </div>

                    <div className="flex-1 space-y-2">
                        {data.breakdown.map((b) => (
                            <div key={b.star} className="flex items-center gap-2">
                                <span className="text-xs text-gray-600 w-6 flex items-center gap-0.5">
                                    {b.star} <Star size={10} className="text-[#E6A400] fill-[#E6A400]" />
                                </span>
                                <div className="flex-1 h-2 rounded-full bg-[#3C182F]/70 overflow-hidden">
                                    <div
                                        className="h-full bg-[#E6A400] rounded-full"
                                        style={{ width: `${(b.count / maxCount) * 100}%` }}
                                    />
                                </div>
                                <span className="text-xs text-gray-500 w-4 text-right">{b.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    {data.reviews.map((review) => (
                        <div key={review.id} className="border-t border-gray-100 pt-4 first:border-t-0 first:pt-0">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2.5">
                                    <img src={review.avatar} alt={review.name} className="w-9 h-9 rounded-full object-cover" />
                                    <div>
                                        <p className="text-sm font-semibold text-[#101828]">
                                            {review.name} <span className="text-xs font-normal text-gray-400">@{review.handle}</span>
                                        </p>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <div className="flex items-center gap-0.5">
                                                {[1, 2, 3, 4, 5].map((i) => (
                                                    <Star
                                                        key={i}
                                                        size={12}
                                                        className={i <= review.rating ? "text-[#E6A400] fill-[#E6A400]" : "text-gray-300"}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-xs text-gray-400">{review.date}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onHideReview(review.id)}
                                        className="w-7 h-7 rounded-md bg-[#DFF3E4] text-[#036B2C] flex items-center justify-center hover:opacity-80 cursor-pointer"
                                        aria-label={review.hidden ? "Unhide review" : "Hide review"}
                                    >
                                        <EyeOff size={14} />
                                    </button>
                                    <button
                                        onClick={() => onDeleteReview(review.id)}
                                        className="w-7 h-7 rounded-md bg-[#FBDCE0] text-[#b84b42] flex items-center justify-center hover:opacity-80 cursor-pointer"
                                        aria-label="Delete review"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            <p className="text-sm font-bold text-[#101828] mt-2">{review.title}</p>
                            <p className="text-sm text-gray-600 mt-1 leading-5">{review.body}</p>
                        </div>
                    ))}

                    {data.reviews.length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-6">No reviews yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}