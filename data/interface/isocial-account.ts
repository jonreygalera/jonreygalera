import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export default interface ISocialAccount {
  platform: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  url: string;
  description?: string;
}