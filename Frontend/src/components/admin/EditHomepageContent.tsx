
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Image, X, Upload, Plus, Tag, TrendingUp } from "lucide-react";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://jellthappcboftfvwyyy.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Mock data
const mockHeroData = {
  title: "Exquisite Craftsmanship",
  subtitle: "Celebrating the Art of Indian Fashion",
  ctaText: "Explore Collections",
  imageSrc: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=1887&auto=format&fit=crop"
};

const mockFeaturedCollections = [
  {
    id: 1,
    title: "Bridal Collection",
    description: "Perfect for your special day",
    imageSrc: "https://images.unsplash.com/photo-1617711164094-dae2c79b20dd?q=80&w=1887&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Party Wear",
    description: "Stand out at every occasion",
    imageSrc: "https://images.unsplash.com/photo-1606503479586-1aed5cd13437?q=80&w=1887&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Casual Elegant",
    description: "Everyday luxury",
    imageSrc: "https://images.unsplash.com/photo-1591130222377-2591803d0cb7?q=80&w=1887&auto=format&fit=crop"
  }
];

const mockLatestProducts = [
  {
    id: 1,
    name: "Indigo Night Dream",
    price: 45000,
    image: "https://images.unsplash.com/photo-1624032545726-9b578afdf54b?q=80&w=1964&auto=format&fit=crop",
    category: "New Arrival",
  },
  {
    id: 2,
    name: "Rose Petal Ensemble",
    price: 39000,
    image: "https://images.unsplash.com/photo-1614945649843-f9e65061a37d?q=80&w=1964&auto=format&fit=crop",
    category: "New Arrival",
  },
  {
    id: 3,
    name: "Sunset Gold Lehenga",
    price: 41000,
    discountedPrice: 38000,
    image: "https://images.unsplash.com/photo-1610189000082-7d222e899cd1?q=80&w=1964&auto=format&fit=crop",
    category: "New Arrival",
  },
  {
    id: 4,
    name: "Rustic Amber Set",
    price: 43000,
    image: "https://images.unsplash.com/photo-1622314201185-19e0b67e1df9?q=80&w=1964&auto=format&fit=crop",
    category: "New Arrival",
  },
];

const mockBudgetProducts = [
  {
    id: 5,
    name: "Teal Simplicity",
    price: 28000,
    discountedPrice: 21999,
    image: "https://images.unsplash.com/photo-1609231312551-0bb02afc62b6?q=80&w=1964&auto=format&fit=crop",
    category: "Budget",
  },
  {
    id: 6,
    name: "Lavender Charm",
    price: 32000,
    discountedPrice: 24500,
    image: "https://images.unsplash.com/photo-1614967223483-7297c07a118c?q=80&w=1964&auto=format&fit=crop",
    category: "Budget",
  },
  {
    id: 7,
    name: "Mint Celebration",
    price: 30000,
    discountedPrice: 23999,
    image: "https://images.unsplash.com/photo-1617922380881-c83d774d33e6?q=80&w=1964&auto=format&fit=crop",
    category: "Budget",
  },
  {
    id: 8,
    name: "Blush Pink Elegance",
    price: 29000,
    discountedPrice: 22500,
    image: "https://images.unsplash.com/photo-1618783786071-6e79151837db?q=80&w=1964&auto=format&fit=crop",
    category: "Budget",
  },
];

