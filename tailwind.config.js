/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F9FAFB',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          950: '#09090B',
        }
      }
    },
  },
  plugins: [],
}