"use client";

import { cn } from "@/lib/utils";

export default function GridPattern({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("relative min-h-screen w-full selection:bg-primary-500/30", className)}>
      <div
        className="fixed inset-0 -z-10 h-full w-full bg-secondary-50
        [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] 
        [background-size:24px_24px] 
        [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
      />
      <div className="relative z-0">
         {children}
      </div>
    </div>
  );
}