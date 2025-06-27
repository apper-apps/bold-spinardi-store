/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Bebas Neue', 'cursive'],
        'body': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#FF5722',
          50: '#FFE5DB',
          100: '#FFCCBC',
          200: '#FFAB91',
          300: '#FF8A65',
          400: '#FF7043',
          500: '#FF5722',
          600: '#F4511E',
          700: '#E64A19',
          800: '#D84315',
          900: '#BF360C',
        },
        secondary: {
          DEFAULT: '#263238',
          50: '#ECEFF1',
          100: '#CFD8DC',
          200: '#B0BEC5',
          300: '#90A4AE',
          400: '#78909C',
          500: '#607D8B',
          600: '#546E7A',
          700: '#455A64',
          800: '#37474F',
          900: '#263238',
        },
        accent: {
          DEFAULT: '#00BCD4',
          50: '#E0F7FA',
          100: '#B2EBF2',
          200: '#80DEEA',
          300: '#4DD0E1',
          400: '#26C6DA',
          500: '#00BCD4',
          600: '#00ACC1',
          700: '#0097A7',
          800: '#00838F',
          900: '#006064',
        },
        surface: '#ECEFF1',
        background: '#FAFAFA',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FF5722 0%, #FF7043 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #263238 0%, #37474F 100%)',
        'gradient-accent': 'linear-gradient(135deg, #00BCD4 0%, #26C6DA 100%)',
        'gradient-hero': 'linear-gradient(135deg, #FF5722 0%, #263238 50%, #00BCD4 100%)',
        'gradient-overlay': 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(38,50,56,0.8) 100%)',
      },
      boxShadow: {
        'industrial': '0 4px 20px rgba(38, 50, 56, 0.15)',
        'hover': '0 8px 40px rgba(255, 87, 34, 0.3)',
        'card': '0 2px 10px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-subtle': 'bounce 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}