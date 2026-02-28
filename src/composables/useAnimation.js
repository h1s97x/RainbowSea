import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useAnimation() {
  // 淡入动画
  const fadeIn = (element, options = {}) => {
    return gsap.from(element, {
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      ...options
    })
  }

  // 从下方滑入
  const slideInUp = (element, options = {}) => {
    return gsap.from(element, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      ...options
    })
  }

  // 从左侧滑入
  const slideInLeft = (element, options = {}) => {
    return gsap.from(element, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      ...options
    })
  }

  // 从右侧滑入
  const slideInRight = (element, options = {}) => {
    return gsap.from(element, {
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      ...options
    })
  }

  // 缩放动画
  const scaleIn = (element, options = {}) => {
    return gsap.from(element, {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      ...options
    })
  }

  // 交错动画
  const staggerAnimation = (elements, options = {}) => {
    return gsap.from(elements, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      ...options
    })
  }

  // 滚动触发动画
  const scrollTriggerAnimation = (element, animationOptions = {}, triggerOptions = {}) => {
    return gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none',
        ...triggerOptions
      },
      ...animationOptions
    })
  }

  // 悬停动画
  const hoverAnimation = (element) => {
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
  const typewriter = (element, text, options = {}) => {
    const chars = text.split('')
    element.textContent = ''
    
    return gsap.to({}, {
      duration: chars.length * 0.05,
      onUpdate: function() {
        const progress = Math.floor(this.progress() * chars.length)
        element.textContent = chars.slice(0, progress).join('')
      },
      ease: 'none',
      ...options
    })
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
