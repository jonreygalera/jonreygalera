'use client';

export default function Footer() {
  return (
    <footer className="bg-primary-200 text-white p-8 text-center">
      <div className="container mx-auto">
        <p>© {new Date().getFullYear()} All Rights Reserved</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="#" className="hover:text-gray-300">Terms</a>
          <a href="#" className="hover:text-gray-300">Privacy</a>
          <a href="#" className="hover:text-gray-300">Contact</a>
        </div>
      </div>
    </footer>
  );
}
