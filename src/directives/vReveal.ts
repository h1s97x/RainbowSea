import type { Directive, DirectiveBinding } from 'vue'
import gsap from 'gsap'

interface RevealOptions {
  y?: number
  x?: number
  opacity?: number
  scale?: number
  duration?: number
  delay?: number
  stagger?: number
  once?: boolean
}

interface RevealValue {
  options?: RevealOptions
  onEnter?: () => void
}

let observer: IntersectionObserver | null = null

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const { el, opts } = (entry.target as HTMLElement & { __reveal?: unknown })
              .__reveal as {
              el: HTMLElement
              opts: RevealOptions
            }
            gsap.to(el, {
              y: 0,
              x: 0,
              opacity: 1,
              scale: 1,
              duration: opts.duration ?? 0.8,
              delay: opts.delay ?? 0,
              ease: 'power2.out',
              overwrite: 'auto',
              onComplete: () => {
                if (opts.once !== false) {
                  observer?.unobserve(el)
                }
              }
            })
          }
        })
      },
      { threshold: 0.15 }
    )
  }
  return observer
}

/** v-reveal 指令：元素进入视口时播放进场动画 */
export const vReveal: Directive<HTMLElement, RevealValue> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<RevealValue>) {
    const opts: RevealOptions = {
      y: 40,
      opacity: 0,
      ...(binding.value?.options ?? {})
    }

    // 初始隐藏
    gsap.set(el, {
      y: opts.y ?? 0,
      x: opts.x ?? 0,
      opacity: opts.opacity ?? 0,
      scale: opts.scale ?? 1
    })

    ;(el as HTMLElement & { __reveal?: unknown }).__reveal = { el, opts }
    getObserver().observe(el)

    binding.value?.onEnter?.()
  },

  unmounted(el: HTMLElement) {
    observer?.unobserve(el)
    gsap.killTweensOf(el)
  }
}
