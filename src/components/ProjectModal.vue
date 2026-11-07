<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  project: { type: Object, required: true }
})
const emit = defineEmits(['close'])

const loading = ref(true)
const error = ref('')

function onKeydown(e) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.body.style.overflow = 'hidden'
  renderDiagram()
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

// 按需动态加载 mermaid（首屏不加载，打开详情才加载）
async function renderDiagram() {
  const el = document.getElementById('mermaid-render')
  if (!el) return
  loading.value = true
  error.value = ''
  try {
    const mod = await import('mermaid')
    const mermaid = mod.default
    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      flowchart: { useMaxWidth: true }
    })
    const id = 'mm-' + props.project.id + '-' + Date.now()
    const { svg } = await mermaid.render(id, props.project.architecture)
    el.innerHTML = svg
  } catch (e) {
    error.value = '架构图渲染失败：' + (e && e.message ? e.message : '未知错误')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="emit('close')"></div>

      <div class="relative z-10 max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-surface shadow-2xl">
        <!-- 头部 -->
        <div class="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-surface px-6 py-4">
          <div>
            <h3 class="text-xl font-bold text-ink">{{ project.name }}</h3>
            <p class="mt-1 text-sm text-muted">{{ project.role }} · {{ project.period }}</p>
          </div>
          <button
            @click="emit('close')"
            aria-label="关闭"
            class="rounded-lg p-2 text-muted transition-colors hover:bg-accent-soft hover:text-accent"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-8 px-6 py-6">
          <!-- 业务背景 -->
          <section>
            <h4 class="text-base font-semibold text-ink">业务背景</h4>
            <p class="mt-3 leading-relaxed text-muted">{{ project.background }}</p>
          </section>

          <!-- 架构图 -->
          <section>
            <h4 class="text-base font-semibold text-ink">系统架构</h4>
            <div v-if="loading" class="mt-3 flex h-40 items-center justify-center rounded-xl border border-border text-sm text-muted">
              架构图加载中…
            </div>
            <div v-else-if="error" class="mt-3 rounded-xl border border-border bg-accent-soft px-4 py-3 text-sm text-accent">
              {{ error }}
            </div>
            <div v-else class="mt-3 overflow-x-auto rounded-xl border border-border bg-white p-4">
              <div id="mermaid-render" class="mermaid"></div>
            </div>
          </section>

          <!-- 技术难点与解决方案 -->
          <section>
            <h4 class="text-base font-semibold text-ink">技术难点与解决方案</h4>
            <div class="mt-4 space-y-4">
              <div v-for="(h, i) in project.highlights" :key="i" class="rounded-xl border border-border p-4">
                <p class="font-semibold text-ink">
                  <span class="mr-1 text-accent">{{ i + 1 }}.</span>{{ h.title }}
                </p>
                <p class="mt-2 text-sm leading-relaxed text-muted">
                  <span class="font-medium text-ink">解决方案：</span>{{ h.solution }}
                </p>
                <p class="mt-2 text-sm leading-relaxed text-muted">
                  <span class="font-medium text-ink">成果：</span>{{ h.result }}
                </p>
              </div>
            </div>
          </section>

          <!-- 技术栈 -->
          <section>
            <h4 class="text-base font-semibold text-ink">技术栈</h4>
            <div class="mt-3 flex flex-wrap gap-2">
              <span v-for="t in project.tags" :key="t" class="tag">{{ t }}</span>
            </div>
          </section>

          <!-- 链接 -->
          <section v-if="project.links.source" class="border-t border-border pt-6">
            <a :href="project.links.source" target="_blank" rel="noopener" class="btn-secondary">
              查看源码（{{ project.links.sourceLabel }}）
            </a>
          </section>
        </div>
      </div>
    </div>
  </Teleport>
</template>
