
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <div
          className={cn(
            "absolute inset-0 bg-center bg-cover transition-all duration-1000",
            loaded ? "scale-100 blur-0" : "scale-110 blur-xl"
          )}
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1676037150387-cda08abacf62?q=80&w=2070&auto=format&fit=crop')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
      </div>

      <div className="container relative h-full mx-auto px-4 md:px-6 flex items-center">
        <div className="max-w-2xl">
          <div
            className={cn(
              "transition-all duration-700 delay-300",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <h1 className="text-white font-display text-5xl md:text-6xl font-semibold tracking-tight mb-6">
              Elegance in Every Thread
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-8 max-w-lg">
              Discover our exquisite collection of handcrafted festive lehengas,
              designed to make every celebration extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button size="lg" className="rounded-full w-full sm:w-auto">
                  Shop Collection <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/bridal">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full border-white/70 bg-black/30 text-white hover:bg-white hover:text-black w-full sm:w-auto"
                >
                  Bridal Specials
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
