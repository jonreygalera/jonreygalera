'use client';

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CAREER_START, ExperienceBreakdown, getExperienceBreakdown } from "@/lib/experience";

const UNITS: { key: keyof ExperienceBreakdown; label: string; pad: number }[] = [
  { key: "years", label: "Years", pad: 1 },
  { key: "months", label: "Months", pad: 2 },
  { key: "days", label: "Days", pad: 2 },
  { key: "hours", label: "Hours", pad: 2 },
  { key: "minutes", label: "Minutes", pad: 2 },
  { key: "seconds", label: "Seconds", pad: 2 },
];

const START_LABEL = CAREER_START.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export default function ExperienceCounter({ className }: { className?: string }) {
  // null until mounted so the server-rendered HTML never disagrees with the live clock
  const [time, setTime] = useState<ExperienceBreakdown | null>(null);

  useEffect(() => {
    const tick = () => setTime(getExperienceBreakdown());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={cn(
        "rounded-[2rem] border border-white/5 bg-white/[0.03] backdrop-blur-sm p-5 sm:p-8 shadow-2xl",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5 sm:mb-6">
        <h3 className="text-white font-bold text-sm sm:text-base tracking-tight">
          Time in the craft
        </h3>
        <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-secondary-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary-500" />
          </span>
          Live
        </span>
      </div>

      <div
        role="timer"
        aria-live="off"
        aria-label={time ? `${time.years} years and ${time.months} months of experience` : "Experience counter"}
        className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3"
      >
        {UNITS.map(({ key, label, pad }) => {
          const isSeconds = key === "seconds";
          const value = time ? String(time[key]).padStart(pad, "0") : "--";
          return (
            <div
              key={key}
              className={cn(
                "flex flex-col items-center justify-center rounded-2xl py-3 sm:py-4 border",
                isSeconds
                  ? "bg-secondary-500/10 border-secondary-500/30"
                  : "bg-white/[0.03] border-white/5"
              )}
            >
              <span
                className={cn(
                  "text-2xl sm:text-3xl font-black tabular-nums leading-none",
                  isSeconds ? "text-secondary-400" : "text-white"
                )}
              >
                {value}
              </span>
              <span className="mt-2 text-[11px] font-bold uppercase tracking-widest text-primary-800">
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-primary-800 text-center sm:text-left">
        Counting since {START_LABEL}
      </p>
    </div>
  );
}
