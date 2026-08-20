import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Fondo base de página: azul oscuro tecnológico.
        surface: "#081526",
        // Fondo alterno para secciones (levemente más claro que "surface").
        "surface-soft": "#0E2138",
        // Fondo de tarjetas/inputs: se despega de surface/surface-soft.
        panel: "#122A46",
        // Extra oscuro para header/footer/hero de alto contraste.
        deep: "#040B15",
        cyan: {
          DEFAULT: "#22D7D2",
          50: "#E5FBFA",
        },
        violet: {
          DEFAULT: "#924AD8",
          50: "#F5EDFF",
        },
        magenta: {
          DEFAULT: "#EB4DC1",
        },
        lime: {
          DEFAULT: "#B6F338",
        },
        amber: "#FFB342",
        danger: {
          DEFAULT: "#FF4D4F",
          50: "#FFF1F0",
        },
        // Color de texto/ícono sobre fondos claros puntuales (chips blancos,
        // miniaturas de producto), donde "ink" ya no sirve porque ahora es claro.
        ink: {
          DEFAULT: "#F1F7FB",
          soft: "#B9CBDA",
          faint: "#88A0B4",
        },
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 18px rgba(0, 0, 0, 0.35)",
        card: "0 14px 34px rgba(0, 0, 0, 0.45)",
        lift: "0 20px 46px rgba(146, 74, 216, 0.35)",
        glow: "0 0 0 1px rgba(34,215,210,0.25), 0 0 32px rgba(34,215,210,0.18)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #22D7D2 0%, #924AD8 52%, #EB4DC1 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgba(34,215,210,0.12) 0%, rgba(146,74,216,0.12) 58%, rgba(235,77,193,0.1) 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
