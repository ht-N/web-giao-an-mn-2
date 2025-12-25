"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Sparkles, Presentation, Download, CheckCircle2, User, Copy } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Schema validation
const formSchema = z.object({
    schoolName: z.string().min(2, "Tên trường phải có ít nhất 2 ký tự"),
    teacherTitle: z.enum(["Cô", "Thầy"]),
    teacherName: z.string().min(2, "Tên giáo viên phải có ít nhất 2 ký tự"),
    ageGroup: z.string({ required_error: "Vui lòng chọn độ tuổi" }),
    topic: z.string({ required_error: "Vui lòng chọn chủ đề" }),
    week: z.string().optional(),
    activityType: z.string({ required_error: "Vui lòng chọn loại hoạt động" }),
    useAiImages: z.boolean().default(false),
})

const TOPICS = [
    "Bản thân",
    "Gia đình",
    "Trường mầm non",
    "Thế giới động vật",
    "Thế giới thực vật",
    "Giao thông",
    "Nghề nghiệp",
    "Quê hương – đất nước – Bác Hồ"
]

const AGES = [
    "Nhà trẻ (12–24 tháng)",
    "Mẫu giáo bé (3–4 tuổi)",
    "Mẫu giáo nhỡ (4–5 tuổi)",
    "Mẫu giáo lớn (5–6 tuổi)"
]

const ACTIVITIES = [
    "Làm quen văn học",
    "Làm quen chữ cái",
    "Làm quen toán",
    "Âm nhạc",
    "Tạo hình",
    "Khám phá khoa học",
    "Hoạt động ngoài trời"
]

