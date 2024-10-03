/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          50: "#fef6ee",
          100: "#feebd6",
          200: "#fbd2ad",
          300: "#f8b279",
          400: "#f48843",
          500: "#f2712c",
          600: "#e24d14",
          700: "#bc3a12",
          800: "#952e17",
          900: "#782916",
          950: "#411209",
        },
      },
    },
  },
  plugins: [],
};
