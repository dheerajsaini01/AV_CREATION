
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/ui/ProductCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const categories = [
  { id: "all", name: "All Collections" },
  { id: "bridal", name: "Bridal" },
  { id: "party", name: "Party Wear" },
  { id: "traditional", name: "Traditional" },
  { id: "casual", name: "Casual" },
  { id: "festive", name: "Festive" },
];

// Mock products data
const mockProducts = [
  {
    id: "1",
    name: "Embroidered Silk Saree",
    price: 15000,
    image: "https://images.unsplash.com/photo-1617711164094-dae2c79b20dd?q=80&w=1887&auto=format&fit=crop",
    category: "Traditional",
  },
  {
    id: "2",
    name: "Designer Party Gown",
    price: 12000,
    discountedPrice: 9999,
    image: "https://images.unsplash.com/photo-1606503479586-1aed5cd13437?q=80&w=1887&auto=format&fit=crop",
    category: "Party",
  },
  {
    id: "3",
    name: "Casual Cotton Kurta",
    price: 3500,
    image: "https://images.unsplash.com/photo-1591130222377-2591803d0cb7?q=80&w=1887&auto=format&fit=crop",
    category: "Casual",
  },
  {
    id: "4",
    name: "Festive Lehenga Choli",
    price: 25000,
    discountedPrice: 21000,
    image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=1887&auto=format&fit=crop",
    category: "Festive",
  },
  {
    id: "5",
    name: "Handloom Chanderi Saree",
    price: 8500,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1887&auto=format&fit=crop",
    category: "Traditional",
  },
  {
    id: "6",
    name: "Contemporary Anarkali Suit",
    price: 7800,
    image: "https://images.unsplash.com/photo-1581163898370-6799b9e3c71e?q=80&w=1887&auto=format&fit=crop",
    category: "Party",
  },
];

export default function Collections() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const location = useLocation();

  useEffect(() => {
    // Extract query params
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    
    if (categoryParam) {
      setActiveCategory(categoryParam.toLowerCase());
    }
  }, [location]);

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProducts(mockProducts);
    } else {
      setFilteredProducts(
        mockProducts.filter(
          (product) => product.category.toLowerCase() === activeCategory
        )
      );
    }
  }, [activeCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="heading-lg mb-4">Our Collections</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully curated collections featuring the finest designs
              for every occasion, from traditional to contemporary styles.
            </p>
          </div>

          {/* Categories filter - Updated for better responsiveness */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full transition-colors whitespace-nowrap mb-2 ${
                  activeCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-muted hover:bg-muted/80"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <Separator className="mb-12" />

          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
