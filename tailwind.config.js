/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Fond papier (light) / encre (dark)
        paper: {
          DEFAULT: '#F5F6F1',
          soft: '#ECEEE6',
        },
        ink: {
          DEFAULT: '#14141F',
          soft: '#1D1E2C',
          card: '#24263A',
        },
        // Rouge laque — accent primaire (hanko / lanterne)
        lacquer: {
          50: '#FDECEA',
          100: '#FBD3CE',
          300: '#F19286',
          500: '#E8483C',
          600: '#D02F24',
          700: '#A9241B',
        },
        // Jade — accent secondaire (validation, réussite)
        jade: {
          100: '#D9F0E6',
          300: '#8FD4B8',
          500: '#2F9E7A',
          600: '#227E61',
        },
        // Or — XP, récompenses
        gold: {
          300: '#F6D77A',
          500: '#F2B705',
          600: '#C99400',
        },
        // Indigo — accents froids, liens, focus
        indigo: {
          300: '#9AA3E8',
          500: '#4E5BC6',
          600: '#3B458F',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        card: '0 8px 30px -12px rgba(20, 20, 31, 0.25)',
        cardDark: '0 8px 30px -10px rgba(0, 0, 0, 0.55)',
      },
      keyframes: {
        blink: {
          '0%, 90%, 100%': { transform: 'scaleY(1)' },
          '95%': { transform: 'scaleY(0.1)' },
        },
        breathe: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
      },
      animation: {
        blink: 'blink 4.5s infinite',
        breathe: 'breathe 3.2s ease-in-out infinite',
        floatSlow: 'floatSlow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
