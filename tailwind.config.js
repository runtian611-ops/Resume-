/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 语义化颜色，值来自 style.css 中的 CSS 变量（支持明暗切换）
        bg: 'var(--c-bg)',
        surface: 'var(--c-surface)',
        border: 'var(--c-border)',
        ink: 'var(--c-ink)',
        muted: 'var(--c-muted)',
        accent: 'var(--c-accent)',
        'accent-soft': 'var(--c-accent-soft)',
        'accent-contrast': 'var(--c-accent-contrast)'
      },
      fontFamily: {
        sans: [
          'Inter',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'system-ui',
          'sans-serif'
        ],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.4s ease both'
      }
    }
  },
  plugins: []
}
