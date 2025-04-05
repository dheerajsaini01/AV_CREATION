
import { useState } from "react";
import ReviewStars from "./ReviewStars";
import ProductReviews from "./ProductReviews";
import { Review } from "./ReviewsList";

type ReviewSystemProps = {
  productId: string;
  productName: string;
  initialRating?: number;
  initialCount?: number;
  className?: string;
}

export default function ReviewSystem({
  productId,
  productName,
  initialRating = 0,
  initialCount = 0,
  className
}: ReviewSystemProps) {
  // In a real app, these would come from an API
  const [rating] = useState(initialRating);
  const [count] = useState(initialCount);
  
  // Sample reviews data - in a real app, this would come from an API
  const sampleReviews: Review[] = [
    {
      id: "rev1",
      userId: "user1",
      productId: productId,
      rating: 5,
      title: "Absolutely stunning piece!",
      comment: "I purchased this lehenga for my engagement ceremony and received countless compliments. The quality of fabric and craftsmanship is exceptional. The color is true to the pictures and the embellishments are even more beautiful in person.",
      userName: "Priya Singh",
      date: "2023-05-15T00:00:00Z",
      verifiedPurchase: true,
      helpfulCount: 12,
      images: [
        "https://images.unsplash.com/photo-1610030169588-1d35cf912c14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
      ]
    },
    {
      id: "rev2",
      userId: "user2",
      productId: productId,
      rating: 4,
      title: "Beautiful but arrived late",
      comment: "The lehenga is gorgeous and exactly as described. The only reason I'm giving 4 stars instead of 5 is that it arrived a week later than the estimated delivery date, which gave me less time for alterations.",
      userName: "Anjali Patel",
      date: "2023-04-20T00:00:00Z",
      verifiedPurchase: true,
      helpfulCount: 5
    },
    {
      id: "rev3",
      userId: "user3",
      productId: productId,
      rating: 5,
      title: "Worth every penny!",
      comment: "I was initially hesitant about ordering such an expensive piece online, but I'm so glad I did. The detail work is phenomenal and the fit was perfect with minimal alterations needed. The customer service team was also very helpful with my sizing questions.",
      userName: "Neha Sharma",
      date: "2023-03-10T00:00:00Z",
      verifiedPurchase: true,
      helpfulCount: 8
    }
  ];
  
  return (
    <div className={className}>
      <div className="flex items-center gap-4 mb-6">
        <ReviewStars rating={rating} size="lg" showRating={true} />
        <span className="text-muted-foreground">
          {count > 0 ? `Based on ${count} reviews` : "No reviews yet"}
        </span>
      </div>
      
      <ProductReviews 
        productId={productId}
        productName={productName}
        initialReviews={sampleReviews}
      />
    </div>
  );
}
