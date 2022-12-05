/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { karla: ["Karla", "Arial", "sans-serif"] },
      inter: ["Inter", "Tahoma", "sans-serif"],
    },
  },
  plugins: [],
};
