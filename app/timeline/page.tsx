'use client';

import { useState, useEffect, useRef } from "react";
import SectionMainContainer from "@/components/section-main-container";
import { TIMELINE_POSTS } from "@/data/timeline";
import Link from "next/link";
import Footer from "@/ui/footer";
import ScrollToTop from "@/components/scroll-to-top";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowUp } from "lucide-react";

export default function TimelinePage() {
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Group posts by year
  const groupedPosts = TIMELINE_POSTS.reduce((acc, post) => {
    const year = post.date; // Use date as year
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {} as Record<string, typeof TIMELINE_POSTS>);

  const years = Object.keys(groupedPosts).sort((a, b) => Number(b) - Number(a)); // Descending order

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveYear(entry.target.getAttribute("data-year"));
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px", // adjust trigger zone
        threshold: 0.1,
      }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [years]);

  const scrollToYear = (year: string) => {
    const el = sectionRefs.current[year];
    if (el) {
       // Offset slightly for sticky header
       const headerOffset = 100;
       const elementPosition = el.getBoundingClientRect().top;
       const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

       window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
       });
       // Optionally update active year
       setActiveYear(year);
    }
  };

  return (
    <>
      <SectionMainContainer className="py-24 px-4 sm:px-6 md:px-12 min-h-screen relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Sticky Sidebar Navigation */}
          <aside className="hidden md:block md:col-span-3 lg:col-span-2 relative">
             <div className="sticky top-32 space-y-8">
                <nav className="flex flex-col space-y-2 border-l-2 border-primary-200 pl-4 py-2">
                   {years.map((year) => (
                     <button
                       key={year}
                       onClick={() => scrollToYear(year)}
                       className={cn(
                         "text-left text-sm font-bold transition-all duration-300 py-1 px-2 rounded hover:bg-secondary-100/50",
                         activeYear === year 
                           ? "text-secondary-600 translate-x-1 border-l-2 border-secondary-500 -ml-[18px] bg-secondary-50" 
                           : "text-primary-400 hover:text-primary-600"
                       )}
                     >
                       {year}
                     </button>
                   ))}
                </nav>
                <div className="text-xs text-primary-400 px-4">
                  <p>Total Posts: {TIMELINE_POSTS.length}</p>
                </div>
             </div>
          </aside>

          {/* Main Content Area */}
          <div className="md:col-span-9 lg:col-span-10 space-y-24">
             
            <header className="space-y-6 text-center md:text-left mb-16">
              <h1 className="text-5xl md:text-7xl font-black text-primary-100 tracking-tight leading-tight">
                Dev<span className="text-secondary-500">Timeline</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-600 max-w-2xl font-medium">
                A chronological archive of my journey, projects, and the lessons learned along the way.
              </p>
            </header>

            {years.map((year) => (
              <section 
                key={year} 
                id={`year-${year}`}
                data-year={year}
                ref={(el) => { if (el) sectionRefs.current[year] = el }} // Assign ref specifically
                className="relative scroll-mt-32"
              >
                <div className="flex items-center gap-4 mb-12 sticky top-24 bg-secondary-50 z-20 py-4 border-b border-primary-200/50 backdrop-blur-sm bg-opacity-90">
                  <h2 className="text-4xl font-black text-primary-200/20 md:text-6xl absolute -top-4 -left-4 -z-10 select-none pointer-events-none">
                    {year}
                  </h2>
                   <h3 className="text-2xl font-bold text-primary-100 z-10 pl-2">
                    {year}
                   </h3>
                   <span className="h-px flex-1 bg-gradient-to-r from-secondary-300 to-transparent ml-4"></span>
                </div>

                <div className="space-y-12 ml-2 md:ml-8 border-l border-primary-200 pl-6 md:pl-10 pb-8 relative">
                   {/* Year Marker on Timeline Line */}
                   <span className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-primary-300 ring-4 ring-secondary-50"></span>

                  {groupedPosts[year].map((post) => (
                    <article key={post.id} className="relative group">
                       
                       {/* Timeline Dot for Post */}
                       <div className="absolute -left-[35px] md:-left-[51px] top-2 h-4 w-4 rounded-full border-2 border-secondary-50 bg-primary-200 transition-colors duration-300 group-hover:bg-secondary-500 z-10 hover:scale-125 hover:shadow-md" />

                       <div className="flex flex-col gap-3 group-hover:-translate-y-1 transition-transform duration-300 hover:bg-white hover:shadow-xl hover:rounded-2xl p-6 -m-6 border border-transparent hover:border-secondary-100">
                          <div className="flex justify-between items-start">
                             <div className="flex flex-wrap gap-2 mb-2">
                               {post.tags.map(tag => (
                                 <span key={tag} className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded bg-primary-100 text-secondary-200">
                                   {tag}
                                 </span>
                               ))}
                             </div>
                             <span className="text-xs font-mono text-primary-400">
                               {post.fullDate || post.date}
                             </span>
                          </div>

                          <Link href={`/timeline/${post.slug}`} className="block group/link">
                            <h4 className="text-2xl font-bold text-primary-100 mb-2 group-hover/link:text-secondary-600 transition-colors">
                              {post.title}
                            </h4>
                            <p className="text-primary-500 leading-relaxed mb-4 line-clamp-3">
                              {post.description}
                            </p>
                            <span className="inline-flex items-center text-secondary-600 text-sm font-bold group-hover/link:underline decoration-2 underline-offset-4">
                              Read Full Story <ArrowLeft className="w-4 h-4 ml-1 rotate-180 transition-transform group-hover/link:translate-x-1" />
                            </span>
                          </Link>
                       </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}

            {/* Empty State / Bottom Message */}
            <div className="text-center py-20 text-primary-300 italic">
               <p>End of timeline... for now.</p>
            </div>
          </div>

        </div>
      </SectionMainContainer>
      
      <ScrollToTop/>
      <Footer />
    </>
  );
}
