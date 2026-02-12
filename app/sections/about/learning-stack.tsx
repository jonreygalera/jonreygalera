'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Brain, Code2, Rocket } from 'lucide-react';
import { cn } from "@/lib/utils";

const LEARNING_ITEMS = [
  "Supabase & Realtime DB",
  "MongoDB Aggregation",
  "Python for AI Engineering",
  "LLM Fine-tuning & LoRA",
  "Advanced n8n Workflows",
  "Multi-Agent Orchestration",
  "Browser Automation (Playwright)",
  "Node.js Performance Tuning",
  "Laravel Enterprise Architecture",
  "React Design Patterns",
  "TypeScript Type Mastery",
  "Next.js Scalable Architecture",
  "PHP Core Internals",
];

export default function LearningStack() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const i = loopNum % LEARNING_ITEMS.length;
    const fullText = LEARNING_ITEMS[i];

    const handleTyping = () => {
      setText(prev => isDeleting 
        ? fullText.substring(0, prev.length - 1) 
        : fullText.substring(0, prev.length + 1)
      );

      if (!isDeleting && text === fullText) {
        setSpeed(2000); // Pause at end
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(prev => prev + 1);
        setSpeed(100);
      } else {
        setSpeed(isDeleting ? 40 : 80);
      }
    };

    timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, speed]);

  return (
    <div className="mt-8 group">
      <div className="flex items-center gap-4 p-5 rounded-[1.5rem] bg-white/[0.02] border border-white/5 hover:border-secondary-500/20 transition-all duration-500 relative overflow-hidden">
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6 w-full">
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-secondary-500/10 flex items-center justify-center text-secondary-500 ring-1 ring-secondary-500/20 shadow-lg group-hover:scale-105 transition-all duration-500">
              <Brain size={20} />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm tracking-tight text-nowrap">Growth Stack</h3>
            </div>
          </div>

          <div className="hidden sm:block h-8 w-px bg-white/10" />

          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-1.5 text-primary-800 text-[10px] font-black uppercase tracking-[0.1em] opacity-60">
              <Rocket size={10} className="text-secondary-500" />
              Exploring
            </div>
            <div className="flex items-center min-h-[1.5rem]">
              <span className="text-lg font-bold text-white tracking-tight flex items-center">
                {text}
                <span className="w-0.5 h-5 bg-secondary-500 ml-1.5 animate-pulse" />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-primary-800 text-[9px] font-black uppercase tracking-widest group-hover:bg-secondary-500/10 group-hover:text-secondary-400 transition-all">
            <Sparkles size={12} />
            Continuous Learning
          </div>
        </div>
      </div>
    </div>
  );
}
