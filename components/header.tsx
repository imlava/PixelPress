"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  ShoppingCart, 
  Menu, 
  Search, 
  User, 
  ChevronDown, 
  X, 
  FileText,
  ImageIcon,
  CreditCard,
  BookOpen,
  Printer
} from "lucide-react"
import { Store } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./mode-toggle"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

const categories = [
  { name: "Home", href: "/" },
  { 
    name: "Print Services", 
    href: "/print", 
    active: true, 
    submenu: [
      { name: "Documents", href: "/print/upload?category=documents", icon: FileText },
      { name: "Photos", href: "/print/upload?category=photos", icon: ImageIcon },
      { name: "Business Cards", href: "/print/upload?category=business-cards", icon: CreditCard },
      { name: "Booklets", href: "/print/upload?category=booklets", icon: BookOpen },
      { name: "Custom Prints", href: "/print/upload?category=custom", icon: Printer },
    ]
  },
  { name: "Stationery", href: "#" },
  { name: "Office Supplies", href: "#" }
]

export default function Header() {
  const router = useRouter()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [cartCount, setCartCount] = useState(2)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleAddToCart = () => {
    setCartCount(prevCount => prevCount + 1)
  }

  const navigateToCart = () => {
    router.push("/cart")
  }

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-all",
      scrolled ? "shadow-sm" : ""
    )}>
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex w-[300px] flex-col p-0 sm:w-[380px] [&>button:last-child]:hidden">
            <div className="border-b px-4 py-3">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                  <span className="text-xl font-bold">KPRO</span>
                </Link>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10" aria-label="Close menu">
                    <X className="h-5 w-5" />
                  </Button>
                </SheetClose>
              </div>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <div className="px-1">
                <div className="flex border-b pb-2">
                  <Input 
                    type="search"
                    placeholder="Search..."
                    className="h-9"
                  />
                </div>
                <nav className="flex flex-col gap-1 py-2">
                  {categories.map((category) => (
                    <div key={category.name}>
                      {category.submenu ? (
                        <div className="space-y-1">
                          <div 
                            className={cn(
                              "flex cursor-default items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                              category.active ? "text-primary" : "text-foreground"
                            )}
                            onClick={() => setActiveCategory(activeCategory === category.name ? null : category.name)}
                          >
                            <span>{category.name}</span>
                            <ChevronDown className={cn(
                              "h-4 w-4 transition-transform",
                              activeCategory === category.name ? "rotate-180" : ""
                            )} />
                          </div>
                          {activeCategory === category.name && (
                            <div className="ml-4 space-y-1">
                              {category.submenu.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary"
                                >
                                  <item.icon className="h-4 w-4 text-muted-foreground" />
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={category.href}
                          className={cn(
                            "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                            category.active ? "text-primary" : "text-foreground"
                          )}
                        >
                          {category.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </div>
            <div className="border-t p-4">
              <div className="flex flex-col gap-2">
                <div className="space-y-2 border rounded-md p-2">
                  <div className="flex items-center px-2 py-1">
                    <User className="h-4 w-4 mr-2" />
                    <span className="font-medium">Account</span>
                  </div>
                  <div className="space-y-1 pl-2">
                    <Link 
                      href="/account/profile" 
                      className="flex items-center gap-2 text-sm rounded-md px-3 py-1.5 transition-colors hover:bg-secondary"
                    >
                      Profile
                    </Link>
                    <Link 
                      href="/account/orders" 
                      className="flex items-center gap-2 text-sm rounded-md px-3 py-1.5 transition-colors hover:bg-secondary"
                    >
                      My Orders
                    </Link>
                    <Link 
                      href="/vendor/dashboard" 
                      className="flex items-center gap-2 text-sm rounded-md px-3 py-1.5 transition-colors hover:bg-secondary"
                    >
                      <Store className="h-4 w-4 mr-1" />
                      Vendor Dashboard
                    </Link>
                    <Link 
                      href="/auth/signout" 
                      className="flex items-center gap-2 text-sm rounded-md px-3 py-1.5 transition-colors hover:bg-secondary text-destructive"
                    >
                      Sign Out
                    </Link>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="justify-start gap-2 relative"
                  onClick={navigateToCart}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Cart
                  <Badge className="absolute right-2 h-5 w-5 flex items-center justify-center p-0">{cartCount}</Badge>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="text-xs font-bold">K</span>
            <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-primary">P</div>
          </div>
          <span className="hidden text-xl font-bold md:inline-block">KPRO</span>
        </Link>

        <nav className="hidden md:flex md:gap-1 lg:gap-2">
          {categories.map((category) => (
            <div key={category.name} className="relative">
              {category.submenu ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                        category.active ? "text-primary" : "text-foreground"
                      )}
                    >
                      {category.name}
                      <ChevronDown className="h-4 w-4" />
                      {category.active && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    {category.submenu.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link href={item.href} className="flex w-full items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href={category.href}
                  className={cn(
                    "relative flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                    category.active ? "text-primary" : "text-foreground"
                  )}
                >
                  {category.name}
                  {category.active && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-1 md:space-x-2">
          {isSearchOpen ? (
            <div className="relative flex w-full max-w-sm items-center md:w-auto">
              <Input
                type="search"
                placeholder="Search..."
                className="h-9 pr-9"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
              <Button variant="ghost" size="icon" className="absolute right-0" onClick={() => setIsSearchOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="h-9 w-9">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <User className="h-4 w-4" />
                <span className="sr-only">Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/account/profile" className="flex cursor-pointer items-center gap-2">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/account/orders" className="flex cursor-pointer items-center gap-2">
                  My Orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/vendor/dashboard" className="flex cursor-pointer items-center gap-2">
                  <Store className="h-4 w-4 mr-2" />
                  Vendor Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/auth/signout" className="flex cursor-pointer items-center gap-2">
                  Sign Out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="ghost" 
            size="icon" 
            className="relative h-9 w-9"
            onClick={navigateToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            <Badge className="absolute -right-1 -top-1 h-4 w-4 p-0 text-[10px]">{cartCount}</Badge>
            <span className="sr-only">Cart</span>
          </Button>

          <div className="hidden md:block">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

