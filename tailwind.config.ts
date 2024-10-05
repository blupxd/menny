import type { Config } from "tailwindcss";
import { themes } from "./constants";
const colorClasses = themes.flatMap((theme) => [
  theme.primary,
  theme.secondary,
  theme.background,
  theme.text,
]);

const config: Config = {
  mode: "jit",
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [...colorClasses.map((color) => `${color}`)],
  theme: {
    extend: {
      colors: {
        candy: {
          primary: "#de336c", // Matches themes candy
          secondary: "#ffee6e", // Matches themes candy
          light: "#ff8da3", // Lighter shade for candy
          dark: "#b62b58", // Darker shade for candy
        },
        aquamarine: {
          primary: "#338270", // Matches themes aquamarine
          secondary: "#8ad4c3", // Matches themes aquamarine
          light: "#4cd3c1", // Lighter shade for aquamarine
          dark: "#1e4d4b", // Darker shade for aquamarine
        },
        lighting: {
          primary: "#f79d1e", // Matches themes lighting
          secondary: "#121212", // Matches themes lighting
          light: "#f9b77b", // Lighter shade for lighting
          dark: "#c47d14", // Darker shade for lighting
        },
        gravestone: {
          primary: "#2B2D42", // Matches themes gravestone
          secondary: "#8D99AE", // Matches themes gravestone
          light: "#4B4E66", // Lighter shade for gravestone
          dark: "#1f202f", // Darker shade for gravestone
        },
        candycane: {
          primary: "#261718", // Matches themes candycane
          secondary: "#d11746", // Matches themes candycane
          light: "#3a1d1d", // Lighter shade for candycane
          dark: "#1a0d0d", // Darker shade for candycane
        },
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
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
