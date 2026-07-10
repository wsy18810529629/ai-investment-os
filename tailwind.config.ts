import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        ai: "hsl(var(--ai))",
        "ai-foreground": "hsl(var(--ai-foreground))",
        "ai-soft": "hsl(var(--ai-soft))",
        positive: "hsl(var(--positive))",
        "positive-soft": "hsl(var(--positive-soft))",
        negative: "hsl(var(--negative))",
        "negative-soft": "hsl(var(--negative-soft))",
        warning: "hsl(var(--warning))",
        "warning-soft": "hsl(var(--warning-soft))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        calm: "0 18px 46px rgba(16, 24, 40, 0.085)",
        "calm-sm": "0 8px 24px rgba(16, 24, 40, 0.065)",
        "dark-calm": "0 22px 56px rgba(0, 0, 0, 0.36)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "SF Pro Text",
          "PingFang SC",
          "Microsoft YaHei",
          "Noto Sans SC",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
