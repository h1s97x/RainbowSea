<template>
  <div class="lazy-image" :class="{ loaded: isLoaded }">
    <img
      v-if="isLoaded"
      :src="src"
      :alt="alt"
      @load="onLoad"
      class="image"
    />
    <div v-else class="placeholder">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

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

onMounted(() => {
  const img = new Image()
  img.src = props.src
  img.onload = () => {
    isLoaded.value = true
  }
})

const onLoad = () => {
  // 图片加载完成后的额外处理
}
</script>

<style scoped lang="scss">
.lazy-image {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: fadeIn 0.5s ease;
}

.placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(74, 144, 226, 0.3);
  border-top-color: #4a90e2;
  border-radius: 50%;
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
