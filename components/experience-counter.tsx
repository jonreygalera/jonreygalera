'use client';

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CAREER_START, ExperienceBreakdown, getExperienceBreakdown } from "@/lib/experience";

const START_LABEL = CAREER_START.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
const START_ISO = `${CAREER_START.getFullYear()}-${String(CAREER_START.getMonth() + 1).padStart(2, "0")}-${String(CAREER_START.getDate()).padStart(2, "0")}`;
const QUIP_INTERVAL_MS = 6000;

const pad = (n: number) => String(n).padStart(2, "0");
const fmt = (n: number) => n.toLocaleString("en-US");

const UNITS: { key: keyof ExperienceBreakdown; short: string }[] = [
  { key: "years", short: "y" },
  { key: "months", short: "m" },
  { key: "days", short: "d" },
  { key: "hours", short: "h" },
  { key: "minutes", short: "m" },
  { key: "seconds", short: "s" },
];

/** Tongue-in-cheek stats computed from the real elapsed time. */
function buildQuips(now: Date): string[] {
  const ms = now.getTime() - CAREER_START.getTime();
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor(ms / 3_600_000);
  const weeks = Math.floor(days / 7);

  return [
    `≈ ${fmt(days * 2)} cups of coffee deployed to production.`,
    `${fmt(weeks)} Mondays survived. Zero rage-quits.`,
    `${fmt(hours)} hours compiled. Still learning on every build.`,
    `Last reboot: never. (Sleep doesn't count.)`,
    `${fmt(days)} days of "it works on my machine" — and now on yours.`,
    `Uptime 99.9%. The 0.1% was a missing semicolon.`,
  ];
}

/** Career "uptime" monitor: live counter, semantic version and rotating quips. */
export default function ExperienceCounter({ className }: { className?: string }) {
  // null until mounted so the server-rendered HTML never disagrees with the live clock
  const [time, setTime] = useState<ExperienceBreakdown | null>(null);
  const [quips, setQuips] = useState<string[]>([]);
  const [quipIndex, setQuipIndex] = useState(-1); // -1 = the static "online since" line

  useEffect(() => {
    const tick = () => setTime(getExperienceBreakdown());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setQuips(buildQuips(new Date()));
      setQuipIndex((i) => (i + 2 > 6 ? -1 : i + 1)); // cycle: online-since → 6 quips → repeat
    }, QUIP_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const version = time ? `v${time.years}.${time.months}.${time.days}` : "v-.-.-";
  const quip = quipIndex >= 0 ? quips[quipIndex] : null;

  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 rounded-2xl px-4 py-3",
        "bg-white/70 backdrop-blur-md border border-primary-100/10 shadow-sm",
        className
      )}
    >
      {/* Status row */}
      <div className="flex flex-wrap items-center justify-center sm:justify-between gap-x-4 gap-y-1.5">
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-secondary-500 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary-500" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-100/70">Career uptime</span>
          <span
            className="rounded-md bg-secondary-100 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-secondary-800"
            title="years.months.days — no breaking changes"
          >
            {version}
          </span>
        </span>

        <span
          role="timer"
          aria-live="off"
          aria-label={
            time
              ? `Career uptime: ${time.years} years, ${time.months} months and ${time.days} days`
              : "Career uptime"
          }
          className="flex items-baseline gap-2 tabular-nums"
        >
          <span className="text-base leading-none" aria-hidden="true" title="Powered by coffee">☕</span>
          {UNITS.map(({ key, short }, i) => {
            const isSeconds = key === "seconds";
            return (
              <span key={key} className="flex items-baseline" aria-hidden="true">
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

      {/* Rotating quip */}
      <p
        key={quipIndex}
        className="border-t border-primary-100/10 pt-2 text-center sm:text-left text-xs leading-relaxed text-primary-100/70 animate-in fade-in duration-700 min-h-[2.5rem] sm:min-h-0"
      >
        {quip ?? (
          <>
            Online since <time dateTime={START_ISO} className="font-semibold text-primary-100">{START_LABEL}</time>. No downtime, just a few hotfixes.
          </>
        )}
      </p>
    </div>
  );
}
