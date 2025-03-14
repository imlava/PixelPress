"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  BarChart2,
  LineChart,
  PieChart,
  Download,
  FileText,
  Calendar,
  Printer,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Users,
  Package,
} from "lucide-react"

export default function ReportsPage() {
  const [reportPeriod, setReportPeriod] = useState("this-month")
  const [reportType, setReportType] = useState("sales")
  
  // Mock data for demonstration
  const salesData = [
    { category: "Document Printing", amount: 28500, percentage: 45, trend: "up", change: 12 },
    { category: "Photo Printing", amount: 15200, percentage: 24, trend: "up", change: 8 },
    { category: "Binding Services", amount: 9800, percentage: 16, trend: "down", change: 3 },
    { category: "Lamination", amount: 5600, percentage: 9, trend: "up", change: 5 },
    { category: "Other Services", amount: 3900, percentage: 6, trend: "down", change: 2 },
  ]
  
  const monthlyRevenue = [
    { month: "Jan", amount: 58000 },
    { month: "Feb", amount: 62000 },
    { month: "Mar", amount: 56000 },
    { month: "Apr", amount: 64000 },
    { month: "May", amount: 72000 },
    { month: "Jun", amount: 68000 },
  ]

  const topCustomers = [
    { name: "ABC Corporation", orders: 24, spent: "₹12,580" },
    { name: "XYZ University", orders: 18, spent: "₹10,250" },
    { name: "Design Studio Ltd.", orders: 15, spent: "₹8,900" },
    { name: "Global Marketing Inc.", orders: 12, spent: "₹7,250" },
    { name: "Local Business Group", orders: 10, spent: "₹5,830" },
  ]
  
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Analyze your printing business performance
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select defaultValue={reportPeriod} onValueChange={setReportPeriod}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-quarter">Last Quarter</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="sales" value={reportType} onValueChange={setReportType} className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="sales">Sales Report</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="m-0">
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold">₹63,000</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                  <span className="text-green-500 font-medium">+12%</span> vs last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3">
                <CardTitle className="text-sm font-medium">Orders</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold">256</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                  <span className="text-green-500 font-medium">+8%</span> vs last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3">
                <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold">₹246</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                  <span className="text-green-500 font-medium">+5%</span> vs last month
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card className="md:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle>Revenue by Service</CardTitle>
                <CardDescription>
                  Revenue breakdown by service type for {reportPeriod === "this-month" ? "this month" : "the selected period"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center bg-muted/10 rounded-md mb-4 relative">
                  <PieChart className="h-16 w-16 text-muted-foreground opacity-70" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-center text-sm text-muted-foreground">Chart visualization <br/> coming soon</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {salesData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${
                          index === 0 ? "bg-blue-500" :
                          index === 1 ? "bg-green-500" :
                          index === 2 ? "bg-yellow-500" :
                          index === 3 ? "bg-purple-500" :
                          "bg-red-500"
                        }`}></div>
                        <span className="text-sm">{item.category}</span>
                      </div>
                      <div className="text-sm font-medium">₹{(item.amount).toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{item.percentage}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle>Monthly Revenue Trend</CardTitle>
                <CardDescription>
                  Revenue trends over the past 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center bg-muted/10 rounded-md mb-4">
                  <LineChart className="h-16 w-16 text-muted-foreground opacity-70" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-center text-sm text-muted-foreground">Chart visualization <br/> coming soon</p>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-1">
                  {monthlyRevenue.map((month, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="h-24 w-full flex items-end">
                        <div 
                          className="w-full bg-primary/80 rounded-t-sm"
                          style={{ height: `${(month.amount / 75000) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">{month.month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Top Performing Services</CardTitle>
              <CardDescription>
                Most profitable services for the current period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Growth</TableHead>
                    <TableHead className="text-right">Margin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Color Printing (A4)</TableCell>
                    <TableCell>142</TableCell>
                    <TableCell>₹15,640</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        <span>+15%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">64%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Thesis Binding</TableCell>
                    <TableCell>38</TableCell>
                    <TableCell>₹12,350</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        <span>+8%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">72%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Photo Printing (5×7)</TableCell>
                    <TableCell>106</TableCell>
                    <TableCell>₹9,540</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-red-500">
                        <TrendingDown className="h-4 w-4" />
                        <span>-3%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">58%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Business Cards</TableCell>
                    <TableCell>74</TableCell>
                    <TableCell>₹8,880</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        <span>+22%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">68%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Document Scanning</TableCell>
                    <TableCell>93</TableCell>
                    <TableCell>₹6,510</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        <span>+5%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">82%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers" className="m-0">
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold">152</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                  <span className="text-green-500 font-medium">+5%</span> vs last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3">
                <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold">18</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                  <span className="text-green-500 font-medium">+12%</span> vs last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3">
                <CardTitle className="text-sm font-medium">Repeat Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold">76%</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                  <span className="text-green-500 font-medium">+3%</span> vs last month
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Top Customers</CardTitle>
              <CardDescription>Highest spending customers for the current period</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead className="text-right">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCustomers.map((customer, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>{customer.spent}</TableCell>
                      <TableCell>2 days ago</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Customer Acquisition</CardTitle>
                <CardDescription>New customers over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center bg-muted/10 rounded-md">
                  <LineChart className="h-16 w-16 text-muted-foreground opacity-70" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-center text-sm text-muted-foreground">Chart visualization <br/> coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Customer Demographics</CardTitle>
                <CardDescription>Distribution by type and location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center bg-muted/10 rounded-md">
                  <PieChart className="h-16 w-16 text-muted-foreground opacity-70" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-center text-sm text-muted-foreground">Chart visualization <br/> coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="services" className="m-0">
          <div className="flex items-center justify-center h-40 bg-muted/10 rounded-lg mb-4">
            <div className="text-center">
              <Printer className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <h3 className="text-lg font-medium">Services Reports</h3>
              <p className="text-sm text-muted-foreground">Detailed service analytics coming soon...</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="inventory" className="m-0">
          <div className="flex items-center justify-center h-40 bg-muted/10 rounded-lg mb-4">
            <div className="text-center">
              <Package className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <h3 className="text-lg font-medium">Inventory Reports</h3>
              <p className="text-sm text-muted-foreground">Inventory tracking and analytics coming soon...</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 