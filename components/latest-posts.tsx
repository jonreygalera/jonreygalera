import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getLatestPosts } from "@/lib/latest-posts";

/** Compact "latest from the dev timeline" list for the hero. */
export default function LatestPosts({ className, count = 3 }: { className?: string; count?: number }) {
  const posts = getLatestPosts(count);
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="latest-posts-heading" className={cn("w-full", className)}>
      <div className="flex items-center justify-between gap-4 mb-3">
        <h2 id="latest-posts-heading" className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-100/70">
          Fresh from the dev timeline
        </h2>
        <Link
          href="/timeline"
          className="inline-flex items-center gap-1 min-h-11 text-xs font-bold text-secondary-700 hover:text-secondary-800 transition-colors"
        >
          View all
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <ul className="rounded-2xl bg-white/70 backdrop-blur-md border border-primary-100/10 shadow-sm divide-y divide-primary-100/10 overflow-hidden">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/timeline/${post.slug}`}
              className="group flex items-center gap-3 px-4 py-3 min-h-11 hover:bg-secondary-100/60 focus-visible:bg-secondary-100/60 focus-visible:outline-none transition-colors"
            >
              <span className="shrink-0 w-20 font-mono text-[11px] text-primary-100/60">
                {post.fullDate ?? post.date}
              </span>
              <span className="flex-1 min-w-0 text-sm font-semibold text-primary-100 line-clamp-1 group-hover:text-secondary-800 transition-colors">
                {post.title}
              </span>
              <ArrowUpRight className="shrink-0 w-4 h-4 text-primary-100/40 group-hover:text-secondary-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
