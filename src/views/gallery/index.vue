<template>
  <div class="gallery">
    <div class="container">
      <h1 v-reveal class="page-title">图片画廊</h1>

      <div class="gallery-grid">
        <div
          v-for="(image, index) in images"
          :key="image.id"
          v-reveal="{ options: { y: 30, stagger: 0.05 } }"
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
    <Lightbox
      :visible="lightboxIndex !== null"
      :images="images"
      :index="lightboxIndex"
      @close="closeLightbox"
      @update:index="(index: number) => (lightboxIndex = index)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GALLERY_IMAGES } from '@/data/gallery'
import LazyImage from '@/components/common/LazyImage.vue'
import Lightbox from './Lightbox.vue'

const images = ref(GALLERY_IMAGES)
const lightboxIndex = ref<number | null>(null)

const openLightbox = (index: number) => {
  lightboxIndex.value = index
}

const closeLightbox = () => {
  lightboxIndex.value = null
}
</script>

<style scoped lang="scss">
@use '@/styles/tokens' as *;

.gallery {
  min-height: 100vh;
  padding: 8rem 0 4rem;
}

.page-title {
  font-size: 3rem;
  color: $light-text;
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
  border-radius: $radius-md;
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
  background: $overlay-medium;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  span {
    color: $light-text;
    font-size: 1.2rem;
  }

  .gallery-item:hover & {
    opacity: 1;
  }
}
</style>
