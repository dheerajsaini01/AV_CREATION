
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";

const Sale = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample data - in a real app, this would come from an API
  const saleProducts = [
    {
      id: "sale1",
      name: "Royal Blue Embroidered Lehenga",
      price: 45000,
      discountedPrice: 36000,
      image: "https://images.unsplash.com/photo-1609230002614-3a9b4c9b0b61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      category: "Wedding Collection"
    },
    {
      id: "sale2",
      name: "Pastel Floral Dream",
      price: 38000,
      discountedPrice: 29000,
      image: "https://images.unsplash.com/photo-1633933304153-ac4cc4a1e36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      category: "Festive Wear"
    },
    {
      id: "sale3",
      name: "Burgundy Velvet Ensemble",
      price: 52000,
      discountedPrice: 39000,
      image: "https://images.unsplash.com/photo-1609230288317-56c39bdadb6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      category: "Wedding Collection"
    },
    {
      id: "sale4",
      name: "Emerald Sequin Delight",
      price: 46000,
      discountedPrice: 35000,
      image: "https://images.unsplash.com/photo-1610030333540-65b3bd3a1a67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      category: "Party Wear"
    },
    {
      id: "sale5",
      name: "Rose Gold Elegance",
      price: 59000,
      discountedPrice: 43000,
      image: "https://images.unsplash.com/photo-1623119364598-983e706518c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
      category: "Bridal Collection"
    },
    {
      id: "sale6",
      name: "Turquoise Celebration Lehenga",
      price: 42000,
      discountedPrice: 34000,
      image: "https://images.unsplash.com/photo-1610030244365-e07233736df6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      category: "Festive Wear"
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="relative mb-12 overflow-hidden">
          <div className="absolute inset-0 bg-burgundy/90"></div>
          <div className="container mx-auto px-4 py-12 relative z-10 text-white text-center">
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              Seasonal Sale
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto text-lg mb-6">
              Enjoy up to 30% off on select lehengas and ensembles from our premium collections
            </p>
            <div className="inline-block border border-white/30 px-4 py-2 rounded-lg">
              <p className="font-medium">Sale ends in:</p>
              <div className="flex justify-center gap-4 mt-2">
                <div className="text-center">
                  <div className="text-2xl font-bold">05</div>
                  <div className="text-xs text-white/70">Days</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-xs text-white/70">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">36</div>
                  <div className="text-xs text-white/70">Minutes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">
              Use coupon code <span className="font-medium">FESTIVAL30</span> at checkout for an additional 5% off on sale items!
            </p>
            <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors">
              View All Sale Items
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Sale;