export default function EditHomepageContent() {
  const [activeTab, setActiveTab] = useState("hero");
  const [heroData, setHeroData] = useState(mockHeroData);
  const [collections, setCollections] = useState(mockFeaturedCollections);
  const [latestProducts, setLatestProducts] = useState(mockLatestProducts);
  const [budgetProducts, setBudgetProducts] = useState(mockBudgetProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        
        if (supabaseUrl === "https://jellthappcboftfvwyyy.supabase.co") {
          // In demo mode, use mock data
          await new Promise(resolve => setTimeout(resolve, 800));
          setHeroData(mockHeroData);
          setCollections(mockFeaturedCollections);
          setLatestProducts(mockLatestProducts);
          setBudgetProducts(mockBudgetProducts);
          setIsLoading(false);
          return;
        }
        
        // In real implementation, fetch from Supabase
        const { data: heroData, error: heroError } = await supabase
          .from('homepage_content')
          .select('*')
          .eq('section', 'hero')
          .single();
          
        if (heroError && heroError.code !== 'PGRST116') {
          throw heroError;
        }
        
        if (heroData) {
          setHeroData(heroData.content);
        }
        
        const { data: collectionsData, error: collectionsError } = await supabase
          .from('homepage_content')
          .select('*')
          .eq('section', 'collections');
          
        if (collectionsError) {
          throw collectionsError;
        }
        
        if (collectionsData && collectionsData.length > 0) {
          setCollections(collectionsData[0].content);
        }
        
        // Fetch latest products
        const { data: latestData, error: latestError } = await supabase
          .from('homepage_content')
          .select('*')
          .eq('section', 'latest_products');
          
        if (latestError) {
          throw latestError;
        }
        
        if (latestData && latestData.length > 0) {
          setLatestProducts(latestData[0].content);
        }
        
        // Fetch budget products
        const { data: budgetData, error: budgetError } = await supabase
          .from('homepage_content')
          .select('*')
          .eq('section', 'budget_products');
          
        if (budgetError) {
          throw budgetError;
        }
        
        if (budgetData && budgetData.length > 0) {
          setBudgetProducts(budgetData[0].content);
        }
        
      } catch (error) {
        console.error('Error fetching homepage content:', error);
        toast({
          title: "Using demo data",
          description: "Connected to demo mode for homepage content.",
          variant: "default",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [toast]);

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHeroData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCollectionChange = (id: number, field: string, value: string) => {
    setCollections(prev => 
      prev.map(collection => 
        collection.id === id ? { ...collection, [field]: value } : collection
      )
    );
  };

  const handleProductChange = (id: number, field: string, value: string | number, isLatest: boolean) => {
    const updateFunction = isLatest ? setLatestProducts : setBudgetProducts;
    const products = isLatest ? latestProducts : budgetProducts;
    
    updateFunction(
      products.map(product => 
        product.id === id ? { 
          ...product, 
          [field]: field === 'price' || field === 'discountedPrice' ? Number(value) : value 
        } : product
      )
    );
  };

  const handleAddCollection = () => {
    const newId = Math.max(0, ...collections.map(c => c.id)) + 1;
    setCollections([...collections, {
      id: newId,
      title: "New Collection",
      description: "Add a description",
      imageSrc: "https://placehold.co/600x400/png"
    }]);
  };

  const handleAddProduct = (isLatest: boolean) => {
    const products = isLatest ? latestProducts : budgetProducts;
    const updateFunction = isLatest ? setLatestProducts : setBudgetProducts;
    
    const newId = Math.max(0, ...products.map(p => p.id)) + 1;
    updateFunction([...products, {
      id: newId,
      name: "New Product",
      price: isLatest ? 40000 : 25000,
      discountedPrice: !isLatest ? 20000 : undefined,
      image: "https://placehold.co/600x800/png",
      category: isLatest ? "New Arrival" : "Budget"
    }]);
  };

  const handleRemoveCollection = (id: number) => {
    setCollections(collections.filter(collection => collection.id !== id));
  };

  const handleRemoveProduct = (id: number, isLatest: boolean) => {
    const updateFunction = isLatest ? setLatestProducts : setBudgetProducts;
    const products = isLatest ? latestProducts : budgetProducts;
    
    updateFunction(products.filter(product => product.id !== id));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      if (supabaseUrl === "https://jellthappcboftfvwyyy.supabase.co") {
        // Demo mode
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast({
          title: "Content updated",
          description: "Homepage content has been updated successfully (Demo Mode).",
        });
        
        setIsSaving(false);
        return;
      }
      
      // In real implementation, save to Supabase
      const { error: heroError } = await supabase
        .from('homepage_content')
        .upsert({
          section: 'hero',
          content: heroData,
          updated_at: new Date().toISOString()
        }, { onConflict: 'section' });
        
      if (heroError) throw heroError;
      
      const { error: collectionsError } = await supabase
        .from('homepage_content')
        .upsert({
          section: 'collections',
          content: collections,
          updated_at: new Date().toISOString()
        }, { onConflict: 'section' });
        
      if (collectionsError) throw collectionsError;
      
      const { error: latestError } = await supabase
        .from('homepage_content')
        .upsert({
          section: 'latest_products',
          content: latestProducts,
          updated_at: new Date().toISOString()
        }, { onConflict: 'section' });
        
      if (latestError) throw latestError;
      
      const { error: budgetError } = await supabase
        .from('homepage_content')
        .upsert({
          section: 'budget_products',
          content: budgetProducts,
          updated_at: new Date().toISOString()
        }, { onConflict: 'section' });
        
      if (budgetError) throw budgetError;
      
      toast({
        title: "Content updated",
        description: "Homepage content has been updated successfully.",
      });
      
    } catch (error) {
      console.error('Error saving homepage content:', error);
      toast({
        title: "Update failed",
        description: "There was a problem updating the homepage content.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Edit Homepage Content</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="collections">Featured Collections</TabsTrigger>
          <TabsTrigger value="latest">Latest Collection</TabsTrigger>
          <TabsTrigger value="budget">Budget Picks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hero" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Hero Banner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={heroData.title} 
                  onChange={handleHeroChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input 
                  id="subtitle" 
                  name="subtitle" 
                  value={heroData.subtitle} 
                  onChange={handleHeroChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ctaText">Call-to-Action Text</Label>
                <Input 
                  id="ctaText" 
                  name="ctaText" 
                  value={heroData.ctaText} 
                  onChange={handleHeroChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="heroImage">Banner Image</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="heroImage" 
                    name="imageSrc" 
                    value={heroData.imageSrc} 
                    onChange={handleHeroChange}
                    placeholder="Image URL"
                  />
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                
                {heroData.imageSrc && (
                  <div className="relative mt-2 rounded-md overflow-hidden border h-40">
                    <Image className="h-8 w-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
                    <img 
                      src={heroData.imageSrc} 
                      alt="Hero Banner" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/600x400/png";
                      }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="collections" className="space-y-4 pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Featured Collections</h3>
            <Button variant="outline" size="sm" onClick={handleAddCollection}>
              <Plus className="h-4 w-4 mr-2" /> Add Collection
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collections.map((collection) => (
              <Card key={collection.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{collection.title}</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleRemoveCollection(collection.id)}
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`collection-${collection.id}-title`}>Title</Label>
                    <Input 
                      id={`collection-${collection.id}-title`}
                      value={collection.title}
                      onChange={(e) => handleCollectionChange(collection.id, 'title', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`collection-${collection.id}-description`}>Description</Label>
                    <Textarea 
                      id={`collection-${collection.id}-description`}
                      value={collection.description}
                      onChange={(e) => handleCollectionChange(collection.id, 'description', e.target.value)}
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`collection-${collection.id}-image`}>Image</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id={`collection-${collection.id}-image`}
                        value={collection.imageSrc}
                        onChange={(e) => handleCollectionChange(collection.id, 'imageSrc', e.target.value)}
                        placeholder="Image URL"
                      />
                      <Button variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {collection.imageSrc && (
                      <div className="relative mt-2 rounded-md overflow-hidden border h-32">
                        <Image className="h-8 w-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
                        <img 
                          src={collection.imageSrc} 
                          alt={collection.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/600x400/png";
                          }}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="latest" className="space-y-4 pt-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Latest Collection Products</h3>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleAddProduct(true)}>
              <Plus className="h-4 w-4 mr-2" /> Add Product
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {latestProducts.map((product) => (
              <Card key={product.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleRemoveProduct(product.id, true)}
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`product-latest-${product.id}-name`}>Product Name</Label>
                      <Input 
                        id={`product-latest-${product.id}-name`}
                        value={product.name}
                        onChange={(e) => handleProductChange(product.id, 'name', e.target.value, true)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`product-latest-${product.id}-price`}>Price (₹)</Label>
                      <Input 
                        id={`product-latest-${product.id}-price`}
                        type="number"
                        value={product.price}
                        onChange={(e) => handleProductChange(product.id, 'price', e.target.value, true)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`product-latest-${product.id}-image`}>Product Image</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id={`product-latest-${product.id}-image`}
                        value={product.image}
                        onChange={(e) => handleProductChange(product.id, 'image', e.target.value, true)}
                        placeholder="Image URL"
                      />
                      <Button variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {product.image && (
                      <div className="relative mt-2 rounded-md overflow-hidden border h-40">
                        <Image className="h-8 w-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/600x400/png";
                          }}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="budget" className="space-y-4 pt-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Budget Picks Products</h3>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleAddProduct(false)}>
              <Plus className="h-4 w-4 mr-2" /> Add Product
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {budgetProducts.map((product) => (
              <Card key={product.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleRemoveProduct(product.id, false)}
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`product-budget-${product.id}-name`}>Product Name</Label>
                      <Input 
                        id={`product-budget-${product.id}-name`}
                        value={product.name}
                        onChange={(e) => handleProductChange(product.id, 'name', e.target.value, false)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`product-budget-${product.id}-price`}>Original Price (₹)</Label>
                      <Input 
                        id={`product-budget-${product.id}-price`}
                        type="number"
                        value={product.price}
                        onChange={(e) => handleProductChange(product.id, 'price', e.target.value, false)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`product-budget-${product.id}-discounted`}>Discounted Price (₹)</Label>
                      <Input 
                        id={`product-budget-${product.id}-discounted`}
                        type="number"
                        value={product.discountedPrice || ''}
                        onChange={(e) => handleProductChange(product.id, 'discountedPrice', e.target.value, false)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`product-budget-${product.id}-category`}>Category</Label>
                      <Input 
                        id={`product-budget-${product.id}-category`}
                        value={product.category}
                        onChange={(e) => handleProductChange(product.id, 'category', e.target.value, false)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`product-budget-${product.id}-image`}>Product Image</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id={`product-budget-${product.id}-image`}
                        value={product.image}
                        onChange={(e) => handleProductChange(product.id, 'image', e.target.value, false)}
                        placeholder="Image URL"
                      />
                      <Button variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {product.image && (
                      <div className="relative mt-2 rounded-md overflow-hidden border h-40">
                        <Image className="h-8 w-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/600x400/png";
                          }}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
