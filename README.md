# 星游记 - Rainbow Sea

基于 Vue 3 + Vite 构建的《星游记》（Rainbow Sea）动画展示网站。

> 《星游记》由北京卡酷传媒等出品，2011 年首播，共 26 集，讲述少年麦当寻找传说中彩虹海的星际冒险故事。

## 在线预览

🌐 **访问地址**: https://h1s97x.github.io/RainbowSea/

## 技术栈

- **Vue 3.5** - 渐进式 JavaScript 框架（Composition API + `<script setup>`）
- **Vite 8** - 下一代前端构建工具（稳定正式版）
- **Vue Router 4** - 官方路由管理器
- **Pinia 4** - 全局状态管理（音乐/加载）
- **TypeScript 5** - 类型安全（渐进式迁移）
- **GSAP** - 专业级动画库
- **Swiper** - 现代化轮播组件
- **Howler.js** - 音频处理库
- **SCSS** - CSS 预处理器（设计 Token）
- **ESLint + Prettier** - 代码规范

## 功能特性

- ✨ 星空背景动画效果
- 🎵 背景音乐播放器（全局状态 + 持久化）
- 🖼️ 图片轮播展示
- 📱 响应式设计
- 🎨 流畅的页面动画（GSAP + v-reveal 指令）
- 🎭 人物介绍展示
- 📖 剧情介绍
- 🖼️ 图片画廊（带灯箱 + 键盘支持）

## 项目结构

```
RainbowSea/
├── public/                 # 静态资源
│   ├── assets/
│   │   ├── image/         # 图片资源
│   │   └── music/         # 音乐文件
│   ├── 404.html           # SPA 路由兜底
│   └── favicon.ico
├── src/
│   ├── assets/            # 源码资源
│   │   └── styles/        # 样式文件
│   ├── components/        # 组件
│   │   ├── layout/        # 布局组件
│   │   ├── common/        # 通用组件
│   │   └── effects/       # 特效组件
│   ├── data/              # 数据层（内容与代码解耦）
│   ├── stores/            # Pinia 状态层
│   ├── types/             # 类型定义
│   ├── directives/        # 自定义指令（v-reveal）
│   ├── views/             # 页面视图
│   ├── composables/       # 组合式函数
│   ├── router/            # 路由配置
│   ├── utils/             # 工具函数
│   ├── App.vue            # 根组件
│   └── main.ts            # 入口文件
├── index.html
├── package.json
└── vite.config.js
```

## 开发指南

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 类型检查

```bash
npm run type-check
```

### 代码规范

```bash
npm run lint        # 修复可自动修复的问题
npm run lint:check  # 仅检查
npm run format      # 格式化
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 部署

项目已配置 GitHub Actions 自动部署到 GitHub Pages。

### 自动部署

推送到 main 分支会自动触发部署：

```bash
git push origin main
```

### 手动部署

1. 进入 GitHub 仓库的 Actions 标签
2. 选择 "Deploy to GitHub Pages" 工作流
3. 点击 "Run workflow"

详细部署说明请查看 [部署指南](./docs/部署指南.md)

## 文档导航

- [架构方案](./docs/架构方案.md) - 技术栈选型 / 目标架构 / 迁移路线 / ADR
- [Nuxt 3 迁移路线评估](./docs/Nuxt3迁移路线评估.md) - 迁移 Nuxt 3 的专项评估（当前不建议，留作预案）
- [改造方案](./docs/改造方案.md) - 早期方案对比
- [部署指南](./docs/部署指南.md) - GitHub Pages 部署说明

## 页面说明

- **首页** (`/`) - 展示轮播图和简介
- **人物介绍** (`/characters`) - 展示主要角色
- **剧情介绍** (`/episodes`) - 展示剧集信息
- **图片画廊** (`/gallery`) - 图片展示和灯箱效果

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可证

本项目基于 [MIT License](./LICENSE) 开源发布。

版权所有 © 2026 h1s97x (QAQ)

你可以自由地使用、复制、修改、合并、发布、分发、再许可和/或销售本软件的副本，但需保留上述版权声明和许可声明。本软件按"原样"提供，不附带任何明示或暗示的担保。

> 完整条款请参阅 [LICENSE](./LICENSE) 文件。

## 作者

星游记开发团队

---

**版本**: 1.2.0  
**更新日期**: 2026-08-05
