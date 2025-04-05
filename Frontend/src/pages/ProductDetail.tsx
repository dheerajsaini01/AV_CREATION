
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ReviewSystem from "@/components/reviews/ReviewSystem";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Share2, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Mock product data - in a real app, this would come from an API
  const product = {
    id: id || "default",
    name: "Emerald Dreams Bridal Lehenga",
    description: "Elevate your bridal look with this exquisite emerald green lehenga, handcrafted with love and adorned with intricate zardozi embroidery. The ensemble includes a fully embellished lehenga skirt, a matching blouse with detailed work, and a complementing dupatta with delicate borders.",
    price: 125000,
    discountedPrice: 98000,
    rating: 4.7,
    reviewCount: 32,
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      "https://images.unsplash.com/photo-1610030333540-65b3bd3a1a67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1610030333540-65b3bd3a1a67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Bridal Collection",
    fabric: "Silk & Velvet",
    color: "Emerald Green",
    weight: "3.5 kg",
    care: "Dry Clean Only",
    sku: "BL-EM-2023",
    inStock: true
  };
  
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before adding to cart",
        variant: "destructive",
      });
      return;
    }
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      discountedPrice: product.discountedPrice,
      image: selectedImage,
      size: selectedSize,
      color: product.color,
      quantity: quantity
    });
  };
  
  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        discountedPrice: product.discountedPrice,
        image: selectedImage,
        category: product.category,
      });
    }
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Product link has been copied to clipboard.",
    });
  };
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link to="/products" className="text-muted-foreground hover:text-foreground flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Products
            </Link>
          </div>
          
          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-cream">
                <img 
                  src={selectedImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button 
                    key={index}
                    className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-3xl font-semibold">{product.name}</h1>
                <div className="text-muted-foreground">{product.category}</div>
              </div>
              
              <div className="flex items-baseline gap-4">
                {product.discountedPrice ? (
                  <>
                    <span className="text-2xl font-semibold">₹{product.discountedPrice.toLocaleString()}</span>
                    <span className="text-muted-foreground line-through">₹{product.price.toLocaleString()}</span>
                    <span className="text-green-600 text-sm font-medium">
                      {Math.round((1 - product.discountedPrice / product.price) * 100)}% off
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-semibold">₹{product.price.toLocaleString()}</span>
                )}
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 min-w-10 px-3 rounded-md border font-medium ${
                        selectedSize === size 
                          ? "bg-primary text-white border-primary" 
                          : "bg-background hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <div className="mt-2">
                  <button className="text-sm text-primary underline">Size Guide</button>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Quantity</h3>
                <div className="flex items-center">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="h-10 w-10 rounded-l-md border flex items-center justify-center hover:bg-muted"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <div className="h-10 px-4 flex items-center justify-center border-t border-b">
                    {quantity}
                  </div>
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="h-10 w-10 rounded-r-md border flex items-center justify-center hover:bg-muted"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Button 
                  onClick={handleAddToCart} 
                  className="flex-1"
                  disabled={!product.inStock}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleWishlistToggle}
                  className={isInWishlist(product.id) ? "text-rose-500 border-rose-500" : ""}
                >
                  <Heart className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">SKU:</span> {product.sku}
                </div>
                <div>
                  <span className="text-muted-foreground">Color:</span> {product.color}
                </div>
                <div>
                  <span className="text-muted-foreground">Fabric:</span> {product.fabric}
                </div>
                <div>
                  <span className="text-muted-foreground">Weight:</span> {product.weight}
                </div>
                <div>
                  <span className="text-muted-foreground">Care:</span> {product.care}
                </div>
              </div>
            </div>
          </div>
          
          {/* Reviews Section */}
          <div className="mt-16 pt-8 border-t">
            <ReviewSystem
              productId={product.id}
              productName={product.name}
              initialRating={product.rating}
              initialCount={product.reviewCount}
            />
          </div>
          
          {/* Related Products */}
          <div className="mt-16 pt-8 border-t">
            <h2 className="text-2xl font-display font-semibold mb-8">You May Also Like</h2>
            
            {/* Grid of related products would go here */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* This would be populated with actual product data */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
