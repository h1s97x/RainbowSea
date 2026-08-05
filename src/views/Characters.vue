<template>
  <div class="characters">
    <div class="container">
      <h1 v-reveal class="page-title">人物介绍</h1>

      <div class="characters-grid">
        <div
          v-for="character in characters"
          :key="character.id"
          v-reveal="{ options: { y: 30, stagger: 0.1 } }"
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
    <CharacterModal :show="showModal" :character="modalCharacter" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CHARACTERS } from '@/data/characters'
import type { Character } from '@/types/character'
import LazyImage from '@/components/common/LazyImage.vue'
import CharacterModal from '@/components/common/CharacterModal.vue'

const characters = ref(CHARACTERS)
const showModal = ref(false)
const selectedCharacter = ref<Character | null>(null)

// 弹窗打开时 selectedCharacter 必非空；未选中时传空对象占位
const modalCharacter = computed(() => selectedCharacter.value ?? ({} as Character))

const openModal = (character: Character) => {
  selectedCharacter.value = character
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.characters {
  min-height: 100vh;
  padding: 8rem 0 4rem;
}

.page-title {
  font-size: 3rem;
  color: $light-text;
  text-align: center;
  margin-bottom: 3rem;
}

.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.character-card {
  background: $surface-color;
  border-radius: $radius-md;
  overflow: hidden;
  transition: $transition-base;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px $shadow-primary;
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
    color: $primary-color;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: $text-secondary;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
}

.view-details {
  background: $gradient-primary;
  border: none;
  color: $light-text;
  padding: 0.5rem 1rem;
  border-radius: $radius-sm;
  cursor: pointer;
  font-size: 0.9rem;
  transition: $transition-base;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 5px 15px $shadow-primary-strong;
  }
}
</style>
