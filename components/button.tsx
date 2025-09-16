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
  let styleClass = `px-6 py-2 rounded-2xl font-bold shadow-lg transform hover:-translate-y-1 transition-all duration-300
        border-2 border-primary-100 text-secondary-500 md:text-primary-100
        cursor-pointer bg-primary-100 md:bg-gray-100 hover:bg-primary-200 hover:text-secondary-500`;
  if(link) {
    styleClass = `font-bold cursor-pointer transition-colors duration-300 text-white hover:text-secondary-500`;
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
