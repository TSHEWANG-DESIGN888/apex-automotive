/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'apex-black': '#0c0c0c',
        'apex-surface': '#141414',
        'apex-border': 'rgba(255,255,255,0.08)',
        'apex-white': '#f0ede8',
        'apex-muted': 'rgba(240,237,232,0.55)',
        'apex-gold': '#c9a96e',
        'apex-gold-hover': '#e2c48a',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest-2': '0.2em',
        'widest-3': '0.3em',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth-out': 'cubic-bezier(0.7, 0, 1, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '800': '800ms',
        '1000': '1000ms',
        '1200': '1200ms',
      },
    },
  },
  plugins: [],
};
