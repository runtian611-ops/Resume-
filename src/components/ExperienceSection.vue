<script setup>
import { resume } from '../data/resume.js'
</script>

<template>
  <section id="experience" class="py-20">
    <div class="mx-auto max-w-5xl px-4 sm:px-6">
      <div class="reveal">
        <p class="text-sm font-semibold uppercase tracking-widest text-accent">Experience</p>
        <h2 class="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">实习与教育经历</h2>
      </div>

      <div class="reveal mt-10">
        <ol class="relative space-y-8 border-l border-border pl-6">
          <!-- 教育 -->
          <li class="relative">
            <span class="absolute -left-[31px] top-1 flex h-3 w-3 items-center justify-center rounded-full bg-accent"></span>
            <div class="card p-5">
              <div class="flex flex-wrap items-baseline justify-between gap-2">
                <h3 class="text-lg font-semibold text-ink">{{ resume.education.school }}</h3>
                <span class="text-sm text-muted">{{ resume.education.period }}</span>
              </div>
              <p class="mt-1 text-sm text-muted">{{ resume.education.major }} · {{ resume.education.degree }}</p>
              <p class="mt-3 text-sm leading-relaxed text-muted">
                主修课程：{{ resume.education.courses.join('、') }}
              </p>
            </div>
          </li>

          <!-- 实习 -->
          <li v-for="exp in resume.experience" :key="exp.company" class="relative">
            <span class="absolute -left-[31px] top-1 flex h-3 w-3 items-center justify-center rounded-full border-2 border-accent bg-surface"></span>
            <div class="card p-5">
              <div class="flex flex-wrap items-baseline justify-between gap-2">
                <h3 class="text-lg font-semibold text-ink">{{ exp.company }}</h3>
                <span class="text-sm text-muted">{{ exp.period }}</span>
              </div>
              <p class="mt-1 text-sm text-accent">{{ exp.role }}</p>
              <p v-if="exp.desc" class="mt-3 text-sm leading-relaxed text-muted">{{ exp.desc }}</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
