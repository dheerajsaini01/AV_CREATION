
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">Contact Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We'd love to hear from you. Whether you have a question about our products, 
              custom orders, or anything else, our team is ready to assist you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="font-display text-2xl font-medium mb-6">Send Us a Message</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Name</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md" 
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full p-2 border rounded-md" 
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full p-2 border rounded-md" 
                    placeholder="+91 12345 67890"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="">Select a subject</option>
                    <option value="product">Product Inquiry</option>
                    <option value="order">Order Status</option>
                    <option value="custom">Custom Order</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea 
                    className="w-full p-2 border rounded-md h-32" 
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" /> Send Message
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-medium mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-cream p-3 rounded-full">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email Us</h3>
                      <p className="text-muted-foreground">info@avcreation.com</p>
                      <p className="text-muted-foreground">support@avcreation.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-cream p-3 rounded-full">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Call Us</h3>
                      <p className="text-muted-foreground">+91 93142 05211</p>
                      <p className="text-muted-foreground">+91 95295 05211</p>
                      <p className="text-muted-foreground">+91 89494 75741</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-cream p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Visit Us</h3>
                      <p className="text-muted-foreground">
                      Av Creation - Shri Niketan, Keshav Vidyapeeth Rd, opposite Ganesh Vihar Colony, Jamdoli, Jaipur, Rajasthan 302031</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-cream p-3 rounded-full">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Business Hours</h3>
                      <p className="text-muted-foreground">Monday - Sunday: 9:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="font-display text-2xl font-medium mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">How can I place a custom order?</h3>
                    <p className="text-muted-foreground text-sm">
                      You can contact us via email, phone, or by visiting our store. Our design team will guide you through the custom ordering process.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">What is your return policy?</h3>
                    <p className="text-muted-foreground text-sm">
                      We accept returns within 7 days of delivery for ready-to-wear items. Custom orders are non-returnable.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Do you ship internationally?</h3>
                    <p className="text-muted-foreground text-sm">
                      Yes, we ship to most countries worldwide. Please refer to our Shipping page for details.
                    </p>
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
};

export default Contact;
