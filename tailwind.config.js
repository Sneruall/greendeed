const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],  
  theme: {
    extend: {
      fontFamily: {
        sans: ['century-gothic', ...defaultTheme.fontFamily.sans],
        alfa: ['Alfa Slab One'],
        century: ['century-gothic', 'sans-serif'],
      },
      colors: {
        custom: { brown1: '#402C06', yellow1: '#F3D45A' },
      },
    },
  },

  plugins: [require('@tailwindcss/line-clamp')],
};
