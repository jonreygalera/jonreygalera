"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });

/** Livestream-style viewer badge, designed to sit on top of the hero portrait. */
export default function VisitorStats({ className }: { className?: string }) {
  const [count, setCount] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If the stats API can't be reached, fall back to 0 (keeps the last real count if we had one).
    const showFallback = () => {
      setCount((c) => c ?? 0);
      setTimeout(() => setIsVisible(true), 100);
    };

    if (!process.env.NEXT_PUBLIC_STATS_API) {
      console.warn("VisitorStats: NEXT_PUBLIC_STATS_API is not set; showing 0 visitors.");
      showFallback();
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STATS_API}/api/guest/stats`, {
          headers: {
            "x-mrey-tenant": window.location.hostname
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (typeof data.count === "number") {
            setCount(data.count);
            setTimeout(() => setIsVisible(true), 100);
            return;
          }
        }
        showFallback();
      } catch (error) {
        console.error("Failed to fetch visitor stats:", error);
        showFallback();
      }
    };

    fetchStats();

    // Refresh stats every 30 seconds for a "live" feel
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  // Hidden only during the first request; afterwards it always shows (real count or 0).
  if (count === null) return null;

  return (
    <div
      title={`${count.toLocaleString("en-US")} visitors have explored this site`}
      className={cn(
        "inline-flex items-center gap-2 rounded-full p-1 pr-3 transition-all duration-700",
        "bg-primary-100/60 backdrop-blur-md border border-white/10 shadow-lg text-white",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
        className
      )}
    >
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-secondary-400">
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-secondary-500" />
        </span>
        Live
      </span>
      <Eye className="w-3.5 h-3.5 text-white/80" aria-hidden="true" />
      <span className="text-xs font-bold tabular-nums">
        {compact.format(count)}
        <span className="ml-1 font-medium text-white/80">visitors</span>
      </span>
    </div>
  );
}
