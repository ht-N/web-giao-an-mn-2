import { useState, useRef, useEffect } from 'react';
import {
    MessageCircle,
    Send,
    X,
    Bot,
    User,
    Loader2,
    Minimize2,
    Maximize2,
} from 'lucide-react';
import { CHEMLAB_API_URL } from '@/lib/api';

const ChatBot = ({ contextTitle, contextDescription }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Xin chào! Tôi là trợ lý AI chuyên về hóa học. Tôi có thể giúp bạn giải đáp các câu hỏi về hóa học, giải thích các khái niệm, và hỗ trợ bạn trong việc học tập. Bạn muốn hỏi gì?'
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && !isMinimized) {
            inputRef.current?.focus();
        }
    }, [isOpen, isMinimized]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = {
            role: 'user',
            content: inputMessage.trim()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            const apiUrl = CHEMLAB_API_URL;

            // Tạo AbortController để có thể timeout (giảm xuống 30 giây)
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 giây timeout

            const response = await fetch(`${apiUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage.content,
                    context: contextTitle ? {
                        title: contextTitle,
                        description: contextDescription || ''
                    } : null,
                    conversationHistory: messages.slice(-5).map(msg => ({
                        role: msg.role,
                        content: msg.content
                    }))
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                let errorMessage = `Lỗi ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorData.details || errorMessage;
                } catch (e) {
                    // Nếu không parse được JSON, dùng status text
                    errorMessage = response.status === 404
                        ? 'Không tìm thấy API endpoint. Vui lòng kiểm tra server đang chạy đúng.'
                        : `Lỗi ${response.status}: ${response.statusText}`;
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Không thể nhận phản hồi từ AI');
            }

            // Kiểm tra nếu response rỗng hoặc không hợp lệ
            let responseText = data.response;
            if (!responseText || responseText.trim().length === 0) {
                responseText = 'Xin lỗi, tôi gặp khó khăn khi xử lý câu hỏi này. Vui lòng thử lại hoặc diễn đạt lại câu hỏi một cách rõ ràng hơn.';
            }

            const assistantMessage = {
                role: 'assistant',
                content: responseText
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            let errorContent = 'Xin lỗi, có lỗi xảy ra khi kết nối đến AI.';

            if (error.name === 'AbortError') {
                errorContent = 'Yêu cầu bị timeout. Vui lòng thử lại với câu hỏi ngắn gọn hơn.';
            } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError') || error.message.includes('fetch')) {
                errorContent = 'Không thể kết nối đến server. Vui lòng:\n1. Đảm bảo server đang chạy tại http://localhost:5175\n2. Kiểm tra kết nối mạng\n3. Thử lại sau';
            } else if (error.message.includes('404') || error.message.includes('không tìm thấy')) {
                errorContent = 'Không tìm thấy API endpoint.\nVui lòng:\n1. Kiểm tra server đang chạy tại http://localhost:5175\n2. Kiểm tra console để xem chi tiết lỗi';
            } else if (error.message.includes('429') || error.message.includes('quota') || error.message.includes('giới hạn')) {
                errorContent = 'Đã vượt quá giới hạn số lượng yêu cầu.\nVui lòng:\n1. Đợi vài phút rồi thử lại\n2. Hoặc kiểm tra quota của API key';
            } else if (error.message) {
                errorContent = error.message.startsWith('Lỗi:') ? error.message : `Lỗi: ${error.message}`;
            }

            const errorMessage = {
                role: 'assistant',
                content: errorContent
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const clearChat = () => {
        setMessages([
            {
                role: 'assistant',
                content: 'Xin chào! Tôi là trợ lý AI chuyên về hóa học. Tôi có thể giúp bạn giải đáp các câu hỏi về hóa học, giải thích các khái niệm, và hỗ trợ bạn trong việc học tập. Bạn muốn hỏi gì?'
            }
        ]);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center z-50 hover:scale-110 group"
                aria-label="Mở chatbot"
            >
                <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>
        );
    }

    return (
        <div
            className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isMinimized ? 'w-80' : 'w-96'
                }`}
        >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <Bot className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">AI Trợ Lý Hóa Học</h3>
                            <p className="text-xs text-white/90">Sẵn sàng hỗ trợ bạn</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsMinimized(!isMinimized)}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                            aria-label={isMinimized ? 'Mở rộng' : 'Thu nhỏ'}
                        >
                            {isMinimized ? (
                                <Maximize2 className="w-5 h-5" />
                            ) : (
                                <Minimize2 className="w-5 h-5" />
                            )}
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                            aria-label="Đóng"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {!isMinimized && (
                    <>
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" style={{ maxHeight: '500px', minHeight: '400px' }}>
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {message.role === 'assistant' && (
                                        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Bot className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                            ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white'
                                            : 'bg-white text-gray-900 border border-gray-200'
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                                    </div>
                                    {message.role === 'user' && (
                                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                                            <User className="w-5 h-5 text-gray-600" />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3 justify-start">
                                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                                        <Loader2 className="w-5 h-5 text-primary-600 animate-spin" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-gray-200">
                            <div className="flex gap-2">
                                <textarea
                                    ref={inputRef}
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Nhập câu hỏi của bạn..."
                                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none resize-none"
                                    rows={1}
                                    style={{ minHeight: '48px', maxHeight: '120px' }}
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!inputMessage.trim() || isLoading}
                                    className="px-4 py-3 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-xl hover:from-primary-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    aria-label="Gửi tin nhắn"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Send className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            <button
                                onClick={clearChat}
                                className="mt-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                Xóa lịch sử chat
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ChatBot;

