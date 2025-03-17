"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
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
  Printer,
  Search,
  Clock,
  Filter,
  MoreVertical,
  CheckCircle,
  FilePenLine,
  AlertCircle,
  Package,
  RefreshCw,
  Eye,
  HelpCircle,
  Truck,
  FileText,
  User,
  CalendarClock,
  Plus,
  DollarSign,
  BarChart2,
  BellRing,
  AlertTriangle,
  Check,
  ArrowUpDown,
  Trash2,
  IndianRupee,
} from "lucide-react"
import { cn } from "@/lib/utils"

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

export default function VendorDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  
  // Mock data for demonstration
const orders = [
  {
      id: "PP-7654321",
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
      id: "PP-7654320",
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
      id: "PP-7654319",
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
      id: "PP-7654318",
      customer: "Sara Williams",
      document: "Research_Paper.pdf",
      status: "completed",
      placed: "Yesterday, 11:20 AM",
      due: "Today, 10:00 AM",
      total: "₹420.00",
      pages: 22,
      type: "Spiral Binding, A4 Color"
    },
    {
      id: "PP-7654317",
      customer: "Alex Chen",
      document: "Photo_Album.zip",
      status: "pending",
      placed: "Yesterday, 4:00 PM",
      due: "Tomorrow, 3:00 PM",
      total: "₹560.00",
      pages: 18,
      type: "Photo Paper, Glossy Finish"
    },
    {
      id: "PP-7654316",
      customer: "Robert Brown",
      document: "Conference_Posters.pdf",
      status: "processing",
      placed: "Today, 8:15 AM",
      due: "Tomorrow, 9:00 AM",
      total: "₹850.00",
      pages: 3,
      type: "Poster Print, A2 Size"
    },
    {
      id: "PP-7654315",
      customer: "Emily Davis",
      document: "Wedding_Invitations.pdf",
      status: "ready",
      placed: "Yesterday, 2:30 PM",
      due: "Today, 4:00 PM",
      total: "₹620.00",
      pages: 25,
      type: "Premium Card, Full Color"
    }
  ]
  
  const filteredOrders = activeTab === "all" 
    ? orders 
    : orders.filter(order => order.status === activeTab)
  
const getStatusBadge = (status: string) => {
  switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-800">Pending</Badge>
    case "processing":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800">Processing</Badge>
    case "ready":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 dark:bg-green-950 dark:text-green-400 dark:border-green-800">Ready for Pickup</Badge>
      case "completed":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">Completed</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "outline"
      case "processing":
        return "secondary"
      case "ready":
        return "default"
      case "completed":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  // Sample notifications data
  const notifications = [
    { id: 1, title: "New order received #12345", time: "10 minutes ago", type: "info" },
    { id: 2, title: "Low paper stock alert", time: "1 hour ago", type: "warning" },
    { id: 3, title: "Order #12340 completed successfully", time: "3 hours ago", type: "success" }
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Vendor Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your printing orders and services
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

      <div className="grid gap-4 md:grid-cols-3 mb-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3 px-4">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0 pb-3 px-4">
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">
              +5 from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3 px-4">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0 pb-3 px-4">
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              3 due today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3 px-4">
            <CardTitle className="text-sm font-medium">This Week's Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0 pb-3 px-4">
            <div className="text-2xl font-bold">₹4,325.50</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-5">
        <CardHeader className="pb-2 pt-3 px-4">
          <div className="flex items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <FileText className="h-3.5 w-3.5" />
              <span>Export</span>
            </Button>
          </div>
          <CardDescription>
            Manage and track your printing service orders
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="all">
            <div className="px-4 pt-1 pb-2 border-b">
              <TabsList className="gap-3">
                <TabsTrigger value="all" className="text-xs sm:text-sm">All Orders</TabsTrigger>
                <TabsTrigger value="pending" className="text-xs sm:text-sm">Pending</TabsTrigger>
                <TabsTrigger value="processing" className="text-xs sm:text-sm">Processing</TabsTrigger>
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
                          {getStatusIcon(order.type)}
                          <span className="hidden sm:inline">{order.type}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-nowrap">{order.placed}</TableCell>
                        <TableCell className="hidden sm:table-cell text-nowrap">{order.due}</TableCell>
                        <TableCell className="hidden sm:table-cell text-right">₹{order.total}</TableCell>
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
                  Showing <strong>1-8</strong> of <strong>{filteredOrders.length}</strong> orders
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="pending" className="m-0">
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
                    {filteredOrders
                      .filter((order) => order.status === "pending")
                      .map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            <Link href={`/vendor/orders/${order.id}`} className="hover:underline">
                              #{order.id}
                            </Link>
                          </TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell className="flex items-center gap-2">
                            {getStatusIcon(order.type)}
                            <span className="hidden sm:inline">{order.type}</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-nowrap">{order.placed}</TableCell>
                          <TableCell className="hidden sm:table-cell text-nowrap">{order.due}</TableCell>
                          <TableCell className="hidden sm:table-cell text-right">₹{order.total}</TableCell>
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
            </TabsContent>
            <TabsContent value="processing" className="m-0">
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
                    {filteredOrders
                      .filter((order) => order.status === "processing")
                      .map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            <Link href={`/vendor/orders/${order.id}`} className="hover:underline">
                              #{order.id}
                            </Link>
                          </TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell className="flex items-center gap-2">
                            {getStatusIcon(order.type)}
                            <span className="hidden sm:inline">{order.type}</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-nowrap">{order.placed}</TableCell>
                          <TableCell className="hidden sm:table-cell text-nowrap">{order.due}</TableCell>
                          <TableCell className="hidden sm:table-cell text-right">₹{order.total}</TableCell>
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
        </TabsContent>
            <TabsContent value="completed" className="m-0">
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
                      {filteredOrders
                      .filter((order) => order.status === "completed")
                        .map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            <Link href={`/vendor/orders/${order.id}`} className="hover:underline">
                              #{order.id}
                            </Link>
                          </TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell className="flex items-center gap-2">
                            {getStatusIcon(order.type)}
                            <span className="hidden sm:inline">{order.type}</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-nowrap">{order.placed}</TableCell>
                          <TableCell className="hidden sm:table-cell text-nowrap">{order.due}</TableCell>
                          <TableCell className="hidden sm:table-cell text-right">₹{order.total}</TableCell>
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle>Order Analytics</CardTitle>
            <CardDescription>Order trends and statistics</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="h-[220px] flex items-center justify-center border rounded-md bg-muted/10">
              <div className="text-center">
                <BarChart2 className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">Order Analytics Chart</h3>
                <p className="text-sm text-muted-foreground mx-auto max-w-[160px]">
                  Chart visualization coming soon
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Latest updates and alerts</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {notifications.map((notification, index) => (
                <div key={index} className="flex gap-3 p-3">
                  <div className={cn(
                    "mt-0.5 flex h-8 w-8 items-center justify-center rounded-full",
                    notification.type === "info" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500" :
                    notification.type === "warning" ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500" :
                    "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-500"
                  )}>
                    {notification.type === "info" ? <Package className="h-4 w-4" /> :
                     notification.type === "warning" ? <AlertTriangle className="h-4 w-4" /> :
                     <Check className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t text-center">
              <Button variant="ghost" size="sm" className="gap-1 text-primary">
                <BellRing className="h-3.5 w-3.5" />
                <span>View All Notifications</span>
              </Button>
                </div>
              </CardContent>
            </Card>
      </div>
    </div>
  )
}

