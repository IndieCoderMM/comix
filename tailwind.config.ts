import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        nunito: ["var(--font-nunito-sans)"],
      },
      fontSize: {
        h1: ["56px", { lineHeight: "130%", fontWeight: "700" }],
        h2: ["48px", { lineHeight: "130%", fontWeight: "600" }],
        h3: ["44px", { lineHeight: "140%", fontWeight: "600" }],
        h4: ["36px", { lineHeight: "140%", fontWeight: "600" }],
        h5: ["24px", { lineHeight: "160%", fontWeight: "600" }],
        body1: ["20px", { lineHeight: "180%", fontWeight: "400" }],
        body2: ["20px", { lineHeight: "180%", fontWeight: "600" }],
        body3: ["18px", { lineHeight: "180%", fontWeight: "400" }],
        body4: ["18px", { lineHeight: "180%", fontWeight: "600" }],
      },
      colors: {
        primary: "#8976fd",
        secondary: "#6dedc3",
        "dark-gray": "#332c5c",
        "purple-gray": "#494369",
        "mid-gray": "#5e587a",
        info: "#2f80ed",
        success: "#27ae60",
        warning: "#e2b93b",
        danger: "#eb5757",
      },
    },
  },
  plugins: [],
} satisfies Config;
