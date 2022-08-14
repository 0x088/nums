/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1d1d1f",
        bg: "#efce92",
      },
      boxShadow: {
        default: "0px 0px 32px -6px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
