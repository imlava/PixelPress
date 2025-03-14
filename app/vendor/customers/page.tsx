"use client"

import { useState } from "react"
import Link from "next/link"
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
  Users,
  Search,
  Plus,
  MoreVertical,
  Mail,
  Phone,
  User,
  FileText,
  RefreshCw,
  Trash2,
  DollarSign,
  CheckCircle,
  XCircle,
  ArrowUpDown,
  Filter,
} from "lucide-react"

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  
  // Mock data for demonstration
  const customers = [
    {
      id: "C1001",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+91 9876543210",
      type: "individual",
      orders: 8,
      totalSpent: "₹3,840",
      lastOrder: "2 days ago",
      status: "active"
    },
    {
      id: "C1002",
      name: "XYZ Corporation",
      email: "orders@xyzcorp.com",
      phone: "+91 9876543211",
      type: "business",
      orders: 32,
      totalSpent: "₹16,250",
      lastOrder: "3 days ago",
      status: "active"
    },
    {
      id: "C1003",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+91 9876543212",
      type: "individual",
      orders: 5,
      totalSpent: "₹1,980",
      lastOrder: "1 week ago",
      status: "inactive"
    },
    {
      id: "C1004",
      name: "City University",
      email: "printshop@cityuniversity.edu",
      phone: "+91 9876543213",
      type: "education",
      orders: 26,
      totalSpent: "₹12,840",
      lastOrder: "1 day ago",
      status: "active"
    },
    {
      id: "C1005",
      name: "Tech Solutions Inc.",
      email: "office@techsolutions.com",
      phone: "+91 9876543214",
      type: "business",
      orders: 18,
      totalSpent: "₹9,650",
      lastOrder: "5 days ago",
      status: "active"
    },
    {
      id: "C1006",
      name: "Local Restaurant",
      email: "manager@localrestaurant.com",
      phone: "+91 9876543215",
      type: "business",
      orders: 12,
      totalSpent: "₹4,230",
      lastOrder: "2 weeks ago",
      status: "active"
    },
    {
      id: "C1007",
      name: "Michael Johnson",
      email: "michael.j@example.com",
      phone: "+91 9876543216",
      type: "individual",
      orders: 3,
      totalSpent: "₹980",
      lastOrder: "1 month ago",
      status: "inactive"
    }
  ]
  
  const filteredCustomers = customers
    .filter(customer => {
      // Filter by tab
      if (activeTab !== "all" && customer.type !== activeTab) {
        return false
      }
      
      // Filter by search
      if (searchTerm && !customer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !customer.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !customer.id.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }
      
      return true
    })
  
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Customers</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your printing service customers
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-[280px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search customers..."
              className="w-full pl-9 sm:w-[280px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">+3 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3">
            <CardTitle className="text-sm font-medium">Business Customers</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">{customers.filter(c => c.type === "business").length}</div>
            <p className="text-xs text-muted-foreground mt-1">42% of customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">{customers.filter(c => c.status === "active").length}</div>
            <p className="text-xs text-muted-foreground mt-1">71% retention rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">₹680</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Customer Database</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span>Filter</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <FileText className="h-3.5 w-3.5" />
                <span>Export</span>
              </Button>
            </div>
          </div>
          <CardDescription>
            View and manage your customer information
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <div className="px-4 pt-1 pb-2 border-b">
              <TabsList className="gap-3">
                <TabsTrigger value="all" className="text-xs sm:text-sm">All Customers</TabsTrigger>
                <TabsTrigger value="business" className="text-xs sm:text-sm">Business</TabsTrigger>
                <TabsTrigger value="individual" className="text-xs sm:text-sm">Individual</TabsTrigger>
                <TabsTrigger value="education" className="text-xs sm:text-sm">Education</TabsTrigger>
              </TabsList>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead className="hidden sm:table-cell">Total Spent</TableHead>
                  <TableHead className="hidden sm:table-cell">Last Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No customers found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.id}</TableCell>
                      <TableCell>
                        <Link href={`/vendor/customers/${customer.id}`} className="hover:underline font-medium">
                          {customer.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col text-sm">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{customer.email}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{customer.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          customer.type === "business" ? "default" :
                          customer.type === "education" ? "secondary" :
                          "outline"
                        }>
                          {customer.type.charAt(0).toUpperCase() + customer.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell className="hidden sm:table-cell">{customer.totalSpent}</TableCell>
                      <TableCell className="hidden sm:table-cell">{customer.lastOrder}</TableCell>
                      <TableCell>
                        <Badge variant={customer.status === "active" ? "outline" : "secondary"}>
                          {customer.status === "active" ? (
                            <div className="flex items-center gap-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                              <span>Active</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
                              <span>Inactive</span>
                            </div>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <User className="h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <FileText className="h-4 w-4" />
                              View Orders
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2">
                              <Mail className="h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2">
                              <RefreshCw className="h-4 w-4" />
                              Change Status
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive gap-2">
                              <Trash2 className="h-4 w-4" />
                              Delete Customer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <div className="text-sm text-muted-foreground">
                Showing <strong>1-{filteredCustomers.length}</strong> of <strong>{filteredCustomers.length}</strong> customers
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled={filteredCustomers.length < 10}>
                  Next
                </Button>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 