# 迁移到 Nuxt 3 的路线评估

> **文档版本**：v1.0
> **更新日期**：2026-08-05
> **维护者**：CodeBuddy
> **前置阅读**：[架构方案](./架构方案.md)、[改造方案](./改造方案.md)
> **结论先行**：**现阶段不建议迁移 Nuxt 3**。若未来出现 SEO / 多页面内容型扩展 / 前后端同仓需求，本文档提供可落地的渐进式迁移路线（预计 5~8 人日 + 约 1.5 倍代码改动量）。

---

## 目录

1. [评估背景](#一评估背景)
2. [动机与收益（为什么考虑 Nuxt 3）](#二动机与收益为什么考虑-nuxt-3)
3. [迁移影响面盘点（改什么）](#三迁移影响面盘点改什么)
4. [SSR 化对现有代码的改造点（难点清单）](#四ssr-化对现有代码的改造点难点清单)
5. [迁移路线图（怎么做）](#五迁移路线图怎么做)
6. [成本 / 收益 / 风险对比](#六成本--收益--风险对比)
7. [决策建议与触发条件](#七决策建议与触发条件)
8. [附：Nuxt 3 目标目录与关键文件示例](#八附nuxt-3-目标目录与关键文件示例)

---

## 一、评估背景

项目现状（PR #8 落地后）：

| 维度       | 现状                                                                                          |
| ---------- | --------------------------------------------------------------------------------------------- |
| 框架       | Vue 3.5 + Vite 8（SPA，`createWebHistory`，4 个路由页面）                                      |
| 状态       | Pinia 4（music / loading store，localStorage 持久化）                                          |
| 数据       | `src/data/` TS 强类型（characters / episodes / gallery / music / carousel）                    |
| 动画       | GSAP + ScrollTrigger、Swiper、v-reveal 指令、Howler.js（音乐）                                 |
| 部署       | GitHub Pages（`/RainbowSea/` 子路径），`public/404.html` SPA 兜底                              |
| 仓库体积   | `reference/` 旧站 55MB + `public/assets` 47MB，资源大头在图片/音乐                              |
| 代码规模   | `src/` 约 2200 行，4 个视图 + 7 个组件 + 数据/状态/工具层已 TS 化                              |

本文档回答三个问题：

1. 为什么要迁 Nuxt 3？收益是否真实？
2. 迁移要动哪些代码、踩哪些坑？
3. 如果未来要迁，怎么迁最平滑？

---

## 二、动机与收益（为什么考虑 Nuxt 3）

Nuxt 3 相对当前 Vite SPA 的核心差异与收益：

| 收益点             | 说明                                                                                      | 对本项目的价值 |
| ------------------ | ----------------------------------------------------------------------------------------- | -------------- |
| **SSR / SEO**      | 服务端渲染 HTML，搜索引擎、社交爬虫可直接抓取正文；`useHead` 管理每页 meta                | 🟡 低（展示站）|
| **文件路由**       | `pages/` 目录即路由，无需手写 `router/index.ts`                                           | 🟢 低（仅 4 页）|
| **自动导入**       | 组件 / composables / 工具自动导入，省 import                                              | 🟢 低（代码量小）|
| **数据获取**       | `useAsyncData` / `useFetch`，数据层可平滑接后端或 CMS                                     | 🟡 中（未来内容扩展）|
| **前后端同仓**     | `server/` 目录可写 Nitro API 或中间件，一套代码部署                                        | 🟡 中（暂不需要后端）|
| **部署灵活**       | 静态生成（`nuxt generate`）仍可部署 GitHub Pages；或换 Node / 边缘运行时                  | 🟢 低（当前 Pages 可用）|
| **生态完整**       | 模块化（seo / sitemap / image / content），官方维护                                       | 🟡 中 |

**对本项目的真实增量**：

- 站点是**纯展示型**内容站，无动态数据、无登录、无 SEO 流量诉求，SSR 的核心收益（SEO / 首屏）在 GitHub Pages + 静态化场景下收益有限。
- 现有 4 个页面已实现懒加载 + 分包 + 图片懒加载，首屏体验已可控。
- 最大价值反而在**内容管理**方向：若未来剧集/角色数据要接入 CMS 或 Markdown（`@nuxt/content`），Nuxt 会更顺。

---

## 三、迁移影响面盘点（改什么）

### 3.1 可直接复用的部分（零/低改动）

| 模块                      | 说明                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| `src/data/*`（TS 数据层） | 与框架无关，直接搬入 `app/data/` 或保留 `utils/data`                                        |
| `src/types/*`             | 纯类型，直接复用                                                                           |
| `src/stores/*`（Pinia）   | Nuxt 官方支持 Pinia（`@pinia/nuxt`），store 定义基本不变，**但 localStorage 需要兼容处理** |
| `src/components/` 组件    | 大部分 SFC 模板/逻辑可复用；**需核查浏览器 API 调用点（见 4.x）**                           |
| GSAP / Swiper / Howler    | 客户端侧库，SSR 需要动态导入或 `ClientOnly`，用法不变                                       |
| SCSS 样式                 | 迁移到 `assets/scss`，`nuxt.config` 全局注入即可                                            |

### 3.2 需要重写/调整的部分

| 模块                    | 改动量 | 说明                                                                                       |
| ----------------------- | ------ | ------------------------------------------------------------------------------------------ |
| **项目骨架**            | 中     | 新建 Nuxt 项目，迁移 `vite.config.js` → `nuxt.config.ts`（base、alias、css、build 分包等） |
| **路由**                | 低     | 删除 `router/index.ts`，改为 `pages/` 文件路由（4 个页面 → 4 个 `pages/*.vue`）            |
| **入口 / App.vue**      | 中     | 删除 `main.ts`，逻辑迁到 `app.vue` + `nuxt.config`；全局指令 v-reveal 用 `app.vue` 注册     |
| **页面切换动画**        | 中     | 现有 `<transition>` 需改为 Nuxt `<NuxtPage :transition>` 配置（或 `<NuxtLayout>` 内处理）  |
| **加载页 Loading.vue**  | 中     | `window.load` 监听在 SSR 不存在；改为 `onMounted` 后逻辑 + 首屏判定                          |
| **部署流水线**          | 中     | GitHub Pages 部署从 `vite build` → `nuxt generate`；子路径需 `NITRO_PRESET=github_pages`    |
| **404 处理**            | 低     | `nuxt generate` 自带 `404.html`（`error.vue` 更佳）；现有 `public/404.html` 可替换          |

---

## 四、SSR 化对现有代码的改造点（难点清单）

> 这是迁移中**最容易翻车**的部分，也是"看起来简单、实际要反复踩坑"的区域。

### 4.1 浏览器 API 直接调用（必须改）

| 文件/位置                      | 问题                                                                                     | 方案                                   |
| ------------------------------ | ---------------------------------------------------------------------------------------- | -------------------------------------- |
| `stores/music.ts` 的 `localStorage` | 初始化 `loadPersisted()` 在模块/`setup` 阶段执行，SSR 侧无 `window` 会 **ReferenceError** | 延迟到 `onMounted`/`client` 插件中初始化 |
| `stores/music.ts` 的 `Howl`    | `new Howl(...)` 是客户端音频实例，SSR 不能创建                                            | 仅在 `onMounted` 后创建，store 拆成"状态+动作" |
| `Loading.vue` 的 `window.load` | SSR 阶段 `window` 未定义                                                                | `onMounted` 里再监听                   |
| `directives/vReveal.ts` 的 `IntersectionObserver` | SSR 无此 API                                                                             | 指令仅客户端生效（`v-if` 包或插件客户端注册） |
| `useScroll.ts` / `useAnimation.ts` 中的 `window`/`document` | GSAP 部分动画 API 依赖 DOM                                                              | `ClientOnly` / `onMounted` 后再执行     |
| 字体、Google Fonts 预连接     | `index.html` 头部资源迁移                                                                 | `app.head` / `useHead` / 模块管理       |

### 4.2 隐藏问题

- **`import.meta.env.BASE_URL`**：Nuxt 中是 `useRuntimeConfig().app.baseURL`，`resolveAssetUrl` 需改造。
- **静态资源路径**：`public/assets/*` 在 Nuxt 中同样放 `public/`，但**子路径部署**（`/RainbowSea/`）需在 `nuxt.config` 设 `app.baseURL`，否则资源 404。
- **Pinia 持久化时机**：SSR 首屏渲染时 store 未从 localStorage 恢复 → 客户端 hydrate 后**闪烁/不一致**，需要"恢复后再显示播放器"或接受 SSR 无状态快照。
- **Swiper / GSAP 的 CSS**：`swiper/css` 等全局样式需在 `nuxt.config.css` 注册，避免 SSR 打包顺序问题。
- **`<script setup>` 与异步组件**：Suspense 语义在 Nuxt 页面级有差异，现有 `transition` 切换动画需重新验证。

### 4.3 需要"延迟到客户端"的清单（快速自查表）

| 类别             | 处理方式                                    |
| ---------------- | ------------------------------------------- |
| localStorage     | `onMounted` 或 `client` 插件                |
| window/document  | `onMounted` / `ClientOnly` / `client-only`  |
| IntersectionObserver | `ClientOnly` 或指令按环境注册           |
| Howler / Audio   | `onMounted` 创建，store 只存状态            |
| GSAP 动画        | `onMounted` + `gsap.context.revert()`       |

---

## 五、迁移路线图（怎么做）

> 若未来确定要迁移，建议**保留现有 Vite SPA 分支**，用"旁路新建 + 并行验证"的方式，避免一次推倒重来。

### Phase N0：可行性验证（0.5~1 人日）

- 新建 Nuxt 3 项目（`npx nuxi init`），仅迁移 1 个页面（Home）跑通 SSR + 静态生成。
- 验证：GitHub Pages 子路径部署、Swiper/GSAP/Howler 在 `ClientOnly` 下正常、`nuxt generate` 产出可访问。
- **退出条件**：任一项验证失败 → 中止迁移，回到原地优化路线。

### Phase N1：骨架与路由迁移（1~1.5 人日）

- `pages/index.vue` / `pages/characters.vue` / `pages/episodes.vue` / `pages/gallery.vue`。
- `app.vue` 注册全局指令与布局；`nuxt.config` 迁移 alias / css / baseURL / build 分包。
- 页面切换动画改为 `NuxtPage :transition` 配置。
- 删除 `src/main.ts`、`src/router/`、`index.html`。

### Phase N2：状态与浏览器 API 适配（1~2 人日）

- `@pinia/nuxt` 接入；`music` store 拆分"状态（可 SSR）+ 音频副作用（仅客户端）"。
- `loading` store 改为客户端首屏判定；`v-reveal` / GSAP 动画统一 `onMounted` 执行。
- 引入 `nuxtjs/device` 或自写 `useIsClient` 辅助判断（如需）。

### Phase N3：资源与部署迁移（1~1.5 人日）

- `public/assets` 资源原样迁移；`resolveAssetUrl` 改用 `baseURL` runtime config。
- 部署改为 `nuxt generate`（`NITRO_PRESET=github_pages`），替换 `404.html` 为 `error.vue`。
- GitHub Actions 中 `npm run build` → `npm run generate`，验证 `/RainbowSea/` 下所有页面与资源 200。

### Phase N4：内容数据源升级（可选，1~2 人日）

- 若需内容管理：接入 `@nuxt/content`（Markdown 写角色/剧集）或 `useFetch` 接后端。
- 用 `useHead`/`useSeoMeta` 补每页 SEO meta、`sitemap` 模块。

**合计**：5~8 人日（不含排错 buffer），建议留 **20~30% buffer**，实际按 8~10 人日估算更稳妥。

---

## 六、成本 / 收益 / 风险对比

| 维度         | 原地优化（现状/PR #8）                        | 迁移 Nuxt 3                                          |
| ------------ | --------------------------------------------- | ---------------------------------------------------- |
| 改代码量     | 已基本完成（P1+P2）                           | 预计 **~1.5 倍**（约 2200 行 → 需要逐文件核对浏览器 API） |
| 构建/部署    | Vite 稳定版 + GitHub Pages ✅                  | Nitro 静态化 + GitHub Pages，需重调子路径与 404      |
| 首屏/SEO     | SPA，需额外预渲染方案                         | SSR/静态化，正文可被爬虫抓取                         |
| 动画/音频    | 现有代码直接跑                                 | 需 `ClientOnly` + onMounted 改造，风险集中在动画库   |
| 内容扩展     | 手动加数据 / 后续接 JSON                       | `@nuxt/content` / `useFetch` 更顺                    |
| 学习成本     | 现有团队熟悉 Vue 3                            | Nuxt 概念（Nitro/模块/自动导入）需新学                |
| 依赖规模     | ~30 个直接依赖                                | 100+ 依赖（Nuxt 全家桶），构建更重                   |
| 长期维护     | 轻量、可控                                    | 框架约束更强，但生态标准统一                         |

**风险矩阵（迁移 Nuxt 3）**：

| 风险                         | 等级 | 预案                                                                 |
| ---------------------------- | ---- | -------------------------------------------------------------------- |
| SSR 水合不一致（音乐/加载）  | 🔴 高 | store 拆状态与副作用；播放器 `ClientOnly`；SSR 渲染占位              |
| GSAP/Swiper/Howler 客户端库  | 🔴 高 | 统一 `onMounted` + `ClientOnly`，先做单页验证（Phase N0）            |
| GitHub Pages 子路径 404      | 🟡 中 | `app.baseURL=/RainbowSea/` + `NITRO_PRESET=github_pages`，预发布验证 |
| 动画切换/transition 差异     | 🟡 中 | `NuxtPage :transition` 配置替代，回归 4 个页面动画                    |
| 依赖体积与构建时间增长       | 🟢 低 | 按需模块，勿装未使用模块                                             |

---

## 七、决策建议与触发条件

### 7.1 建议

**结论：当前（2026-08）不建议迁移 Nuxt 3。**

理由（与 `架构方案.md` ADR-001 一致）：

1. 项目是 4 页纯展示站，无 SSR/SEO 刚需，收益不足以覆盖改造成本与风险；
2. 刚完成 Vite 稳定化 + Pinia + TS 骨架，正是收益最大的阶段，换框架等于浪费这次投入；
3. 动画/音频是本项目核心体验，SSR 化会引入水合不一致与客户端库适配风险，得不偿失。

### 7.2 触发迁移的信号（满足 ≥2 条再启动）

- [ ] 需要**可被搜索引擎/社交平台抓取的正文 SEO**（如做角色/剧集详情页被检索）；
- [ ] 内容量扩大（剧集/角色/文章成百上千），需要 **Markdown/CMS 内容管线**；
- [ ] 出现**动态数据**（评论、用户偏好、接口聚合），不再纯静态；
- [ ] 需要**前后端同仓**部署（Nitro server/api）；
- [ ] 部署目标从 GitHub Pages 切换到 Node/边缘运行时。

### 7.3 若未来迁移，遵循的 4 条纪律

1. **旁路新建**：保留当前 SPA 分支（`auto/arch-optimize-*`），新开 `feature/nuxt3`，两版并行，验收通过再切换；
2. **先验证后铺开**：Phase N0 单页跑通 SSR+静态化+子路径，任一关键项失败即回退；
3. **数据/类型层零改动**：`src/data`、`src/types` 作为公共资产直接复用，作为迁移的"稳定边界"；
4. **渐进式替换**：先迁骨架与路由，再适配状态/浏览器 API，最后再谈内容数据源，每步可独立回滚。

---

## 八、附：Nuxt 3 目标目录与关键文件示例

### 8.1 目标目录（基于现有代码映射）

```
rainbowsea-nuxt/
├── app.vue                     # 原 App.vue + v-reveal 指令注册
├── error.vue                   # 替代 public/404.html
├── nuxt.config.ts              # 原 vite.config.js 迁移
├── pages/
│   ├── index.vue               # views/Home.vue
│   ├── characters.vue          # views/Characters.vue
│   ├── episodes.vue            # views/Episodes.vue
│   └── gallery.vue             # views/Gallery.vue
├── components/
│   ├── layout/  common/  effects/   # 原样迁移，加 ClientOnly 按需包裹
├── stores/
│   ├── music.ts                # 拆“状态”与“音频副作用”
│   └── loading.ts              # 客户端首屏判定
├── data/  types/  utils/       # 原 src/data、src/types、src/utils 直接复用
├── composables/
│   ├── useAnimation.ts         # onMounted 执行
│   └── useIsClient.ts          # 新增：客户端环境判断
├── assets/scss/                # 原 src/assets/styles
└── public/assets/              # 原 public/assets 原样迁移
```

### 8.2 关键配置示例

```ts
// nuxt.config.ts（核心差异点）
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  css: ['~/assets/scss/main.scss', 'swiper/css', 'swiper/css/navigation'],
  app: {
    baseURL: '/RainbowSea/', // 子路径部署关键
    head: {
      title: '星游记 - Rainbow Sea Journey',
      link: [{ rel: 'icon', href: '/RainbowSea/favicon.ico' }]
    }
  },
  nitro: {
    preset: 'github_pages' // 静态化部署
  },
  build: {
    // 原 vite manualChunks 分包思路迁移
  },
  typescript: { strict: true }
})
```

```ts
// stores/music.ts 改造要点（拆副作用）
// 状态部分：可在 SSR 初始化（无音频实例）
export const useMusicStore = defineStore('music', () => {
  // ...纯状态：currentTrack / isPlaying / currentTime / volume
  // 副作用部分（Howl 实例、progressTimer）改为仅在 onMounted 后初始化
})
```

```vue
<!-- pages/index.vue 中客户端库的兜底写法 -->
<template>
  <ClientOnly>
    <SwiperComponent />
  </ClientOnly>
</template>
```

---

## 附：评估结论速览

| 问题                   | 结论                                            |
| ---------------------- | ----------------------------------------------- |
| 现在要不要迁 Nuxt 3？  | ❌ 不建议，收益 < 成本与风险                     |
| 什么时候迁？           | 触发条件 ≥2 条时再启动（见 7.2）                |
| 迁一次要多久？         | 5~8 人日（含 buffer 按 8~10 人日）              |
| 代码改动量？           | 约 1.5 倍，集中在浏览器 API / 部署 / 路由骨架    |
| 最大风险？             | SSR 水合不一致（音乐/加载）+ 客户端库适配        |
| 最稳的迁移方式？       | 旁路新建 + Phase N0 单页验证 + 数据/类型层复用   |
| 现有架构方案的立场？   | 与 ADR-001 一致：坚守 Vue 3 原地优化，Nuxt 留作未来预案 |

---

_本文档为评估性文档，不改变 `docs/架构方案.md` 的既定路线；若未来触发迁移，将基于本文更新架构方案。_
