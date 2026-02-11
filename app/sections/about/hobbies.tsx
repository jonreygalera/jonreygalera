'use client';

import { cn } from "@/lib/utils";
import { 
  Code2, 
  BookOpen, 
  Music2, 
  Gamepad2, 
  Bike,
  ChefHat,
  Coffee,
  Camera,
  Draw
} from "lucide-react";
import React from "react";

const DATA_HOBBIES = [
  {
    name: "Coding",
    icon: Code2,
    description: "Building side projects and experimenting with new technologies"
  },
  {
    name: "Reading",
    icon: BookOpen,
    description: "Tech books and manga"
  },
  {
    name: "Music",
    icon: Music2,
    description: "Playing guitar and listening to various genres"
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    description: "Strategy games and Shooting game"
  },
  {
    name: "Cycling",
    icon: Bike,
    description: "Road cycling and mountain biking"
  },
  {
    name: "Cooking",
    icon: ChefHat,
    description: "Experimenting with new recipes"
  },
  {
    name: "Coffee",
    icon: Coffee,
    description: "Exploring specialty coffee"
  },
  {
    name: "Photography",
    icon: Camera,
    description: "Capturing moments and exploring visual storytelling"
  }
];

export default function Hobbies({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <h1 className="text-[30px] font-black italic text-white">
        {"Hobbies"}
      </h1>
      <div className="flex flex-wrap gap-4">
        {DATA_HOBBIES.map((hobby, index) => (
          <div key={`hobby-${index}`} className="group relative flex flex-col items-center">
            <div 
              className="flex items-center gap-2 px-3 py-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 hover:border-secondary-500/30 transition-all duration-300 text-primary-800 cursor-help"
            >
              {React.createElement(hobby.icon, { size: 20, className: "group-hover:text-secondary-500 transition-colors" })}
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 p-3 rounded-xl bg-primary-200/90 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-300 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 z-50">
              <div className="flex flex-col gap-1">
                <span className="text-secondary-400 font-bold text-xs uppercase tracking-wider">{hobby.name}</span>
                <p className="text-white text-xs leading-relaxed opacity-90">{hobby.description}</p>
              </div>
              {/* Tooltip Arrow */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary-200/90 rotate-45 border-r border-b border-white/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
