/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Bauziet', 'sans-serif'],
      },
      colors: {
        primary: '#0066FF',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
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
  plugins: [],
} 