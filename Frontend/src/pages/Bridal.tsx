
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/ui/ProductCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Mock bridal collection data
const bridalProducts = [
  {
    id: "b1",
    name: "Royal Bridal Lehenga",
    price: 85000,
    image: "https://images.unsplash.com/photo-1591130222377-2591803d0cb7?q=80&w=1887&auto=format&fit=crop",
    category: "Bridal Lehenga",
  },
  {
    id: "b2",
    name: "Designer Wedding Saree",
    price: 65000,
    discountedPrice: 58999,
    image: "https://images.unsplash.com/photo-1617711164094-dae2c79b20dd?q=80&w=1887&auto=format&fit=crop",
    category: "Wedding Saree",
  },
  {
    id: "b3",
    name: "Bridal Sharara Set",
    price: 72000,
    image: "https://images.unsplash.com/photo-1606503479586-1aed5cd13437?q=80&w=1887&auto=format&fit=crop",
    category: "Bridal Sets",
  },
  {
    id: "b4",
    name: "Reception Gown",
    price: 78000,
    image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=1887&auto=format&fit=crop",
    category: "Reception",
  },
];

export default function Bridal() {
  const [activeTab, setActiveTab] = useState("collection");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        {/* Hero section */}
        <div 
          className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1887&auto=format&fit=crop')",
            backgroundPosition: "center 30%"
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative text-center text-white px-4 max-w-3xl">
            <h1 className="heading-xl mb-4">Bridal Collection</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Exquisite designs for your special day, crafted with love and tradition.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-16">
          <Tabs defaultValue="collection" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="collection">Collection</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="collection" className="animate-fade-in">
              <div className="text-center mb-12">
                <h2 className="heading-md mb-4">Our Bridal Collection</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Discover our exclusive bridal wear collection, featuring handcrafted
                  designs with intricate embroidery and premium fabrics.
                </p>
              </div>
              
              <Separator className="mb-12" />
              
              {/* Products grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {bridalProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="services" className="animate-fade-in">
              <div className="max-w-3xl mx-auto">
                <h2 className="heading-md mb-6 text-center">Bridal Services</h2>
                
                <div className="space-y-8">
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Personalized Consultations</h3>
                    <p>Schedule a one-on-one consultation with our bridal experts to find your perfect wedding ensemble.</p>
                  </div>
                  
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Custom Designs</h3>
                    <p>Create a completely unique bridal outfit tailored to your preferences and measurements.</p>
                  </div>
                  
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Alterations & Fitting</h3>
                    <p>Professional alteration services to ensure your bridal wear fits perfectly.</p>
                  </div>
                  
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Styling Assistance</h3>
                    <p>Get expert advice on jewelry, accessories, and complete bridal look styling.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="appointments" className="animate-fade-in">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="heading-md mb-6">Book Your Appointment</h2>
                <p className="mb-8 text-muted-foreground">
                  We recommend booking an appointment for a personalized bridal consultation.
                  Our experts will help you find the perfect outfit for your special day.
                </p>
                
                <div className="bg-cream p-8 rounded-lg">
                  <h3 className="text-xl font-medium mb-4">Contact Information</h3>
                  <div className="space-y-2 mb-6">
                    <p><span className="font-semibold">Phone:</span> +91 9529505211</p>
                    <p><span className="font-semibold">Email:</span> bridal@avcreation.com</p>
                    <p><span className="font-semibold">Location:</span> AV CREATION-Khaniya Near Dayal Hospital, Purana Ghaat Khaniya, Cheq Post, Agra Road, Jaipur-302003 (Raj.)</p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Appointments available Monday to Sunday, 9:00 AM to 9:00 PM
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
