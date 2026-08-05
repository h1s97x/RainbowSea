/**
 * 通用工具函数
 */

/** 防抖函数 */
export function debounce<T extends (...args: never[]) => void>(fn: T, delay = 300): T {
  let timer: ReturnType<typeof setTimeout> | null = null
  return function (this: unknown, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  } as T
}

/** 节流函数 */
export function throttle<T extends (...args: never[]) => void>(fn: T, delay = 300): T {
  let lastTime = 0
  return function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now()
    if (now - lastTime >= delay) {
      fn.apply(this, args)
      lastTime = now
    }
  } as T
}

/** 格式化时间（秒 → mm:ss） */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

/** 随机数生成（含 min/max） */
export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
