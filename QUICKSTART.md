# 快速启动指南 🚀

本指南帮助您快速启动福州大学新时代思政教育平台首页。

## 📋 前置要求

- Node.js >= 16.x
- npm >= 8.x 或 pnpm >= 7.x

## 🔧 安装步骤

### 1. 安装依赖

```bash
cd zhihuishu-app
npm install
# 或使用 pnpm
pnpm install
```

### 2. 准备图片资源（临时方案）

在正式图片资源到位之前，创建占位图片目录：

```bash
# Windows PowerShell
New-Item -ItemType Directory -Force -Path public\images\home
New-Item -ItemType Directory -Force -Path public\images\backgrounds
New-Item -ItemType Directory -Force -Path public\images\icons
New-Item -ItemType Directory -Force -Path public\videos

# Linux/macOS
mkdir -p public/images/{home,backgrounds,icons}
mkdir -p public/videos
```

### 3. 创建占位图片脚本（可选）

创建 `scripts/create-placeholders.js`：

```javascript
// 这个脚本会创建占位图片的HTML文件，指向在线占位图服务
const fs = require('fs');
const path = require('path');

const placeholders = {
  'images/home/hero-banner-1.jpg': 'https://via.placeholder.com/1920x756/bc2220/ffffff?text=Hero+Banner+1',
  'images/home/hero-banner-2.jpg': 'https://via.placeholder.com/1920x756/bc2220/ffffff?text=Hero+Banner+2',
  'images/home/hero-banner-3.jpg': 'https://via.placeholder.com/1920x756/bc2220/ffffff?text=Hero+Banner+3',
  'images/home/course-1.jpg': 'https://via.placeholder.com/364x200/efefef/333333?text=Course',
  'images/home/video-1.jpg': 'https://via.placeholder.com/320x212/000000/ffffff?text=Video+1',
  'images/home/video-2.jpg': 'https://via.placeholder.com/320x172/000000/ffffff?text=Video+2',
  'images/home/video-3.jpg': 'https://via.placeholder.com/320x172/000000/ffffff?text=Video+3',
  'images/home/video-4.jpg': 'https://via.placeholder.com/320x172/000000/ffffff?text=Video+4',
};

console.log('占位图片URL映射（暂时使用在线服务）:');
Object.entries(placeholders).forEach(([local, url]) => {
  console.log(`${local} -> ${url}`);
});

console.log('\n提示：请将实际图片放置在 public/ 目录下对应路径');
```

### 4. 启动开发服务器

```bash
npm run dev
# 或
pnpm dev
```

浏览器会自动打开 `http://localhost:5173`

## 🎯 验证页面

访问首页后，您应该看到：

✅ 顶部红色导航栏（带Logo和菜单）
✅ 英雄横幅区（轮播效果）
✅ 滚动继续按钮（带动画）
✅ 视频展示区
✅ 课程卡片网格（2行4列）
✅ 页脚（红色背景）

## ⚠️ 常见问题

### 1. 图片不显示

**原因**: 图片路径不正确或文件不存在

**解决方案**:
- 确认图片文件在 `public/images/` 目录下
- 检查文件名大小写是否匹配
- 临时使用在线占位图：

```vue
<!-- 修改组件中的图片路径 -->
<img src="https://via.placeholder.com/1920x756/bc2220/ffffff" />
```

### 2. 视频不播放

**原因**: 视频文件缺失或格式不支持

**临时解决方案**:
```vue
<!-- 在 Home/index.vue 中注释掉视频 -->
<div class="home__video-background">
  <!-- <video ref="backgroundVideo" autoplay loop muted playsinline>
    <source src="/videos/hero-video.mp4" type="video/mp4" />
  </video> -->
  <div class="home__video-placeholder" style="background: linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.3))"></div>
</div>
```

### 3. 字体显示异常

**原因**: Source Han Sans CN 字体未安装

**解决方案**:
系统会自动降级到备选字体（Microsoft YaHei、PingFang SC）。

如需安装 Source Han Sans CN：
```bash
# 从 Google Fonts 或 Adobe Fonts 下载
# 或在 style.css 中引入 Web Font
```

```css
/* 在 style.css 顶部添加 */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap');

:root {
  --font-sans: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
}
```

### 4. 轮播不自动播放

**检查**:
- 浏览器控制台是否有错误
- 组件是否正确挂载

**调试**:
```javascript
// 在 Home/index.vue 中添加日志
onMounted(() => {
  console.log('Component mounted, starting banner autoplay')
  startBannerAutoplay()
})
```

## 📦 构建生产版本

```bash
npm run build
# 或
pnpm build
```

构建产物在 `dist/` 目录下。

## 🧪 预览生产构建

```bash
npm run preview
# 或
pnpm preview
```

## 🔍 开发工具

### Vue DevTools
安装浏览器扩展：
- Chrome: [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- Firefox: [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

### VSCode 扩展推荐
- Vue Language Features (Volar)
- TypeScript Vue Plugin (Volar)
- ESLint
- Prettier

## 📚 下一步

1. 查看 `HOME_IMPLEMENTATION.md` 了解详细实现
2. 查看 `public/images/README.md` 准备图片资源
3. 连接后端API（参考 `src/api/` 目录）
4. 实现其他页面（思政概览、资源库等）

## 🆘 获取帮助

- 查看项目文档：`ARCHITECTURE.md`、`IMPLEMENTATION_GUIDE.md`
- 提交Issue
- 联系项目负责人

---

祝您开发顺利！🎉

