const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    safeList: [],
    content: ['./index.html', './src/**/*.tsx', './src/**/*.ts'],
  },
  theme: {
    minWidth: {
      40: '10rem',
      60: '15rem',
      80: '20rem',
      100: '25rem',
    },
    maxWidth: {
      120: '30rem',
      160: '40rem',
      200: '50rem',
    },
    extend: {
      colors: {
        'warm-gray': '#8a2be2',
        teal: colors.teal,
      },
    },
  },
  variants: {},
  plugins: [require('daisyui'), require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')],
  daisyui: {
    themes: ['emerald'],
  },
};
