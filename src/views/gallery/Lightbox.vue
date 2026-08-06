<template>
  <transition name="lightbox-fade">
    <div v-if="currentImage" class="lightbox" @click="close">
      <button class="lightbox-close" @click.stop="close" aria-label="关闭">×</button>
      <img :src="currentImage.src" :alt="currentImage.alt" />
      <button class="lightbox-prev" @click.stop="prev" aria-label="上一张">‹</button>
      <button class="lightbox-next" @click.stop="next" aria-label="下一张">›</button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue'

interface GalleryImage {
  id: number
  src: string
  alt: string
}

const props = defineProps<{
  visible: boolean
  images: GalleryImage[]
  index: number | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update:index', index: number): void
}>()

const currentImage = computed(() =>
  props.index === null ? undefined : props.images[props.index]
)

const close = () => {
  emit('close')
}

const prev = () => {
  if (props.index === null || props.images.length === 0) return
  if (props.index > 0) {
    emit('update:index', props.index - 1)
  } else {
    emit('update:index', props.images.length - 1)
  }
}

const next = () => {
  if (props.index === null || props.images.length === 0) return
  if (props.index < props.images.length - 1) {
    emit('update:index', props.index + 1)
  } else {
    emit('update:index', 0)
  }
}

// 打开时锁定页面滚动，关闭时恢复
watch(
  () => props.visible,
  (visible) => {
    document.body.style.overflow = visible ? 'hidden' : ''
  }
)

// 键盘支持：Esc 关闭、←/→ 切换
const handleKeydown = (e: KeyboardEvent) => {
  if (!props.visible) return
  if (e.key === 'Escape') {
    close()
  } else if (e.key === 'ArrowLeft') {
    prev()
  } else if (e.key === 'ArrowRight') {
    next()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped lang="scss">
@use '@/styles/tokens' as *;

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $overlay-dark;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: $z-lightbox;

  img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
  }
}

.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: $light-text;
  font-size: 3rem;
  cursor: pointer;
  z-index: $z-lightbox-control;

  &:hover {
    color: $primary-color;
  }
}

.lightbox-prev,
.lightbox-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: $control-bg-strong;
  border: none;
  color: $light-text;
  font-size: 3rem;
  width: 60px;
  height: 60px;
  border-radius: $radius-full;
  cursor: pointer;
  transition: $transition-base;

  &:hover {
    background: $primary-glow;
  }
}

.lightbox-prev {
  left: 20px;
}

.lightbox-next {
  right: 20px;
}
</style>
