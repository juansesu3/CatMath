import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        myFont: ['ExplorerFree-Regular', 'sans-serif'],
      },
      colors: {
        'primary': '#68d5c0',
        'secondary': '#5f253d',
      },

      // ... otros ajustes del tema
    },
  },
  plugins: [],
}
export default config
