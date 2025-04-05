
import { useState } from "react";
import ReviewsList, { Review } from "./ReviewsList";
import ReviewForm from "./ReviewForm";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type ProductReviewsProps = {
  productId: string;
  productName: string;
  initialReviews: Review[];
  className?: string;
};

export default function ProductReviews({ 
  productId, 
  productName, 
  initialReviews, 
  className 
}: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showForm, setShowForm] = useState(false);
  
  const handleReviewSubmit = (reviewData: any) => {
    // In a real app, this would be sent to an API
    // For now, we'll just add it to our local state
    
    const newReview: Review = {
      id: `review-${Date.now()}`,
      userId: "current-user", // In a real app, this would be the actual user ID
      productId,
      rating: reviewData.rating,
      title: reviewData.title,
      comment: reviewData.comment,
      userName: "You", // In a real app, this would be the actual user name
      date: new Date().toISOString(),
      verifiedPurchase: true,
      helpfulCount: 0,
      images: reviewData.images
    };
    
    setReviews(prev => [newReview, ...prev]);
    setShowForm(false);
    
    toast({
      title: "Review Submitted",
      description: "Thank you for sharing your feedback!",
    });
  };
  
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-display font-semibold">Customer Reviews</h2>
        
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            Write a Review
          </Button>
        )}
      </div>
      
      {showForm && (
        <div className="bg-cream p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium">Share Your Experience</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </div>
          
          <ReviewForm
            productId={productId}
            productName={productName}
            onSubmit={handleReviewSubmit}
          />
        </div>
      )}
      
      <ReviewsList
        reviews={reviews}
        productId={productId}
      />
    </div>
  );
}
