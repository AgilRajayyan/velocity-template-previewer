/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@spartan-ng/ui-core/hlm-tailwind-preset")],
  content: ["./src/**/*.{html,ts}", "./spartan-ng-components/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        "lg-max": { max: "1024px" },
        "md-max": { max: "768px" },
      },
    },
  },
  plugins: [],
};
