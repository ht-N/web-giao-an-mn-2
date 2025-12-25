"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { User } from "@/lib/api"
import { useCart } from "@/context/cart-context"
import { ShoppingCart, Sparkles, MonitorPlay } from "lucide-react"

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { items } = useCart()

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    const userData = localStorage.getItem("user")

    if (authStatus === "true" && userData) {
      try {
        setUser(JSON.parse(userData))
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Failed to parse user data:", error)
        localStorage.removeItem("user")
        localStorage.removeItem("isAuthenticated")
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("isAuthenticated")
    setUser(null)
    setIsAuthenticated(false)
    router.push("/")
  }

  const CartButton = () => (
    <Link href="/cart" className="relative px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/90 transition text-label shadow-md flex items-center gap-2">
      <ShoppingCart className="w-5 h-5" />
      <span className="hidden sm:inline">Giỏ hàng</span>
      {items.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
          {items.length}
        </span>
      )}
    </Link>
  )

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-primary-foreground">GA</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary font-heading">GiáoÁn+</h1>
              <p className="text-xs text-foreground/60 font-body">Giáo án mầm non tốt nhất</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-label font-body transition ${pathname === "/" ? "text-primary font-semibold" : "text-foreground hover:text-primary"
                }`}
            >
              Trang chủ
            </Link>

            <Link
              href="/ai"
              className={`text-label font-body transition flex items-center gap-1 ${pathname.startsWith("/ai") ? "text-purple-600 font-bold" : "text-purple-600 hover:text-purple-700"}`}
            >
              <Sparkles className="w-4 h-4" />
              Soạn bài
            </Link>

            <Link
              href="/slide-generator"
              className={`text-label font-body transition flex items-center gap-1 ${pathname.startsWith("/slide-generator") ? "text-pink-600 font-bold" : "text-pink-600 hover:text-pink-700"}`}
            >
              <MonitorPlay className="w-4 h-4" />
              AI tạo bài giảng
            </Link>

            <Link
              href="/chemlab"
              className={`text-label font-body transition ${pathname.startsWith("/chemlab") ? "text-primary font-semibold" : "text-foreground hover:text-primary"
                }`}
            >
              ChemLab
            </Link>
          </nav>

          {/* Login/Register/Cart Buttons or User Menu */}
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-small font-semibold text-foreground">{user.full_name}</p>
                    <p className="text-xs text-foreground/60">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-3 text-label font-semibold text-foreground hover:text-primary transition"
                  >
                    Đăng Xuất
                  </button>
                </div>
                <CartButton />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-6 py-3 text-label font-semibold text-foreground hover:text-primary transition"
                >
                  Đăng Nhập
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition text-label shadow-md"
                >
                  Đăng Ký
                </Link>
                <div className="ml-2">
                  <CartButton />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header >
  )
}
