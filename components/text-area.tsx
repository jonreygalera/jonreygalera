'use client';

import { cn } from "@/lib/utils";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  containerClass?: string;
  rows?: number;
}

export default function TextArea(props: TextAreaProps) {
  const {
    label,
    containerClass = '',
    rows = 4,
    ...others
  } = props;

  return (
    <div className={cn("space-y-2 w-full", containerClass)}>
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium">
          {label}
        </label>
      )}
      <textarea
        {...others}
        rows={rows}
        className="w-full px-3 py-2 rounded-md shadow-sm transition border min-h-[100px]"
      />
    </div>
  );
}
