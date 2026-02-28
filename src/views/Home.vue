<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1 ref="titleRef" class="hero-title">星游记</h1>
        <p ref="subtitleRef" class="hero-subtitle">Rainbow Sea Journey</p>
        <p ref="descRef" class="hero-description">
          在彩虹海的尽头，有一个传说中的地方...
        </p>
      </div>
    </section>

    <section class="carousel-section">
      <div class="container">
        <swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="30"
          :loop="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          :pagination="{ clickable: true }"
          :navigation="true"
          :effect="'fade'"
          class="main-swiper"
        >
          <swiper-slide v-for="(image, index) in carouselImages" :key="index">
            <img :src="image" :alt="`Slide ${index + 1}`" />
          </swiper-slide>
        </swiper>
      </div>
    </section>

    <section ref="introRef" class="intro-section">
      <div class="container">
        <h2 class="section-title">关于星游记</h2>
        <div class="intro-content">
          <p>
            《星游记》是一部充满冒险与梦想的动画作品。
            讲述了少年麦当为了寻找传说中的彩虹海，
            踏上了一段充满挑战与奇遇的星际旅程。
          </p>
          <p>
            在这个旅程中，他结识了许多伙伴，
            一起面对各种困难，共同成长。
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { CAROUSEL_IMAGES } from '../utils/constants'
import { useAnimation } from '../composables/useAnimation'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const modules = [Navigation, Pagination, Autoplay, EffectFade]
const carouselImages = ref(CAROUSEL_IMAGES)

const titleRef = ref(null)
const subtitleRef = ref(null)
const descRef = ref(null)
const introRef = ref(null)

const { fadeIn, slideInUp, scrollTriggerAnimation } = useAnimation()

onMounted(() => {
  // 标题动画
  fadeIn(titleRef.value, { duration: 1.5, delay: 0.3 })
  
  // 副标题动画
  slideInUp(subtitleRef.value, { delay: 0.8 })
  
  // 描述动画
  slideInUp(descRef.value, { delay: 1.2 })
  
  // 简介区域滚动触发动画
  scrollTriggerAnimation(introRef.value, {
    y: 50,
    opacity: 0,
    duration: 1
  })
})
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;
}

.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
}

.hero-content {
  z-index: 1;
}

.hero-title {
  font-size: 5rem;
  color: #fff;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(74, 144, 226, 0.8);
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
}

.hero-subtitle {
  font-size: 2rem;
  color: #4a90e2;
  margin-bottom: 2rem;
  animation-delay: 0.3s;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
}

.hero-description {
  font-size: 1.2rem;
  color: #aaa;
  max-width: 600px;
  margin: 0 auto;
  animation-delay: 0.6s;
}

.carousel-section {
  padding: 4rem 0;
  background: rgba(0, 0, 0, 0.5);
}

.main-swiper {
  border-radius: 10px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    
    @media (max-width: 768px) {
      height: 300px;
    }
  }
}

.intro-section {
  padding: 4rem 0;
}

.section-title {
  font-size: 2.5rem;
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
}

.intro-content {
  max-width: 800px;
  margin: 0 auto;
  
  p {
    font-size: 1.2rem;
    color: #ccc;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
}
</style>
