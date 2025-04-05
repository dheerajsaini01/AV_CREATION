import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, User, Shield, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SearchBar from "./SearchBar";
import { useCart } from "@/contexts/CartContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/collections" },
  { name: "Products", href: "/products" },
  { name: "Bridal", href: "/bridal" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    
    // Check on mount
    checkAuth();
    
    // Set up event listener for auth changes
    window.addEventListener("storage", checkAuth);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // Effect to prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm h-16"
          : "bg-white h-16"
      )}

   
     
    >
      <div className="container mx-auto px-4 md:px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center h-40 w-42">
  <img
    src="/assets/AV_logo.png"
    alt="AV Creation Logo"
    className="max-h-full max-w-full object-contain"
  />
</Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-foreground/80 hover:text-foreground font-medium transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />
            
            {user ? (
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" aria-label="Account">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="icon" aria-label="Login">
                  <LogIn className="h-5 w-5" />
                </Button>
              </Link>
            )}
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            
            {user?.role === "admin" && (
              <Link to="/admin">
                <Button variant="ghost" size="icon" aria-label="Admin">
                  <Shield className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <SearchBar />
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Menu"
              onClick={() => setIsOpen(!isOpen)}
               className="z-50 relative"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      {/* <div
        className={cn(
          "md:hidden fixed inset-y-0 right-0 w-[60%] bg-white z-40 transform transition-transform duration-300 ease-in-out shadow-lg",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      > */}

<div
  className={cn(
    "md:hidden fixed top-0 right-0 h-screen w-[70%] bg-white z-40 transform transition-transform duration-300 ease-in-out shadow-lg", 
    // ⬆️ UPDATED: Added top-0, h-screen, bg-white
    isOpen ? "translate-x-0" : "translate-x-full"
  )}
>
  <div className="flex flex-col h-full justify-center items-center space-y-8 p-8">
    {/* Navigation Links */}
    {navLinks.map((link) => (
      <Link
        key={link.name}
        to={link.href}
        className="text-2xl font-medium"
        onClick={() => setIsOpen(false)}
      >
        {link.name}
      </Link>
    ))}

    {/* Dashboard or Login */}
    {user ? (
      <Link
        to="/dashboard"
        className="text-2xl font-medium flex items-center gap-2"
        onClick={() => setIsOpen(false)}
      >
        <User className="h-5 w-5" /> Dashboard
      </Link>
    ) : (
      <Link
        to="/auth"
        className="text-2xl font-medium flex items-center gap-2"
        onClick={() => setIsOpen(false)}
      >
        <LogIn className="h-5 w-5" /> Login
      </Link>
    )}

    {/* Admin Link */}
    {user?.role === "admin" && (
      <Link
        to="/admin"
        className="text-2xl font-medium flex items-center gap-2"
        onClick={() => setIsOpen(false)}
      >
        <Shield className="h-5 w-5" /> Admin
      </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
