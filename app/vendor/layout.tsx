"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
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
  Home,
  LayoutDashboard,
  Package,
  Calendar,
  Settings,
  FileText,
  Users,
  Bell,
  Menu,
  X,
  ChevronRight,
  LogOut,
  User
} from "lucide-react"

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const navigation = [
    { name: "Dashboard", href: "/vendor/dashboard", icon: LayoutDashboard },
    { name: "Orders", href: "/vendor/orders", icon: Package },
    { name: "Schedule", href: "/vendor/schedule", icon: Calendar },
    { name: "Reports", href: "/vendor/reports", icon: FileText },
    { name: "Customers", href: "/vendor/customers", icon: Users },
    { name: "Settings", href: "/vendor/settings", icon: Settings },
  ]
  
  // Check if the current path matches or starts with a nav item's href
  const isActive = (href: string) => {
    if (href === "/vendor/dashboard") {
      return pathname === href || pathname === "/vendor"
    }
    return pathname === href || pathname.startsWith(`${href}/`)
  }
  
  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar for desktop and mobile */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-background transition-transform duration-200 ease-in-out lg:relative lg:z-0 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/vendor/dashboard" className="flex items-center gap-1.5">
            <Printer className="h-5 w-5 text-primary" />
            <span className="font-semibold">PixelPress Vendor Portal</span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarOpen(false)} 
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex flex-1 flex-col overflow-y-auto p-4">
          <nav className="mb-6 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium ${
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto space-y-4">
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
                  <span className="text-sm font-medium text-primary-foreground">PP</span>
                </div>
                <div>
                  <p className="text-sm font-medium">PixelPress Indiranagar</p>
                  <p className="text-xs text-muted-foreground">Store ID: #512</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-3 w-full justify-between">
                Switch Store <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="w-full justify-center gap-1.5" asChild>
                <Link href="/vendor/settings">
                  <Settings className="h-4 w-4" />
                  <span className="ml-1.5">Settings</span>
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-center gap-1.5" asChild>
                <Link href="/">
                  <Home className="h-4 w-4" />
                  <span className="ml-1.5">Storefront</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open sidebar</span>
          </Button>
          
          <div className="flex items-center gap-1.5">
            <Printer className="h-5 w-5 text-primary" />
            <h1 className="text-base font-semibold truncate">PixelPress Vendor Portal</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/vendor/notifications">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-primary"></span>
                <span className="sr-only">Notifications</span>
              </Link>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
} 