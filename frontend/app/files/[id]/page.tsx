"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import { getFileDetail, buyLesson, getAuthToken, getDownloadUrl, API_BASE_URL } from "@/lib/api"

import { Loader2, Lock, Download, CheckCircle, ShoppingCart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import DocumentViewer from "@/components/document-viewer"

export default function FileDetailPage() {
  const params = useParams()
  const router = useRouter()
  const fileId = params.id as string
  const { addItem } = useCart()

  const [fileDetail, setFileDetail] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(false)
  const [isPurchased, setIsPurchased] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuth()
    loadData()
  }, [fileId])

  const checkAuth = () => {
    if (typeof window !== 'undefined') {
      const token = getAuthToken()
      const role = localStorage.getItem('user_role')
      setIsAuthenticated(!!token)
      setIsAdmin(role === 'admin')

      if (token && role !== 'admin') {
        fetchOrders(token)
      }
    }
  }

  const fetchOrders = async (token: string) => {
    try {

      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        const orders = await res.json()
        const owned = orders.some((o: any) => o.lessonId.toString() === fileId)
        setIsPurchased(owned)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const loadData = async () => {
    try {
      setLoading(true)
      const detail = await getFileDetail(fileId)
      setFileDetail(detail)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleBuy = async () => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    if (confirm(`Bạn muốn mua giáo án này với giá ${fileDetail.file.price.toLocaleString()}đ?`)) {
      setPurchasing(true)
      try {
        await buyLesson(fileId)
        setIsPurchased(true)
        alert("Mua thành công!")
      } catch (err: any) {
        alert(err.error || "Mua thất bại")
      } finally {
        setPurchasing(false)
      }
    }
  }

  const handleAddToCart = () => {
    if (fileDetail?.file) {
      addItem({
        id: fileDetail.file.id,
        title: fileDetail.file.title,
        price: fileDetail.file.price,
        image: fileDetail.file.thumbnailUrl || "/placeholder.svg"
      })
      alert("Đã thêm vào giỏ hàng!")
    }
  }

  const handleDownload = async () => {
    // Made public as per user request
    await downloadWithAuth()
  }

  // Helper to extract filename from content-disposition header
  const getFileNameFromHeader = (disposition: string | null) => {
    if (disposition && disposition.indexOf('attachment') !== -1) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(disposition);
      if (matches != null && matches[1]) {
        return matches[1].replace(/['"]/g, '');
      }
    }
    return null;
  }

  const downloadWithAuth = async () => {

    const token = getAuthToken()
    try {
      const res = await fetch(`${API_BASE_URL}/api/lessons/download/${fileId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!res.ok) {
        const json = await res.json()
        alert(json.error || "Không thể tải xuống")
        return
      }

      const blob = await res.blob()
      // Try to get filename from header, or fallback to title
      let filename = `giao-an-${fileId}.${fileDetail.file.fileExtension || 'zip'}`;
      const disposition = res.headers.get('content-disposition');
      const headerFilename = getFileNameFromHeader(disposition);
      if (headerFilename) {
        filename = headerFilename;
      } else if (fileDetail?.file?.title) {
        // Sanitize title
        const ext = fileDetail.file.fileExtension || 'zip';
        const safeTitle = fileDetail.file.title.replace(/[^a-z0-9\s-]/gi, '').replace(/\s+/g, '-').toLowerCase();
        filename = `${safeTitle}.${ext}`;
      }

      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (e) {
      alert("Lỗi tải xuống")
    }
  }

  if (loading) return <div className="min-h-screen flex justify-center items-center"><Loader2 className="animate-spin" /></div>

  if (!fileDetail) return <div className="text-center p-10">Không tìm thấy giáo án</div>

  const { file } = fileDetail
  const canDownload = isAdmin || isPurchased || (file.price === 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN: Document Viewer */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
              <h2 className="text-xl font-bold mb-4">Xem trước tài liệu</h2>
              <DocumentViewer
                fileId={file.id}
                filePath={file.fileUrl} // Note: Check API response for correct field name, usually fileUrl or filePath from backend
                fileName={file.title}
                fileExtension={file.fileExtension || '.pdf'} // Default or extract
                onDownload={canDownload ? handleDownload : undefined}
              />
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
              <h3 className="text-lg font-bold mb-2">Mô tả chi tiết</h3>
              <p className="text-gray-600 leading-relaxed">{file.description}</p>
            </div>
          </div>

          {/* RIGHT COLUMN: Action & Meta */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{file.title}</h1>
              <div className="flex items-center gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                  {file.category || "Giáo án"}
                </span>
                <span className="text-gray-500 text-sm">
                  {new Date().toLocaleDateString('vi-VN')}
                </span>
              </div>

              <div className="mb-8">
                <span className="block text-3xl font-bold text-green-600 mb-1">
                  {file.price === 0 ? "Miễn phí" : `${file.price.toLocaleString()}đ`}
                </span>
                <span className="text-sm text-gray-400">Giá gốc: {(file.price * 1.2).toLocaleString()}đ</span>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                {canDownload ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-green-600 font-bold justify-center p-2 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5" />
                      {isAdmin ? "Quyền Admin" : (file.price === 0 ? "Tài liệu miễn phí" : "Đã sở hữu")}
                    </div>
                    <button
                      onClick={handleDownload}
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg"
                    >
                      <Download className="w-6 h-6" />
                      Tải Xuống Ngay
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={handleBuy}
                      disabled={purchasing}
                      className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-md"
                    >
                      {purchasing ? <Loader2 className="animate-spin w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                      Mua Ngay {file.price.toLocaleString()}đ
                    </button>

                    <button
                      onClick={handleAddToCart}
                      className="w-full flex items-center justify-center gap-2 bg-white text-primary border-2 border-primary px-6 py-3 rounded-xl font-bold text-lg hover:bg-primary/5 transition"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Thêm vào giỏ
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-2 font-body">
                      Vui lòng mua hoặc đăng nhập để tải bản gốc chất lượng cao
                    </p>
                  </div>
                )}
              </div>

              {/* Meta Info */}
              <div className="mt-8 pt-6 border-t border-gray-100 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Loại file</span>
                  <span className="font-semibold uppercase">{file.fileExtension || "DOC/PDF"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Kích thước</span>
                  <span className="font-semibold">~5MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Lượt tải</span>
                  <span className="font-semibold">{Math.floor(Math.random() * 100)}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
