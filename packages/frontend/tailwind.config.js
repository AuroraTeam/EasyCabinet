/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'sm': {'max': '550px'},
      // => @media (max-width: 550px) { ... }
    },
    extend: {},
  },
  plugins: [
    function({ addVariant }) {
      addVariant('yes-hover', '@media (hover)');
    },
    function({ addVariant }) {
      addVariant('no-hover', '@media (hover: none)');
    },
  ],
};

