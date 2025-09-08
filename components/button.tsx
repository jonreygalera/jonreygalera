import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}

export default function Button({ 
  className = '',
  children,
  ...props 
}: ButtonProps) {

  return (
    <button
      className={cn(`
        px-6 py-2 rounded-2xl font-bold shadow-lg transform hover:-translate-y-1 transition-all duration-300
        border-2 border-primary-100 text-primary-100
        cursor-pointer bg-gray-100
        `)}
      {...props}
    >
      {children}
    </button>
  );
}
