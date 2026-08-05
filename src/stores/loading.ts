import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * 全局加载状态
 * 等待首屏关键资源（window.load）加载完成后关闭，替代固定时长假加载。
 */
export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(true)

  function finish() {
    isLoading.value = false
  }

  return { isLoading, finish }
})
