"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Trash2, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

const paymentMethods = [
  {
    id: 1,
    type: "credit",
    name: "Personal Visa",
    number: "**** **** **** 4242",
    expiry: "09/26",
    isDefault: true,
  },
  {
    id: 2,
    type: "credit",
    name: "Business MasterCard",
    number: "**** **** **** 5678",
    expiry: "12/24",
    isDefault: false,
  },
]

export default function PaymentPage() {
  const [methods, setMethods] = useState(paymentMethods)
  const [selectedMethod, setSelectedMethod] = useState(methods.find(m => m.isDefault)?.id.toString() || "")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const handleDelete = (id: number) => {
    setMethods(methods.filter(method => method.id !== id))
    toast({
      title: "Payment method removed",
      description: "The payment method has been removed from your account.",
    })
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsDialogOpen(false)
      toast({
        title: "Payment method added",
        description: "Your new payment method has been added successfully.",
      })
    }, 1000)
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Payment Methods</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your payment methods and billing preferences
        </p>
      </div>
      
      <Separator />
      
      <RadioGroup
        value={selectedMethod}
        onValueChange={setSelectedMethod}
        className="space-y-3"
      >
        {methods.map((method) => (
          <div key={method.id} className="flex items-center">
            <RadioGroupItem
              value={method.id.toString()}
              id={`payment-${method.id}`}
              className="peer sr-only"
            />
            <Label
              htmlFor={`payment-${method.id}`}
              className="flex flex-1 items-center justify-between rounded-md border border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div>
                  <div className="font-medium">{method.name}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">
                    {method.number} · Expires {method.expiry}
                  </div>
                  {method.isDefault && (
                    <div className="mt-1">
                      <span className="text-xs rounded-full bg-primary/10 text-primary px-2 py-0.5">
                        Default
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => handleDelete(method.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-2 gap-1">
            <Plus className="h-4 w-4" /> Add payment method
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add payment method</DialogTitle>
            <DialogDescription>
              Add a new credit or debit card to your account
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Cardholder name</Label>
                <Input id="name" placeholder="Name on card" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="number">Card number</Label>
                <Input id="number" placeholder="1234 5678 9012 3456" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expiry">Expiry date</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" required />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="default" className="rounded border-gray-300" />
                <Label htmlFor="default">Make default payment method</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add card"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <Separator className="my-4" />
      
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>Manage your billing details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="billing-name">Name</Label>
            <Input id="billing-name" defaultValue="John Doe" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="billing-email">Email</Label>
            <Input id="billing-email" defaultValue="john.doe@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="billing-address">Address</Label>
            <Input id="billing-address" defaultValue="123 Main Street" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="billing-city">City</Label>
              <Input id="billing-city" defaultValue="Mumbai" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="billing-state">State</Label>
              <Input id="billing-state" defaultValue="Maharashtra" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="billing-zip">Postal Code</Label>
              <Input id="billing-zip" defaultValue="400001" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save billing information</Button>
        </CardFooter>
      </Card>
    </div>
  )
} 