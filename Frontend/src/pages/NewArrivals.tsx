
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";

const NewArrivals = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample data - in a real app, this would come from an API
  const newProducts = [
    {
      id: "new1",
      name: "Emerald Dreams Lehenga",
      price: 45000,
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      category: "Bridal Collection"
    },
    {
      id: "new2",
      name: "Ruby Elegance Ensemble",
      price: 38000,
      discountedPrice: 34000,
      image: "https://images.unsplash.com/photo-1610030181087-685ccd3e3645?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80",
      category: "Festive Wear"
    },
    {
      id: "new3",
      name: "Sapphire Sparkle Lehenga",
      price: 42000,
      image: "https://images.unsplash.com/photo-1600716887304-382af77ee86f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "Wedding Collection"
    },
    {
      id: "new4",
      name: "Golden Radiance Lehenga",
      price: 56000,
      discountedPrice: 49000,
      image: "https://images.unsplash.com/photo-1610030169588-1d35cf912c14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      category: "Bridal Collection"
    },
    {
      id: "new5",
      name: "Crimson Celebration Set",
      price: 36000,
      image: "https://images.unsplash.com/photo-1609228338054-5b01e2f32c48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      category: "Party Wear"
    },
    {
      id: "new6",
      name: "Pearl Perfection Lehenga",
      price: 47000,
      image: "https://images.unsplash.com/photo-1603205431869-97b3162bef58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
      category: "Wedding Collection"
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">New Arrivals</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our latest collection of exquisite lehengas and ensembles, 
              crafted with the finest fabrics and intricate embellishments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Explore our complete collection or contact us for custom designs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors">
                View All Products
              </button>
              <button className="border border-primary text-primary px-6 py-2 rounded-full hover:bg-primary/10 transition-colors">
                Request Custom Design
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NewArrivals;
