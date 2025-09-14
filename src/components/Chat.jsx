import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Sparkles, Bot, User, Zap } from 'lucide-react';

const ChatMessage = ({ message, isAi }) => {
    return (
        <div className={`flex ${isAi ? 'justify-start' : 'justify-end'} mb-6 animate-slide-up`}>
            <div className={`flex max-w-4xl ${isAi ? 'flex-row' : 'flex-row-reverse'} items-end gap-4`}>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 ${isAi
                    ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-pulse-soft'
                    : 'bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500'
                    }`}>
                    {isAi ? <Bot size={20} className="text-white drop-shadow-sm" /> : <User size={20} className="text-white drop-shadow-sm" />}
                </div>
                <div className={`relative px-6 py-4 rounded-2xl shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl ${isAi
                    ? 'bg-gray-800/90 border border-gray-700/50 text-gray-100'
                    : 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white'
                    } ${isAi ? 'rounded-bl-sm' : 'rounded-br-sm'} max-w-lg lg:max-w-3xl`}>
                    <div className={`absolute inset-0 rounded-2xl ${isAi ? 'rounded-bl-sm' : 'rounded-br-sm'} bg-gradient-to-br ${isAi
                        ? 'from-gray-700/20 to-gray-900/20'
                        : 'from-white/10 to-transparent'
                        } pointer-events-none`}></div>
                    <p className="relative text-sm leading-relaxed whitespace-pre-wrap break-words font-times tracking-wide">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
};

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
        if (inputRef.current && !isLoading) {
            inputRef.current.focus();
        }
    }, [messages, isLoading]);

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { text: userMessage, isAi: false }]);
        setIsLoading(true);

        try {
            const response = await fetch('https://nexa-tak6.onrender.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setMessages(prev => [...prev, { text: data.message || 'No response received', isAi: true }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                text: 'I apologize, but I encountered an error while processing your request. Please try again in a moment.',
                isAi: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
            {/* Animated Background */}
            {/* <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            </div> */}

            {/* Header */}
            <div className="relative bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50 shadow-2xl ">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-pink-900/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-8 py-2">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-2xl opacity-75 animate-pulse-soft"></div>
                            <div className="relative p-3 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl text-white shadow-2xl transform transition-transform hover:scale-105">
                                <Zap size={28} className="drop-shadow-lg" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-4xl sm:text-5xl font-cursive bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg animate-gradient-x">
                                Nexa
                            </h1>
                            <p className="text-sm text-gray-400 font-times tracking-wider mt-1">
                                Intelligent Conversation Assistant
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-8 z-10">
                <div className="max-w-full mx-auto px-8">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
                            <div className="relative mb-12">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-30 animate-ping"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
                                <div className="relative p-8 bg-gray-800/90 backdrop-blur-sm rounded-full shadow-2xl border border-gray-700/50">
                                    <MessageCircle className="w-16 h-16 text-indigo-400 drop-shadow-lg" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-times text-white mb-4 tracking-wide">Welcome to Nexa</h2>
                            <p className="text-gray-400 mb-8 max-w-md font-times leading-relaxed">
                                Experience the future of intelligent conversation. Start chatting to explore limitless possibilities.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
                                <div className="group p-6 bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/30 hover:bg-gray-700/60 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-xl">
                                    <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">💡</div>
                                    <h3 className="font-times text-white mb-2 tracking-wide">Get Insights</h3>
                                    <p className="text-sm text-gray-400 font-times">Deep analysis and creative solutions</p>
                                </div>
                                <div className="group p-6 bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/30 hover:bg-gray-700/60 hover:border-purple-500/30 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-xl">
                                    <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">🚀</div>
                                    <h3 className="font-times text-white mb-2 tracking-wide">Explore Ideas</h3>
                                    <p className="text-sm text-gray-400 font-times">Discover new concepts and innovations</p>
                                </div>
                                <div className="group p-6 bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/30 hover:bg-gray-700/60 hover:border-pink-500/30 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-xl">
                                    <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">⚡</div>
                                    <h3 className="font-times text-white mb-2 tracking-wide">Quick Help</h3>
                                    <p className="text-sm text-gray-400 font-times">Instant assistance for any question</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {messages.map((message, index) => (
                                <ChatMessage key={index} message={message.text} isAi={message.isAi} />
                            ))}
                        </div>
                    )}

                    {/* Enhanced Loading Animation */}
                    {isLoading && (
                        <div className="flex justify-start mb-6 animate-slide-up">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white flex items-center justify-center shadow-lg animate-pulse-soft">
                                    <Bot size={20} className="drop-shadow-sm" />
                                </div>
                                <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl rounded-bl-sm px-6 py-4 shadow-xl">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex space-x-1">
                                            <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-bounce"></div>
                                            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                        <span className="text-sm text-gray-300 ml-3 font-times">Nexa is thinking...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Enhanced Input Area */}
            <div className="relative z-10">
                <div className="absolute inset-0 "></div>
                <div className="relative max-w-5xl mx-auto p-6 sm:p-3">
                    <div className="w-full">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Share your thoughts with Nexa... (Press Enter to send)"
                                className="relative w-full min-h-[64px] max-h-20 resize-none rounded-3xl border-2 border-gray-700/50 bg-gray-800/90 backdrop-blur-sm px-8 py-5 pr-20 text-gray-100 placeholder-gray-500 shadow-2xl transition-all duration-300 focus:border-purple-500/50 focus:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed font-times text-base leading-relaxed"
                                disabled={isLoading}

                            />
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading || !input.trim()}
                                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-2xl transition-all duration-300 hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 hover:shadow-purple-500/25 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                            >
                                <Send size={20} className={`transition-all duration-300 ${isLoading ? 'animate-pulse scale-90' : 'group-hover:scale-110 group-hover:rotate-12'} drop-shadow-sm`} />
                            </button>
                        </div>
                        {/* <div className="mt-4 flex items-center justify-between text-xs">
                            <p className="text-gray-500 font-times">
                                Press <span className="px-2 py-1 bg-gray-800 rounded border border-gray-700 font-mono text-gray-400">Enter</span> to send,
                                <span className="px-2 py-1 bg-gray-800 rounded border border-gray-700 font-mono text-gray-400 ml-2">Shift + Enter</span> for new line
                            </p>
                            <p className="text-gray-500 font-mono">
                                <span className={input.length > 1800 ? 'text-orange-400' : input.length > 1600 ? 'text-yellow-400' : 'text-gray-500'}>
                                    {input.length}
                                </span>
                                <span className="text-gray-600">/2000</span>
                            </p>
                        </div> */}
                    </div>
                </div>
            </div>

            <style >{`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Times+New+Roman:wght@400;500;700&display=swap');
                
                .font-cursive {
                    font-family: 'Dancing Script', cursive;
                    font-weight: 700;
                }
                
                .font-times {
                    font-family: 'Times New Roman', Times, serif;
                }
                
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(30px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                
                @keyframes pulse-soft {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }
                
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                .animate-slide-up {
                    animation: slide-up 0.4s ease-out;
                }
                
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }
                
                .animate-blob {
                    animation: blob 7s infinite;
                }
                
                .animate-pulse-soft {
                    animation: pulse-soft 2s ease-in-out infinite;
                }
                
                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: gradient-x 3s ease infinite;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                
                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                
                ::-webkit-scrollbar-track {
                    background: rgba(17, 24, 39, 0.5);
                    border-radius: 4px;
                }
                
                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #6366f1, #8b5cf6, #ec4899);
                    border-radius: 4px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #4f46e5, #7c3aed, #db2777);
                }
            `}</style>
        </div >
    );
};

export default Chat;