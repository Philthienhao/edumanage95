/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#01A49D',
          600: '#008b85',
          700: '#006f6b',
          800: '#005855',
          900: '#004745',
          950: '#002928',
        },
        brand: {
          DEFAULT: '#01A49D',
          dark: '#00837D',
          light: '#E6F6F5',
          hover: '#018f89',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
