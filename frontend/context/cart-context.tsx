"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export interface CartItem {
    id: string
    title: string
    price: number
    image: string
}

interface CartContextType {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
    clearCart: () => void
    totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    // Load from local storage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('cart')
            if (saved) {
                try {
                    setItems(JSON.parse(saved))
                } catch (e) {
                    console.error("Failed to parse cart", e)
                }
            }
        }
    }, [])

    // Save to local storage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(items))
        }
    }, [items])

    const addItem = (newItem: CartItem) => {
        setItems((prev) => {
            if (prev.some(item => item.id === newItem.id)) return prev // No duplicates for digital products
            return [...prev, newItem]
        })
    }

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id))
    }

    const clearCart = () => {
        setItems([])
    }

    const totalPrice = items.reduce((sum, item) => sum + item.price, 0)

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalPrice }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
