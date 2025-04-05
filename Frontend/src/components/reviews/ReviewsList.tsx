
import { useState } from "react";
import ReviewStars from "./ReviewStars";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";

export type Review = {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title: string;
  comment: string;
  userImage?: string;
  userName: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  images?: string[];
};

type ReviewsListProps = {
  reviews: Review[];
  productId: string;
  className?: string;
};

type SortOption = "recent" | "highest" | "lowest" | "helpful";

export default function ReviewsList({ reviews, productId, className }: ReviewsListProps) {
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [expandedReviews, setExpandedReviews] = useState<string[]>([]);
  const [helpfulReviews, setHelpfulReviews] = useState<string[]>([]);
  
  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;
  
  // Sort reviews based on selected option
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      case "helpful":
        return b.helpfulCount - a.helpfulCount;
      default:
        return 0;
    }
  });
  
  const toggleExpanded = (reviewId: string) => {
    setExpandedReviews(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  };
  
  const markHelpful = (reviewId: string) => {
    if (!helpfulReviews.includes(reviewId)) {
      setHelpfulReviews(prev => [...prev, reviewId]);
    }
  };
  
  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = reviews.filter(r => Math.floor(r.rating) === rating).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { rating, count, percentage };
  });
  
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No Reviews Yet</h3>
        <p className="text-muted-foreground mb-4">Be the first to leave a review for this product.</p>
        <Button>Write a Review</Button>
      </div>
    );
  }
  
  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Rating Summary */}
        <div className="p-6 bg-cream rounded-lg">
          <h3 className="text-2xl font-semibold mb-2">Customer Reviews</h3>
          <div className="flex items-center gap-2 mb-4">
            <ReviewStars rating={averageRating} size="lg" />
            <span className="font-medium text-lg">{averageRating.toFixed(1)} out of 5</span>
          </div>
          <p className="text-muted-foreground mb-6">Based on {reviews.length} reviews</p>
          
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-2">
                <span className="w-12 text-sm">{rating} stars</span>
                <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-muted-foreground">{count}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Review Sorting */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <h3 className="text-xl font-medium">
              {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="p-1 border rounded text-sm"
              >
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>
          
          {/* Reviews List */}
          <div className="space-y-6">
            {sortedReviews.map((review) => {
              const isExpanded = expandedReviews.includes(review.id);
              const isHelpful = helpfulReviews.includes(review.id);
              const helpfulCount = isHelpful 
                ? review.helpfulCount + 1 
                : review.helpfulCount;
              
              return (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-start gap-4">
                    {review.userImage ? (
                      <img 
                        src={review.userImage} 
                        alt={review.userName} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <span className="text-secondary-foreground font-medium">
                          {review.userName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div>
                          <h4 className="font-medium">{review.userName}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <ReviewStars rating={review.rating} size="sm" />
                            <span className="text-xs text-muted-foreground">
                              {new Date(review.date).toLocaleDateString(undefined, { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                        </div>
                        
                        {review.verifiedPurchase && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      
                      <h5 className="font-medium mt-3">{review.title}</h5>
                      <p className={isExpanded ? "mt-2" : "mt-2 line-clamp-3"}>
                        {review.comment}
                      </p>
                      
                      {review.comment.length > 200 && (
                        <button 
                          onClick={() => toggleExpanded(review.id)}
                          className="text-sm text-primary mt-1"
                        >
                          {isExpanded ? "Show less" : "Read more"}
                        </button>
                      )}
                      
                      {review.images && review.images.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {review.images.map((image, idx) => (
                            <img 
                              key={idx} 
                              src={image} 
                              alt={`Review ${idx + 1}`} 
                              className="h-16 w-16 object-cover rounded"
                            />
                          ))}
                        </div>
                      )}
                      
                      <div className="mt-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => markHelpful(review.id)}
                          disabled={isHelpful}
                          className="text-sm"
                        >
                          <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                          {isHelpful ? "Marked helpful" : "Helpful"} ({helpfulCount})
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
