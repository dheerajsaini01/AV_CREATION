
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from '@supabase/supabase-js';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Image as ImageIcon, Upload } from "lucide-react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://jellthappcboftfvwyyy.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

const productSchema = z.object({
  name: z.string().min(3, { message: "Product name must be at least 3 characters" }),
  sku: z.string().min(2, { message: "SKU must be at least 2 characters" }),
  price: z.coerce.number().positive({ message: "Price must be a positive number" }),
  stock: z.coerce.number().int({ message: "Stock must be a whole number" }).nonnegative({ message: "Stock cannot be negative" }),
  category: z.string().min(1, { message: "Please select a category" }),
  description: z.string().optional(),
  image: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface AddProductFormProps {
  onSuccess?: () => void;
}

export default function AddProductForm({ onSuccess }: AddProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      sku: "",
      price: 0,
      stock: 0,
      category: "",
      description: "",
      image: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      form.setValue("image", file.name); // Set the filename as a placeholder
    }
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setIsSubmitting(true);
      
      let imageUrl = data.image;
      
      // Upload image if we have a file
      if (imageFile) {
        if (supabase) {
          const fileExt = imageFile.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
          
          // For demo, just simulate upload delay
          if (supabaseUrl === "https://jellthappcboftfvwyyy.supabase.co") {
            await new Promise(resolve => setTimeout(resolve, 1000));
            imageUrl = imagePreview; // Use the preview as the URL in demo mode
          } else {
            // Upload to Supabase Storage in real implementation
            const { data: uploadData, error } = await supabase
              .storage
              .from('products')
              .upload(`images/${fileName}`, imageFile);
            
            if (error) throw error;
            
            // Get public URL
            const { data: { publicUrl } } = supabase
              .storage
              .from('products')
              .getPublicUrl(`images/${fileName}`);
              
            imageUrl = publicUrl;
          }
        } else {
          // Fallback for demo
          imageUrl = imagePreview;
        }
      }
      
      // Now save the product with image URL
      const productData = {
        ...data,
        image: imageUrl
      };
      
      // For demo, just simulate saving
      if (supabaseUrl === "https://jellthappcboftfvwyyy.supabase.co") {
        await new Promise(resolve => setTimeout(resolve, 800));
      } else {
        // Save to Supabase
        const { error } = await supabase
          .from('products')
          .insert([productData]);
        
        if (error) throw error;
      }
      
      toast({
        title: "Product added",
        description: `Successfully added ${data.name}`,
      });
      
      form.reset();
      setImagePreview(null);
      setImageFile(null);
      
      if (onSuccess) onSuccess();
      
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error adding product",
        description: "There was a problem adding the product.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Royal Bridal Lehenga" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <Input placeholder="BL-001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (₹)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="25000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Quantity</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Bridal">Bridal</SelectItem>
                    <SelectItem value="Party Wear">Party Wear</SelectItem>
                    <SelectItem value="Traditional">Traditional</SelectItem>
                    <SelectItem value="Casual">Casual</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Image</FormLabel>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Input 
                      {...field}
                      placeholder="Image URL or upload" 
                      className="flex-1"
                    />
                    <div className="relative">
                      <Input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        onChange={handleImageChange}
                      />
                      <Button type="button" variant="outline" size="icon" className="h-10 w-10">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {imagePreview && (
                    <div className="relative border rounded-md overflow-hidden h-40">
                      <ImageIcon className="h-8 w-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
                      <img 
                        src={imagePreview} 
                        alt="Product preview" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Product description..." className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => onSuccess && onSuccess()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
            ) : (
              'Add Product'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
