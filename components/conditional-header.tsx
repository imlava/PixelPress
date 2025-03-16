"use client"

import { usePathname } from "next/navigation"
import Header from "@/components/header"

export default function ConditionalHeader() {
  const pathname = usePathname()
  const isVendorPath = pathname?.startsWith('/vendor')

  if (isVendorPath) {
    return null
  }

  return <Header />
} 