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
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
