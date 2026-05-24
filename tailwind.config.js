/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kingdom': {
          'gold': '#FFD700',
          'dark': '#0F0F0F',
          'darker': '#050505',
          'card': '#1A1A1A',
          'border': '#2A2A2A',
          'accent': '#FFA500',
          'success': '#00D084',
          'danger': '#FF4757',
        }
      },
      backgroundImage: {
        'gradient-kingdom': 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1A1A1A 0%, #0F0F0F 100%)',
      },
      animation: {
        'pulse-gold': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px #FFD700, 0 0 10px #FFD700' },
          '50%': { boxShadow: '0 0 20px #FFD700, 0 0 30px #FFD700' },
        },
      },
      boxShadow: {
        'kingdom': '0 0 20px rgba(255, 215, 0, 0.3)',
        'kingdom-lg': '0 0 40px rgba(255, 215, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
