'use client';

interface UnderConstructionProps {
  message?: string;
}

export default function UnderConstruction({ 
  message = "Sorry, the website is currently only available in mobile view."
}: UnderConstructionProps) {
  return (
    <section className="min-h-screen hidden sm:block xl:hidden 2xl:block">
      <div className="container mx-auto px-4 py-16 text-primary-200">
        <h1 className="text-4xl font-bold mb-4">Hello my name is Jon Rey Galera</h1>
        <p className="text-xl">
          {(new Date().getFullYear() - 2019)} years of professional experience.
        </p>
        <p className="mt-4 text-gray-600">
          {message}
        </p>
      </div>
    </section>
  );
}
