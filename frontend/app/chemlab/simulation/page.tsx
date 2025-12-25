"use client"

import { useState } from 'react';

import {
    AlertTriangle,
    Atom,
    Beaker,
    Brain,
    Building2,
    Factory,
    FlaskConical,
    Gem,
    Hexagon,
    Orbit,
    TestTube,
} from 'lucide-react';

import QuizGenerator from '../_components/QuizGenerator';
import ChatBot from '../_components/ChatBot';

const Simulation = () => {
    const simulations = [
        {
            id: 15,
            title: 'Mô Phỏng Hóa Học',
            icon: <Beaker className="w-5 h-5" />,
            description: 'Mô phỏng tương tác hóa học nâng cao',
            iframeUrl: 'https://exquisite-halva-7454ce.netlify.app/'
        },
        {
            id: 1,
            title: 'Dụng Cụ Phòng Thí Nghiệm',
            icon: <Beaker className="w-5 h-5" />,
            description: 'Khám phá các dụng cụ phòng thí nghiệm hóa học trong không gian 3D',
            iframeUrl: 'https://sketchfab.com/models/18910c5df5134de784ed6811407e2a05/embed'
        },
        {
            id: 6,
            title: 'Phòng Thí Nghiệm Khoa Học',
            icon: <Building2 className="w-5 h-5" />,
            description: 'Mô phỏng toàn cảnh phòng thí nghiệm khoa học hoàn chỉnh',
            iframeUrl: 'https://sketchfab.com/models/20196b5d959943abb51c9e049b8f581b/embed'
        },
        {
            id: 7,
            title: 'Phòng Lab Hóa Học',
            icon: <Atom className="w-5 h-5" />,
            description: 'Phòng thí nghiệm hóa học với đầy đủ thiết bị và dụng cụ',
            iframeUrl: 'https://sketchfab.com/models/0a75b5543b034e27ac94e408e419a813/embed'
        },
        {
            id: 8,
            title: 'Hóa Chất Nguy Hiểm',
            icon: <AlertTriangle className="w-5 h-5" />,
            description: 'Mô phỏng các hóa chất nguy hiểm và cách xử lý an toàn',
            iframeUrl: 'https://sketchfab.com/models/6a6dcd9617d74a3c958399500ff8c9b7/embed'
        },
        {
            id: 9,
            title: 'Cấu Trúc Kim Cương',
            icon: <Gem className="w-5 h-5" />,
            description: 'Khám phá cấu trúc tinh thể kim cương 3D',
            iframeUrl: 'https://sketchfab.com/models/ba09212da83a452d97f73a8eac600286/embed'
        },
        {
            id: 10,
            title: 'Thiết Bị Phòng Thí Nghiệm',
            icon: <FlaskConical className="w-5 h-5" />,
            description: 'Bộ sưu tập đầy đủ thiết bị phòng thí nghiệm',
            iframeUrl: 'https://sketchfab.com/models/c95cca1a2c6c43f09cf20bc0ffd89139/embed'
        },
        {
            id: 11,
            title: 'Nhà Máy Hóa Chất',
            icon: <Factory className="w-5 h-5" />,
            description: 'Mô hình nhà máy sản xuất hóa chất công nghiệp',
            iframeUrl: 'https://sketchfab.com/models/adcca61ed4ec4c9cb2cecb38cd981144/embed'
        },
        {
            id: 12,
            title: 'Hình Học Phân Tử',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Các dạng hình học phân tử trong không gian 3D',
            iframeUrl: 'https://sketchfab.com/models/9574e9c7a19a4818984f601d37d2d862/embed'
        },
        {
            id: 13,
            title: 'Dụng Cụ Hóa Học Nâng Cao',
            icon: <TestTube className="w-5 h-5" />,
            description: 'Bộ dụng cụ hóa học chuyên nghiệp và phức tạp',
            iframeUrl: 'https://sketchfab.com/models/d72641e31ada4bdba415d61bbc43f2c8/embed'
        },
        {
            id: 14,
            title: 'Phản Ứng Baeyer-Villiger',
            icon: <Orbit className="w-5 h-5" />,
            description: 'Mô phỏng phản ứng oxy hóa Baeyer-Villiger',
            iframeUrl: 'https://sketchfab.com/models/f09f404639384636800dc89d8e8bf665/embed'
        },
    ];

    const [selectedSimulation, setSelectedSimulation] = useState(simulations[0]);
    const [showQuiz, setShowQuiz] = useState(false);

    return (
        <div className="bg-slate-50 flex" style={{ height: 'calc(100vh - 64px)' }}>
            {/* Sidebar - Danh sách mô phỏng */}
            <aside className="w-80 bg-white border-r border-slate-200 flex flex-col">
                <div className="p-6 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Mô Phỏng 3D</h2>
                    <p className="text-sm text-gray-600 mb-6">Chọn một mô phỏng để bắt đầu</p>
                </div>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    <div className="space-y-2">
                        {simulations.map((simulation) => (
                            <button
                                key={simulation.id}
                                onClick={() => setSelectedSimulation(simulation)}
                                className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${selectedSimulation.id === simulation.id
                                    ? 'bg-primary/10 border-2 border-primary shadow-sm'
                                    : 'bg-slate-50 border-2 border-transparent hover:bg-slate-100 hover:border-slate-300'
                                    }`}
                            >
                                <div className="flex items-start space-x-3">
                                    <div className={`mt-1 ${selectedSimulation.id === simulation.id
                                        ? 'text-primary'
                                        : 'text-gray-600'
                                        }`}>
                                        {simulation.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold mb-1 ${selectedSimulation.id === simulation.id
                                            ? 'text-primary'
                                            : 'text-gray-900'
                                            }`}>
                                            {simulation.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {simulation.description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main Content - Preview */}
            <main className="flex-1 flex flex-col bg-slate-100">
                {/* Header */}
                <div className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="text-primary">
                                {selectedSimulation.icon}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {selectedSimulation.title}
                                </h1>
                                <p className="text-sm text-gray-600">
                                    {selectedSimulation.description}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowQuiz(true)}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-primary/90 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <Brain className="w-5 h-5" />
                            Tạo Câu Hỏi Trắc Nghiệm
                        </button>
                    </div>
                </div>

                {/* Preview - 3D Model */}
                <div className="flex-1 p-6">
                    <div className="w-full h-full bg-white rounded-lg shadow-lg">
                        <iframe
                            src={selectedSimulation.iframeUrl}
                            className="w-full h-full rounded-lg"
                            style={{ border: 'none' }}
                            allowFullScreen
                            allow="autoplay; fullscreen; xr-spatial-tracking"
                            title={selectedSimulation.title}
                        />
                    </div>
                </div>
            </main>

            {/* Quiz Generator Modal */}
            {showQuiz && (
                <QuizGenerator
                    reactionTitle={selectedSimulation.id === 15 ? "Phản ứng giữa AgNO3 và NaCl" : selectedSimulation.title}
                    reactionDescription={selectedSimulation.id === 15 ? "Phản ứng trao đổi ion tạo kết tủa trắng AgCl. Phương trình: AgNO3 + NaCl -> AgCl(kết tủa) + NaNO3. Hãy hỏi về hiện tượng, màu sắc kết tủa, phương trình và tính chất các chất." : selectedSimulation.description}
                    onClose={() => setShowQuiz(false)}
                />
            )}

            {/* AI ChatBot */}
            <ChatBot
                contextTitle={selectedSimulation.title}
                contextDescription={selectedSimulation.description}
            />
        </div>
    );
};

export default Simulation;
