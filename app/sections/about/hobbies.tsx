'use client';

import { 
  Code2, 
  BookOpen, 
  Music2, 
  Gamepad2, 
  Dumbbell, 
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
    description: "Tech books, sci-fi novels, and philosophy"
  },
  {
    name: "Music",
    icon: Music2,
    description: "Playing guitar and listening to various genres"
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    description: "Strategy games and RPGs"
  },
  {
    name: "Fitness",
    icon: Dumbbell,
    description: "Weight training and calisthenics"
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
                Hobbies
      </h1>
      <div className="flex flex-wrap gap-4">
        {DATA_HOBBIES.map((hobby, index) => (
          <div key={`hobby-${index}`} className="group relative">
            <div className="flex items-center gap-2 px-2 py-2 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition-colors border">
              {React.createElement(hobby.icon, { size: 20 })}
            </div>
            <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm whitespace-nowrap">
              {hobby.description}
              <div className="absolute w-2 h-2 bg-gray-900 rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
