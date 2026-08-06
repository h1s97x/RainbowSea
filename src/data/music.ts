import { resolveAssetUrl } from '@/utils/asset'
import type { MusicTrack } from '@/types/music'

/** 音乐播放列表：星游记（Rainbow Sea）真实音乐 */
export const MUSIC_LIST: MusicTrack[] = [
  {
    id: 1,
    title: '再飞行',
    artist: '逃跑计划',
    src: resolveAssetUrl('assets/music/zaifeixing.mp3')
  }
]
