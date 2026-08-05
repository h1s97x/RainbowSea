/**
 * 资源路径工具
 * 统一基于 Vite 的 BASE_URL 拼接静态资源路径，兼容子路径部署。
 */
export function resolveAssetUrl(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}
