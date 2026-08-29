import type { Config } from 'tailwindcss'

/**
 * Sistema de diseño MACSA Foodservice.
 * La paleta cuenta el recorrido del producto: congelador (azules de acero)
 * → andén → freidora (el ámbar). Un solo acento cálido, todo lo demás frío.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0E2438',
          900: '#081726',
          800: '#0E2438',
          700: '#163449',
          600: '#1E4666',
          500: '#2C5D84',
        },
        hielo: {
          DEFAULT: '#DCE9F2',
          50: '#F4F8FB',
          100: '#E8F0F6',
          200: '#DCE9F2',
          300: '#BFD4E4',
          400: '#94B2C9',
        },
        fry: {
          DEFAULT: '#E8A33D',
          600: '#C77E1B',
          700: '#A66512',
          100: '#FCF1DE',
        },
        ruta: '#2F7D5B',
        humo: {
          DEFAULT: '#4A5C6B',
          900: '#0E1A24',
          700: '#33454F',
          500: '#4A5C6B',
          400: '#6E818F',
          300: '#9FB0BC',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        prosa: '68ch',
      },
      boxShadow: {
        panel: '0 1px 2px rgba(14,36,56,.06), 0 8px 24px -12px rgba(14,36,56,.18)',
      },
    },
  },
  plugins: [],
}

export default config
