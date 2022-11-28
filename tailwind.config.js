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
        alfa: ['Alfa Slab One', ...defaultTheme.fontFamily.sans],
        century: ['century-gothic', ...defaultTheme.fontFamily.sans],
        ict: ['itc-avant-garde-gothic-pro', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        custom: {
          brown1: '#402C06',
          yellow1: '#F3D45A',
          green1: '#CDF68227',
          green2: '#CDF682',
          grey1: '#0000001F',
          grey2: '#F7F6F2',
          grey3: '#00000012',
        },
      },
    },
  },

  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/forms')],
};
