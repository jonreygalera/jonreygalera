'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Hash, FileText, Calendar } from "lucide-react";
import { TIMELINE_POSTS, TimelinePost } from "@/data/timeline";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
}

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-secondary-200 text-secondary-900 rounded px-0.5 not-italic">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function search(query: string): TimelinePost[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return TIMELINE_POSTS.filter((p) => {
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });
}

export default function TimelineSearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TimelinePost[]>([]);
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Reset on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  // Search on query change
  useEffect(() => {
    setResults(search(query));
    setCursor(0);
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.children[cursor] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => Math.min(c + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => Math.max(c - 1, 0));
      } else if (e.key === "Enter" && results[cursor]) {
        onClose();
        window.location.href = `/timeline/${results[cursor].slug}`;
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [results, cursor, onClose]
  );

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="DevTimeline search"
        className="fixed z-[101] top-[12vh] left-1/2 -translate-x-1/2 w-full max-w-2xl px-4"
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/80 overflow-hidden flex flex-col">

          {/* Search input row */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search DevTimeline…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-base text-gray-900 placeholder-gray-400 outline-none"
              autoComplete="off"
              spellCheck={false}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-[11px] font-mono text-gray-400 bg-gray-100 rounded border border-gray-200">
              esc
            </kbd>
          </div>

          {/* Results list */}
          <ul
            ref={listRef}
            className="overflow-y-auto max-h-[55vh] divide-y divide-gray-50"
          >
            {query.trim() === "" && (
              <li className="flex flex-col items-center justify-center gap-2 py-14 text-gray-400">
                <Search className="w-8 h-8 opacity-30" />
                <span className="text-sm">Type to search through all timeline posts</span>
              </li>
            )}

            {query.trim() !== "" && results.length === 0 && (
              <li className="flex flex-col items-center justify-center gap-2 py-14 text-gray-400">
                <FileText className="w-8 h-8 opacity-30" />
                <span className="text-sm">No results for <strong className="text-gray-600">&ldquo;{query}&rdquo;</strong></span>
              </li>
            )}

            {results.map((post, i) => (
              <li key={post.slug}>
                <Link
                  href={`/timeline/${post.slug}`}
                  onClick={onClose}
                  className={cn(
                    "flex items-start gap-4 px-5 py-4 group transition-colors duration-100",
                    cursor === i
                      ? "bg-secondary-50 border-l-2 border-secondary-500"
                      : "hover:bg-gray-50 border-l-2 border-transparent"
                  )}
                  onMouseEnter={() => setCursor(i)}
                >
                  {/* Icon */}
                  <span className={cn(
                    "mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors",
                    cursor === i ? "bg-secondary-100 text-secondary-600" : "bg-gray-100 text-gray-400"
                  )}>
                    <FileText className="w-4 h-4" />
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-1">
                      {highlight(post.title, query)}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">
                      {highlight(post.description, query)}
                    </p>

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="inline-flex items-center gap-1 text-[10px] text-gray-400 font-mono">
                        <Calendar className="w-3 h-3" />
                        {post.fullDate ?? post.date}
                      </span>
                      {post.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className={cn(
                            "inline-flex items-center gap-0.5 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded transition-colors",
                            tag.toLowerCase().includes(query.toLowerCase()) && query
                              ? "bg-secondary-100 text-secondary-700"
                              : "bg-gray-100 text-gray-500"
                          )}
                        >
                          <Hash className="w-2.5 h-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className={cn(
                    "w-4 h-4 mt-1 shrink-0 transition-all duration-150",
                    cursor === i ? "text-secondary-500 translate-x-0.5" : "text-gray-200"
                  )} />
                </Link>
              </li>
            ))}
          </ul>

          {/* Footer hint */}
          <div className="flex items-center justify-between px-5 py-2.5 border-t border-gray-100 bg-gray-50/60 text-[11px] text-gray-400 font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px]">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px]">↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px]">↵</kbd>
                open
              </span>
            </div>
            {results.length > 0 && (
              <span>{results.length} result{results.length !== 1 ? "s" : ""}</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
