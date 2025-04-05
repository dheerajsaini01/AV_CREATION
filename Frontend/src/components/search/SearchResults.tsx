
import { useState } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { SearchFilters } from "./AdvancedSearchFilters";

type SearchResultsProps = {
  products: any[];
  searchQuery: string;
  filters: SearchFilters;
  onResetFilters: () => void;
};

export default function SearchResults({ 
  products,
  searchQuery,
  filters,
  onResetFilters
}: SearchResultsProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-2">No Results Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          {searchQuery 
            ? `We couldn't find any products matching "${searchQuery}".` 
            : "We couldn't find any products matching your filters."}
          Try adjusting your search term or filters.
        </p>
        <Button onClick={onResetFilters}>Reset Filters</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">
          {products.length} {products.length === 1 ? "result" : "results"} found
        </p>
        <div className="flex space-x-2">
          <Button 
            variant={viewMode === "grid" ? "default" : "outline"} 
            size="sm"
            onClick={() => setViewMode("grid")}
            className="px-3"
          >
            Grid
          </Button>
          <Button 
            variant={viewMode === "list" ? "default" : "outline"} 
            size="sm"
            onClick={() => setViewMode("list")}
            className="px-3"
          >
            List
          </Button>
        </div>
      </div>

      <div className={`${
        viewMode === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" 
          : "flex flex-col space-y-6"
      }`}>
        {products.map((product) => (
          <div key={product.id} className={viewMode === "list" ? "w-full" : ""}>
            <ProductCard 
              product={product} 
              orientation={viewMode === "list" ? "horizontal" : "vertical"} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
