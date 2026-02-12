'use client';

import { 
  Brain, 
  Code2, 
  Terminal, 
  Cpu, 
  Database, 
  Cloud, 
  Bot, 
  Sparkles,
  Zap,
  Layers,
  Layout,
  Workflow
} from 'lucide-react';
import { cn } from "@/lib/utils";

interface TechItem {
  name: string;
  isAI?: boolean;
}

interface TechGroup {
  title: string;
  icon: any;
  items: TechItem[];
}

const TECH_STACK: TechGroup[] = [
  {
    title: "AI & Intelligence",
    icon: Brain,
    items: [
      { name: "n8n Automation", isAI: true },
      { name: "AI Agent Orchestration", isAI: true },
      { name: "RAG Systems", isAI: true },
      { name: "Prompt Engineering", isAI: true },
      { name: "OpenAI / LLMs", isAI: true },
      { name: "Mrey AI Ecosystem", isAI: true },
    ]
  },
  {
    title: "Core Engineering",
    icon: Code2,
    items: [
      { name: "Laravel (PHP)" },
      { name: "React / Next.js" },
      { name: "TypeScript" },
      { name: "Node.js / Express" },
      { name: "API Integration" },
      { name: "MySQL / MariaDB" },
    ]
  },
  {
    title: "Technical Ecosystem",
    icon: Terminal,
    items: [
      { name: "Antigravity-IDE", isAI: true },
      { name: "Cursor IDE", isAI: true },
      { name: "Docker & Redis" },
      { name: "Git / CI/CD" },
      { name: "WebSockets" },
      { name: "VS Code" },
    ]
  }
];

export default function TechStack() {
  return (
    <div className="mt-12 space-y-10">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-white/5" />
        <h2 className="text-sm uppercase tracking-[0.2em] text-secondary-500 font-bold">Current Tech Stack</h2>
        <div className="h-px flex-1 bg-white/5" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TECH_STACK.map((group, idx) => (
          <div 
            key={idx}
            className="group relative p-8 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-xl border border-white/5 hover:border-secondary-500/30 transition-all duration-700 hover:shadow-[0_20px_80px_rgba(0,0,0,0.4)] overflow-hidden"
          >
            {/* Hover Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-secondary-500/10 text-secondary-400 group-hover:scale-110 group-hover:bg-secondary-500/20 transition-all duration-500 ring-1 ring-secondary-500/20 shadow-[0_0_20px_rgba(151,199,56,0.1)]">
                  <group.icon size={22} />
                </div>
                <h3 className="font-bold text-xl text-white tracking-tight">{group.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {group.items.map((item, i) => (
                  <div
                    key={i}
                    className={cn(
                      "px-4 py-2 rounded-xl text-[11px] font-bold transition-all duration-500 flex items-center gap-2 leading-none cursor-default",
                      item.isAI 
                        ? "bg-secondary-500/10 text-secondary-400 border border-secondary-500/30 shadow-[0_0_20px_rgba(151,199,56,0.15)] hover:bg-secondary-500/20" 
                        : "bg-white/[0.03] text-primary-800 border border-white/5 hover:bg-white/[0.08] hover:border-white/10"
                    )}
                  >
                    {item.isAI && (
                      <div className="relative flex items-center justify-center">
                        <Sparkles size={12} className="text-secondary-400 animate-pulse" />
                        <div className="absolute inset-0 bg-secondary-400/40 blur-[4px] animate-ping rounded-full" />
                      </div>
                    )}
                    {item.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Corner Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-secondary-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}
