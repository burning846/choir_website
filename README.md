# 咏歌堂合唱团 (Konzert Singers) 官方网站

[![Build Status](https://github.com/burning846/choir_website/actions/workflows/ci.yml/badge.svg)](https://github.com/burning846/choir_website/actions)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

一个现代化的双语合唱团官方网站，包含合唱团信息、指挥介绍、团员风采、作品展示、演出详情（包含节目单与歌词）以及联系方式。

## 功能特性

- **响应式设计**：完美适配移动端、平板与桌面端。
- **双语支持 (i18n)**：支持中英文一键无缝切换，数据完全解耦。
- **深色模式 (Dark Mode)**：支持明暗主题切换，自动跟随系统偏好设置。
- **动态数据驱动**：合唱团简介、成员声部、演出曲目、歌词与翻译均通过配置化数据动态渲染。
- **丰富的页面模块**：
  - 合唱团简介与历史
  - 艺术总监与指挥介绍
  - 动态分类的各声部团员风采
  - 视频作品展示
  - 演出活动预告与回顾
- **独立演出落地页**：
  - `/firstchord`：咏歌堂首演专场音乐会《咏歌·初韵》主视觉与信息页。
  - `/performance-may-10`：深度展示《咏歌·初韵》详细的中英文节目单、作曲家介绍以及全套歌词翻译。

## 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite 6
- **路由管理**：React Router v7
- **样式方案**：Tailwind CSS (支持 Dark Mode 与自定义动画)
- **图标库**：Lucide React
- **数据验证**：Zod
- **测试框架**：Vitest + Testing Library

## 目录结构

```text
src/
├── components/          # 可复用页面模块与 UI 组件
├── context/             # 全局状态管理 (Doc, Theme)
├── data/                # 核心配置化数据 (TS/JSON)
│   ├── choir-doc.ts           # 主页全局数据
│   ├── firstchord.ts          # 《咏歌·初韵》演出主页数据
│   └── performance-may-10.ts  # 详细节目单与双语歌词数据
├── hooks/               # 自定义 Hooks (useDoc, useTheme, useMeta)
├── lib/                 # 核心工具 (i18n, Zod schemas, logger)
├── pages/               # 独立路由页面 (Home, FirstChord, NotFound 等)
└── test/                # 测试配置与 Mocks
public/
└── images/              # 静态图片资源
```

## 开发与构建

1. **安装依赖**
   ```bash
   npm install
   ```
2. **启动本地开发服务器**
   ```bash
   npm run dev
   ```
3. **运行单元测试**
   ```bash
   npm run test
   ```
4. **类型检查与代码检查**
   ```bash
   npm run check
   npm run lint
   ```
5. **生产环境构建**
   ```bash
   npm run build
   ```

## 核心架构设计

### 1. 静态数据驱动
摒弃了复杂的后端请求，网站所有文案、演出信息、歌词翻译均通过 `src/data/` 目录下的静态 TypeScript 对象管理，实现极致的首屏加载速度和优异的 SEO 表现。

### 2. 主题与国际化 (Theme & i18n)
- 实现了统一的 `ThemeProvider` 与 `LangProvider`。
- 页面右下角提供了全局悬浮的控制按钮 (Floating Action Buttons)，方便用户随时切换中英文及明暗主题。

### 3. 测试与 CI/CD
- 配置了极其严格的 TypeScript 类型推导与 ESLint 校验。
- 核心逻辑（数据 Provider、路由回退、国际化切换、组件渲染）均有完善的单元测试覆盖。
- 集成了 GitHub Actions 工作流，每次 Push 会自动运行 Lint、TypeCheck、Test 与 Build。

## 部署说明 (Vercel)

本项目已无缝集成 **Vercel** 进行持续部署：
- 任何推送到 `main` 分支的代码均会自动触发线上生产环境的构建与发布。
- **自定义域名**：支持绑定自有域名（例如 `konzertsingers.sg` 及 `www.konzertsingers.sg`），Vercel 将自动签发并续期 SSL 证书。
- **单页应用路由支持**：已在 `vercel.json` 中配置了路由重写 (`rewrites`)，确保用户直接访问子页面（如 `/firstchord`）时不会出现 404 错误。