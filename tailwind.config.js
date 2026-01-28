/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette - warm and vibrant
        'cream': '#F5F0E8',
        'cream-dark': '#E8E0D0',
        'warm-yellow': '#F7D547',
        'warm-yellow-light': '#FBE88A',
        'warm-yellow-dark': '#D4A800', // Darkened for better contrast

        // Deep forest green
        'forest': '#1B4D3E',
        'forest-light': '#2D6A4F',
        'forest-dark': '#143D31',

        // Coral/Orange accent
        'coral': '#C4693F', // Darkened from #E07B54 for WCAG AA contrast
        'coral-light': '#D97B50', // Darkened from #F09070 for better contrast
        'coral-dark': '#A35530', // Darkened from #C4693F for consistency

        // Warm neutrals - improved contrast ratios
        'warm-gray': '#5A4D40', // Darkened from #6B5E50 for 4.5:1 contrast on cream
        'warm-gray-light': '#6B5E50', // Was #8A7B6B, now meets contrast requirements
        'warm-gray-dark': '#3D3429', // Darkened from #4A4035 for better contrast

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
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'warm': '0 4px 20px rgba(247, 213, 71, 0.3)',
      },
    },
  },
  plugins: [],
}
