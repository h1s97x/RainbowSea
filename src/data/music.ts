import { resolveAssetUrl } from '@/utils/asset'
import type { MusicTrack } from '@/types/music'

/** 音乐播放列表 */
export const MUSIC_LIST: MusicTrack[] = [
  {
    id: 1,
    title: 'Celebrity',
    artist: '星游记',
    src: resolveAssetUrl('assets/music/Celebrity.mp3')
  },
  {
    id: 2,
    title: 'The Rain',
    artist: '星游记',
    src: resolveAssetUrl('assets/music/The Rain.mp4')
  },
  {
    id: 3,
    title: '在飞行',
    artist: '星游记',
    src: resolveAssetUrl('assets/music/zaifeixing.mp3')
  },
  {
    id: 4,
    title: '天空之城',
    artist: '星游记',
    src: resolveAssetUrl('assets/music/天空之城.mp4')
  }
]
