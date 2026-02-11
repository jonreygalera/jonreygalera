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
      { name: "MySQL / PostgreSQL" },
      { name: "MongoDB / Supabase" },
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
            className="group relative p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-secondary-500/20 transition-all duration-500 hover:shadow-2xl hover:shadow-black/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-secondary-500/10 text-secondary-500 group-hover:scale-110 transition-transform duration-500">
                <group.icon size={20} />
              </div>
              <h3 className="font-bold text-lg text-white tracking-tight">{group.title}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {group.items.map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 leading-none",
                    item.isAI 
                      ? "bg-secondary-500/10 text-secondary-400 border border-secondary-500/20 shadow-[0_0_15px_rgba(151,199,56,0.05)]" 
                      : "bg-white/5 text-primary-800 border border-white/5 hover:border-white/10"
                  )}
                >
                  {item.isAI && <Sparkles size={10} className="text-secondary-500" />}
                  {item.name}
                </div>
              ))}
            </div>

            {/* Subtle glow effect for groups with AI items */}
            {group.items.some(i => i.isAI) && (
              <div className="absolute -inset-1 bg-gradient-to-tr from-secondary-500/5 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
