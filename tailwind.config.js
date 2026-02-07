/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Light sage background (lighter, greener palette)
        'terracotta': '#D4DFCA',
        'terracotta-light': '#E0E9D6',
        'terracotta-dark': '#C0CFAE',

        // Surface colors - warm white for cards
        'cream': '#FEFCF8',
        'cream-dark': '#F2EDE4',

        // Deep forest green - headings and primary text
        'teal': '#2D6B47',
        'teal-light': '#3D8A5A',
        'teal-dark': '#1D4F33',

        // Coral/Salmon - CTAs and warm accents
        'coral': '#D4785C',
        'coral-light': '#E49A85',
        'coral-dark': '#B86045',

        // Earth/olive neutrals - body text
        'earth': '#4A5E40',
        'earth-light': '#6B7C60',
        'earth-dark': '#354530',

        // Nature accent - bright olive
        'olive': '#5A8042',
        'olive-light': '#7AA05A',
        'olive-dark': '#3D5F2E',

        // Sand/sage - borders, dividers, secondary surfaces
        'sand': '#C5D6B2',
        'sand-dark': '#ADBF98',

        // Keep Swedish colors for special accents
        'swedish-blue': '#006AA7',
        'swedish-yellow': '#FECC00',
      },
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(45, 107, 71, 0.08)',
        'soft-lg': '0 8px 30px rgba(45, 107, 71, 0.12)',
        'warm': '0 4px 20px rgba(212, 120, 92, 0.25)',
        'card': '0 2px 16px rgba(45, 107, 71, 0.06)',
      },
    },
  },
  plugins: [],
}
