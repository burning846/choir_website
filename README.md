# 合唱团网站

一个现代化的合唱团介绍网站，包含合唱团信息、指挥介绍、团员风采、作品展示和联系方式。

## 功能

- 合唱团简介与图片
- 指挥介绍与头像
- 团员风采与动态声部构成（来自 JSON）
- 视频作品列表（YouTube 链接）
- 联系与合作（二维码、联系方式）

## 技术栈

- React 18 + TypeScript + Vite 6
- React Router v7
- Tailwind CSS
- Lucide 图标
- Vitest + Testing Library（测试）

## 开发与构建

- 安装依赖：`npm install`
- 启动开发：`npm run dev`
- 运行测试：`npm run test`
- 类型检查：`npm run check`
- 生产构建：`npm run build`
- 预览构建：`npm run preview`

## 目录结构

```
src/
├── components/          # 页面组件
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Conductor.tsx
│   ├── Members.tsx
│   ├── Videos.tsx
│   ├── Performances.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── ErrorBoundary.tsx
├── pages/               # 路由页面
│   ├── Home.tsx
│   └── NotFound.tsx
├── context/             # 数据与状态
│   └── doc.tsx          # 集中数据层（useDocContext）
├── hooks/               # 自定义 Hooks
│   ├── useDoc.ts
│   ├── useMeta.ts       # SEO 元信息
│   └── useTheme.ts
├── lib/                 # 工具
│   ├── lang.tsx         # 语言切换
│   ├── logger.ts        # 日志与错误上报
│   └── types.ts
└── test/                # 测试辅助
    ├── setup.ts
    └── mocks.ts
```

## 数据与图片

- 文案与数据：`public/choir-doc.json`（中文）、`public/choir-doc.en.json`（英文）
- 本地图片路径（区分大小写）：`public/images`
  - 示例：`/images/sg60.jpg`、`/images/sota-15th.JPG`、`/images/3.jpg`
- 占位图（无图时回退）：`public/placeholder-avatar.svg`、`public/placeholder-banner.svg`

## 核心特性

### 1. 集中数据层
- 统一在 `DocProvider` 中加载中/英文 JSON，避免组件重复请求
- 组件通过 `useDocContext` 获取数据，性能与一致性更好

### 2. 错误处理与日志
- 全局 `ErrorBoundary` 捕获渲染错误，展示友好提示
- `logError` 统一日志接口，可对接 Sentry 等上报平台

### 3. SEO 与元信息
- `useMeta` Hook 集中写入 description/keywords
- 文档标题随语言切换自动更新

### 4. 404 兜底
- 未匹配路径自动跳转 `/404`，可一键返回首页

### 5. TypeScript 严格模式
- 已开启 `strict`、`noUnusedLocals/Parameters`，类型检查通过

### 6. 测试与 CI
- Vitest + Testing Library，覆盖路由、语言切换、数据层、占位图等场景
- GitHub Actions 自动执行安装、lint、typecheck、test、build

## 部署（Vercel）

- 推送到 `main` 分支自动部署
- 若线上与本地不一致：
  - 进入 Vercel 项目 → Deployments → 最新 Production → ⋯ → Purge Cache
  - 浏览器强制刷新或为资源加查询参数（如 `/images/sg60.jpg?v=ts`）

## 常见问题

- 图片 404：检查大小写是否一致（`.JPG` vs `.jpg`）
- 数据未更新：确认已修改对应 `choir-doc*.json`，并清缓存
- 图片加载失败：组件已内置本地回退（如指挥与演出回退到 `/placeholder-avatar.svg`）

## 后续建议

- 完善数据模型类型定义，按模块补强 Doc 类型与组件 props 类型
- 补充可访问性自动化校验（jest-axe）与快照测试
- 如需更强的数据缓存与重试策略，可增量引入 SWR/React Query 等库
- 错误上报可接入 Sentry，并将 sourcemap 上传至上报平台实现隐私与调试的平衡