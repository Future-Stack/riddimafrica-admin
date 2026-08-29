import { ModalShell } from "@/app/components/common/ModalSeel";
import { EyeOff, Star, Trash2 } from "lucide-react";

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

export function UserReviewsModal({
  isOpen,
  data,
  onClose,
  onHideReview,
  onDeleteReview,
}: UserReviewsModalProps) {
  if (!isOpen || !data) return null;

  const maxCount = Math.max(1, ...data.breakdown.map((b) => b.count));

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="User Reviews"
      subtitle={data.productName}
      maxWidthClassName="max-w-xl"
      roundedClassName="rounded-2xl"
    >
      <div className="border-t border-gray-100 mb-6" />

      <div className="flex items-start gap-8 mb-8">
        <div className="shrink-0">
          <p className="text-2xl md:text-3xl font-bold text-[#64284E] leading-8">
            {data.averageRating.toFixed(1)}
          </p>
          <div className="flex items-center gap-0.5 mt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={16}
                className={
                  i <= Math.round(data.averageRating)
                    ? "text-[#E6A400] fill-[#E6A400]"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <p className="text-xs text-[#787A7F] font-bold leading-4 mt-1">
            {data.totalReviews} reviews
          </p>
        </div>

        <div className="flex-1 space-y-2">
          {data.breakdown.map((b) => (
            <div key={b.star} className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-6 flex items-center gap-0.5">
                {b.star}{" "}
                <Star size={10} className="text-[#E6A400] fill-[#E6A400]" />
              </span>
              <div className="flex-1 h-2 rounded-full bg-gray-600 overflow-hidden">
                <div
                  className="h-full bg-[#E6A400] rounded-full"
                  style={{ width: `${(b.count / maxCount) * 100}%` }}
                />
              </div>
              <span className="text-xs text-[#787A7F] font-normal w-4 text-right">
                {b.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        {data.reviews.map((review) => (
          <div key={review.id} className=" first:border-t-0 first:pt-0">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800 leading-5">
                    {review.name}
                    <span className="text-xs font-normal text-gray leading-4">
                      @{review.handle}
                    </span>
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i <= review.rating
                              ? "text-[#E6A400] fill-[#E6A400]"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[#787A7F] font-bold leading-4.5 ">
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onHideReview(review.id)}
                  className="w-7 h-7 rounded-md bg-[#C1D6D7] text-[#377A7D] flex items-center justify-center hover:opacity-80 cursor-pointer"
                  aria-label={review.hidden ? "Unhide review" : "Hide review"}
                >
                  <EyeOff size={14} />
                </button>
                <button
                  onClick={() => onDeleteReview(review.id)}
                  className="w-7 h-7 rounded-md bg-[#DB321C66] text-[#DB321C] flex items-center justify-center hover:opacity-80 cursor-pointer"
                  aria-label="Delete review"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <p className="text-sm font-bold text-gray-800 leading-4.5 mt-2">
              {review.title}
            </p>
            <p className="text-sm text-gray-800 mt-1 leading-5 font-normal">
              {review.body}
            </p>
          </div>
        ))}

        {data.reviews.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-6">
            No reviews yet.
          </p>
        )}
      </div>
    </ModalShell>
  );
}
