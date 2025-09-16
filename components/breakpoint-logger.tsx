"use client";

import { useEffect, useState } from "react";

export default function BreakpointLogger() {
  const [breakpoint, setBreakpoint] = useState("");

  useEffect(() => {
    const logBreakpoint = () => {
      const w = window.innerWidth;
      let bp = "base (<640px) 📱 mobile";

      if (w >= 7680) bp = "7xl (≥7680px) 🖥️ 8K";
      else if (w >= 5120) bp = "6xl (≥5120px) 🖥️ 5K";
      else if (w >= 3840) bp = "5xl (≥3840px) 🖥️ 4K UHD";
      else if (w >= 2560) bp = "4xl (≥2560px) 🖥️ 1440p ultrawide";
      else if (w >= 1920) bp = "3xl (≥1920px) 🖥️ 1080p / 27\"";
      else if (w >= 1536) bp = "2xl (≥1536px) 🖥️ large desktop";
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
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 z-50
                    bg-black text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl
                    px-3 py-1 rounded-full shadow-lg opacity-80
                    max-w-[90vw] truncate">
      {breakpoint}
    </div>
  );
}
