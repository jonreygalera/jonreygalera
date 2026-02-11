import { 
  Building2, 
  Wallet, 
  Receipt, 
  PiggyBank, 
  FileText, 
  Calculator, 
  Plane,
  Briefcase,
  Megaphone,
  Code,
  ShieldAlert,
  Users,
  MessageSquare,
  Wrench,
  Globe,
  Database,
  RefreshCw,
  Clock,
  List,
  Terminal,
  LayoutTemplate,
  Zap,
  Bot
} from "lucide-react";

export interface Project {
  id: string;
  title: string;
  category: string;
  department?: string;
  description: string;
  role?: string;
  status?: string;
  version?: string;
  company?: string;
  link?: string;
  icon: any; // Lucide icon type
  connectedTools: {
    name: string;
    icon?: any;
  }[];
}

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Finance Management Ecosystem",
    category: "Finance",
    role: "Lead Developer",
    status: "Active",
    company: "NMS Philippines",
    description: "A comprehensive financial suite orchestrating payroll, loan management, and automated reporting. Evolved from legacy v1 systems into a high-volume production core handling complex batch processes and real-time Forex processing.",
    icon: Wallet,
    connectedTools: [
      { name: "Laravel" }, { name: "PHP" }, { name: "Redis" }, { name: "Docker" }, { name: "React" }, { name: "MySQL" }, { name: "Node.js" }
    ]
  },
  {
    id: "3",
    title: "Unified Identity & Auth Service",
    category: "Engineering",
    role: "Lead Developer",
    status: "Active",
    company: "NMS Philippines",
    description: "Architected and maintained the central Single-Sign-On (SSO) infrastructure and OAuth2 modules, enabling seamless authentication across multiple platforms. Successfully migrated the platform through major versions (v1 & v2) and architectural shifts.",
    icon: ShieldAlert,
    connectedTools: [
      { name: "Laravel" }, { name: "SSO" }, { name: "OAuth2" }, { name: "Redis" }, { name: "React" }, { name: "Docker" }
    ]
  },
  {
    id: "4",
    title: "Tiro Chat Simulator",
    category: "Engineering",
    role: "Lead Developer",
    status: "Archived",
    company: "NMS Philippines",
    description: "Client demo project showcasing real-time chat simulation capabilities and system responsiveness.",
    icon: MessageSquare,
    connectedTools: [
      { name: "Laravel" }, { name: "Redis" }, { name: "React" }, { name: "MUI" }
    ]
  },
  {
    id: "5",
    title: "NMS Laravel Utility",
    category: "Composer Packages",
    role: "Lead Developer",
    status: "Active",
    company: "NMS Philippines",
    description: "Internal Composer package standardizing API responses, error codes, and backend conventions across NMS systems.",
    icon: Wrench,
    connectedTools: [
      { name: "PHP" }, { name: "Composer" }, { name: "Laravel" }
    ]
  },
  {
    id: "6",
    title: "nmsitd-chat-react",
    category: "NPM Packages",
    role: "Lead Developer",
    status: "Active",
    company: "NMS Philippines",
    description: "NPM package for interactive chat-based assessments, featuring OAuth2 authentication modules.",
    icon: LayoutTemplate,
    link: "https://www.npmjs.com/package/nmsitd-chat-react",
    connectedTools: [
      { name: "React" }, { name: "NPM" }, { name: "Vite" }
    ]
  },
  {
    id: "8",
    title: "HR Operations Suite",
    category: "HR & Operations",
    role: "Co-Lead Developer",
    status: "Mixed",
    company: "NMS Philippines",
    description: "An end-to-end HR ecosystem covering employee lifecycle management, attendance tracking, and interview scheduling. Consolidated legacy payroll systems into modern, responsive React-based workflows.",
    icon: Users,
    connectedTools: [
      { name: "Laravel" }, { name: "React" }, { name: "CodeIgniter" }, { name: "MySQL" }, { name: "MUI" }, { name: "jQuery" }
    ]
  },
  {
    id: "10",
    title: "Leadgen",
    category: "Business Support",
    role: "Co-Lead Backend Dev",
    status: "Archived",
    company: "NMS Philippines",
    description: "Automated lead collection system to streamline marketing workflows and reduce manual handling.",
    icon: Megaphone,
    connectedTools: [
      { name: "Docker" }, { name: "Laravel" }, { name: "Redis" }
    ]
  },
  {
    id: "13",
    title: "Flai",
    category: "Finance",
    role: "Maintainer",
    status: "Active",
    version: "v1",
    company: "NMS Philippines",
    description: "A specialized payroll and examination platform for freelancers, featuring automated bulk email notifications and streamlined financial workflows.",
    icon: FileText,
    connectedTools: [
      { name: "Kohana" }, { name: "MySQL" }, { name: "JS" }
    ]
  },
  {
    id: "14",
    title: "Loop Content Moderation",
    category: "Moderation",
    role: "Developer",
    status: "Active",
    company: "NMS Philippines",
    description: "A scalable moderation engine for text, image, and video content. Transitioned from a monolithic Kohana architecture (v1) to a modern, real-time reactive system (v2) utilizing WebSockets and request queueing.",
    icon: ShieldAlert,
    connectedTools: [
      { name: "Node.js" }, { name: "Laravel" }, { name: "Socket.io" }, { name: "Kohana" }
    ]
  },
  {
    id: "16",
    title: "IMv3 Watcher",
    category: "Engineering",
    role: "Support Developer",
    status: "Archived",
    company: "NMS Philippines",
    description: "Monitoring system for IMv3 conversations ensuring reliable status tracking.",
    icon: CheckCircle2,
    connectedTools: [
      { name: "Node.js" }, { name: "Express.js" }
    ]
  },
  {
    id: "17",
    title: "Dailysteam",
    category: "Engineering",
    role: "Support Lead",
    status: "Archived",
    company: "NMS Philippines",
    description: "Automation system enabling scheduled bot replies with accurate timing.",
    icon: Clock,
    connectedTools: [
      { name: "Node.js" }, { name: "Redis" }
    ]
  },
  {
    id: "18",
    title: "nmitd/oauth",
    category: "Composer Packages",
    role: "Lead Developer",
    status: "Active",
    company: "NMS Philippines",
    description: "Internal Composer package enabling SSO and centralized authentication across platforms.",
    icon: Users,
    connectedTools: [
      { name: "Laravel" }, { name: "Composer" }, { name: "SSO" }
    ]
  },
  {
    id: "19",
    title: "GTranslate",
    category: "Internal Tools",
    role: "Lead Developer",
    status: "Active",
    company: "NMS Philippines",
    description: "Bulk translation tool using Google Translate API to streamline localization.",
    icon: Globe,
    connectedTools: [
      { name: "Google API" }, { name: "Laravel" }, { name: "Tailwind" }
    ]
  },
  {
    id: "20",
    title: "Legacy Migrator",
    category: "Composer Packages",
    role: "Lead Developer",
    status: "Active",
    company: "NMS Philippines",
    description: "Generates robust, incremental migrations for legacy database records using Laravel queues.",
    icon: Database,
    connectedTools: [
      { name: "Laravel" }, { name: "Redis" }, { name: "Queues" }
    ]
  },
  {
    id: "21",
    title: "ar-queue-task",
    category: "NPM Packages",
    role: "Lead Developer",
    status: "Active",
    company: "Personal",
    link: "https://www.npmjs.com/package/ar-queue-task",
    description: "Task Queueing - push, wait and process. All tasks will store in an array.",
    icon: List,
    connectedTools: [
      { name: "NPM" }, { name: "Javascript" }
    ]
  },
  {
    id: "22",
    title: "@mreycode/mrey-express-cli",
    category: "NPM Packages",
    role: "Lead Developer",
    status: "Active",
    company: "Personal",
    link: "https://www.npmjs.com/package/@mreycode/mrey-express-cli",
    description: "A CLI tool for generating Express.js applications with best practices and structure.",
    icon: Terminal,
    connectedTools: [
      { name: "Node.js" }, { name: "Express" }, { name: "CLI" }, { name: "TypeScript" }
    ]
  },
  {
    id: "23",
    title: "Mrey AI Ecosystem",
    category: "AI & Prompt Engineering",
    role: "Lead Developer",
    status: "Active",
    company: "Personal",
    link: "https://mrey-ai.vercel.app",
    description: "A complete AI experimentation platform featuring modular frontends and robust API infrastructures. Serves as a central hub for prompt engineering research and AI-driven automation development.",
    icon: Terminal,
    connectedTools: [
      { name: "Next.js" }, { name: "Node.js" }, { name: "Express.js" }, { name: "Tailwind" }, { name: "TypeScript" }
    ]
  },
  {
    id: "25",
    title: "Autonomous AI Agent Automation",
    category: "AI & Prompt Engineering",
    role: "AI Engineer",
    status: "Active",
    company: "PopAI Technologies",
    description: "Multi-layered automation workflows powered by AI agents and n8n. Orchestrates complex tasks across Airtop, Meta, and Google APIs to create self-healing, intelligent business processes.",
    icon: Zap,
    connectedTools: [
      { name: "n8n" }, { name: "AI Agents" }, { name: "API Integration" }
    ]
  },
  {
    id: "26",
    title: "DOST: Barangay Portal",
    category: "Public Service",
    role: "Lead Developer",
    status: "Active",
    company: "DOST Satellite Urdaneta",
    description: "A digital portal designed for barangays to monitor local products, manage community events, and streamline organizational workflows for better public service delivery.",
    icon: Globe,
    connectedTools: [
      { name: "PHP" }, { name: "MySQL" }, { name: "Javascript" }, { name: "Bootstrap" }
    ]
  },
  {
    id: "27",
    title: "NMS Chat backend",
    category: "Engineering",
    role: "Lead Developer",
    status: "Archived",
    company: "NMS Philippines",
    description: "Led the development and maintenance of the chat backend infrastructure used in NMS Exam systems.",
    icon: MessageSquare,
    connectedTools: [
      { name: "Laravel" }, { name: "PHP" }, { name: "MySQL" }, { name: "Redis" }
    ]
  },
];

// Re-export CheckCircle2 for usage if needed, though strictly we used Lucide imports
import { CheckCircle2 } from "lucide-react"; 

export const CATEGORIES = [
  "All",
  "NPM Packages",
  "Composer Packages",
  "Finance",
  "HR & Operations",
  "Engineering",
  "Moderation",
  "Internal Tools",
  "Business Support",
  "AI & Prompt Engineering",
  "Public Service"
];
