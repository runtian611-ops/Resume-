<script setup>
const props = defineProps({
  project: { type: Object, required: true }
})
const emit = defineEmits(['open'])

function open() {
  emit('open', props.project)
}

function onKeydown(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    open()
  }
}
</script>

<template>
  <article
    role="button"
    tabindex="0"
    @click="open"
    @keydown="onKeydown"
    class="group card flex h-full cursor-pointer flex-col overflow-hidden transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
  >
    <!-- 封面：暂无真实截图，使用占位视觉，不编造截图 -->
    <div class="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-accent/15 to-accent-soft">
      <span class="px-4 text-center text-lg font-bold text-accent">{{ project.name }}</span>
      <span class="absolute bottom-2 right-3 text-xs text-muted">项目截图待补充</span>
    </div>

    <div class="flex flex-1 flex-col p-5">
      <div class="flex flex-wrap items-baseline justify-between gap-2">
        <h3 class="text-lg font-bold text-ink transition-colors group-hover:text-accent">{{ project.name }}</h3>
        <span class="text-xs text-muted">{{ project.period }}</span>
      </div>
      <p class="mt-2 text-sm leading-relaxed text-muted line-clamp-3">{{ project.tagline }}</p>

      <div class="mt-4 mb-4 flex flex-wrap gap-2">
        <span v-for="t in project.tags.slice(0, 6)" :key="t" class="tag">{{ t }}</span>
        <span v-if="project.tags.length > 6" class="text-xs text-muted">+{{ project.tags.length - 6 }}</span>
      </div>

      <div class="mt-auto flex items-center justify-between border-t border-border pt-4">
        <a
          v-if="project.links.source"
          :href="project.links.source"
          target="_blank"
          rel="noopener"
          @click.stop
          class="text-sm font-medium text-accent hover:underline"
        >
          {{ project.links.sourceLabel }}
        </a>
        <span v-else class="text-xs text-muted">源码暂未公开</span>
        <span class="inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors group-hover:text-accent">
          查看详情
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </div>
  </article>
</template>
