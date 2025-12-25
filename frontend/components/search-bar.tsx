"use client"
import { Search } from "lucide-react"

interface SearchBarProps {
  searchTerm: string
  onSearchChange: (term: string) => void
}

export default function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/50 w-6 h-6" />
      <input
        type="text"
        placeholder="Tìm kiếm giáo án..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-14 pr-4 py-4 bg-white border-2 border-border rounded-xl focus:outline-none focus:border-primary text-body placeholder:text-foreground/50 transition"
      />
    </div>
  )
}
