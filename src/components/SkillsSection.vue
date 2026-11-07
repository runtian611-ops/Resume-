<script setup>
import { resume } from '../data/resume.js'
</script>

<template>
  <section id="skills" class="py-20">
    <div class="mx-auto max-w-5xl px-4 sm:px-6">
      <div class="reveal">
        <p class="text-sm font-semibold uppercase tracking-widest text-accent">Skills</p>
        <h2 class="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">技术栈</h2>
        <p class="mt-3 max-w-2xl text-muted">以下为常用的技术能力，按方向分组，不代表熟练度评分。</p>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="(group, i) in resume.skills" :key="group.group" class="reveal card p-6">
          <h3 class="flex items-center gap-2 text-base font-semibold text-ink">
            <span class="flex h-6 w-6 items-center justify-center rounded-md bg-accent-soft text-xs font-bold text-accent">
              {{ i + 1 }}
            </span>
            {{ group.group }}
          </h3>
          <div class="mt-4 flex flex-wrap gap-2">
            <span v-for="item in group.items" :key="item" class="tag">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
