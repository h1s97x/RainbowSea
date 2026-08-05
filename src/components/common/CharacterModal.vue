<template>
  <transition name="modal-fade">
    <div
      v-if="show"
      ref="modalOverlayRef"
      class="modal-overlay"
      role="dialog"
      aria-modal="true"
      :aria-label="`${character.name} 角色详情`"
      @click="closeModal"
    >
      <div class="modal-container" @click.stop>
        <button ref="closeBtnRef" class="modal-close" @click="closeModal" aria-label="关闭">
          ×
        </button>

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
import { ref, watch, onMounted, onUnmounted } from 'vue'
import type { Character } from '@/types/character'

const props = defineProps<{
  show: boolean
  character: Character
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const modalOverlayRef = ref<HTMLElement | null>(null)
const closeBtnRef = ref<HTMLButtonElement | null>(null)

// 记录弹窗打开前获得焦点的元素，关闭后还原
let lastFocused: HTMLElement | null = null
let cleanupKeydown: (() => void) | null = null

const closeModal = () => {
  emit('close')
}

/** 简单的焦点陷阱：Tab/Shift+Tab 在弹窗内循环 */
const trapFocus = (e: KeyboardEvent) => {
  if (e.key !== 'Tab') return
  const overlay = modalOverlayRef.value
  if (!overlay) return
  const focusables = overlay.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  if (focusables.length === 0) return
  const first = focusables[0]
  const last = focusables[focusables.length - 1]

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      lastFocused = document.activeElement as HTMLElement | null
      document.body.style.overflow = 'hidden'
      // 等待过渡渲染完成后聚焦关闭按钮
      requestAnimationFrame(() => closeBtnRef.value?.focus())
      cleanupKeydown = () => {
        window.removeEventListener('keydown', handleKeydown)
        window.removeEventListener('keydown', trapFocus)
      }
      window.addEventListener('keydown', handleKeydown)
      window.addEventListener('keydown', trapFocus)
    } else {
      document.body.style.overflow = ''
      cleanupKeydown?.()
      cleanupKeydown = null
      lastFocused?.focus()
      lastFocused = null
    }
  }
)

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeModal()
  }
}

onMounted(() => {
  if (props.show) {
    lastFocused = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => closeBtnRef.value?.focus())
    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('keydown', trapFocus)
  }
})

onUnmounted(() => {
  cleanupKeydown?.()
  document.body.style.overflow = ''
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $overlay-dark;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: $z-overlay;
  padding: 1rem;
}

.modal-container {
  position: relative;
  background: $gradient-modal;
  border-radius: $radius-xl;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px $shadow-modal;
  border: 1px solid $primary-border;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: $control-bg;
  border: none;
  color: $light-text;
  font-size: 2rem;
  width: 40px;
  height: 40px;
  border-radius: $radius-full;
  cursor: pointer;
  transition: $transition-base;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  &:hover {
    background: $btn-danger;
    transform: rotate(90deg);
  }

  &:focus-visible {
    outline: 2px solid $primary-color;
    outline-offset: 2px;
  }
}

.modal-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.modal-image {
  img {
    width: 100%;
    height: auto;
    border-radius: $radius-lg;
    box-shadow: 0 10px 30px $shadow-dark;
  }
}

.modal-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.character-name {
  font-size: 2.5rem;
  color: $primary-color;
  margin: 0;
  text-shadow: 0 0 20px $primary-glow;

  @media (max-width: $breakpoint-md) {
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
    color: $primary-color;
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  p {
    color: $text-muted;
    line-height: 1.8;
    margin: 0;
  }
}

.abilities-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    color: $text-muted;
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
  background: $primary-border;
  border-left: 4px solid $primary-color;
  border-radius: $radius-sm;
  margin-top: 1rem;

  .quote-icon {
    position: absolute;
    top: -10px;
    left: 10px;
    font-size: 3rem;
    color: $primary-color;
    opacity: 0.3;
  }

  p {
    font-style: italic;
    color: $light-text;
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
  background: $primary-glow;
  border-radius: 4px;

  &:hover {
    background: $primary-glow-strong;
  }
}
</style>
