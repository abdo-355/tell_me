/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      screens: {
        xsm: "300px",
        // tablet portrait mode compatibility
        tall: { raw: "(min-height: 920px) and (max-width: 900px)" },
      },
    },
  },
  plugins: [],
};
