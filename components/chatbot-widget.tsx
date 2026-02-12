'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Send, X, MessageCircle, RefreshCcw, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import LogoImage from '/public/logo.png';
import { PREDEFINED_QUESTIONS, BALLOON_MESSAGES } from '@/data/chatbot-messages';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const MAX_MESSAGES = 10;
const STORAGE_KEY = 'chatbot_history_v2';

function TypingMessage({ content }: { content: string }) {
  const [displayedContent, setDisplayedContent] = useState('');
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedContent(content.slice(0, i));
      i++;
      if (i > content.length) clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, [content]);

  return <span>{displayedContent}</span>;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showBalloon, setShowBalloon] = useState(false);
  const [currentBalloonMessage, setCurrentBalloonMessage] = useState('');
  const [balloonIndex, setBalloonIndex] = useState(0);
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

  useEffect(() => {
    if (isOpen) {
      setShowBalloon(false);
      return;
    }

    let timer: NodeJS.Timeout;

    if (showBalloon) {
      // Balloon is shown, set timer to hide it after 3 seconds
      timer = setTimeout(() => {
        setShowBalloon(false);
      }, 3000);
    } else {
      // Balloon is hidden, set timer to show it after 2 seconds with the next queue message
      timer = setTimeout(() => {
        setCurrentBalloonMessage(BALLOON_MESSAGES[balloonIndex]);
        setBalloonIndex((prev) => (prev + 1) % BALLOON_MESSAGES.length);
        setShowBalloon(true);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [isOpen, showBalloon]);

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
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 scroll-smooth bg-primary-200/50 relative">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            {messages.map((msg, idx) => (
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
                {msg.role === 'bot' && idx === messages.length - 1 && !isLoading ? (
                  <TypingMessage content={msg.content} />
                ) : (
                  msg.content
                )}
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
          </div>
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        {!isLoading && (
          <div className="px-5 flex gap-2 overflow-x-auto no-scrollbar pb-4 bg-primary-200/50">
             <a
               href="https://mrey-ai.vercel.app"
               target="_blank"
               className="flex-shrink-0 text-[11px] font-bold bg-secondary-500/10 hover:bg-secondary-500 text-secondary-600 hover:text-white border border-secondary-500/20 px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap active:scale-95 flex items-center gap-1.5"
             >
               <Sparkles size={12} />
               Visit AI Portfolio
             </a>
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
        <div className="p-5 bg-gradient-to-t from-primary-200/30 to-transparent border-t border-white/5">
          <div className="flex items-end gap-3">
            <div className="relative flex-1 group">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.shiftKey) {
                    e.preventDefault();
                    handleSend(input);
                  }
                }}
                placeholder="Ask Mreybot..."
                maxLength={250}
                rows={Math.min(4, input.split('\n').length || 1)}
                className="w-full bg-primary-300/50 text-secondary-50 placeholder:text-secondary-100/20 text-sm rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-secondary-500/30 border border-white/5 transition-all outline-none resize-none min-h-[52px] max-h-[140px] leading-relaxed scrollbar-hide"
              />
              <div className="absolute right-4 bottom-3 flex flex-col items-end gap-1 pointer-events-none">
                <span className={cn(
                  "text-[9px] font-bold tracking-tighter transition-colors",
                  input.length >= 240 ? "text-secondary-500" : "text-secondary-100/20"
                )}>
                  {input.length}/250
                </span>
                <span className="text-[8px] uppercase tracking-widest text-secondary-100/10 font-bold hidden group-focus-within:block">
                  Shift + Enter to Send
                </span>
              </div>
            </div>
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isLoading}
              className="p-4 bg-secondary-600 hover:bg-secondary-500 text-white rounded-2xl disabled:opacity-30 disabled:grayscale transition-all shadow-xl shadow-secondary-900/50 active:scale-90 mb-[2px]"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Premium Sleek Speech Bubble */}
      <div 
        className={cn(
          "absolute bottom-24 right-0 min-w-[220px] max-w-[300px] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-auto",
          showBalloon && !isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        )}
      >
        <div className="relative group">
          <div className="bg-primary-100/95 backdrop-blur-2xl border border-white/10 px-5 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            {/* Animated Gradient Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary-500/50 to-transparent" />
            
            <div className="flex items-center gap-2.5 mb-2">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-secondary-500 animate-ping opacity-40" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-secondary-400 font-bold">Mreybot Chat</span>
            </div>
            
            <p className="text-[13px] font-medium text-secondary-50 leading-relaxed">
              {currentBalloonMessage}
            </p>
            
            {/* Elegant Pointer */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-primary-100/95 border-r border-b border-white/10 rotate-45" />
          </div>

          <button 
            onClick={() => setShowBalloon(false)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-secondary-600 hover:bg-secondary-500 text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 z-20 opacity-0 group-hover:opacity-100 group-hover:scale-110 active:scale-95"
          >
            <X size={12} />
          </button>
          
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-secondary-500/5 blur-3xl rounded-full -z-10" />
        </div>
      </div>

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-16 h-16 rounded-[2rem] bg-secondary-500 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 pointer-events-auto overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary-600/0 via-secondary-500/5 to-secondary-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className={cn(
          "transition-all duration-700 absolute flex items-center justify-center",
          isOpen ? "opacity-0 scale-50 rotate-180" : "opacity-100 scale-100 rotate-0"
        )}>
           <Image src={LogoImage} alt="Chat" className="w-14 h-14 object-contain transition-transform group-hover:scale-110" />
        </div>
        
        <div className={cn(
          "text-primary-400 transition-all duration-700 absolute",
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
