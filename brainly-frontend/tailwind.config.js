/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange:{
          300: '#FE4500'
        },
        purple: {
          200: "#DFE7FF",
          400: "#493FBF",
          600: "#5044E5",
        },
        gray: {
          100: "#F8FBFC",
          300: "#DDDDDD",
          600: "#ACACAC",
          700: "#6A7280"
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

