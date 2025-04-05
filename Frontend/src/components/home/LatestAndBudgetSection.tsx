
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "../ui/ProductCard";
import { cn } from "@/lib/utils";

// Sample product data - in a real app, this would come from an API
const latestProducts = [
  {
    id: "5",
    name: "silk sareeeee",
    price: 45000,
    image: "https://images.unsplash.com/photo-1624032545726-9b578afdf54b?q=80&w=1964&auto=format&fit=crop",
    category: "New Arrival",
  },
  {
    id: "6",
    name: "Rose Petal Ensemble",
    price: 39000,
    image: "https://images.unsplash.com/photo-1614945649843-f9e65061a37d?q=80&w=1964&auto=format&fit=crop",
    category: "New Arrival",
  },
  {
    id: "7",
    name: "Sunset Gold Lehenga",
    price: 41000,
    discountedPrice: 38000,
    image: "https://images.unsplash.com/photo-1610189000082-7d222e899cd1?q=80&w=1964&auto=format&fit=crop",
    category: "New Arrival",
  },
  {
    id: "8",
    name: "Rustic Amber Set",
    price: 43000,
    image: "https://images.unsplash.com/photo-1622314201185-19e0b67e1df9?q=80&w=1964&auto=format&fit=crop",
    category: "New Arrival",
  },
];

const budgetProducts = [
  {
    id: "9",
    name: "Teal Simplicity",
    price: 28000,
    discountedPrice: 21999,
    image: "https://images.unsplash.com/photo-1609231312551-0bb02afc62b6?q=80&w=1964&auto=format&fit=crop",
    category: "Budget",
  },
  {
    id: "10",
    name: "Lavender Charm",
    price: 32000,
    discountedPrice: 24500,
    image: "https://images.unsplash.com/photo-1614967223483-7297c07a118c?q=80&w=1964&auto=format&fit=crop",
    category: "Budget",
  },
  {
    id: "11",
    name: "Mint Celebration",
    price: 30000,
    discountedPrice: 23999,
    image: "https://images.unsplash.com/photo-1617922380881-c83d774d33e6?q=80&w=1964&auto=format&fit=crop",
    category: "Budget",
  },
  {
    id: "12",
    name: "Blush Pink Elegance",
    price: 29000,
    discountedPrice: 22500,
    image: "https://images.unsplash.com/photo-1618783786071-6e79151837db?q=80&w=1964&auto=format&fit=crop",
    category: "Budget",
  },
];

export default function LatestAndBudgetSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Latest Collection */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Latest Collection</h2>
            </div>
            
            <Button variant="outline" className="mt-4 md:mt-0 self-end md:self-auto" asChild>
              <Link to="/products">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <p className="text-muted-foreground max-w-lg mb-8">
            Our newest additions to the collection, featuring the latest trends and designs
            for the upcoming season.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {latestProducts.map((product, index) => (
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

      {/* Budget Picks Section */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Budget Picks</h2>
            </div>
            
            <Button variant="outline" className="mt-4 md:mt-0 self-end md:self-auto" asChild>
              <Link to="/products?category=budget">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <p className="text-muted-foreground max-w-lg mb-8">
            Stunning designs at attractive prices, without compromising on quality
            or craftsmanship.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {budgetProducts.map((product, index) => (
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
    </>
  );
}
