
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useNotification } from "@/contexts/NotificationContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";

const Wishlist = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { wishlistItems, addToCart, removeFromWishlist } = useCart();
  const { showCartNotification } = useNotification();
  
  const handleAddToCart = (item: any) => {
    addToCart({
      ...item,
      size: "Free Size", // Default size
      color: item.color || "Default", // Default color
      quantity: 1
    });
    showCartNotification(item.name);
  };

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </div>

          <h1 className="text-3xl font-semibold font-display mb-6">Your Wishlist</h1>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-4 flex justify-center">
                <Heart className="h-16 w-16 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium mb-4">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">
                Discover items you'll love and add them to your wishlist.
              </p>
              <Button asChild>
                <Link to="/products">Explore Products</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 flex flex-col">
                  <Link to={`/products/${item.id}`} className="block aspect-[3/4] mb-4 bg-muted/30 rounded-md overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1">
                    <Link to={`/products/${item.id}`} className="font-medium hover:underline line-clamp-2">
                      {item.name}
                    </Link>
                    <div className="text-sm text-muted-foreground mt-1">
                      {item.category}
                    </div>
                  </div>

                  <div className="mt-2 mb-4">
                    <div className="font-medium">
                      {item.discountedPrice
                        ? formattedPrice(item.discountedPrice)
                        : formattedPrice(item.price)}
                      
                      {item.discountedPrice && (
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          {formattedPrice(item.price)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Button 
                      onClick={() => handleAddToCart(item)} 
                      className="flex-1"
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeFromWishlist(item.id)}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Wishlist;
