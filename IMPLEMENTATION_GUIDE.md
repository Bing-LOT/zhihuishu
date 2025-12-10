# 项目实施指南

## 📋 目录

1. [前置准备](#前置准备)
2. [依赖安装](#依赖安装)
3. [开发步骤](#开发步骤)
4. [测试指南](#测试指南)
5. [部署指南](#部署指南)
6. [常见问题](#常见问题)

---

## 前置准备

### 1. 环境检查

确保已安装以下软件：

```bash
# 检查 Node.js 版本
node -v  # 需要 >= 20.14.0

# 检查 npm 版本
npm -v   # 需要 >= 10.7.0
```

### 2. 获取必要信息

- [ ] SSO 登录地址
- [ ] 后端 API 基础 URL
- [ ] 后端接口文档
- [ ] 设计稿或 UI 规范
- [ ] 测试账号（学生、教师、管理员）

---

## 依赖安装

### 1. 安装项目依赖

```bash
cd zhihuishu-app
npm install
```

### 2. 安装推荐的 UI 组件库（可选）

#### Element Plus (推荐)

```bash
npm install element-plus
npm install -D unplugin-vue-components unplugin-auto-import
```

然后在 `vite.config.ts` 中配置自动导入：

```typescript
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

#### Ant Design Vue

```bash
npm install ant-design-vue
```

#### Naive UI

```bash
npm install naive-ui
```

### 3. 安装图表库（用于数据分析模块）

```bash
# ECharts
npm install echarts
npm install -D @types/echarts

# 或 Chart.js
npm install chart.js vue-chartjs
```

### 4. 安装其他常用库

```bash
# 日期处理
npm install dayjs

# 富文本编辑器
npm install @tinymce/tinymce-vue

# 文件上传
npm install vue-upload-component

# Markdown 编辑器
npm install @vueup/vue-quill
```

---

## 开发步骤

### 阶段 1: 基础设施搭建（1-2 天）

#### 1.1 配置环境变量

根据实际环境修改配置文件：

**`.env.development`**
```env
VITE_API_BASE_URL=http://你的开发环境API地址/api
VITE_SSO_URL=https://你的SSO地址/login
VITE_APP_TITLE=大思政课数智化平台
```

**`.env.production`**
```env
VITE_API_BASE_URL=https://你的生产环境API地址/api
VITE_SSO_URL=https://你的SSO地址/login
VITE_APP_TITLE=大思政课数智化平台
```

#### 1.2 完善 API 请求拦截器

编辑 `src/api/request.ts`：

```typescript
// 请求拦截器中添加 Token
request.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器中处理错误
request.interceptors.response.use(
  (response) => {
    // 根据后端实际返回结构调整
    const { code, data, message } = response.data
    
    if (code === 200) {
      return data
    } else {
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // 处理 401 未授权
    if (error.response?.status === 401) {
      removeToken()
      router.push('/auth/login')
    }
    return Promise.reject(error)
  }
)
```

#### 1.3 实现认证逻辑

编辑 `src/utils/auth.ts`，完善 SSO 跳转逻辑：

```typescript
export function redirectToSSO(redirectUrl?: string): void {
  const ssoUrl = import.meta.env.VITE_SSO_URL
  const callbackUrl = `${window.location.origin}/auth/callback`
  const redirect = redirectUrl || window.location.href
  
  const loginUrl = `${ssoUrl}?service=${encodeURIComponent(callbackUrl)}&redirect=${encodeURIComponent(redirect)}`
  
  window.location.href = loginUrl
}
```

### 阶段 2: 核心功能开发（7-10 天）

#### 2.1 实现用户认证（Day 1）

1. 完善 `src/api/auth.ts` 中的登录相关接口
2. 完善 `src/stores/user.ts` 中的用户状态管理
3. 实现 `src/views/auth/Login.vue` 登录页
4. 实现 `src/views/auth/Callback.vue` SSO 回调处理
5. 测试登录流程

#### 2.2 实现路由守卫（Day 1）

1. 完善 `src/router/guards/authGuard.ts`
2. 完善 `src/router/guards/roleGuard.ts`
3. 测试不同角色的访问权限

#### 2.3 开发布局组件（Day 2）

1. 完善 `src/layouts/PortalLayout.vue` 门户布局
2. 完善 `src/layouts/AdminLayout.vue` 管理后台布局
3. 开发导航栏、侧边栏、页脚等子组件

#### 2.4 开发通用组件（Day 2-3）

按优先级开发：

1. **高优先级**
   - `VideoPlayer` - 视频播放器
   - `Pagination` - 分页组件
   - `Loading` - 加载组件
   - `EmptyState` - 空状态组件

2. **中优先级**
   - `ResourceCard` - 资源卡片
   - `CourseCard` - 课程卡片

#### 2.5 开发门户页面（Day 4-6）

按优先级开发：

1. **Day 4**: 首页 + 概览页
2. **Day 5**: 大资源 + 大主题
3. **Day 6**: 学习中心 + 考试中心 + 个人中心

#### 2.6 开发管理后台页面（Day 7-9）

按优先级开发：

1. **Day 7**: 资源管理 + 题库管理
2. **Day 8**: 数据分析（集成图表）
3. **Day 9**: AI 助手 + 系统配置

#### 2.7 集成测试（Day 10）

1. 功能测试
2. 兼容性测试
3. 性能优化
4. Bug 修复

### 阶段 3: UI 优化与完善（3-5 天）

#### 3.1 响应式适配

1. 移动端适配
2. 平板适配
3. 大屏适配

#### 3.2 交互优化

1. 加载状态优化
2. 错误提示优化
3. 操作反馈优化

#### 3.3 性能优化

1. 路由懒加载
2. 组件懒加载
3. 图片懒加载
4. 代码分割优化

---

## 测试指南

### 单元测试（可选）

安装测试框架：

```bash
npm install -D vitest @vue/test-utils jsdom
```

配置 `vitest.config.ts`：

```typescript
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom'
  }
})
```

### E2E 测试（可选）

安装 Playwright：

```bash
npm install -D @playwright/test
npx playwright install
```

### 手动测试清单

#### 认证模块
- [ ] SSO 登录流程
- [ ] Token 刷新
- [ ] 退出登录
- [ ] 未登录访问受保护页面

#### 权限模块
- [ ] 学生角色权限
- [ ] 教师角色权限
- [ ] 管理员角色权限
- [ ] 无权限页面访问

#### 核心功能
- [ ] 资源浏览与搜索
- [ ] 课程学习
- [ ] 视频播放
- [ ] 在线考试
- [ ] 数据统计

---

## 部署指南

### 1. 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录

### 2. 部署到 Nginx

#### 2.1 Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # 强制 HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    root /path/to/dist;
    index index.html;
    
    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API 代理
    location /api {
        proxy_pass http://backend-server:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### 2.2 部署步骤

```bash
# 1. 构建项目
npm run build

# 2. 上传 dist 目录到服务器
scp -r dist/* user@server:/path/to/nginx/html/

# 3. 重启 Nginx
ssh user@server "sudo systemctl restart nginx"
```

### 3. 使用 Docker 部署（可选）

创建 `Dockerfile`：

```dockerfile
# Build stage
FROM node:20-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

构建和运行：

```bash
docker build -t zhihuishu-app .
docker run -d -p 80:80 zhihuishu-app
```

---

## 常见问题

### Q1: 路由跳转后页面空白？

**A**: 检查路由配置和组件导入路径是否正确，确保使用了正确的路径别名 `@/`

### Q2: API 请求 404？

**A**: 检查 `vite.config.ts` 中的代理配置和环境变量中的 API 地址

### Q3: Token 过期后如何刷新？

**A**: 在 `src/api/request.ts` 的响应拦截器中实现 Token 刷新逻辑

### Q4: 如何处理跨域问题？

**A**: 
- 开发环境：使用 Vite 代理配置
- 生产环境：让后端配置 CORS 或使用 Nginx 代理

### Q5: 打包后文件过大？

**A**: 
1. 使用路由懒加载
2. 配置 `vite.config.ts` 中的代码分割
3. 使用 CDN 加载第三方库
4. 开启 Gzip 压缩

### Q6: 组件库样式不生效？

**A**: 
1. 检查是否正确导入了组件库样式
2. 检查是否配置了自动导入
3. 检查 CSS 作用域是否正确

---

## 📞 技术支持

遇到问题请联系：

- **前端架构组**
- **技术文档**: [ARCHITECTURE.md](./ARCHITECTURE.md)

---

**文档版本**: v1.0  
**最后更新**: 2025-12-09

