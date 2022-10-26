module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        alfa: ['Alfa Slab One'],
      },
      colors: {
        brown: { 500: '#402C06' },
      },
    },
  },

  plugins: [require('@tailwindcss/line-clamp')],
};
