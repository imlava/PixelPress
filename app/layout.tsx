import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ConditionalHeader from "@/components/conditional-header"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "PixelPress - Print Services",
  description: "Professional printing services at your fingertips",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ConditionalHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}