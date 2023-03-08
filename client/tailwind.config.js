/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        // facebook blue theme color
        "fb-blue": "#1877f2",
        "fb-blue-darker": "#0c63b8",
      },
      screens: {
        xsm: "300px",
        // tablet portrait mode compatibility
        tall: { raw: "(min-height: 920px) and (max-width: 900px)" },
        // short screen compatibility
        hsm: { raw: "(max-height: 741px) and (max-width: 640px)" },
      },
    },
  },
  plugins: [],
};
