/** First day of professional work: August 5, 2019 (month is 0-based). */
export const CAREER_START = new Date(2019, 7, 5);

export interface ExperienceBreakdown {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const addMonths = (date: Date, months: number) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
};

/** Calendar-accurate time since CAREER_START: whole years/months, then exact days → seconds. */
export function getExperienceBreakdown(now: Date = new Date()): ExperienceBreakdown {
  let totalMonths =
    (now.getFullYear() - CAREER_START.getFullYear()) * 12 + (now.getMonth() - CAREER_START.getMonth());
  let anchor = addMonths(CAREER_START, totalMonths);
  if (anchor > now) {
    totalMonths -= 1;
    anchor = addMonths(CAREER_START, totalMonths);
  }

  let rest = Math.max(0, Math.floor((now.getTime() - anchor.getTime()) / 1000));
  const days = Math.floor(rest / 86400);
  rest %= 86400;
  const hours = Math.floor(rest / 3600);
  rest %= 3600;

  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
    days,
    hours,
    minutes: Math.floor(rest / 60),
    seconds: rest % 60,
  };
}

/** Full years of experience completed as of `now` (increments every August 5). */
export function getYearsOfExperience(now: Date = new Date()): number {
  const years = now.getFullYear() - CAREER_START.getFullYear();
  const beforeAnniversary =
    now.getMonth() < CAREER_START.getMonth() ||
    (now.getMonth() === CAREER_START.getMonth() && now.getDate() < CAREER_START.getDate());
  return beforeAnniversary ? years - 1 : years;
}
