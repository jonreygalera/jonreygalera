'use client';

import { cn } from "@/lib/utils";

export const fieldClassName =
  "w-full px-4 py-3 text-base rounded-xl bg-white text-primary-100 placeholder:text-primary-600 border-2 border-primary-900 shadow-sm transition focus:outline-none focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/20";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClass?: string;
}

export default function TextField(props: TextFieldProps) {
  const {
    label,
    containerClass = '',
    className,
    ...others
  } = props;

  return (
    <div className={cn("space-y-2 w-full", containerClass)}>
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-primary-800">
          {label}
        </label>
      )}
      <input
        {...others}
        className={cn(fieldClassName, className)}
      />
    </div>
  );
}
