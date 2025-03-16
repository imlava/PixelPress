"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Bell, ShoppingCart, Tag, CreditCard, Info, AlertTriangle, CheckCircle2 } from "lucide-react"

const notifications = [
  {
    id: 1,
    title: "Order PP-1001 has been shipped",
    description: "Your order has been shipped and is on its way.",
    date: "Today at 10:30 AM",
    type: "order",
    isRead: false,
  },
  {
    id: 2,
    title: "50% Off on Business Cards",
    description: "Limited time offer: Get 50% off on all business card orders.",
    date: "Yesterday at 2:45 PM",
    type: "promotion",
    isRead: true,
  },
  {
    id: 3,
    title: "Payment successful",
    description: "Your payment of ₹1,499 for order PP-982 was successful.",
    date: "Mar 12, 2023",
    type: "payment",
    isRead: true,
  },
  {
    id: 4,
    title: "Your files are ready for print",
    description: "We've processed your files for order PP-975 and they're ready for printing.",
    date: "Mar 10, 2023",
    type: "info",
    isRead: true,
  },
  {
    id: 5,
    title: "Action required: Confirm your design",
    description: "We need your approval on the design for order PP-960 before we proceed.",
    date: "Mar 5, 2023",
    type: "alert",
    isRead: true,
  },
]

const getIcon = (type: string) => {
  switch (type) {
    case "order":
      return <ShoppingCart className="h-5 w-5 text-blue-500" />
    case "promotion":
      return <Tag className="h-5 w-5 text-green-500" />
    case "payment":
      return <CreditCard className="h-5 w-5 text-purple-500" />
    case "info":
      return <Info className="h-5 w-5 text-orange-500" />
    case "alert":
      return <AlertTriangle className="h-5 w-5 text-red-500" />
    case "success":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />
    default:
      return <Bell className="h-5 w-5" />
  }
}

export default function NotificationsPage() {
  const [notificationsList, setNotificationsList] = useState(notifications)
  
  const markAllAsRead = () => {
    setNotificationsList(
      notificationsList.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    )
  }
  
  const clearAll = () => {
    setNotificationsList([])
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-1">
            View and manage your notifications
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
          <Button variant="outline" size="sm" onClick={clearAll}>
            Clear all
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Control how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="order-updates">Order updates</Label>
                <p className="text-sm text-muted-foreground">
                  Notifications about your order status
                </p>
              </div>
              <Switch id="order-updates" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="promotions">Promotions</Label>
                <p className="text-sm text-muted-foreground">
                  Deals, discounts, and special offers
                </p>
              </div>
              <Switch id="promotions" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="payment-updates">Payment updates</Label>
                <p className="text-sm text-muted-foreground">
                  Notifications about payments and billing
                </p>
              </div>
              <Switch id="payment-updates" defaultChecked />
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Recent Notifications</h2>
          
          {notificationsList.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
              <p className="mt-2 text-muted-foreground">No notifications to display</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notificationsList.map((notification) => (
                <Card key={notification.id} className={notification.isRead ? "opacity-70" : ""}>
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="mt-0.5">{getIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div className="font-medium flex items-center gap-2">
                            {notification.title}
                            {!notification.isRead && (
                              <Badge variant="default" className="ml-2 h-2 w-2 rounded-full p-0" />
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">{notification.date}</div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 