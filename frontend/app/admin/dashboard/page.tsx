"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createLesson, fetchFiles, deleteLesson, getAuthToken } from "@/lib/api"
import { Trash2, Upload, Plus } from "lucide-react"

export default function AdminDashboard() {
    const router = useRouter()
    const [lessons, setLessons] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isUploading, setIsUploading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        file: null as File | null
    })

    useEffect(() => {
        // Check role
        if (typeof window !== 'undefined') {
            const role = localStorage.getItem('user_role')
            if (role !== 'admin') {
                router.push('/')
                return
            }
        }
        loadLessons()
    }, [])

    const loadLessons = async () => {
        setLoading(true)
        const data = await fetchFiles()
        setLessons(data.items)
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (confirm("Bạn chắc chắn muốn xóa giáo án này?")) {
            await deleteLesson(id)
            loadLessons()
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.file) return alert("Vui lòng chọn file")

        setIsUploading(true)
        try {
            const body = new FormData()
            body.append('title', formData.title)
            body.append('description', formData.description)
            body.append('price', formData.price)
            body.append('file', formData.file)

            await createLesson(body)
            alert("Đăng giáo án thành công")
            setFormData({ title: "", description: "", price: "", file: null })
            loadLessons()
        } catch (err) {
            alert("Lỗi khi đăng giáo án")
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard - Quản Lý Giáo Án</h1>

                {/* Upload Form */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Plus className="w-5 h-5" /> Thêm Giáo Án Mới
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            className="border p-2 rounded"
                            placeholder="Tên giáo án"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                        <input
                            className="border p-2 rounded"
                            placeholder="Mô tả"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                        <input
                            type="number"
                            className="border p-2 rounded"
                            placeholder="Giá (VNĐ)"
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                            required
                        />
                        <input
                            type="file"
                            className="border p-2 rounded"
                            onChange={e => setFormData({ ...formData, file: e.target.files ? e.target.files[0] : null })}
                            required
                        />
                        <button
                            type="submit"
                            disabled={isUploading}
                            className="md:col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2"
                        >
                            {isUploading ? "Đang tải lên..." : <><Upload className="w-4 h-4" /> Đăng Giáo Án</>}
                        </button>
                    </form>
                </div>

                {/* List */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="p-4">Tên Giáo Án</th>
                                <th className="p-4">Giá</th>
                                <th className="p-4">Mô tả</th>
                                <th className="p-4">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={4} className="p-4 text-center">Đang tải...</td></tr>
                            ) : lessons.map(lesson => (
                                <tr key={lesson.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-medium">{lesson.title}</td>
                                    <td className="p-4 text-green-600 font-bold">{parseInt(lesson.price).toLocaleString()}đ</td>
                                    <td className="p-4 text-gray-500">{lesson.description}</td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleDelete(lesson.id)}
                                            className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
