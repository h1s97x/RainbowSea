<template>
  <nav class="navigation" :class="{ 'nav-hidden': isHidden }">
    <div class="container">
      <div class="nav-content">
        <router-link to="/" class="nav-logo">
          <img src="/assets/image/xingyouji2.png" alt="星游记" />
        </router-link>
        
        <ul class="nav-menu">
          <li>
            <router-link to="/" class="nav-link">首页</router-link>
          </li>
          <li>
            <router-link to="/characters" class="nav-link">人物介绍</router-link>
          </li>
          <li>
            <router-link to="/episodes" class="nav-link">剧情介绍</router-link>
          </li>
          <li>
            <router-link to="/gallery" class="nav-link">图片画廊</router-link>
          </li>
        </ul>

        <button class="nav-toggle" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useScroll } from '../../composables/useScroll'

const { scrollY, isScrollingDown } = useScroll()
const isHidden = ref(false)

watch([scrollY, isScrollingDown], ([y, down]) => {
  if (y > 100 && down) {
    isHidden.value = true
  } else {
    isHidden.value = false
  }
})

const toggleMenu = () => {
  // 移动端菜单切换逻辑
  console.log('Toggle menu')
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
    display: none;
  }
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s ease;
  position: relative;
  
  &:hover {
    color: #4a90e2;
  }
  
  &.router-link-active {
    color: #4a90e2;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      right: 0;
      height: 2px;
      background: #4a90e2;
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
  
  @media (max-width: 768px) {
    display: flex;
  }
  
  span {
    width: 25px;
    height: 3px;
    background: #fff;
    transition: all 0.3s ease;
  }
}
</style>
