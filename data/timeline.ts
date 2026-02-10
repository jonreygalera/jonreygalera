import timeline2019 from "./timeline/2019";
import timeline2018 from "./timeline/2018";
import timeline2020 from "./timeline/2020";
import timeline2021 from "./timeline/2021";
import timeline2022 from "./timeline/2022";
import timeline2023 from "./timeline/2023";
import timeline2024 from "./timeline/2024";
import timeline2025 from "./timeline/2025";
import timeline2026 from "./timeline/2026";

export interface TimelinePost {
  id?: string | number;
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
    ...timeline2020,
    ...timeline2021,
    ...timeline2022,
    ...timeline2023,
    ...timeline2024,
    ...timeline2025,
    ...timeline2026,
];
