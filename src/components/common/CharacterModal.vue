<template>
  <transition name="modal-fade">
    <div v-if="show" class="modal-overlay" @click="closeModal">
      <div class="modal-container" @click.stop>
        <button class="modal-close" @click="closeModal">×</button>

        <div class="modal-content">
          <div class="modal-image">
            <img :src="character.image" :alt="character.name" />
          </div>

          <div class="modal-info">
            <h2 class="character-name">{{ character.name }}</h2>
            <div class="character-details">
              <div class="detail-item">
                <span class="label">角色介绍：</span>
                <p>{{ character.description }}</p>
              </div>

              <div v-if="character.fullDescription" class="detail-item">
                <span class="label">详细信息：</span>
                <p>{{ character.fullDescription }}</p>
              </div>

              <div v-if="character.abilities" class="detail-item">
                <span class="label">特殊能力：</span>
                <ul class="abilities-list">
                  <li v-for="(ability, index) in character.abilities" :key="index">
                    {{ ability }}
                  </li>
                </ul>
              </div>

              <div v-if="character.quote" class="detail-item quote">
                <span class="quote-icon">"</span>
                <p>{{ character.quote }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import type { Character } from '@/types/character'

const props = defineProps<{
  show: boolean
  character: Character
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const closeModal = () => {
  emit('close')
}

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.modal-container {
  position: relative;
  background: linear-gradient(135deg, rgba(20, 20, 40, 0.95), rgba(10, 10, 30, 0.95));
  border-radius: 20px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(74, 144, 226, 0.3);
  border: 1px solid rgba(74, 144, 226, 0.2);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  font-size: 2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  &:hover {
    background: rgba(231, 76, 60, 0.8);
    transform: rotate(90deg);
  }
}

.modal-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.modal-image {
  img {
    width: 100%;
    height: auto;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }
}

.modal-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.character-name {
  font-size: 2.5rem;
  color: #4a90e2;
  margin: 0;
  text-shadow: 0 0 20px rgba(74, 144, 226, 0.5);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.character-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-item {
  .label {
    display: block;
    color: #4a90e2;
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  p {
    color: #ccc;
    line-height: 1.8;
    margin: 0;
  }
}

.abilities-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    color: #ccc;
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;

    &::before {
      content: '⭐';
      position: absolute;
      left: 0;
    }
  }
}

.quote {
  position: relative;
  padding: 1rem;
  background: rgba(74, 144, 226, 0.1);
  border-left: 4px solid #4a90e2;
  border-radius: 5px;
  margin-top: 1rem;

  .quote-icon {
    position: absolute;
    top: -10px;
    left: 10px;
    font-size: 3rem;
    color: #4a90e2;
    opacity: 0.3;
  }

  p {
    font-style: italic;
    color: #fff;
    position: relative;
    z-index: 1;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;

  .modal-container {
    transition: transform 0.3s ease;
  }
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;

  .modal-container {
    transform: scale(0.9);
  }
}

/* 滚动条样式 */
.modal-container::-webkit-scrollbar {
  width: 8px;
}

.modal-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
}

.modal-container::-webkit-scrollbar-thumb {
  background: rgba(74, 144, 226, 0.5);
  border-radius: 4px;

  &:hover {
    background: rgba(74, 144, 226, 0.7);
  }
}
</style>
