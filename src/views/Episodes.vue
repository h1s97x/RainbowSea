<template>
  <div class="episodes">
    <div class="container">
      <h1 v-reveal class="page-title">剧情介绍</h1>

      <div class="timeline">
        <div
          v-for="(episode, index) in episodes"
          :key="episode.id"
          v-reveal="{ options: { y: 50, stagger: 0.15 } }"
          class="timeline-item"
          :class="{ 'timeline-left': index % 2 === 0, 'timeline-right': index % 2 !== 0 }"
        >
          <div class="timeline-marker">
            <div class="marker-circle">
              <span>{{ episode.id }}</span>
            </div>
          </div>

          <div class="timeline-content">
            <div class="episode-card">
              <div class="episode-header">
                <span class="episode-number">{{ episode.number }}</span>
                <h3 class="episode-title">{{ episode.title }}</h3>
              </div>
              <p class="episode-description">{{ episode.description }}</p>
              <div v-if="episode.highlights" class="episode-highlights">
                <h4>精彩看点：</h4>
                <ul>
                  <li v-for="(highlight, idx) in episode.highlights" :key="idx">
                    {{ highlight }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EPISODES } from '@/data/episodes'

const episodes = ref(EPISODES)
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.episodes {
  min-height: 100vh;
  padding: 8rem 0 4rem;
}

.page-title {
  font-size: 3rem;
  color: $light-text;
  text-align: center;
  margin-bottom: 4rem;
}

.timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;

  // 中间的时间线
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px;
    background: $gradient-timeline;
    transform: translateX(-50%);

    @media (max-width: $breakpoint-md) {
      left: 30px;
    }
  }
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;

  @media (max-width: $breakpoint-md) {
    padding-left: 80px;
  }
}

.timeline-marker {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;

  @media (max-width: $breakpoint-md) {
    left: 30px;
  }
}

.marker-circle {
  width: 60px;
  height: 60px;
  border-radius: $radius-full;
  background: $gradient-primary;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px $primary-glow;
  border: 4px solid $dark-bg;

  span {
    color: $light-text;
    font-size: 1.5rem;
    font-weight: bold;
  }
}

.timeline-content {
  width: calc(50% - 50px);

  @media (max-width: $breakpoint-md) {
    width: 100%;
  }
}

.timeline-left {
  justify-content: flex-start;

  .timeline-content {
    margin-right: auto;
    padding-right: 2rem;

    @media (max-width: $breakpoint-md) {
      padding-right: 0;
    }
  }

  .episode-card {
    text-align: right;

    @media (max-width: $breakpoint-md) {
      text-align: left;
    }
  }
}

.timeline-right {
  justify-content: flex-end;

  .timeline-content {
    margin-left: auto;
    padding-left: 2rem;

    @media (max-width: $breakpoint-md) {
      padding-left: 0;
    }
  }

  .episode-card {
    text-align: left;
  }
}

.episode-card {
  background: $surface-color;
  padding: 2rem;
  border-radius: $radius-lg;
  backdrop-filter: blur(10px);
  border: 1px solid $primary-border;
  transition: $transition-base;

  &:hover {
    background: $surface-hover;
    border-color: $primary-border-strong;
    box-shadow: 0 10px 30px $shadow-primary;
    transform: translateY(-5px);
  }
}

.episode-header {
  margin-bottom: 1rem;
}

.episode-number {
  display: inline-block;
  background: $gradient-primary;
  color: $light-text;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.episode-title {
  color: $primary-color;
  font-size: 1.8rem;
  margin: 0.5rem 0;
}

.episode-description {
  color: $text-muted;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.episode-highlights {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid $primary-border;

  h4 {
    color: $primary-color;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      color: $text-secondary;
      padding: 0.3rem 0;
      padding-left: 1.5rem;
      position: relative;

      &::before {
        content: '✦';
        position: absolute;
        left: 0;
        color: $primary-color;
      }
    }
  }
}
</style>
