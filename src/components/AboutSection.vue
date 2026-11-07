<script setup>
import { resume } from '../data/resume.js'
</script>

<template>
  <section id="about" class="py-20">
    <div class="mx-auto max-w-5xl px-4 sm:px-6">
      <div class="reveal">
        <p class="text-sm font-semibold uppercase tracking-widest text-accent">About</p>
        <h2 class="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">关于我</h2>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <!-- 简介 -->
        <div class="reveal card p-6 lg:col-span-2">
          <h3 class="text-lg font-semibold text-ink">个人简介</h3>
          <p class="mt-3 leading-relaxed text-muted">{{ resume.about.intro }}</p>
          <div class="mt-5 rounded-xl bg-accent-soft px-4 py-3">
            <p class="font-medium text-accent">{{ resume.about.objective }}</p>
          </div>
        </div>

        <!-- 教育 -->
        <div class="reveal card p-6">
          <h3 class="text-lg font-semibold text-ink">教育背景</h3>
          <p class="mt-3 font-medium text-ink">{{ resume.education.school }}</p>
          <p class="mt-1 text-sm text-muted">{{ resume.education.major }} · {{ resume.education.degree }}</p>
          <p class="mt-1 text-sm text-muted">{{ resume.education.period }}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span v-for="c in resume.education.courses" :key="c" class="tag">{{ c }}</span>
          </div>
        </div>
      </div>

      <!-- 荣誉 -->
      <div class="reveal mt-6 card p-6">
        <h3 class="text-lg font-semibold text-ink">在校荣誉</h3>
        <ul class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <li v-for="h in resume.honors" :key="h" class="flex items-start gap-2 text-muted">
            <span class="mt-1 text-accent">◆</span>
            <span>{{ h }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
