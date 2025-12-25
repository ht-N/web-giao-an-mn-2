"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import { Building2, Download, FileSpreadsheet, Search } from "lucide-react"
import { API_BASE_URL } from "@/lib/api"


interface CompiledFile {
    name: string
    url: string
    size: number
}

export default function CompiledDataPage() {
    const [files, setFiles] = useState<CompiledFile[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/compiled`)

            .then(res => res.json())
            .then(data => {
                setFiles(data.files || [])
                setLoading(false)
            })
            .catch(err => {
                console.error("Failed to load files", err)
                setLoading(false)
            })
    }, [])

    const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B'
        const k = 1024
        const sizes = ['B', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header />

            <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-4 flex items-center justify-center gap-3">
                        <Building2 className="w-10 h-10 text-blue-500" />
                        Kho Dữ Liệu Giáo Án
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Tải xuống các bộ dữ liệu giáo án đã được biên soạn chi tiết theo từng chủ đề và độ tuổi.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm tài liệu..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div className="text-sm text-gray-500">
                            Tổng số: <span className="font-bold text-gray-900">{filteredFiles.length}</span> tài liệu
                        </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {loading ? (
                            <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>
                        ) : filteredFiles.length > 0 ? (
                            filteredFiles.map((file, idx) => (
                                <div key={idx} className="p-6 hover:bg-blue-50 transition flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                                            <FileSpreadsheet className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">{file.name}</h3>
                                            <p className="text-sm text-gray-500">{formatSize(file.size)} • Excel Document</p>
                                        </div>
                                    </div>
                                    <a
                                        href={`${API_BASE_URL}${file.url}`}

                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-blue-600 hover:text-white transition"
                                    >
                                        <Download className="w-4 h-4" />
                                        Tải về
                                    </a>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center text-gray-400">
                                Không tìm thấy tài liệu nào phù hợp.
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
