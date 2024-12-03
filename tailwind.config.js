/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mobile': '640px',
      // => @media (min-width: 640px) { ... }
      // Small devices like phones (e.g., iPhone X)
    
      'tablet': '768px',
      // => @media (min-width: 768px) { ... }
      // Medium devices like tablets (e.g., iPad Mini, Galaxy Tab)
    
      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }
      // Large devices like laptops (e.g., MacBook Air, Dell XPS 13)
    
      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
      // Extra-large devices like desktops (e.g., 1080p monitors)
    
      'wide-screen': '1536px',
      // => @media (min-width: 1536px) { ... }
      // Ultra-wide or high-resolution screens (e.g., 4K monitors)
    },
    extend: {
      colors: {
        primary: {
          50: '#F9FAFB',
          60: '#f4f4f4',
          75: '#EFF0F1',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          950: '#09090B',
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'infinite-scroll-v': 'infinite-scroll-vertical 60s linear infinite',
        'infinite-scroll-h': 'infinite-scroll-horizontal 60s linear infinite',
      },
      keyframes: {
        'infinite-scroll-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-100%)' },
        }, 
        'infinite-scroll-horizontal': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
}