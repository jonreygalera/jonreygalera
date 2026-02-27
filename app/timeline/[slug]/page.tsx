
import { TIMELINE_POSTS } from "@/data/timeline";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import SectionMainContainer from "@/components/section-main-container";
import Footer from "@/ui/footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TimelineRandomStories from "@/components/timeline-random-stories";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPostContent(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch content");
    return await res.text();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function TimelinePostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = TIMELINE_POSTS.find((p) => p.slug === slug);
  
  if (!post) {
    notFound();
  }

  const content = await getPostContent(post.githubRawUrl);

  if (!content) {
    return (
      <SectionMainContainer className="py-24 px-6 flex flex-col items-center justify-center min-h-[50vh]">
         <h1 className="text-2xl text-primary-100 font-bold mb-4">Content Not Found</h1>
         <p className="text-primary-500 mb-6">Unable to load the blog post content.</p>
         <Link href="/timeline" className="text-secondary-600 hover:underline">
           Back to Timeline
         </Link>
      </SectionMainContainer>
    )
  }

  return (
    <>
      <SectionMainContainer className="py-24 px-6 sm:px-12 md:px-24 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <Link href="/timeline" className="inline-flex items-center text-primary-500 hover:text-secondary-600 mb-8 group transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Timeline
          </Link>

          <header className="mb-12 border-b border-secondary-200 pb-8">
            <h1 className="text-4xl md:text-5xl font-black text-primary-100 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-primary-500">
               <span className="bg-secondary-100 text-secondary-800 px-3 py-1 rounded-full font-mono">
                 {post.date}
               </span>
               <div className="flex gap-2">
                 {post.tags.map(tag => (
                   <span key={tag} className="text-primary-400">#{tag}</span>
                 ))}
               </div>
            </div>
          </header>

          <article className="prose prose-lg prose-headings:text-primary-100 prose-p:text-primary-600 prose-strong:text-primary-100 prose-a:text-secondary-600 hover:prose-a:text-secondary-500 max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-12 mb-6 text-primary-100" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-10 mb-4 text-primary-200" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-8 mb-3 text-primary-300" {...props} />,
                p: ({node, ...props}) => <p className="leading-relaxed mb-6 text-primary-600 text-lg" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2 text-primary-600" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-primary-600" {...props} />,
                li: ({node, ...props}) => <li className="pl-1" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-secondary-400 pl-6 italic my-8 text-primary-500 py-2 bg-secondary-50/50 rounded-r-lg" {...props} />,
                a: ({node, ...props}) => <a className="text-secondary-600 font-medium hover:underline decoration-2 underline-offset-2" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-primary-100" {...props} />,
                hr: ({node, ...props}) => <hr className="border-secondary-200 my-10" {...props} />,
                code: ({node, className, children, ...props}: any) => {
                  const match = /language-(\w+)/.exec(className || '')
                  const isInline = !match && !String(children).includes('\n');
                  return isInline 
                    ? <code className="bg-secondary-100 text-secondary-800 px-1.5 py-0.5 rounded font-mono text-sm font-semibold" {...props}>{children}</code>
                    : <code className="block bg-primary-100 text-secondary-50 p-4 rounded-lg overflow-x-auto font-mono text-sm my-6 shadow-xl border border-secondary-800" {...props}>{children}</code>
                }
              }}
            >
              {content}
            </ReactMarkdown>
          </article>

          {/* ── Bottom nav ── */}
          <div className="mt-16 pt-8 border-t border-secondary-200 flex justify-between items-center">
             <Link href="/timeline" className="text-primary-500 hover:text-secondary-600 font-medium">
               &larr; More Posts
             </Link>
             <a href={post.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary-400 hover:text-primary-600 flex items-center gap-1">
               View source on GitHub
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
             </a>
          </div>

          {/* ── More Stories ── */}
          <TimelineRandomStories currentSlug={post.slug} />
        </div>
      </SectionMainContainer>
      <Footer />
    </>
  );
}
