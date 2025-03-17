"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
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
  Trash2,
  Check,
  FileX
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface Timeline {
  time: string
  title: string
  description: string
  status: "completed" | "current" | "upcoming"
}

interface OrderDetails {
  type: string
  specifications: string[]
  quantity: number
  copies: number
}

interface Pricing {
  subtotal: number
  bindingCost: number
  tax: number
  discount: number
  total: number
}

interface Customer {
  name: string
  email: string
  phone: string
  address: string
}

interface Document {
  name: string
  size: string
  pages: number
  preview: string
}

interface Payment {
  method: string
  status: string
  transactionId: string
}

interface Delivery {
  method: string
  location: string
  address: string
  instructions: string
}

interface Dates {
  placed: string
  due: string
  estimated: string
}

interface Order {
  id: string
  customer: Customer
  document: Document
  status: string
  timeline: Timeline[]
  orderDetails: OrderDetails
  pricing: Pricing
  dates: Dates
  payment: Payment
  delivery: Delivery
}

interface Orders {
  [key: string]: Order
}

// Mock order data - expanded with more details
const orders: Orders = {
  "PP-7654319": {
    id: "PP-7654319",
    customer: {
      name: "Mike Johnson",
      email: "mike.j@example.com",
      phone: "+91 98765 43210",
      address: "123 Main St, Indiranagar, Bangalore - 560038"
    },
    document: {
      name: "Business_Proposal.pdf",
      size: "2.4 MB",
      pages: 15,
      preview: "/previews/business-proposal.jpg"
    },
    status: "ready",
    timeline: [
      {
        time: "2024-03-20 15:45:00",
        title: "Order Placed",
        description: "Order received and payment confirmed",
        status: "completed"
      },
      {
        time: "2024-03-20 16:00:00",
        title: "Processing Started",
        description: "Document queued for printing",
        status: "completed"
      },
      {
        time: "2024-03-20 16:30:00",
        title: "Printing",
        description: "Documents are being printed",
        status: "completed"
      },
      {
        time: "2024-03-20 17:15:00",
        title: "Quality Check",
        description: "Print quality verification completed",
        status: "completed"
      },
      {
        time: "2024-03-20 17:30:00",
        title: "Ready for Pickup",
        description: "Order is ready for customer pickup",
        status: "current"
      },
      {
        time: "Pending",
        title: "Picked Up",
        description: "Customer pickup pending",
        status: "upcoming"
      }
    ],
    orderDetails: {
      type: "Booklet Binding, A4 Color",
      specifications: [
        "A4 Size (210 x 297 mm)",
        "Full Color Printing",
        "Double-sided",
        "Premium 100 GSM Paper",
        "Booklet Binding with Cover"
      ],
      quantity: 1,
      copies: 2
    },
    pricing: {
      subtotal: 1800,
      bindingCost: 200,
      tax: 360,
      discount: 260,
      total: 2100
    },
    dates: {
      placed: "Yesterday, 3:45 PM",
      due: "Today, 5:00 PM",
      estimated: "Today by 5:00 PM"
    },
    payment: {
      method: "Online Payment",
      status: "Paid",
      transactionId: "TXN123456789"
    },
    delivery: {
      method: "Store Pickup",
      location: "PixelPress Store - Indiranagar",
      address: "123 12th Main Road, Indiranagar, Bangalore - 560038",
      instructions: "Please bring order ID and valid ID proof for pickup"
    }
  },
  "PP-8876543": {
    id: "PP-8876543",
    customer: {
      name: "Priya Sharma",
      email: "priya.s@example.com",
      phone: "+91 87654 32109",
      address: "45 Park Avenue, Koramangala, Bangalore - 560034"
    },
    document: {
      name: "Research_Paper.pdf",
      size: "5.8 MB",
      pages: 32,
      preview: "/previews/research-paper.jpg"
    },
    status: "pending",
    timeline: [
      {
        time: "2024-03-21 09:15:00",
        title: "Order Placed",
        description: "Order received and payment confirmed",
        status: "completed"
      },
      {
        time: "Pending",
        title: "Processing Started",
        description: "Document waiting to be processed",
        status: "upcoming"
      },
      {
        time: "Pending",
        title: "Printing",
        description: "Documents will be printed",
        status: "upcoming"
      },
      {
        time: "Pending",
        title: "Quality Check",
        description: "Print quality verification",
        status: "upcoming"
      },
      {
        time: "Pending",
        title: "Ready for Pickup",
        description: "Order will be ready for customer pickup",
        status: "upcoming"
      },
      {
        time: "Pending",
        title: "Picked Up",
        description: "Customer pickup pending",
        status: "upcoming"
      }
    ],
    orderDetails: {
      type: "Spiral Binding, A4 B&W",
      specifications: [
        "A4 Size (210 x 297 mm)",
        "Black & White Printing",
        "Double-sided",
        "Standard 80 GSM Paper",
        "Spiral Binding with Transparent Cover"
      ],
      quantity: 1,
      copies: 3
    },
    pricing: {
      subtotal: 960,
      bindingCost: 150,
      tax: 222,
      discount: 100,
      total: 1232
    },
    dates: {
      placed: "Today, 9:15 AM",
      due: "Tomorrow, 4:00 PM",
      estimated: "Tomorrow by 4:00 PM"
    },
    payment: {
      method: "UPI Payment",
      status: "Paid",
      transactionId: "TXN987654321"
    },
    delivery: {
      method: "Store Pickup",
      location: "PixelPress Store - Koramangala",
      address: "789 1st Cross, Koramangala, Bangalore - 560034",
      instructions: "Please bring order ID and valid ID proof for pickup"
    }
  },
  "PP-9912345": {
    id: "PP-9912345",
    customer: {
      name: "Rahul Patel",
      email: "rahul.p@example.com",
      phone: "+91 76543 21098",
      address: "567 MG Road, Bangalore - 560001"
    },
    document: {
      name: "Thesis_Final.pdf",
      size: "12.7 MB",
      pages: 78,
      preview: "/previews/thesis-preview.jpg"
    },
    status: "processing",
    timeline: [
      {
        time: "2024-03-20 14:30:00",
        title: "Order Placed",
        description: "Order received and payment confirmed",
        status: "completed"
      },
      {
        time: "2024-03-20 15:00:00",
        title: "Processing Started",
        description: "Document queued for printing",
        status: "completed"
      },
      {
        time: "2024-03-21 10:30:00",
        title: "Printing",
        description: "Documents are being printed",
        status: "current"
      },
      {
        time: "Pending",
        title: "Quality Check",
        description: "Print quality verification",
        status: "upcoming"
      },
      {
        time: "Pending",
        title: "Ready for Pickup",
        description: "Order will be ready for customer pickup",
        status: "upcoming"
      },
      {
        time: "Pending",
        title: "Picked Up",
        description: "Customer pickup pending",
        status: "upcoming"
      }
    ],
    orderDetails: {
      type: "Hardcover Binding, A4 Color",
      specifications: [
        "A4 Size (210 x 297 mm)",
        "Full Color Printing",
        "Double-sided",
        "Premium 120 GSM Paper",
        "Hardcover Binding with Glossy Finish"
      ],
      quantity: 1,
      copies: 1
    },
    pricing: {
      subtotal: 4500,
      bindingCost: 800,
      tax: 1060,
      discount: 500,
      total: 5860
    },
    dates: {
      placed: "Yesterday, 2:30 PM",
      due: "Tomorrow, 6:00 PM",
      estimated: "Tomorrow by 6:00 PM"
    },
    payment: {
      method: "Card Payment",
      status: "Paid",
      transactionId: "TXN456789123"
    },
    delivery: {
      method: "Home Delivery",
      location: "Customer Address",
      address: "567 MG Road, Bangalore - 560001",
      instructions: "Please call before delivery"
    }
  },
  "PP-5543210": {
    id: "PP-5543210",
    customer: {
      name: "Aisha Khan",
      email: "aisha.k@example.com",
      phone: "+91 65432 10987",
      address: "890 Brigade Road, Bangalore - 560025"
    },
    document: {
      name: "Marketing_Plan_2024.pdf",
      size: "3.2 MB",
      pages: 22,
      preview: "/previews/marketing-plan.jpg"
    },
    status: "completed",
    timeline: [
      {
        time: "2024-03-19 11:20:00",
        title: "Order Placed",
        description: "Order received and payment confirmed",
        status: "completed"
      },
      {
        time: "2024-03-19 11:45:00",
        title: "Processing Started",
        description: "Document queued for printing",
        status: "completed"
      },
      {
        time: "2024-03-19 13:30:00",
        title: "Printing",
        description: "Documents are being printed",
        status: "completed"
      },
      {
        time: "2024-03-19 14:15:00",
        title: "Quality Check",
        description: "Print quality verification completed",
        status: "completed"
      },
      {
        time: "2024-03-19 15:00:00",
        title: "Ready for Pickup",
        description: "Order is ready for customer pickup",
        status: "completed"
      },
      {
        time: "2024-03-19 16:30:00",
        title: "Picked Up",
        description: "Customer has collected the order",
        status: "completed"
      }
    ],
    orderDetails: {
      type: "Comb Binding, A4 Color",
      specifications: [
        "A4 Size (210 x 297 mm)",
        "Full Color Printing",
        "Single-sided",
        "Glossy 130 GSM Paper",
        "Comb Binding with Transparent Cover"
      ],
      quantity: 1,
      copies: 5
    },
    pricing: {
      subtotal: 2200,
      bindingCost: 300,
      tax: 500,
      discount: 300,
      total: 2700
    },
    dates: {
      placed: "2 days ago, 11:20 AM",
      due: "Yesterday, 5:00 PM",
      estimated: "Completed"
    },
    payment: {
      method: "Cash on Delivery",
      status: "Paid",
      transactionId: "TXN321098765"
    },
    delivery: {
      method: "Store Pickup",
      location: "PixelPress Store - Brigade Road",
      address: "123 Brigade Road, Bangalore - 560025",
      instructions: "Completed"
    }
  },
  "PP-6654321": {
    id: "PP-6654321",
    customer: {
      name: "Vikram Singh",
      email: "vikram.s@example.com",
      phone: "+91 54321 09876",
      address: "456 MG Road, HSR Layout, Bangalore - 560102"
    },
    document: {
      name: "Project_Report.pdf",
      size: "4.2 MB",
      pages: 25,
      preview: "/previews/project-report.jpg"
    },
    status: "ready",
    timeline: [
      {
        time: "2024-03-20 10:30:00",
        title: "Order Placed",
        description: "Order received and payment confirmed",
        status: "completed"
      },
      {
        time: "2024-03-20 11:00:00",
        title: "Processing Started",
        description: "Document queued for printing",
        status: "completed"
      },
      {
        time: "2024-03-20 12:45:00",
        title: "Printing",
        description: "Documents are being printed",
        status: "completed"
      },
      {
        time: "2024-03-20 13:30:00",
        title: "Quality Check",
        description: "Print quality verification completed",
        status: "completed"
      },
      {
        time: "2024-03-20 14:00:00",
        title: "Ready for Pickup",
        description: "Order is ready for customer pickup",
        status: "current"
      },
      {
        time: "Pending",
        title: "Picked Up",
        description: "Customer pickup pending",
        status: "upcoming"
      }
    ],
    orderDetails: {
      type: "Spiral Binding, A4 Color",
      specifications: [
        "A4 Size (210 x 297 mm)",
        "Full Color Printing",
        "Double-sided",
        "Premium 100 GSM Paper",
        "Spiral Binding with Clear Cover"
      ],
      quantity: 1,
      copies: 2
    },
    pricing: {
      subtotal: 1500,
      bindingCost: 150,
      tax: 330,
      discount: 180,
      total: 1800
    },
    dates: {
      placed: "Yesterday, 1:30 PM",
      due: "Today, 3:00 PM",
      estimated: "Today by 3:00 PM"
    },
    payment: {
      method: "UPI Payment",
      status: "Paid",
      transactionId: "TXN876543210"
    },
    delivery: {
      method: "Store Pickup",
      location: "PixelPress Store - HSR Layout",
      address: "789 HSR Layout, Bangalore - 560102",
      instructions: "Please bring order ID and valid ID proof for pickup"
    }
  },
  "PP-7765432": {
    id: "PP-7765432",
    customer: {
      name: "Neha Gupta",
      email: "neha.g@example.com",
      phone: "+91 43210 98765",
      address: "123 Whitefield Main Road, Bangalore - 560066"
    },
    document: {
      name: "Dissertation_Draft.pdf",
      size: "18.5 MB",
      pages: 135,
      preview: "/previews/dissertation-draft.jpg"
    },
    status: "pending",
    timeline: [
      {
        time: "2024-03-21 08:45:00",
        title: "Order Placed",
        description: "Order received and payment confirmed",
        status: "completed"
      },
      {
        time: "Pending",
        title: "Processing Started",
        description: "Document waiting to be processed",
        status: "upcoming"
      },
      {
        time: "Pending",
        title: "Printing",
        description: "Documents will be printed",
        status: "upcoming"
      },
      {
        time: "Pending",
        title: "Quality Check",
        description: "Print quality verification",
        status: "upcoming"
      },
      {
        time: "Pending",
        title: "Ready for Pickup",
        description: "Order will be ready for customer pickup",
        status: "upcoming"
      },
      {
        time: "Pending",
        title: "Picked Up",
        description: "Customer pickup pending",
        status: "upcoming"
      }
    ],
    orderDetails: {
      type: "Hardcover Binding, A4 Color",
      specifications: [
        "A4 Size (210 x 297 mm)",
        "Full Color Printing",
        "Double-sided",
        "Premium 120 GSM Paper",
        "Hardcover Binding with Matte Finish"
      ],
      quantity: 1,
      copies: 2
    },
    pricing: {
      subtotal: 3000,
      bindingCost: 600,
      tax: 720,
      discount: 820,
      total: 3500
    },
    dates: {
      placed: "Today, 8:45 AM",
      due: "Tomorrow, 1:00 PM",
      estimated: "Tomorrow by 1:00 PM"
    },
    payment: {
      method: "Card Payment",
      status: "Paid",
      transactionId: "TXN765432109"
    },
    delivery: {
      method: "Home Delivery",
      location: "Customer Address",
      address: "123 Whitefield Main Road, Bangalore - 560066",
      instructions: "Please call before delivery"
    }
  },
  "PP-8887654": {
    id: "PP-8887654",
    customer: {
      name: "Arjun Kumar",
      email: "arjun.k@example.com",
      phone: "+91 32109 87654",
      address: "456 Jayanagar 4th Block, Bangalore - 560041"
    },
    document: {
      name: "Financial_Analysis.pdf",
      size: "3.8 MB",
      pages: 28,
      preview: "/previews/financial-analysis.jpg"
    },
    status: "processing",
    timeline: [
      {
        time: "2024-03-20 11:15:00",
        title: "Order Placed",
        description: "Order received and payment confirmed",
        status: "completed"
      },
      {
        time: "2024-03-20 12:30:00",
        title: "Processing Started",
        description: "Document queued for printing",
        status: "completed"
      },
      {
        time: "2024-03-21 09:45:00",
        title: "Printing",
        description: "Documents are being printed",
        status: "current"
      },
      {
        time: "Pending",
        title: "Quality Check",
        description: "Print quality verification",
        status: "upcoming"
      },
      {
        time: "Pending",
        title: "Ready for Pickup",
        description: "Order will be ready for customer pickup",
        status: "upcoming"
      },
      {
        time: "Pending",
        title: "Picked Up",
        description: "Customer pickup pending",
        status: "upcoming"
      }
    ],
    orderDetails: {
      type: "Comb Binding, A4 B&W",
      specifications: [
        "A4 Size (210 x 297 mm)",
        "Black & White Printing",
        "Double-sided",
        "Standard 80 GSM Paper",
        "Comb Binding with Transparent Cover"
      ],
      quantity: 1,
      copies: 1
    },
    pricing: {
      subtotal: 950,
      bindingCost: 120,
      tax: 214,
      discount: 34,
      total: 1250
    },
    dates: {
      placed: "Yesterday, 11:15 AM",
      due: "Today, 7:00 PM",
      estimated: "Today by 7:00 PM"
    },
    payment: {
      method: "Cash on Delivery",
      status: "Pending",
      transactionId: "N/A"
    },
    delivery: {
      method: "Store Pickup",
      location: "PixelPress Store - Jayanagar",
      address: "234 Jayanagar 4th Block, Bangalore - 560041",
      instructions: "Please bring order ID and valid ID proof for pickup"
    }
  },
  "PP-9998765": {
    id: "PP-9998765",
    customer: {
      name: "Meera Reddy",
      email: "meera.r@example.com",
      phone: "+91 21098 76543",
      address: "789 Malleswaram, Bangalore - 560003"
    },
    document: {
      name: "Product_Brochure.pdf",
      size: "7.5 MB",
      pages: 42,
      preview: "/previews/product-brochure.jpg"
    },
    status: "completed",
    timeline: [
      {
        time: "2024-03-18 10:00:00",
        title: "Order Placed",
        description: "Order received and payment confirmed",
        status: "completed"
      },
      {
        time: "2024-03-18 10:30:00",
        title: "Processing Started",
        description: "Document queued for printing",
        status: "completed"
      },
      {
        time: "2024-03-18 11:45:00",
        title: "Printing",
        description: "Documents are being printed",
        status: "completed"
      },
      {
        time: "2024-03-18 13:15:00",
        title: "Quality Check",
        description: "Print quality verification completed",
        status: "completed"
      },
      {
        time: "2024-03-18 14:00:00",
        title: "Ready for Pickup",
        description: "Order is ready for customer pickup",
        status: "completed"
      },
      {
        time: "2024-03-19 11:30:00",
        title: "Picked Up",
        description: "Customer has collected the order",
        status: "completed"
      }
    ],
    orderDetails: {
      type: "Premium Printing, A4 Glossy",
      specifications: [
        "A4 Size (210 x 297 mm)",
        "Full Color Printing",
        "Single-sided",
        "Premium 170 GSM Glossy Paper",
        "Stapled with Matte Lamination"
      ],
      quantity: 1,
      copies: 100
    },
    pricing: {
      subtotal: 3500,
      bindingCost: 500,
      tax: 800,
      discount: 600,
      total: 4200
    },
    dates: {
      placed: "3 days ago, 2:00 PM",
      due: "Yesterday, 12:00 PM",
      estimated: "Completed"
    },
    payment: {
      method: "Bank Transfer",
      status: "Paid",
      transactionId: "TXN210987654"
    },
    delivery: {
      method: "Completed",
      location: "PixelPress Store - Malleswaram",
      address: "456 Malleswaram, Bangalore - 560003",
      instructions: "Completed"
    }
  }
}

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const routeParams = useParams()
  const [orderStatus, setOrderStatus] = useState<string>("ready")
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [showCancelDialog, setShowCancelDialog] = useState<boolean>(false)
  const [showIssueDialog, setShowIssueDialog] = useState<boolean>(false)
  
  // Get order details from mock data using useParams hook which is safe in client components
  const orderId = typeof routeParams.id === 'string' ? routeParams.id : 
                 (Array.isArray(routeParams.id) ? routeParams.id[0] : params.id as string)
  const order = orders[orderId]
  
  // Handle non-existent order
  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <FileX className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Order Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The order you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="outline" onClick={() => router.push("/vendor/orders")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
          </Button>
        </div>
      </div>
    )
  }

  const handleStatusChange = (value: string) => {
    setOrderStatus(value)
    setIsUpdating(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false)
      toast({
        title: "Status Updated",
        description: `Order status has been updated to ${value}`,
      })
    }, 1000)
  }
  
  const handleCancelOrder = () => {
    setIsUpdating(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false)
      setShowCancelDialog(false)
      toast({
        title: "Order Cancelled",
        description: "The order has been cancelled successfully",
        variant: "destructive",
      })
      router.push("/vendor/orders")
    }, 1500)
  }
  
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
            Pending
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
            Processing
          </Badge>
        )
      case "ready":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
            Ready for Pickup
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" className="mb-4 gap-2" onClick={() => router.push("/vendor/orders")}>
          <ArrowLeft className="h-4 w-4" /> Back to Orders
        </Button>
        
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Order #{order.id}</h1>
            <p className="text-muted-foreground">Placed on {order.dates.placed}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Current Status:</span>
              {getStatusBadge(orderStatus || order.status)}
            </div>
            <Select value={orderStatus || order.status} onValueChange={handleStatusChange} disabled={isUpdating}>
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
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="font-medium">Print Specifications</div>
                  <div className="grid gap-1">
                    {order.orderDetails.specifications.map((spec: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid gap-2">
                  <div className="font-medium">Document Details</div>
                  <div className="grid gap-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">File Name:</span>
                      <span>{order.document.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">File Size:</span>
                      <span>{order.document.size}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Pages:</span>
                      <span>{order.document.pages}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Copies:</span>
                      <span>{order.orderDetails.copies}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Order Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {order.timeline.map((event: Timeline, index: number) => (
                  <div key={index} className="flex gap-4 pb-8 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        "h-2 w-2 rounded-full mt-2",
                        event.status === "completed" ? "bg-primary" :
                        event.status === "current" ? "bg-blue-500" :
                        "bg-secondary"
                      )} />
                      {index !== order.timeline.length - 1 && (
                        <div className="w-px flex-1 bg-border" />
                      )}
                    </div>
                    <div>
                      <div className="grid gap-1">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.description}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {event.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 px-6 py-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Deadline: <span className="font-medium text-foreground">{order.dates.due}</span></p>
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
                      <Button onClick={() => {
                        setShowIssueDialog(false)
                        toast({
                          title: "Issue Reported",
                          description: "Your issue has been submitted and will be addressed soon.",
                        })
                      }}>
                        Submit Issue
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
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
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Customer Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="font-medium">{order.customer.name}</div>
                  <div className="text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{order.customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{order.customer.phone}</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid gap-2">
                  <div className="font-medium">Delivery Method</div>
                  <div className="text-sm">
                    <div className="font-medium">{order.delivery.method}</div>
                    <div className="text-muted-foreground mt-1">
                      {order.delivery.location}
                      <br />
                      {order.delivery.address}
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid gap-2">
                  <div className="font-medium">Payment Information</div>
                  <div className="text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Method:</span>
                      <span>{order.payment.method}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {order.payment.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-muted-foreground">Transaction ID:</span>
                      <span className="font-mono text-xs">{order.payment.transactionId}</span>
                    </div>
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
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Price Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(order.pricing.subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Binding Cost</span>
                    <span>{formatCurrency(order.pricing.bindingCost)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>{formatCurrency(order.pricing.tax)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="text-green-600">-{formatCurrency(order.pricing.discount)}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between font-medium">
                  <span>Total Amount</span>
                  <span>{formatCurrency(order.pricing.total)}</span>
                </div>
                
                <div className="rounded-lg bg-secondary p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">Payment Method</p>
                    </div>
                    <p className="text-sm">{order.payment.method}</p>
                  </div>
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button className="w-full gap-2">
                <Printer className="h-4 w-4" />
                Print Order Details
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Download className="h-4 w-4" />
                Download Invoice
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Mail className="h-4 w-4" />
                Email Customer
              </Button>
              <Button variant="outline" className="w-full gap-2 text-destructive hover:text-destructive" onClick={() => setShowCancelDialog(true)}>
                <AlertTriangle className="h-4 w-4" />
                Report Issue
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 