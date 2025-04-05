
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, X } from "lucide-react";

// Sample product data - in a real app, this would come from an API
const products = [
  {
    id: "1",
    name: "Emerald Silk Lehenga",
    price: 58000,
    discountedPrice: 49999,
    image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=1964&auto=format&fit=crop",
    category: "Bridal",
  },
  {
    id: "2",
    name: "Ruby Red Celebration",
    price: 42000,
    image: "https://images.unsplash.com/photo-1610189019599-2d766fcb615d?q=80&w=1964&auto=format&fit=crop",
    category: "Party Wear",
  },
  {
    id: "3",
    name: "Sapphire Elegance",
    price: 36000,
    image: "https://images.unsplash.com/photo-1580522154200-c44a22efef64?q=80&w=1964&auto=format&fit=crop",
    category: "Traditional",
  },
  {
    id: "4",
    name: "Pearl White Ethereal",
    price: 62000,
    discountedPrice: 56000,
    image: "https://images.unsplash.com/photo-1620359579376-9d122c92fbcf?q=80&w=1964&auto=format&fit=crop",
    category: "Bridal",
  },
  {
    id: "5",
    name: "Golden Sunset Lehenga",
    price: 48000,
    image: "https://images.unsplash.com/photo-1609115554321-ae991d11efd7?q=80&w=1887&auto=format&fit=crop",
    category: "Party Wear",
  },
  {
    id: "6",
    name: "Midnight Blue Enchantment",
    price: 52000,
    image: "https://images.unsplash.com/photo-1614252532508-297b0a9e9ca7?q=80&w=1935&auto=format&fit=crop",
    category: "Traditional",
  },
  {
    id: "7",
    name: "Rose Pink Celebration",
    price: 44000,
    discountedPrice: 39500,
    image: "https://images.unsplash.com/photo-1609132718484-cc90df3417f8?q=80&w=1974&auto=format&fit=crop",
    category: "Party Wear",
  },
  {
    id: "8",
    name: "Ivory Dream Bridal",
    price: 68000,
    image: "https://images.unsplash.com/photo-1617711164094-dae2c79b20dd?q=80&w=1887&auto=format&fit=crop",
    category: "Bridal",
  },
];

const categories = ["All", "Bridal", "Party Wear", "Traditional"];
const occasions = ["Wedding", "Reception", "Engagement", "Festival", "Party"];
const fabricTypes = ["Silk", "Velvet", "Georgette", "Chiffon", "Satin", "Crepe"];

export default function Products() {
  const location = useLocation();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState("featured");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loaded, setLoaded] = useState(false);

  // Get query params from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);

  // Filter products based on filters
  useEffect(() => {
    let filtered = [...products];
    
    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply price range filter
    filtered = filtered.filter(product => {
      const price = product.discountedPrice || product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Apply sorting
    switch (sortBy) {
      case "price-low-high":
        filtered.sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price));
        break;
      case "price-high-low":
        filtered.sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price));
        break;
      default:
        // Default "featured" sorting - in a real app this would be based on a featured flag
        break;
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, sortBy]);

  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="heading-lg mb-4">Our Collection</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our exquisite range of handcrafted lehengas, designed for every occasion
              and crafted with the finest materials and attention to detail.
            </p>
          </div>

          {/* Filters and Products */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Trigger */}
            <div className="lg:hidden">
              <Button
                variant="outline"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="w-full"
              >
                <Filter className="h-4 w-4 mr-2" /> {isFiltersOpen ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>

            {/* Filters Sidebar */}
            <div
              className={`lg:w-64 space-y-6 ${
                isFiltersOpen ? "block" : "hidden lg:block"
              }`}
            >
              <div className="flex justify-between items-center lg:hidden">
                <h3 className="font-medium">Filters</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFiltersOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-medium mb-3">Category</h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      size="sm"
                      className="justify-start w-full"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 100000]}
                    max={100000}
                    step={1000}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mb-6"
                  />
                  <div className="flex justify-between text-sm">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* More Filter Accordions */}
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="occasion">
                  <AccordionTrigger className="text-sm font-medium">
                    Occasion
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {occasions.map((occasion) => (
                        <div key={occasion} className="flex items-center space-x-2">
                          <Checkbox id={`occasion-${occasion}`} />
                          <label
                            htmlFor={`occasion-${occasion}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {occasion}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="fabric">
                  <AccordionTrigger className="text-sm font-medium">
                    Fabric
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {fabricTypes.map((fabric) => (
                        <div key={fabric} className="flex items-center space-x-2">
                          <Checkbox id={`fabric-${fabric}`} />
                          <label
                            htmlFor={`fabric-${fabric}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {fabric}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Sort Controls */}
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredProducts.length} products
                </div>
                <div className="flex items-center space-x-2">
                  <label htmlFor="sort" className="text-sm">
                    Sort by:
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]" id="sort">
                      <SelectValue placeholder="Featured" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                      <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Products - Updated grid layout */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className={`transition-all duration-500 ${
                        loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <h3 className="text-lg font-medium mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters to find what you're looking for.
                    </p>
                    <Button onClick={() => {
                      setSelectedCategory("All");
                      setPriceRange([0, 100000]);
                    }}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
