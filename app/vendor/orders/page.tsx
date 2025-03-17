"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Package,
  Search,
  Clock,
  Plus,
  Filter,
  MoreVertical,
  Eye,
  Printer,
  ArrowUpDown,
  Trash2,
  FileText,
  HelpCircle,
  CheckCircle,
  Download,
  AlertCircle,
  Loader2,
} from "lucide-react"

// Types for the order
interface Order {
  id: string
  customer: string
  document: string
  status: string
  placed: string
  due: string
  total: string
}

// Mock orders data with different statuses
const allOrders: Order[] = [
  {
    id: "PP-7654319",
    customer: "Mike Johnson",
    document: "Business_Proposal.pdf",
    status: "ready",
    placed: "Yesterday, 3:45 PM",
    due: "Today, 5:00 PM",
    total: "₹2,100"
  },
  {
    id: "PP-8876543",
    customer: "Priya Sharma",
    document: "Research_Paper.pdf",
    status: "pending",
    placed: "Today, 9:15 AM",
    due: "Tomorrow, 4:00 PM",
    total: "₹1,232"
  },
  {
    id: "PP-9912345",
    customer: "Rahul Patel",
    document: "Thesis_Final.pdf",
    status: "processing",
    placed: "Yesterday, 2:30 PM",
    due: "Tomorrow, 6:00 PM",
    total: "₹5,860"
  },
  {
    id: "PP-5543210",
    customer: "Aisha Khan",
    document: "Marketing_Plan_2024.pdf",
    status: "completed",
    placed: "2 days ago, 11:20 AM",
    due: "Yesterday, 5:00 PM",
    total: "₹2,700"
  },
  {
    id: "PP-6654321",
    customer: "Vikram Singh",
    document: "Project_Report.pdf", 
    status: "ready",
    placed: "Yesterday, 1:30 PM",
    due: "Today, 3:00 PM",
    total: "₹1,800"
  },
  {
    id: "PP-7765432",
    customer: "Neha Gupta",
    document: "Dissertation_Draft.pdf",
    status: "pending",
    placed: "Today, 8:45 AM",
    due: "Tomorrow, 1:00 PM",
    total: "₹3,500"
  },
  {
    id: "PP-8887654",
    customer: "Arjun Kumar",
    document: "Financial_Analysis.pdf",
    status: "processing",
    placed: "Yesterday, 11:15 AM",
    due: "Today, 7:00 PM",
    total: "₹1,250"
  },
  {
    id: "PP-9998765",
    customer: "Meera Reddy",
    document: "Product_Brochure.pdf",
    status: "completed",
    placed: "3 days ago, 2:00 PM",
    due: "Yesterday, 12:00 PM",
    total: "₹4,200"
  }
]

export default function OrdersPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
            Processing
          </Badge>
        )
      case "ready":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
            <Package className="mr-1 h-3 w-3" />
            Ready for Pickup
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Order Management</h1>
          <p className="text-muted-foreground">Manage and process all customer orders</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Orders
          </Button>
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            Print Report
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Orders Overview</CardTitle>
          <CardDescription>
            View and manage all customer orders. Filter by status or search for specific orders.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders by ID, customer or document..."
                className="pl-8"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-5">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="ready">Ready</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <OrdersTable orders={allOrders} getStatusBadge={getStatusBadge} />
            </TabsContent>
            
            <TabsContent value="pending">
              <OrdersTable 
                orders={allOrders.filter(order => order.status === "pending")} 
                getStatusBadge={getStatusBadge} 
              />
            </TabsContent>
            
            <TabsContent value="processing">
              <OrdersTable 
                orders={allOrders.filter(order => order.status === "processing")} 
                getStatusBadge={getStatusBadge} 
              />
            </TabsContent>
            
            <TabsContent value="ready">
              <OrdersTable 
                orders={allOrders.filter(order => order.status === "ready")} 
                getStatusBadge={getStatusBadge} 
              />
            </TabsContent>
            
            <TabsContent value="completed">
              <OrdersTable 
                orders={allOrders.filter(order => order.status === "completed")} 
                getStatusBadge={getStatusBadge} 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function OrdersTable({ 
  orders, 
  getStatusBadge 
}: { 
  orders: Order[],
  getStatusBadge: (status: string) => React.ReactNode
}) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-2 text-lg font-medium">No Orders Found</h3>
        <p className="text-muted-foreground">
          There are no orders matching the current filter.
        </p>
      </div>
    )
  }
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Document</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Placed</TableHead>
            <TableHead>Due</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">
                <Link
                  href={`/vendor/orders/${order.id}`}
                  className="text-primary hover:underline"
                >
                  {order.id}
                </Link>
              </TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell className="max-w-[150px] truncate" title={order.document}>
                {order.document}
              </TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell>{order.placed}</TableCell>
              <TableCell>{order.due}</TableCell>
              <TableCell className="text-right">{order.total}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem className="gap-2">
                      <Eye className="h-4 w-4" />
                      <Link href={`/vendor/orders/${order.id}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Printer className="h-4 w-4" />
                      <Link href={`/vendor/orders/${order.id}/print`}>Print Order</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2">
                      <ArrowUpDown className="h-4 w-4" />
                      Change Status
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive gap-2">
                      <Trash2 className="h-4 w-4" />
                      Cancel Order
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 