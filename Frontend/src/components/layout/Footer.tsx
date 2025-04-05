
import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-border">
      <div className="container mx-auto py-16 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="font-display text-xl font-semibold">AV CREATION</h3>
            <p className="text-muted-foreground">
              Elevate your celebration with our exquisite collection of handcrafted lehengas
            </p>
            <div className="flex space-x-4">
            <a href="https://www.instagram.com/jaipuri_odhni" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" aria-label="Instagram">
            <Instagram className="h-5 w-5" /></Button>
</a>
            <a href="https://www.facebook.com/profile.php?id=61561262172120&sk" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Button>
</a>
              
<a href="https://www.youtube.com/@jaipuri_odhani" target="_blank" rel="noopener noreferrer">
{ <Button variant="ghost" size="icon" aria-label="Youtube">
                <Youtube className="h-5 w-5" />
              </Button>}
</a>
              
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-lg">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/collections" className="text-muted-foreground hover:text-foreground transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/bridal" className="text-muted-foreground hover:text-foreground transition-colors">
                  Bridal
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-muted-foreground hover:text-foreground transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-lg">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/stores" className="text-muted-foreground hover:text-foreground transition-colors">
                  Stores
                </Link>
              </li>
              {/* Removed careers link */}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-lg">Stay Updated</h4>
            <p className="text-muted-foreground">Subscribe to our newsletter for exclusive offers and updates</p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Email address"
                className="bg-white/50"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AV CREATION. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
              Shipping
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
