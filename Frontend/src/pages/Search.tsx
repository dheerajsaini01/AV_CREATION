
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/ui/ProductCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AdvancedSearchFilters, { SearchFilters } from "@/components/search/AdvancedSearchFilters";
import SearchResults from "@/components/search/SearchResults";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock products data
const allProducts = [
  {
    id: "1",
    name: "Embroidered Silk Saree",
    price: 15000,
    image: "https://images.unsplash.com/photo-1617711164094-dae2c79b20dd?q=80&w=1887&auto=format&fit=crop",
    category: "Traditional",
    tags: ["silk", "embroidered", "saree", "wedding"]
  },
  {
    id: "2",
    name: "Designer Party Gown",
    price: 12000,
    discountedPrice: 9999,
    image: "https://images.unsplash.com/photo-1606503479586-1aed5cd13437?q=80&w=1887&auto=format&fit=crop",
    category: "Party",
    tags: ["designer", "gown", "party", "premium"]
  },
  {
    id: "3",
    name: "Casual Cotton Kurta",
    price: 3500,
    image: "https://images.unsplash.com/photo-1591130222377-2591803d0cb7?q=80&w=1887&auto=format&fit=crop",
    category: "Casual",
    tags: ["cotton", "kurta", "casual", "daily"]
  },
  {
    id: "4",
    name: "Festive Lehenga Choli",
    price: 25000,
    discountedPrice: 21000,
    image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=1887&auto=format&fit=crop",
    category: "Festive",
    tags: ["lehenga", "choli", "festive", "celebration"]
  },
  {
    id: "5",
    name: "Handloom Chanderi Saree",
    price: 8500,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1887&auto=format&fit=crop",
    category: "Traditional",
    tags: ["handloom", "chanderi", "saree", "traditional"]
  },
  {
    id: "6",
    name: "Contemporary Anarkali Suit",
    price: 7800,
    image: "https://images.unsplash.com/photo-1581163898370-6799b9e3c71e?q=80&w=1887&auto=format&fit=crop",
    category: "Party",
    tags: ["anarkali", "suit", "contemporary", "elegant"]
  },
  {
    id: "7",
    name: "Royal Bridal Lehenga",
    price: 85000,
    image: "https://images.unsplash.com/photo-1591130222377-2591803d0cb7?q=80&w=1887&auto=format&fit=crop",
    category: "Bridal",
    tags: ["royal", "bridal", "lehenga", "wedding", "premium"]
  },
  {
    id: "8",
    name: "Casual Palazzo Set",
    price: 4200,
    image: "https://images.unsplash.com/photo-1606503479586-1aed5cd13437?q=80&w=1887&auto=format&fit=crop",
    category: "Casual",
    tags: ["palazzo", "set", "casual", "comfortable"]
  },
];

// Extract all unique tags from products
const allTags = Array.from(
  new Set(allProducts.flatMap(product => product.tags || []))
).sort();

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [inputQuery, setInputQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [filters, setFilters] = useState<SearchFilters>({
    priceRange: [0, 100000],
    categories: [],
    tags: [],
    sortOption: "relevance"
  });

  // Parse URL search params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    setSearchQuery(query);
    setInputQuery(query);
    
    // Parse other potential URL parameters (could be extended)
    const urlCategory = params.get("category");
    if (urlCategory) {
      setFilters(prev => ({
        ...prev,
        categories: [urlCategory.toLowerCase()]
      }));
    }
  }, [location.search]);

  // Apply filters and search
  useEffect(() => {
    let results = [...allProducts];
    
    // Search query filter
    if (searchQuery) {
      const searchTerms = searchQuery.toLowerCase().split(' ');
      results = results.filter(product => {
        // Check if any search term matches name, category or tags
        return searchTerms.some(term => 
          product.name.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term) ||
          (product.tags && product.tags.some(tag => tag.toLowerCase().includes(term)))
        );
      });
    }
    
    // Category filter
    if (filters.categories.length > 0) {
      results = results.filter(product =>
        filters.categories.includes(product.category.toLowerCase())
      );
    }
    
    // Tags filter
    if (filters.tags.length > 0) {
      results = results.filter(product =>
        product.tags && filters.tags.some(tag => product.tags.includes(tag))
      );
    }
    
    // Price range filter
    results = results.filter(
      product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );
    
    // Sort
    if (filters.sortOption === "price-asc") {
      results.sort((a, b) => a.price - b.price);
    } else if (filters.sortOption === "price-desc") {
      results.sort((a, b) => b.price - a.price);
    } else if (filters.sortOption === "newest") {
      // For mock data, we don't have dates, but in a real app we would sort by date
      // This is just a placeholder for the functionality
      results = [...results].reverse();
    }
    
    setFilteredProducts(results);
  }, [searchQuery, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputQuery.trim()) {
      // Update URL to reflect search
      navigate(`/search?q=${encodeURIComponent(inputQuery.trim())}`);
      
      // Add visual feedback
      toast({
        title: "Searching...",
        description: `Finding results for "${inputQuery.trim()}"`,
        duration: 2000,
      });
    }
  };

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 100000],
      categories: [],
      tags: [],
      sortOption: "relevance"
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="heading-lg mb-4">
              {searchQuery ? `Search: ${searchQuery}` : "Search Products"}
            </h1>
            
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
              <Input
                type="text" 
                placeholder="Search by product name, category, or tags..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit">
                <SearchIcon className="h-4 w-4 mr-2" /> Search
              </Button>
            </form>
            
            <Separator className="my-6" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="md:col-span-1">
              <AdvancedSearchFilters
                onFilterChange={handleFiltersChange}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                initialFilters={filters}
                availableTags={allTags}
              />
            </div>
            
            {/* Products Grid */}
            <div className="md:col-span-3">
              <SearchResults 
                products={filteredProducts}
                searchQuery={searchQuery}
                filters={filters}
                onResetFilters={resetFilters}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
