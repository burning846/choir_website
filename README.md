# 合唱团网站

一个现代化的合唱团介绍网站，包含合唱团信息、指挥介绍、团员风采、作品展示和联系方式。

## 功能

- 合唱团简介与图片
- 指挥介绍与头像
- 团员风采与动态声部构成（来自 JSON）
- 视频作品列表（YouTube 链接）
- 联系与合作（二维码、联系方式）

## 技术栈

- React + TypeScript
- Vite
- Tailwind CSS
- Lucide 图标

## 开发与构建

- 安装依赖：`npm install`
- 启动开发：`npm run dev`
- 生产构建：`npm run build`
- 预览构建：`npm run preview`

## 目录结构

```
src/
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Conductor.tsx
│   ├── Members.tsx
│   ├── Videos.tsx
│   ├── Performances.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── MobileMenu.tsx
├── pages/Home.tsx
└── lib/lang.tsx
```

## 数据与图片

- 文案与数据：`public/choir-doc.json`（中文）、`public/choir-doc.en.json`（英文）
- 本地图片路径（区分大小写）：`public/images`
  - 示例：`/images/sg60.jpg`、`/images/sota-15th.JPG`、`/images/3.jpg`
- 注意：Vercel（Linux）区分大小写，确保 JSON 与文件名完全一致

## 部署（Vercel）

- 推送到 `main` 分支自动部署
- 若线上与本地不一致：
  - 进入 Vercel 项目 → Deployments → 最新 Production → ⋯ → Purge Cache
  - 浏览器强制刷新或为资源加查询参数（如 `/images/sg60.jpg?v=ts`）

## 常见问题

- 图片 404：检查大小写是否一致（`.JPG` vs `.jpg`）
- 数据未更新：确认已修改对应 `choir-doc*.json`，并清缓存
- 图片加载失败：组件已内置本地回退（如指挥与演出回退到 `/images/3.jpg`）
