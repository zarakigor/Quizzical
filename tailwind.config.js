/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#293264",
      secondary: "#F5F7FB",
      primary_bg: "#4D5B9E",
    },
    extend: {
      fontFamily: {
        karla: ["Karla", "Arial", "sans-serif"],
        inter: ["Inter", "Tahoma", "sans-serif"],
      },
    },
  },
  plugins: [],
};
