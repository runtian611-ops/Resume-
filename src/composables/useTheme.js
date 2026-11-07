import { ref, watchEffect } from 'vue'

// 读取主题：优先 localStorage 记忆，其次跟随系统偏好
function readInitialTheme() {
  try {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || stored === 'light') return stored
  } catch (e) {
    /* 忽略无权限访问 localStorage 的情况 */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const theme = ref(readInitialTheme())
const isDark = ref(theme.value === 'dark')

watchEffect(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
})

export function useTheme() {
  function toggleTheme() {
    isDark.value = !isDark.value
    theme.value = isDark.value ? 'dark' : 'light'
    try {
      localStorage.setItem('theme', theme.value)
    } catch (e) {
      /* 忽略存储失败 */
    }
  }

  return { isDark, toggleTheme }
}
