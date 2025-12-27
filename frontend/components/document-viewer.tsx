import { useState, useEffect, useRef } from "react"
import { API_BASE_URL } from "@/lib/api"
import * as mammoth from "mammoth"
import * as XLSX from "xlsx"
import { Loader2, FileText, Download, AlertCircle, FileSpreadsheet, FilePieChart, FileQuestion } from "lucide-react"


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
  const [viewerType, setViewerType] = useState<"iframe" | "image" | "office" | "docx" | "xlsx" | "unsupported" | null>(null)
  const [renderedContent, setRenderedContent] = useState<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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
        } else if ([".docx", ".doc"].includes(ext)) {
          // Xử lý Word
          const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")

          if (ext === ".docx" && (isLocalhost || true)) { // Ưu tiên mammoth trên local, có thể dùng luôn trên server vì nó nhẹ
            try {
              const response = await fetch(directViewUrl)
              const arrayBuffer = await response.arrayBuffer()
              const result = await mammoth.convertToHtml({ arrayBuffer })
              setRenderedContent(result.value)
              setViewerType("docx")
            } catch (err) {
              console.error("Mammoth error:", err)
              // Nếu mammoth lỗi, thử fallback sang Office Online nếu không phải localhost
              if (!isLocalhost) {
                fallbackToOffice(directViewUrl)
              } else {
                throw new Error("Không thể render file Word này trên local.")
              }
            }
          } else if (!isLocalhost) {
            fallbackToOffice(directViewUrl)
          } else {
            setViewerType("unsupported")
            setError("Định dạng .doc (cũ) không hỗ trợ xem trên local. Vui lòng tải xuống.")
          }
        } else if ([".xlsx", ".xls"].includes(ext)) {
          // Xử lý Excel
          const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")

          if (ext === ".xlsx" && (isLocalhost || true)) {
            try {
              const response = await fetch(directViewUrl)
              const arrayBuffer = await response.arrayBuffer()
              const workbook = XLSX.read(arrayBuffer, { type: 'array' })
              const firstSheetName = workbook.SheetNames[0]
              const worksheet = workbook.Sheets[firstSheetName]
              const html = XLSX.utils.sheet_to_html(worksheet)
              setRenderedContent(html)
              setViewerType("xlsx")
            } catch (err) {
              console.error("XLSX error:", err)
              if (!isLocalhost) {
                fallbackToOffice(directViewUrl)
              } else {
                throw new Error("Không thể render file Excel này trên local.")
              }
            }
          } else if (!isLocalhost) {
            fallbackToOffice(directViewUrl)
          } else {
            setViewerType("unsupported")
            setError("Định dạng .xls (cũ) không hỗ trợ xem trên local. Vui lòng tải xuống.")
          }
        } else if ([".pptx", ".ppt"].includes(ext)) {
          // PowerPoint vẫn ưu tiên Office Online
          const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
          if (!isLocalhost) {
            fallbackToOffice(directViewUrl)
          } else {
            setViewerType("unsupported")
            setError("Xem trước PowerPoint hiện chưa hỗ trợ trên local. Vui lòng tải xuống để xem.")
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
        setError("Không thể hiển thị bản xem trước. Vui lòng tải xuống để xem trực tiếp.")
        setViewerType("unsupported")
      } finally {
        setLoading(false)
      }
    }

    const fallbackToOffice = (url: string) => {
      const publicUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`
      const encodedUrl = encodeURIComponent(publicUrl)
      setViewUrl(`https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`)
      setViewerType("office")
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
        {viewerType === "office" && (
          <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[10px] text-gray-500 border border-gray-200 pointer-events-none">
            Powered by Microsoft Office Online
          </div>
        )}
      </div>
    )
  }

  if (viewerType === "docx") {
    return (
      <div className="w-full border-2 border-border rounded-lg overflow-hidden bg-gray-100 p-4 md:p-8 flex justify-center h-[800px] overflow-y-auto">
        <div
          className="bg-white shadow-2xl p-8 md:p-16 max-w-4xl w-full min-h-full docx-viewer"
          dangerouslySetInnerHTML={{ __html: renderedContent }}
        />
        <style jsx global>{`
          .docx-viewer {
            font-family: 'Times New Roman', Times, serif;
            line-height: 1.6;
            color: #1a1a1a;
          }
          .docx-viewer h1 { font-size: 2.2em; font-weight: 700; margin: 0.8em 0; color: #000; }
          .docx-viewer h2 { font-size: 1.8em; font-weight: 600; margin: 0.7em 0; color: #333; }
          .docx-viewer h3 { font-size: 1.4em; font-weight: 600; margin: 0.6em 0; color: #444; }
          .docx-viewer p { margin: 1.2em 0; }
          .docx-viewer img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 1.5em auto;
            border-radius: 4px;
          }
          .docx-viewer table {
            border-collapse: collapse;
            width: 100%;
            margin: 1.5em 0;
            border: 1px solid #000;
          }
          .docx-viewer td, .docx-viewer th {
            border: 1px solid #ccc;
            padding: 10px;
            vertical-align: top;
          }
          .docx-viewer th {
            background-color: #f3f4f6;
            font-weight: 600;
          }
          .docx-viewer ul, .docx-viewer ol {
            padding-left: 30px;
            margin: 1em 0;
          }
          .docx-viewer li {
            margin-bottom: 0.5em;
          }
        `}</style>
      </div>
    )
  }

  if (viewerType === "xlsx") {
    return (
      <div className="w-full border-2 border-border rounded-lg overflow-hidden bg-white h-[800px] overflow-auto">
        <div className="p-4 bg-green-50 border-b border-green-100 flex items-center gap-2 sticky top-0 z-10">
          <FileSpreadsheet className="w-5 h-5 text-green-600" />
          <span className="font-semibold text-green-800 text-sm">Xem trước bảng tính Excel</span>
        </div>
        <div
          className="xlsx-viewer p-4"
          dangerouslySetInnerHTML={{ __html: renderedContent }}
        />
        <style jsx global>{`
          .xlsx-viewer table {
            border-collapse: collapse;
            width: 100%;
            font-size: 13px;
          }
          .xlsx-viewer td, .xlsx-viewer th {
            border: 1px solid #e2e8f0;
            padding: 6px 10px;
            white-space: nowrap;
          }
          .xlsx-viewer th {
            background-color: #f8fafc;
            font-weight: 600;
          }
          .xlsx-viewer tr:hover {
            background-color: #f1f5f9;
          }
        `}</style>
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
