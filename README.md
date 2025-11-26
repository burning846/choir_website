# 星光合唱团官方网站

一个现代化的合唱团介绍网站，包含合唱团信息、指挥介绍、团员风采、作品展示和联系方式。

## 功能特色

- 🎵 合唱团详细介绍
- 👨‍🎤 指挥个人介绍和成就展示
- 👥 团员信息展示和声部构成
- 📺 YouTube视频作品集成
- 📞 联系方式和在线表单
- 📱 完全响应式设计
- 🎨 现代化UI设计
- ⚡ 快速加载和优化

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **图标库**: Lucide React
- **路由**: React Router DOM

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境

```bash
npm run dev
```

### 构建项目

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 项目结构

```
src/
├── components/          # 可复用组件
│   ├── Header.tsx      # 网站头部
│   ├── Hero.tsx        # 英雄区域
│   ├── About.tsx       # 合唱团介绍
│   ├── Conductor.tsx   # 指挥介绍
│   ├── Members.tsx     # 团员风采
│   ├── Videos.tsx      # 作品展示
│   ├── Contact.tsx     # 联系方式
│   ├── Footer.tsx      # 页脚
│   ├── ScrollToTop.tsx # 返回顶部
│   └── MobileMenu.tsx  # 移动端菜单
├── pages/              # 页面组件
│   └── Home.tsx        # 首页
└── App.tsx             # 应用入口
```

## 部署指南

### 1. 构建项目

```bash
npm run build
```

### 2. 部署到Vercel（推荐）

1. 访问 [Vercel](https://vercel.com)
2. 导入GitHub仓库
3. 自动部署

### 3. 部署到Netlify

1. 访问 [Netlify](https://netlify.com)
2. 拖拽`dist`文件夹到网站
3. 自动获得域名

### 4. 其他部署方式

- GitHub Pages
- Firebase Hosting
- 阿里云OSS
- 腾讯云COS

## 域名购买建议

### 推荐域名注册商

1. **阿里云万网** - 国内用户首选
   - .com域名：约60元/年
   - .cn域名：约30元/年

2. **腾讯云DNSPod** - 稳定可靠
   - .com域名：约55元/年
   - 经常有新用户优惠

3. **Namecheap** - 国外知名
   - .com域名：约$10/年
   - 免费Whois隐私保护

4. **GoDaddy** - 全球最大
   - .com域名：约$12/年
   - 中文界面支持

### 域名建议

- `starlightchoir.com` - 星光合唱团（推荐）
- `starlight-choir.com` - 带连字符
- `xingguang-choir.com` - 拼音版本
- `choir-starlight.com` - 反向组合

### 域名选择建议

1. **简短易记** - 避免过长和复杂
2. **品牌相关** - 与合唱团名称相关
3. **后缀选择** - .com优先，.cn适合国内
4. **避免数字** - 除非有特殊含义
5. **检查商标** - 避免侵权风险

## 自定义配置

### 修改合唱团信息

编辑相应的组件文件，更新以下内容：

- `src/components/About.tsx` - 合唱团基本信息
- `src/components/Conductor.tsx` - 指挥信息
- `src/components/Members.tsx` - 团员信息
- `src/components/Videos.tsx` - YouTube视频ID
- `src/components/Contact.tsx` - 联系方式

### 更换图片

替换组件中的图片URL，建议使用：

- 高质量合唱团照片
- 专业指挥肖像
- 团员集体照和个人照
- 演出现场照片

### 颜色主题

在Tailwind配置中修改颜色方案，当前使用：

- 主色：紫色到蓝色渐变
- 辅助色：黄色和橙色
- 背景：浅色渐变

## SEO优化

### 元标签

在`index.html`中添加：

```html
<meta name="description" content="星光合唱团官方网站，欣赏美妙的合唱演出，了解我们的历史和成就。">
<meta name="keywords" content="合唱团,合唱演出,音乐演出,星光合唱团">
```

### Open Graph

```html
<meta property="og:title" content="星光合唱团">
<meta property="og:description" content="用音乐点亮生活，用和声温暖人心">
<meta property="og:image" content="/og-image.jpg">
```

## 性能优化

- 图片懒加载
- 代码分割
- 资源压缩
- CDN加速

## 维护建议

1. **定期更新内容** - 保持信息新鲜
2. **备份数据** - 定期备份网站文件
3. **监控性能** - 使用分析工具
4. **安全更新** - 及时更新依赖

## 联系方式

如有问题或建议，请通过以下方式联系：

- 邮箱：info@starlightchoir.com
- 电话：+86 138-0000-0000

---

让音乐点亮生活，用和声温暖人心 🎵
