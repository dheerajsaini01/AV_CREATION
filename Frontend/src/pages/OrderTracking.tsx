
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { OrderTracker } from "@/components/order/OrderTracker";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";

const mockOrders = [
  {
    id: "ORD-10568",
    date: "2024-03-15",
    status: "delivered" as const,
    estimatedDelivery: "March 20, 2024",
    currentLocation: "Delhi Delivery Center",
    total: 85000,
    items: [
      {
        id: "1",
        name: "Emerald Silk Lehenga",
        image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=1964&auto=format&fit=crop",
        price: 49999,
        quantity: 1,
      }
    ]
  },
  {
    id: "ORD-10432",
    date: "2024-02-28",
    status: "processing" as const,
    estimatedDelivery: "March 8, 2024",
    total: 42000,
    items: [
      {
        id: "2",
        name: "Ruby Red Celebration",
        image: "https://images.unsplash.com/photo-1610189019599-2d766fcb615d?q=80&w=1964&auto=format&fit=crop",
        price: 42000,
        quantity: 1,
      }
    ]
  },
  {
    id: "ORD-10345",
    date: "2024-01-12",
    status: "shipped" as const,
    estimatedDelivery: "March 25, 2024",
    currentLocation: "Mumbai Dispatch Center",
    total: 92000,
    items: [
      {
        id: "3",
        name: "Sapphire Elegance",
        image: "https://images.unsplash.com/photo-1580522154200-c44a22efef64?q=80&w=1964&auto=format&fit=crop",
        price: 36000,
        quantity: 1,
      },
      {
        id: "4",
        name: "Pearl White Ethereal",
        image: "https://images.unsplash.com/photo-1620359579376-9d122c92fbcf?q=80&w=1964&auto=format&fit=crop",
        price: 56000,
        quantity: 1,
      }
    ]
  }
];

const formattedPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

export default function OrderTracking() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Simulate API call to fetch order details
    const timer = setTimeout(() => {
      const foundOrder = mockOrders.find(o => o.id === orderId);
      setOrder(foundOrder || null);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [orderId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold mb-4">Order Not Found</h2>
              <p className="text-muted-foreground mb-6">
                We couldn't find an order with the ID: {orderId}
              </p>
              <Button asChild>
                <Link to="/dashboard">Go to My Account</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to My Account
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Order status tracker */}
              <div className="bg-background rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-6">Order Status</h2>
                <OrderTracker 
                  status={order.status} 
                  estimatedDelivery={order.estimatedDelivery}
                  currentLocation={order.currentLocation}
                />
              </div>
              
              {/* Order items */}
              <div className="bg-background rounded-lg border overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                  
                  <div className="space-y-4">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex gap-4">
                        <Link to={`/products/${item.id}`} className="w-20 h-20 bg-muted/30 rounded overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </Link>
                        <div className="flex-1">
                          <Link to={`/products/${item.id}`} className="font-medium hover:underline">
                            {item.name}
                          </Link>
                          <div className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </div>
                          <div>
                            {formattedPrice(item.price)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Customer support */}
              <div className="bg-background rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about your order, please contact our customer support team.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1" asChild>
                    <Link to="/contact">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message Us
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Support
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="space-y-6">
              <div className="bg-background rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order number:</span>
                    <span className="font-medium">{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order date:</span>
                    <span>{formatDate(order.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="capitalize">{order.status}</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items:</span>
                    <span>{order.items.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>{formattedPrice(order.total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping:</span>
                    <span>{formattedPrice(500)}</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>{formattedPrice(order.total + 500)}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-background rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <div className="text-muted-foreground">
                  <p>123 Main Street</p>
                  <p>Apartment 4B</p>
                  <p>Mumbai, Maharashtra 400001</p>
                  <p>India</p>
                </div>
              </div>
              
              <div className="bg-background rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment method:</span>
                    <span>Credit Card</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Card:</span>
                    <span>Visa ending in 4242</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
