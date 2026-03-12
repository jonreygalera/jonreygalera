'use client';

import { useState } from 'react';
import SectionMainContainer from "@/components/section-main-container";
import Footer from "@/ui/footer";
import { PROJECTS, CATEGORIES } from "@/data/projects";
import { cn } from "@/lib/utils";
import BehanceIcon from '/public/behance.svg';
import Image from 'next/image';
import { 
  Sparkles,
  Zap,
  Layers,
  Search,
  LayoutGrid,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Filter,
  CheckCircle2,
  Trophy,
  ArrowRight
} from "lucide-react";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import ProjectModal from '@/components/project-modal';
import { Project } from '@/data/projects';

// --- Components ---

function ProjectCard({ 
  project, 
  onOpenModal 
}: { 
  project: Project, 
  onOpenModal: (p: Project) => void 
}) {
  const Icon = project.icon;
  const isLink = !!project.link;
  const isAI = project.category.includes('AI') || project.title.includes('AI');

  return (
    <div
      onClick={() => onOpenModal(project)}
      className={cn(
        "group relative flex flex-col rounded-[2.5rem] border p-8 transition-all duration-500 cursor-pointer overflow-hidden h-full",
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
          {project.isFeatured && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-white rounded-full">
              <Trophy size={10} />
              <span className="text-[10px] font-black uppercase tracking-widest">Featured</span>
            </div>
          )}
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
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-primary-100 tracking-tight group-hover:text-secondary-600 transition-colors">
              {project.title}
            </h3>
            {isLink && (
              <a 
                href={project.link} 
                target="_blank" 
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-primary-100/5 hover:bg-secondary-500/10 text-primary-100/30 hover:text-secondary-600 rounded-xl border border-primary-100/10 transition-all flex items-center justify-center"
              >
                <ExternalLink size={16} />
              </a>
            )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-secondary-600 bg-secondary-500/5 px-2 py-0.5 rounded-md">
            {project.category}
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-primary-100/50 px-2 py-0.5 rounded-md border border-primary-100/10">
            {project.role}
          </span>
        </div>

        <p className="text-primary-100/80 text-base leading-relaxed font-medium line-clamp-3">
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
    </div>
  );
}

function FeaturedListItem({ 
  project, 
  onOpenModal 
}: { 
  project: Project, 
  onOpenModal: (p: Project) => void 
}) {
    const isLink = !!project.link;

    return (
        <div 
            onClick={() => onOpenModal(project)}
            className="group flex flex-col md:flex-row md:items-center justify-between py-3.5 border-b border-primary-100/5 cursor-pointer transition-all hover:px-4 hover:bg-secondary-500/5 rounded-xl"
        >
            <div className="flex items-center gap-4">
                <div>
                    <h3 className="text-base font-bold text-primary-100 group-hover:text-secondary-600 transition-colors tracking-tight">
                        {project.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[9px] font-black uppercase tracking-widest text-primary-100/20 group-hover:text-primary-100/40 transition-colors">
                            {project.category}
                        </span>
                        <div className="w-0.5 h-0.5 rounded-full bg-primary-100/10" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-primary-100/20 group-hover:text-primary-100/40 transition-colors">
                            {project.role}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 mt-3 md:mt-0">
                <div className="flex items-center gap-2">
                    {isLink && (
                        <a 
                            href={project.link} 
                            target="_blank" 
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 bg-white border border-primary-100/10 text-primary-100/30 hover:text-secondary-600 hover:border-secondary-500/20 rounded-lg transition-all"
                        >
                            <ExternalLink size={14} />
                        </a>
                    )}
                    <div className="p-2 bg-primary-100/5 text-primary-100/40 rounded-lg group-hover:bg-secondary-600 group-hover:text-white transition-all">
                        <ArrowRight size={14} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeaturedSection({ projects, onOpenModal }: { projects: Project[], onOpenModal: (p: Project) => void }) {
    if (projects.length === 0) return null;

    return (
        <div className="mb-20">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-amber-400/10 flex items-center justify-center text-amber-500">
                        <Trophy size={12} />
                    </div>
                    <h2 className="text-base font-bold text-primary-100/40 tracking-tight uppercase">Featured</h2>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-black text-secondary-600 uppercase tracking-widest bg-secondary-500/5 px-2 py-0.5 rounded-full border border-secondary-500/10">
                        {projects.length} Works
                    </span>
                </div>
            </div>

            <div className="flex flex-col">
                {projects.map((project, idx) => (
                    <div 
                        key={`featured-${project.id}`}
                        className="animate-in fade-in slide-in-from-bottom-5 duration-700"
                        style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
                    >
                        <FeaturedListItem project={project} onOpenModal={onOpenModal} />
                    </div>
                ))}
            </div>
        </div>
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
      <div className="overflow-visible">
        <div className="flex items-center gap-3 mb-6 lg:mb-8">
          <div className="p-2 rounded-lg bg-secondary-500/10 text-secondary-600">
            <Filter size={18} />
          </div>
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary-100/30">
            Discover
          </h2>
        </div>

        <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-2 scrollbar-none -mx-6 px-6 lg:mx-0 lg:px-0">
          {CATEGORIES.map((category: any) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={cn(
                  "flex-shrink-0 lg:w-full flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 group/btn shadow-sm",
                  isSelected 
                    ? "bg-secondary-500 text-white shadow-xl shadow-secondary-500/20 scale-[1.02]" 
                    : "bg-white text-primary-100/50 hover:bg-secondary-500/5 hover:text-secondary-600 border border-primary-100/10 hover:border-secondary-500/20"
                )}
              >
                <span className="text-[10px] lg:text-xs font-bold uppercase tracking-widest whitespace-nowrap">{category}</span>
                {isSelected && (
                  <ChevronRight size={14} className="ml-3 hidden lg:block animate-in slide-in-from-left-2 duration-300" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="hidden lg:block p-6 rounded-[2rem] bg-white border border-primary-100/10 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Zap size={20} className="text-secondary-500" />
          <h4 className="text-primary-100 font-bold tracking-tight text-lg">Quick Access</h4>
        </div>
        <p className="text-primary-100/40 text-xs leading-relaxed mb-6">
          Exploring over {PROJECTS.length} engineering milestones across different domains.
        </p>
        <div className="space-y-3">
          <Link 
            href="/#section-contact"
            className="w-full py-3 bg-primary-100/5 hover:bg-secondary-500/10 text-primary-100/70 hover:text-secondary-700 text-xs font-black uppercase tracking-widest rounded-xl border border-primary-100/10 hover:border-secondary-500/30 transition-all flex items-center justify-center gap-2 group/cta"
          >
            Hire for project
            <ArrowUpRight size={14} className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
          </Link>
          <Link 
            href="https://mrey-ai.vercel.app"
            target="_blank"
            className="w-full py-3 bg-secondary-500/10 hover:bg-secondary-500 text-secondary-600 hover:text-white text-xs font-black uppercase tracking-widest rounded-xl border border-secondary-500/20 hover:border-secondary-500 transition-all flex items-center justify-center gap-2 group/ai"
          >
            AI Portfolio
            <Image src={BehanceIcon} alt="Behance" width={14} height={14} className="brightness-0 group-hover:invert transition-all group-hover/ai:invert" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("Featured");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const projectId = searchParams.get('id');
    if (projectId) {
      const project = PROJECTS.find(p => p.id === projectId);
      if (project) {
        setSelectedProject(project);
        setIsModalOpen(true);
      }
    }
  }, [searchParams]);

  const filteredProjects = selectedCategory === "All" 
    ? PROJECTS 
    : selectedCategory === "Featured"
      ? PROJECTS.filter((p: Project) => p.isFeatured)
      : PROJECTS.filter((p: Project) => p.category === selectedCategory || p.department === selectedCategory);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <SectionMainContainer className="bg-secondary-50 overflow-hidden font-sans min-h-screen">
      {/* Optimized Background Area */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:32px_32px]" />
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
        

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
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
                      {selectedCategory === "All" ? "Full Collection" : selectedCategory}
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

             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
                {filteredProjects.map((project: Project, idx: number) => (
                   <div 
                    key={project.id}
                    className="animate-in fade-in slide-in-from-bottom-2 duration-500"
                    style={{ animationDelay: `${Math.min(idx * 30, 300)}ms`, animationFillMode: 'both' }}
                   >
                    <ProjectCard project={project} onOpenModal={handleOpenModal} />
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

      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </SectionMainContainer>
  );
}

