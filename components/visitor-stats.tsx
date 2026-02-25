"use client";

import { useEffect, useState } from "react";
import { Users, Eye, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function VisitorStats() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STATS_API}/api/guest/stats`);
        if (response.ok) {
          const data = await response.json();
          setCount(data.count);
        }
      } catch (error) {
        console.error("Failed to fetch visitor stats:", error);
      } finally {
        setLoading(false);
        // Add a slight delay for entry animation
        setTimeout(() => setIsVisible(true), 100);
      }
    };

    fetchStats();
    
    // Refresh stats every 30 seconds for a "live" feel
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && count === null) return null;

  return (
    <div 
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-1000 transform",
        "bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.1)]",
        "hover:bg-white/10 hover:border-secondary-400/30 hover:shadow-secondary-400/10 group",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      )}
    >
      <div className="relative">
        <Users className="w-4 h-4 text-secondary-400 group-hover:scale-110 transition-transform duration-300" />
        <span className="absolute -top-1 -right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-500"></span>
        </span>
      </div>
      
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-[0.2em] text-primary-500/60 font-bold leading-none mb-0.5">
          Global Reach
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-black text-primary-100 font-mono tabular-nums">
            {count?.toLocaleString() ?? "..."}
          </span>
          <span className="text-[10px] text-secondary-400/80 font-medium">
            visitors explore
          </span>
        </div>
      </div>

      <div className="h-4 w-[1px] bg-white/10 mx-1 md:block hidden" />
      
      <div className="md:flex hidden items-center gap-1.5 text-secondary-400/60">
        <TrendingUp className="w-3 h-3" />
        <span className="text-[10px] font-medium tracking-wide">LIVE</span>
      </div>
    </div>
  );
}
