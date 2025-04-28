/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0066FF',
        gray: {
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#D4D4D4',
          300: '#C3C3C3',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: ['Bauziet', 'sans-serif'],
      },
      spacing: {
        '1/3': '33.333333%',
        '2/3': '66.666667%',
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 