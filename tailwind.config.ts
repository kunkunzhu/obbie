/** @format */

import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--off-white)",
        primary: "var(--off-black)",
        secondary: "var(--grey)",
        warning: "var(--warning)",
      },
      fontFamily: {
        text: ['"Outfit"', ...defaultTheme.fontFamily.sans],
        title: ['"Anybody"', ...defaultTheme.fontFamily.sans],
      },
      dropShadow: {
        entry: "2px 2px 10px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;
