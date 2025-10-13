/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // keyframes: {
      //   'slide-fade-in': {
      //     '0%': { opacity: '0', transform: 'translateY(-20px)' },
      //     '100%': { opacity: '1', transform: 'translateY(0)' },
      //   },
      // },
      // animation: {
      //   'slide-fade-in': 'slide-fade-in 0.5s ease-out forwards',
      // },
    },
  },
  plugins: [],
}
