import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-poppins)"],
        body: ["var(--font-nunito-sans)"],
      },
      fontSize: {
        h1: [
          "56px",
          {
            lineHeight: "130%",
            fontWeight: "700",
          },
        ],
        h2: [
          "48px",
          {
            lineHeight: "130%",
            fontWeight: "600",
          },
        ],
        h3: [
          "44px",
          {
            lineHeight: "140%",
            fontWeight: "600",
          },
        ],
        h4: [
          "36px",
          {
            lineHeight: "140%",
            fontWeight: "600",
          },
        ],
        h5: [
          "24px",
          {
            lineHeight: "160%",
            fontWeight: "600",
          },
        ],
        h6: [
          "20px",
          {
            lineHeight: "180%",
            fontWeight: "600",
          },
        ],
        body1: [
          "20px",
          {
            lineHeight: "180%",
            fontWeight: "400",
          },
        ],
        body2: [
          "20px",
          {
            lineHeight: "180%",
            fontWeight: "600",
          },
        ],
        body3: [
          "18px",
          {
            lineHeight: "180%",
            fontWeight: "400",
          },
        ],
        body4: [
          "18px",
          {
            lineHeight: "180%",
            fontWeight: "600",
          },
        ],
        caption: [
          "16px",
          {
            lineHeight: "180%",
            fontWeight: "400",
          },
        ],
      },
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        dark: "#1f1d2b",
        "dark-gray": "#332c5c",
        "purple-gray": "#494369",
        "mid-gray": "#5e587a",
        info: "hsl(var(--info))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        danger: "hsl(var(--danger))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
