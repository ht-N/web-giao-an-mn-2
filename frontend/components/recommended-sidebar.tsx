"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Loader2 } from "lucide-react"
import { fetchFiles, type FileItem } from "@/lib/api"
import { useRouter } from "next/navigation"

export default function RecommendedSidebar() {
  const [items, setItems] = useState<FileItem[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadRecommended = async () => {
      try {
        setLoading(true)
        // Fetch a few lessons as "recommendations"
        const data = await fetchFiles()
        // Take 5 random or latest items
        const shuffled = [...data.items].sort(() => 0.5 - Math.random())
        setItems(shuffled.slice(0, 5))
      } catch (err) {
        console.error("Failed to load recommended items:", err)
      } finally {
        setLoading(false)
      }
    }

    loadRecommended()
  }, [])

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border-2 border-primary/20 p-6 flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="w-6 h-6 animate-spin text-primary mb-2" />
        <p className="text-xs text-gray-400">Đang tìm đề xuất...</p>
      </div>
    )
  }

  if (items.length === 0) return null

  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border-2 border-primary/20 p-6">
      <h3 className="text-label text-foreground mb-5 font-heading">📌 Giáo án / Bài giảng đề xuất</h3>

      <div className="space-y-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(`/files/${item.id}`)}
            className="w-full text-left p-3 rounded-lg bg-white border-2 border-transparent hover:border-primary/30 hover:shadow-sm transition-all group shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <p className="text-small text-foreground font-body font-medium line-clamp-2 group-hover:text-primary transition leading-snug">
                  {item.title}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded italic">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-gray-400 font-body">
                    {item.price === 0 ? "Miễn phí" : `${item.price.toLocaleString()}đ`}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-primary/60 group-hover:text-primary flex-shrink-0 mt-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
