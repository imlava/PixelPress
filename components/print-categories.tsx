import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, ImageIcon, CreditCard, FileIcon as FilePresentation, BookOpen, Printer, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const categories = [
  {
    name: "Documents",
    icon: FileText,
    description: "Print documents, reports, and essays",
    href: "/print/upload?category=documents",
    popular: true,
    examples: ["Reports", "Essays", "Presentations"]
  },
  {
    name: "Photos",
    icon: ImageIcon,
    description: "High-quality photo prints in various sizes",
    href: "/print/upload?category=photos",
    examples: ["4x6", "5x7", "8x10"]
  },
  {
    name: "Business Cards",
    icon: CreditCard,
    description: "Professional business cards with custom designs",
    href: "/print/upload?category=business-cards",
    examples: ["Standard", "Premium", "Folded"]
  },
  {
    name: "Posters",
    icon: FilePresentation,
    description: "Large format posters for events and promotions",
    href: "/print/upload?category=posters",
    examples: ["A3", "A2", "A1"]
  },
  {
    name: "Booklets",
    icon: BookOpen,
    description: "Bound booklets and catalogs",
    href: "/print/upload?category=booklets",
    examples: ["Saddle Stitch", "Perfect Bound", "Wire-O"]
  },
  {
    name: "Custom Prints",
    icon: Printer,
    description: "Specialized printing services",
    href: "/print/upload?category=custom",
    examples: ["Banners", "Stickers", "Canvas"]
  },
]

export default function PrintCategories() {
  return (
    <section className="mb-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="mb-2 inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            Print Services
          </div>
          <h2 className="text-3xl font-semibold tracking-tight">Print Categories</h2>
          <p className="mt-2 text-muted-foreground">
            Select from our wide range of professional printing services
          </p>
        </div>
        <Link 
          href="/print"
          className="text-sm font-medium text-primary hover:underline"
        >
          View All Services
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <Link key={category.name} href={category.href} className="group block">
            <Card className={cn(
              "h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
              "border-2"
            )}>
              <CardContent className="p-0">
                <div className="relative flex aspect-[4/3] items-center justify-center bg-secondary/50">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <category.icon className="h-8 w-8" />
                  </div>
                  {category.popular && (
                    <Badge className="absolute right-3 top-3 bg-primary">Popular</Badge>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
                  
                  <div className="mt-3 flex flex-wrap gap-1">
                    {category.examples.map((example) => (
                      <Badge key={example} variant="outline" className="font-normal">
                        {example}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between text-sm font-medium text-primary">
                    <span>Get Started</span>
                    <ArrowRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

