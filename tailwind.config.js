/** @type {import('tailwindcss').Config} */

const { heroui } = require("@heroui/react");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#925FFF",
        secondary: "#0070EF",
        accent: "#FFF743",
      },
      spacing: {
        productDetailTabBar: "var(--productDetailTabBarHeight)",
        navbarHeight: "var(--navbarHeight)",
        productDetailRoadMapSidebar: "var(--productDetailRoadMapSidebar)",

        domainNavbar: "var(--domainNavbarHeight)",
        domainSecondaryNavbar: "var(--domainSecondaryNavbarHeight)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          extend: "light",
          colors: {
            danger: "#ff3b2f",
            // background: "#ffffff",
            // foreground: "#191919",
            // // surface1: "rgba(0,0,0,0.06)",
            surface1: "#f0f0f0",
          },
        },
        dark: {
          extend: "dark",
          colors: {
            danger: "#ff453a",
            // background: "#0B0B0B",
            // foreground: "#ffffff",
            // surface1: "rgba(255,255,255,0.04)",
            surface1: "#141414",
          },
        },
      },
      layout: {
        fontSize: {
          small: "0.9375rem",
        },
      },
    }),
  ],
};
