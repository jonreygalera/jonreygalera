"use client";
export default function GridPattern({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full">
      {/* Grid Background */}
      <div
        className="fixed inset-0 -z-10 min-h-screen w-full
          sm:bg-blue-300
          md:bg-green-300
          lg:bg-orange-300
          xl:bg-transparent
          2xl:bg-amber-300
          3xl:bg-transparent"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      {children}
    </div>
  );
}