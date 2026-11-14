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
} from "lucide-react";
import React, { useState } from "react";

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
  const [active, setActive] = useState<number | null>(null);
  const activeHobby = active !== null ? DATA_HOBBIES[active] : null;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <h1 className="text-[30px] font-black italic text-white">
        {"Hobbies"}
      </h1>
      <div className="flex flex-wrap gap-3 sm:gap-4">
        {DATA_HOBBIES.map((hobby, index) => {
          const isActive = active === index;
          return (
            <div key={`hobby-${index}`} className="group relative flex flex-col items-center">
              <button
                type="button"
                aria-label={hobby.name}
                aria-pressed={isActive}
                onClick={() => setActive(isActive ? null : index)}
                className={cn(
                  "flex items-center justify-center min-w-11 min-h-11 p-3 rounded-xl border transition-all duration-300 cursor-pointer",
                  isActive
                    ? "bg-white/10 border-secondary-500/40 text-secondary-500"
                    : "bg-white/5 border-white/5 text-primary-800 hover:bg-white/10 hover:border-secondary-500/30 hover:text-secondary-500"
                )}
              >
                {React.createElement(hobby.icon, { size: 20, "aria-hidden": true })}
              </button>

              {/* Tooltip (pointer devices only; touch uses the caption below) */}
              <div
                role="tooltip"
                className="hidden md:block absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 p-3 rounded-xl bg-primary-200/95 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-300 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 z-50"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-secondary-400 font-bold text-xs uppercase tracking-wider">{hobby.name}</span>
                  <p className="text-white text-xs leading-relaxed">{hobby.description}</p>
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary-200/95 rotate-45 border-r border-b border-white/10" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Touch-friendly caption */}
      <p aria-live="polite" className="md:hidden min-h-[3rem] text-sm leading-relaxed text-primary-800">
        {activeHobby ? (
          <>
            <span className="font-bold text-secondary-400">{activeHobby.name}</span> — {activeHobby.description}
          </>
        ) : (
          "Tap an icon to learn more."
        )}
      </p>
    </div>
  );
}
