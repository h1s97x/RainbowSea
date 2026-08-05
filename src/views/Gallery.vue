<template>
  <div class="gallery">
    <div class="container">
      <h1 ref="titleRef" class="page-title">图片画廊</h1>

      <div ref="gridRef" class="gallery-grid">
        <div
          v-for="(image, index) in images"
          :key="image.id"
          class="gallery-item"
          @click="openLightbox(index)"
        >
          <LazyImage :src="image.src" :alt="image.alt" />
          <div class="gallery-overlay">
            <span>查看大图</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 灯箱 -->
    <transition name="lightbox-fade">
      <div v-if="lightboxIndex !== null" class="lightbox" @click="closeLightbox">
        <button class="lightbox-close" @click.stop="closeLightbox" aria-label="关闭">×</button>
        <img :src="images[lightboxIndex].src" :alt="images[lightboxIndex].alt" />
        <button class="lightbox-prev" @click.stop="prevImage" aria-label="上一张">‹</button>
        <button class="lightbox-next" @click.stop="nextImage" aria-label="下一张">›</button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { GALLERY_IMAGES } from '@/data/gallery'
import { useAnimation } from '@/composables/useAnimation'
import LazyImage from '@/components/common/LazyImage.vue'

const images = ref(GALLERY_IMAGES)

const lightboxIndex = ref<number | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)

const { fadeIn, staggerAnimation } = useAnimation()

onMounted(() => {
  fadeIn(titleRef.value, { duration: 1 })

  const items = gridRef.value?.querySelectorAll('.gallery-item') ?? []
  staggerAnimation(items, { delay: 0.3, stagger: 0.05 })
})

const openLightbox = (index: number) => {
  lightboxIndex.value = index
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxIndex.value = null
  document.body.style.overflow = ''
}

const prevImage = () => {
  if (lightboxIndex.value === null) return
  if (lightboxIndex.value > 0) {
    lightboxIndex.value--
  } else {
    lightboxIndex.value = images.value.length - 1
  }
}

const nextImage = () => {
  if (lightboxIndex.value === null) return
  if (lightboxIndex.value < images.value.length - 1) {
    lightboxIndex.value++
  } else {
    lightboxIndex.value = 0
  }
}

// 键盘支持：Esc 关闭、←/→ 切换
const handleKeydown = (e: KeyboardEvent) => {
  if (lightboxIndex.value === null) return
  if (e.key === 'Escape') {
    closeLightbox()
  } else if (e.key === 'ArrowLeft') {
    prevImage()
  } else if (e.key === 'ArrowRight') {
    nextImage()
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
.gallery {
  min-height: 100vh;
  padding: 8rem 0 4rem;
}

.page-title {
  font-size: 3rem;
  color: #fff;
  text-align: center;
  margin-bottom: 3rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.gallery-item {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;

  &:hover :deep(.image) {
    transform: scale(1.1);
  }
}

.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  span {
    color: #fff;
    font-size: 1.2rem;
  }

  .gallery-item:hover & {
    opacity: 1;
  }
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;

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
  color: #fff;
  font-size: 3rem;
  cursor: pointer;
  z-index: 10000;

  &:hover {
    color: #4a90e2;
  }
}

.lightbox-prev,
.lightbox-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #fff;
  font-size: 3rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(74, 144, 226, 0.5);
  }
}

.lightbox-prev {
  left: 20px;
}

.lightbox-next {
  right: 20px;
}
</style>
