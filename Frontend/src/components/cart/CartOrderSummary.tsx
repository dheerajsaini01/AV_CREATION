
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag } from "lucide-react";

export default function CartOrderSummary() {
  const { cartItems, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.discountedPrice || item.price;
    return sum + price * item.quantity;
  }, 0);
  
  const shippingCost = subtotal > 0 ? 500 : 0;
  const total = subtotal + shippingCost;

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = () => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to sign in before checkout",
      });
      navigate("/auth", { state: { from: "/cart" } });
      return;
    }

    setIsProcessing(true);
    
    // Simulate checkout process
    setTimeout(() => {
      const orderData = {
        orderId: "ORD-" + Math.floor(10000 + Math.random() * 90000),
        items: cartItems.length,
        total: total
      };
      
      // Clear cart
      clearCart();
      
      // Navigate to success page
      navigate("/order-success", { state: { orderData } });
      
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="bg-muted/20 rounded-lg p-6">
      <h2 className="text-xl font-medium mb-4">Order Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formattedPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{formattedPrice(shippingCost)}</span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between font-medium text-lg mb-6">
        <span>Total</span>
        <span>{formattedPrice(total)}</span>
      </div>

      <Button 
        className="w-full" 
        onClick={handleCheckout} 
        disabled={cartItems.length === 0 || isProcessing}
      >
        {isProcessing ? (
          <>Processing...</>
        ) : (
          <>
            <ShoppingBag className="mr-2 h-4 w-4" />
            Proceed to Checkout
          </>
        )}
      </Button>

      <div className="mt-4 text-xs text-muted-foreground text-center">
        Taxes and shipping calculated at checkout
      </div>
    </div>
  );
}
