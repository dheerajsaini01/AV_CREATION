
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { useNotification } from "@/contexts/NotificationContext";

type ProductProps = {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  image: string;
  category: string;
};

type ProductCardProps = {
  product: ProductProps;
  orientation?: "vertical" | "horizontal";
};

export default function ProductCard({ product, orientation = "vertical" }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useCart();
  const { showCartNotification, showWishlistNotification } = useNotification();

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const hasDiscount = product.discountedPrice && product.discountedPrice < product.price;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      discountedPrice: product.discountedPrice,
      image: product.image,
      size: "Free Size", // Default size
      color: "Default", // Default color
      quantity: 1
    });
    showCartNotification(product.name);
  };
  
  const handleWishlistToggle = () => {
    const isCurrentlyInWishlist = isInWishlist(product.id);
    
    if (isCurrentlyInWishlist) {
      removeFromWishlist(product.id);
      showWishlistNotification(product.name, false);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        discountedPrice: product.discountedPrice,
        image: product.image,
        category: product.category,
      });
      showWishlistNotification(product.name, true);
    }
  };

  if (orientation === "horizontal") {
    return (
      <div 
        className="group flex gap-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-lg aspect-square w-48 flex-shrink-0 bg-muted/30">
          <Link to={`/products/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className={cn(
                "w-full h-full object-cover transition-all duration-700 ease-out",
                isHovered ? "scale-105" : "scale-100",
                isImageLoaded ? "img-loaded" : "img-loading"
              )}
              onLoad={() => setIsImageLoaded(true)}
            />
          </Link>
          
          {/* Action buttons - now always visible */}
          <div className="absolute top-2 right-2">
            <Button 
              size="icon" 
              variant="secondary" 
              className={cn("rounded-full shadow-md h-8 w-8", 
                isInWishlist(product.id) && "bg-rose-500 text-white hover:bg-rose-600"
              )}
              onClick={handleWishlistToggle}
            >
              <Heart className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 py-2">
          <Link 
            to={`/products/${product.id}`}
            className="block font-medium text-foreground hover:text-primary transition-colors duration-200 text-lg mb-1"
          >
            {product.name}
          </Link>
          <div className="text-sm text-muted-foreground mb-2">{product.category}</div>
          <div className="flex items-center gap-2 mb-4">
            {hasDiscount ? (
              <>
                <span className="font-medium">{formattedPrice(product.discountedPrice!)}</span>
                <span className="text-sm text-muted-foreground line-through">
                  {formattedPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="font-medium">{formattedPrice(product.price)}</span>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button size="sm" className="rounded-full" onClick={handleAddToCart}>
              <ShoppingBag className="h-4 w-4 mr-2" /> Add to Bag
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className={cn("rounded-full px-3", isInWishlist(product.id) && "text-rose-500 border-rose-500")}
              onClick={handleWishlistToggle}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg aspect-[3/4] mb-4 bg-muted/30">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            // src="./assets/IMG_7.JPG"
            alt={product.name}
            className={cn(
              "w-full h-full object-cover transition-all duration-700 ease-out",
              isHovered ? "scale-105" : "scale-100",
              isImageLoaded ? "img-loaded" : "img-loading"
            )}
            onLoad={() => setIsImageLoaded(true)}
          />
        </Link>
        
        {/* Action buttons - now always visible */}
        <div className="absolute top-3 right-3">
          <Button 
            size="icon" 
            variant="secondary" 
            className={cn("rounded-full shadow-md h-9 w-9", 
              isInWishlist(product.id) && "bg-rose-500 text-white hover:bg-rose-600"
            )}
            onClick={handleWishlistToggle}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="absolute inset-x-0 bottom-0 p-4">
          <Button className="w-full rounded-full shadow-md" onClick={handleAddToCart}>
            <ShoppingBag className="h-4 w-4 mr-2" /> Add to Bag
          </Button>
        </div>
      </div>
      
      <div>
        <Link 
          to={`/products/${product.id}`}
          className="block font-medium text-foreground hover:text-primary transition-colors duration-200"
        >
          {product.name}
        </Link>
        <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
        <div className="flex items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="font-medium">{formattedPrice(product.discountedPrice!)}</span>
              <span className="text-sm text-muted-foreground line-through">
                {formattedPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="font-medium">{formattedPrice(product.price)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
