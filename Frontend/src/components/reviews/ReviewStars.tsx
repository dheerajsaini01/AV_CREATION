
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

type ReviewStarsProps = {
  rating: number;
  size?: "sm" | "md" | "lg";
  showRating?: boolean;
  className?: string;
};

export default function ReviewStars({ 
  rating, 
  size = "md", 
  showRating = false,
  className
}: ReviewStarsProps) {
  // Convert the rating to a number between 0 and 5
  const normalizedRating = Math.max(0, Math.min(5, rating));
  
  // Calculate the number of full stars, half stars, and empty stars
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  // Determine the size of the stars based on the size prop
  const starSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };
  
  const starSize = starSizes[size];
  
  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, index) => (
          <Star 
            key={`full-${index}`} 
            className={cn(starSize, "text-yellow-400 fill-yellow-400")} 
          />
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <StarHalf 
            className={cn(starSize, "text-yellow-400 fill-yellow-400")} 
          />
        )}
        
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <Star 
            key={`empty-${index}`} 
            className={cn(starSize, "text-yellow-400")} 
          />
        ))}
      </div>
      
      {showRating && (
        <span className={cn(
          "ml-2 font-medium", 
          size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"
        )}>
          {normalizedRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
