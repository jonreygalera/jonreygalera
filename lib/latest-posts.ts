import { TIMELINE_POSTS, TimelinePost } from "@/data/timeline";

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

/** Sortable key: year * 12 + month. Year-only dates sort before dated posts of the same year. */
function sortKey(post: TimelinePost): number {
  const text = `${post.fullDate ?? ""} ${post.date}`.toLowerCase();
  const year = Number(text.match(/\b(19|20)\d{2}\b/)?.[0] ?? 0);
  const month = MONTHS.findIndex((m) => text.includes(m) || text.includes(m.slice(0, 3) + " "));
  return year * 12 + month; // month = -1 when unknown
}

/** Newest timeline posts first (stable for ties, keeping the data-file order). */
export function getLatestPosts(count = 3): TimelinePost[] {
  return TIMELINE_POSTS
    .map((post, i) => ({ post, i, key: sortKey(post) }))
    .sort((a, b) => b.key - a.key || a.i - b.i)
    .slice(0, count)
    .map(({ post }) => post);
}
