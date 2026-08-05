import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** 页面切换过渡动画名 */
    transition?: 'fade' | 'slide-left' | 'slide-up'
  }
}
