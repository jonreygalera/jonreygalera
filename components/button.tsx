import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  link?: boolean
}

export default function Button({ 
  className = '',
  children,
  link = false,
  ...props 
}: ButtonProps) {
  let styleClass = `
    inline-flex items-center justify-center px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest
    transition-all duration-300 active:scale-95 shadow-lg
    border border-primary-100/10 backdrop-blur-sm
    bg-primary-100 text-secondary-500 md:bg-white md:text-primary-100
    hover:bg-secondary-500 hover:text-white hover:border-secondary-500 hover:shadow-secondary-500/20
  `;
  
  if(link) {
    styleClass = `
      inline-flex items-center gap-2 font-bold transition-all duration-300 
      text-white/60 hover:text-secondary-500 hover:translate-x-1
    `;
  }

  return (
    <button
      className={cn(styleClass, className)}
      {...props}
    >
      {children}
    </button>
  );
}
