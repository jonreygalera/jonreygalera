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
    <section id="home" className="flex flex-col-reverse md:flex-row items-center justify-between mb-24 md:space-x-12">
        <div className="w-full py-16 relative pl-96">
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
            className="absolute w-1/2 top-5 right-0"
          />
        </div>
          
      </section>
  );
}
