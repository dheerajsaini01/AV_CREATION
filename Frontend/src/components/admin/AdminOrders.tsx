
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

// Sample orders data
const orders = [
  {
    id: "#ORD-5321",
    customer: "Priya Sharma",
    date: "2023-09-15",
    total: 1299,
    status: "Delivered",
    payment: "Paid",
    items: 2,
    customer_id: "user-2",
    products: [
      { id: 1, name: "Embroidered Silk Saree", quantity: 1, price: 4999 },
      { id: 3, name: "Cotton Kurta Set", quantity: 1, price: 1999 }
    ],
    shipping_address: {
      name: "Priya Sharma",
      address: "42 Park Avenue, Jubilee Hills",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500033",
      country: "India"
    }
  },
  {
    id: "#ORD-6432",
    customer: "Rahul Verma",
    date: "2023-09-18",
    total: 899,
    status: "Processing",
    payment: "Paid",
    items: 1,
    customer_id: "user-3",
    products: [
      { id: 2, name: "Designer Lehenga", quantity: 1, price: 8999 }
    ],
    shipping_address: {
      name: "Rahul Verma",
      address: "78 Civil Lines",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110054",
      country: "India"
    }
  },
  {
    id: "#ORD-7123",
    customer: "Meera Patel",
    date: "2023-09-20",
    total: 1599,
    status: "Shipped",
    payment: "Paid",
    items: 3,
    customer_id: "user-1",
    products: [
      { id: 1, name: "Embroidered Silk Saree", quantity: 2, price: 4999 },
      { id: 3, name: "Cotton Kurta Set", quantity: 1, price: 1999 }
    ],
    shipping_address: {
      name: "Meera Patel",
      address: "23 Marine Drive",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400020",
      country: "India"
    }
  },
  {
    id: "#ORD-8901",
    customer: "Arjun Singh",
    date: "2023-09-22",
    total: 699,
    status: "Pending",
    payment: "Pending",
    items: 1,
    customer_id: "user-4",
    products: [
      { id: 3, name: "Cotton Kurta Set", quantity: 1, price: 1999 }
    ],
    shipping_address: {
      name: "Arjun Singh",
      address: "15 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      country: "India"
    }
  },
  {
    id: "#ORD-9234",
    customer: "Neha Gupta",
    date: "2023-09-25",
    total: 2199,
    status: "Processing",
    payment: "Paid",
    items: 4,
    customer_id: "user-2",
    products: [
      { id: 1, name: "Embroidered Silk Saree", quantity: 1, price: 4999 },
      { id: 2, name: "Designer Lehenga", quantity: 1, price: 8999 },
      { id: 3, name: "Cotton Kurta Set", quantity: 2, price: 1999 }
    ],
    shipping_address: {
      name: "Neha Gupta",
      address: "56 Camac Street",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700016",
      country: "India"
    }
  },
];

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "Shipped":
        return "default";
      case "Processing":
        return "secondary";
      case "Pending":
        return "warning";
      default:
        return "default";
    }
  };

  const getPaymentColor = (payment: string) => {
    return payment === "Paid" ? "success" : "warning";
  };

  const filteredOrders = orders.filter(
    order => 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };

  const handleUpdateStatus = (newStatus: string) => {
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedOrders = orders.map(order => 
        order.id === selectedOrder.id ? { ...order, status: newStatus } : order
      );
      
      // Update the selected order with the new status
      setSelectedOrder({ ...selectedOrder, status: newStatus });
      
      toast({
        title: "Order status updated",
        description: `Order ${selectedOrder.id} is now ${newStatus}.`,
      });
      
      setIsUpdating(false);
    }, 800);
  };

  const handleTrackOrder = (orderId: string) => {
    // Extract the order ID number without the "#ORD-" prefix
    const orderNumber = orderId.replace("#ORD-", "");
    navigate(`/track-order/${orderNumber}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table for larger screens */}
      <div className="rounded-md border hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center h-32 text-muted-foreground">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{formatDate(order.date)}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>₹{order.total}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(order.status) as any}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPaymentColor(order.payment) as any}>
                      {order.payment}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleViewOrder(order)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Cards for mobile screens */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No orders found
          </div>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-base">{order.id}</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleViewOrder(order)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Customer:</div>
                  <div>{order.customer}</div>
                  
                  <div className="font-medium">Date:</div>
                  <div>{formatDate(order.date)}</div>
                  
                  <div className="font-medium">Items:</div>
                  <div>{order.items}</div>
                  
                  <div className="font-medium">Total:</div>
                  <div>₹{order.total}</div>
                  
                  <div className="font-medium">Status:</div>
                  <div>
                    <Badge variant={getStatusColor(order.status) as any} className="font-normal">
                      {order.status}
                    </Badge>
                  </div>
                  
                  <div className="font-medium">Payment:</div>
                  <div>
                    <Badge variant={getPaymentColor(order.payment) as any} className="font-normal">
                      {order.payment}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Order details dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-full sm:max-w-[600px] h-[90vh] sm:h-auto overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details: {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-6 p-1">
                <div className="flex justify-between items-center gap-4 flex-wrap">
                  <div>
                    <Badge variant={getStatusColor(selectedOrder.status) as any} className="mb-2">
                      {selectedOrder.status}
                    </Badge>
                    <h3 className="text-lg font-medium">{selectedOrder.id}</h3>
                    <p className="text-sm text-muted-foreground">
                      Placed on {formatDate(selectedOrder.date)}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleTrackOrder(selectedOrder.id)}
                    >
                      Track Order
                    </Button>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2">Customer Information</h4>
                    <div className="text-sm space-y-1">
                      <p>{selectedOrder.customer}</p>
                      <p>Customer ID: {selectedOrder.customer_id}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Shipping Address</h4>
                    <div className="text-sm space-y-1">
                      <p>{selectedOrder.shipping_address.name}</p>
                      <p>{selectedOrder.shipping_address.address}</p>
                      <p>
                        {selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.state} {selectedOrder.shipping_address.pincode}
                      </p>
                      <p>{selectedOrder.shipping_address.country}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Order Items</h4>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead className="text-right">Qty</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOrder.products.map((product: any) => (
                          <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell className="text-right">{product.quantity}</TableCell>
                            <TableCell className="text-right">₹{product.price}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={2} className="text-right font-medium">Total</TableCell>
                          <TableCell className="text-right font-medium">₹{selectedOrder.total}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Update Order Status</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant={selectedOrder.status === "Pending" ? "default" : "outline"} 
                      size="sm"
                      disabled={isUpdating || selectedOrder.status === "Pending"}
                      onClick={() => handleUpdateStatus("Pending")}
                    >
                      {isUpdating && selectedOrder.status !== "Pending" ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : null}
                      Pending
                    </Button>
                    <Button 
                      variant={selectedOrder.status === "Processing" ? "default" : "outline"} 
                      size="sm"
                      disabled={isUpdating || selectedOrder.status === "Processing"}
                      onClick={() => handleUpdateStatus("Processing")}
                    >
                      {isUpdating && selectedOrder.status !== "Processing" ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : null}
                      Processing
                    </Button>
                    <Button 
                      variant={selectedOrder.status === "Shipped" ? "default" : "outline"} 
                      size="sm"
                      disabled={isUpdating || selectedOrder.status === "Shipped"}
                      onClick={() => handleUpdateStatus("Shipped")}
                    >
                      {isUpdating && selectedOrder.status !== "Shipped" ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : null}
                      Shipped
                    </Button>
                    <Button 
                      variant={selectedOrder.status === "Delivered" ? "default" : "outline"} 
                      size="sm"
                      disabled={isUpdating || selectedOrder.status === "Delivered"}
                      onClick={() => handleUpdateStatus("Delivered")}
                    >
                      {isUpdating && selectedOrder.status !== "Delivered" ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : null}
                      Delivered
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
