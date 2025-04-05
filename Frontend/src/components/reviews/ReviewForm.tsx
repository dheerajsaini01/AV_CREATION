
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ReviewStars from "./ReviewStars";
import { Upload } from "lucide-react";

type ReviewFormProps = {
  productId: string;
  productName: string;
  onSubmit: (reviewData: any) => void;
  className?: string;
};

export default function ReviewForm({ productId, productName, onSubmit, className }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ rating: "", title: "", comment: "" });
  
  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: "" }));
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const selectedFiles = Array.from(e.target.files);
    setImages(prev => [...prev, ...selectedFiles]);
    
    // Create preview URLs for the selected images
    const newPreviewUrls = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };
  
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    
    // Revoke the URL to avoid memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };
  
  const validateForm = () => {
    const newErrors = {
      rating: rating === 0 ? "Please select a rating" : "",
      title: title.trim() === "" ? "Please enter a review title" : "",
      comment: comment.trim() === "" ? "Please enter your review" : ""
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would upload images to a server here
      // For now, we'll simulate a successful submission
      
      const reviewData = {
        productId,
        rating,
        title,
        comment,
        images: previewUrls, // In a real app, these would be URLs from the server
        date: new Date().toISOString()
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit(reviewData);
      
      // Reset form
      setRating(0);
      setTitle("");
      setComment("");
      setImages([]);
      setPreviewUrls([]);
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className={className}>
      <h3 className="text-xl font-medium mb-4">Write a Review</h3>
      <p className="text-muted-foreground mb-6">
        Share your thoughts on the {productName} with other customers
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block font-medium">Your Rating <span className="text-red-500">*</span></label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                className="p-1"
              >
                <ReviewStars 
                  rating={rating >= star ? 1 : 0} 
                  size="lg" 
                />
              </button>
            ))}
          </div>
          {errors.rating && (
            <p className="text-sm text-red-500 mt-1">{errors.rating}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="review-title" className="block font-medium">
            Review Title <span className="text-red-500">*</span>
          </label>
          <input
            id="review-title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) {
                setErrors(prev => ({ ...prev, title: "" }));
              }
            }}
            placeholder="Summarize your review"
            className="w-full p-2 border rounded-md"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="review-comment" className="block font-medium">
            Your Review <span className="text-red-500">*</span>
          </label>
          <textarea
            id="review-comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              if (errors.comment) {
                setErrors(prev => ({ ...prev, comment: "" }));
              }
            }}
            placeholder="What did you like or dislike? How was the quality? Was it as described?"
            className="w-full p-2 border rounded-md h-32"
          />
          {errors.comment && (
            <p className="text-sm text-red-500">{errors.comment}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label className="block font-medium">Add Photos (Optional)</label>
          <div className="flex flex-wrap gap-4 items-center">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="h-20 w-20 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
            
            <label className="h-20 w-20 border-2 border-dashed rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
              <Upload className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground mt-1">Upload</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                multiple
              />
            </label>
          </div>
          <p className="text-xs text-muted-foreground">
            You can upload up to 5 images. Max file size: 5MB.
          </p>
        </div>
        
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </form>
    </div>
  );
}
