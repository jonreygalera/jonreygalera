import timeline2019 from "./timeline/2019";
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
    {
        id: '1',
        title: 'Building DOST Barangay Portal from Scratch as Co-Lead Developer',
        date: '2018',
        fullDate: 'May 2018',
        description: 'Internship experience where I co-led development of a web portal for DOST Urdaneta, building it entirely from scratch.',
        slug: 'building-dost-barangay-portal-scratch',
        tags: ['Internship', 'Co-Lead', 'PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'Google Maps'],
        githubUrl: 'https://github.com/jonreygalera/aboutme/blob/main/devTimeline/2018/building-dost-barangay-portal-scratch.md',
        githubRawUrl: 'https://raw.githubusercontent.com/jonreygalera/aboutme/refs/heads/main/devTimeline/2018/building-dost-barangay-portal-scratch.md'
    },
    ...timeline2019,
];
