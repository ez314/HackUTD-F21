module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '15p': "15%",
        '70p': "70%",
      },
      backgroundColor: {
        "cool-0": "#000000cc",
        "cool-1": "#222222",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
