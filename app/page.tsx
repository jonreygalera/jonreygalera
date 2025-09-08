'use client';
import Image from "next/image";
import BackgroundImage from '/public/image1.png';
import Button from "@/components/button";

export default function HomePage() {

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.target = '__blank';
    link.href = '/files/Jon Rey Galera - CV.pdf';
    link.download = 'Jon Rey Galera - CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="flex flex-col h-full w-full items-center justify-center">
      <div className="w-full px-64 relative h-dvh border-2">
        <div className="leading-none italic font-extrabold">
          <h1 className="text-[200px]">
            Jon Rey
          </h1>
          <h1 className="text-6xl">
            Galera
          </h1>
        </div>

        <p className="mt-6 max-w-xl text-2xl">
          I bring together creativity, logic, and empathy to build beautiful and functional products. The future of code is a step toward better, smarter, and more human-centric experiences.
        </p>
        <div className="mt-8 flex space-x-4">
          <Button>
            HIRE ME
          </Button>
          <Button onClick={handleDownloadCV}>
            DOWNLOAD CV
          </Button>
        </div>
        <Image 
          src={BackgroundImage}
          alt="Image 1"
          className="absolute w-1/2 top-2 right-0"
        />
        
      </div>
        <div className="border-2 border-red-500 w-full animate-in slide-in-from-right-96 duration-1000">
          <h1 className="text-4xl">Test</h1>
        </div>
      </section>
  );
}
