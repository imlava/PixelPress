"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  ArrowRight,
  FileText,
  CheckCircle,
  Printer, 
  Copy, 
  Image,
  BookOpen,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Plus,
  Minus
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export default function PrintOptionsPage() {
  const router = useRouter()
  const [paperType, setPaperType] = useState("standard")
  const [printColor, setPrintColor] = useState("color")
  const [paperSize, setPaperSize] = useState("a4")
  const [orientation, setOrientation] = useState("portrait")
  const [copies, setCopies] = useState(1)
  const [doubleSided, setDoubleSided] = useState(true)
  const [binding, setBinding] = useState("none")
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  const handleContinue = () => {
    // Navigate to checkout page
    router.push("/print/checkout")
  }
  
  const calculateTotal = () => {
    // Base price per page
    let basePrice = printColor === "color" ? 12 : 5; // "bw" is the non-color option
    
    // Adjust for paper type
    if (paperType === "premium") basePrice += 3;
    if (paperType === "heavyweight") basePrice += 5;
    if (paperType === "glossy") basePrice += 8;
    
    // Paper size adjustment
    if (paperSize === "a3") basePrice *= 1.5;
    if (paperSize === "a5") basePrice *= 0.75;
    if (paperSize === "letter") basePrice *= 1.1;
    if (paperSize === "legal") basePrice *= 1.2;
    
    // Binding cost
    let bindingCost = 0;
    if (binding === "staple") bindingCost = 25;
    if (binding === "spiral") bindingCost = 50;
    if (binding === "perfect") bindingCost = 80;
    
    // Assume 10 pages for demo purposes
    const pages = 10;
    
    // Calculate subtotal
    let subtotal = (basePrice * pages * (doubleSided ? 0.8 : 1)) * copies + bindingCost;
    
    // Format as Rupees
    return `₹${subtotal.toFixed(2)}`;
  }
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <div className="flex items-center">
          <Badge variant="outline" className="mb-2 px-3 py-1 text-xs text-muted-foreground">
            Step 2 of 3: Customize Options
          </Badge>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">Print Options</h1>
        <p className="mt-1.5 max-w-2xl text-sm md:text-base text-muted-foreground">
          Customize your printing preferences
        </p>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Basic Options</CardTitle>
              <CardDescription>Configure essential print settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="paper-type">Paper Type</Label>
                  <Select value={paperType} onValueChange={setPaperType}>
                    <SelectTrigger id="paper-type">
                      <SelectValue placeholder="Select paper type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (80 gsm)</SelectItem>
                      <SelectItem value="premium">Premium (100 gsm)</SelectItem>
                      <SelectItem value="heavyweight">Heavyweight (160 gsm)</SelectItem>
                      <SelectItem value="glossy">Glossy Photo Paper</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="print-color">Print Color</Label>
                  <Select value={printColor} onValueChange={setPrintColor}>
                    <SelectTrigger id="print-color">
                      <SelectValue placeholder="Select color option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="color">Full Color</SelectItem>
                      <SelectItem value="bw">Black & White</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="paper-size">Paper Size</Label>
                  <Select value={paperSize} onValueChange={setPaperSize}>
                    <SelectTrigger id="paper-size">
                      <SelectValue placeholder="Select paper size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a4">A4 (210 × 297 mm)</SelectItem>
                      <SelectItem value="a5">A5 (148 × 210 mm)</SelectItem>
                      <SelectItem value="letter">US Letter (8.5 × 11 in)</SelectItem>
                      <SelectItem value="legal">US Legal (8.5 × 14 in)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="orientation">Orientation</Label>
                  <Select value={orientation} onValueChange={setOrientation}>
                    <SelectTrigger id="orientation">
                      <SelectValue placeholder="Select orientation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portrait">Portrait</SelectItem>
                      <SelectItem value="landscape">Landscape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="copies">Number of Copies</Label>
                  <div className="flex">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="rounded-r-none"
                      onClick={() => setCopies(Math.max(1, copies - 1))}
                      disabled={copies <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="copies"
                      type="number"
                      value={copies}
                      onChange={(e) => setCopies(parseInt(e.target.value) || 1)}
                      min={1}
                      max={100}
                      className="h-10 rounded-none text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="rounded-l-none"
                      onClick={() => setCopies(Math.min(100, copies + 1))}
                      disabled={copies >= 100}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="double-sided">Double-sided Printing</Label>
                    <Switch
                      id="double-sided"
                      checked={doubleSided}
                      onCheckedChange={setDoubleSided}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Print on both sides of the paper to save resources
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="binding">Binding Option</Label>
                <RadioGroup value={binding} onValueChange={setBinding} className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="binding-none" />
                    <Label htmlFor="binding-none" className="font-normal">
                      None
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="staple" id="binding-staple" />
                    <Label htmlFor="binding-staple" className="font-normal">
                      Stapled
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="spiral" id="binding-spiral" />
                    <Label htmlFor="binding-spiral" className="font-normal">
                      Spiral Bound
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="perfect" id="binding-perfect" />
                    <Label htmlFor="binding-perfect" className="font-normal">
                      Perfect Bound
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span>Advanced Options</span>
                <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={() => setShowAdvanced(!showAdvanced)}>
                  {showAdvanced ? (
                    <>
                      <ChevronUp className="h-3.5 w-3.5" />
                      <span>Hide</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3.5 w-3.5" />
                      <span>Show</span>
                    </>
                  )}
                </Button>
              </CardTitle>
              <CardDescription>Fine-tune your print job with advanced settings</CardDescription>
            </CardHeader>
            {showAdvanced && (
              <CardContent className="space-y-4">
                <Accordion type="single" collapsible defaultValue="scaling">
                  <AccordionItem value="scaling">
                    <AccordionTrigger className="text-sm">Scaling Options</AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4 space-y-4">
                      <RadioGroup defaultValue="100" className="flex flex-col space-y-3">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="100" id="scaling-100" />
                          <Label htmlFor="scaling-100" className="font-normal">
                            100% (Original Size)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fit" id="scaling-fit" />
                          <Label htmlFor="scaling-fit" className="font-normal">
                            Fit to Page
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="custom" id="scaling-custom" />
                          <Label htmlFor="scaling-custom" className="font-normal">
                            Custom Scale
                          </Label>
                        </div>
                      </RadioGroup>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          placeholder="Scale %"
                          className="w-24"
                          defaultValue="100"
                          min="10"
                          max="400"
                        />
                        <span className="text-sm">%</span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="pages">
                    <AccordionTrigger className="text-sm">Page Options</AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="page-range">Page Range</Label>
                        <RadioGroup defaultValue="all" className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="range-all" />
                            <Label htmlFor="range-all" className="font-normal">
                              All Pages
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="custom" id="range-custom" />
                            <div className="flex flex-col">
                              <Label htmlFor="range-custom" className="font-normal">
                                Custom Range
                              </Label>
                              <div className="mt-1 text-xs text-muted-foreground">
                                e.g., 1-5, 8, 11-13
                              </div>
                            </div>
                          </div>
                        </RadioGroup>
                        <Input id="page-range" placeholder="1-5, 8, 11-13" className="mt-1" />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="quality">
                    <AccordionTrigger className="text-sm">Quality & Finishing</AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="print-quality">Print Quality</Label>
                        <Select defaultValue="standard">
                          <SelectTrigger id="print-quality">
                            <SelectValue placeholder="Select quality" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="photo">Photo Quality</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="space-y-0.5">
                          <Label htmlFor="collate">Collate Copies</Label>
                          <p className="text-xs text-muted-foreground">
                            Group pages in sequential order
                          </p>
                        </div>
                        <Switch id="collate" defaultChecked />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            )}
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Document Preview</CardTitle>
              <CardDescription>Your document with current settings</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-[3/4] bg-muted flex items-center justify-center">
                <div className={cn(
                  "relative border-2 transition-all duration-200 bg-white flex items-center justify-center",
                  orientation === "portrait" ? "aspect-[3/4] w-2/3" : "aspect-[4/3] w-3/4"
                )}>
                  <FileText className="h-12 w-12 text-muted-foreground/50" />
                  <div className="absolute bottom-3 left-3 right-3 bg-black/5 text-xs text-center p-1 rounded">
                    filename.pdf • {paperSize.toUpperCase()} • {orientation}
                  </div>
                </div>
              </div>
              <div className="border-t p-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Document</span>
                    <span className="text-sm">filename.pdf</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Pages</span>
                    <span className="text-sm">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">File Size</span>
                    <span className="text-sm">2.4 MB</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Print Summary</CardTitle>
              <CardDescription>Selected options and pricing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Paper Type:</span>
                  <span>{paperType === "standard" ? "Standard (80 gsm)" :
                  paperType === "premium" ? "Premium (100 gsm)" :
                  paperType === "heavyweight" ? "Heavyweight (160 gsm)" : "Glossy Photo Paper"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Print Color:</span>
                  <span>{printColor === "color" ? "Full Color" : "Black & White"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Paper Size:</span>
                  <span>{paperSize === "a4" ? "A4" :
                  paperSize === "a5" ? "A5" :
                  paperSize === "letter" ? "Letter" : "Legal"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Double-sided:</span>
                  <span>{doubleSided ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Binding:</span>
                  <span>{binding === "none" ? "None" :
                  binding === "staple" ? "Stapled" :
                  binding === "spiral" ? "Spiral Bound" : "Perfect Bound"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Copies:</span>
                  <span>{copies}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Total Estimate:</span>
                  <span className="font-medium">{calculateTotal()}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Final price may vary based on actual page count and vendor
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pt-0">
              <Button className="w-full gap-2" onClick={handleContinue}>
                Continue to Checkout
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full gap-2" onClick={() => router.push("/print/upload")}>
                <ArrowLeft className="h-4 w-4" />
                Back to Upload
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

