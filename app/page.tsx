import Image from "next/image";

export default function HomePage() {
  return (
    <section className="min-h-screen">
      <div className="container mx-auto px-4 py-16 text-main">
        <h1 className="text-4xl font-bold mb-4">Hello my name is Jon Rey Galera</h1>
        <p className="text-xl">
          {(new Date().getFullYear() - 2019)} years of professional experience.
        </p>
        <p className="mt-4 text-gray-600">
          Sorry, the website is currently under construction.
        </p>
      </div>
    </section>
  );
}
