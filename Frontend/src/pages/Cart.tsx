
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import CartOrderSummary from "@/components/cart/CartOrderSummary";

const Cart = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.discountedPrice || item.price;
    return sum + price * item.quantity;
  }, 0);

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

          <h1 className="text-3xl font-semibold font-display mb-6">Your Shopping Bag</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-4 flex justify-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium mb-4">Your shopping bag is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added anything to your bag yet.
              </p>
              <Button asChild>
                <Link to="/products">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-6 py-4">
                      <Link to={`/products/${item.id}`} className="w-24 h-24 bg-muted/30 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <div>
                            <Link to={`/products/${item.id}`} className="font-medium hover:underline">
                              {item.name}
                            </Link>
                            <div className="text-sm text-muted-foreground flex flex-wrap gap-x-6 mt-1">
                              <span>Size: {item.size}</span>
                              <span>Color: {item.color}</span>
                            </div>
                          </div>
                          <div className="font-medium">
                            {item.discountedPrice
                              ? formattedPrice(item.discountedPrice)
                              : formattedPrice(item.price)}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-4">
                          <div className="flex items-center">
                            <Button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-10 text-center">{item.quantity}</span>
                            <Button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Button variant="outline" onClick={clearCart} className="text-muted-foreground">
                    Clear Cart
                  </Button>
                </div>
              </div>

              <div>
                <CartOrderSummary />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
