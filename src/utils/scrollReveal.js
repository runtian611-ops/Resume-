// 滚动入场：给 .reveal 元素在进入视口时添加 .is-visible
// 尊重 prefers-reduced-motion：CSS 侧已关闭过渡，此处无需特殊处理
export function useScrollReveal() {
  let observer = null

  function observe(root = document) {
    const els = root.querySelectorAll('.reveal')

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    els.forEach((el) => observer.observe(el))
  }

  function disconnect() {
    if (observer) observer.disconnect()
  }

  return { observe, disconnect }
}
