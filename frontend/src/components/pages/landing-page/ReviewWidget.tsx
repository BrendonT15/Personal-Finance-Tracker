import StarRateIcon from "@mui/icons-material/StarRate";
import type { Review } from "../../../data/reviews";

interface ReviewWidgetProps {
  review: Review;
}

const ReviewWidget = ({ review }: ReviewWidgetProps) => {
  return (
    <div className="border bg-white rounded-md text-black p-4 flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        <div>
          {Array.from({ length: review.rating }).map((_, i) => (
            <StarRateIcon key={i} />
          ))}
        </div>
        <p>{review.text}</p>
      </div>

      <p>{review.source}</p>
    </div>
  );
};

export default ReviewWidget;