"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronRight, 
  CheckCircle, 
  Download,
  Clock,
  MapPin,
  Phone,
  Mail,
  FileText,
  Printer,
  Share2,
  Home
} from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function ConfirmationPage() {
  const router = useRouter()
  const orderNumber = "PP-" + Math.floor(1000000 + Math.random() * 9000000)
  
  return (
    <div className="animate-in container mx-auto px-4 py-12">
      <div className="mb-8 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <Badge variant="outline" className="mb-2 px-3 py-1 text-xs text-muted-foreground">
            Order Confirmed
          </Badge>
        </div>
        <div className="flex items-center justify-center md:justify-start gap-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Thank you for your order!</h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          Order #{orderNumber} has been received and is being processed
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Clock className="h-5 w-5 text-primary" />
                Order Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-3 relative">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div className="absolute left-4 top-8 h-[calc(100%-16px)] w-0.5 bg-border"></div>
                  <div className="pt-0.5">
                    <h3 className="font-medium">Order Received</h3>
                    <p className="text-sm text-muted-foreground">Your order has been received and payment confirmed</p>
                    <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 relative">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Printer className="h-4 w-4" />
                  </div>
                  <div className="absolute left-4 top-8 h-[calc(100%-16px)] w-0.5 bg-border"></div>
                  <div className="pt-0.5">
                    <h3 className="font-medium">Processing Print Job</h3>
                    <p className="text-sm text-muted-foreground">Your files are being prepared for printing</p>
                    <p className="text-xs text-muted-foreground mt-1">Estimated: Today by 4:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 relative">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div className="absolute left-4 top-8 h-[calc(100%-16px)] w-0.5 bg-border"></div>
                  <div className="pt-0.5">
                    <h3 className="font-medium">Ready for Pickup/Delivery</h3>
                    <p className="text-sm text-muted-foreground">Your order will be ready for pickup or dispatched for delivery</p>
                    <p className="text-xs text-muted-foreground mt-1">Estimated: Tomorrow by 2:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div className="pt-0.5">
                    <h3 className="font-medium">Complete</h3>
                    <p className="text-sm text-muted-foreground">Your order will be marked as complete once delivered/picked up</p>
                    <p className="text-xs text-muted-foreground mt-1">Estimated: Tomorrow by 5:00 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="h-5 w-5 text-primary" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium uppercase text-muted-foreground">Document</h3>
                  <div className="mt-2 flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Project_Report.pdf</p>
                      <p className="text-sm text-muted-foreground">5 pages • 2.3 MB</p>
                      <Button variant="link" className="h-8 px-0 text-xs" asChild>
                        <Link href="#" className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          Download copy
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium uppercase text-muted-foreground">Print Configuration</h3>
                  <div className="mt-2 space-y-1.5 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Paper Type</span>
                      <span>Premium Matte</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Print Color</span>
                      <span>Full Color</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Paper Size</span>
                      <span>A4</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Orientation</span>
                      <span>Portrait</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Binding</span>
                      <span>Spiral Binding</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Copies</span>
                      <span>1</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xl">
                <MapPin className="h-5 w-5 text-primary" />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium uppercase text-muted-foreground">Delivery Method</h3>
                  <div className="mt-2 rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium">Store Pickup</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      PixelPress Store - Indiranagar<br />
                      123 12th Main Road, Indiranagar<br />
                      Bangalore - 560008
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">Ready for pickup by tomorrow after 2:00 PM</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium uppercase text-muted-foreground">Contact Information</h3>
                  <div className="mt-2 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Phone className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">+91 9876543210</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">john.doe@example.com</p>
                      </div>
                    </div>
                  </div>
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
                  <Printer className="h-5 w-5 text-primary" />
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
                    <span className="text-muted-foreground">Pickup Fee</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes</span>
                    <span>₹36.00</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-primary">₹216.00</span>
                  </div>
                </div>
                
                <div className="mt-4 rounded-lg bg-secondary p-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <p className="text-sm font-medium">Ready by Tomorrow, 2:00 PM</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-2 pt-0">
                <Button onClick={() => router.push("/vendor/dashboard")} className="w-full gap-2" size="lg">
                  Track Order <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => router.push("/")} className="w-full gap-2">
                  <Home className="h-4 w-4" /> Return to Home
                </Button>
              </CardFooter>
            </Card>
            
            <div className="mt-4 grid gap-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <Share2 className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Need Help?</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      For any queries related to your order, please contact our customer support team at support@pixelpress.ink or call us at +91-1800-123-4567.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button variant="ghost" className="w-full" onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" /> Print Receipt
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

