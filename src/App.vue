<template>
  <div id="app">
    <Loading />
    <StarField />
    <Navigation />
    <main class="main-content">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade'" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
    <Footer />
    <MusicPlayer />
  </div>
</template>

<script setup lang="ts">
import Navigation from '@/components/layout/Navigation.vue'
import Loading from '@/components/common/Loading.vue'
import StarField from '@/components/effects/StarField.vue'
import MusicPlayer from '@/components/common/MusicPlayer.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<style lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/main.scss';

.main-content {
  position: relative;
  z-index: 1;
}

/* 页面切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.4s ease;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
