/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores do seu projeto
        wine: '#800020',
        gold: '#D4AF37',
        'blue-votum': '#2563eb', // O azul da sua logo/card
      },
    },
  },
  plugins: [],
}