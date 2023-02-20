/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  // daisyUI config (optional)
  daisyui: {
    // https://share.frontender.app/RY4WmZJ05
    "mytheme-dark": {
      primary: "#837feeff",
      secondary: "#e4dedeff",
      accent: "#c71265ff",
      neutral: "#39224aff",
      "base-100": "#0d1217",
      info: "#6e9acbff",
      success: "#8cd18cff",
      warning: "#f0c352ff",
      error: "#b00d34ff",
    },

    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "mytheme-dark",
  },
};
