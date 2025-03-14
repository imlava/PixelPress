"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  Settings,
  CreditCard,
  ChevronRight,
  FileText,
  Printer,
  Clock,
  Check,
  ShieldCheck
} from "lucide-react"

export default function PrintPage() {
  const router = useRouter()
  
  return (
    <div className="animate-in container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2">
          <Printer className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">KPRO Print Service</h1>
        </div>
        <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
          High-quality printing services for all your documents. Upload your files, customize your printing options, and get them delivered or pick them up.
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
        <Card className="border-2">
          <CardHeader className="pb-3">
            <Badge className="w-fit mb-2">Step 1</Badge>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Upload Files
            </CardTitle>
            <CardDescription>Upload your documents or choose from templates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="rounded-lg bg-muted p-3">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <p className="text-sm">Multiple file formats supported</p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Check className="h-4 w-4 text-primary" />
                <p className="text-sm">Secure file handling</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/print/upload")} className="w-full">
              Start Here
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border-2">
          <CardHeader className="pb-3">
            <Badge className="w-fit mb-2" variant="outline">Step 2</Badge>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Customize Options
            </CardTitle>
            <CardDescription>Choose paper, binding and more</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="rounded-lg bg-muted p-3">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <p className="text-sm">Multiple paper types and sizes</p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Check className="h-4 w-4 text-primary" />
                <p className="text-sm">Professional binding options</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/print/options")} variant="outline" className="w-full">
              Configure Options
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border-2">
          <CardHeader className="pb-3">
            <Badge className="w-fit mb-2" variant="outline">Step 3</Badge>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Checkout
            </CardTitle>
            <CardDescription>Securely complete your order</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="rounded-lg bg-muted p-3">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <p className="text-sm">Multiple payment options</p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Check className="h-4 w-4 text-primary" />
                <p className="text-sm">Delivery or pickup options</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/print/checkout")} variant="outline" className="w-full">
              Proceed to Checkout
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border-2">
          <CardHeader className="pb-3">
            <Badge className="w-fit mb-2" variant="outline">Final Step</Badge>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Order Tracking
            </CardTitle>
            <CardDescription>Monitor your print job status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="rounded-lg bg-muted p-3">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <p className="text-sm">Real-time order updates</p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Check className="h-4 w-4 text-primary" />
                <p className="text-sm">Confirmation and notifications</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/print/confirmation")} variant="outline" className="w-full">
              Track Order
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold tracking-tight mb-6 text-center">Why Choose KPRO Print Service?</h2>
        
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Printer className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium">High Quality Printing</h3>
            <p className="mt-2 text-muted-foreground">
              Professional grade printing equipment for crystal clear documents and vibrant colors.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium">Quick Turnaround</h3>
            <p className="mt-2 text-muted-foreground">
              Speedy processing with same-day and next-day options for your time-sensitive documents.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium">100% Satisfaction</h3>
            <p className="mt-2 text-muted-foreground">
              If you're not happy with your prints, we'll reprint them or provide a full refund.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <Button size="lg" onClick={() => router.push("/print/upload")} className="gap-2">
          Start Printing Now <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 