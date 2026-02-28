<template>
  <div v-if="isLoading" class="loading-container">
    <div class="loading-content">
      <img :src="loadingGif" alt="Loading" class="loading-gif" />
      <p class="loading-text">星际旅行中...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loadingGif = import.meta.env.BASE_URL + 'assets/image/cat-loading150x150.gif'
const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
})
</script>

<style scoped lang="scss">
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
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
  color: #fff;
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
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
