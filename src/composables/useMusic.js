import { ref } from 'vue'
import { Howl } from 'howler'

export function useMusic() {
  const currentTrack = ref(null)
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const volume = ref(0.7)
  
  let sound = null
  let progressInterval = null

  const loadTrack = (track) => {
    if (sound) {
      sound.unload()
    }

    sound = new Howl({
      src: [track.src],
      html5: true,
      volume: volume.value,
      onload: () => {
        duration.value = sound.duration()
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

    currentTrack.value = track
  }

  const play = () => {
    if (sound) {
      sound.play()
    }
  }

  const pause = () => {
    if (sound) {
      sound.pause()
    }
  }

  const togglePlay = () => {
    if (isPlaying.value) {
      pause()
    } else {
      play()
    }
  }

  const seek = (time) => {
    if (sound) {
      sound.seek(time)
      currentTime.value = time
    }
  }

  const setVolume = (vol) => {
    volume.value = vol
    if (sound) {
      sound.volume(vol)
    }
  }

  const startProgressUpdate = () => {
    progressInterval = setInterval(() => {
      if (sound && isPlaying.value) {
        currentTime.value = sound.seek()
      }
    }, 100)
  }

  const stopProgressUpdate = () => {
    if (progressInterval) {
      clearInterval(progressInterval)
      progressInterval = null
    }
  }

  return {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    loadTrack,
    play,
    pause,
    togglePlay,
    seek,
    setVolume
  }
}
