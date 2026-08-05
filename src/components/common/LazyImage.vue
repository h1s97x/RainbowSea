<template>
  <div class="lazy-image" :class="{ loaded: isLoaded, error: hasError }">
    <img v-if="isLoaded && !hasError" :src="src" :alt="alt" class="image" />
    <div v-else-if="hasError" class="error-placeholder">
      <span>图片加载失败</span>
    </div>
    <div v-else class="placeholder">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  }
})

const isLoaded = ref(false)
const hasError = ref(false)

const loadImage = () => {
  isLoaded.value = false
  hasError.value = false

  const img = new Image()
  img.src = props.src

  img.onload = () => {
    isLoaded.value = true
    hasError.value = false
  }

  img.onerror = () => {
    isLoaded.value = false
    hasError.value = true
    console.error('Failed to load image:', props.src)
  }
}

onMounted(() => {
  loadImage()
})

watch(
  () => props.src,
  () => {
    loadImage()
  }
)
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.lazy-image {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $surface-color;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: fadeIn 0.5s ease;
}

.placeholder,
.error-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $surface-color;
}

.error-placeholder {
  color: $accent-color;
  font-size: 0.9rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid $primary-border;
  border-top-color: $primary-color;
  border-radius: $radius-full;
  animation: spin 1s linear infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
