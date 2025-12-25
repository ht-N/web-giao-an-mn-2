import type React from "react"
import type { Metadata } from "next"
import { Poppins, Sora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
})

export const metadata: Metadata = {
  title: "GiáoÁn+ - Giáo Án Mầm Non Chất Lượng",
  description: "Tìm các giáo án sáng tạo, hiệu quả để dạy trẻ phát triển toàn diện",
  generator: "v0.app",
}

import Header from "@/components/header"
import { CartProvider } from "@/context/cart-context"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`${poppins.variable} ${sora.variable} font-body antialiased`} suppressHydrationWarning>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
