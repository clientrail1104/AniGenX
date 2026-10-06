import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          950: "#070708",
          900: "#0B0B0C",
          850: "#101114",
          800: "#15171A",
          750: "#1A1D21"
        },
        electric: "#00E5FF",
        nitro: "#B8FF2C",
        ember: "#FF5A1F",
        magenta: "#FF2EC4"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Arial Narrow", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        neon: "0 0 40px rgba(0,229,255,.18)",
        "neon-green": "0 0 40px rgba(184,255,44,.14)",
        panel: "0 22px 70px rgba(0,0,0,.42)"
      },
      backgroundImage: {
        "carbon-grid":
          "linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)"
      },
      animation: {
        scan: "scan 3.2s linear infinite",
        pulseGlow: "pulseGlow 2.2s ease-in-out infinite",
        drift: "drift 8s ease-in-out infinite"
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-120%)" },
          "100%": { transform: "translateY(520%)" }
        },
        pulseGlow: {
          "0%,100%": { opacity: "0.45" },
          "50%": { opacity: "1" }
        },
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(22px,-12px,0)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
