
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import LatestAndBudgetSection from "@/components/home/LatestAndBudgetSection";
import VisitStoreSection from "@/components/home/VisitStoreSection";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CategorySection />
        <FeaturedProducts />
        <LatestAndBudgetSection />
        
        {/* Testimonial Section */}
        <section className="section-padding bg-burgundy text-white">
          <div className="container mx-auto text-center">
            <h2 className="heading-lg mb-16">Crafting Memories</h2>
            <div className="max-w-3xl mx-auto">
              <blockquote className="font-display text-2xl md:text-3xl italic mb-8">
                "The attention to detail in my bridal lehenga was exquisite. Every stitch and embellishment told a story of craftsmanship that made my special day truly unforgettable."
              </blockquote>
              <cite className="not-italic">
                <div className="text-lg font-medium">Priya Sharma</div>
                <div className="text-white/70 text-sm mt-1">Delhi, India</div>
              </cite>
            </div>
          </div>
        </section>

        {/* Service Promise Section */}
        <section className="section-padding bg-cream">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="font-display text-xl font-medium mb-4">Artisan Craftsmanship</h3>
                <p className="text-muted-foreground">
                  Each piece is meticulously handcrafted by skilled artisans with generations of expertise
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-display text-xl font-medium mb-4">Ethically Sourced</h3>
                <p className="text-muted-foreground">
                  Premium materials sourced responsibly, supporting local communities and traditional crafts
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-display text-xl font-medium mb-4">Custom Tailoring</h3>
                <p className="text-muted-foreground">
                  Perfect fit guaranteed with our personalized tailoring service included with every purchase
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <VisitStoreSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
