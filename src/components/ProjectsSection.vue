<script setup>
import { ref } from 'vue'
import { resume } from '../data/resume.js'
import ProjectCard from './ProjectCard.vue'
import ProjectModal from './ProjectModal.vue'

const active = ref(null)

function openProject(project) {
  active.value = project
}
</script>

<template>
  <section id="projects" class="py-20">
    <div class="mx-auto max-w-5xl px-4 sm:px-6">
      <div class="reveal">
        <p class="text-sm font-semibold uppercase tracking-widest text-accent">Projects</p>
        <h2 class="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">项目作品集</h2>
        <p class="mt-3 max-w-2xl text-muted">参与过的真实项目，点击卡片查看业务背景、系统架构与实现细节。</p>
      </div>

      <div class="reveal mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <ProjectCard
          v-for="p in resume.projects"
          :key="p.id"
          :project="p"
          @open="openProject"
        />
      </div>
    </div>

    <ProjectModal v-if="active" :project="active" @close="active = null" />
  </section>
</template>
