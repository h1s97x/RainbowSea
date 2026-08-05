<template>
  <nav class="navigation" :class="{ 'nav-hidden': isHidden }">
    <div class="container">
      <div class="nav-content">
        <router-link to="/" class="nav-logo">
          <img :src="logoUrl" alt="星游记" />
        </router-link>

        <ul class="nav-menu" :class="{ 'menu-open': isMenuOpen }">
          <li>
            <router-link to="/" class="nav-link" @click="closeMenu">首页</router-link>
          </li>
          <li>
            <router-link to="/characters" class="nav-link" @click="closeMenu">人物介绍</router-link>
          </li>
          <li>
            <router-link to="/episodes" class="nav-link" @click="closeMenu">剧情介绍</router-link>
          </li>
          <li>
            <router-link to="/gallery" class="nav-link" @click="closeMenu">图片画廊</router-link>
          </li>
        </ul>

        <button class="nav-toggle" :class="{ 'toggle-active': isMenuOpen }" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- 移动端菜单遮罩 -->
    <div v-if="isMenuOpen" class="menu-overlay" @click="closeMenu"></div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useScroll } from '@/composables/useScroll'

const logoUrl = import.meta.env.BASE_URL + 'assets/image/xingyouji2.png'

const { scrollY, isScrollingDown } = useScroll()
const isHidden = ref(false)
const isMenuOpen = ref(false)

watch([scrollY, isScrollingDown], ([y, down]) => {
  if (y > 100 && down) {
    isHidden.value = true
  } else {
    isHidden.value = false
  }
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  // 防止背景滚动
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}
</script>

<style scoped lang="scss">
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;

  &.nav-hidden {
    transform: translateY(-100%);
  }
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
}

.nav-logo {
  img {
    height: 50px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70%;
    max-width: 300px;
    height: 100vh;
    background: rgba(0, 0, 0, 0.95);
    flex-direction: column;
    padding: 5rem 2rem 2rem;
    gap: 1rem;
    transition: right 0.3s ease;
    z-index: 1001;

    &.menu-open {
      right: 0;
    }
  }
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s ease;
  position: relative;
  padding: 0.5rem 0;

  &:hover {
    color: #4a90e2;
  }

  &.router-link-active {
    color: #4a90e2;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: #4a90e2;

      @media (max-width: 768px) {
        left: -1rem;
        right: auto;
        width: 4px;
        height: 100%;
        bottom: auto;
        top: 0;
      }
    }
  }
}

.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  z-index: 1002;

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    width: 25px;
    height: 3px;
    background: #fff;
    transition: all 0.3s ease;
  }

  &.toggle-active {
    span:nth-child(1) {
      transform: rotate(45deg) translate(8px, 8px);
    }

    span:nth-child(2) {
      opacity: 0;
    }

    span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -7px);
    }
  }
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;

  @media (min-width: 769px) {
    display: none;
  }
}
</style>
