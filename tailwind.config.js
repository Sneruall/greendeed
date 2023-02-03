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
        omnes: ['omnes-pro', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        custom: {
          brown1: '#402C06',
          brown2: '#b3ab9b',
          brown3: '#a59f84',
          brown4: '#869145',
          yellow1: '#F3D45A',
          yellow2: '#FAF8F5',
          green1: '#CDF68227',
          green2: '#CDF682',
          green3: '#F8FEEC',
          green4: '#6C695F',
          grey1: '#0000001F',
          grey2: '#F7F6F2',
          grey3: '#00000012',
          grey4: '#363636',
          grey5: '#FDFFF8',
          sdg1: '#e5233d',
          sdg2: '#dda73a',
          sdg3: '#4ca146',
          sdg4: '#c5192d',
          sdg5: '#ef402c',
          sdg6: '#27bfe6',
          sdg7: '#fbc412',
          sdg8: '#a31c44',
          sdg9: '#f26a2d',
          sdg10: '#e01483',
          sdg11: '#f89d2a',
          sdg12: '#bf8d2c',
          sdg13: '#407f46',
          sdg14: '#1f97d4',
          sdg15: '#59ba48',
          sdg16: '#126a9f',
          sdg17: '#13496b',
        },
      },
    },
  },

  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/forms')],
};
