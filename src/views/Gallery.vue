<template>
  <div class="gallery">
    <div class="container">
      <h1 class="page-title fade-in">图片画廊</h1>
      
      <div class="gallery-grid">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="gallery-item scale-in"
          @click="openLightbox(index)"
        >
          <img :src="image" :alt="`Gallery ${index + 1}`" />
          <div class="gallery-overlay">
            <span>查看大图</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 简单的灯箱效果 -->
    <div v-if="lightboxIndex !== null" class="lightbox" @click="closeLightbox">
      <button class="lightbox-close">×</button>
      <img :src="images[lightboxIndex]" alt="Lightbox" />
      <button class="lightbox-prev" @click.stop="prevImage">‹</button>
      <button class="lightbox-next" @click.stop="nextImage">›</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const images = ref([
  '/assets/image/1.jpg',
  '/assets/image/12.jpg',
  '/assets/image/43.jpg',
  '/assets/image/6.jpg',
  '/assets/image/111.jpg',
  '/assets/image/xingyouji1.jpg'
])

const lightboxIndex = ref(null)

const openLightbox = (index) => {
  lightboxIndex.value = index
}

const closeLightbox = () => {
  lightboxIndex.value = null
}

const prevImage = () => {
  if (lightboxIndex.value > 0) {
    lightboxIndex.value--
  } else {
    lightboxIndex.value = images.value.length - 1
  }
}

const nextImage = () => {
  if (lightboxIndex.value < images.value.length - 1) {
    lightboxIndex.value++
  } else {
    lightboxIndex.value = 0
  }
}
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
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
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
