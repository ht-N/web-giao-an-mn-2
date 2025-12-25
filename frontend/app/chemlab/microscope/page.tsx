"use client";
import { useState } from 'react';
import { Search, Microscope as MicroscopeIcon, FlaskConical, Atom, Info } from 'lucide-react';
import MoleculeViewer from '../_components/MoleculeViewer';

const Microscope = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [moleculeData, setMoleculeData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        setLoading(true);
        setError(null);
        setMoleculeData(null);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_CHEMLAB_API_URL || 'http://localhost:5175';
            const response = await fetch(`${apiUrl}/api/molecule`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ substance: searchTerm }),
            });

            const data = await response.json();

            if (data.valid) {
                setMoleculeData(data);
            } else {
                setError(data.error || 'Không tìm thấy thông tin về chất này.');
            }
        } catch (err) {
            console.error('Error fetching molecule:', err);
            setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-gray-900 p-6 relative overflow-hidden flex flex-col items-center">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>

            <style jsx global>{`
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
            `}</style>

            <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col h-full">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center gap-3">
                        <MicroscopeIcon className="w-12 h-12 text-indigo-600" />
                        Kính Hiển Vi Phân Tử
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Khám phá cấu trúc 3D của các nguyên tố và hợp chất hóa học
                    </p>
                </div>

                {/* Search Bar */}
                <div className="w-full max-w-2xl mx-auto mb-10">
                    <form onSubmit={handleSearch} className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Nhập tên chất (VD: Caffeine, Aspirin, Nước...)"
                            className="block w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl text-lg focus:ring-0 focus:border-blue-500 shadow-xl transition-all outline-none"
                        />
                        <button
                            type="submit"
                            disabled={loading || !searchTerm.trim()}
                            className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <span>Tìm Kiếm</span>
                            )}
                        </button>
                    </form>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-[500px]">
                    {/* Molecule Viewer */}
                    <div className="flex-[2] bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative flex flex-col h-[600px] md:h-auto">
                        <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-gray-500 border border-gray-200">
                            Viewer 3D
                        </div>

                        {moleculeData ? (
                            <div className="w-full h-full relative group cursor-grab active:cursor-grabbing">
                                <MoleculeViewer
                                    moleculeData={{
                                        type: 'sdf',
                                        data: moleculeData.moleculeStructure,
                                        surface: false
                                    }}
                                    style="stick"
                                    backgroundColor="#ffffff"
                                />
                                <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs">Phóng to, xoay để xem chi tiết</span>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center bg-gray-50/50">
                                {loading ? (
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                                        <p>Đang phân tích cấu trúc...</p>
                                    </div>
                                ) : error ? (
                                    <div className="max-w-md">
                                        <Info className="w-16 h-16 mx-auto mb-4 text-red-300" />
                                        <p className="text-red-500 font-medium">{error}</p>
                                    </div>
                                ) : (
                                    <>
                                        <Atom className="w-24 h-24 mb-4 opacity-20" />
                                        <p className="text-lg font-medium">Nhập tên chất để xem cấu trúc 3D</p>
                                        <p className="text-sm mt-2 max-w-xs">Hệ thống AI sẽ tạo ra mô hình phân tử chính xác nhất cho bạn.</p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Info Panel */}
                    {moleculeData && (
                        <div className="flex-1 bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 md:max-w-md overflow-y-auto max-h-[600px] md:max-h-auto">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                                    <FlaskConical className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{moleculeData.name}</h2>
                                    <p className="text-lg text-blue-600 font-mono font-bold bg-blue-50 inline-block px-2 rounded mt-1">
                                        {moleculeData.formula}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Mô Tả</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {moleculeData.description}
                                    </p>
                                </div>

                                {moleculeData.properties && moleculeData.properties.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Tính Chất</h3>
                                        <div className="grid grid-cols-1 gap-3">
                                            {moleculeData.properties.map((prop: any, idx: number) => (
                                                <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                                                    <span className="text-gray-500 font-medium">{prop.label}</span>
                                                    <span className="text-gray-900 font-semibold">{prop.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Microscope;
