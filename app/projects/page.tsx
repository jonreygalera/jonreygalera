'use client';

import { useState } from 'react';
import SectionMainContainer from "@/components/section-main-container";
import Footer from "@/ui/footer";
import { PROJECTS, CATEGORIES } from "@/data/projects";
import { cn } from "@/lib/utils";
import { 
  Building2, 
  Wallet, 
  Receipt, 
  PiggyBank, 
  FileText, 
  Calculator, 
  Plane,
  Briefcase,
  Megaphone,
  Code,
  LayoutGrid,
  Search,
  CheckCircle2,
  Plug,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import Link from 'next/link';

// --- Components ---

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const Icon = project.icon;
  // If link exists, we use Link component, otherwise div. 
  // We cast 'div' to any to avoid complex TS union type issues here or just use conditional rendering.
  // Actually, separating the root element logic is cleaner.
  const isLink = !!project.link;
  const Wrapper = isLink ? Link : 'div';
  const wrapperProps = isLink ? { href: project.link!, target: "_blank" } : {};
  const versionTag = project.version;

  return (
    // @ts-ignore - Dynamic component typings can be tricky, simple ignore for the wrapper prop spread
    <Wrapper
      {...wrapperProps}
      className="group relative flex flex-col rounded-3xl border border-primary-200 bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:border-secondary-400 hover:shadow-2xl hover:shadow-secondary-200/30 cursor-pointer"
    >
      
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary-100 to-secondary-50 text-secondary-600 ring-1 ring-secondary-200 transition-all duration-300 group-hover:scale-110 group-hover:from-secondary-200 group-hover:to-secondary-100">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex flex-col items-end gap-2">
           <div className="flex flex-wrap justify-end gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-secondary-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-secondary-800 ring-1 ring-secondary-200">
                {project.category}
              </span>
              {project.company && (
                <span className="flex items-center gap-1.5 rounded-full bg-primary-100/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-500 ring-1 ring-primary-100/10">
                  {project.company}
                </span>
              )}
           </div>
           {versionTag && (
             <span className={cn(
               "flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-sm",
               versionTag === 'Legacy' 
                ? "bg-amber-100 text-amber-700 ring-1 ring-amber-200" 
                : "bg-primary-100 text-white"
             )}>
                {versionTag}
             </span>
           )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
         <h3 className="text-xl font-extrabold text-primary-100 group-hover:text-secondary-600 transition-colors flex items-center gap-2">
            {project.title}
         </h3>
         {project.role && (
            <p className="text-[11px] font-bold text-secondary-600 uppercase tracking-[0.1em] mt-1.5 opacity-80">
               {project.role}
            </p>
         )}
      </div>
      
      <p className="mb-8 text-sm leading-relaxed text-primary-300 font-medium line-clamp-3">
        {project.description}
      </p>

      {/* Connected Tools */}
      <div className="mt-auto space-y-3 pt-6 border-t border-primary-100/50">
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary-500">
          Tech Stack
        </span>
        <div className="flex flex-wrap gap-2">
          {project.connectedTools.map((tool) => (
             <div key={tool.name} className="flex items-center gap-1.5 text-[10px] font-bold text-primary-200 bg-primary-900/40 px-2.5 py-1.5 rounded-lg border border-primary-800 transition-all group-hover:bg-primary-100 group-hover:text-white group-hover:border-primary-100">
               {tool.name}
             </div>
          ))}
        </div>
      </div>
      
      {/* Hover Action */}
      <div className="absolute bottom-6 right-6 opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
         {isLink ? (
            <ExternalLink className="h-5 w-5 text-secondary-500" />
         ) : (
            <ArrowRight className="h-5 w-5 text-secondary-500" />
         )}
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
    <div className="w-full lg:w-72 flex-shrink-0 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-400">
             Categories
          </h2>
          <span className="rounded-lg bg-secondary-500 px-2.5 py-1 text-[10px] font-black text-white shadow-lg shadow-secondary-500/20">
           {CATEGORIES.length - 1}
          </span>
      </div>

      {/* Filter List */}
      <div className="flex flex-col gap-2">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={cn(
                "group flex items-center justify-between rounded-xl px-4 py-3 text-left transition-all duration-200",
                isSelected 
                  ? "bg-primary-100 text-white shadow-2xl shadow-primary-100/30 scale-[1.02]" 
                  : "bg-white text-primary-200 hover:bg-secondary-50 hover:text-secondary-600 hover:shadow-lg border border-primary-900/10"
              )}
            >
              <span className={cn("text-xs font-black transition-all uppercase tracking-widest", isSelected ? "opacity-100" : "opacity-60")}>{category}</span>
              {isSelected && (
                <div className="h-2 w-2 rounded-full bg-secondary-500 shadow-[0_0_8px_rgba(151,199,56,0.8)]"></div>
              )}
               <div className={cn(
                  "h-4 w-4 rounded-full border border-current opacity-30 group-hover:opacity-100 transition-opacity",
                  isSelected ? "hidden" : "block"
               )} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === selectedCategory || p.department === selectedCategory);

  return (
    <SectionMainContainer className="bg-[#F8FAFC]">
      
      {/* Hero / Header Area - simplified */}
      <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
                <h1 className="text-5xl font-black tracking-tight text-primary-100 sm:text-7xl">
                   My <span className="text-secondary-500 italic">Projects</span>
                </h1>
                <p className="mt-6 text-xl text-primary-300 max-w-2xl font-medium leading-relaxed">
                   A curated collection of automated agents, business tools, and engineering solutions.
                </p>
            </div>
            
            {/* Stats or Search placeholder */}
            {/* <div className="hidden md:flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-primary-200 text-primary-600 shadow-sm">
               <Search className="h-4 w-4" />
            </div> */}
         </div>
      </div>

      <div className="border-t border-primary-200" />

      {/* Main Content Layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar */}
          <SidebarFilter 
             selectedCategory={selectedCategory} 
             onSelectCategory={setSelectedCategory} 
          />

          {/* Grid Area */}
          <div className="flex-1">
             {/* Sub-header for grid */}
              <div className="mb-8 flex items-center justify-between">
                 <h3 className="text-xl font-black text-primary-100 flex items-center gap-3">
                    <span className="h-1.5 w-6 bg-secondary-500 rounded-full" />
                    {selectedCategory === "All" ? "All Projects" : selectedCategory}
                 </h3>
                 <span className="text-[10px] font-black text-primary-100 bg-white px-4 py-2 rounded-xl border border-primary-900/20 shadow-sm uppercase tracking-widest">
                    {filteredProjects.length} Result{filteredProjects.length !== 1 ? 's' : ''}
                 </span>
              </div>

             {/* The Grid */}
             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProjects.map((project) => (
                   <ProjectCard key={project.id} project={project} />
                ))}
             </div>

             {filteredProjects.length === 0 && (
                <div className="flex h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-primary-200 bg-white/50 text-center">
                   <div className="mb-4 rounded-full bg-primary-100 p-4 text-primary-400">
                      <LayoutGrid className="h-8 w-8" />
                   </div>
                   <h3 className="text-lg font-medium text-primary-900">No projects found</h3>
                   <p className="text-primary-600">Try selecting a different category.</p>
                </div>
             )}
          </div>
        </div>
      </div>

      <div className="mt-20">
         <Footer />
      </div>
    </SectionMainContainer>
  );
}
