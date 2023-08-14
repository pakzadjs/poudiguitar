const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/common/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-vazir)", ...fontFamily.sans],
      },
      container: {
        center: true,
      },
      boxShadow: {
        "input-focus": "0 12px 24px -8px rgb(183, 197, 255)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
