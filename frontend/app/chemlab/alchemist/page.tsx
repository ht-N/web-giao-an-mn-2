"use client";
import { useState } from 'react';
import { CHEMLAB_API_URL } from '@/lib/api';
import { Sparkles, FlaskConical, Zap, Flame, AlertCircle, Microscope, X, Info } from 'lucide-react';
import MoleculeViewer from '../_components/MoleculeViewer';

const Alchemist = () => {
    const [element1, setElement1] = useState('');
    const [element2, setElement2] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [showMicroscope, setShowMicroscope] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleMix = async () => {
        if (!element1 || !element2) return;

        setLoading(true);
        setResult(null);
        setError(null);
        setShowMicroscope(false);

        try {
            const apiUrl = CHEMLAB_API_URL;
            const response = await fetch(`${apiUrl}/api/alchemist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ element1, element2 }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Phản ứng thất bại');
            }

            console.log('Alchemist Result:', data); // Debug log
            setResult(data);
        } catch (error: any) {
            console.error('Error mixing elements:', error);
            setError(error.message || 'Không thể kết nối đến máy chủ. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-gray-900 p-6 relative overflow-hidden flex flex-col justify-center items-center">
            {/* Background effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-20 right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(5deg); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>

            <div className="max-w-5xl mx-auto relative z-10 w-full">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                        Nhà Giả Kim AI
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Chào mừng! Ta là Nhà Giả Kim Vui Tính. <br />Hãy đưa ta 2 nguyên liệu, ta sẽ cho con thấy phép màu! ✨
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-12">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl w-full md:w-1/3 hover:shadow-2xl transition-shadow bg-gradient-to-b from-white to-gray-50">
                        <label className="block text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Nguyên Liệu 1</label>
                        <input
                            type="text"
                            value={element1}
                            onChange={(e) => setElement1(e.target.value)}
                            placeholder="Ví dụ: Lửa"
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
                        />
                    </div>

                    <div className="text-4xl text-gray-300 font-light hidden md:block animate-pulse">+</div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl w-full md:w-1/3 hover:shadow-2xl transition-shadow bg-gradient-to-b from-white to-gray-50">
                        <label className="block text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Nguyên Liệu 2</label>
                        <input
                            type="text"
                            value={element2}
                            onChange={(e) => setElement2(e.target.value)}
                            placeholder="Ví dụ: Nước"
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
                        />
                    </div>
                </div>

                <div className="text-center mb-16">
                    <button
                        onClick={handleMix}
                        disabled={loading || !element1 || !element2}
                        className={`group relative px-10 py-5 bg-gradient-to-r from-primary to-purple-600 rounded-full font-bold text-xl text-white shadow-xl hover:shadow-purple-500/40 transition-all transform hover:-translate-y-1 active:scale-95 ${loading ? 'opacity-70 cursor-wait' : ''
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <Sparkles className="w-6 h-6 animate-spin" />
                                Đang Pha Chế...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <FlaskConical className="w-6 h-6" />
                                Trộn Ngay
                            </span>
                        )}
                        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    </button>
                    {error && (
                        <div className="mt-4 p-4 bg-red-100 text-red-600 rounded-xl inline-block">
                            <div className="flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                <span>{error}</span>
                            </div>
                        </div>
                    )}
                </div>

                {result && (
                    <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-0 border border-white shadow-2xl relative overflow-hidden ring-1 ring-gray-100">
                        {/* Result Glow */}
                        <div
                            className="absolute top-0 left-0 w-full h-2"
                            style={{ backgroundColor: result.color || '#a855f7' }}
                        ></div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                            {/* Avatar Section */}
                            <div className="md:col-span-4 bg-gray-50/50 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10 pattern-dots"></div>

                                <div
                                    className="relative w-48 h-48 rounded-full flex items-center justify-center shadow-2xl transition-all duration-1000 transform hover:scale-105 group mb-6"
                                    style={{
                                        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), ${result.color} 20%, ${result.color}CC 60%, ${result.color} 100%)`,
                                        boxShadow: `0 20px 40px -10px ${result.color}66, inset 0 0 20px rgba(255,255,255,0.5)`
                                    }}
                                >
                                    {/* Inner glow/Glass reflection */}
                                    <div className="absolute inset-2 rounded-full border border-white/40 backdrop-blur-sm"></div>
                                    <div className="absolute top-4 left-6 w-12 h-6 bg-white/60 blur-md rounded-[50%_50%_40%_40%_/_60%_60%_40%_40%] transform -rotate-45"></div>

                                    {/* Floating Emoji */}
                                    <span className="text-8xl drop-shadow-xl animate-float relative z-10 filter">
                                        {result.emoji || '✨'}
                                    </span>
                                </div>

                                <h2
                                    className="text-3xl font-extrabold text-center mb-2"
                                    style={{ color: result.color || '#333' }}
                                >
                                    {result.resultName}
                                </h2>
                                <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-white text-gray-600 uppercase tracking-wider border border-gray-200 shadow-sm">
                                    {result.type || 'Phản ứng'}
                                </span>
                            </div>

                            {/* Content Section */}
                            <div className="md:col-span-8 p-8 md:p-10 space-y-6">
                                {/* Equation Card */}
                                <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100 relative group hover:bg-blue-50 transition-colors">
                                    <h3 className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <FlaskConical className="w-4 h-4" /> Phương Trình Hóa Học
                                    </h3>
                                    <p className="font-mono text-xl md:text-2xl text-gray-800 font-bold">
                                        {result.equation ? result.equation.replace(/_/g, '') : 'N/A'}
                                    </p>
                                </div>

                                {/* Phenomenon Card */}
                                <div className="bg-purple-50/50 rounded-2xl p-5 border border-purple-100 hover:bg-purple-50 transition-colors">
                                    <h3 className="text-xs font-bold text-purple-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <Sparkles className="w-4 h-4" /> Hiện Tượng
                                    </h3>
                                    <p className="text-gray-700 text-lg leading-relaxed font-medium">
                                        {result.phenomenon || result.description}
                                    </p>
                                </div>

                                {/* Explanation & Fun Fact Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:bg-gray-100 transition-colors">
                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            <Zap className="w-4 h-4" /> Giải Thích Vui
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {result.explanation}
                                        </p>
                                    </div>

                                    <div className={`rounded-2xl p-5 border transition-colors ${result.dangerous ? 'bg-red-50 border-red-100 hover:bg-red-100' : 'bg-green-50 border-green-100 hover:bg-green-100'}`}>
                                        <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 ${result.dangerous ? 'text-red-600' : 'text-green-600'}`}>
                                            {result.dangerous ? <AlertCircle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                                            {result.dangerous ? 'Cảnh Báo An Toàn' : 'Thông Tin Thú Vị'}
                                        </h3>
                                        <p className={`text-sm leading-relaxed ${result.dangerous ? 'text-red-800' : 'text-green-800'}`}>
                                            {result.safety}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                {result.moleculeStructure && (
                                    <div className="pt-4 flex justify-end">
                                        <button
                                            onClick={() => setShowMicroscope(true)}
                                            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:-translate-y-0.5"
                                        >
                                            <Microscope className="w-5 h-5" />
                                            Soi Dưới Kính Hiển Vi
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Microscope Modal */}
                {showMicroscope && result && result.moleculeStructure && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden relative">
                            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 rounded-xl">
                                        <Microscope className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Kính Hiển Vi Phân Tử</h3>
                                        <p className="text-sm text-gray-500 font-medium">
                                            {result.formula ? `Công thức: ${result.formula}` : result.resultName}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowMicroscope(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 bg-gray-50 relative">
                                <MoleculeViewer
                                    moleculeData={{
                                        type: 'sdf',
                                        data: result.moleculeStructure,
                                        surface: false
                                    }}
                                    style="stick"
                                    backgroundColor="#f9fafb"
                                />

                                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg border border-gray-100 text-xs font-medium text-gray-500 pointer-events-none">
                                    Xoay để xem cấu trúc 3D
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Alchemist;
