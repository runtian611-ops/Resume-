<script setup>
// 轻量粒子网络背景：无第三方依赖，克制、低密度、随主题变色，尊重系统“减少动态”偏好。
import { onMounted, onBeforeUnmount, ref } from 'vue'

const canvasRef = ref(null)

let ctx = null
let rafId = 0
let particles = []
let w = 0
let h = 0
let accentRgb = '96,165,250' // 默认蓝色，初始化后按主题变量读取
let observer = null

const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function parseRgb(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec((hex || '').trim())
  if (!m) return '96,165,250'
  const n = parseInt(m[1], 16)
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`
}

function readAccent() {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--c-accent')
  accentRgb = parseRgb(v)
}

function layout() {
  const canvas = canvasRef.value
  if (!canvas) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const rect = canvas.parentElement.getBoundingClientRect()
  w = rect.width
  h = rect.height
  canvas.width = Math.round(w * dpr)
  canvas.height = Math.round(h * dpr)
  canvas.style.width = w + 'px'
  canvas.style.height = h + 'px'
  ctx = canvas.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  // 低密度：面积越大粒子越多，但封顶 80，避免喧宾夺主
  const count = Math.min(80, Math.max(30, Math.floor((w * h) / 24000)))
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: 0.6 + Math.random() * 1.1
  }))
}

function draw() {
  if (!ctx) return
  ctx.clearRect(0, 0, w, h)

  // 邻近连线：越近越明显，整体保持很低的透明度
  for (let i = 0; i < particles.length; i++) {
    const a = particles[i]
    for (let j = i + 1; j < particles.length; j++) {
      const b = particles[j]
      const dx = a.x - b.x
      const dy = a.y - b.y
      const d = Math.hypot(dx, dy)
      if (d < 130) {
        ctx.strokeStyle = `rgba(${accentRgb},${((1 - d / 130) * 0.15).toFixed(3)})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
    }
  }

  // 圆点
  ctx.fillStyle = `rgba(${accentRgb},0.5)`
  for (const p of particles) {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fill()
  }
}

function animate() {
  for (const p of particles) {
    p.x += p.vx
    p.y += p.vy
    if (p.x < -12) p.x = w + 12
    else if (p.x > w + 12) p.x = -12
    if (p.y < -12) p.y = h + 12
    else if (p.y > h + 12) p.y = -12
  }
  draw()
  rafId = requestAnimationFrame(animate)
}

function onResize() {
  layout()
  if (reduceMotion) draw()
}

onMounted(() => {
  layout()
  readAccent()
  // 监听 html.dark 类切换，主题变化时更新粒子颜色
  observer = new MutationObserver(readAccent)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  window.addEventListener('resize', onResize)
  if (reduceMotion) {
    draw() // 静态一帧，不做动画
  } else {
    rafId = requestAnimationFrame(animate)
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', onResize)
  if (observer) observer.disconnect()
})
</script>

<template>
  <canvas ref="canvasRef" class="pointer-events-none absolute inset-0" aria-hidden="true"></canvas>
</template>
