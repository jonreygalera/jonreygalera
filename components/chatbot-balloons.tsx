'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BALLOON_MESSAGES } from '@/data/chatbot-messages';

export default function ChatbotBalloons() {
  const [showBalloon, setShowBalloon] = useState(false);
  const [currentBalloonMessage, setCurrentBalloonMessage] = useState('');
  const [balloonIndex, setBalloonIndex] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showBalloon) {
      // Balloon is shown, set timer to hide it after 5 seconds
      timer = setTimeout(() => {
        setShowBalloon(false);
      }, 5000);
    } else {
      // Balloon is hidden, set timer to show it after 8 seconds with the next message
      timer = setTimeout(() => {
        setCurrentBalloonMessage(BALLOON_MESSAGES[balloonIndex]);
        setBalloonIndex((prev) => (prev + 1) % BALLOON_MESSAGES.length);
        setShowBalloon(true);
      }, 8000);
    }

    return () => clearTimeout(timer);
  }, [showBalloon, balloonIndex]);

  return (
    <div className="fixed bottom-24 right-6 z-[9999] flex flex-col items-end gap-4 pointer-events-none">
      <div 
        className={cn(
          "min-w-[220px] max-w-[300px] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-auto",
          showBalloon ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
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
              <span className="text-[10px] uppercase tracking-[0.2em] text-secondary-400 font-bold">MreyBot Chat</span>
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
    </div>
  );
}
