"use client"

import { FileText, Eye, MessageSquare } from "lucide-react"
import Link from "next/link"
import { FileItem } from "@/lib/api"

interface CurriculumItem {
  id: string
  title: string
  description: string
  category: string
  ageGroup: string
  price: number
  image: string
  rating: number
  downloads: number
  views: number
  comments: number
  filePath?: string
  thumbnailUrl?: string | null
}

interface CurriculumGridProps {
  items: CurriculumItem[]
  currentPage: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export default function CurriculumGrid({ items, currentPage, itemsPerPage, onPageChange }: CurriculumGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 bg-background rounded-lg">
        <p className="text-heading text-foreground/50 mb-2 font-heading">Không tìm thấy giáo án phù hợp</p>
        <p className="text-body text-foreground/40 font-body">Hãy thử thay đổi bộ lọc</p>
      </div>
    )
  }

  const totalPages = Math.ceil(items.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedItems = items.slice(startIndex, endIndex)

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {paginatedItems.map((item) => {
          const fileUrl = item.filePath
            ? `/files/${item.id}?file_path=${encodeURIComponent(item.filePath)}`
            : `/files/${item.id}`

          return (
            <Link
              key={item.id}
              href={fileUrl}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all border border-border group cursor-pointer flex flex-col h-[600px]"
            >
              {/* Image - taller like A4 page */}
              <div className="relative h-64 overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={
                    item.thumbnailUrl
                      ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${item.thumbnailUrl}`
                      : item.image || "/placeholder.svg"
                  }
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to placeholder if thumbnail fails to load
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg"
                  }}
                />
              </div>

              {/* Content - compact spacing */}
              <div className="p-4 flex flex-col flex-grow">
                {/* Type Badge */}
                <div className="mb-3 inline-block bg-primary/10 text-primary px-3 py-1 rounded-md text-xs font-semibold font-heading w-fit">
                  {item.description}
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-foreground mb-3 line-clamp-4 font-heading leading-snug flex-grow">
                  {item.title}
                </h3>

                {/* Stats Row - compact */}
                <div className="flex items-center gap-4 text-small text-foreground/60 font-body border-t border-border pt-3 mt-auto">
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-xs">{item.downloads}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-xs">{item.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-xs">{item.comments}</span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border-2 border-border rounded-lg font-semibold text-foreground hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed transition text-label font-heading"
          >
            Trang trước
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded-lg font-semibold text-label transition font-heading ${currentPage === page
                ? "bg-primary text-primary-foreground"
                : "bg-white border-2 border-border text-foreground hover:bg-primary/5"
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white border-2 border-border rounded-lg font-semibold text-foreground hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed transition text-label font-heading"
          >
            Trang sau
          </button>
        </div>
      )}
    </div>
  )
}
