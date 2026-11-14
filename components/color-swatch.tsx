'use client';

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function ColorSwatch({ color }: { color: { name: string; hex: string; variable: string } }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (insecure context / permissions); fail quietly.
    }
  };

  return (
    <div className="group relative flex flex-col gap-2">
      <button
        onClick={() => copyToClipboard(color.variable)}
        aria-label={`Copy ${color.variable}`}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-primary-200/20 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 focus:ring-offset-secondary-50"
      >
        <div
          className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundColor: color.hex }}
        />
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-primary-100/10 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
           {copied ? (
             <div className="flex items-center gap-2 rounded-full bg-secondary-500 px-3 py-1.5 text-xs font-medium text-primary-100 shadow-lg animate-in fade-in zoom-in duration-200">
               <Check className="h-3.5 w-3.5" />
               <span>Copied!</span>
             </div>
           ) : (
            <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-primary-100 shadow-lg">
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </div>
           )}
        </div>
      </button>

      <div className="flex flex-col px-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight text-primary-100">
            {color.name}
          </span>
          <span className="font-mono text-[10px] text-primary-400 uppercase">
            {color.hex}
          </span>
        </div>
        <span className="text-[10px] text-primary-500 truncate w-full" title={color.variable}>
          {color.variable}
        </span>
      </div>
    </div>
  );
}
