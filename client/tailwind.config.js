/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'borrow': '#3B82F6',       // tom de azul
        'borrowDark': '#1E40AF',   // azul mais escuro
        'dark': '#1F2937',         // cinza escuro
        'gray': '#F3F4F6',         // cinza claro
        'background': '#F9F9F7',   // cinza muito claro para fundo
        'white': '#FFFFFF' 
      },
      fontFamily: {
        'rokkitt': ['Rokkitt', 'serif'],
      }
    },
  },
  plugins: [],
}

