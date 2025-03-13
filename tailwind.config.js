/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          main: '#1976d2',
          light: '#42a5f5',
          dark: '#1565c0',
        },
        secondary: {
          main: '#9c27b0',
          light: '#ba68c8',
          dark: '#7b1fa2',
        },
        darkmode: {
          bg: '#121212',
          paper: '#1e1e1e',
          border: '#333333',
          text: {
            primary: '#f5f5f5',
            secondary: '#b3b3b3'
          }
        }
      }
    },
  },
  plugins: [],
} 