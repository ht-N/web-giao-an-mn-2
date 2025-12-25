"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

interface CarouselItem {
  id: string
  title: string
  description: string
  price: number
  image: string
  rating: number
}

interface FeaturedCarouselProps {
  items: CarouselItem[]
}

export default function FeaturedCarousel({ items }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [items.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  return (
    <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden bg-white shadow-lg">
      {/* Carousel Items */}
      <div className="relative w-full h-full">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ${index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
          >
            <div className="flex h-full">
              <div className="flex-1 relative">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
              </div>
              <div className="flex-1 flex flex-col justify-center px-8 bg-gradient-to-b from-primary/5 to-secondary/5">
                <div className="mb-4 inline-flex items-center gap-1 bg-accent/20 text-accent px-3 py-1 rounded-full w-fit">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-semibold">{item.rating}</span>
                </div>
                <h3 className="text-heading text-foreground mb-2">{item.title}</h3>
                <p className="text-body text-foreground/70 mb-6">{item.description}</p>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-primary">₫{item.price.toLocaleString()}</span>
                  <Link href={`/files/${item.id}`}>
                    <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition text-label">
                      Xem chi tiết
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-foreground rounded-full p-3 transition shadow-md z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-foreground rounded-full p-3 transition shadow-md z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition ${index === currentIndex ? "bg-primary w-8" : "bg-white/50 hover:bg-white/70 w-2"
              }`}
          />
        ))}
      </div>
    </div>
  )
}
