/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },

  // daisyUI config (optional)
  daisyui: {
    // https://share.frontender.app/RY4WmZJ05
    themes: [
      {
        mydark: {
          // primary: "#7bb05cff",
          // primary: "#afce94ff",
          primary: "#5bb081ff",
          secondary: "#748484ff",
          accent: "#fcfdfeff",
          // neutral: "#0d1217",
          neutral: "#202b36ff",
          // "base-100": "#39224aff",
          "base-100": "#131a21ff",
          info: "#6e9acbff",
          success: "#8cd18cff",
          warning: "#f0c352ff",
          error: "#b00d34ff",
        },
        mylight: {
          primary: "#18171cff",
          secondary: "#243a75ff",
          accent: "#a45504ff",
          // neutral: "#0d1217",
          neutral: "#cfd3cdff",
          // "base-100": "#39224aff",
          "base-100": "#efdee3ff",
          info: "#5930b9ff",
          success: "#36a840ff",
          warning: "#8dcf15ff",
          error: "#db6f3bff",
        },
      },
      // "light",
    ],

    // styled: true,
    // themes: true,
    // base: true,
    // utils: true,
    // logs: true,
    // rtl: false,
    // prefix: "",
    darkTheme: "mydark",
    lightTheme: "mylight",
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("daisyui"),
  ],
};
