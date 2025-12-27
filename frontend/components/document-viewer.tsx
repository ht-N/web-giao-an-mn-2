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
        if (filePath) queryParams.append("file_path", filePath)

        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
        if (token) queryParams.append("token", token)

        // Ensure extension has dot
        let ext = (fileExtension || '').toLowerCase()
        if (ext && !ext.startsWith('.')) ext = '.' + ext

        // Use the dedicated /view endpoint for previews
        const directViewUrl = `${API_BASE_URL}/api/files/${fileId}/view?${queryParams.toString()}`

        if (ext === ".pdf") {
          setViewUrl(directViewUrl)
          setViewerType("iframe")
        } else if ([".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp"].includes(ext)) {
          setViewUrl(directViewUrl)
          setViewerType("image")
        } else if ([".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx"].includes(ext)) {
          const isLocalhost = typeof window !== 'undefined' &&
            (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")

          if (isLocalhost) {
            setViewerType("unsupported")
            setError("Chế độ xem trước tài liệu Office (Word/Excel/PowerPoint) yêu cầu máy chủ có thể truy cập công khai. Vui lòng tải xuống để xem trên Localhost.")
          } else {
            // Office Viewer often works better with fully qualified URLs
            const encodedUrl = encodeURIComponent(directViewUrl)

            // We'll try Google Docs Viewer first as it's often more reliable for IP-based servers
            // than Microsoft's viewer which sometimes blocks IP-based URLs.
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
    const isOffice = [".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx"].includes((fileExtension || '').toLowerCase().startsWith('.') ? (fileExtension || '').toLowerCase() : '.' + (fileExtension || '').toLowerCase());

    return (
      <div className="w-full space-y-4">
        {isOffice && (
          <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="text-sm text-blue-700">
              <p className="font-semibold">Đang sử dụng Google Docs Viewer</p>
              <p className="opacity-80">Nếu tài liệu không hiển thị, hãy thử chuyển sang Microsoft Office Viewer.</p>
            </div>
            <button
              onClick={() => {
                const encodedUrl = encodeURIComponent(viewUrl.split('url=')[1]?.split('&')[0] || viewUrl);
                if (viewUrl.includes('google.com')) {
                  setViewUrl(`https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`);
                } else {
                  setViewUrl(`https://docs.google.com/viewer?url=${encodedUrl}&embedded=true`);
                }
              }}
              className="px-4 py-2 bg-white text-blue-600 border border-blue-200 rounded-md text-xs font-semibold hover:bg-blue-100 transition"
            >
              Đổi bộ xem (Viewer)
            </button>
          </div>
        )}

        <div className="w-full border-2 border-border rounded-lg overflow-hidden bg-white relative">
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

        {isOffice && (
          <div className="text-center text-xs text-foreground/40 mt-2">
            Lưu ý: Chế độ xem trước yêu cầu tài liệu phải được tải lên hoàn tất và có quyền truy cập công khai.
          </div>
        )}
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
