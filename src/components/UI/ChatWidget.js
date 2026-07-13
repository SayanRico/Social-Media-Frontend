import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiMessageCircle, FiX, FiSend, FiUsers } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import useSafeTheme from '../../hooks/useSafeTheme';
import chatService from '../../services/chatService';
import chatSocket from '../../services/chatSocket';
import Card from './Card';
import Badge from './Badge';
import ChatMessage from '../Chat/ChatMessage';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const { isDarkMode } = useSafeTheme();
    const messagesEndRef = useRef(null);
    const isOpenRef = useRef(isOpen);
    const currentUserId = user?.userId ?? user?.id;

    useEffect(() => {
        isOpenRef.current = isOpen;
    }, [isOpen]);

    const loadHistory = useCallback(async () => {
        try {
            setLoading(true);
            const history = await chatService.getGroupMessages(50);
            setMessages((history?.messages || []).map((message) => ({
                id: message.id,
                message: message.message,
                senderUsername: message.username,
                senderId: message.sender_id,
                timestamp: message.created_at,
                isSent: message.sender_id === currentUserId
            })));
        } catch (error) {
            console.error('Failed to load chat history:', error);
        } finally {
            setLoading(false);
        }
    }, [currentUserId]);

    useEffect(() => {
        if (!isOpen) return;
        loadHistory();
        setUnreadCount(0);
    }, [isOpen, loadHistory]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) return undefined;

        chatSocket.connect(token);

        const unsubscribe = chatSocket.on('onGroupMessage', (data) => {
            const isSentByCurrentUser = (data?.senderId ?? data?.sender_id) === currentUserId;

            if (!isOpenRef.current && !isSentByCurrentUser) {
                setUnreadCount((prev) => prev + 1);
            }

            setMessages((prev) => [...prev, {
                ...data,
                id: data?.id,
                isSent: isSentByCurrentUser,
                timestamp: data?.timestamp || new Date().toISOString(),
                senderUsername: data?.username || data?.senderUsername
            }]);
        });

        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
            chatSocket.disconnect();
        };
    }, [currentUserId]);

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        chatSocket.sendGroupMessage(newMessage.trim());
        setNewMessage('');
    };

    return (
        <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-[9999] flex flex-col items-end gap-3 sm:gap-4 mb-safe-bottom">
            {/* Chat Window */}
            {isOpen && (
                <div className="w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-140px)] sm:h-[600px] animate-in slide-in-from-bottom-5 fade-in duration-500 ease-out">
                    <Card
                        variant="nexus"
                        className="h-full flex flex-col p-0 overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border-white/10"
                        headerClassName="hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-between shadow-lg relative z-10">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl shadow-inner border border-white/20">
                                    <FiUsers className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-black text-sm tracking-tight truncate uppercase italic">Global Network</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                                        <p className="text-[9px] font-bold uppercase tracking-widest opacity-70">Uplink Active</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-xl transition-all active:scale-90"
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-black/10 backdrop-blur-sm custom-scrollbar relative">
                            {loading ? (
                                <div className="h-full flex flex-col items-center justify-center gap-4">
                                    <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-2xl animate-spin shadow-[0_0_20px_rgba(59,130,246,0.2)]"></div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 animate-pulse">Syncing...</span>
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center opacity-20 text-center p-8">
                                    <FiMessageCircle className="w-16 h-16 mb-4 animate-bounce" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em]">No transmissions found</p>
                                </div>
                            ) : (
                                <div className="flex flex-col min-h-full">
                                    <div className="flex-1" />
                                    {messages.map((msg, idx) => (
                                        <ChatMessage
                                            key={msg.id ?? `${msg.senderId || 'unknown'}-${msg.timestamp || idx}`}
                                            message={msg.message}
                                            isSent={msg.isSent}
                                            timestamp={msg.timestamp}
                                            senderUsername={msg.senderUsername}
                                        />
                                    ))}
                                </div>
                            )}
                            <div ref={messagesEndRef} className="h-2" />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white/5 border-t border-white/5 backdrop-blur-3xl">
                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Secure transmission..."
                                    className={`flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all ${isDarkMode ? 'text-white' : 'text-slate-900 bg-white/60'
                                        }`}
                                />
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim()}
                                    className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 shadow-lg shadow-blue-500/20"
                                >
                                    <FiSend className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </Card>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative p-4 sm:p-5 rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-110 active:scale-90 group overflow-hidden ${isOpen
                        ? 'bg-rose-600 rotate-90 shadow-rose-600/40 border border-white/20'
                        : 'bg-blue-600 shadow-blue-600/40 border border-white/20'
                    }`}
            >
                {/* Glow Effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isOpen ? 'bg-gradient-to-tr from-rose-400 to-rose-600' : 'bg-gradient-to-tr from-blue-400 to-blue-600'
                    }`} />

                <div className="relative z-10">
                    {isOpen ? <FiX className="w-6 h-6 text-white" /> : <FiMessageCircle className="w-6 h-6 text-white" />}
                </div>

                {!isOpen && unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 z-20">
                        <Badge count={unreadCount} variant="danger" size="sm" className="h-6 w-6 rounded-full flex items-center justify-center font-black animate-bounce shadow-lg text-[10px] bg-white text-rose-600 border-2 border-rose-600" />
                    </div>
                )}

                {/* Shimmer */}
                <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000" />
            </button>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 20px; }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); }
            `}</style>
        </div>
    );
};

export default ChatWidget;
