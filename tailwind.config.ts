import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', '"DM Mono"', 'monospace'],
      },
      colors: {
        brand: {
          navy: 'var(--brand-navy)',
          teal: 'var(--brand-teal)',
          'teal-light': 'var(--brand-teal-light)',
        },
        dog: {
          primary: 'var(--dog-primary)',
          'primary-dark': 'var(--dog-primary-dark)',
          'primary-light': 'var(--dog-primary-light)',
          accent: 'var(--dog-accent)',
          surface: 'var(--dog-surface)',
        },
        cat: {
          primary: 'var(--cat-primary)',
          'primary-dark': 'var(--cat-primary-dark)',
          'primary-light': 'var(--cat-primary-light)',
          accent: 'var(--cat-accent)',
          surface: 'var(--cat-surface)',
        },
        status: {
          safe: 'var(--status-safe)',
          'safe-bg': 'var(--status-safe-bg)',
          caution: 'var(--status-caution)',
          'caution-bg': 'var(--status-caution-bg)',
          toxic: 'var(--status-toxic)',
          'toxic-bg': 'var(--status-toxic-bg)',
          info: 'var(--status-info)',
          'info-bg': 'var(--status-info-bg)',
        },
      },
    },
  },
  plugins: [],
};

export default config;
