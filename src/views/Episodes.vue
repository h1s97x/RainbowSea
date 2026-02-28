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

<script setup>
import { ref, onMounted } from 'vue'
import { useAnimation } from '../composables/useAnimation'

const episodes = ref([
  {
    id: 1,
    number: '第1话',
    title: '彩虹海的传说',
    description: '少年麦当听说了彩虹海的传说，决定踏上寻找之旅。在这个充满未知的世界里，他将遇到什么样的冒险呢？',
    highlights: ['麦当的梦想启程', '神秘的彩虹海传说', '冒险的开始']
  },
  {
    id: 2,
    number: '第2话',
    title: '启程',
    description: '麦当开始了他的冒险旅程，遇到了第一个伙伴米龙。两人一起踏上了寻找彩虹海的征途。',
    highlights: ['米龙的加入', '第一次战斗', '友谊的建立']
  },
  {
    id: 3,
    number: '第3话',
    title: '初次战斗',
    description: '在旅途中遇到了强大的敌人，麦当和伙伴们团结一致，展现出了惊人的战斗力。',
    highlights: ['团队配合', '战斗技巧提升', '危机中的成长']
  },
  {
    id: 4,
    number: '第4话',
    title: '新的伙伴',
    description: '古多加入了队伍，团队变得更加强大。他们继续向着彩虹海前进。',
    highlights: ['古多的实力', '团队扩大', '新的挑战']
  },
  {
    id: 5,
    number: '第5话',
    title: '神秘的迪亚',
    description: '队伍遇到了神秘的迪亚，她的出现为旅程带来了新的转机。',
    highlights: ['迪亚的神秘力量', '预言的揭示', '命运的指引']
  },
  {
    id: 6,
    number: '第6话',
    title: '彩虹海的线索',
    description: '经过重重困难，麦当终于找到了通往彩虹海的线索。',
    highlights: ['重要线索', '希望的曙光', '继续前进']
  }
])

const titleRef = ref(null)
const timelineRef = ref(null)

const { fadeIn, staggerAnimation } = useAnimation()

onMounted(() => {
  fadeIn(titleRef.value, { duration: 1 })
  
  const items = timelineRef.value.querySelectorAll('.timeline-item')
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