export default function SlideGeneratorPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [step, setStep] = useState<"input" | "generating_content" | "generating_slide" | "done">("input")
    const [result, setResult] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            schoolName: "",
            teacherTitle: "Cô",
            teacherName: "",
            week: "",
            useAiImages: false,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        setError(null)
        setResult(null)
        setStep("generating_content")

        try {
            // After 3 seconds, move to generating_slide step to show progress
            const progressTimer = setTimeout(() => {
                setStep("generating_slide")
            }, 3000)

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/ai/generate-slide`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    schoolName: values.schoolName,
                    teacherName: values.teacherName,
                    teacherTitle: values.teacherTitle,
                    ageGroup: values.ageGroup,
                    topic: values.topic,
                    week: values.week,
                    activityType: values.activityType,
                    stockImages: !values.useAiImages,
                }),
            })

            clearTimeout(progressTimer)

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Có lỗi xảy ra khi tạo slide")
            }

            setResult(data)
            setStep("done")
        } catch (err: any) {
            setError(err.message)
            setStep("input")
        } finally {
            setIsLoading(false)
        }
    }

    const { errors } = form.formState

    return (
        <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header Section */}
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-pink-100"
                    >
                        <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent font-bold text-xl flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-pink-500" />
                            AI Trợ Lý Giáo Viên Mầm Non
                        </span>
                    </motion.div>
                    <h1 className="text-4xl font-heading font-bold text-slate-800">
                        Tạo Bài Giảng Tự Động
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Nhập thông tin bài dạy, AI sẽ tự động thiết kế slide bài giảng chuyên nghiệp,
                        sinh động dành riêng cho lứa tuổi mầm non chỉ trong vài phút.
                    </p>
                </div>

                {/* Error Alert */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-3"
                    >
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">!</div>
                        <p>{error}</p>
                    </motion.div>
                )}

                {/* Input Form */}
                <AnimatePresence mode="wait">
                    {step === "input" && (
                        <motion.div
                            key="input-form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
                                <div className="h-2 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500" />
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-2xl">
                                        <User className="w-6 h-6 text-purple-500" />
                                        Thông tin bài dạy
                                    </CardTitle>
                                    <CardDescription>
                                        Điền đầy đủ thông tin để AI tạo nội dung phù hợp nhất
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                                        {/* School & Teacher Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                            <div className="md:col-span-6 space-y-2">
                                                <Label>Tên Trường</Label>
                                                <Controller
                                                    control={form.control}
                                                    name="schoolName"
                                                    render={({ field }) => (
                                                        <Input placeholder="VD: Trường Mầm non Hoa Hồng" {...field} className="bg-white" />
                                                    )}
                                                />
                                                {errors.schoolName && <p className="text-red-500 text-xs">{errors.schoolName.message}</p>}
                                            </div>
                                            <div className="md:col-span-2 space-y-2">
                                                <Label>Danh xưng</Label>
                                                <Controller
                                                    control={form.control}
                                                    name="teacherTitle"
                                                    render={({ field }) => (
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger className="bg-white">
                                                                <SelectValue placeholder="Chọn" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Cô">Cô</SelectItem>
                                                                <SelectItem value="Thầy">Thầy</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                                {errors.teacherTitle && <p className="text-red-500 text-xs">{errors.teacherTitle.message}</p>}
                                            </div>
                                            <div className="md:col-span-4 space-y-2">
                                                <Label>Tên Giáo Viên</Label>
                                                <Controller
                                                    control={form.control}
                                                    name="teacherName"
                                                    render={({ field }) => (
                                                        <Input placeholder="VD: Thu Hà" {...field} className="bg-white" />
                                                    )}
                                                />
                                                {errors.teacherName && <p className="text-red-500 text-xs">{errors.teacherName.message}</p>}
                                            </div>
                                        </div>

                                        <div className="h-px bg-slate-100 my-4" />

                                        {/* Class Info Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label>Lứa tuổi / Lớp</Label>
                                                <Controller
                                                    control={form.control}
                                                    name="ageGroup"
                                                    render={({ field }) => (
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger className="bg-white">
                                                                <SelectValue placeholder="Chọn độ tuổi" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {AGES.map(age => (
                                                                    <SelectItem key={age} value={age}>{age}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                                {errors.ageGroup && <p className="text-red-500 text-xs">{errors.ageGroup.message}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Tuần / Ngày dạy (Tùy chọn)</Label>
                                                <Controller
                                                    control={form.control}
                                                    name="week"
                                                    render={({ field }) => (
                                                        <Input placeholder="VD: Tuần 2 - Thứ 3" {...field} className="bg-white" />
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        {/* Topic & Activity Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label>Chủ đề lớn</Label>
                                                <Controller
                                                    control={form.control}
                                                    name="topic"
                                                    render={({ field }) => (
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger className="bg-white">
                                                                <SelectValue placeholder="Chọn chủ đề" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {TOPICS.map(t => (
                                                                    <SelectItem key={t} value={t}>{t}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                                {errors.topic && <p className="text-red-500 text-xs">{errors.topic.message}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Loại hoạt động</Label>
                                                <Controller
                                                    control={form.control}
                                                    name="activityType"
                                                    render={({ field }) => (
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger className="bg-white">
                                                                <SelectValue placeholder="Chọn hoạt động" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {ACTIVITIES.map(a => (
                                                                    <SelectItem key={a} value={a}>{a}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                                {errors.activityType && <p className="text-red-500 text-xs">{errors.activityType.message}</p>}
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <div className="flex flex-row items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label className="text-base font-semibold">Sử dụng Ảnh AI Sinh Tạo</Label>
                                                    <p className="text-xs text-slate-500">Tạo ảnh độc bản bằng AI (Mất phí) hoặc dùng ảnh kho miễn phí.</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Controller
                                                        control={form.control}
                                                        name="useAiImages"
                                                        render={({ field }) => (
                                                            <>
                                                                <span className={`text-sm ${!field.value ? 'font-bold text-green-600' : 'text-slate-500'}`}>Ảnh Kho (Free)</span>
                                                                <Switch
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                                <span className={`text-sm ${field.value ? 'font-bold text-purple-600' : 'text-slate-500'}`}>Ảnh AI (Paid)</span>
                                                            </>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full h-14 text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-200"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <span className="flex items-center gap-2">
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Đang xử lý...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    <Presentation className="w-5 h-5" />
                                                    Tạo Slide Bài Giảng Ngay
                                                </span>
                                            )}
                                        </Button>

                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Loading View - Shows during content and slide generation */}
                    {(step === "generating_content" || step === "generating_slide") && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="py-16 text-center space-y-8"
                        >
                            <div className="relative w-32 h-32 mx-auto">
                                <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-t-pink-500 border-r-purple-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Sparkles className="w-12 h-12 text-purple-500 animate-pulse" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-slate-800">
                                    {step === "generating_content" ? "AI đang tạo nội dung..." : "AI đang tạo slide từ nội dung..."}
                                </h2>
                                <p className="text-slate-500">
                                    Vui lòng đợi trong giây lát, trợ lý ảo đang làm việc hết công suất!
                                </p>
                            </div>

                            <div className="flex justify-center gap-6 pt-8">
                                <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${step === 'generating_content' ? 'opacity-100 scale-110' : 'opacity-50'}`}>
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${step === 'generating_content' ? 'bg-pink-500 text-white' : 'bg-green-500 text-white'}`}>
                                        {step === 'generating_content' ? '1' : '✓'}
                                    </div>
                                    <span className="text-sm font-medium">Soạn nội dung</span>
                                </div>
                                <div className="w-12 h-1 bg-slate-200 mt-6 relative overflow-hidden">
                                    <div className={`absolute inset-0 bg-purple-500 transition-all duration-500 ${step === 'generating_slide' ? 'translate-x-0' : '-translate-x-full'}`}></div>
                                </div>
                                <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${step === 'generating_slide' ? 'opacity-100 scale-110' : 'opacity-50'}`}>
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${step === 'generating_slide' ? 'bg-purple-500 text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
                                    <span className="text-sm font-medium">Thiết kế Slide</span>
                                </div>
                                <div className="w-12 h-1 bg-slate-200 mt-6"></div>
                                <div className="flex flex-col items-center gap-2 opacity-50">
                                    <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold">3</div>
                                    <span className="text-sm font-medium">Hoàn tất</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Result View */}
                    {step === "done" && result && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-green-800">Tạo bài giảng thành công!</h3>
                                        <p className="text-green-700">Slide của bạn đã sẵn sàng để trình chiếu.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 w-full md:w-auto">
                                    <Button
                                        variant="outline"
                                        onClick={() => { setStep("input"); setResult(null); }}
                                        className="flex-1"
                                    >
                                        Tạo bài mới
                                    </Button>
                                    {result.gammaResult?.url && (
                                        <Button
                                            className="bg-purple-600 hover:bg-purple-700 flex-1"
                                            onClick={() => window.open(result.gammaResult.url, '_blank')}
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Mở trên Gamma
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Slide Preview - Card based since Gamma blocks iframe embedding */}
                            {result.gammaResult?.url ? (
                                <div className="space-y-6">
                                    {/* Embedded Slide Preview */}
                                    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-purple-200 bg-white">
                                        <iframe
                                            src={result.gammaResult.url.replace('/docs/', '/embed/')}
                                            style={{ width: '100%', height: '500px' }}
                                            allow="fullscreen"
                                            title="Bài giảng Gamma"
                                            className="border-0"
                                        />
                                    </div>
                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                        <Button
                                            size="lg"
                                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg shadow-lg transition-all hover:scale-105"
                                            onClick={() => {
                                                // Use exportUrl (direct PPTX download link from Gamma API)
                                                const url = result.gammaResult.exportUrl || result.gammaResult.pptxUrl || `${result.gammaResult.url}?mode=doc&export=pptx`;
                                                window.open(url, '_blank');
                                            }}
                                        >
                                            <Download className="w-5 h-5 mr-2" />
                                            Tải Slide
                                        </Button>

                                        <Button
                                            size="lg"
                                            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg shadow-lg transition-all hover:scale-105"
                                            onClick={() => {
                                                navigator.clipboard.writeText(result.gammaResult.url);
                                                alert("Đã sao chép link trình chiếu!");
                                            }}
                                        >
                                            <Copy className="w-5 h-5 mr-2" />
                                            Copy Link
                                        </Button>

                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="px-8 py-4 text-lg border-slate-200"
                                            onClick={() => { setStep("input"); setResult(null); }}
                                        >
                                            Tạo bài mới
                                        </Button>
                                    </div>

                                    <p className="text-sm text-slate-500 text-center">
                                        💡 Slide được chia sẻ công khai - Thầy cô có thể gửi link cho học sinh/phụ huynh
                                    </p>
                                </div>
                            ) : (
                                <div className="p-12 text-center bg-white rounded-xl shadow border border-slate-200">
                                    <p className="text-slate-500">Đang xử lý slide... Vui lòng đợi hoặc thử lại sau.</p>
                                </div>
                            )}
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    )
}
