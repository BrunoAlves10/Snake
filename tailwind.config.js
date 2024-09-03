/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "blue-back": "#21D1DF"
      },
      borderColor: {
        "blue-bd": "#47DAE7",
      }
    },
  },
  plugins: [],
}

