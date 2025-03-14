import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star, Clock, Truck, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const featuredItems = [
  {
    id: 1,
    title: "Premium Business Cards",
    description: "400gsm matte-laminated cards with spot UV finishing",
    image: "/business-cards.jpg", // Placeholder - would be real in production
    price: "₹499",
    rating: 4.8,
    deliveryTime: "2-3 days",
    discount: "15% OFF",
    popular: true,
  },
  {
    id: 2,
    title: "Photo Album",
    description: "Customized 20-page hardcover photo album with premium lay-flat pages",
    image: "/photo-album.jpg", // Placeholder - would be real in production
    price: "₹1,499",
    rating: 4.9,
    deliveryTime: "3-5 days",
  },
  {
    id: 3,
    title: "Canvas Prints",
    description: "Gallery-quality canvas prints with wooden frame, multiple sizes available",
    image: "/canvas-print.jpg", // Placeholder - would be real in production
    price: "₹1,299",
    rating: 4.7,
    deliveryTime: "4-6 days",
    discount: "10% OFF",
  },
  {
    id: 4,
    title: "Marketing Flyers",
    description: "Professional flyers on 170gsm art paper, full color, double-sided",
    image: "/flyers.jpg", // Placeholder - would be real in production
    price: "₹799",
    rating: 4.6,
    deliveryTime: "1-2 days",
    popular: true,
  },
]

export default function FeaturedPrints() {
  return (
    <section className="mb-16 py-4">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="mb-2 inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            Featured Products
          </div>
          <h2 className="text-3xl font-semibold tracking-tight">Popular Print Products</h2>
          <p className="mt-2 text-muted-foreground">
            Our most ordered print products with quick turnaround times
          </p>
        </div>
        <Link 
          href="/print/products"
          className="text-sm font-medium text-primary hover:underline"
        >
          View All Products
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredItems.map((item) => (
          <Card key={item.id} className="group overflow-hidden border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary/60">
              {/* Image placeholder - in production, use real images */}
              <div className="flex h-full w-full items-center justify-center bg-secondary/30">
                <div className="text-4xl font-light text-secondary-foreground/40">
                  {item.title.split(' ')[0]}
                </div>
              </div>
              
              {/* Overlays */}
              {item.discount && (
                <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
                  {item.discount}
                </Badge>
              )}
              {item.popular && (
                <div className="absolute right-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current text-yellow-500" />
                    Popular
                  </div>
                </div>
              )}
            </div>
            
            <CardContent className="p-5">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {item.description}
              </p>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {item.deliveryTime}
                  </div>
                </div>
                <span className="text-lg font-bold text-primary">{item.price}</span>
              </div>
            </CardContent>
            
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Truck className="h-3.5 w-3.5" />
                Free delivery
              </div>
              <Button size="sm" variant="ghost" className="group-hover:bg-primary group-hover:text-primary-foreground">
                Order Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-10 flex justify-center">
        <Link href="/print/products">
          <Button variant="outline" className="gap-2 rounded-full">
            Explore All Print Products
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  )
}

