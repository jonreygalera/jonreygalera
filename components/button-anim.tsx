import { cn } from "@/lib/utils";
interface ButtonAnimProps {
  text?: string;
  onClick?: () => void;
  variant?: 'light' | 'dark';
}

export default function ButtonAnim({ text = "Contact Me", onClick, variant = 'dark' }: ButtonAnimProps) {

  return (
    <button 
      onClick={onClick}
      className={cn(
        "relative flex items-center h-12 pl-6 pr-16 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-500 ease-in-out cursor-pointer group overflow-hidden",
        variant === 'dark' 
          ? "bg-white/5 backdrop-blur-md text-white border border-white/10" 
          : "bg-primary-100/5 backdrop-blur-md text-primary-100 border border-primary-100/10",
        "hover:border-secondary-500/50 hover:shadow-[0_0_30px_rgba(151,199,56,0.2)]"
      )}>
      <span className={cn(
        "relative z-10 transition-all duration-500 group-hover:opacity-0 group-hover:translate-x-[-10px]",
        variant === 'dark' ? "group-hover:text-primary-100" : "group-hover:text-white"
      )}>
        {text}
      </span>
      <div className={cn(
        "absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out group-hover:w-full group-hover:right-0 group-hover:rounded-none group-hover:h-full group-hover:top-0 group-hover:translate-y-0",
        variant === 'dark' ? "bg-secondary-500 text-primary-100" : "bg-primary-100 text-secondary-500"
      )}>
        <div className="relative flex items-center justify-center">
            <span className="absolute opacity-0 group-hover:opacity-100 group-hover:relative transition-opacity duration-300 font-black mr-2">{text}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={"h-5 w-5 transition-transform duration-500 group-hover:translate-x-1"}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
        </div>
      </div>
    </button>
  );
}