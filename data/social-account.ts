import { 
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Link
} from "lucide-react";
import ISocialAccount from "./interface/isocial-account";

export const SOCIAL_ACCOUNTS : ISocialAccount[] = [
  { platform: 'Behance', icon: Link, url: 'https://www.behance.net/jonreygalera', description: 'View my collection of photos taken on Behance' },
  { platform: 'Github', icon: Github, url: 'https://github.com/jonreygalera', description: 'Check out my open-source projects on Github' },
  { platform: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/jon-rey-galera-6047781b3/', description: 'Connect with me on LinkedIn' },
  { platform: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/mreypage/', description: 'Follow me on Instagram' },
  { platform: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/profile.php?id=61581718995933', description: 'Follow me on Facebook' }
];
