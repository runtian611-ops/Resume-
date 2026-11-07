<script setup>
import { ref } from 'vue'
import { useTheme } from '../composables/useTheme.js'

const { isDark, toggleTheme } = useTheme()
const open = ref(false)

const links = [
  { href: '#about', label: '关于我' },
  { href: '#skills', label: '技术栈' },
  { href: '#experience', label: '经历' },
  { href: '#projects', label: '项目' },
  { href: '#contact', label: '联系' }
]
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
    <nav class="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
      <a href="#hero" class="text-lg font-bold tracking-tight text-ink">
        牛润田<span class="text-accent">.</span>
      </a>

      <!-- 桌面导航 -->
      <div class="hidden items-center gap-1 md:flex">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-accent-soft hover:text-accent"
        >
          {{ l.label }}
        </a>
        <button
          @click="toggleTheme"
          aria-label="切换明暗主题"
          class="ml-2 rounded-lg p-2 text-muted transition-colors hover:bg-accent-soft hover:text-accent"
        >
          <svg v-if="!isDark" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
          <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
        </button>
      </div>

      <!-- 移动端：主题 + 汉堡 -->
      <div class="flex items-center gap-1 md:hidden">
        <button @click="toggleTheme" aria-label="切换明暗主题" class="rounded-lg p-2 text-muted transition-colors hover:text-accent">
          <svg v-if="!isDark" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
          <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
        </button>
        <button @click="open = !open" aria-label="打开导航菜单" class="rounded-lg p-2 text-muted transition-colors hover:text-accent">
          <svg v-if="!open" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- 移动端下拉菜单 -->
    <div v-if="open" class="border-t border-border bg-surface px-4 py-3 md:hidden">
      <a
        v-for="l in links"
        :key="l.href"
        :href="l.href"
        @click="open = false"
        class="block rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-accent-soft hover:text-accent"
      >
        {{ l.label }}
      </a>
    </div>
  </header>
</template>
