"use client";
export default function GridPattern({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full relative">
      {/* Grid Background */}
      <div
        className="absolute inset-0 -z-10"
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