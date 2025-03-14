"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Printer, FileText, CreditCard, ArrowRight, Trash2 } from "lucide-react"

export default function CartPage() {
  const router = useRouter()
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Document Print",
      description: "A4, Double-sided, Color, Spiral Binding",
      price: 124.50,
      pages: 15,
      quantity: 1
    },
    {
      id: 2,
      name: "Business Cards",
      description: "Premium Paper, Full Color, 100 cards",
      price: 75.00,
      quantity: 1
    }
  ])

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const deliveryFee = 25.00
  const tax = subtotal * 0.18
  const total = subtotal + deliveryFee + tax

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">Your Cart</h1>
        <p className="mt-1.5 max-w-2xl text-sm md:text-base text-muted-foreground">
          Review your items before checking out
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle>Cart Items ({items.length})</CardTitle>
              <CardDescription>Items you've added for printing</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {items.length > 0 ? (
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start justify-between p-6">
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted">
                          {item.name.includes("Document") ? (
                            <FileText className="h-6 w-6 text-primary" />
                          ) : (
                            <Printer className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          {item.pages && (
                            <Badge variant="outline" className="mt-1.5 text-xs">
                              {item.pages} pages
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-start gap-4 text-right">
                        <div>
                          <div className="font-medium">₹{item.price.toFixed(2)}</div>
                          <div className="mt-1 flex items-center gap-1">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <span className="text-xs">-</span>
                            </Button>
                            <span className="w-6 text-center text-sm">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <span className="text-xs">+</span>
                            </Button>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <Printer className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-xl font-medium">Your cart is empty</h3>
                  <p className="mb-6 max-w-md text-muted-foreground">
                    Add some items to your cart to proceed with printing
                  </p>
                  <Button onClick={() => router.push("/print/upload")}>
                    Start Printing
                  </Button>
                </div>
              )}
            </CardContent>
            {items.length > 0 && (
              <CardFooter className="flex justify-between bg-muted/50 px-6 py-4">
                <Button variant="outline" onClick={() => router.push("/print/upload")}>
                  Continue Shopping
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>

        {items.length > 0 && (
          <div>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Order details and total</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span>₹{deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (18%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-lg">₹{total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 pt-0">
                <Button className="w-full gap-2" onClick={() => router.push("/checkout")}>
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
} 