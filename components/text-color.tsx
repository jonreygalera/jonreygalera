import { cn } from "@/lib/utils";

interface TextColorProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export default function TextColor({ children, className, ...props }: TextColorProps) {
  return (
    <span 
      className={cn("text-secondary-500 bg-primary-100 px-1 rounded", className)}
      {...props}
    >
      {children}
    </span>
  );
}
