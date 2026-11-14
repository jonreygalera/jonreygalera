'use client';

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CAREER_START, ExperienceBreakdown, getExperienceBreakdown } from "@/lib/experience";

const START_LABEL = CAREER_START.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
const START_ISO = `${CAREER_START.getFullYear()}-${String(CAREER_START.getMonth() + 1).padStart(2, "0")}-${String(CAREER_START.getDate()).padStart(2, "0")}`;

const pad = (n: number) => String(n).padStart(2, "0");

const UNITS: { key: keyof ExperienceBreakdown; short: string }[] = [
  { key: "years", short: "y" },
  { key: "months", short: "m" },
  { key: "days", short: "d" },
  { key: "hours", short: "h" },
  { key: "minutes", short: "m" },
  { key: "seconds", short: "s" },
];

/** Compact live ticker counting time since the career start date. */
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
      role="timer"
      aria-live="off"
      aria-label={
        time
          ? `In the craft for ${time.years} years, ${time.months} months and ${time.days} days`
          : "Time in the craft"
      }
      className={cn(
        "flex flex-wrap items-center justify-center sm:justify-between gap-x-4 gap-y-1.5 rounded-2xl px-4 py-3",
        "bg-white/70 backdrop-blur-md border border-primary-100/10 shadow-sm",
        className
      )}
    >
      <span className="flex flex-col items-center sm:items-start gap-0.5">
        <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary-100/60" aria-hidden="true">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-secondary-500 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary-500" />
          </span>
          Time in the craft
        </span>
        <span className="text-xs text-primary-100/60">
          Since <time dateTime={START_ISO} className="font-semibold text-primary-100/80">{START_LABEL}</time>
        </span>
      </span>

      <span className="flex items-baseline gap-2 tabular-nums" aria-hidden="true">
        {UNITS.map(({ key, short }, i) => {
          const isSeconds = key === "seconds";
          return (
            <span key={key} className="flex items-baseline">
              {i === 3 && <span className="mr-2 text-primary-100/20">·</span>}
              <span className={cn("text-base font-bold", isSeconds ? "text-secondary-700" : "text-primary-100")}>
                {time ? (key === "years" ? time[key] : pad(time[key])) : "--"}
              </span>
              <span className="ml-0.5 text-[11px] font-medium text-primary-100/60">{short}</span>
            </span>
          );
        })}
      </span>
    </div>
  );
}
