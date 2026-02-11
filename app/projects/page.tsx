'use client';

import { useState } from 'react';
import SectionMainContainer from "@/components/section-main-container";
import Footer from "@/ui/footer";
import { PROJECTS, CATEGORIES } from "@/data/projects";
import { cn } from "@/lib/utils";
import { 
  Sparkles,
  Zap,
  Layers,
  Search,
  LayoutGrid,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Filter
} from "lucide-react";
import Link from 'next/link';

// --- Components ---

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const Icon = project.icon;
  const isLink = !!project.link;
  const Wrapper = isLink ? Link : 'div';
  const wrapperProps = isLink ? { href: project.link!, target: "_blank" } : {};
  const isAI = project.category.includes('AI') || project.title.includes('AI');

  return (
    // @ts-ignore
    <Wrapper
      {...wrapperProps}
      className={cn(
        "group relative flex flex-col rounded-[2.5rem] border p-8 transition-all duration-500 cursor-pointer overflow-hidden",
        isAI 
          ? "bg-white border-secondary-500/30 hover:border-secondary-500/60 hover:shadow-[0_20px_60px_rgba(151,199,56,0.15)] shadow-sm" 
          : "bg-white border-primary-100/5 hover:border-primary-100/10 hover:shadow-2xl shadow-sm"
      )}
    >
      {/* AI Glow Effect */}
      {isAI && (
        <div className="absolute -inset-1 bg-gradient-to-tr from-secondary-500/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      )}

      {/* Header */}
      <div className="mb-8 flex items-start justify-between relative z-10">
        <div className={cn(
          "w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 shadow-lg",
          isAI ? "bg-secondary-500 text-white" : "bg-primary-100 text-white"
        )}>
          <Icon size={28} />
        </div>
        
        <div className="flex flex-col items-end gap-2">
          {isAI && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-secondary-500 text-white rounded-full">
              <Sparkles size={10} />
              <span className="text-[10px] font-black uppercase tracking-widest">AI Power</span>
            </div>
          )}
          {project.version && (
            <span className="px-3 py-1 bg-primary-100/5 text-primary-100/60 rounded-full border border-primary-100/10 text-[10px] font-bold uppercase tracking-widest">
              {project.version}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-6 relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-2xl font-bold text-primary-100 tracking-tight group-hover:text-secondary-600 transition-colors">
            {project.title}
          </h3>
          {isLink && <ArrowUpRight size={18} className="text-primary-100/40 group-hover:text-secondary-500 translate-x-0 group-hover:-translate-y-1 transition-all" />}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-secondary-600 bg-secondary-500/5 px-2 py-0.5 rounded-md">
            {project.category}
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-primary-100/50 px-2 py-0.5 rounded-md border border-primary-100/10">
            {project.role}
          </span>
        </div>

        <p className="text-primary-100/80 text-base leading-relaxed font-medium">
          {project.description}
        </p>
      </div>

      {/* Footer / Stack */}
      <div className="mt-auto pt-6 border-t border-primary-100/10 relative z-10">
        <div className="flex flex-wrap gap-2">
          {project.connectedTools.slice(0, 4).map((tool: any) => (
            <span 
              key={tool.name} 
              className="px-3 py-1 bg-primary-100/5 text-[11px] font-bold text-primary-100/70 rounded-lg border border-primary-100/10"
            >
              {tool.name}
            </span>
          ))}
          {project.connectedTools.length > 4 && (
            <span className="px-2 py-1 bg-transparent text-[11px] font-black text-primary-100/30 uppercase tracking-tighter">
              +{project.connectedTools.length - 4} More
            </span>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

function SidebarFilter({ 
  selectedCategory, 
  onSelectCategory 
}: { 
  selectedCategory: string, 
  onSelectCategory: (cat: string) => void 
}) {
  return (
    <div className="w-full lg:w-72 flex-shrink-0 space-y-10 group/sidebar">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-secondary-500/10 text-secondary-600">
            <Filter size={18} />
          </div>
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary-100/30">
            Discover
          </h2>
        </div>

        <div className="space-y-2">
          {CATEGORIES.map((category: any) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={cn(
                  "w-full flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all duration-300 group/btn shadow-sm",
                  isSelected 
                    ? "bg-secondary-500 text-white shadow-xl shadow-secondary-500/20 scale-[1.02]" 
                    : "bg-white text-primary-100/50 hover:bg-secondary-500/5 hover:text-secondary-600 border border-primary-100/10 hover:border-secondary-500/20"
                )}
              >
                <span className="text-xs font-bold uppercase tracking-widest">{category}</span>
                {isSelected ? (
                  <ChevronRight size={14} className="animate-in slide-in-from-left-2 duration-300" />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-secondary-500/20 group-hover/btn:bg-secondary-500/50 transition-colors" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6 rounded-[2rem] bg-white border border-primary-100/10 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Zap size={20} className="text-secondary-500" />
          <h4 className="text-primary-100 font-bold tracking-tight text-lg">Quick Access</h4>
        </div>
        <p className="text-primary-100/40 text-xs leading-relaxed mb-6">
          Exploring over {PROJECTS.length} engineering milestones across different domains.
        </p>
        <Link 
          href="/#section-contact"
          className="w-full py-3 bg-primary-100/5 hover:bg-secondary-500/10 text-primary-100/70 hover:text-secondary-700 text-xs font-black uppercase tracking-widest rounded-xl border border-primary-100/10 hover:border-secondary-500/30 transition-all flex items-center justify-center gap-2 group/cta"
        >
          Hire for project
          <ArrowUpRight size={14} className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All" 
    ? PROJECTS 
    : PROJECTS.filter((p: any) => p.category === selectedCategory || p.department === selectedCategory);

  return (
    <SectionMainContainer className="bg-secondary-50 overflow-hidden font-sans min-h-screen">
      {/* Uniform Grid Background */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,#80808022_1px,transparent_1px),linear-gradient(to_bottom,#80808022_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-50 via-transparent to-secondary-50" />
      </div>
      
      {/* Header Area */}
      <div className="relative z-10 pt-36 pb-20 px-6 max-w-7xl mx-auto">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-500/10 text-secondary-600 rounded-full border border-secondary-500/20 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Master Portfolio</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-primary-100 leading-[0.9]">
                   My <span className="text-secondary-600 italic">Work</span>
                </h1>
                <p className="mt-8 text-xl md:text-2xl text-primary-100/60 max-w-2xl font-light leading-relaxed">
                   A curated index of <span className="text-primary-100/80">automated systems</span>, high-volume APIs, and experimental <span className="text-primary-100/80">AI agents</span>.
                </p>
            </div>
            
            <div className="flex items-center gap-6 pb-2">
              <div className="text-right">
                <div className="text-4xl font-bold text-primary-100 leading-none">{PROJECTS.length}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-100/20 mt-2">Projects Shipped</div>
              </div>
              <div className="w-px h-12 bg-primary-100/10" />
              <div className="text-right">
                <div className="text-4xl font-bold text-primary-100 leading-none">5+</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-100/20 mt-2">Years Exp.</div>
              </div>
            </div>
         </div>
      </div>

      <div className="relative z-10 border-t border-primary-100/10" />

      {/* Main Content Layout */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Sidebar */}
          <SidebarFilter 
             selectedCategory={selectedCategory} 
             onSelectCategory={setSelectedCategory} 
          />

          {/* Grid Area */}
          <div className="flex-1">
             <div className="mb-12 flex items-center justify-between">
                <div>
                   <h3 className="text-2xl font-bold text-primary-100 tracking-tight flex items-center gap-4">
                      {selectedCategory === "All" ? "Collection" : selectedCategory}
                      <span className="text-xs font-bold text-primary-100/20 uppercase tracking-widest">
                        {filteredProjects.length}
                      </span>
                   </h3>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-8 h-[2px] bg-secondary-500/10" />
                   <div className="w-4 h-[2px] bg-secondary-500/30" />
                   <div className="w-2 h-[2px] bg-secondary-500/60" />
                </div>
             </div>

             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-2">
                {filteredProjects.map((project: any, idx: any) => (
                   <div 
                    key={project.id}
                    className="animate-in fade-in slide-in-from-bottom-10 duration-700"
                    style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}
                   >
                    <ProjectCard project={project} />
                   </div>
                ))}
             </div>

             {filteredProjects.length === 0 && (
                <div className="flex h-96 flex-col items-center justify-center rounded-[3rem] border border-dashed border-primary-100/10 bg-white text-center px-10">
                   <div className="w-20 h-20 mb-6 rounded-3xl bg-secondary-50 border border-primary-100/10 flex items-center justify-center text-primary-100/40">
                      <LayoutGrid size={40} />
                   </div>
                   <h3 className="text-2xl font-bold text-primary-100 mb-2">Void detected</h3>
                   <p className="text-primary-100/60 text-sm max-w-xs">No entries match your current filter. Try resetting to see more milestones.</p>
                   <button 
                    onClick={() => setSelectedCategory("All")}
                    className="mt-8 px-8 py-3 bg-secondary-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-secondary-500/20"
                   >
                    Show all projects
                   </button>
                </div>
             )}
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-20 border-t border-primary-100/10">
         <Footer />
      </div>
    </SectionMainContainer>
  );
}

