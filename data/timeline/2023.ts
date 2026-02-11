import { TimelinePost } from "../timeline";

const timeline : TimelinePost[] = [
    {
        id: 22,
        title: 'Fixing Inconsistency Once, for Everyone',
        date: '2023',
        fullDate: '2023',
        description: 'Created an internal Laravel Composer package to standardize API responses and error handling across NMS systems.',
        slug: 'nms-laravel-utility-package',
        tags: ['Laravel', 'Composer', 'Internal Tooling', 'API Design'],
        githubRawUrl: 'https://raw.githubusercontent.com/jonreygalera/aboutme/refs/heads/main/devTimeline/2023/nms-laravel-utility-package.md',
        githubUrl: 'https://github.com/jonreygalera/aboutme/blob/main/devTimeline/2023/nms-laravel-utility-package.md'
    },
    {
        id: 21,
        title: 'Oops, The Scraper Broke',
        date: '2023',
        fullDate: '2023',
        description: 'Rebuilt a broken BSP forex scraper in PHP to restore reliable daily finance data updates for FDB.',
        slug: 'fdb-bsp-forex-scraper',
        tags: ['Web Scraping', 'PHP', 'Finance Systems', 'Maintenance'],
        githubRawUrl: 'https://raw.githubusercontent.com/jonreygalera/aboutme/refs/heads/main/devTimeline/2023/fdb-bsp-forex-scraper.md',
        githubUrl: 'https://github.com/jonreygalera/aboutme/blob/main/devTimeline/2023/fdb-bsp-forex-scraper.md'
    }

];

export default timeline;