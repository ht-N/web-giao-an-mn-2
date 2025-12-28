"use client";
import { useState, useEffect, useCallback } from 'react';
import {
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Trophy,
    BookOpen,
    Target,
    TrendingUp,
    Lightbulb,
    ArrowRight,
    Play,
    RotateCcw,
    Plus,
    Sparkles,
    Loader2,
    X,
} from 'lucide-react';
import { CHEMLAB_API_URL } from '@/lib/api';

const PeriodicTest = () => {
    // Danh sách các bài kiểm tra
    const testTemplates = [
        {
            id: 1,
            title: 'Kiểm tra Hóa học Cơ bản',
            description: 'Bài kiểm tra về các khái niệm cơ bản trong hóa học',
            duration: 30, // phút
            questions: [
                {
                    id: 1,
                    question: 'Nguyên tử là gì?',
                    options: [
                        'Đơn vị nhỏ nhất của vật chất',
                        'Hạt nhỏ nhất của nguyên tố hóa học',
                        'Phân tử nhỏ nhất',
                        'Ion dương'
                    ],
                    correctAnswer: 1,
                    topic: 'Cấu trúc nguyên tử',
                    explanation: 'Nguyên tử là hạt nhỏ nhất của nguyên tố hóa học, không thể chia nhỏ hơn bằng các phương pháp hóa học thông thường.'
                },
                {
                    id: 2,
                    question: 'Công thức hóa học của nước là gì?',
                    options: ['H2O', 'CO2', 'O2', 'H2'],
                    correctAnswer: 0,
                    topic: 'Công thức hóa học',
                    explanation: 'Nước có công thức hóa học là H2O, gồm 2 nguyên tử hydro và 1 nguyên tử oxy.'
                },
                {
                    id: 3,
                    question: 'pH của dung dịch trung tính là bao nhiêu?',
                    options: ['0', '7', '14', '10'],
                    correctAnswer: 1,
                    topic: 'Axit và Bazơ',
                    explanation: 'pH = 7 là giá trị trung tính. pH < 7 là axit, pH > 7 là bazơ.'
                },
                {
                    id: 4,
                    question: 'Nguyên tố nào có ký hiệu hóa học là Na?',
                    options: ['Nitơ', 'Natri', 'Neon', 'Niken'],
                    correctAnswer: 1,
                    topic: 'Bảng tuần hoàn',
                    explanation: 'Na là ký hiệu hóa học của Natri (Sodium), một kim loại kiềm.'
                },
                {
                    id: 5,
                    question: 'Phản ứng hóa học nào sau đây là phản ứng tỏa nhiệt?',
                    options: [
                        'Phản ứng đốt cháy',
                        'Phản ứng hòa tan muối trong nước',
                        'Phản ứng quang hợp',
                        'Tất cả đều đúng'
                    ],
                    correctAnswer: 0,
                    topic: 'Phản ứng hóa học',
                    explanation: 'Phản ứng đốt cháy là phản ứng tỏa nhiệt điển hình, giải phóng năng lượng dưới dạng nhiệt và ánh sáng.'
                },
                {
                    id: 6,
                    question: 'Khối lượng mol của CO2 là bao nhiêu? (C=12, O=16)',
                    options: ['28 g/mol', '44 g/mol', '32 g/mol', '16 g/mol'],
                    correctAnswer: 1,
                    topic: 'Tính toán hóa học',
                    explanation: 'CO2 = 12 + 16×2 = 12 + 32 = 44 g/mol'
                },
                {
                    id: 7,
                    question: 'Chất nào sau đây là axit?',
                    options: ['NaOH', 'HCl', 'NaCl', 'Ca(OH)2'],
                    correctAnswer: 1,
                    topic: 'Axit và Bazơ',
                    explanation: 'HCl (axit clohidric) là một axit mạnh. NaOH và Ca(OH)2 là bazơ, NaCl là muối.'
                },
                {
                    id: 8,
                    question: 'Trong bảng tuần hoàn, các nguyên tố được sắp xếp theo:',
                    options: [
                        'Khối lượng nguyên tử tăng dần',
                        'Số hiệu nguyên tử tăng dần',
                        'Bán kính nguyên tử tăng dần',
                        'Độ âm điện tăng dần'
                    ],
                    correctAnswer: 1,
                    topic: 'Bảng tuần hoàn',
                    explanation: 'Các nguyên tố trong bảng tuần hoàn được sắp xếp theo số hiệu nguyên tử (số proton) tăng dần.'
                },
                {
                    id: 9,
                    question: 'Liên kết ion được hình thành giữa:',
                    options: [
                        'Hai nguyên tử kim loại',
                        'Kim loại và phi kim',
                        'Hai nguyên tử phi kim',
                        'Hai nguyên tử cùng loại'
                    ],
                    correctAnswer: 1,
                    topic: 'Liên kết hóa học',
                    explanation: 'Liên kết ion được hình thành giữa kim loại (cho electron) và phi kim (nhận electron).'
                },
                {
                    id: 10,
                    question: 'Chất nào sau đây là chất khử?',
                    options: ['O2', 'H2', 'Cl2', 'F2'],
                    correctAnswer: 1,
                    topic: 'Phản ứng oxi hóa - khử',
                    explanation: 'H2 (hydro) là chất khử vì nó có thể cho electron. O2, Cl2, F2 là các chất oxi hóa.'
                }
            ]
        },
        {
            id: 2,
            title: 'Kiểm tra Hóa học Hữu cơ',
            description: 'Bài kiểm tra về các hợp chất hữu cơ và phản ứng hữu cơ',
            duration: 45,
            questions: [
                {
                    id: 1,
                    question: 'Công thức chung của ankan là gì?',
                    options: ['CnH2n', 'CnH2n+2', 'CnH2n-2', 'CnH2n+1OH'],
                    correctAnswer: 1,
                    topic: 'Hidrocacbon',
                    explanation: 'Ankan có công thức chung là CnH2n+2, là hidrocacbon no, mạch hở.'
                },
                {
                    id: 2,
                    question: 'Chất nào sau đây là ancol?',
                    options: ['CH3COOH', 'CH3OH', 'CH3CHO', 'CH3COCH3'],
                    correctAnswer: 1,
                    topic: 'Dẫn xuất hidrocacbon',
                    explanation: 'CH3OH (metanol) là ancol. CH3COOH là axit, CH3CHO là anđehit, CH3COCH3 là xeton.'
                },
                {
                    id: 3,
                    question: 'Phản ứng este hóa xảy ra giữa:',
                    options: [
                        'Axit và bazơ',
                        'Axit và ancol',
                        'Ancol và ancol',
                        'Axit và muối'
                    ],
                    correctAnswer: 1,
                    topic: 'Este',
                    explanation: 'Phản ứng este hóa xảy ra giữa axit cacboxylic và ancol, tạo ra este và nước.'
                },
                {
                    id: 4,
                    question: 'Glucozơ thuộc nhóm hợp chất nào?',
                    options: ['Axit', 'Ancol', 'Cacbohidrat', 'Amin'],
                    correctAnswer: 2,
                    topic: 'Cacbohidrat',
                    explanation: 'Glucozơ là một monosaccarit, thuộc nhóm cacbohidrat.'
                },
                {
                    id: 5,
                    question: 'Liên kết đôi C=C có đặc điểm gì?',
                    options: [
                        'Bền và khó phản ứng',
                        'Dễ tham gia phản ứng cộng',
                        'Chỉ có trong ankan',
                        'Không tồn tại trong tự nhiên'
                    ],
                    correctAnswer: 1,
                    topic: 'Hidrocacbon không no',
                    explanation: 'Liên kết đôi C=C dễ tham gia phản ứng cộng với H2, Br2, HX...'
                }
            ]
        },
        {
            id: 3,
            title: 'Kiểm tra Phản ứng Hóa học',
            description: 'Bài kiểm tra về các loại phản ứng hóa học và cân bằng phương trình',
            duration: 40,
            questions: [
                {
                    id: 1,
                    question: 'Phản ứng nào sau đây là phản ứng phân hủy?',
                    options: [
                        '2H2 + O2 → 2H2O',
                        'CaCO3 → CaO + CO2',
                        'Zn + 2HCl → ZnCl2 + H2',
                        'NaOH + HCl → NaCl + H2O'
                    ],
                    correctAnswer: 1,
                    topic: 'Phân loại phản ứng',
                    explanation: 'CaCO3 → CaO + CO2 là phản ứng phân hủy (một chất tạo thành nhiều chất).'
                },
                {
                    id: 2,
                    question: 'Hệ số cân bằng đúng của phản ứng: Fe + O2 → Fe2O3 là:',
                    options: ['2, 3, 1', '4, 3, 2', '1, 1, 1', '2, 1, 1'],
                    correctAnswer: 1,
                    topic: 'Cân bằng phương trình',
                    explanation: '4Fe + 3O2 → 2Fe2O3 là phương trình đã cân bằng đúng.'
                },
                {
                    id: 3,
                    question: 'Trong phản ứng oxi hóa-khử, chất oxi hóa:',
                    options: [
                        'Nhận electron',
                        'Cho electron',
                        'Không thay đổi số oxi hóa',
                        'Luôn là kim loại'
                    ],
                    correctAnswer: 0,
                    topic: 'Phản ứng oxi hóa - khử',
                    explanation: 'Chất oxi hóa nhận electron và bị khử (số oxi hóa giảm).'
                },
                {
                    id: 4,
                    question: 'Phản ứng trao đổi ion xảy ra khi:',
                    options: [
                        'Tạo ra chất kết tủa',
                        'Tạo ra chất khí',
                        'Tạo ra chất điện li yếu',
                        'Tất cả các trường hợp trên'
                    ],
                    correctAnswer: 3,
                    topic: 'Phản ứng trao đổi',
                    explanation: 'Phản ứng trao đổi ion xảy ra khi tạo ra chất kết tủa, chất khí hoặc chất điện li yếu.'
                },
                {
                    id: 5,
                    question: 'Tốc độ phản ứng tăng khi:',
                    options: [
                        'Giảm nhiệt độ',
                        'Giảm nồng độ chất phản ứng',
                        'Tăng diện tích bề mặt',
                        'Không có chất xúc tác'
                    ],
                    correctAnswer: 2,
                    topic: 'Tốc độ phản ứng',
                    explanation: 'Tăng diện tích bề mặt (nghiền nhỏ chất rắn) làm tăng tốc độ phản ứng.'
                }
            ]
        }
    ];

    const [selectedTest, setSelectedTest] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [isTestStarted, setIsTestStarted] = useState(false);
    const [isTestFinished, setIsTestFinished] = useState(false);
    const [results, setResults] = useState(null);
    const [shouldAutoSubmit, setShouldAutoSubmit] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [createForm, setCreateForm] = useState({
        title: '',
        description: '',
        numberOfQuestions: 10,
        duration: 30,
        topic: ''
    });

    // Khởi động timer
    useEffect(() => {
        if (isTestStarted && !isTestFinished && timeRemaining > 0) {
            const interval = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        setShouldAutoSubmit(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isTestStarted, isTestFinished, timeRemaining]);

    const startTest = (test: any) => {
        setSelectedTest(test);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setTimeRemaining(test.duration * 60); // Chuyển phút sang giây
        setIsTestStarted(true);
        setIsTestFinished(false);
        setResults(null);
        setShouldAutoSubmit(false);
    };

    const handleAnswerSelect = (questionId: any, answerIndex: any) => {
        setAnswers({
            ...answers,
            [questionId]: answerIndex
        });
    };

    const handleNextQuestion = () => {
        if (selectedTest && currentQuestionIndex < selectedTest.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const getEvaluation = (score: any, topicAnalysis: any, questionResults: any) => {
        const evaluation = {
            level: '',
            message: '',
            strengths: [] as any[],
            weaknesses: [] as any[],
            recommendations: [] as any[]
        };

        // Xác định mức độ
        if (score >= 90) {
            evaluation.level = 'Xuất sắc';
            evaluation.message = 'Bạn đã thể hiện kiến thức rất tốt! Hãy tiếp tục duy trì và mở rộng kiến thức.';
        } else if (score >= 75) {
            evaluation.level = 'Tốt';
            evaluation.message = 'Bạn có nền tảng kiến thức vững chắc. Cần củng cố thêm một số phần.';
        } else if (score >= 60) {
            evaluation.level = 'Khá';
            evaluation.message = 'Bạn đã nắm được kiến thức cơ bản. Cần ôn tập kỹ hơn các phần còn yếu.';
        } else if (score >= 50) {
            evaluation.level = 'Trung bình';
            evaluation.message = 'Bạn cần ôn tập lại kiến thức. Hãy dành thời gian học lại các chủ đề cơ bản.';
        } else {
            evaluation.level = 'Cần cải thiện';
            evaluation.message = 'Bạn cần dành nhiều thời gian hơn để ôn tập và nắm vững kiến thức cơ bản.';
        }

        // Phân tích điểm mạnh và điểm yếu
        Object.keys(topicAnalysis).forEach((topic) => {
            const accuracy = (topicAnalysis[topic].correct / topicAnalysis[topic].total) * 100;
            if (accuracy >= 80) {
                evaluation.strengths.push({
                    topic,
                    accuracy: Math.round(accuracy)
                });
            } else if (accuracy < 60) {
                evaluation.weaknesses.push({
                    topic,
                    accuracy: Math.round(accuracy),
                    questions: questionResults.filter((q: any) => q.topic === topic && !q.isCorrect)
                });
            }
        });

        // Đưa ra gợi ý
        if (evaluation.weaknesses.length > 0) {
            evaluation.recommendations.push(
                `Ôn tập lại các chủ đề: ${evaluation.weaknesses.map(w => w.topic).join(', ')}`
            );
        }

        if (score < 75) {
            evaluation.recommendations.push(
                'Làm thêm các bài tập và ví dụ thực hành để củng cố kiến thức'
            );
        }

        if (evaluation.weaknesses.some(w => w.accuracy < 50)) {
            evaluation.recommendations.push(
                'Xem lại lý thuyết cơ bản và các khái niệm quan trọng'
            );
        }

        evaluation.recommendations.push(
            'Thực hành thêm các bài kiểm tra tương tự để nâng cao kỹ năng'
        );

        return evaluation;
    };

    const handleSubmitTest = useCallback(() => {
        if (!selectedTest) return;

        let correctCount = 0;
        const questionResults = selectedTest.questions.map((q: any) => {
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.correctAnswer;
            if (isCorrect) correctCount++;
            return {
                ...q,
                userAnswer,
                isCorrect
            };
        });

        const score = (correctCount / selectedTest.questions.length) * 100;
        const timeUsed = selectedTest.duration * 60 - timeRemaining;

        // Phân tích kết quả theo chủ đề
        const topicAnalysis: any = {};
        questionResults.forEach((q: any) => {
            if (!topicAnalysis[q.topic]) {
                topicAnalysis[q.topic] = { total: 0, correct: 0 };
            }
            topicAnalysis[q.topic].total++;
            if (q.isCorrect) {
                topicAnalysis[q.topic].correct++;
            }
        });

        // Đánh giá và gợi ý
        const evaluation = getEvaluation(score, topicAnalysis, questionResults);

        setResults({
            score: Math.round(score),
            correctCount,
            totalQuestions: selectedTest.questions.length,
            timeUsed,
            questionResults,
            topicAnalysis,
            evaluation
        } as any);

        setIsTestFinished(true);
        setIsTestStarted(false);
    }, [selectedTest, answers, timeRemaining]);

    // Tự động submit khi hết thời gian
    useEffect(() => {
        if (shouldAutoSubmit && selectedTest && !isTestFinished) {
            handleSubmitTest();
            setShouldAutoSubmit(false);
        }
    }, [shouldAutoSubmit, selectedTest, isTestFinished, handleSubmitTest]);

    const resetTest = () => {
        setSelectedTest(null);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setTimeRemaining(0);
        setIsTestStarted(false);
        setIsTestFinished(false);
        setResults(null);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleCreateTest = async () => {
        if (!createForm.title.trim() || !createForm.topic.trim()) {
            alert('Vui lòng điền đầy đủ tiêu đề và chủ đề');
            return;
        }

        setIsGenerating(true);
        try {
            const apiUrl = CHEMLAB_API_URL;
            const response = await fetch(`${apiUrl}/api/generate-quiz`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reactionTitle: createForm.title,
                    reactionDescription: createForm.description || createForm.topic,
                    numberOfQuestions: createForm.numberOfQuestions
                })
            });

            if (!response.ok) {
                let errorMessage = 'Không thể tạo câu hỏi';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorData.details || errorMessage;
                } catch (e) {
                    errorMessage = `Lỗi ${response.status}: ${response.statusText}`;
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();

            if (data.success && data.data && data.data.questions) {
                // Chuyển đổi dữ liệu từ API sang format bài kiểm tra
                const generatedQuestions = data.data.questions.map((q: any, index: number) => ({
                    id: index + 1,
                    question: q.question,
                    options: q.options.map((opt: string) => {
                        // Loại bỏ prefix A. B. C. D. nếu có
                        return opt.replace(/^[A-D]\.\s*/, '').trim();
                    }),
                    correctAnswer: q.correctAnswer,
                    topic: createForm.topic,
                    explanation: q.explanation || 'Không có giải thích'
                }));

                const customTest = {
                    id: Date.now(), // ID duy nhất
                    title: createForm.title,
                    description: createForm.description || `Bài kiểm tra về ${createForm.topic}`,
                    duration: createForm.duration,
                    questions: generatedQuestions
                };

                // Đóng modal và bắt đầu bài kiểm tra
                setShowCreateModal(false);
                setCreateForm({
                    title: '',
                    description: '',
                    numberOfQuestions: 10,
                    duration: 30,
                    topic: ''
                });
                startTest(customTest);
            } else {
                throw new Error('Dữ liệu trả về không hợp lệ');
            }
        } catch (error: any) {
            console.error('Error creating test:', error);
            let errorMessage = error.message || 'Không thể tạo bài kiểm tra.';

            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError') || error.name === 'TypeError') {
                errorMessage = 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và thử lại sau.';
            }

            alert(errorMessage);
        } finally {
            setIsGenerating(false);
        }
    };

    // Màn hình chọn bài kiểm tra
    if (!selectedTest && !isTestFinished) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl mb-4 shadow-lg">
                            <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">
                            Bài Kiểm Tra Định Kỳ
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Chọn một bài kiểm tra để bắt đầu. Mỗi bài kiểm tra có thời gian giới hạn và sẽ đánh giá kết quả học tập của bạn.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Card tạo bài kiểm tra tùy chỉnh */}
                        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-2 border-purple-300 transform hover:scale-105">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-sm font-semibold text-white/90 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                    Tùy chỉnh
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                Tạo Bài Kiểm Tra
                            </h3>
                            <p className="text-white/90 mb-4 text-sm">
                                Tạo bài kiểm tra tùy chỉnh theo yêu cầu của bạn với AI
                            </p>
                            <div className="flex items-center text-sm text-white/80 mb-4">
                                <Plus className="w-4 h-4 mr-2" />
                                Tạo mới với AI
                            </div>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="w-full bg-white text-purple-600 font-semibold py-3 rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                            >
                                <Sparkles className="w-5 h-5" />
                                Tạo bài kiểm tra
                            </button>
                        </div>

                        {testTemplates.map((test) => (
                            <div
                                key={test.id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-500 rounded-xl flex items-center justify-center">
                                        <Target className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                        {test.duration} phút
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {test.title}
                                </h3>
                                <p className="text-gray-600 mb-4 text-sm">
                                    {test.description}
                                </p>
                                <div className="flex items-center text-sm text-gray-500 mb-4">
                                    <AlertCircle className="w-4 h-4 mr-2" />
                                    {test.questions.length} câu hỏi
                                </div>
                                <button
                                    onClick={() => startTest(test)}
                                    className="w-full bg-gradient-to-r from-primary to-blue-600 text-white font-semibold py-3 rounded-xl hover:from-primary/90 hover:to-blue-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                                >
                                    <Play className="w-5 h-5" />
                                    Bắt đầu kiểm tra
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Modal tạo bài kiểm tra */}
                    {showCreateModal && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                {/* Header */}
                                <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                            <Sparkles className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">Tạo Bài Kiểm Tra Tùy Chỉnh</h2>
                                            <p className="text-white/90 text-sm">Nhập thông tin để AI tạo bài kiểm tra cho bạn</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowCreateModal(false)}
                                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                        disabled={isGenerating}
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Form */}
                                <div className="p-6 space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Tiêu đề bài kiểm tra <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={createForm.title}
                                            onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                                            placeholder="Ví dụ: Kiểm tra về Axit và Bazơ"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                                            disabled={isGenerating}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Chủ đề <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={createForm.topic}
                                            onChange={(e) => setCreateForm({ ...createForm, topic: e.target.value })}
                                            placeholder="Ví dụ: Axit và Bazơ, Phản ứng oxi hóa-khử, Hóa học hữu cơ..."
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                                            disabled={isGenerating}
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Chủ đề chính của bài kiểm tra</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Mô tả (tùy chọn)
                                        </label>
                                        <textarea
                                            value={createForm.description}
                                            onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                                            placeholder="Mô tả chi tiết về nội dung bạn muốn kiểm tra..."
                                            rows={3}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
                                            disabled={isGenerating}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Số câu hỏi
                                            </label>
                                            <input
                                                type="number"
                                                value={createForm.numberOfQuestions}
                                                onChange={(e) => setCreateForm({ ...createForm, numberOfQuestions: parseInt(e.target.value) || 10 })}
                                                min="5"
                                                max="20"
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                                                disabled={isGenerating}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Thời gian (phút)
                                            </label>
                                            <input
                                                type="number"
                                                value={createForm.duration}
                                                onChange={(e) => setCreateForm({ ...createForm, duration: parseInt(e.target.value) || 30 })}
                                                min="10"
                                                max="120"
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                                                disabled={isGenerating}
                                            />
                                        </div>
                                    </div>

                                    {isGenerating && (
                                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-center gap-3">
                                            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                                            <div>
                                                <p className="font-semibold text-blue-900">Đang tạo bài kiểm tra...</p>
                                                <p className="text-sm text-blue-700">AI đang tạo câu hỏi, vui lòng đợi trong giây lát</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Buttons */}
                                    <div className="flex gap-4 pt-4">
                                        <button
                                            onClick={() => setShowCreateModal(false)}
                                            disabled={isGenerating}
                                            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            onClick={handleCreateTest}
                                            disabled={isGenerating || !createForm.title.trim() || !createForm.topic.trim()}
                                            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {isGenerating ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Đang tạo...
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="w-5 h-5" />
                                                    Tạo bài kiểm tra
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Màn hình làm bài kiểm tra
    if (selectedTest && isTestStarted && !isTestFinished) {
        const currentQuestion: any = selectedTest.questions[currentQuestionIndex];
        const progress = ((currentQuestionIndex + 1) / selectedTest.questions.length) * 100;

        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header với timer và progress */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {selectedTest.title}
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    Câu {currentQuestionIndex + 1} / {selectedTest.questions.length}
                                </p>
                            </div>
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-lg ${timeRemaining < 300 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                                }`}>
                                <Clock className="w-5 h-5" />
                                {formatTime(timeRemaining)}
                            </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-primary to-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Câu hỏi */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                        <div className="mb-6">
                            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full mb-4">
                                {currentQuestion.topic}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 mb-6">
                                {currentQuestion.question}
                            </h3>
                        </div>

                        <div className="space-y-3">
                            {currentQuestion.options.map((option: string, index: number) => {
                                const isSelected = answers[currentQuestion.id] === index;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${isSelected
                                            ? 'border-primary bg-primary/5 shadow-md'
                                            : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected
                                                ? 'border-primary bg-primary'
                                                : 'border-gray-300'
                                                }`}>
                                                {isSelected && (
                                                    <div className="w-3 h-3 rounded-full bg-white" />
                                                )}
                                            </div>
                                            <span className="font-medium text-gray-900">
                                                {String.fromCharCode(65 + index)}. {option}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between bg-white rounded-2xl shadow-lg p-6">
                        <button
                            onClick={handlePreviousQuestion}
                            disabled={currentQuestionIndex === 0}
                            className="px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:hover:bg-gray-100"
                        >
                            ← Câu trước
                        </button>

                        <div className="flex gap-2">
                            {selectedTest.questions.map((_: any, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentQuestionIndex(index)}
                                    className={`w-10 h-10 rounded-lg font-semibold transition-all ${index === currentQuestionIndex
                                        ? 'bg-primary text-white'
                                        : answers[selectedTest.questions[index].id] !== undefined
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        {currentQuestionIndex === selectedTest.questions.length - 1 ? (
                            <button
                                onClick={handleSubmitTest}
                                className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
                            >
                                Nộp bài
                            </button>
                        ) : (
                            <button
                                onClick={handleNextQuestion}
                                className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-primary to-blue-600 text-white hover:from-primary/90 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                            >
                                Câu tiếp →
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Màn hình kết quả
    if (results) {
        const { score, correctCount, totalQuestions, timeUsed, questionResults, evaluation }: any = results;

        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Header kết quả */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 text-center">
                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${score >= 90 ? 'bg-green-100' :
                            score >= 75 ? 'bg-blue-100' :
                                score >= 60 ? 'bg-yellow-100' :
                                    'bg-red-100'
                            }`}>
                            {score >= 90 ? (
                                <Trophy className="w-10 h-10 text-green-600" />
                            ) : score >= 75 ? (
                                <CheckCircle2 className="w-10 h-10 text-blue-600" />
                            ) : (
                                <AlertCircle className="w-10 h-10 text-yellow-600" />
                            )}
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Kết Quả Kiểm Tra
                        </h1>
                        <div className="text-6xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-4">
                            {score}%
                        </div>
                        <p className="text-lg text-gray-600 mb-4">
                            {correctCount} / {totalQuestions} câu đúng
                        </p>
                        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Thời gian: {formatTime(timeUsed)}
                            </div>
                            <div className="flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                Mức độ: {evaluation.level}
                            </div>
                        </div>
                    </div>

                    {/* Đánh giá tổng quan */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                        <div className="flex items-start gap-3 mb-4">
                            <TrendingUp className="w-6 h-6 text-primary mt-1" />
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                    Đánh Giá Kết Quả
                                </h2>
                                <p className="text-gray-700">
                                    {evaluation.message}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Điểm mạnh */}
                    {evaluation.strengths.length > 0 && (
                        <div className="bg-green-50 border-2 border-green-200 rounded-2xl shadow-lg p-6 mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                                <h2 className="text-xl font-bold text-gray-900">
                                    Điểm Mạnh
                                </h2>
                            </div>
                            <div className="space-y-3">
                                {evaluation.strengths.map((strength: any, index: number) => (
                                    <div key={index} className="bg-white rounded-xl p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-gray-900">
                                                {strength.topic}
                                            </span>
                                            <span className="text-green-600 font-bold">
                                                {strength.accuracy}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Điểm cần cải thiện */}
                    {evaluation.weaknesses.length > 0 && (
                        <div className="bg-red-50 border-2 border-red-200 rounded-2xl shadow-lg p-6 mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <XCircle className="w-6 h-6 text-red-600" />
                                <h2 className="text-xl font-bold text-gray-900">
                                    Điểm Cần Cải Thiện
                                </h2>
                            </div>
                            <div className="space-y-4">
                                {evaluation.weaknesses.map((weakness: any, index: number) => (
                                    <div key={index} className="bg-white rounded-xl p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="font-semibold text-gray-900">
                                                {weakness.topic}
                                            </span>
                                            <span className="text-red-600 font-bold">
                                                {weakness.accuracy}%
                                            </span>
                                        </div>
                                        {weakness.questions.length > 0 && (
                                            <div className="mt-3 pt-3 border-t border-gray-200">
                                                <p className="text-sm font-semibold text-gray-700 mb-2">
                                                    Câu hỏi sai:
                                                </p>
                                                {weakness.questions.map((q: any, qIndex: number) => (
                                                    <div key={qIndex} className="mb-3 last:mb-0">
                                                        <p className="text-sm text-gray-700 mb-1">
                                                            <strong>Q{q.id}:</strong> {q.question}
                                                        </p>
                                                        <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                                                            <strong>Giải thích:</strong> {q.explanation}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Gợi ý cải thiện */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl shadow-lg p-6 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Lightbulb className="w-6 h-6 text-blue-600" />
                            <h2 className="text-xl font-bold text-gray-900">
                                Gợi Ý Cải Thiện
                            </h2>
                        </div>
                        <ul className="space-y-3">
                            {evaluation.recommendations.map((rec: string, index: number) => (
                                <li key={index} className="flex items-start gap-3">
                                    <ArrowRight className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">{rec}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Chi tiết từng câu hỏi */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Chi Tiết Từng Câu Hỏi
                        </h2>
                        <div className="space-y-4">
                            {questionResults.map((q: any) => (
                                <div
                                    key={q.id}
                                    className={`border-2 rounded-xl p-4 ${q.isCorrect
                                        ? 'border-green-200 bg-green-50'
                                        : 'border-red-200 bg-red-50'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            {q.isCorrect ? (
                                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                            ) : (
                                                <XCircle className="w-5 h-5 text-red-600" />
                                            )}
                                            <span className="font-semibold text-gray-900">
                                                Câu {q.id}: {q.question}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ml-7 space-y-2">
                                        <p className="text-sm text-gray-700">
                                            <strong>Đáp án đúng:</strong>{' '}
                                            <span className="text-green-700">
                                                {String.fromCharCode(65 + q.correctAnswer)}. {q.options[q.correctAnswer]}
                                            </span>
                                        </p>
                                        {!q.isCorrect && q.userAnswer !== undefined && (
                                            <p className="text-sm text-gray-700">
                                                <strong>Đáp án của bạn:</strong>{' '}
                                                <span className="text-red-700">
                                                    {String.fromCharCode(65 + q.userAnswer)}. {q.options[q.userAnswer]}
                                                </span>
                                            </p>
                                        )}
                                        <p className="text-sm text-gray-600 bg-white p-2 rounded mt-2">
                                            <strong>Giải thích:</strong> {q.explanation}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Nút làm lại */}
                    <div className="text-center">
                        <button
                            onClick={resetTest}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold rounded-xl hover:from-primary/90 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
                        >
                            <RotateCcw className="w-5 h-5" />
                            Làm lại bài kiểm tra
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default PeriodicTest;
