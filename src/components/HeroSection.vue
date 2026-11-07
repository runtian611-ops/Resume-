<script setup>
import { resume } from '../data/resume.js'

const b = resume.basics
</script>

<template>
  <section id="hero" class="flex min-h-screen items-center pt-16">
    <div class="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <div class="reveal">
        <p class="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted">
          <span class="h-2 w-2 rounded-full bg-accent"></span>
          应届本科 · 欢迎访问我的简历
        </p>

        <h1 class="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-5xl md:text-6xl">
          {{ b.name }}
        </h1>
        <p class="mt-3 text-xl font-semibold text-accent sm:text-2xl">{{ b.title }}</p>
        <p class="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{{ b.tagline }}</p>

        <div class="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          <span>📍 {{ b.location }}</span>
          <span>🎓 {{ b.educationShort }}</span>
        </div>

        <div class="mt-8 flex flex-wrap items-center gap-3">
          <a :href="b.resumePdf" download="牛润田-简历.pdf" class="btn-primary">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            下载简历 PDF
          </a>
          <a href="#projects" class="btn-secondary">查看项目</a>
        </div>

        <div class="mt-8 flex items-center gap-3">
          <a :href="b.github" target="_blank" rel="noopener" aria-label="GitHub" class="rounded-lg p-2 text-muted transition-colors hover:bg-accent-soft hover:text-accent">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          <a :href="b.gitee" target="_blank" rel="noopener" aria-label="Gitee" class="rounded-lg p-2 text-muted transition-colors hover:bg-accent-soft hover:text-accent">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
            </svg>
          </a>
          <a :href="'mailto:' + b.email" aria-label="邮箱" class="rounded-lg p-2 text-muted transition-colors hover:bg-accent-soft hover:text-accent">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </a>
          <a :href="'tel:' + b.phone" aria-label="电话" class="rounded-lg p-2 text-muted transition-colors hover:bg-accent-soft hover:text-accent">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
