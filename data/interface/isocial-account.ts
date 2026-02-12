import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export default interface ISocialAccount {
  platform: string;
  icon: any;
  url: string;
  description?: string;
}