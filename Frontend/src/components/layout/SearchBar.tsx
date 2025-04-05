
import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      try {
        const parsedSearches = JSON.parse(storedSearches);
        if (Array.isArray(parsedSearches)) {
          setRecentSearches(parsedSearches.slice(0, 5)); // Only show 5 most recent
        }
      } catch (error) {
        console.error("Failed to parse recent searches", error);
      }
    }
  }, []);

  useEffect(() => {
    // Add event listener to detect clicks outside search box
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Focus the input when opened
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Save to recent searches
      const newRecentSearches = [
        searchQuery.trim(),
        ...recentSearches.filter(s => s !== searchQuery.trim()),
      ].slice(0, 5);
      
      setRecentSearches(newRecentSearches);
      localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches));
      
      // Navigate to search page
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  const handleRecentSearchClick = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setIsOpen(false);
  };

  const handleAdvancedSearch = () => {
    navigate("/search");
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Search"
        onClick={handleSearchToggle}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
      </Button>

      <div
        className={cn(
          "fixed left-0 right-0 top-[var(--navbar-height)] bg-white/95 backdrop-blur-sm transition-all duration-300 ease-in-out z-50 shadow-lg",
          isOpen 
            ? "opacity-100 transform translate-y-0" 
            : "opacity-0 transform -translate-y-4 pointer-events-none"
        )}
        style={{ "--navbar-height": "64px" } as React.CSSProperties}
      >
        <div className="container mx-auto px-4 py-3">
          <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <Button type="submit" variant="default" size="sm">
              Search
            </Button>
          </form>
          
          {recentSearches.length > 0 && (
            <div className="mt-3">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Recent Searches</h4>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(query)}
                    className="text-sm bg-secondary px-3 py-1 rounded-full hover:bg-secondary/80 transition-colors"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-4 border-t pt-3">
            <Button 
              variant="link" 
              size="sm" 
              onClick={handleAdvancedSearch}
              className="text-sm text-muted-foreground px-0"
            >
              Advanced Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
