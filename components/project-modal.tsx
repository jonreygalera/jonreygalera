'use client';

import { useEffect, useState } from 'react';
import { X, ExternalLink, Globe, Briefcase, Calendar, ShieldCheck, Zap } from 'lucide-react';
import { Project } from '@/data/projects';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [isAnimate, setIsAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setIsAnimate(true), 10);
    } else {
      setIsAnimate(false);
      const timer = setTimeout(() => {
        document.body.style.overflow = 'unset';
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!project && !isOpen) return null;

  const Icon = project?.icon;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300",
        isOpen ? "visible" : "invisible"
      )}
    >
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-primary-100/30 backdrop-blur-sm transition-opacity duration-300",
          isAnimate ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={cn(
          "relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl border border-primary-100/5 overflow-hidden transition-all duration-300 transform",
          isAnimate ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-95 opacity-0"
        )}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 z-20 p-3 bg-white/80 backdrop-blur-md rounded-2xl border border-primary-100/10 text-primary-100/60 hover:text-secondary-600 hover:scale-110 transition-all shadow-sm"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row h-full max-h-[85vh] overflow-y-auto">
          {/* Left Column: Visuals & Meta */}
          <div className="w-full md:w-[40%] bg-secondary-50 p-10 border-r border-primary-100/5">
            <div className={cn(
              "w-20 h-20 mb-8 rounded-3xl flex items-center justify-center text-white shadow-xl",
              project?.category.includes('AI') ? "bg-secondary-500" : "bg-primary-100"
            )}>
              {Icon && <Icon size={40} />}
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-100/30 mb-2">Category</h4>
                <span className="text-secondary-600 font-bold bg-secondary-500/5 px-3 py-1.5 rounded-xl border border-secondary-500/10">
                  {project?.category}
                </span>
              </div>

              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-100/30 mb-2">Role</h4>
                <div className="flex items-center gap-2 text-primary-100 font-semibold">
                  <Briefcase size={16} className="text-primary-100/40" />
                  {project?.role}
                </div>
              </div>

              {project?.company && (
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-100/30 mb-2">Company</h4>
                  <div className="flex items-center gap-2 text-primary-100 font-semibold">
                    <Globe size={16} className="text-primary-100/40" />
                    {project?.company}
                  </div>
                </div>
              )}

            </div>

            {/* Tech Stack */}
            <div className="mt-12">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-100/30 mb-4">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project?.connectedTools.map((tool) => (
                  <span
                    key={tool.name}
                    className="px-3 py-1.5 bg-white text-[11px] font-bold text-primary-100/70 rounded-xl border border-primary-100/10 shadow-sm"
                  >
                    {tool.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="flex-1 p-10 md:p-14">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-100 tracking-tight leading-tight mb-6">
              {project?.title}
            </h2>

            <div className="prose prose-lg max-w-none text-primary-100/70 leading-relaxed font-medium">
              <p className="mb-6 text-xl text-primary-100 font-semibold">
                {project?.description}
              </p>
              
            </div>

            {project?.link && (
              <div className="mt-12">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-secondary-500 text-white font-black uppercase tracking-widest text-sm rounded-[2rem] hover:scale-105 hover:bg-secondary-600 transition-all shadow-xl shadow-secondary-500/30 group"
                >
                  Visit Project
                  <ExternalLink size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            )}
            
            {!project?.link && (
                <div className="mt-12 inline-flex items-center gap-2 px-6 py-3 bg-primary-100/5 text-primary-100/40 text-xs font-bold uppercase tracking-widest rounded-2xl border border-primary-100/10">
                    <Zap size={14} />
                    Internal Project / Proprietary
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
