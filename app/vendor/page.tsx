"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Printer } from "lucide-react"

export default function VendorIndexPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to the dashboard
    router.push("/vendor/dashboard")
  }, [router])
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="animate-pulse flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Printer className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">PixelPress Vendor Portal</h1>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    </div>
  )
} 