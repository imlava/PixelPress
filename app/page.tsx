import Link from "next/link"
import { Button } from "@/components/ui/button"
import PrintCategories from "@/components/print-categories"
import HowItWorks from "@/components/how-it-works"
import FeaturedPrints from "@/components/featured-prints"
import { BookOpen, Calendar, CheckCircle, Clock, FileText, Printer, Truck } from "lucide-react"

export default function Home() {
  return (
    <div className="animate-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-white py-16 dark:from-green-950/30 dark:to-background lg:py-24">
        <div className="absolute inset-0 z-0 opacity-70 dark:opacity-20">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="dots" width="4" height="4" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.5" fill="currentColor" className="text-primary/20" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#dots)" />
          </svg>
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
            <div className="max-w-2xl space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                <span className="mr-1 text-xs">✨</span> Premium printing services
              </div>
              <h1 className="font-semibold">Professional Printing <span className="text-primary">On Demand</span></h1>
              <p className="text-lg text-muted-foreground">
                Highest quality printing for all your needs - documents, photos, business cards, and more. Fast delivery and competitive prices through our trusted vendors.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <Link href="/print/upload">
                  <Button size="lg" className="gap-2 rounded-full shadow-lg shadow-primary/20">
                    <Printer className="h-4 w-4" />
                    Start Printing Now
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline" className="gap-2 rounded-full">
                    How It Works
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-muted-foreground lg:justify-start">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Trusted Vendors</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Fast Turnaround</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Reliable Delivery</span>
                </div>
              </div>
            </div>
            <div className="relative hidden rounded-2xl border bg-card p-1 shadow-2xl lg:block">
              <div className="relative aspect-[4/3] w-[400px] overflow-hidden rounded-xl bg-secondary">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-2 p-4">
                    <div className="aspect-[3/4] rounded-lg bg-white shadow-md"></div>
                    <div className="aspect-square rounded-lg bg-white shadow-md"></div>
                    <div className="aspect-square rounded-lg bg-white shadow-md"></div>
                    <div className="aspect-[3/4] rounded-lg bg-white shadow-md"></div>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-secondary to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-primary/20 bg-card p-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Document Printing</div>
                      <div className="text-xs text-muted-foreground">Ready in 2 hours</div>
                    </div>
                    <div className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">Popular</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Print Categories */}
      <div className="container mx-auto px-4 py-16">
        <PrintCategories />
        <div id="how-it-works" className="scroll-mt-16">
          <HowItWorks />
        </div>
        <FeaturedPrints />
      </div>
    </div>
  )
}

