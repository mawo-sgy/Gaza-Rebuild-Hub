
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, Minimize2, Maximize2, Loader2, MessageSquare } from 'lucide-react';
import * as GeminiService from '../services/geminiService';
import { getProjects } from '../services/mockData';

interface GeminiAssistantProps {
  onClose: () => void; // Kept for API compatibility, though internal toggle handles visibility
  apiKey: string;
}

interface Message {
    id: string;
    role: 'user' | 'model';
    text: string;
}

export const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ onClose, apiKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
      { id: 'init', role: 'model', text: 'Hello! I am the AI Architect. Ask me about our reconstruction projects, engineering needs, or how you can contribute.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial Data Load for Context
  useEffect(() => {
    const initChat = async () => {
        const projects = await getProjects();
        const totalFunds = projects.reduce((acc, p) => acc + p.raised, 0);
        
        const session = GeminiService.createChatSession({
            totalProjects: projects.length,
            totalExperts: 142, // Mock static for now
            totalFunds: totalFunds
        });
        setChatSession(session);
    };
    initChat();
  }, []);

  // Auto-scroll
  useEffect(() => {
      if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || !chatSession) return;

      const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
      setMessages(prev => [...prev, userMsg]);
      setInput('');
      setLoading(true);

      try {
          const responseText = await GeminiService.sendMessageToChat(chatSession, userMsg.text);
          const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
          setMessages(prev => [...prev, botMsg]);
      } catch (err) {
          setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "Connection interrupted. Please try again." }]);
      } finally {
          setLoading(false);
      }
  };

  if (!isOpen) {
      return (
          <button 
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-[#003D66] text-white p-4 rounded-full shadow-2xl hover:bg-blue-900 transition-transform hover:scale-110 flex items-center justify-center group"
          >
              <Bot className="h-8 w-8" />
              <span className="absolute right-full mr-3 bg-white text-slate-800 px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm border border-slate-200">
                  Ask AI Architect
              </span>
          </button>
      );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 ${isMinimized ? 'w-72 h-14' : 'w-96 h-[600px] max-h-[80vh]'}`}>
        
        {/* Header */}
        <div className="bg-[#003D66] text-white p-4 flex justify-between items-center cursor-pointer" onClick={() => !isMinimized && setIsMinimized(!isMinimized)}>
            <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <h3 className="font-bold text-sm tracking-wide">AI Architect</h3>
            </div>
            <div className="flex items-center space-x-1">
                <button 
                    onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
                    className="p-1 hover:bg-white/10 rounded"
                >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                    className="p-1 hover:bg-white/10 rounded"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>

        {/* Chat Body */}
        {!isMinimized && (
            <>
                <div className="flex-1 bg-slate-50 p-4 overflow-y-auto" ref={scrollRef}>
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'model' && (
                                <div className="w-8 h-8 rounded-full bg-[#003D66]/10 flex items-center justify-center mr-2 shrink-0">
                                    <Bot className="h-5 w-5 text-[#003D66]" />
                                </div>
                            )}
                            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                                msg.role === 'user' 
                                ? 'bg-[#003D66] text-white rounded-tr-none' 
                                : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start mb-4">
                             <div className="w-8 h-8 rounded-full bg-[#003D66]/10 flex items-center justify-center mr-2">
                                <Bot className="h-5 w-5 text-[#003D66]" />
                            </div>
                            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-slate-200">
                                <Loader2 className="h-5 w-5 text-[#003D66] animate-spin" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-3 bg-white border-t border-slate-100">
                    <form onSubmit={handleSend} className="relative flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about projects..."
                            className="w-full pl-4 pr-12 py-3 bg-slate-100 rounded-xl border-none focus:ring-2 focus:ring-[#003D66]/20 text-slate-800 placeholder-slate-400 outline-none text-sm"
                        />
                        <button 
                            type="submit" 
                            disabled={!input.trim() || loading}
                            className="absolute right-2 p-2 bg-[#28A745] text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:hover:bg-[#28A745] transition-colors"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </form>
                    <div className="text-center mt-2">
                        <span className="text-[10px] text-slate-400">Powered by Google Gemini</span>
                    </div>
                </div>
            </>
        )}
    </div>
  );
};
