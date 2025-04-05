
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, X, Upload, Image as ImageIcon } from "lucide-react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://jellthappcboftfvwyyy.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Product type
interface ProductFormData {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
  tags: string[];
  image?: string;
}

interface EditProductFormProps {
  productId: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EditProductForm({ productId, onSuccess, onCancel }: EditProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    id: productId,
    name: "",
    sku: "",
    price: 0,
    stock: 0,
    category: "",
    description: "",
    tags: []
  });
  const [tagInput, setTagInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        
        // Demo mode
        if (supabaseUrl === "https://jellthappcboftfvwyyy.supabase.co") {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Find product in mock data
          const mockProducts = [
            {
              id: 1,
              name: "Embroidered Silk Saree",
              sku: "SAR-001",
              price: 4999,
              stock: 12,
              category: "Bridal",
              description: "Beautiful handcrafted silk saree with intricate embroidery.",
              tags: ["silk", "embroidered", "bridal", "wedding"],
              image: "./assets/IMG_1.JPG"
            },
            {
              id: 2,
              name: "Designer Lehenga",
              sku: "LEH-002",
              price: 8999,
              stock: 5,
              category: "Party Wear",
              description: "Luxurious designer lehenga for special occasions.",
              tags: ["lehenga", "designer", "party", "festive"],
              image: "https://images.unsplash.com/photo-1614945649843-f9e65061a37d?q=80&w=1964&auto=format&fit=crop"
            }
          ];
          
          const product = mockProducts.find(p => p.id === productId);
          if (product) {
            setFormData(product);
            if (product.image) {
              setImagePreview(product.image);
            }
          }
          
          setIsLoading(false);
          return;
        }
        
        // Fetch from Supabase
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();
        
        if (error) throw error;
        
        if (data) {
          setFormData({
            id: data.id,
            name: data.name,
            sku: data.sku || '',
            price: data.price,
            stock: data.stock || 0,
            category: data.category || '',
            description: data.description || '',
            tags: data.tags || [],
            image: data.image || ''
          });
          
          if (data.image) {
            setImagePreview(data.image);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: "Error",
          description: "Failed to load product data.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = formData.image;
      
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
      
      // Demo mode
      if (supabaseUrl === "https://jellthappcboftfvwyyy.supabase.co") {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast({
          title: "Product updated",
          description: "The product has been updated successfully (Demo Mode).",
        });
        
        onSuccess();
        return;
      }
      
      // Update in Supabase
      const { error } = await supabase
        .from('products')
        .update({
          name: formData.name,
          sku: formData.sku,
          price: formData.price,
          stock: formData.stock,
          category: formData.category,
          description: formData.description,
          tags: formData.tags,
          image: imageUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', productId);
      
      if (error) throw error;
      
      toast({
        title: "Product updated",
        description: "The product has been updated successfully.",
      });
      
      onSuccess();
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Update failed",
        description: "There was a problem updating the product.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4 max-h-[80vh] overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price (₹)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select 
            value={formData.category} 
            onValueChange={handleSelectChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bridal">Bridal</SelectItem>
              <SelectItem value="Party Wear">Party Wear</SelectItem>
              <SelectItem value="Traditional">Traditional</SelectItem>
              <SelectItem value="Casual">Casual</SelectItem>
              <SelectItem value="Formal">Formal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Product Image</Label>
        <div className="flex items-center gap-2">
          <Input
            id="image"
            name="image"
            value={formData.image || ''}
            onChange={handleChange}
            placeholder="Image URL"
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
          <div className="relative mt-2 rounded-md overflow-hidden border h-40">
            <ImageIcon className="h-8 w-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
            <img 
              src={imagePreview} 
              alt="Product preview" 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/600x400/png";
              }}
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <div className="flex gap-2">
          <Input
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Add tags for better search results"
          />
          <Button type="button" onClick={handleAddTag} variant="secondary">
            Add Tag
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.tags.map(tag => (
            <div key={tag} className="flex items-center bg-muted px-3 py-1 rounded-full text-sm">
              {tag}
              <button 
                type="button" 
                onClick={() => handleRemoveTag(tag)} 
                className="ml-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </form>
  );
}
