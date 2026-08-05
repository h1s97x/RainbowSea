import { resolveAssetUrl } from '@/utils/asset'
import type { GalleryImage } from '@/types/gallery'

/** 画廊图片列表 */
export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, src: resolveAssetUrl('assets/image/1.jpg'), alt: '星游记 海报 1' },
  { id: 2, src: resolveAssetUrl('assets/image/12.jpg'), alt: '星游记 海报 2' },
  { id: 3, src: resolveAssetUrl('assets/image/43.jpg'), alt: '星游记 海报 3' },
  { id: 4, src: resolveAssetUrl('assets/image/6.jpg'), alt: '星游记 海报 4' },
  { id: 5, src: resolveAssetUrl('assets/image/111.jpg'), alt: '星游记 海报 5' },
  { id: 6, src: resolveAssetUrl('assets/image/xingyouji1.jpg'), alt: '星游记 海报 6' }
]
