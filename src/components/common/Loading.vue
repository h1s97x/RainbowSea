<template>
  <div v-if="isLoading" class="loading-container">
    <div class="loading-content">
      <img :src="loadingGif" alt="Loading" class="loading-gif" />
      <p class="loading-text">星际旅行中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useLoadingStore } from '@/stores/loading'

const loadingGif = import.meta.env.BASE_URL + 'assets/image/cat-loading150x150.gif'

const loadingStore = useLoadingStore()
const isLoading = loadingStore.isLoading

let fallback: ReturnType<typeof setTimeout> | null = null
let cleanupLoad: (() => void) | null = null

onMounted(() => {
  const finish = () => loadingStore.finish()

  if (document.readyState === 'complete') {
    finish()
  } else {
    window.addEventListener('load', finish, { once: true })
    cleanupLoad = () => window.removeEventListener('load', finish)
  }

  // 最晚兜底 3 秒，避免资源异常时一直卡在加载页
  fallback = setTimeout(finish, 3000)
})

onUnmounted(() => {
  cleanupLoad?.()
  if (fallback) clearTimeout(fallback)
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $dark-bg;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: $z-overlay;
  animation: fadeOut 0.5s ease 1.5s forwards;
}

.loading-content {
  text-align: center;
}

.loading-gif {
  width: 150px;
  height: 150px;
  margin-bottom: 1rem;
}

.loading-text {
  color: $light-text;
  font-size: 1.5rem;
  animation: blink 1.5s ease-in-out infinite;
}

@keyframes fadeOut {
  to {
    opacity: 0;
    visibility: hidden;
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
