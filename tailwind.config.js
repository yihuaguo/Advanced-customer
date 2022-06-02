module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: {
        DEFAULT: '#f5f7fe',
        grep: 'red'
      }
    },
    fontSize: {}
  },
  corePlugins: {
    preflight: false
  }
}