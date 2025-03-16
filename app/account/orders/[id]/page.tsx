"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, FileDown, Printer, Truck, Calendar, Package, Clock } from "lucide-react"

// Mock data for orders - this would typically come from an API
const orders = [
  {
    id: "PP-001-2023",
    date: "2023-08-15T14:30:00",
    status: "completed",
    total: 1499,
    items: [
      { name: "Business Cards (Premium)", quantity: 100, price: 1499, options: "400gsm, Matte Lamination" }
    ],
    shipping: {
      address: "123 Main St, Mumbai, Maharashtra",
      method: "Standard Delivery",
      estimated: "Aug 18 - Aug 20",
      tracking: "INPOST123456789"
    },
    payment: {
      method: "Credit Card (**** 4242)",
      status: "Paid",
      date: "2023-08-15"
    },
    timeline: [
      { status: "Order Placed", date: "Aug 15, 2023", time: "2:30 PM" },
      { status: "Payment Confirmed", date: "Aug 15, 2023", time: "2:35 PM" },
      { status: "Processing", date: "Aug 16, 2023", time: "9:00 AM" },
      { status: "Printing", date: "Aug 16, 2023", time: "11:30 AM" },
      { status: "Quality Check", date: "Aug 17, 2023", time: "9:45 AM" },
      { status: "Shipped", date: "Aug 17, 2023", time: "3:15 PM" },
      { status: "Delivered", date: "Aug 19, 2023", time: "11:20 AM" }
    ]
  },
  {
    id: "PP-002-2023",
    date: "2023-09-02T10:15:00",
    status: "processing",
    total: 2550,
    items: [
      { name: "Flyers (Matte Finish)", quantity: 50, price: 2550, options: "A5, Double-sided, 170gsm" }
    ],
    shipping: {
      address: "456 Park Ave, Delhi, Delhi",
      method: "Express Delivery",
      estimated: "Sep 5 - Sep 6",
      tracking: null
    },
    payment: {
      method: "Debit Card (**** 1234)",
      status: "Paid",
      date: "2023-09-02"
    },
    timeline: [
      { status: "Order Placed", date: "Sep 2, 2023", time: "10:15 AM" },
      { status: "Payment Confirmed", date: "Sep 2, 2023", time: "10:20 AM" },
      { status: "Processing", date: "Sep 2, 2023", time: "2:30 PM" }
    ]
  },
  {
    id: "PP-003-2023",
    date: "2023-09-20T16:45:00",
    status: "shipped",
    total: 4775,
    items: [
      { name: "Brochures (Glossy)", quantity: 25, price: 3275, options: "A4, Full color, Tri-fold" },
      { name: "Business Cards (Standard)", quantity: 50, price: 1500, options: "350gsm, Single-sided" }
    ],
    shipping: {
      address: "789 River Road, Bangalore, Karnataka",
      method: "Standard Delivery",
      estimated: "Sep 23 - Sep 25",
      tracking: "INPOST987654321"
    },
    payment: {
      method: "Credit Card (**** 5678)",
      status: "Paid",
      date: "2023-09-20"
    },
    timeline: [
      { status: "Order Placed", date: "Sep 20, 2023", time: "4:45 PM" },
      { status: "Payment Confirmed", date: "Sep 20, 2023", time: "4:50 PM" },
      { status: "Processing", date: "Sep 21, 2023", time: "9:15 AM" },
      { status: "Printing", date: "Sep 21, 2023", time: "2:30 PM" },
      { status: "Quality Check", date: "Sep 22, 2023", time: "10:00 AM" },
      { status: "Shipped", date: "Sep 22, 2023", time: "4:30 PM" }
    ]
  },
  {
    id: "PP-004-2023",
    date: "2023-10-05T09:30:00",
    status: "delivered",
    total: 8525,
    items: [
      { name: "Posters (Large Format)", quantity: 5, price: 5000, options: "A1, Full color, 200gsm" },
      { name: "Stickers (Custom)", quantity: 100, price: 3525, options: "Die-cut, Vinyl, Waterproof" }
    ],
    shipping: {
      address: "101 Hill Avenue, Chennai, Tamil Nadu",
      method: "Express Delivery",
      estimated: "Oct 7 - Oct 8",
      tracking: "INPOST567891234"
    },
    payment: {
      method: "UPI",
      status: "Paid",
      date: "2023-10-05"
    },
    timeline: [
      { status: "Order Placed", date: "Oct 5, 2023", time: "9:30 AM" },
      { status: "Payment Confirmed", date: "Oct 5, 2023", time: "9:35 AM" },
      { status: "Processing", date: "Oct 5, 2023", time: "11:45 AM" },
      { status: "Printing", date: "Oct 5, 2023", time: "3:15 PM" },
      { status: "Quality Check", date: "Oct 6, 2023", time: "9:30 AM" },
      { status: "Shipped", date: "Oct 6, 2023", time: "1:20 PM" },
      { status: "Out for Delivery", date: "Oct 7, 2023", time: "9:00 AM" },
      { status: "Delivered", date: "Oct 7, 2023", time: "2:45 PM" }
    ]
  },
  {
    id: "PP-005-2023",
    date: "2023-10-18T13:20:00",
    status: "cancelled",
    total: 1899,
    items: [
      { name: "Postcards (Standard)", quantity: 25, price: 1899, options: "A6, Full color, 350gsm" }
    ],
    shipping: {
      address: "222 Beach Road, Kochi, Kerala",
      method: "Standard Delivery",
      estimated: "Oct 21 - Oct 23",
      tracking: null
    },
    payment: {
      method: "Credit Card (**** 9012)",
      status: "Refunded",
      date: "2023-10-18"
    },
    timeline: [
      { status: "Order Placed", date: "Oct 18, 2023", time: "1:20 PM" },
      { status: "Payment Confirmed", date: "Oct 18, 2023", time: "1:25 PM" },
      { status: "Processing", date: "Oct 18, 2023", time: "3:00 PM" },
      { status: "Cancelled", date: "Oct 18, 2023", time: "5:45 PM" },
      { status: "Refund Initiated", date: "Oct 19, 2023", time: "10:15 AM" },
      { status: "Refund Completed", date: "Oct 20, 2023", time: "2:30 PM" }
    ]
  }
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount)
}

