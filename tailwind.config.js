/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient': "url('./assets/bg-gradient.png')",
        'title': "url('./assets/SSSNAKE.png')",
      },
      backgroundColor: {
        "blue-back": "#21D1DF"
      },
      borderColor: {
        "blue-bd": "#47DAE7",
      },
      fontFamily: {
        'jura': ['Jura', 'sans-serif'], // sans-serif fonte secundaria caso navegador nao carregue Jura
      }
    },
  },
  plugins: [],
}

