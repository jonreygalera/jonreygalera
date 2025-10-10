import { 
  Github,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react";
import ISocialAccount from "./interface/isocial-account";

export const SOCIAL_ACCOUNTS : ISocialAccount[] = [
  { platform: 'Github', icon: Github, url: 'https://github.com/jonreygalera' },
  { platform: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/jon-rey-galera-6047781b3/' },
  { platform: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/mreypage/' },
  { platform: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/profile.php?id=61581718995933' }
];
