import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import BreakpointLogger from "@/components/breakpoint-logger";
import NavBar from "@/components/nav-bar";
import GridPattern from "@/components/grid-pattern";
import UnderConstruction from "@/ui/under-construction";

const lexendSans = Lexend({
  variable: "--font-lexend-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jon Rey Galera",
  description: "Portfolio of Jon Rey Galera - Web Developer, Software Engineer and AI Agent Engineer specializing in creating beautiful, functional and human-centric digital experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css" rel="stylesheet" />
      </head>
      <body
        className={`${lexendSans.className} antialiased`}
      >
        <GridPattern>
          <div className="sx:hidden sm:block 3xl:hidden">
            <NavBar/>
            {children}
            <BreakpointLogger/>
          </div>

          {/* <UnderConstruction/> */}
        </GridPattern>
        
        <script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js" async/>
      </body>
    </html>
  );
}
