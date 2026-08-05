import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type MaybeElement = HTMLElement | null | undefined

interface AnimationOptions {
  [key: string]: unknown
}

interface ScrollTriggerOptions {
  [key: string]: unknown
}

/** 过滤掉 null/undefined 的动画目标 */
function toTarget(el: MaybeElement): gsap.TweenTarget | NodeListOf<Element> | Element[] {
  return (el ?? []) as gsap.TweenTarget
}

/**
 * 动画封装：统一 GSAP 常用动画，页面按需取用。
 */
export function useAnimation() {
  // 淡入动画
  const fadeIn = (element: MaybeElement, options: AnimationOptions = {}) => {
    return gsap.from(toTarget(element), {
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      ...options
    })
  }

  // 从下方滑入
  const slideInUp = (element: MaybeElement, options: AnimationOptions = {}) => {
    return gsap.from(toTarget(element), {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      ...options
    })
  }

  // 从左侧滑入
  const slideInLeft = (element: MaybeElement, options: AnimationOptions = {}) => {
    return gsap.from(toTarget(element), {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      ...options
    })
  }

  // 从右侧滑入
  const slideInRight = (element: MaybeElement, options: AnimationOptions = {}) => {
    return gsap.from(toTarget(element), {
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      ...options
    })
  }

  // 缩放动画
  const scaleIn = (element: MaybeElement, options: AnimationOptions = {}) => {
    return gsap.from(toTarget(element), {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      ...options
    })
  }

  // 交错动画
  const staggerAnimation = (
    elements: MaybeElement | NodeListOf<Element> | Element[],
    options: AnimationOptions = {}
  ) => {
    const target =
      elements instanceof NodeList || Array.isArray(elements)
        ? (elements as NodeListOf<Element> | Element[])
        : toTarget(elements as MaybeElement)
    return gsap.from(target as unknown as gsap.TweenTarget, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      ...options
    })
  }

  // 滚动触发动画
  const scrollTriggerAnimation = (
    element: MaybeElement,
    animationOptions: AnimationOptions = {},
    triggerOptions: ScrollTriggerOptions = {}
  ) => {
    return gsap.from(toTarget(element), {
      scrollTrigger: {
        trigger: element as Element,
        start: 'top 80%',
        toggleActions: 'play none none none',
        ...triggerOptions
      },
      ...animationOptions
    })
  }

  // 悬停动画
  const hoverAnimation = (element: HTMLElement) => {
    const tl = gsap.timeline({ paused: true })
    tl.to(element, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    })

    element.addEventListener('mouseenter', () => tl.play())
    element.addEventListener('mouseleave', () => tl.reverse())

    return tl
  }

  // 文字打字机效果
  const typewriter = (element: HTMLElement, text: string, options: AnimationOptions = {}) => {
    const chars = text.split('')
    element.textContent = ''

    return gsap.to(
      {},
      {
        duration: chars.length * 0.05,
        onUpdate: function (this: { progress: () => number }) {
          const progress = Math.floor(this.progress() * chars.length)
          element.textContent = chars.slice(0, progress).join('')
        },
        ease: 'none',
        ...options
      }
    )
  }

  return {
    fadeIn,
    slideInUp,
    slideInLeft,
    slideInRight,
    scaleIn,
    staggerAnimation,
    scrollTriggerAnimation,
    hoverAnimation,
    typewriter
  }
}
