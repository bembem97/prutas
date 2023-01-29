// const defaultTheme = require("tailwindcss/defaultTheme")
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
      animation: {
        "fade-in": "fade-in 350ms forwards",
        "fade-out": "fade-out 350ms forwards",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(-8px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
        "fade-out": {
          "0%": { opacity: 1, transform: "translateY(0px)" },
          "100%": { opacity: 0, transform: "translateY(-8px)" },
        },
      },
      screens: {
        xs: "0px",
        sm: "360px",
        mobile: "412px",
        md: "640px",
        tab: "768px",
        lg: "900px",
        xl: "1024px",
        laptop: "1280px",
      },
    },
  },
  plugins: [],
}
