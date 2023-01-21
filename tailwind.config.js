const defaultTheme = require("tailwindcss/defaultTheme")
const color = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        //?: PRIMARY COLOR
        "primary-lighter": color.indigo[100],
        "primary-light": color.indigo[300],
        primary: color.indigo[500],
        "primary-dark": color.indigo[700],
        "primary-darker": color.indigo[900],

        //!: ERROR COLOR
        "error-lighter": color.red[100],
        "error-light": color.red[300],
        error: color.red[500],
        "error-dark": color.red[600],
        "error-darker": color.red[900],

        //todo: WARNING COLOR
        "warning-lighter": color.amber[100],
        "warning-light": color.amber[300],
        warning: color.amber[500],
        "warning-dark": color.amber[600],
        "warning-darker": color.amber[900],
      },
    },

    screens: {
      xs: "360px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}
