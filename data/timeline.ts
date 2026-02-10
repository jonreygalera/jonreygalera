import timeline2019 from "./timeline/2019";
import timeline2018 from "./timeline/2018";
export interface TimelinePost {
  id?: string;
  title: string;
  date: string; // Year only for grouping, or full date
  fullDate?: string; // Optional full date string for display
  description: string;
  slug: string;
  tags: string[];
  githubUrl: string;
  githubRawUrl: string;
}

export const TIMELINE_POSTS: TimelinePost[] = [
    ...timeline2018,
    ...timeline2019,
];
