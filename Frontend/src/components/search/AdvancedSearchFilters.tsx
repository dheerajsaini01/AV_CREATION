
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, SlidersHorizontal } from "lucide-react";

export type SearchFilters = {
  priceRange: [number, number];
  categories: string[];
  tags: string[];
  sortOption: string;
}

type AdvancedSearchFiltersProps = {
  onFilterChange: (filters: SearchFilters) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  initialFilters?: SearchFilters;
  availableTags?: string[];
}

const defaultCategories = [
  { id: "bridal", label: "Bridal" },
  { id: "party", label: "Party Wear" },
  { id: "traditional", label: "Traditional" },
  { id: "casual", label: "Casual" },
  { id: "festive", label: "Festive" },
];

export default function AdvancedSearchFilters({
  onFilterChange,
  showFilters,
  setShowFilters,
  initialFilters,
  availableTags = []
}: AdvancedSearchFiltersProps) {
  // Default price range from ₹0 to ₹100,000
  const [priceRange, setPriceRange] = useState<[number, number]>(
    initialFilters?.priceRange || [0, 100000]
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters?.categories || []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialFilters?.tags || []
  );
  const [sortOption, setSortOption] = useState(
    initialFilters?.sortOption || "relevance"
  );
  const [expandedSections, setExpandedSections] = useState({
    tags: false
  });

  useEffect(() => {
    // When filters change, notify parent component
    onFilterChange({
      priceRange,
      categories: selectedCategories,
      tags: selectedTags,
      sortOption
    });
  }, [priceRange, selectedCategories, selectedTags, sortOption, onFilterChange]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const resetFilters = () => {
    setPriceRange([0, 100000]);
    setSelectedCategories([]);
    setSelectedTags([]);
    setSortOption("relevance");
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div>
      <Button
        variant="outline"
        className="md:hidden mb-6"
        onClick={() => setShowFilters(!showFilters)}
      >
        <SlidersHorizontal className="mr-2 h-4 w-4" />
        {showFilters ? "Hide Filters" : "Show Filters"}
      </Button>
      
      <div className={`md:block ${showFilters ? "block" : "hidden"}`}>
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          <div>
            <h3 className="font-medium mb-4">Sort By</h3>
            <select
              className="w-full border rounded-md p-2"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-4">Price Range</h3>
            <Slider
              min={0}
              max={100000}
              step={1000}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="mb-4"
            />
            <div className="flex justify-between text-sm">
              <span>₹{priceRange[0].toLocaleString()}</span>
              <span>₹{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-4">Categories</h3>
            <div className="space-y-2">
              {defaultCategories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id.toLowerCase())}
                    onCheckedChange={() => toggleCategory(category.id.toLowerCase())}
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {availableTags.length > 0 && (
            <>
              <Separator />
              
              <Collapsible
                open={expandedSections.tags}
                onOpenChange={() => toggleSection('tags')}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <h3 className="font-medium">Tags</h3>
                  <Button variant="ghost" size="sm">
                    {expandedSections.tags ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2">
                  {availableTags.map((tag) => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tag-${tag}`}
                        checked={selectedTags.includes(tag)}
                        onCheckedChange={() => toggleTag(tag)}
                      />
                      <label
                        htmlFor={`tag-${tag}`}
                        className="text-sm cursor-pointer"
                      >
                        {tag}
                      </label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </>
          )}
          
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={resetFilters}
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
