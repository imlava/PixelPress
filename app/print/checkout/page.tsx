"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  ArrowRight,
  FileText,
  CreditCard, 
  MapPin, 
  Truck,
  Clock,
  Calendar,
  ChevronRight,
  CheckCircle,
  Printer,
  ShieldCheck
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

export default function CheckoutPage() {
  const router = useRouter()
  const [deliveryMethod, setDeliveryMethod] = useState("delivery")
  const [loading, setLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  
  const handlePlaceOrder = () => {
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setOrderComplete(true)
      
      // Redirect after a delay
      setTimeout(() => {
        router.push("/print/confirmation")
      }, 2000)
    }, 1500)
  }
  
  if (orderComplete) {
    return (
      <div className="animate-in container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">Order Confirmed!</h1>
        <p className="mt-2 max-w-md text-center text-muted-foreground">
          Your order has been received and is being processed. You will receive a confirmation email shortly.
        </p>
        <div className="mt-8 flex gap-4">
          <Button variant="outline" onClick={() => router.push("/")} className="gap-2">
            Return to Home
          </Button>
          <Button onClick={() => router.push("/vendor/dashboard")} className="gap-2">
            View Order Status <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="animate-in container mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="mb-2 px-3 py-1 text-xs text-muted-foreground">
            Step 3 of 3: Checkout
          </Badge>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Checkout</h1>
        <p className="mt-2 text-muted-foreground">
          Complete your order with payment and delivery information
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Delivery Method */}
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Truck className="h-5 w-5 text-primary" />
                Delivery Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="delivery" onValueChange={(value) => setDeliveryMethod(value)} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="delivery" className="gap-2">
                    <Truck className="h-4 w-4" />
                    Home Delivery
                  </TabsTrigger>
                  <TabsTrigger value="pickup" className="gap-2">
                    <MapPin className="h-4 w-4" />
                    Store Pickup
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="delivery" className="mt-4 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" className="mt-1.5" placeholder="John Doe" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" className="mt-1.5" placeholder="+91 9876543210" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Delivery Address</Label>
                    <Textarea id="address" className="mt-1.5" placeholder="Enter your full address" rows={3} />
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" className="mt-1.5" placeholder="Bangalore" />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input id="pincode" className="mt-1.5" placeholder="560001" />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="mb-1.5 block">Delivery Speed</Label>
                    <RadioGroup defaultValue="standard" className="space-y-3">
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="standard" id="standard" />
                          <div>
                            <Label htmlFor="standard" className="cursor-pointer font-medium">
                              Standard Delivery
                            </Label>
                            <p className="text-sm text-muted-foreground">Delivery in 2-3 business days</p>
                          </div>
                        </div>
                        <div className="font-medium">₹40.00</div>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="express" id="express" />
                          <div>
                            <Label htmlFor="express" className="cursor-pointer font-medium">
                              Express Delivery
                            </Label>
                            <p className="text-sm text-muted-foreground">Delivery by tomorrow</p>
                          </div>
                        </div>
                        <div className="font-medium">₹80.00</div>
                      </div>
                    </RadioGroup>
                  </div>
                </TabsContent>
                
                <TabsContent value="pickup" className="mt-4 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="pickup-name">Full Name</Label>
                      <Input id="pickup-name" className="mt-1.5" placeholder="John Doe" />
                    </div>
                    <div>
                      <Label htmlFor="pickup-phone">Phone Number</Label>
                      <Input id="pickup-phone" className="mt-1.5" placeholder="+91 9876543210" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="store">Select Pickup Location</Label>
                    <Select defaultValue="store1">
                      <SelectTrigger id="store" className="mt-1.5">
                        <SelectValue placeholder="Select a store" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="store1">KPRO Store - Indiranagar</SelectItem>
                        <SelectItem value="store2">KPRO Store - Koramangala</SelectItem>
                        <SelectItem value="store3">KPRO Store - HSR Layout</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">KPRO Store - Indiranagar</h3>
                        <p className="text-sm text-muted-foreground">
                          123 12th Main Road, Indiranagar, Bangalore - 560008
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>10AM - 8PM</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>All days</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="mb-1.5 block">Pickup Time</Label>
                    <RadioGroup defaultValue="tomorrow" className="space-y-3">
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="tomorrow" id="tomorrow" />
                          <div>
                            <Label htmlFor="tomorrow" className="cursor-pointer font-medium">
                              Next Day Pickup
                            </Label>
                            <p className="text-sm text-muted-foreground">Available tomorrow after 2:00 PM</p>
                          </div>
                        </div>
                        <div className="font-medium text-green-600">Free</div>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="today" id="today" />
                          <div>
                            <Label htmlFor="today" className="cursor-pointer font-medium">
                              Same Day Pickup
                            </Label>
                            <p className="text-sm text-muted-foreground">Available today after 7:00 PM</p>
                          </div>
                        </div>
                        <div className="font-medium">₹30.00</div>
                      </div>
                    </RadioGroup>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Payment Method */}
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xl">
                <CreditCard className="h-5 w-5 text-primary" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="cod" className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="cod" id="cod" />
                    <div>
                      <Label htmlFor="cod" className="cursor-pointer font-medium">
                        Cash on Delivery
                      </Label>
                      <p className="text-sm text-muted-foreground">Pay when your order is delivered</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="online" id="online" />
                    <div>
                      <Label htmlFor="online" className="cursor-pointer font-medium">
                        Online Payment
                      </Label>
                      <p className="text-sm text-muted-foreground">Pay with card, UPI, or net banking</p>
                    </div>
                  </div>
                </div>
              </RadioGroup>
              
              <div className="mt-4 rounded-lg border-2 border-dashed border-primary/20 bg-primary/5 p-4">
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <p className="text-muted-foreground">All payment information is secure and encrypted</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <div className="md:sticky md:top-20">
            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <FileText className="h-5 w-5 text-primary" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Document (A4, Color)</span>
                    <span>₹150.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Double-sided</span>
                    <span>-₹30.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Spiral Binding</span>
                    <span>₹60.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Copies</span>
                    <span>× 1</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹180.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {deliveryMethod === "delivery" ? "Delivery" : "Pickup Fee"}
                    </span>
                    <span>{deliveryMethod === "pickup" ? "Free" : "₹40.00"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes</span>
                    <span>₹36.00</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-primary">₹256.00</span>
                  </div>
                </div>
                
                <div className="mt-4 rounded-lg bg-secondary p-3">
                  <div className="flex items-center gap-2">
                    <Printer className="h-4 w-4 text-primary" />
                    <p className="text-sm font-medium">Ready by Tomorrow, 5:00 PM</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-2 pt-0">
                <Button 
                  onClick={handlePlaceOrder} 
                  className="w-full gap-2" 
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Place Order <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => router.push("/print/options")}
                  disabled={loading}
                >
                  Back to Options
                </Button>
              </CardFooter>
            </Card>
            
            <div className="mt-4 rounded-lg border px-4 py-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">100% Satisfaction Guarantee</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    If you're not satisfied with the quality of printing, we'll reprint or refund your order.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

