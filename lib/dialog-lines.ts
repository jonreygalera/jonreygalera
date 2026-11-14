import { PROJECTS } from "@/data/projects";
import { TIMELINE_POSTS } from "@/data/timeline";
import { getYearsOfExperience } from "@/lib/experience";

export interface DialogLine {
  tag: string;
  text: string;
}

const SCHOOL_TAGS = ["thesis", "internship", "hackathon"];

/** "SayMate — Giving a Voice to Everyone" -> "SayMate" */
const shortTitle = (title: string) => title.split(/\s+[—–-]\s+/)[0].trim();

/** Builds every dialog line from the profile data, so new projects/posts appear automatically. */
export function buildDialogLines(): DialogLine[] {
  const years = getYearsOfExperience();

  const intro: DialogLine[] = [
    { tag: "HELLO", text: "Hey there, traveler! I'm Jon Rey. Full-stack engineer, now building AI-powered products." },
    { tag: "STATS", text: `${years} years in the craft since August 5, 2019... and still leveling up!` },
    { tag: "STATS", text: `${PROJECTS.length} projects shipped and ${TIMELINE_POSTS.length} stories logged in my timeline.` },
    { tag: "TIP", text: "Psst... the Timeline page holds every quest I've ever taken." },
  ];

  const projects: DialogLine[] = PROJECTS.map((p) => {
    const name = shortTitle(p.title);
    if (!p.company || p.company === "Personal") {
      return { tag: "SIDE QUEST", text: `Side quest unlocked: I built ${name}${p.role ? ` as ${p.role}` : ""}.` };
    }
    return { tag: "WORK", text: `At ${p.company}, I was ${p.role ?? "on the team"} for ${name}.` };
  });

  const timeline: DialogLine[] = TIMELINE_POSTS.map((post) => {
    const isSchool = post.tags.some((t) => SCHOOL_TAGS.includes(t.toLowerCase()));
    // School posts often have place-name titles, so prefer a short first sentence for context.
    const firstSentence = post.description.split(/(?<=\.)\s/)[0].replace(/\.$/, "");
    const body = isSchool && firstSentence.length <= 90 ? firstSentence : shortTitle(post.title);
    return {
      tag: isSchool ? "SCHOOL DAYS" : "TIMELINE",
      text: `${post.fullDate ?? post.date}: ${body}.`,
    };
  });

  return [...intro, ...projects, ...timeline];
}
