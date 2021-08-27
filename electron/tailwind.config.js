module.exports = {
  darkMode: false, // or 'media' or 'class'

  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
  },
  theme: {
    extend: {
      colors: {
        gray: {
          DEFAULT: '#737373',
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          750: '#323232',
          800: '#262626',
          900: '#171717',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
