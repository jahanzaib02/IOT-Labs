/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  // tailwind.config.js
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        keyframes: {
          'fade-in-up': {
            '0%': { opacity: 0, transform: 'translateY(20px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
        },
        animation: {
          'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
          'fade-in-up-delay-1': 'fade-in-up 0.8s ease-out forwards 0.3s',
          'fade-in-up-delay-2': 'fade-in-up 0.8s ease-out forwards 0.6s',
        },
      },
    },
    plugins: [],
  };
