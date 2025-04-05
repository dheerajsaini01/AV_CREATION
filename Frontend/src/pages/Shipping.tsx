
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Truck, Clock, Package, Globe } from "lucide-react";

const Shipping = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl font-semibold mb-10">Shipping & Delivery</h1>
          
          <div className="space-y-12">
            <section>
              <div className="flex items-center mb-4 gap-3">
                <Truck className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-display font-medium">Shipping Information</h2>
              </div>
              <div className="bg-cream p-6 rounded-lg">
                <p className="mb-4">
                  At AV CREATION, we understand the excitement of receiving your new purchase. 
                  We strive to make the delivery process as smooth and efficient as possible.
                </p>
                <p>
                  All orders are processed within 24-48 hours of payment confirmation. 
                  Ready-to-wear items typically ship within 3-5 business days. 
                  Custom orders and bridal pieces may require 4-8 weeks for creation and delivery.
                </p>
              </div>
            </section>
            
            <section>
              <div className="flex items-center mb-4 gap-3">
                <Clock className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-display font-medium">Delivery Timeframes</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-cream">
                      <th className="p-3 text-left font-medium border">Location</th>
                      <th className="p-3 text-left font-medium border">Standard Delivery</th>
                      <th className="p-3 text-left font-medium border">Express Delivery</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border">Delhi NCR</td>
                      <td className="p-3 border">1-2 business days</td>
                      <td className="p-3 border">Same day (orders before 11 AM)</td>
                    </tr>
                    <tr>
                      <td className="p-3 border">Major Indian Cities</td>
                      <td className="p-3 border">2-4 business days</td>
                      <td className="p-3 border">1-2 business days</td>
                    </tr>
                    <tr>
                      <td className="p-3 border">Rest of India</td>
                      <td className="p-3 border">4-7 business days</td>
                      <td className="p-3 border">2-3 business days</td>
                    </tr>
                    <tr>
                      <td className="p-3 border">International</td>
                      <td className="p-3 border">7-14 business days</td>
                      <td className="p-3 border">5-7 business days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-muted-foreground text-sm">
                Note: These are estimated delivery times. Actual delivery may vary based on customs clearance, 
                local postal services, and other factors beyond our control.
              </p>
            </section>
            
            <section>
              <div className="flex items-center mb-4 gap-3">
                <Package className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-display font-medium">Shipping Rates</h2>
              </div>
              <div className="bg-cream p-6 rounded-lg space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Domestic Shipping</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Orders above ₹25,000: Free standard shipping</li>
                    <li>Orders below ₹25,000: ₹250 - ₹500 based on location</li>
                    <li>Express shipping: Additional ₹500 - ₹1,500 based on location</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">International Shipping</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Standard shipping: ₹2,500 - ₹5,000 based on destination</li>
                    <li>Express shipping: ₹5,000 - ₹10,000 based on destination</li>
                    <li>Orders above ₹1,00,000: 50% discount on shipping fees</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <div className="flex items-center mb-4 gap-3">
                <Globe className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-display font-medium">International Orders</h2>
              </div>
              <div className="bg-white border border-border p-6 rounded-lg">
                <p className="mb-4">
                  We ship to most countries worldwide. Please note that international orders may be subject to 
                  import duties, taxes, and customs fees imposed by the destination country. 
                  These charges are the responsibility of the recipient.
                </p>
                <p>
                  For international orders, we recommend choosing express shipping for faster delivery and improved tracking.
                </p>
              </div>
            </section>
            
            <section className="border-t border-border pt-8">
              <h2 className="text-2xl font-display font-medium mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">How can I track my order?</h3>
                  <p className="text-muted-foreground text-sm">
                    Once your order ships, you will receive a tracking number via email and SMS. You can also track your order in your account dashboard.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">What if my package is damaged during shipping?</h3>
                  <p className="text-muted-foreground text-sm">
                    Please inspect your package upon delivery. If you notice any damage, please take photos and contact our customer service within 24 hours.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Can I change my delivery address after placing an order?</h3>
                  <p className="text-muted-foreground text-sm">
                    Address changes may be possible if the order hasn't been shipped yet. Please contact our customer service team immediately.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Shipping;
