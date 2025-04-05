
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  quantity: number;
  image: string;
  size: string;
  color: string;
};

export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  image: string;
  category: string;
  size?: string;
  color?: string;
};

type CartContextType = {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  addToCartFromWishlist: (id: string, size?: string, color?: string) => void;
  itemCount: number;
  wishlistCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// The key issue was that CartProvider wasn't properly defined as a React function component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedWishlist = localStorage.getItem("wishlist");
    
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        localStorage.removeItem("cart");
      }
    }
    
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        setWishlistItems(parsedWishlist);
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error);
        localStorage.removeItem("wishlist");
      }
    }
  }, []);

  // Update localStorage and item count whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setItemCount(count);
  }, [cartItems]);

  // Update localStorage and wishlist count whenever wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    setWishlistCount(wishlistItems.length);
  }, [wishlistItems]);

  const addToCart = (newItem: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    const quantity = newItem.quantity || 1;
    
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item to cart
        return [...prevItems, { ...newItem, quantity }];
      }
    });
    
    toast({
      title: "Added to Cart",
      description: (
        <div className="flex flex-col space-y-2">
          <div>{newItem.name} has been added to your cart.</div>
          <Button asChild className="mt-2 w-full">
            <Link to="/cart">Go to Cart</Link>
          </Button>
        </div>
      ),
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };
  
  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems(prevItems => {
      // Check if item already exists in wishlist
      const existingItem = prevItems.find(wishlistItem => wishlistItem.id === item.id);
      
      if (existingItem) {
        toast({
          title: "Already in Wishlist",
          description: `${item.name} is already in your wishlist.`,
        });
        return prevItems;
      } else {
        toast({
          title: "Added to Wishlist",
          description: `${item.name} has been added to your wishlist.`,
        });
        return [...prevItems, item];
      }
    });
  };
  
  const removeFromWishlist = (id: string) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== id));
    
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist.",
    });
  };
  
  const isInWishlist = (id: string) => {
    return wishlistItems.some(item => item.id === id);
  };

  const addToCartFromWishlist = (id: string, size = "Free Size", color = "Default") => {
    const wishlistItem = wishlistItems.find(item => item.id === id);
    
    if (wishlistItem) {
      addToCart({
        id: wishlistItem.id,
        name: wishlistItem.name,
        price: wishlistItem.price,
        discountedPrice: wishlistItem.discountedPrice,
        image: wishlistItem.image,
        size: wishlistItem.size || size,
        color: wishlistItem.color || color,
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        addToCartFromWishlist,
        itemCount,
        wishlistCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
