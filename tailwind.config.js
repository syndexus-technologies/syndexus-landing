/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <--- ADD THIS LINE
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        syndexus: {
          navy: '#0b1120',
          teal: '#14b8a6',
          orange: '#f97316',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
