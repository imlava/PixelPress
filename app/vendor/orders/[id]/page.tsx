"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Clock,
  FileText,
  Printer,
  CheckCircle,
  Package,
  Download,
  SendHorizonal,
  Phone,
  Mail,
  User,
  MapPin,
  HelpCircle,
  AlertTriangle,
  Calendar,
  Image,
  AlertCircle,
  XCircle,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  CircleAlert,
  Truck,
  Trash2
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [orderStatus, setOrderStatus] = useState("pending")
  const [isUpdating, setIsUpdating] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [showIssueDialog, setShowIssueDialog] = useState(false)
  
  // Mock order data
  const order = {
    id: params.id,
    customer: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    document: "Project_Report.pdf",
    status: orderStatus,
    placed: "Today, 10:15 AM",
    due: "Tomorrow, 2:00 PM",
    total: "₹216.00",
    pages: 5,
    type: "Spiral Binding, A4 Color",
    deliveryMethod: "Store Pickup",
    storeLocation: "PixelPress Store - Indiranagar, 123 12th Main Road, Indiranagar, Bangalore - 560008",
    paymentMethod: "Cash on Delivery",
    subtotal: "₹180.00",
    taxes: "₹36.00",
    discount: "₹0.00",
    pickupTime: "Tomorrow after 2:00 PM"
  }
  
  const timeline = [
    {
      time: "Today, 10:15 AM",
      title: "Order Received",
      description: "Order has been received and is awaiting processing",
      status: "completed"
    },
    {
      time: "Today, 11:30 AM",
      title: "Processing Print Job",
      description: "Order is being prepared for printing",
      status: orderStatus === "pending" ? "upcoming" : "in-progress"
    },
    {
      time: "Tomorrow, 12:00 PM",
      title: "Ready for Pickup",
      description: "Prints will be ready for customer pickup",
      status: "upcoming"
    },
    {
      time: "Tomorrow, 5:00 PM",
      title: "Complete",
      description: "Order will be marked as completed after pickup",
      status: "upcoming"
    }
  ]
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "upcoming":
        return "bg-secondary"
      default:
        return "bg-secondary"
    }
  }
  
  const handleStatusChange = (value: string) => {
    setOrderStatus(value)
    setIsUpdating(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false)
    }, 1000)
  }
  
  const handleCancelOrder = () => {
    setIsUpdating(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false)
      setShowCancelDialog(false)
      router.push("/vendor/dashboard")
    }, 1500)
  }
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-800">
            Pending
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800">
            Processing
          </Badge>
        )
      case "ready":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 dark:bg-green-950 dark:text-green-400 dark:border-green-800">
            Ready for Pickup
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" className="mb-4 gap-2" asChild>
          <Link href="/vendor/dashboard">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
        
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Order {order.id}</h1>
            <p className="text-muted-foreground">Placed on {order.placed}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Current Status:</span>
              {getStatusBadge(orderStatus)}
            </div>
            <Select value={orderStatus} onValueChange={handleStatusChange} disabled={isUpdating}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Update Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="ready">Ready for Pickup</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            
            <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancel Order
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cancel Order</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to cancel this order? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="rounded-lg border-2 border-destructive/20 bg-destructive/5 p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 h-5 w-5 text-destructive" />
                      <div>
                        <p className="font-medium text-destructive">Warning</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Cancelling this order will notify the customer and remove it from your active orders.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="text-sm font-medium">Reason for cancellation</label>
                    <Textarea 
                      placeholder="Please provide a reason for cancellation..." 
                      className="mt-1.5"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                    Keep Order
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleCancelOrder}
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Cancelling..." : "Confirm Cancellation"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Print Job Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="flex-1">
                  <h3 className="text-sm font-medium uppercase text-muted-foreground">Document</h3>
                  <div className="mt-2 flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{order.document}</p>
                      <p className="text-sm text-muted-foreground">{order.pages} pages • Size: 2.3 MB</p>
                      <Button variant="link" className="h-8 px-0 text-xs gap-1.5">
                        <Download className="h-3.5 w-3.5" />
                        Download Original File
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 space-y-2">
                  <h3 className="text-sm font-medium uppercase text-muted-foreground">Print Configuration</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Paper Size:</span>
                      <span>A4</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Paper Type:</span>
                      <span>Premium Paper</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Print Color:</span>
                      <span>Full Color</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Sides:</span>
                      <span>Double-sided</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Binding:</span>
                      <span>Spiral Binding</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Copies:</span>
                      <span>1</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="rounded-lg border-2 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Printer className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Print Status</h3>
                      <p className="text-sm text-muted-foreground">This job is waiting to be processed</p>
                    </div>
                  </div>
                  <Button className="gap-2">
                    <Printer className="h-4 w-4" />
                    Send to Printer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Order Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 relative">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      item.status === "completed" 
                        ? "bg-primary text-primary-foreground" 
                        : item.status === "in-progress"
                          ? "bg-blue-500 text-white"
                          : "bg-secondary text-muted-foreground"
                    }`}>
                      {item.status === "completed" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : item.status === "in-progress" ? (
                        <Printer className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className={`absolute left-4 top-8 h-[calc(100%-16px)] w-0.5 ${getStatusColor(item.status)}`}></div>
                    )}
                    <div className="pt-0.5">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 px-6 py-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Deadline: <span className="font-medium text-foreground">{order.due}</span></p>
                </div>
                <Dialog open={showIssueDialog} onOpenChange={setShowIssueDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      Report Issue
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Report Issue with Order</DialogTitle>
                      <DialogDescription>
                        Report any problems with this order that need attention.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium">Issue Type</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select issue type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="print-quality">Print Quality Issue</SelectItem>
                            <SelectItem value="file-problem">File Problem</SelectItem>
                            <SelectItem value="supply-shortage">Supply Shortage</SelectItem>
                            <SelectItem value="customer-request">Customer Special Request</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="mt-4">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea 
                          placeholder="Describe the issue in detail..." 
                          className="mt-1.5"
                          rows={4}
                        />
                      </div>
                      
                      <div className="mt-4">
                        <label className="text-sm font-medium">Priority</label>
                        <Select defaultValue="normal">
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowIssueDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setShowIssueDialog(false)}>
                        Submit Issue
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5 text-primary" />
                Print Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-[3/4] rounded-lg border-2 border-dashed bg-muted/50 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground/40" />
                  <p className="mt-2 text-muted-foreground">
                    Preview not available for this document
                  </p>
                  <Button variant="outline" size="sm" className="mt-4 gap-2">
                    <Download className="h-4 w-4" />
                    Generate Preview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-sm text-muted-foreground">Customer ID: CUST-1234</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{order.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{order.phone}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <SendHorizonal className="h-3.5 w-3.5" />
                  Email
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  Call
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                {order.deliveryMethod === "Store Pickup" ? "Pickup" : "Delivery"} Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm font-medium">Store Location</span>
                    <p className="text-sm text-muted-foreground">{order.storeLocation}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm font-medium">Pickup Time</span>
                    <p className="text-sm text-muted-foreground">{order.pickupTime}</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border-2 border-dashed border-primary/20 bg-primary/5 p-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  <p className="text-xs text-muted-foreground">
                    Make sure to update the order status to "Ready for Pickup" when the job is complete.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Document (A4, Color)</span>
                  <span>₹150.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Double-sided</span>
                  <span>-₹30.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Spiral Binding</span>
                  <span>₹60.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Copies</span>
                  <span>× 1</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{order.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pickup Fee</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes</span>
                  <span>{order.taxes}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary">{order.total}</span>
                </div>
              </div>
              
              <div className="mt-4 rounded-lg bg-secondary p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">Payment Method</p>
                  </div>
                  <p className="text-sm">{order.paymentMethod}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-2 pt-0">
              <Button className="w-full gap-2">
                <FileText className="h-4 w-4" />
                Print Invoice
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
} 