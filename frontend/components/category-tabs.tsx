"use client"

import { useState } from "react"

interface CategoryTabsProps {
  categories: string[]
}

export default function CategoryTabs({ categories }: CategoryTabsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <div>
      <h3 className="text-label text-foreground/70 mb-4 font-heading">Nhóm giáo án</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {/* All Button */}
        <button
          onClick={() => setSelectedCategory(null)}
          className={`p-4 rounded-lg font-semibold transition-all text-small text-center ${
            selectedCategory === null
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-white text-foreground border-2 border-border hover:border-primary"
          }`}
        >
          Tất cả
        </button>

        {/* Category Buttons */}
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`p-4 rounded-lg font-semibold transition-all text-small text-center line-clamp-2 ${
              selectedCategory === category
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-white text-foreground border-2 border-border hover:border-primary"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
