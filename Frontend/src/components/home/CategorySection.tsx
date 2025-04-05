
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "bridal",
    name: "Bridal",
    description: "Timeless elegance for your special day",
    image: "https://images.unsplash.com/photo-1591130222377-2591803d0cb7?q=80&w=1887&auto=format&fit=crop",
    href: "/products?category=Bridal",
  },
  {
    id: "party",
    name: "Party Wear",
    description: "Statement pieces for celebrations",
    image: "https://images.unsplash.com/photo-1606503479586-1aed5cd13437?q=80&w=1887&auto=format&fit=crop",
    href: "/products?category=Party Wear",
  },
  {
    id: "traditional",
    name: "Traditional",
    description: "Heritage designs with modern touches",
    image: "https://images.unsplash.com/photo-1617711164094-dae2c79b20dd?q=80&w=1887&auto=format&fit=crop",
    href: "/products?category=Traditional",
  },
];

export default function CategorySection() {
  return (
    <section className="section-padding bg-cream">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">Curated Collections</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore our thoughtfully curated categories, each offering unique designs
            crafted for different occasions and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category }: { category: typeof categories[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={category.href}
      className="group block relative overflow-hidden rounded-xl aspect-[4/5]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out",
          isHovered ? "scale-105" : "scale-100"
        )}
        style={{ backgroundImage: `url(${category.image})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="font-display text-2xl text-white font-medium">{category.name}</h3>
        <p className="text-white/80 mt-2">{category.description}</p>
        <div className="mt-4 flex items-center text-white/80 group-hover:text-white transition-colors">
          <span className="text-sm font-medium">Explore Collection</span>
          <ArrowRight className={cn(
            "ml-2 h-4 w-4 transition-transform duration-300",
            isHovered ? "translate-x-1" : ""
          )} />
        </div>
      </div>
    </Link>
  );
}
