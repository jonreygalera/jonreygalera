'use client';

import { 
  Code2, 
  BookOpen, 
  Music2, 
  Gamepad2, 
  Bike,
  ChefHat,
  Coffee
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
  }
];

export default function Hobbies() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[30px] font-black italic">
        {"Hobbies"}
      </h1>
      <div className="flex flex-wrap gap-4">
        {DATA_HOBBIES.map((hobby, index) => (
          <div key={`hobby-${index}`} className="group relative">
            <div 
              className="flex items-center gap-2 px-2 py-2 bg-white rounded-lg shadow-sm hover:bg-primary-200 transition-colors border"
              data-tooltip-target={`tooltip-${index}`}
              data-tooltip-placement="bottom"
            >
              {React.createElement(hobby.icon, { size: 20, className: "group-hover:text-secondary-500" })}
            </div>
            <div 
              id={`tooltip-${index}`}
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-primary-200 rounded-lg shadow-sm opacity-0 tooltip"
            >
              {hobby.description}
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
