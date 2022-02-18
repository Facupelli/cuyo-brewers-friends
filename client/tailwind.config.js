const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        postProduct: "[first] 40% [second] 60%",
      },
    },
    boxShadow: {
      "navbar-shadow":
        "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;",
      "menu-shadow":
        "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
      "form-shadow": "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;",
      input:
        "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;",
      "card-shadow":
        "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;",
    },
    animation: {
      "spin-slow": "spin 2s ease-in-out infinite",
      "bounce-slow": "bounce 2s ease-in-out infinite",
    },
    fontFamily: {
      sans: ["Heebo", "sans-serif"],
      serif: ["Frank\\ Ruhl\\ Libre", "serif"],
      title: ["Oswald", "sans-serif"],
    },
    colors: {
      main: "#252422",
      mainC: "#CCC5B9",
      mainC2: "#F96900",
      second: "#9B1D20",
      bgMain: "#FFFCF2",
      transparent: "transparent",
      current: "currentColor",
      orange: colors.orange,
      red: colors.red,
      amber: colors.amber,
      yellow: colors.yellow,
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      blue1: "#0F7BA6",
      blueDark: "#0A5573",
      blueLight: "#16B4F2",
      brown1: "#592F00",
      brownLight: "#A65E0F",
      1: "#ffe799",
      2: "#fed878",
      3: "#ffca5b",
      4: "#ffbf43",
      5: "#fcb124",
      6: "#f8a600",
      7: "#f39d01",
      8: "#ea8e00",
      9: "#e68501",
      10: "#df7c00",
      11: "#d77200",
      12: "#d06900",
      13: "#cb6300",
      14: "#c35801",
      15: "#bb5000",
      16: "#b74c01",
      17: "#b04401",
      18: "#a63e01",
      19: "#a13601",
      20: "#9d3301",
      21: "#942d00",
      22: "#8f2901",
      23: "#862200",
      24: "#801f00",
      25: "#7b1b01",
      26: "#771900",
      27: "#711401",
      28: "#631200",
      29: "#660d00",
      30: "#5e0c01",
      black: "#000000",
    },
  },
  variants: {
    extend: {},
  },
};
