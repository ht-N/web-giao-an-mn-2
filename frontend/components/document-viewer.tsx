"use client"

import { useState, useEffect } from "react"
import { API_BASE_URL } from "@/lib/api"


interface DocumentViewerProps {
  fileId: string
  filePath: string
  fileName: string
  fileExtension: string
  onDownload?: () => void
}

export default function DocumentViewer({
  fileId,
  filePath,
  fileName,
  fileExtension,
  onDownload,
}: DocumentViewerProps) {
  const [viewUrl, setViewUrl] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [viewerType, setViewerType] = useState<"iframe" | "image" | "office" | "unsupported" | null>(null)

  useEffect(() => {
    if (!fileId || !filePath) {
      setLoading(false)
      setError("Không tìm thấy file")
      setViewerType("unsupported")
      return
    }

    const loadViewer = async () => {
      try {
        setLoading(true)
        setError(null)
        setViewerType(null)


        const queryParams = new URLSearchParams()
        queryParams.append("file_path", filePath)

        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
        if (token) queryParams.append("token", token)

        // Ensure extension has dot
        let ext = (fileExtension || '').toLowerCase()
        if (ext && !ext.startsWith('.')) ext = '.' + ext

        const directViewUrl = `${API_BASE_URL}/api/files/${fileId}/view?${queryParams.toString()}`

        if (ext === ".pdf") {
          setViewUrl(directViewUrl)
          setViewerType("iframe")
        } else if ([".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp"].includes(ext)) {
          setViewUrl(directViewUrl)
          setViewerType("image")
        } else if ([".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx"].includes(ext)) {
          const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")

          if (isLocalhost) {
            setViewerType("unsupported")
            setError("Chế độ xem trước tài liệu Office (Word/Excel/PowerPoint) không hỗ trợ trên Localhost. Vui lòng tải xuống để xem.")
          } else {
            // Tạo URL công khai để Google Docs Viewer có thể truy cập
            const publicUrl = directViewUrl.startsWith('http') ? directViewUrl : `${window.location.origin}${directViewUrl}`
            const encodedUrl = encodeURIComponent(publicUrl)

            // Sử dụng Google Docs Viewer thay vì Microsoft Office Viewer
            // Google Docs Viewer ít yêu cầu hơn và hoạt động tốt hơn
            setViewUrl(`https://docs.google.com/viewer?url=${encodedUrl}&embedded=true`)
            setViewerType("office")
          }
        } else if ([".txt", ".csv", ".json", ".xml", ".html", ".htm"].includes(ext)) {
          setViewUrl(directViewUrl)
          setViewerType("iframe")
        } else {
          setViewerType("unsupported")
          setError("Định dạng file này chưa hỗ trợ xem trước. Vui lòng tải xuống.")
        }
      } catch (err) {
        console.error("Failed to load viewer:", err)
        setError("Không thể tải file để xem")
        setViewerType("unsupported")
      } finally {
        setLoading(false)
      }
    }

    loadViewer()
  }, [fileId, filePath, fileExtension])

  if (loading) {
    return (
      <div className="w-full h-[800px] flex items-center justify-center bg-gray-50 border-2 border-border rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-body text-foreground/60">Đang tải tài liệu...</p>
        </div>
      </div>
    )
  }

  if (error || viewerType === "unsupported") {
    return (
      <div className="w-full h-[800px] flex items-center justify-center bg-gray-50 border-2 border-border rounded-lg">
        <div className="text-center max-w-md px-6">
          <p className="text-body text-foreground mb-4">{error || "Không thể xem file này"}</p>
          {onDownload && (
            <button
              onClick={onDownload}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition text-label"
            >
              Tải xuống để xem
            </button>
          )}
        </div>
      </div>
    )
  }

  if (viewerType === "image") {
    return (
      <div className="w-full border-2 border-border rounded-lg overflow-hidden bg-white flex items-center justify-center p-4">
        <img
          src={viewUrl}
          alt={fileName}
          className="max-w-full max-h-[800px] object-contain"
          onError={() => setError("Không thể tải hình ảnh")}
        />
      </div>
    )
  }

  if (viewerType === "iframe" || viewerType === "office") {
    return (
      <div className="w-full border-2 border-border rounded-lg overflow-hidden bg-white">
        <iframe
          src={viewUrl}
          className="w-full h-[800px] border-0"
          title={fileName}
          loading="lazy"
          allow="fullscreen"
          onError={() => {
            setError("Không thể hiển thị file này. Vui lòng tải xuống để xem.")
            setViewerType("unsupported")
          }}
        />
      </div>
    )
  }

  return (
    <div className="w-full h-[800px] flex items-center justify-center bg-gray-50 border-2 border-border rounded-lg">
      <div className="text-center">
        <p className="text-body text-foreground/60 mb-4">
          Không thể hiển thị file này
        </p>
        {onDownload && (
          <button
            onClick={onDownload}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition text-label"
          >
            Tải xuống để xem
          </button>
        )}
      </div>
    </div>
  )
}
