/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0d59f2",
        "accent-lime": "#ccff00",
        "background-light": "#f5f6f8",
        "background-dark": "#050505",
      },
      fontFamily: {
        display: ["SpaceGrotesk"],
      },
      borderRadius: {
        DEFAULT: "4px",
        lg: "8px",
        xl: "12px",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
