import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav-bar";
import GridPattern from "@/components/grid-pattern";
import ChatbotWidget from "@/components/chatbot-widget";

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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${lexendSans.className} antialiased text-primary-100 bg-secondary-50 selection:bg-secondary-200 selection:text-primary-100`}
      >
        <GridPattern>
          <NavBar/>
          <main className="flex flex-col min-h-screen">
             {children}
          </main>
          <ChatbotWidget />
        </GridPattern>
      </body>
    </html>
  );
}
