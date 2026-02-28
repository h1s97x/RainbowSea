<template>
  <div class="music-player" :class="{ 'player-expanded': isExpanded }">
    <button class="player-toggle" @click="toggleExpand">
      <span v-if="isPlaying">🎵</span>
      <span v-else>🎶</span>
    </button>

    <div v-if="isExpanded" class="player-content">
      <div class="player-header">
        <h3>{{ currentTrack?.title || '未选择音乐' }}</h3>
        <p>{{ currentTrack?.artist }}</p>
      </div>

      <div class="player-controls">
        <button @click="togglePlay" class="btn-play">
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

<script setup>
import { ref, onMounted } from 'vue'
import { useMusic } from '../../composables/useMusic'
import { MUSIC_LIST } from '../../utils/constants'
import { formatTime } from '../../utils/helpers'

const isExpanded = ref(false)
const playlist = ref(MUSIC_LIST)

const {
  currentTrack,
  isPlaying,
  currentTime,
  duration,
  volume,
  loadTrack,
  togglePlay,
  seek,
  setVolume
} = useMusic()

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const selectTrack = (track) => {
  loadTrack(track)
  togglePlay()
}

const handleSeek = (e) => {
  seek(parseFloat(e.target.value))
}

const handleVolumeChange = (e) => {
  setVolume(parseFloat(e.target.value))
}

onMounted(() => {
  if (playlist.value.length > 0) {
    loadTrack(playlist.value[0])
  }
})
</script>

<style scoped lang="scss">
.music-player {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 10px;
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
    color: #fff;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #aaa;
    font-size: 0.9rem;
  }
}

.player-controls {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.btn-play {
  background: #4a90e2;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #357abd;
    transform: scale(1.1);
  }
}

.player-progress {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  
  .time {
    color: #aaa;
    font-size: 0.8rem;
  }
}

.progress-bar,
.volume-bar {
  flex: 1;
  height: 5px;
  border-radius: 5px;
  outline: none;
  background: rgba(255, 255, 255, 0.2);
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #4a90e2;
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
  color: #aaa;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
  
  &.active {
    background: rgba(74, 144, 226, 0.3);
    color: #4a90e2;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
</style>
