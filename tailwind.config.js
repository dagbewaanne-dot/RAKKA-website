/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f0ff',
          100: '#e0e0ff',
          200: '#c5c6ff',
          300: '#a3a4ff',
          400: '#7c7eff',
          500: '#5B5DFE',
          600: '#4446e8',
          700: '#3335cc',
          800: '#2527a8',
          900: '#1e2085',
        },
        accent: {
          400: '#9b7fff',
          500: '#7A5CFF',
          600: '#6244f0',
        },
        dark: {
          bg: '#090B10',
          card: '#12161F',
          border: '#1e2430',
          hover: '#1a2030',
        },
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { '0%': { opacity: '0', transform: 'translateX(20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        'luxury': '0 4px 24px rgba(0,0,0,0.06)',
        'luxury-md': '0 8px 40px rgba(0,0,0,0.10)',
        'luxury-lg': '0 16px 60px rgba(0,0,0,0.14)',
        'luxury-dark': '0 4px 24px rgba(0,0,0,0.4)',
        'primary': '0 4px 20px rgba(91,93,254,0.3)',
      },
    },
  },
  plugins: [],
};
