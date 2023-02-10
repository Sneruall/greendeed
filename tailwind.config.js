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
          green5: '#eff5e3',
          grey1: '#0000001F',
          grey2: '#F7F6F2',
          grey3: '#00000012',
          grey4: '#363636',
          grey5: '#FDFFF8',
          sdg1: '#e5243b',
          sdg2: '#DDA63A',
          sdg3: '#4C9F38',
          sdg4: '#C5192D',
          sdg5: '#FF3A21',
          sdg6: '#26BDE2',
          sdg7: '#FCC30B',
          sdg8: '#A21942',
          sdg9: '#FD6925',
          sdg10: '#DD1367',
          sdg11: '#FD9D24',
          sdg12: '#BF8B2E',
          sdg13: '#3F7E44',
          sdg14: '#0A97D9',
          sdg15: '#56C02B',
          sdg16: '#00689D',
          sdg17: '#19486A',
        },
      },
    },
  },

  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/forms')],
};
