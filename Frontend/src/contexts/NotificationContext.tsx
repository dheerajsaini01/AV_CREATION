
import React, { createContext, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast as showToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

type NotificationContextType = {
  showCartNotification: (productName: string) => void;
  showWishlistNotification: (productName: string, added: boolean) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const showCartNotification = (productName: string) => {
    showToast({
      title: "Added to Cart",
      description: `${productName} has been added to your cart.`,
      action: (
        <Link to="/cart">
          <Button variant="outline" size="sm">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Go to Cart
          </Button>
        </Link>
      ),
    });
  };

  const showWishlistNotification = (productName: string, added: boolean) => {
    showToast({
      title: added ? "Added to Wishlist" : "Removed from Wishlist",
      description: added 
        ? `${productName} has been added to your wishlist.` 
        : `${productName} has been removed from your wishlist.`,
    });
  };

  return (
    <NotificationContext.Provider
      value={{ showCartNotification, showWishlistNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
