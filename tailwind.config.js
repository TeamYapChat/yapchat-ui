import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        "off-white": "#FAF9F6",
        "primary-electri-blue": "#3B82F6",
        "primary-royal-purple": "#6D28D9",
        "primary-hot-pink": "#EC4899",

        "secondary-lavender": "#A78BFA",
        "secondary-peach-pink": "#FBCFE8",

        "dark-text": "#111827",
        "light-text": "#E5E7EB",
      },
      animation: {
        "fade-in": "fadeIn 0.75s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "fade-up": "fadeUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(50px)" },
          "100%": { transform: "translateY(0)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(50px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  daisyui: {
		themes: ["light"]
 },
  plugins: [daisyui],
};
