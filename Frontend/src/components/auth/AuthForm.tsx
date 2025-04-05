
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (if available)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

interface AuthFormProps {
  userType?: "user" | "admin";
}

export default function AuthForm({ userType = "user" }: AuthFormProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get redirect path from location state
  const from = location.state?.from?.pathname || "/";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // Demo mode - we'll simulate auth
      if (!supabase) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // If it's an admin login, check if email contains "admin"
        if (userType === "admin" && !values.email.toLowerCase().includes("admin")) {
          toast({
            title: "Access denied",
            description: "This account doesn't have admin privileges.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        // For signup, create a new user in localStorage
        if (mode === "signup") {
          const newUser = {
            email: values.email,
            role: userType === "admin" || values.email.toLowerCase().includes("admin") ? "admin" : "user",
            profileCompleted: false,
          };
          
          localStorage.setItem("user", JSON.stringify(newUser));
          
          toast({
            title: "Account created",
            description: "Your account has been created successfully.",
          });
          
          // Redirect to profile completion page
          navigate("/complete-profile");
          return;
        }
        
        // For login, create a session
        const user = {
          email: values.email,
          role: userType === "admin" || values.email.toLowerCase().includes("admin") ? "admin" : "user",
          profileCompleted: false,
        };
        
        localStorage.setItem("user", JSON.stringify(user));
        
        toast({
          title: "Login successful",
          description: `Welcome back${userType === "admin" ? " to the admin panel" : ""}!`,
        });
        
        // Redirect to admin panel for admin users
        if (userType === "admin" || values.email.toLowerCase().includes("admin")) {
          navigate("/admin");
        } else {
          // Redirect back to the page they tried to visit
          navigate(from === "/auth" ? "/" : from);
        }
        
        return;
      }
      
      // If Supabase is available, use actual auth
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Account created",
          description: "Please check your email to verify your account.",
        });
        
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
        
        if (error) throw error;
        
        // Success, redirect to admin or home
        if (data.user?.email?.includes("admin")) {
          navigate("/admin");
        } else {
          navigate(from === "/auth" ? "/" : from);
        }
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      toast({
        title: mode === "login" ? "Login failed" : "Signup failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Tabs defaultValue={mode} onValueChange={(v) => setMode(v as "login" | "signup")}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login" className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...</>
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="signup" className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...</>
                ) : (
                  'Sign Up'
                )}
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