const StatusBadge = ({ status }: { status: string }) => {
  const statusColors: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", label: string }> = {
    processing: { variant: "secondary", label: "Processing" },
    shipped: { variant: "default", label: "Shipped" },
    delivered: { variant: "default", label: "Delivered" },
    completed: { variant: "default", label: "Completed" },
    cancelled: { variant: "destructive", label: "Cancelled" }
  }
  
  const { variant, label } = statusColors[status] || { variant: "outline", label: status }
  
  return <Badge variant={variant}>{label}</Badge>
}

export default function OrderDetail() {
  const router = useRouter()
  const params = useParams()
  const orderId = params.id as string
  
  // Find the order by ID
  const order = orders.find(o => o.id === orderId)
  
  if (!order) {
    return (
      <div className="flex h-full flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-semibold">Order Not Found</h1>
        <p className="text-muted-foreground">The order you're looking for doesn't exist or has been removed.</p>
        <Button variant="outline" onClick={() => router.push("/account/orders")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
        </Button>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" className="mb-4 -ml-4 px-2" onClick={() => router.push("/account/orders")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">Order {order.id}</h1>
          <div className="mt-1 flex items-center gap-3">
            <p className="text-sm text-muted-foreground">
              Placed on {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <StatusBadge status={order.status} />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Printer className="h-4 w-4" /> Print
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <FileDown className="h-4 w-4" /> Download
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <div className="font-semibold">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Order Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <div className="font-semibold">
                {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-lg">{formatCurrency(order.total)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Shipping</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <div className="font-semibold">{order.shipping.method}</div>
            </div>
            {order.shipping.tracking && (
              <div className="mt-1 text-xs text-muted-foreground">
                Tracking: {order.shipping.tracking}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Order Items</h2>
        
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Options</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.options}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.price / item.quantity)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} className="text-right font-medium">
                  Total
                </TableCell>
                <TableCell className="text-right font-bold">
                  {formatCurrency(order.total)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Address</p>
                  <p>{order.shipping.address}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Delivery Method</p>
                  <p>{order.shipping.method}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estimated Delivery</p>
                  <p>{order.shipping.estimated}</p>
                </div>
                {order.shipping.tracking && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tracking Number</p>
                    <p>{order.shipping.tracking}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                  <p>{order.payment.method}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Payment Status</p>
                  <p>{order.payment.status}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Payment Date</p>
                  <p>{order.payment.date}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Order Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="border-l border-muted-foreground/20 pl-5 dark:border-muted-foreground/20">
              {order.timeline.map((event, i) => (
                <li key={i} className="mb-6 last:mb-0">
                  <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-primary"></div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold">{event.status}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.date} at {event.time}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground mb-2">Need help with your order?</p>
        <Button variant="outline" size="sm" asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  )
} 