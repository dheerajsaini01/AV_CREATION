
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ui/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample product data - in a real app, this would come from an API
const featuredProducts = [
  {
    id: "1",
    name: "Lehnga-Odhani",
    price: 58000,
    discountedPrice: 49999,
    image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=1964&auto=format&fit=crop",
    category: "Bridal",
  },
  {
    id: "2",
    name: "Lehnga-Odhani",
    price: 42000,
    image: "https://images.unsplash.com/photo-1610189019599-2d766fcb615d?q=80&w=1964&auto=format&fit=crop",
    category: "Party Wear",
  },
  {
    id: "3",
    name: "Lehnga-Odhani",
    price: 36000,
    image: "https://images.unsplash.com/photo-1580522154200-c44a22efef64?q=80&w=1964&auto=format&fit=crop",
    category: "Traditional",
  },
  {
    id: "4",
    name: "Lehnga-Odhani",
    price: 62000,
    discountedPrice: 56000,
    image: "https://images.unsplash.com/photo-1620359579376-9d122c92fbcf?q=80&w=1964&auto=format&fit=crop",
    category: "Bridal",
  },
];

export default function FeaturedProducts() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="heading-lg mb-4">Featured Collection</h2>
            <p className="text-muted-foreground max-w-lg">
              Our most sought-after pieces, meticulously crafted for those who appreciate
              the perfect blend of tradition and contemporary style.
            </p>
          </div>
          <Button variant="outline" className="mt-6 md:mt-0" asChild>
            <Link to="/products">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className={cn(
                "transition-all duration-500",
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                { "delay-100": index === 0 },
                { "delay-200": index === 1 },
                { "delay-300": index === 2 },
                { "delay-400": index === 3 }
              )}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
