/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'swedish-blue': '#006AA7',
        'swedish-yellow': '#FECC00',
      },
    },
  },
  plugins: [],
}
