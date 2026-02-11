'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Send, X, MessageCircle, RefreshCcw, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import LogoImage from '/public/logo.png';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const PREDEFINED_QUESTIONS = [
  "Who is Jon Rey Galera?",
  "Tell me about your AI expertise",
  "What is the Mrey AI Ecosystem?",
  "Technical stack overview",
];

const MAX_MESSAGES = 10;
const STORAGE_KEY = 'chatbot_history_v2';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
      } catch (e) {
        console.error("Failed to load chat history", e);
      }
    } else {
      const welcome: Message = {
        id: 'welcome',
        role: 'bot',
        content: "Hello! I'm Mreybot. Looking for a high-performance web solution or advanced AI integration? Ask me anything.",
        timestamp: new Date(),
      };
      setMessages([welcome]);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages, isClient]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isLoading]);

  const addMessage = (role: 'user' | 'bot', content: string) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substring(7),
      role,
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage].slice(-MAX_MESSAGES));
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    addMessage('user', text);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_CHATBOT_URL!, {
        method: 'POST',
        headers: {
          'MREYAI-CHAT-PARTICIPANTS-JONREYGALERA-KNOWLEDGE-BASE': process.env.NEXT_PUBLIC_CHATBOT_API_KEY!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      
      if (data.status === 'success' || data.statusCode === 200) {
        addMessage('bot', data.output);
      } else {
        throw new Error('API returned an error');
      }
    } catch (e) {
      console.error("Chatbot API Error:", e);
      addMessage('bot', "I'm having trouble connecting right now. Please try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    const welcome: Message = {
      id: 'reset-welcome',
      role: 'bot',
      content: "Chat reset. How can I assist you in your next project?",
      timestamp: new Date(),
    };
    setMessages([welcome]);
  };

  if (!isClient) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4 pointer-events-none">
      {/* Chat Window */}
      <div 
        className={cn(
          "w-[380px] max-w-[calc(100vw-3rem)] bg-primary-100/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] overflow-hidden flex flex-col pointer-events-auto",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        )}
        style={{ height: isOpen ? 'min(650px, 80vh)' : '0' }}
      >
        {/* Superior Header */}
        <div className="p-5 flex items-center justify-between border-b border-white/5 bg-gradient-to-b from-primary-200/50 to-transparent">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border border-secondary-400/20 bg-primary-200 p-0.5">
                 <Image src={LogoImage} alt="AI" className="w-full h-full object-contain" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary-500 rounded-full border-2 border-primary-100" />
            </div>
            <div>
              <h3 className="font-bold text-secondary-50 tracking-tight text-lg">Mreybot</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest text-secondary-200/50 font-semibold">Active Now</span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleReset}
            className="p-2.5 hover:bg-white/5 rounded-xl text-secondary-200/30 hover:text-secondary-400 transition-all duration-300"
            title="Wipe Session"
          >
            <RefreshCcw size={18} />
          </button>
        </div>

        {/* Dynamic Message Area */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 scroll-smooth">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={cn(
                "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-500",
                msg.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div 
                className={cn(
                  "relative max-w-[85%] px-5 py-3.5 text-sm leading-relaxed",
                  msg.role === 'user' 
                    ? "bg-secondary-600/90 text-white rounded-2xl rounded-tr-none shadow-lg shadow-secondary-900/40" 
                    : "bg-primary-200/50 text-secondary-100 rounded-2xl rounded-tl-none border border-white/5"
                )}
              >
                {msg.content}
                <div className={cn(
                  "text-[9px] mt-1.5 opacity-30 font-medium",
                  msg.role === 'user' ? "text-right" : "text-left"
                )}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-primary-200/50 border border-white/5 rounded-2xl rounded-tl-none px-5 py-4 flex gap-1">
                <span className="w-1.5 h-1.5 bg-secondary-500/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-secondary-500/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-secondary-500/50 rounded-full animate-bounce" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        {!isLoading && (
          <div className="px-5 flex gap-2 overflow-x-auto no-scrollbar pb-4">
             {PREDEFINED_QUESTIONS.map((q, i) => (
               <button
                 key={i}
                 onClick={() => handleSend(q)}
                 className="flex-shrink-0 text-[11px] font-medium bg-white/5 hover:bg-secondary-500/10 text-secondary-200/70 hover:text-secondary-400 border border-white/10 px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap active:scale-95"
               >
                 {q}
               </button>
             ))}
          </div>
        )}

        {/* Input Interface */}
        <div className="p-5 bg-gradient-to-t from-primary-200/30 to-transparent">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex items-center gap-3"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Mreybot..."
                className="w-full bg-primary-300/50 text-secondary-50 placeholder:text-secondary-100/20 text-sm rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-secondary-500/30 border border-white/5 transition-all outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3.5 bg-secondary-600 hover:bg-secondary-500 text-white rounded-2xl disabled:opacity-30 disabled:grayscale transition-all shadow-xl shadow-secondary-900/50 active:scale-90"
            >
              <Send size={20} />
            </button>
          </form>
          <div className="flex justify-between items-center mt-4 px-1">
            <span className="text-[9px] uppercase tracking-tighter text-secondary-100/20 font-bold">
              AI Secured Gateway
            </span>
            <span className="text-[9px] font-medium text-secondary-100/20 bg-white/5 px-2 py-0.5 rounded-md">
              {messages.length}/{MAX_MESSAGES}
            </span>
          </div>
        </div>
      </div>

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-16 h-16 rounded-[2rem] bg-primary-100 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 pointer-events-auto overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary-600/0 via-secondary-500/5 to-secondary-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className={cn(
          "transition-all duration-700 absolute flex items-center justify-center",
          isOpen ? "opacity-0 scale-50 rotate-180" : "opacity-100 scale-100 rotate-0"
        )}>
           <Image src={LogoImage} alt="Chat" className="w-14 h-14 object-contain transition-transform group-hover:scale-110" />
        </div>
        
        <div className={cn(
          "text-secondary-400 transition-all duration-700 absolute",
          isOpen ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-180"
        )}>
          <X size={28} strokeWidth={1.5} />
        </div>

        {/* Ambient Ring */}
        <div className="absolute inset-0 rounded-[2rem] border-2 border-secondary-500/0 group-hover:border-secondary-500/20 transition-all duration-500 scale-110 group-hover:scale-100" />
      </button>
    </div>
  );
}
