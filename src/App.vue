<template>
  <div id="app">
    <Loading />
    <StarField />
    <Navigation />
    <main class="main-content">
      <router-view />
    </main>
    <MusicPlayer />
  </div>
</template>

<script setup>
import Navigation from './components/layout/Navigation.vue'
import Loading from './components/common/Loading.vue'
import StarField from './components/effects/StarField.vue'
import MusicPlayer from './components/common/MusicPlayer.vue'
</script>

<style>
@import './assets/styles/main.scss';

.main-content {
  position: relative;
  z-index: 1;
}
</style>
