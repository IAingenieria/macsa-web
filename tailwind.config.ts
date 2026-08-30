import type { Config } from 'tailwindcss'

/**
 * Sistema de diseño MACSA Foodservice.
 *
 * ⭐ El azul NO es una elección de diseño: es el color de marca, medido del
 * logotipo oficial que mandó Jorge (MACSA_LOGO_COLOR_RGB). El logo es
 * monocromo, un solo tono: #002C49 · rgb(0, 44, 73). Toda la escala navy
 * se construye alrededor de ese valor y `navy.DEFAULT` es el color exacto.
 *
 * El ámbar (`fry`) SÍ es elección nuestra: el logo no trae segundo color, y
 * un acento cálido era necesario para los llamados a la acción. Si el manual
 * de identidad de MACSA define un secundario, ese manda sobre éste.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#002C49', // ← color oficial del logotipo MACSA
          900: '#001B2E',
          800: '#002C49',
          700: '#013D63',
          600: '#0A527E',
          500: '#16679A',
        },
        hielo: {
          DEFAULT: '#D2E2EC',
          50: '#F1F6FA',
          100: '#E3EDF4',
          200: '#D2E2EC',
          300: '#B4CCDD',
          400: '#85A7C1',
        },
        fry: {
          DEFAULT: '#E8A33D',
          600: '#C77E1B',
          700: '#A66512',
          100: '#FCF1DE',
        },
        ruta: '#2F7D5B',
        humo: {
          DEFAULT: '#4A5F6E',
          900: '#0A1822',
          700: '#2F4351',
          500: '#4A5F6E',
          400: '#6E8493',
          300: '#9EB2BF',
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
        panel: '0 1px 2px rgba(0,44,73,.06), 0 8px 24px -12px rgba(0,44,73,.18)',
      },
    },
  },
  plugins: [],
}

export default config
