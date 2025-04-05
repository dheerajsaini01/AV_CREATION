
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProfileDetailsForm from "@/components/profile/ProfileDetailsForm";
import RequireAuth from "@/components/auth/RequireAuth";
import { Loader2 } from "lucide-react";

export default function CompleteProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      
      // If profile is already completed, redirect to dashboard page
      if (userData.profileCompleted) {
        navigate("/dashboard");
      }
    }
    setIsLoading(false);
  }, [navigate]);

  const handleProfileComplete = () => {
    navigate("/dashboard");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <RequireAuth>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
                <CardDescription>
                  Please provide your details to enhance your shopping experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user && (
                  <ProfileDetailsForm 
                    userId={user.id || user.email} 
                    onSuccess={handleProfileComplete} 
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    </RequireAuth>
  );
}
