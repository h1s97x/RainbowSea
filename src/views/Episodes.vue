<template>
  <div class="episodes">
    <div class="container">
      <h1 ref="titleRef" class="page-title">剧情介绍</h1>
      
      <div ref="listRef" class="episodes-list">
        <div
          v-for="episode in episodes"
          :key="episode.id"
          class="episode-item"
        >
          <div class="episode-number">{{ episode.number }}</div>
          <div class="episode-content">
            <h3>{{ episode.title }}</h3>
            <p>{{ episode.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAnimation } from '../composables/useAnimation'

const episodes = ref([
  {
    id: 1,
    number: '第1集',
    title: '彩虹海的传说',
    description: '少年麦当听说了彩虹海的传说，决定踏上寻找之旅...'
  },
  {
    id: 2,
    number: '第2集',
    title: '启程',
    description: '麦当开始了他的冒险旅程，遇到了第一个伙伴米龙...'
  },
  {
    id: 3,
    number: '第3集',
    title: '初次战斗',
    description: '在旅途中遇到了强大的敌人，麦当和伙伴们团结一致...'
  },
  {
    id: 4,
    number: '第4集',
    title: '新的伙伴',
    description: '古多加入了队伍，团队变得更加强大...'
  }
])

const titleRef = ref(null)
const listRef = ref(null)

const { fadeIn, staggerAnimation } = useAnimation()

onMounted(() => {
  fadeIn(titleRef.value, { duration: 1 })
  
  const items = listRef.value.querySelectorAll('.episode-item')
  staggerAnimation(items, { delay: 0.3, x: -30 })
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
  margin-bottom: 3rem;
}

.episodes-list {
  max-width: 800px;
  margin: 0 auto;
}

.episode-item {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(10px);
  }
}

.episode-number {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  border-radius: 50%;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
}

.episode-content {
  flex: 1;
  
  h3 {
    color: #4a90e2;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #aaa;
    line-height: 1.6;
  }
}
</style>
