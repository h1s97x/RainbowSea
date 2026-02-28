import { ref, onMounted, onUnmounted } from 'vue'
import { throttle } from '../utils/helpers'

export function useScroll() {
  const scrollY = ref(0)
  const isScrollingDown = ref(false)
  
  let lastScrollY = 0

  const handleScroll = throttle(() => {
    scrollY.value = window.scrollY
    isScrollingDown.value = window.scrollY > lastScrollY
    lastScrollY = window.scrollY
  }, 100)

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    scrollY,
    isScrollingDown
  }
}
