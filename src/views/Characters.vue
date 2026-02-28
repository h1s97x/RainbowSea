<template>
  <div class="characters">
    <div class="container">
      <h1 class="page-title fade-in">人物介绍</h1>
      
      <div class="characters-grid">
        <div
          v-for="character in characters"
          :key="character.id"
          class="character-card scale-in"
        >
          <div class="character-image">
            <img :src="character.image" :alt="character.name" />
          </div>
          <div class="character-info">
            <h3>{{ character.name }}</h3>
            <p>{{ character.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { CHARACTERS } from '../utils/constants'

const characters = ref(CHARACTERS)
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
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
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
  }
}
</style>
