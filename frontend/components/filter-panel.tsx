"use client"
import { ChevronDown } from "lucide-react"

interface FilterPanelProps {
  categories: string[]
  ageGroups: string[]
  selectedCategory: string | null
  selectedAgeGroup: string | null
  onCategoryChange: (category: string | null) => void
  onAgeGroupChange: (ageGroup: string | null) => void
}

export default function FilterPanel({
  categories,
  ageGroups,
  selectedCategory,
  selectedAgeGroup,
  onCategoryChange,
  onAgeGroupChange,
}: FilterPanelProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-2">
      {/* Category Filter */}
      {/* Age Group Filter */}
      <div className="relative flex-1">
        <select
          value={selectedAgeGroup || ""}
          onChange={(e) => onAgeGroupChange(e.target.value || null)}
          className="w-full px-4 py-4 bg-white border-2 border-border rounded-xl focus:outline-none focus:border-primary text-body appearance-none cursor-pointer transition"
        >
          <option value="">Tất cả độ tuổi</option>
          {ageGroups.map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none w-5 h-5 text-foreground/50" />
      </div>
    </div>
  )
}
