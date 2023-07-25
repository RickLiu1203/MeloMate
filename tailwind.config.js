/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'dark': '0 0 20px -10px rgb(74, 222, 128)',
      }
    },
    screens: {
      'xs': '400px',

      'sm': '500px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        slider: {
          "primary": "#4ade80",
          "secondary": "#f6d860",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
        },
      }
    ],
  },
}

