
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Home, Building2, MapPin, Plus, Edit, Trash2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

// Define address type
type AddressType = "home" | "work" | "other";

// Interface for address
interface Address {
  id?: string;
  type?: AddressType;
  name?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  isDefault?: boolean;
}

// Schema for form validation
const addressSchema = z.object({
  type: z.enum(["home", "work", "other"]),
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  addressLine1: z.string().min(5, { message: "Address must be at least 5 characters" }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  state: z.string().min(2, { message: "State must be at least 2 characters" }),
  pincode: z.string().min(4, { message: "Pincode must be at least 4 characters" }),
  country: z.string().min(2, { message: "Country must be at least 2 characters" }),
  isDefault: z.boolean().default(false),
});

// Sample addresses
const sampleAddresses: Address[] = [
  {
    id: "addr-1",
    type: "home",
    name: "Rahul Sharma",
    phone: "9876543210",
    addressLine1: "42, Green Valley",
    addressLine2: "Banjara Hills",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500034",
    country: "India",
    isDefault: true,
  },
  {
    id: "addr-2",
    type: "work",
    name: "Rahul Sharma",
    phone: "9876543210",
    addressLine1: "Tech Park, Building 5",
    addressLine2: "Whitefield",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560066",
    country: "India",
    isDefault: false,
  }
];

export default function AddressManagement() {
  const [addresses, setAddresses] = useState<Address[]>(sampleAddresses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      type: "home",
      name: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
      isDefault: false,
    },
  });

  // Open dialog for adding a new address
  const openAddDialog = () => {
    form.reset({
      type: "home",
      name: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
      isDefault: false,
    });
    setCurrentAddress(null);
    setIsDialogOpen(true);
  };

  // Open dialog for editing an address
  const openEditDialog = (address: Address) => {
    setCurrentAddress(address);
    form.reset({
      type: address.type as AddressType,
      name: address.name || "",
      phone: address.phone || "",
      addressLine1: address.addressLine1 || "",
      addressLine2: address.addressLine2 || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.pincode || "",
      country: address.country || "",
      isDefault: address.isDefault || false,
    });
    setIsDialogOpen(true);
  };

  // Handle form submission
  const onSubmit = (data: z.infer<typeof addressSchema>) => {
    if (currentAddress) {
      // Update existing address
      const updatedAddresses = addresses.map(addr => 
        addr.id === currentAddress.id ? { ...addr, ...data } : data.isDefault ? { ...addr, isDefault: false } : addr
      );
      setAddresses(updatedAddresses as Address[]);
      toast({
        title: "Address updated",
        description: "Your address has been updated successfully.",
      });
    } else {
      // Add new address
      const newAddress: Address = {
        id: `addr-${Math.random().toString(36).substr(2, 9)}`,
        ...data,
      };
      
      // If this is set as default, unset others
      if (data.isDefault) {
        const updatedAddresses = addresses.map(addr => ({ ...addr, isDefault: false }));
        setAddresses([...updatedAddresses, newAddress]);
      } else {
        setAddresses([...addresses, newAddress]);
      }
      
      toast({
        title: "Address added",
        description: "Your new address has been added successfully.",
      });
    }
    setIsDialogOpen(false);
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (addressId: string) => {
    setAddressToDelete(addressId);
    setIsDeleteDialogOpen(true);
  };

  // Handle address deletion
  const handleDeleteAddress = () => {
    if (addressToDelete) {
      const updatedAddresses = addresses.filter(addr => addr.id !== addressToDelete);
      setAddresses(updatedAddresses);
      setIsDeleteDialogOpen(false);
      toast({
        title: "Address deleted",
        description: "Your address has been deleted successfully.",
      });
    }
  };

  // Set address as default
  const setAsDefault = (addressId: string) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    }));
    setAddresses(updatedAddresses);
    toast({
      title: "Default updated",
      description: "Your default address has been updated.",
    });
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">My Addresses</h1>
          
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">Manage your shipping addresses</p>
            <Button onClick={openAddDialog} className="hidden sm:flex">
              <Plus className="mr-2 h-4 w-4" /> Add New Address
            </Button>
            <Button onClick={openAddDialog} className="sm:hidden" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {addresses.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No addresses found</h3>
              <p className="text-gray-500 mb-6">You haven't added any addresses yet.</p>
              <Button onClick={openAddDialog}>
                <Plus className="mr-2 h-4 w-4" /> Add New Address
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {addresses.map((address) => (
                <Card key={address.id} className={`overflow-hidden ${address.isDefault ? 'border-primary border-2' : ''}`}>
                  <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between">
                    <div className="flex items-center gap-2">
                      {address.type === "home" ? (
                        <Home className="h-4 w-4 text-primary" />
                      ) : address.type === "work" ? (
                        <Building2 className="h-4 w-4 text-primary" />
                      ) : (
                        <MapPin className="h-4 w-4 text-primary" />
                      )}
                      <CardTitle className="text-base">
                        {address.type?.charAt(0).toUpperCase() + address.type?.slice(1)} Address
                      </CardTitle>
                      {address.isDefault && (
                        <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">Default</span>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => openEditDialog(address)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive"
                          onClick={() => openDeleteDialog(address.id!)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="text-sm space-y-1 mb-4">
                      <p className="font-medium">{address.name}</p>
                      <p>{address.addressLine1}</p>
                      {address.addressLine2 && <p>{address.addressLine2}</p>}
                      <p>{address.city}, {address.state} {address.pincode}</p>
                      <p>{address.country}</p>
                      <p className="font-medium mt-2">Phone: {address.phone}</p>
                    </div>
                    {!address.isDefault && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setAsDefault(address.id!)}
                        className="w-full sm:w-auto"
                      >
                        Set as Default
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      {/* Add/Edit Address Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Address Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="home" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center gap-1">
                            <Home className="h-4 w-4" /> Home
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="work" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center gap-1">
                            <Building2 className="h-4 w-4" /> Work
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="other" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center gap-1">
                            <MapPin className="h-4 w-4" /> Other
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Full Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Phone Number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="addressLine1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 1</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="House No., Building Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="addressLine2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 2 (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Street, Area" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="City" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="State" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pincode</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Pincode" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="India">India</SelectItem>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Make this my default address
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {currentAddress ? "Update Address" : "Add Address"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this address. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAddress} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Footer />
    </>
  );
}
