import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050506',
        foreground: '#ededed',
        surface: {
          50: '#1a1a22',
          100: '#141419',
          200: '#0f0f13',
          300: '#0a0a0c',
          400: '#050506',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
      },
      boxShadow: {
        'inset-hairline': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
        'inset-subtle': 'inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'glow-sm': '0 0 20px -5px rgba(255, 255, 255, 0.1)',
        'glow-cyan': '0 0 30px -5px rgba(6, 182, 212, 0.15)',
        'glow-indigo': '0 0 30px -5px rgba(99, 102, 241, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
