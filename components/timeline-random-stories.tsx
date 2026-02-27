'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Tag, CalendarDays } from "lucide-react";
import { TIMELINE_POSTS, TimelinePost } from "@/data/timeline";

function fisherYates<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Props {
  currentSlug: string;
  count?: number;
}

export default function TimelineRandomStories({ currentSlug, count = 3 }: Props) {
  const [posts, setPosts] = useState<TimelinePost[]>([]);

  useEffect(() => {
    const others = TIMELINE_POSTS.filter((p) => p.slug !== currentSlug);
    setPosts(fisherYates(others).slice(0, count));
  }, [currentSlug, count]);

  if (posts.length === 0) return null;

  return (
    <section className="mt-24">
      {/* Section divider */}
      <div className="flex items-center gap-4 mb-10">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-secondary-200 to-transparent" />
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary-500 whitespace-nowrap">
          More Stories
        </h2>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-secondary-200 to-transparent" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {posts.map((rp) => (
          <Link
            key={rp.slug}
            href={`/timeline/${rp.slug}`}
            className="group relative flex flex-col gap-3 rounded-2xl border border-primary-200/60 bg-white/50 backdrop-blur-sm p-5 shadow-sm hover:shadow-lg hover:border-secondary-200 hover:-translate-y-0.5 transition-all duration-300"
          >
            {/* Top: date + arrow */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-primary-400">
                <CalendarDays className="w-3 h-3" />
                {rp.fullDate ?? rp.date}
              </span>
              <ArrowUpRight className="w-4 h-4 text-primary-300 group-hover:text-secondary-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </div>

            {/* Title */}
            <h3 className="text-sm font-bold text-primary-100 leading-snug group-hover:text-secondary-600 transition-colors line-clamp-2">
              {rp.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-primary-500 leading-relaxed line-clamp-3 flex-1">
              {rp.description}
            </p>

            {/* Tags */}
            {rp.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1 border-t border-primary-200/40">
                {rp.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary-50 text-secondary-600 border border-secondary-100"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
