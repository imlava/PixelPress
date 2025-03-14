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
} from "lucide-react"

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "pending":
      return "outline";
    case "processing":
      return "secondary";
    case "ready":
      return "default";
    case "completed":
      return "outline";
    case "cancelled":
      return "destructive";
    default:
      return "outline";
  }
}

export default function OrdersPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  
  // Mock data for demonstration
  const orders = [
    {
      id: "KPRO-7654321",
      customer: "John Doe",
      document: "Project_Report.pdf",
      status: "pending",
      placed: "Today, 10:15 AM",
      due: "Tomorrow, 2:00 PM",
      total: "₹216.00",
      pages: 5,
      type: "Spiral Binding, A4 Color"
    },
    {
      id: "KPRO-7654320",
      customer: "Jane Smith",
      document: "Resume_Final.docx",
      status: "processing",
      placed: "Today, 9:30 AM",
      due: "Tomorrow, 12:00 PM",
      total: "₹180.00",
      pages: 2,
      type: "Premium Paper, A4 Color"
    },
    {
      id: "KPRO-7654319",
      customer: "Mike Johnson",
      document: "Business_Proposal.pdf",
      status: "ready",
      placed: "Yesterday, 3:45 PM",
      due: "Today, 5:00 PM",
      total: "₹350.00",
      pages: 15,
      type: "Booklet Binding, A4 Color"
    },
    {
      id: "KPRO-7654318",
      customer: "Sara Williams",
      document: "Research_Paper.pdf",
      status: "completed",
      placed: "Yesterday, 11:20 AM",
      due: "Today, 10:00 AM",
      total: "₹420.00",
      pages: 22,
      type: "Spiral Binding, A4 Color"
    }
  ]
  
  const filteredOrders = activeTab === "all" 
    ? orders 
    : orders.filter(order => order.status === activeTab)
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "processing":
        return <Printer className="h-4 w-4 text-blue-600" />
      case "ready":
        return <Package className="h-4 w-4 text-green-600" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-gray-600" />
      default:
        return <HelpCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Orders</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and process customer print orders
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-[280px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="w-full pl-9 sm:w-[280px]"
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Order
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2 pt-3 px-4">
          <div className="flex items-center justify-between">
            <CardTitle>All Orders</CardTitle>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <FileText className="h-3.5 w-3.5" />
              <span>Export</span>
            </Button>
          </div>
          <CardDescription>
            View and manage all customer print orders
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <div className="px-4 pt-1 pb-2 border-b">
              <TabsList className="gap-3">
                <TabsTrigger value="all" className="text-xs sm:text-sm">All Orders</TabsTrigger>
                <TabsTrigger value="pending" className="text-xs sm:text-sm">Pending</TabsTrigger>
                <TabsTrigger value="processing" className="text-xs sm:text-sm">Processing</TabsTrigger>
                <TabsTrigger value="ready" className="text-xs sm:text-sm">Ready</TabsTrigger>
                <TabsTrigger value="completed" className="text-xs sm:text-sm">Completed</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="m-0">
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Document</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Placed</TableHead>
                      <TableHead className="hidden sm:table-cell">Due</TableHead>
                      <TableHead className="hidden sm:table-cell text-right">Total</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          <Link href={`/vendor/orders/${order.id}`} className="hover:underline">
                            #{order.id}
                          </Link>
                        </TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="hidden sm:inline">{order.type}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-nowrap">{order.placed}</TableCell>
                        <TableCell className="hidden sm:table-cell text-nowrap">{order.due}</TableCell>
                        <TableCell className="hidden sm:table-cell text-right">{order.total}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                onClick={() => router.push(`/vendor/orders/${order.id}`)}
                                className="gap-2"
                              >
                                <Eye className="h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2">
                                <Printer className="h-4 w-4" />
                                Print Order
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
              <div className="flex items-center justify-between px-4 py-3 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>1-{filteredOrders.length}</strong> of <strong>{filteredOrders.length}</strong> orders
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled={filteredOrders.length < 10}>
                    Next
                  </Button>
                </div>
              </div>
            </TabsContent>
            {/* Other tabs have similar content, so we're not duplicating them for brevity */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 