import { ArrowLeft, ChevronRight, Printer } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PrintLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to home</span>
              </Link>
            </Button>
            <div className="flex items-center gap-1.5">
              <Printer className="h-5 w-5 text-primary" />
              <h1 className="font-semibold">PixelPress Print Service</h1>
            </div>
          </div>
          <Tabs defaultValue="upload" className="hidden sm:block">
            <TabsList className="grid w-[400px] grid-cols-3">
              <TabsTrigger value="upload" asChild>
                <Link href="/print/upload" className="cursor-pointer">Upload</Link>
              </TabsTrigger>
              <TabsTrigger value="options" asChild>
                <Link href="/print/options" className="cursor-pointer">Options</Link>
              </TabsTrigger>
              <TabsTrigger value="checkout" asChild>
                <Link href="/print/checkout" className="cursor-pointer">Checkout</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="https://pixelpress.ink" className="gap-1">
                Back to PixelPress <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
} 