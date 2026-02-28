<template>
  <div class="characters">
    <div class="container">
      <h1 ref="titleRef" class="page-title">人物介绍</h1>
      
      <div ref="gridRef" class="characters-grid">
        <div
          v-for="character in characters"
          :key="character.id"
          class="character-card"
          @click="openModal(character)"
        >
          <div class="character-image">
            <LazyImage :src="character.image" :alt="character.name" />
          </div>
          <div class="character-info">
            <h3>{{ character.name }}</h3>
            <p>{{ character.description }}</p>
            <button class="view-details">查看详情 →</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 人物详情弹窗 -->
    <CharacterModal
      :show="showModal"
      :character="selectedCharacter"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { CHARACTERS } from '../utils/constants'
import { useAnimation } from '../composables/useAnimation'
import LazyImage from '../components/common/LazyImage.vue'
import CharacterModal from '../components/common/CharacterModal.vue'

const characters = ref(CHARACTERS)
const titleRef = ref(null)
const gridRef = ref(null)
const showModal = ref(false)
const selectedCharacter = ref({})

// 调试：打印角色数据
console.log('Characters data:', CHARACTERS)
console.log('Characters count:', CHARACTERS.length)

const { fadeIn, staggerAnimation } = useAnimation()

onMounted(() => {
  fadeIn(titleRef.value, { duration: 1 })
  
  const cards = gridRef.value.querySelectorAll('.character-card')
  staggerAnimation(cards, { delay: 0.3 })
})

const openModal = (character) => {
  selectedCharacter.value = character
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}
</script>

<style scoped lang="scss">
.characters {
  min-height: 100vh;
  padding: 8rem 0 4rem;
}

.page-title {
  font-size: 3rem;
  color: #fff;
  text-align: center;
  margin-bottom: 3rem;
}

.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.character-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(74, 144, 226, 0.3);
  }
}

.character-image {
  width: 100%;
  height: 300px;
  overflow: hidden;
  
  &:hover :deep(.image) {
    transform: scale(1.1);
  }
}

.character-info {
  padding: 1.5rem;
  
  h3 {
    color: #4a90e2;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #aaa;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
}

.view-details {
  background: linear-gradient(135deg, #4a90e2, #357abd);
  border: none;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(74, 144, 226, 0.4);
  }
}
</style>
