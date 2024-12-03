/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html", 
      "./src/**/*.{js,ts,jsx,tsx}", 
    ],
    theme: {
      extend: {
        animation: {
          
          'bounce-arrow': 'bounce 1s ease-in-out infinite',
          'custom-spin': 'spin 2s linear infinite',
        },
        keyframes: {
          bounce: {
            '0%, 100%': {
              transform: 'translateY(0)', 
            },
            '50%': {
              transform: 'translateY(-10px)', 
            },
          },
          spin: {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' }, 
          },
        },
      },
    },
    plugins: [],
  }
  