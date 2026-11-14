'use client';

import { cn } from "@/lib/utils";
import { fieldClassName } from "./text-field";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  containerClass?: string;
  rows?: number;
}

export default function TextArea(props: TextAreaProps) {
  const {
    label,
    containerClass = '',
    className,
    rows = 4,
    ...others
  } = props;

  return (
    <div className={cn("space-y-2 w-full", containerClass)}>
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-primary-800">
          {label}
        </label>
      )}
      <textarea
        {...others}
        rows={rows}
        className={cn(fieldClassName, "min-h-[140px] resize-y", className)}
      />
    </div>
  );
}
