// See https://tailwindcss.com/docs/configuration for details
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1d3c6d',
        secondary: '#136871',
        tertiary: '#b52a2a',
        thblack: '#090a0f',
        thgrey: '#dfdfd8'
      }
    }
  },
  purge: ["./src/**/*.js"],
  variants: {},
  // https://github.com/tailwindcss/custom-forms
  plugins: [require("@tailwindcss/custom-forms")],
};

