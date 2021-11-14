const colors = {
  "custom-modal": "#000000cc",
  "custom-gray-0": "#151515",
  "custom-gray-1": "#222222",
  "custom-gray-2": "#333333",
  "custom-gray-3": "#4E4F4E",
  "custom-gray-4": "#F5F5F5",
  "custom-green": "#26CF5E",
  "custom-red": "#F24855",
  "custom-blue": "#357AE4",
};

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
        ...colors
      },
      textColor: {
        ...colors
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
