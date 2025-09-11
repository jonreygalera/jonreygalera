'use client';

import { cn } from "@/lib/utils";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClass?: string;
}

export default function TextField(props: TextFieldProps) {
  const {
    label,
    containerClass = '',
    ...others
  } = props;

  return (
    <div className={cn("space-y-2 w-full", containerClass)}>
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium">
          {label}
        </label>
      )}
      <input
        {...others}
        className="w-full px-3 py-2 rounded-md shadow-sm transition border"
      />
    </div>
  );
}
