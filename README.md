# 星游记 - Rainbow Sea Journey

基于 Vue 3 + Vite 构建的《星游记》动画展示网站。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Vue Router** - 官方路由管理器
- **GSAP** - 专业级动画库
- **Swiper** - 现代化轮播组件
- **Howler.js** - 音频处理库
- **Bootstrap 5** - CSS 框架
- **SCSS** - CSS 预处理器

## 功能特性

- ✨ 星空背景动画效果
- 🎵 背景音乐播放器
- 🖼️ 图片轮播展示
- 📱 响应式设计
- 🎨 流畅的页面动画
- 🎭 人物介绍展示
- 📖 剧情介绍
- 🖼️ 图片画廊（带灯箱效果）

## 项目结构

```
star-journey-vue/
├── public/                 # 静态资源
│   ├── assets/
│   │   ├── image/         # 图片资源
│   │   ├── fonts/         # 字体文件
│   │   └── music/         # 音乐文件
│   └── favicon.ico
├── src/
│   ├── assets/            # 源码资源
│   │   └── styles/        # 样式文件
│   ├── components/        # 组件
│   │   ├── layout/        # 布局组件
│   │   ├── common/        # 通用组件
│   │   └── effects/       # 特效组件
│   ├── views/             # 页面视图
│   ├── composables/       # 组合式函数
│   ├── router/            # 路由配置
│   ├── utils/             # 工具函数
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── index.html
├── package.json
└── vite.config.js

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

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

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

MIT License

## 作者

星游记开发团队

---

**版本**: 1.0.0  
**更新日期**: 2026-02-28
