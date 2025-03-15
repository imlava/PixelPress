"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Printer,
  FileText,
  Image as ImageIcon,
  BookOpen,
  CreditCard,
  ChevronRight
} from "lucide-react"

const products = [
  {
    id: "doc-printing",
    title: "Document Printing",
    description: "High-quality printing for business documents, reports, and presentations",
    price: "From ₹5/page",
    icon: <FileText className="h-10 w-10 text-primary" />,
    features: ["Color & B/W options", "Multiple paper types", "Fast turnaround"],
    link: "/print/upload?category=documents"
  },
  {
    id: "photo-printing",
    title: "Photo Printing",
    description: "Premium photo prints in various sizes and finishes",
    price: "From ₹15/print",
    icon: <ImageIcon className="h-10 w-10 text-primary" />,
    features: ["Glossy, matte, or pearl finish", "Standard and custom sizes", "Color correction"],
    link: "/print/upload?category=photos"
  },
  {
    id: "booklet-printing",
    title: "Booklet & Brochure Printing",
    description: "Professional booklets and brochures for promotions and events",
    price: "From ₹150/booklet",
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    features: ["Multiple binding options", "Customizable layouts", "Premium paper options"],
    link: "/print/upload?category=booklets"
  },
  {
    id: "business-cards",
    title: "Business Cards",
    description: "Make a lasting impression with premium business cards",
    price: "From ₹250/100pcs",
    icon: <CreditCard className="h-10 w-10 text-primary" />,
    features: ["Standard and custom sizes", "Premium finishes", "Quick production"],
    link: "/print/upload?category=business-cards"
  },
]

export default function ProductsPage() {
  const router = useRouter()
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">Print Products</h1>
        <p className="mt-1.5 max-w-2xl text-sm md:text-base text-muted-foreground">
          Choose from our wide range of high-quality print products and services
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col border-2 h-full hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="mb-2">{product.icon}</div>
              <CardTitle>{product.title}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-4">
                <Badge variant="secondary" className="text-base font-semibold">{product.price}</Badge>
              </div>
              <ul className="space-y-1.5">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => router.push(product.link)} 
                className="w-full gap-1"
              >
                Order Now <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground mb-4">Don't see what you're looking for?</p>
        <Button onClick={() => router.push("/print/upload?category=custom")} variant="outline" className="gap-1">
          Request Custom Quote <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 