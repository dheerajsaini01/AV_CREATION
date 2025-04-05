
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle, ShoppingBag, Truck } from "lucide-react";

export default function OrderSuccess() {
  const location = useLocation();
  const orderData = location.state?.orderData || {
    orderId: "ORD-" + Math.floor(10000 + Math.random() * 90000),
    total: 24999,
    items: 3
  };

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="mb-8 flex justify-center">
                <CheckCircle className="h-24 w-24 text-green-500" />
              </div>
              
              <h1 className="text-3xl font-semibold mb-4">Order Confirmed!</h1>
              <p className="text-muted-foreground mb-8 text-lg">
                Thank you for your purchase. Your order has been successfully placed.
              </p>
              
              <div className="bg-muted p-6 rounded-lg mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                    <p className="font-medium">{orderData.orderId}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                    <p className="font-medium">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }).format(orderData.total)}
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground mb-1">Items</p>
                    <p className="font-medium">{orderData.items}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                    <p className="font-medium">3-5 Business Days</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 justify-center">
                  <Truck className="h-5 w-5 text-primary" />
                  <p>An email with the order details has been sent to your registered email address.</p>
                </div>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link to={`/track-order/${orderData.orderId}`}>
                      Track Order
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/dashboard">
                      View My Orders
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="lg">
                    <Link to="/products">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
