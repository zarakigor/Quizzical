/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#293264",
        secondary: "#F5F7FB",
        primary_bg: "#4D5B9E",
        secondary_bg: "#D6DBF5",
        wrong_answer_bg: "#F8BCBC",
        correct_answer_bg: "#94D7A2",
      },
      fontFamily: {
        karla: ["Karla", "Arial", "sans-serif"],
        inter: ["Inter", "Tahoma", "sans-serif"],
      },
    },
  },
  plugins: [],
};
