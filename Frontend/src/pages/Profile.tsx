
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, User, Package, Heart, Clock, LogOut, UserPlus } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RequireAuth from "@/components/auth/RequireAuth";
import { useToast } from "@/components/ui/use-toast";
import ProfileDetailsForm from "@/components/profile/ProfileDetailsForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Mock order data
const orders = [
  {
    id: "ORD-12345",
    date: "2023-12-15",
    status: "Delivered",
    total: 15999,
    items: 2,
  },
  {
    id: "ORD-12346",
    date: "2024-01-20",
    status: "Processing",
    total: 8500,
    items: 1,
  },
  {
    id: "ORD-12347",
    date: "2024-02-05",
    status: "Shipped",
    total: 24999,
    items: 3,
  },
];

// Mock wishlist data
const wishlist = [
  {
    id: "1",
    name: "Designer Party Gown",
    price: 12000,
    image: "https://images.unsplash.com/photo-1606503479586-1aed5cd13437?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Embroidered Silk Saree",
    price: 15000,
    image: "https://images.unsplash.com/photo-1617711164094-dae2c79b20dd?q=80&w=1887&auto=format&fit=crop",
  },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get user info from localStorage
  const [user, setUser] = useState<any>(null);
  const [profileCompleted, setProfileCompleted] = useState(false);
  
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      setUser(userData);
      setProfileCompleted(userData.profileCompleted || false);
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/auth");
  };

  const handleProfileUpdate = () => {
    setIsEditProfileOpen(false);
    
    // Refresh user data
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      setUser(userData);
      setProfileCompleted(userData.profileCompleted || false);
    }
    
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCompleteProfile = () => {
    navigate("/complete-profile");
  };

  return (
    <RequireAuth>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Profile Sidebar */}
                <div className="w-full md:w-64 space-y-4">
                  <div className="text-center md:text-left mb-6">
                    <div className="w-24 h-24 rounded-full bg-muted mx-auto md:mx-0 mb-4 overflow-hidden">
                      <User className="w-full h-full p-5 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold">{user?.profile?.name || user?.email || "User"}</h2>
                    <p className="text-muted-foreground">Member since 2023</p>
                  </div>
                  
                  <Separator className="my-4 md:hidden" />
                  
                  <nav className="space-y-1">
                    <Button 
                      variant={activeTab === "profile" ? "secondary" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("profile")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      My Profile
                    </Button>
                    <Button 
                      variant={activeTab === "orders" ? "secondary" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("orders")}
                    >
                      <Package className="mr-2 h-4 w-4" />
                      My Orders
                    </Button>
                    <Button 
                      variant={activeTab === "wishlist" ? "secondary" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("wishlist")}
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-muted-foreground"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </nav>
                </div>
                
                {/* Content Area */}
                <div className="flex-1">
                  <Separator className="mb-6 hidden md:block" />
                  
                  {activeTab === "profile" && (
                    <div className="animate-fade-in">
                      <h2 className="text-2xl font-semibold mb-6">My Profile</h2>
                      
                      {profileCompleted ? (
                        <div className="space-y-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Personal Information</h3>
                            <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">Edit Profile</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Edit Profile Details</DialogTitle>
                                </DialogHeader>
                                <ProfileDetailsForm 
                                  userId={user?.id || user?.email}
                                  existingData={user?.profile}
                                  onSuccess={handleProfileUpdate}
                                />
                              </DialogContent>
                            </Dialog>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">Name</p>
                              <p className="font-medium">{user?.profile?.name || "Not provided"}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">Email</p>
                              <p className="font-medium">{user?.email || "Not provided"}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">Phone</p>
                              <p className="font-medium">{user?.profile?.phone || "Not provided"}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">Date of Birth</p>
                              <p className="font-medium">{user?.profile?.dob || "Not provided"}</p>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h3 className="text-lg font-medium mb-4">Address Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">Street Address</p>
                                <p className="font-medium">{user?.profile?.street || "Not provided"}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">City</p>
                                <p className="font-medium">{user?.profile?.city || "Not provided"}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">State</p>
                                <p className="font-medium">{user?.profile?.state || "Not provided"}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">Pin Code</p>
                                <p className="font-medium">{user?.profile?.pincode || "Not provided"}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12 border rounded-lg">
                          <UserPlus className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">Complete Your Profile</h3>
                          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                            Add your personal details to complete your profile and enhance your shopping experience
                          </p>
                          <Button onClick={handleCompleteProfile}>
                            Complete Profile
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeTab === "orders" && (
                    <div className="animate-fade-in">
                      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
                      
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <Card key={order.id}>
                            <CardHeader className="pb-2">
                              <div className="flex flex-wrap justify-between items-center gap-2">
                                <div>
                                  <CardTitle>{order.id}</CardTitle>
                                  <CardDescription>
                                    Placed on {new Date(order.date).toLocaleDateString()}
                                  </CardDescription>
                                </div>
                                <Badge 
                                  variant={
                                    order.status === "Delivered" ? "default" :
                                    order.status === "Processing" ? "secondary" : "outline"
                                  }
                                >
                                  {order.status}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-wrap justify-between items-center gap-2">
                                <div>
                                  <p className="text-muted-foreground">
                                    {order.items} {order.items === 1 ? "item" : "items"}
                                  </p>
                                  <p className="font-medium">
                                    ₹{order.total.toLocaleString()}
                                  </p>
                                </div>
                                <Button variant="ghost" size="sm" className="flex items-center">
                                  View Details <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {activeTab === "wishlist" && (
                    <div className="animate-fade-in">
                      <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>
                      
                      {wishlist.length > 0 ? (
                        <div className="space-y-4">
                          {wishlist.map((item) => (
                            <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg">
                              <div className="w-full sm:w-24 h-24 bg-muted rounded overflow-hidden">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                                <div>
                                  <h3 className="font-medium">{item.name}</h3>
                                  <p className="text-muted-foreground">₹{item.price.toLocaleString()}</p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                                  <Button variant="outline" size="sm">
                                    Add to Cart
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                          <p className="text-muted-foreground mb-6">
                            Items added to your wishlist will appear here
                          </p>
                          <Button>Browse Products</Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </RequireAuth>
  );
}
