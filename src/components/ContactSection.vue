<script setup>
import { resume } from '../data/resume.js'

const c = resume.contact

const items = [
  {
    label: '邮箱',
    value: c.email,
    href: 'mailto:' + c.email,
    icon: 'mail'
  },
  {
    label: '电话',
    value: c.phone,
    href: 'tel:' + c.phone,
    icon: 'phone'
  },
  {
    label: 'GitHub',
    value: c.github.replace('https://', ''),
    href: c.github,
    icon: 'github'
  },
  {
    label: 'Gitee',
    value: c.gitee.replace('https://', ''),
    href: c.gitee,
    icon: 'gitee'
  }
]
</script>

<template>
  <section id="contact" class="py-20">
    <div class="mx-auto max-w-5xl px-4 sm:px-6">
      <div class="reveal">
        <p class="text-sm font-semibold uppercase tracking-widest text-accent">Contact</p>
        <h2 class="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">联系我</h2>
        <p class="mt-3 max-w-2xl text-muted">欢迎通过以下方式与我联系，期待与您交流。</p>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <a
          v-for="item in items"
          :key="item.label"
          :href="item.href"
          target="_blank"
          rel="noopener"
          class="reveal card flex items-center gap-3 p-5 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg"
        >
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <!-- 邮箱 -->
            <svg v-if="item.icon === 'mail'" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            <!-- 电话 -->
            <svg v-else-if="item.icon === 'phone'" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            <!-- GitHub -->
            <svg v-else-if="item.icon === 'github'" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            <!-- Gitee -->
            <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
            </svg>
          </span>
          <span class="min-w-0">
            <span class="block text-xs text-muted">{{ item.label }}</span>
            <span class="block truncate text-sm font-medium text-ink">{{ item.value }}</span>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>
