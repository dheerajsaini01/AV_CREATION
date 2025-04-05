
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Edit, Trash2, CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RequireAuth from "@/components/auth/RequireAuth";

// Form schema
const paymentFormSchema = z.object({
  id: z.string().optional(),
  cardNumber: z.string().regex(/^\d{16}$/, {
    message: "Card number must be 16 digits.",
  }),
  cardholderName: z.string().min(2, {
    message: "Cardholder name is required.",
  }),
  expiryMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, {
    message: "Month must be between 01-12.",
  }),
  expiryYear: z.string().regex(/^\d{2}$/, {
    message: "Year must be 2 digits.",
  }),
  cvv: z.string().regex(/^\d{3,4}$/, {
    message: "CVV must be 3 or 4 digits.",
  }),
  isDefault: z.boolean().default(false),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

// Sample payment methods
const samplePaymentMethods = [
  {
    id: "card-1",
    cardNumber: "4111111111111111",
    cardholderName: "John Doe",
    expiryMonth: "12",
    expiryYear: "25",
    cvv: "123",
    isDefault: true,
  },
  {
    id: "card-2",
    cardNumber: "5555555555554444",
    cardholderName: "John Doe",
    expiryMonth: "06",
    expiryYear: "24",
    cvv: "456",
    isDefault: false,
  },
];

export default function PaymentMethods() {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<PaymentFormValues[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<PaymentFormValues | null>(null);

  // Form definition
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardNumber: "",
      cardholderName: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      isDefault: false,
    },
  });

  // Load payment methods on component mount
  useEffect(() => {
    // In a real app, this would be fetched from an API
    // For now, use sample data
    const storedPaymentMethods = localStorage.getItem("userPaymentMethods");
    
    if (storedPaymentMethods) {
      setPaymentMethods(JSON.parse(storedPaymentMethods));
    } else {
      setPaymentMethods(samplePaymentMethods);
      localStorage.setItem("userPaymentMethods", JSON.stringify(samplePaymentMethods));
    }
  }, []);

  // Format card number for display
  const formatCardNumber = (cardNumber: string) => {
    return `•••• •••• •••• ${cardNumber.slice(-4)}`;
  };

  // Get card network icon/name
  const getCardNetwork = (cardNumber: string) => {
    const firstDigit = cardNumber.charAt(0);
    
    if (firstDigit === "4") return "Visa";
    if (firstDigit === "5") return "Mastercard";
    if (firstDigit === "3") return "American Express";
    if (firstDigit === "6") return "Discover";
    
    return "Card";
  };

  // Handle payment form submission
  function onSubmit(data: PaymentFormValues) {
    let updatedPaymentMethods: PaymentFormValues[];
    
    if (editingPayment) {
      // Update existing payment method
      updatedPaymentMethods = paymentMethods.map(payment => 
        payment.id === editingPayment.id ? { ...data, id: editingPayment.id } : payment
      );
      
      toast({
        title: "Payment method updated",
        description: "Your payment method has been updated successfully.",
      });
    } else {
      // Add new payment method
      const newPayment = {
        ...data,
        id: `card-${Date.now()}`,
      };
      
      updatedPaymentMethods = [...paymentMethods, newPayment];
      
      toast({
        title: "Payment method added",
        description: "Your new payment method has been added successfully.",
      });
    }
    
    // Handle default payment method logic
    if (data.isDefault) {
      updatedPaymentMethods = updatedPaymentMethods.map(payment => ({
        ...payment,
        isDefault: payment.id === (editingPayment?.id || `card-${Date.now()}`),
      }));
    }
    
    // Update local storage
    localStorage.setItem("userPaymentMethods", JSON.stringify(updatedPaymentMethods));
    setPaymentMethods(updatedPaymentMethods);
    setIsDialogOpen(false);
    setEditingPayment(null);
    
    // Reset form
    form.reset();
  }

  const handleEditPayment = (payment: PaymentFormValues) => {
    setEditingPayment(payment);
    form.reset(payment);
    setIsDialogOpen(true);
  };

  const handleDeletePayment = (paymentId: string) => {
    const updatedPaymentMethods = paymentMethods.filter(payment => payment.id !== paymentId);
    
    // If we're deleting the default payment method, make the first remaining one the default
    if (paymentMethods.find(payment => payment.id === paymentId)?.isDefault && updatedPaymentMethods.length > 0) {
      updatedPaymentMethods[0].isDefault = true;
    }
    
    // Update local storage
    localStorage.setItem("userPaymentMethods", JSON.stringify(updatedPaymentMethods));
    setPaymentMethods(updatedPaymentMethods);
    
    toast({
      title: "Payment method deleted",
      description: "The payment method has been removed from your account.",
    });
  };

  const handleSetDefault = (paymentId: string) => {
    const updatedPaymentMethods = paymentMethods.map(payment => ({
      ...payment,
      isDefault: payment.id === paymentId,
    }));
    
    // Update local storage
    localStorage.setItem("userPaymentMethods", JSON.stringify(updatedPaymentMethods));
    setPaymentMethods(updatedPaymentMethods);
    
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated.",
    });
  };

  const handleAddNewClick = () => {
    setEditingPayment(null);
    form.reset({
      cardNumber: "",
      cardholderName: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      isDefault: paymentMethods.length === 0, // Make default if it's the first card
    });
    setIsDialogOpen(true);
  };

  return (
    <RequireAuth>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-semibold mb-2">Payment Methods</h1>
                <p className="text-muted-foreground">
                  Manage your saved payment methods for faster checkout
                </p>
              </div>
              <Button onClick={handleAddNewClick} className="mt-4 sm:mt-0">
                <Plus className="h-4 w-4 mr-2" />
                Add New Card
              </Button>
            </div>

            <Separator className="mb-8" />

            <div className="bg-muted/20 rounded-lg p-4 mb-8 flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">Your payment information is secure</p>
                <p className="text-muted-foreground">
                  We use industry-standard encryption to protect your data. Your card details are never stored on our servers.
                </p>
              </div>
            </div>

            {paymentMethods.length === 0 ? (
              <div className="text-center py-12 border rounded-lg">
                <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No payment methods saved</h3>
                <p className="text-muted-foreground mb-4">
                  Add a payment method to make checkout faster
                </p>
                <Button onClick={handleAddNewClick}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Card
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paymentMethods.map((payment) => (
                  <Card key={payment.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <h3 className="font-medium">{getCardNetwork(payment.cardNumber)}</h3>
                            {payment.isDefault && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditPayment(payment)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete payment method?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This payment method will be permanently removed
                                  from your account.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDeletePayment(payment.id!)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                      
                      <div className="space-y-1 text-sm">
                        <p className="font-mono text-lg font-medium mb-1">
                          {formatCardNumber(payment.cardNumber)}
                        </p>
                        <p>{payment.cardholderName}</p>
                        <p className="text-muted-foreground">
                          Expires: {payment.expiryMonth}/{payment.expiryYear}
                        </p>
                      </div>
                      
                      {!payment.isDefault && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-4"
                          onClick={() => handleSetDefault(payment.id!)}
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
        </div>
      </main>

      {/* Payment Method Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingPayment ? "Edit Payment Method" : "Add New Payment Method"}
            </DialogTitle>
            <DialogDescription>
              Enter your card details below. Your information is securely encrypted.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="1234 5678 9012 3456" 
                        {...field} 
                        maxLength={16}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cardholderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cardholder Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Name as it appears on card" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="expiryMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Month</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="MM" 
                          {...field} 
                          maxLength={2}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="expiryYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="YY" 
                          {...field} 
                          maxLength={2}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="123" 
                          {...field} 
                          maxLength={4}
                          type="password"
                        />
                      </FormControl>
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
                      <RadioGroup
                        onValueChange={(value) => field.onChange(value === "true")}
                        defaultValue={field.value ? "true" : "false"}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="default-yes" />
                          <FormLabel htmlFor="default-yes" className="font-normal cursor-pointer">
                            Set as default payment method
                          </FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="default-no" />
                          <FormLabel htmlFor="default-no" className="font-normal cursor-pointer">
                            Don't set as default
                          </FormLabel>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">
                  {editingPayment ? "Update Card" : "Add Card"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Footer />
    </RequireAuth>
  );
}
