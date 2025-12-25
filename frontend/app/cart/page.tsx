"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import { useCart } from "@/context/cart-context"
import { Trash2, ArrowRight, Loader2, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { buyLesson, getAuthToken } from "@/lib/api"

export default function CartPage() {
    const { items, removeItem, clearCart, totalPrice } = useCart()
    const router = useRouter()
    const [processing, setProcessing] = useState(false)

    const handleCheckout = async () => {
        const token = getAuthToken()
        if (!token) {
            // Redirect to login with return url
            router.push("/login")
            return
        }

        if (items.length === 0) return

        setProcessing(true)

        try {
            // Simulate processing delay
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Buy each item
            // Note: Ideally backend should have a bulk 'create order' endpoint. 
            // We will just loop here for MVP as requested.
            const purchasePromises = items.map(item => buyLesson(item.id))
            await Promise.all(purchasePromises)

            alert("Thanh toán thành công! Cảm ơn bạn đã mua hàng.")
            clearCart()
            router.push("/")
        } catch (err: any) {
            console.error(err)
            alert("Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.")
        } finally {
            setProcessing(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Giỏ hàng của bạn</h1>

                {items.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ArrowRight className="w-10 h-10 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Giỏ hàng trống</h2>
                        <p className="text-gray-500 mb-8">Bạn chưa thêm giáo án nào vào giỏ hàng.</p>
                        <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90">
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex gap-4 items-center">
                                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                        <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-semibold text-gray-900 line-clamp-2">{item.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1">Giáo án điện tử</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-primary">{item.price.toLocaleString()}đ</p>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-500 hover:text-red-700 p-2 mt-2 transition"
                                            title="Xóa khỏi giỏ hàng"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Tóm tắt đơn hàng</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tạm tính ({items.length} sản phẩm)</span>
                                        <span>{totalPrice.toLocaleString()}đ</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Giảm giá</span>
                                        <span>0đ</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-900">Tổng cộng</span>
                                        <span className="text-2xl font-bold text-primary">{totalPrice.toLocaleString()}đ</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={handleCheckout}
                                        disabled={processing}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-4 border border-transparent text-lg font-bold rounded-lg text-white bg-green-600 hover:bg-green-700 shadow-md transform transition hover:-translate-y-1 disabled:opacity-70 disabled:transform-none"
                                    >
                                        {processing ? <Loader2 className="animate-spin" /> : "Thanh Toán Ngay"}
                                    </button>
                                    <p className="text-xs text-center text-gray-500">
                                        Bằng cách thanh toán, bạn đồng ý với điều khoản sử dụng của chúng tôi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
