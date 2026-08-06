import { defineStore } from 'pinia'
import { Howl } from 'howler'
import { ref } from 'vue'
import { MUSIC_LIST } from '@/data/music'
import type { MusicTrack } from '@/types/music'
import { MUSIC_STORAGE_KEY, DEFAULT_VOLUME } from '@/constants'

interface PersistedMusic {
  volume: number
  currentTrackId: number | null
}

function loadPersisted(): PersistedMusic {
  try {
    const raw = localStorage.getItem(MUSIC_STORAGE_KEY)
    if (!raw) return { volume: DEFAULT_VOLUME, currentTrackId: null }
    const parsed = JSON.parse(raw) as Partial<PersistedMusic>
    return {
      volume: typeof parsed.volume === 'number' ? parsed.volume : DEFAULT_VOLUME,
      currentTrackId: typeof parsed.currentTrackId === 'number' ? parsed.currentTrackId : null
    }
  } catch {
    return { volume: DEFAULT_VOLUME, currentTrackId: null }
  }
}

/** 全局音乐播放器状态（跨页面共享，音量/曲目持久化） */
export const useMusicStore = defineStore('music', () => {
  const currentTrack = ref<MusicTrack | null>(null)
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const volume = ref(loadPersisted().volume)
  const playlist = ref<MusicTrack[]>(MUSIC_LIST)

  // Howl 实例与进度定时器（运行期内部状态，不参与响应式）
  let sound: Howl | null = null
  let progressTimer: ReturnType<typeof setInterval> | null = null

  function persist() {
    try {
      localStorage.setItem(
        MUSIC_STORAGE_KEY,
        JSON.stringify({ volume: volume.value, currentTrackId: currentTrack.value?.id ?? null })
      )
    } catch {
      // localStorage 不可用时静默失败
    }
  }

  function stopProgressUpdate() {
    if (progressTimer) {
      clearInterval(progressTimer)
      progressTimer = null
    }
  }

  function startProgressUpdate() {
    stopProgressUpdate()
    progressTimer = setInterval(() => {
      if (sound && isPlaying.value) {
        currentTime.value = sound.seek()
      }
    }, 100)
  }

  function loadTrack(track: MusicTrack) {
    if (sound) {
      sound.unload()
      sound = null
    }
    stopProgressUpdate()

    currentTrack.value = track
    currentTime.value = 0
    duration.value = 0

    sound = new Howl({
      src: [track.src],
      html5: true,
      volume: volume.value,
      onload: () => {
        duration.value = sound!.duration()
      },
      onplay: () => {
        isPlaying.value = true
        startProgressUpdate()
      },
      onpause: () => {
        isPlaying.value = false
        stopProgressUpdate()
      },
      onend: () => {
        isPlaying.value = false
        currentTime.value = 0
        stopProgressUpdate()
      }
    })

    persist()
  }

  function play() {
    sound?.play()
  }

  function pause() {
    sound?.pause()
  }

  function togglePlay() {
    if (isPlaying.value) {
      pause()
    } else {
      play()
    }
  }

  function seek(time: number) {
    if (sound) {
      sound.seek(time)
      currentTime.value = time
    }
  }

  function setVolume(value: number) {
    volume.value = value
    sound?.volume(value)
    persist()
  }

  /** 从持久化状态恢复（在应用启动时调用） */
  function restore() {
    const persisted = loadPersisted()
    volume.value = persisted.volume
    const track = playlist.value.find((t) => t.id === persisted.currentTrackId) ?? null
    if (track) {
      loadTrack(track)
    }
  }

  return {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    playlist,
    loadTrack,
    play,
    pause,
    togglePlay,
    seek,
    setVolume,
    restore
  }
})
