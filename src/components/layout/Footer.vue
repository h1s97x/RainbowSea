<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <router-link to="/" class="footer-logo">
            <img :src="logoUrl" alt="星游记" />
          </router-link>
          <p class="footer-desc">在彩虹海的尽头，有一个传说中的地方……</p>
        </div>

        <nav class="footer-links" aria-label="页脚导航">
          <router-link to="/" class="footer-link">首页</router-link>
          <router-link to="/characters" class="footer-link">人物介绍</router-link>
          <router-link to="/episodes" class="footer-link">剧情介绍</router-link>
          <router-link to="/gallery" class="footer-link">图片画廊</router-link>
        </nav>
      </div>

      <div class="footer-bottom">
        <p>© {{ year }} Rainbow Sea Journey · 星游记粉丝站 · 仅供学习交流</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const logoUrl = import.meta.env.BASE_URL + 'assets/image/xingyouji2.png'
const year = new Date().getFullYear()
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.site-footer {
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  border-top: 1px solid $primary-border;
  padding: 3rem 0 1.5rem;
  margin-top: 4rem;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.footer-logo {
  img {
    height: 40px;
    width: auto;
    display: block;
  }
}

.footer-desc {
  color: $text-muted;
  font-size: 0.95rem;
  margin: 0;
  max-width: 360px;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.footer-link {
  color: $text-muted;
  text-decoration: none;
  font-size: 0.95rem;
  transition: $transition-base;

  &:hover {
    color: $primary-color;
  }

  &.router-link-active {
    color: $primary-color;
  }
}

.footer-bottom {
  border-top: 1px solid $primary-border;
  padding-top: 1.5rem;
  text-align: center;

  p {
    color: $text-secondary;
    font-size: 0.85rem;
    margin: 0;
  }
}

@media (max-width: $breakpoint-md) {
  .footer-content {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
