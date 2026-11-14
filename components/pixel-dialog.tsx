'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import { Press_Start_2P, VT323 } from "next/font/google";
import { cn } from "@/lib/utils";
import { buildDialogLines, DialogLine } from "@/lib/dialog-lines";

const pixelTitle = Press_Start_2P({ weight: "400", subsets: ["latin"] });
const pixelBody = VT323({ weight: "400", subsets: ["latin"] });

const TYPE_SPEED_MS = 28;
const AUTO_ADVANCE_MS = 4500;

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PixelDialog({ speaker = "JON REY", className }: { speaker?: string; className?: string }) {
  const allLines = useMemo(() => buildDialogLines(), []);
  // First line is fixed for SSR; the rest is shuffled after mount (avoids hydration mismatch).
  const [queue, setQueue] = useState<DialogLine[]>(() => allLines.slice(0, 1));
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setQueue([allLines[0], ...shuffle(allLines.slice(1))]);
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, [allLines]);

  const line = queue[index % queue.length];
  const isTyping = shown < line.text.length;

  const next = useCallback(() => {
    setShown(0);
    setIndex((i) => {
      const n = i + 1;
      if (n >= queue.length) {
        // Reshuffle for the next loop, keeping the intro out of the rotation.
        setQueue((q) => [q[0], ...shuffle(q.slice(1))]);
        return 1;
      }
      return n;
    });
  }, [queue.length]);

  // Typewriter
  useEffect(() => {
    if (!isTyping) return;
    if (reduceMotion) {
      setShown(line.text.length);
      return;
    }
    const id = setTimeout(() => setShown((s) => s + 1), TYPE_SPEED_MS);
    return () => clearTimeout(id);
  }, [isTyping, shown, line.text.length, reduceMotion]);

  // Auto-advance once the line is fully typed
  useEffect(() => {
    if (isTyping) return;
    const id = setTimeout(next, AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [isTyping, next]);

  const handleAdvance = () => (isTyping ? setShown(line.text.length) : next());

  return (
    <button
      type="button"
      onClick={handleAdvance}
      aria-label={`${speaker} says: ${line.text}. Activate for the next line.`}
      className={cn(
        "pixel-box relative block w-full text-left cursor-pointer select-none",
        "bg-primary-100/90 backdrop-blur-sm px-4 pt-4 pb-3 sm:px-5",
        "focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary-500/60",
        className
      )}
    >
      {/* Name plate */}
      <span
        className={cn(
          pixelTitle.className,
          "pixel-plate absolute -top-4 left-4 bg-secondary-500 text-primary-100 text-[9px] sm:text-[10px] px-2 py-1.5 leading-none"
        )}
        aria-hidden="true"
      >
        {speaker}
      </span>

      <span className={cn(pixelTitle.className, "block text-[8px] tracking-wider text-secondary-400 mb-2 mt-1")} aria-hidden="true">
        ▸ {line.tag}
      </span>

      <span
        className={cn(pixelBody.className, "block text-[19px] sm:text-[21px] leading-[1.15] text-white min-h-[4.6em]")}
        aria-hidden="true"
      >
        {line.text.slice(0, shown)}
        {isTyping && <span className="inline-block w-[0.5em] h-[0.9em] bg-white/80 align-[-0.1em] ml-0.5 animate-pulse" />}
      </span>

      <span
        className={cn(
          "pixel-caret absolute bottom-2 right-3 text-secondary-400 text-xs",
          isTyping ? "opacity-0" : "opacity-100"
        )}
        aria-hidden="true"
      >
        ▼
      </span>
    </button>
  );
}
