import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://jellthappcboftfvwyyy.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

interface ProfileFormData {
  name: string;
  phone: string;
  dob: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

interface ProfileDetailsFormProps {
  userId: string;
  onSuccess: () => void;
  existingData?: Partial<ProfileFormData>;
}

export default function ProfileDetailsForm({ userId, onSuccess, existingData }: ProfileDetailsFormProps) {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: existingData?.name || "",
    phone: existingData?.phone || "",
    dob: existingData?.dob || "",
    street: existingData?.street || "",
    city: existingData?.city || "",
    state: existingData?.state || "",
    pincode: existingData?.pincode || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Demo mode
      if (supabaseUrl === "https://jellthappcboftfvwyyy.supabase.co") {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Save to local storage for demo
        const user = localStorage.getItem("user");
        if (user) {
          const userData = JSON.parse(user);
          localStorage.setItem("user", JSON.stringify({
            ...userData,
            profileCompleted: true,
            profile: formData
          }));
        }
        
        toast({
          title: "Profile updated",
          description: "Your profile details have been saved.",
        });
        
        onSuccess();
        return;
      }
      
      // Real implementation with Supabase
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: userId,
          ...formData,
          updated_at: new Date().toISOString()
        });
      
      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile details have been saved.",
      });
      
      onSuccess();
    } catch (error) {
      console.error('Error saving profile details:', error);
      toast({
        title: "Update failed",
        description: "There was a problem saving your profile details.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    toast({
      title: "Profile setup skipped",
      description: "You can complete your profile later from your account page.",
    });
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="mt-1" 
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              name="phone"
              value={formData.phone} 
              onChange={handleChange} 
              className="mt-1" 
              required
            />
          </div>
          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input 
              id="dob" 
              name="dob"
              type="date" 
              value={formData.dob} 
              onChange={handleChange} 
              className="mt-1" 
            />
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium mb-4">Address Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="street">Street Address</Label>
              <Input 
                id="street" 
                name="street"
                value={formData.street} 
                onChange={handleChange} 
                className="mt-1" 
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                name="city"
                value={formData.city} 
                onChange={handleChange} 
                className="mt-1" 
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input 
                id="state" 
                name="state"
                value={formData.state} 
                onChange={handleChange} 
                className="mt-1" 
              />
            </div>
            <div>
              <Label htmlFor="pincode">Pin Code</Label>
              <Input 
                id="pincode" 
                name="pincode"
                value={formData.pincode} 
                onChange={handleChange} 
                className="mt-1" 
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-4">
        {existingData ? null : (
          <Button type="button" variant="outline" onClick={handleSkip}>
            Skip for Now
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
          ) : (
            'Save Details'
          )}
        </Button>
      </div>
    </form>
  );
}
