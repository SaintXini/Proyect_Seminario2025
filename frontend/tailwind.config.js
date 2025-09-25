/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        drawPath: {
          'to': { strokeDashoffset: '0' }
        },
        fadeInCube: {
          'to': { opacity: '1' }
        },
        fadeInText: {
          'to': { opacity: '1' }
        },
        slideUp: {
          'from': { transform: 'translateY(50px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' }
        },
        fadeOut: {
          'to': { opacity: '0', visibility: 'hidden' }
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        'draw-path': 'drawPath 1.5s ease-in-out forwards',
        'fade-in-cube': 'fadeInCube 0.8s ease-out 0.8s forwards',
        'fade-in-text': 'fadeInText 0.8s ease-out forwards',
        'slide-up': 'slideUp 1s ease-out',
        'fade-out': 'fadeOut 0.8s ease-in-out 2.2s forwards',
        'scroll': 'scroll 30s linear infinite',
        'fade-in': 'fadeInText 0.8s ease-out forwards',
        'fade-in-delayed': 'fadeInText 0.8s ease-out 0.4s forwards',
        'slide-up-main': 'slideUp 0.8s ease-out forwards',
        'slide-up-delayed': 'slideUp 0.8s ease-out 0.2s forwards'
      },
      dropShadow: {
        'glow-blue': '0 0 8px rgba(59, 130, 246, 0.4)',
        'glow': '0 0 8px rgba(168, 85, 247, 0.4)'
      },
      boxShadow: {
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
      }
    },
  },
  plugins: [],
}