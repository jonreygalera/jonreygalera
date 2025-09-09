export default function Divider() {

  return (
    <div className="z-10 bg-primary-200  w-full p-4 flex flex-row">
        <div className="flex whitespace-nowrap animate-marquee text-white">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="px-1">• DESIGN • DEVELOP • DISCOVER</span>
          ))}
        </div>
    </div>
  );
}