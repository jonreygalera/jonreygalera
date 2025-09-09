"use client";

import { useEffect, useState } from "react";

export default function BreakpointLogger() {
  const [breakpoint, setBreakpoint] = useState("");

  useEffect(() => {
    const logBreakpoint = () => {
      const w = window.innerWidth;
      let bp = "base (<640px) 📱 mobile";

      if (w >= 1536) bp = "2xl (≥1536px) 🖥️ large desktop / 4K";
      else if (w >= 1280) bp = "xl (≥1280px) 🖥️ desktop";
      else if (w >= 1024) bp = "lg (≥1024px) 💻 laptop";
      else if (w >= 768) bp = "md (≥768px) 📟 tablet";
      else if (w >= 640) bp = "sm (≥640px) 📱 big mobile";

      setBreakpoint(`${w}px → ${bp}`);
    };

    logBreakpoint();
    window.addEventListener("resize", logBreakpoint);
    return () => window.removeEventListener("resize", logBreakpoint);
  }, []);

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50
                    bg-black text-white text-xs sm:text-sm 
                    px-3 py-1 rounded-full shadow-lg opacity-80">
      {breakpoint}
    </div>
  );
}
