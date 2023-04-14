/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    colors: {
      primary: { DEFAULT: '#8ECAE6' },
      secundary: { DEFAULT: '#219EBC' },
      tertiary: { DEFAULT: '#023047' },
      quaternary: { DEFAULT: '#FFB703' },
      quinary: { DEFAULT: '#FB8500' },
    },
    extend: {
      colors: {
        primary: { DEFAULT: '#8ECAE6' },
        secundary: { DEFAULT: '#219EBC' },
        tertiary: { DEFAULT: '#023047' },
        quaternary: { DEFAULT: '#FFB703' },
        quinary: { DEFAULT: '#FB8500' },
      },
    },
  },
  plugins: [],
};
