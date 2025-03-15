"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  User,
  FileText,
  Settings,
  LogOut,
  CreditCard,
  Bell,
} from "lucide-react"

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  const navigation = [
    { name: "Profile", href: "/account/profile", icon: User },
    { name: "Orders", href: "/account/orders", icon: FileText },
    { name: "Payment Methods", href: "/account/payment", icon: CreditCard },
    { name: "Notifications", href: "/account/notifications", icon: Bell },
    { name: "Account Settings", href: "/account/settings", icon: Settings },
  ]
  
  const isActive = (href: string) => pathname === href
  
  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-8 px-4 py-8">
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="mb-6">
          <Button variant="ghost" className="gap-2 mb-4 px-0" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">My Account</h1>
        </div>
        
        <nav className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                isActive(item.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
          
          <div className="pt-4 mt-4 border-t">
            <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive/90 hover:bg-destructive/10" asChild>
              <Link href="/auth/signout" className="gap-3">
                <LogOut className="h-5 w-5" />
                Sign Out
              </Link>
            </Button>
          </div>
        </nav>
      </aside>
      
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
} 