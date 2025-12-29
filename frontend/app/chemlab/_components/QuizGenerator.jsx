import { useState } from 'react';
import { Brain, Loader2, CheckCircle2, XCircle, Sparkles, RefreshCw } from 'lucide-react';
import { CHEMLAB_API_URL } from '@/lib/api';

const QuizGenerator = ({ reactionTitle, reactionDescription, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [quiz, setQuiz] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [error, setError] = useState(null);

    const generateQuiz = async () => {
        setLoading(true);
        setError(null);
        setQuiz(null);
        setSelectedAnswers({});
        setShowResults(false);
        setScore(0);

        try {
            const apiUrl = CHEMLAB_API_URL;
            const response = await fetch(`${apiUrl}/api/generate-quiz`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reactionTitle,
                    reactionDescription,
                    numberOfQuestions: 10
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Không thể tạo câu hỏi');
            }

            if (data.success && data.data.questions) {
                setQuiz(data.data);
            } else {
                throw new Error('Dữ liệu trả về không hợp lệ');
            }
        } catch (err) {
            console.error('Error generating quiz:', err);
            setError(err.message || 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerSelect = (questionIndex, answerIndex) => {
        if (showResults) return; // Không cho chọn sau khi nộp bài
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: answerIndex
        });
    };

    const submitQuiz = () => {
        if (!quiz || !quiz.questions) return;

        let correctCount = 0;
        quiz.questions.forEach((question, index) => {
            if (selectedAnswers[index] === question.correctAnswer) {
                correctCount++;
            }
        });

        setScore(correctCount);
        setShowResults(true);
    };

    const resetQuiz = () => {
        setQuiz(null);
        setSelectedAnswers({});
        setShowResults(false);
        setScore(0);
        setError(null);
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-slate-700">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Brain className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Câu Hỏi Trắc Nghiệm</h2>
                            <p className="text-sm text-white/90">{reactionTitle}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <XCircle className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-slate-800">
                    {!quiz && !loading && !error && (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-500/20 rounded-full mb-6">
                                <Sparkles className="w-10 h-10 text-purple-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Tạo Câu Hỏi Trắc Nghiệm
                            </h3>
                            <p className="text-slate-300 mb-8 max-w-md mx-auto">
                                AI sẽ tạo ra 10 câu hỏi trắc nghiệm về phản ứng hóa học này để giúp bạn củng cố kiến thức.
                            </p>
                            <button
                                onClick={generateQuiz}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
                            >
                                <Brain className="w-5 h-5" />
                                Tạo Câu Hỏi
                            </button>
                        </div>
                    )}

                    {loading && (
                        <div className="text-center py-12">
                            <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
                            <p className="text-slate-200">Đang tạo câu hỏi với AI...</p>
                            <p className="text-sm text-slate-400 mt-2">Vui lòng đợi trong giây lát</p>
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/20 rounded-full mb-6">
                                <XCircle className="w-10 h-10 text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Có lỗi xảy ra</h3>
                            <p className="text-slate-300 mb-6 max-w-md mx-auto">{error}</p>
                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={generateQuiz}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all"
                                >
                                    <RefreshCw className="w-5 h-5" />
                                    Thử lại
                                </button>
                                <button
                                    onClick={onClose}
                                    className="inline-flex items-center gap-2 bg-slate-700 text-slate-200 font-semibold px-6 py-3 rounded-xl hover:bg-slate-600 transition-colors"
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    )}

                    {quiz && quiz.questions && (
                        <div className="space-y-6">
                            {quiz.questions.map((question, questionIndex) => {
                                const userAnswer = selectedAnswers[questionIndex];
                                const isCorrect = userAnswer === question.correctAnswer;
                                const showAnswer = showResults;

                                return (
                                    <div
                                        key={questionIndex}
                                        className={`border-2 rounded-xl p-6 transition-all ${showAnswer
                                            ? isCorrect
                                                ? 'border-green-500 bg-green-900/30'
                                                : 'border-red-500 bg-red-900/30'
                                            : 'border-slate-600 bg-slate-700/50 hover:border-purple-400'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${showAnswer
                                                ? isCorrect
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-red-500 text-white'
                                                : 'bg-purple-500/30 text-purple-300'
                                                }`}>
                                                {questionIndex + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-lg font-semibold text-white mb-4">
                                                    {question.question}
                                                </h4>
                                                <div className="space-y-2">
                                                    {question.options.map((option, optionIndex) => {
                                                        const isSelected = userAnswer === optionIndex;
                                                        const isCorrectOption = optionIndex === question.correctAnswer;

                                                        return (
                                                            <button
                                                                key={optionIndex}
                                                                onClick={() => handleAnswerSelect(questionIndex, optionIndex)}
                                                                disabled={showResults}
                                                                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${showResults && isCorrectOption
                                                                    ? 'border-green-500 bg-green-900/40'
                                                                    : showResults && isSelected && !isCorrect
                                                                        ? 'border-red-500 bg-red-900/40'
                                                                        : isSelected
                                                                            ? 'border-purple-500 bg-purple-900/30'
                                                                            : 'border-slate-500 hover:border-purple-400 hover:bg-slate-600/50'
                                                                    } ${showResults ? 'cursor-default' : 'cursor-pointer'}`}
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    {showResults && isCorrectOption && (
                                                                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                                                                    )}
                                                                    {showResults && isSelected && !isCorrect && (
                                                                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                                                    )}
                                                                    <span className="font-medium text-slate-100">{option}</span>
                                                                </div>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                                {showAnswer && question.explanation && (
                                                    <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-900/40 border border-green-500/50' : 'bg-blue-900/40 border border-blue-500/50'
                                                        }`}>
                                                        <p className="text-sm font-semibold text-white mb-1">
                                                            {isCorrect ? '✓ Đúng!' : '✗ Sai'}
                                                        </p>
                                                        <p className="text-sm text-slate-200">
                                                            {question.explanation}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {quiz && quiz.questions && (
                    <div className="border-t border-slate-700 p-6 bg-slate-900">
                        {!showResults ? (
                            <div className="flex items-center justify-between">
                                <p className="text-slate-300">
                                    Đã trả lời: {Object.keys(selectedAnswers).length} / {quiz.questions.length} câu
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={resetQuiz}
                                        className="px-6 py-3 bg-slate-700 text-slate-200 font-semibold rounded-xl hover:bg-slate-600 transition-colors"
                                    >
                                        Tạo lại
                                    </button>
                                    <button
                                        onClick={submitQuiz}
                                        disabled={Object.keys(selectedAnswers).length !== quiz.questions.length}
                                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed"
                                    >
                                        Nộp bài
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full mb-4">
                                    <span className="text-2xl font-bold text-white">{score}/{quiz.questions.length}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {score === quiz.questions.length
                                        ? 'Xuất sắc! 🎉'
                                        : score >= quiz.questions.length * 0.7
                                            ? 'Tốt lắm! 👍'
                                            : 'Cần cố gắng thêm! 💪'}
                                </h3>
                                <p className="text-slate-300 mb-6">
                                    Bạn đã trả lời đúng {score} / {quiz.questions.length} câu hỏi
                                </p>
                                <div className="flex gap-3 justify-center">
                                    <button
                                        onClick={resetQuiz}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all"
                                    >
                                        <RefreshCw className="w-5 h-5" />
                                        Làm lại
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="px-6 py-3 bg-slate-700 text-slate-200 font-semibold rounded-xl hover:bg-slate-600 transition-colors"
                                    >
                                        Đóng
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizGenerator;

