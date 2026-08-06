<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1 v-reveal class="hero-title">星游记</h1>
        <p v-reveal="{ options: { delay: 0.3 } }" class="hero-subtitle">Rainbow Sea</p>
        <p v-reveal="{ options: { delay: 0.6 } }" class="hero-description">
          在彩虹海的尽头，有一个传说中的地方……
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

    <section v-reveal="{ options: { y: 50 } }" class="intro-section">
      <div class="container">
        <h2 class="section-title">关于星游记</h2>
        <div class="intro-content">
          <p>
            《星游记》（Rainbow Sea）是由北京卡酷传媒等出品的国产动画，2011 年首播，共 26 集。
            少年麦当是被称为"红魔鬼"的探险家麦林之子，他坚信父亲所说的"彩虹海"并非谎言，
            与父亲立下五年后彩虹海相见的约定，踏上了星际旅程。
          </p>
          <p>
            在旅程中，他结识了被变成兔子的亚亚罗国王咕咚·萌西、太阳系最后的星学家笛亚等伙伴，
            一起穿越"魔鬼脚印"，对抗"五色眼"与克拉的野心，在冒险中共同成长。
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { CAROUSEL_IMAGES } from '@/data/carousel'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const modules = [Navigation, Pagination, Autoplay, EffectFade]
const carouselImages = ref(CAROUSEL_IMAGES)
</script>

<style scoped lang="scss">
@use '@/styles/tokens' as *;

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
  color: $light-text;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px $primary-glow-strong;

  @media (max-width: $breakpoint-md) {
    font-size: 3rem;
  }
}

.hero-subtitle {
  font-size: 2rem;
  color: $primary-color;
  margin-bottom: 2rem;
  animation-delay: 0.3s;

  @media (max-width: $breakpoint-md) {
    font-size: 1.5rem;
  }
}

.hero-description {
  font-size: 1.2rem;
  color: $text-secondary;
  max-width: 600px;
  margin: 0 auto;
  animation-delay: 0.6s;
}

.carousel-section {
  padding: 4rem 0;
  background: $overlay-light;
}

.main-swiper {
  border-radius: $radius-md;
  overflow: hidden;

  img {
    width: 100%;
    height: 500px;
    object-fit: cover;

    @media (max-width: $breakpoint-md) {
      height: 300px;
    }
  }
}

.intro-section {
  padding: 4rem 0;
}

.section-title {
  font-size: 2.5rem;
  color: $light-text;
  text-align: center;
  margin-bottom: 2rem;
}

.intro-content {
  max-width: 800px;
  margin: 0 auto;

  p {
    font-size: 1.2rem;
    color: $text-muted;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
}
</style>
