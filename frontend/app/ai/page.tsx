"use client"

import { useState } from "react"
import { generateLessonPlan } from "@/lib/api"
import { Loader2, Sparkles, Wand2, Download, Copy } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function AILessonPage() {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState("")

    const [formData, setFormData] = useState({
        topic: "",
        ageGroup: "Lớp Mầm (3-4 tuổi)",
        duration: "25-30 phút",
        objectives: "",
        format: "text"
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.topic) return alert("Vui lòng nhập tên chủ đề!")

        setLoading(true)
        setResult("")
        try {
            const res = await generateLessonPlan(formData)
            setResult(res.content)
        } catch (error: any) {
            alert(error.error || "Có lỗi xảy ra khi tạo nội dung")
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(result)
        alert("Đã sao chép nội dung!")
    }

    const handleDownloadTxt = () => {
        const element = document.createElement("a");
        const file = new Blob([result], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `Giao_an_${formData.topic.replace(/\s+/g, '_')}.md`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <main className="max-w-[1400px] mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4 flex items-center justify-center gap-3">
                        <Sparkles className="w-10 h-10 text-yellow-400" />
                        Trợ Lý Soạn Giáo Án AI
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Nhập chủ đề và để AI "Hiệu phó chuyên môn" giúp bạn soạn giáo án chuẩn Thông tư 28 chỉ trong 5 giây.
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                    {/* Form Section */}
                    <div className="xl:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Wand2 className="w-5 h-5" />
                                    Thông tin bài dạy
                                </h2>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Chủ đề / Tên bài dạy *</label>
                                    <input
                                        type="text"
                                        name="topic"
                                        value={formData.topic}
                                        onChange={handleChange}
                                        placeholder="Ví dụ: Tết Nguyên Đán, Con vịt, Màu đỏ..."
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Lứa tuổi</label>
                                    <select
                                        name="ageGroup"
                                        value={formData.ageGroup}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option>Nhà trẻ (18-24 tháng)</option>
                                        <option>Nhà trẻ (24-36 tháng)</option>
                                        <option>Lớp Mầm (3-4 tuổi)</option>
                                        <option>Lớp Chồi (4-5 tuổi)</option>
                                        <option>Lớp Lá (5-6 tuổi)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Thời lượng</label>
                                    <select
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option>15-20 phút</option>
                                        <option>20-25 phút</option>
                                        <option>25-30 phút</option>
                                        <option>30-35 phút</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mục tiêu mong muốn (Tùy chọn)</label>
                                    <textarea
                                        name="objectives"
                                        value={formData.objectives}
                                        onChange={handleChange}
                                        placeholder="Ví dụ: Giúp trẻ nhớ tên bài thơ, vận động theo nhạc..."
                                        rows={3}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>



                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-70 flex justify-center items-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                                    {loading ? "AI đang thực hiện..." : "Tạo Giáo Án Ngay"}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Result Section */}
                    <div className="xl:col-span-3">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 min-h-[600px] flex flex-col">
                            <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                                <h2 className="font-bold text-gray-700">Kết quả giáo án</h2>
                                <div className="flex gap-2">
                                    {result && (
                                        <>
                                            <button onClick={handleCopy} className="p-2 hover:bg-white rounded-lg text-gray-600 border border-transparent hover:border-gray-200 transition" title="Sao chép">
                                                <Copy className="w-5 h-5" />
                                            </button>
                                            <button onClick={handleDownloadTxt} className="p-2 hover:bg-white rounded-lg text-gray-600 border border-transparent hover:border-gray-200 transition" title="Tải về .txt">
                                                <Download className="w-5 h-5" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="p-5 flex-grow overflow-x-auto max-h-[900px] w-full scrollbar-thin">
                                <div className="prose prose-blue prose-sm md:prose-base max-w-none min-w-[800px]">
                                    {result ? (
                                        <>
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
                                        </>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                <Sparkles className="w-8 h-8 text-gray-300" />
                                            </div>
                                            <p>Giáo án của bạn sẽ xuất hiện ở đây...</p>
                                            {loading && (
                                                <div className="text-purple-600 font-medium animate-pulse flex items-center gap-2">
                                                    <Loader2 className="animate-spin w-4 h-4" />
                                                    Đang suy nghĩ ý tưởng hay...
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {result && (
                                    <div className="p-4 bg-gray-50 border-t text-center text-sm text-gray-500">
                                        * Nội dung do AI tạo ra chỉ mang tính chất tham khảo. Giáo viên vui lòng chỉnh sửa cho phù hợp với thực tế lớp học.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
