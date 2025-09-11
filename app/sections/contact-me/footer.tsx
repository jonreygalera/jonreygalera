'use client';

import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const internSans = Inter({
  variable: "--font-intern-sans",
  subsets: ["latin"],
});

export default function Footer() {
  return (
    <div className={cn(internSans.className, "mt-12 text-center text-sm text-gray-500")}>
      <p>© {new Date().getFullYear()} All rights reserved</p>
      <p className="mt-2">Designed and built with ❤️</p>
    </div>
  );
}
