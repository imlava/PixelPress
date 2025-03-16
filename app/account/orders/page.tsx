"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Eye, FileDown, Printer, Search } from "lucide-react"

// Mock data for orders
const orders = [
  {
    id: "PP-001-2023",
    date: "2023-08-15T14:30:00",
    status: "completed",
    total: 1499,
    items: [
      { name: "Business Cards (Premium)", quantity: 100, price: 1499 }
    ]
  },
  {
    id: "PP-002-2023",
    date: "2023-09-02T10:15:00",
    status: "processing",
    total: 2550,
    items: [
      { name: "Flyers (Matte Finish)", quantity: 50, price: 2550 }
    ]
  },
  {
    id: "PP-003-2023",
    date: "2023-09-20T16:45:00",
    status: "shipped",
    total: 4775,
    items: [
      { name: "Brochures (Glossy)", quantity: 25, price: 3275 },
      { name: "Business Cards (Standard)", quantity: 50, price: 1500 }
    ]
  },
  {
    id: "PP-004-2023",
    date: "2023-10-05T09:30:00",
    status: "delivered",
    total: 8525,
    items: [
      { name: "Posters (Large Format)", quantity: 5, price: 5000 },
      { name: "Stickers (Custom)", quantity: 100, price: 3525 }
    ]
  },
  {
    id: "PP-005-2023",
    date: "2023-10-18T13:20:00",
    status: "cancelled",
    total: 1899,
    items: [
      { name: "Postcards (Standard)", quantity: 25, price: 1899 }
    ]
  }
]

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount)
}

const StatusBadge = ({ status }: { status: string }) => {
  const statusColors: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", label: string }> = {
    completed: { variant: "default", label: "Completed" },
    processing: { variant: "secondary", label: "Processing" },
    shipped: { variant: "default", label: "Shipped" },
    delivered: { variant: "default", label: "Delivered" },
    cancelled: { variant: "destructive", label: "Cancelled" }
  }
  
  const { variant, label } = statusColors[status] || { variant: "outline", label: status }
  
  return <Badge variant={variant}>{label}</Badge>
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  
  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm === "" || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">My Orders</h3>
          <p className="text-muted-foreground">
            View and track all your print orders.
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>
              View details and track the status of your recent print orders.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {filteredOrders.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{formatDate(order.date)}</TableCell>
                        <TableCell>
                          {order.items.map((item, i) => (
                            <div key={i} className="text-sm">
                              {item.name} x {item.quantity}
                            </div>
                          ))}
                        </TableCell>
                        <TableCell>{formatCurrency(order.total)}</TableCell>
                        <TableCell>
                          <StatusBadge status={order.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/account/orders/${order.id}`}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <FileDown className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                            {["completed", "delivered"].includes(order.status) && (
                              <Button variant="ghost" size="icon">
                                <Printer className="h-4 w-4" />
                                <span className="sr-only">Reorder</span>
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-4 rounded-full bg-muted p-3">
                  <Printer className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mb-1 text-lg font-semibold">No orders found</h3>
                <p className="mb-4 text-muted-foreground">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your search or filter."
                    : "You haven't placed any print orders yet."}
                </p>
                <Button asChild>
                  <Link href="/print">Start Printing</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
} 