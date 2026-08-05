<template>
  <div class="music-player" :class="{ 'player-expanded': isExpanded }">
    <button class="player-toggle" @click="toggleExpand" aria-label="切换音乐播放器">
      <span v-if="isPlaying">🎵</span>
      <span v-else>🎶</span>
    </button>

    <div v-if="isExpanded" class="player-content">
      <div class="player-header">
        <h3>{{ currentTrack?.title || '未选择音乐' }}</h3>
        <p>{{ currentTrack?.artist }}</p>
      </div>

      <div class="player-controls">
        <button @click="store.togglePlay()" class="btn-play" aria-label="播放或暂停">
          {{ isPlaying ? '⏸' : '▶' }}
        </button>
      </div>

      <div class="player-progress">
        <span class="time">{{ formatTime(currentTime) }}</span>
        <input
          type="range"
          :value="currentTime"
          :max="duration"
          @input="handleSeek"
          class="progress-bar"
          aria-label="播放进度"
        />
        <span class="time">{{ formatTime(duration) }}</span>
      </div>

      <div class="player-volume">
        <span>🔊</span>
        <input
          type="range"
          :value="volume"
          max="1"
          step="0.01"
          @input="handleVolumeChange"
          class="volume-bar"
          aria-label="音量"
        />
      </div>

      <div class="player-playlist">
        <div
          v-for="track in playlist"
          :key="track.id"
          class="playlist-item"
          :class="{ active: currentTrack?.id === track.id }"
          @click="selectTrack(track)"
        >
          {{ track.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMusicStore } from '@/stores/music'
import { formatTime } from '@/utils/helpers'

const store = useMusicStore()
const { currentTrack, isPlaying, currentTime, duration, volume, playlist } = storeToRefs(store)
const isExpanded = ref(false)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const selectTrack = (track: (typeof store.playlist)[number]) => {
  store.loadTrack(track)
  store.togglePlay()
}

const handleSeek = (e: Event) => {
  store.seek(parseFloat((e.target as HTMLInputElement).value))
}

const handleVolumeChange = (e: Event) => {
  store.setVolume(parseFloat((e.target as HTMLInputElement).value))
}

onMounted(() => {
  if (!store.currentTrack && playlist.value.length > 0) {
    store.loadTrack(playlist.value[0])
  }
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.music-player {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: $z-player;
  background: rgba(0, 0, 0, 0.9);
  border-radius: $radius-md;
  padding: 1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &.player-expanded {
    width: 350px;
  }
}

.player-toggle {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  animation: pulse 2s ease-in-out infinite;
}

.player-content {
  margin-top: 1rem;
}

.player-header {
  text-align: center;
  margin-bottom: 1rem;

  h3 {
    color: $light-text;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: $text-secondary;
    font-size: 0.9rem;
  }
}

.player-controls {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.btn-play {
  background: $primary-color;
  border: none;
  color: $light-text;
  font-size: 1.5rem;
  width: 50px;
  height: 50px;
  border-radius: $radius-full;
  cursor: pointer;
  transition: $transition-base;

  &:hover {
    background: $primary-dark;
    transform: scale(1.1);
  }
}

.player-progress {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  .time {
    color: $text-secondary;
    font-size: 0.8rem;
  }
}

.progress-bar,
.volume-bar {
  flex: 1;
  height: 5px;
  border-radius: $radius-sm;
  outline: none;
  background: $control-bg-strong;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: $radius-full;
    background: $primary-color;
    cursor: pointer;
  }
}

.player-volume {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  span {
    font-size: 1.2rem;
  }
}

.player-playlist {
  max-height: 200px;
  overflow-y: auto;
}

.playlist-item {
  padding: 0.5rem;
  color: $text-secondary;
  cursor: pointer;
  border-radius: $radius-sm;
  transition: $transition-base;

  &:hover {
    background: $control-bg;
    color: $light-text;
  }

  &.active {
    background: $primary-glow;
    color: $primary-color;
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
</style>
