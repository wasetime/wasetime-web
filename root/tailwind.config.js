module.exports = {
  purge: {
    mode: 'all',
    enabled: true,
    content: ['./src/**/*.ejs', './src/**/*.js', './src/**/*.ts', './src/**/*.tsx', './src/**/*.html'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
