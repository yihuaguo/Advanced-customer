module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    DEFAULT: 'red',
    colors: {
      black: {
        DEFAULT: '#f5f7fe'
      }
    },
    fontSize: {}
  },
  corePlugins: {
    preflight: false
  }
}