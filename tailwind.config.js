/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Multi-tonal warm palette with sophisticated depth
        'saffron': {
          50: '#FFF9ED',
          100: '#FFF1D1',
          200: '#FFE0A3',
          300: '#FFC96A',
          400: '#FFA82E',
          500: '#FF8E0D',
          600: '#F07003',
          700: '#C75406',
          800: '#9E410D',
          900: '#7F380E',
        },
        'terracotta': {
          50: '#FDF4F3',
          100: '#FCE7E4',
          200: '#FAD4CD',
          300: '#F5B4A8',
          400: '#ED8976',
          500: '#E1654C',
          600: '#CC4B34',
          700: '#AB3C29',
          800: '#8D3426',
          900: '#752F25',
        },
        'sage': {
          50: '#F6F7F4',
          100: '#E9ECE3',
          200: '#D4DAC9',
          300: '#B7C2A7',
          400: '#98A885',
          500: '#7A8D69',
          600: '#5F7052',
          700: '#4C5943',
          800: '#3F4938',
          900: '#363E31',
        },
        'cream': {
          50: '#FDFCFB',
          100: '#FBF9F6',
          200: '#F7F3ED',
          300: '#F2EBE0',
          400: '#EAE0D1',
          500: '#DFD1BA',
          600: '#C8B39A',
          700: '#AA9074',
          800: '#8C7560',
          900: '#746050',
        },
        'charcoal': {
          50: '#F6F6F6',
          100: '#E7E7E7',
          200: '#D1D1D1',
          300: '#B0B0B0',
          400: '#888888',
          500: '#6D6D6D',
          600: '#5D5D5D',
          700: '#4F4F4F',
          800: '#454545',
          900: '#3A3A3A',
        },
      },
      fontFamily: {
        'display': ['Fraunces', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
