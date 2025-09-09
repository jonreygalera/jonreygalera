import { cn } from "@/lib/utils";
export default function ButtonAnim({ text = "Contact Me" }: { text?: string }) {

  return (
    <div className={cn(
      "relative flex items-center h-10 pl-6 pr-14 rounded-full font-medium transition-all duration-700 ease-in-out cursor-pointer group",
      "bg-white text-black border border-black overflow-hidden",
      "hover:bg-gray-100"
    )}>
      <span>{text}</span>
      <div className={cn(
        "absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full flex items-center justify-center transition-all duration-700 ease-in-out group-hover:w-full group-hover:right-0 ",
        "text-white group-hover:h-11")}>
        <span className="hidden group-hover:block animate-fade-in">{text}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={"h-5 w-5 text-white transition-transform duration-700 group-hover:translate-x-1"}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}