<template>
  <div class="episodes">
    <div class="container">
      <h1 ref="titleRef" class="page-title">剧情介绍</h1>

      <div ref="timelineRef" class="timeline">
        <div
          v-for="(episode, index) in episodes"
          :key="episode.id"
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
import { ref, onMounted } from 'vue'
import { EPISODES } from '@/data/episodes'
import { useAnimation } from '@/composables/useAnimation'

const episodes = ref(EPISODES)

const titleRef = ref<HTMLElement | null>(null)
const timelineRef = ref<HTMLElement | null>(null)

const { fadeIn, staggerAnimation } = useAnimation()

onMounted(() => {
  fadeIn(titleRef.value, { duration: 1 })

  const items = timelineRef.value?.querySelectorAll('.timeline-item') ?? []
  staggerAnimation(items, { delay: 0.3, y: 50, stagger: 0.15 })
})
</script>

<style scoped lang="scss">
.episodes {
  min-height: 100vh;
  padding: 8rem 0 4rem;
}

.page-title {
  font-size: 3rem;
  color: #fff;
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
    background: linear-gradient(180deg, #4a90e2, #357abd);
    transform: translateX(-50%);

    @media (max-width: 768px) {
      left: 30px;
    }
  }
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    padding-left: 80px;
  }
}

.timeline-marker {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;

  @media (max-width: 768px) {
    left: 30px;
  }
}

.marker-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(74, 144, 226, 0.6);
  border: 4px solid #000;

  span {
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
  }
}

.timeline-content {
  width: calc(50% - 50px);

  @media (max-width: 768px) {
    width: 100%;
  }
}

.timeline-left {
  justify-content: flex-start;

  .timeline-content {
    margin-right: auto;
    padding-right: 2rem;

    @media (max-width: 768px) {
      padding-right: 0;
    }
  }

  .episode-card {
    text-align: right;

    @media (max-width: 768px) {
      text-align: left;
    }
  }
}

.timeline-right {
  justify-content: flex-end;

  .timeline-content {
    margin-left: auto;
    padding-left: 2rem;

    @media (max-width: 768px) {
      padding-left: 0;
    }
  }

  .episode-card {
    text-align: left;
  }
}

.episode-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(74, 144, 226, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(74, 144, 226, 0.5);
    box-shadow: 0 10px 30px rgba(74, 144, 226, 0.3);
    transform: translateY(-5px);
  }
}

.episode-header {
  margin-bottom: 1rem;
}

.episode-number {
  display: inline-block;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  color: #fff;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.episode-title {
  color: #4a90e2;
  font-size: 1.8rem;
  margin: 0.5rem 0;
}

.episode-description {
  color: #ccc;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.episode-highlights {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(74, 144, 226, 0.2);

  h4 {
    color: #4a90e2;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      color: #aaa;
      padding: 0.3rem 0;
      padding-left: 1.5rem;
      position: relative;

      &::before {
        content: '✦';
        position: absolute;
        left: 0;
        color: #4a90e2;
      }
    }
  }
}
</style>
