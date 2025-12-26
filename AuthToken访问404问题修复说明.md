# AuthToken 访问 404 问题修复说明

## 问题描述

用户反馈部署后访问带 AuthToken 参数的 URL 时跳转到 404 页面：
```
https://dszk.fzu.edu.cn/index.html?AuthToken=41ed05ed306e4f87b697aca8f3ae4cb4
```

## 问题原因分析

### 1. 路由配置问题
- **Vue Router 模式**：项目使用 `createWebHistory` (HTML5 History 模式)
- **路由路径不匹配**：
  - 路由表中定义的根路径是 `/`
  - 用户访问的是 `/index.html`
  - `/index.html` 不在路由表中，被当作未知路由
  - 触发了通配符路由 `/:pathMatch(.*)* -> /404`

### 2. AuthToken 处理流程
虽然应用中已经有 AuthToken 的处理逻辑，但由于路由跳转到了 404，AuthToken 参数没有机会被正确处理。

**现有的处理流程：**
1. `App.vue` 在 `onMounted` 中从 URL 参数读取 AuthToken
2. 调用 `userStore.initAuthToken()` 保存到 localStorage
3. `request.ts` 拦截器从 userStore 读取 authToken 并添加到请求头

## 解决方案

### 1. 添加 /index.html 路由重定向 ✅

在 `src/router/index.ts` 中添加路由规则，将 `/index.html` 重定向到 `/` 并保留所有查询参数：

```typescript
// 错误页面路由
const errorRoutes: RouteRecordRaw[] = [
  // 处理 index.html 访问，重定向到根路径并保留查询参数
  {
    path: '/index.html',
    redirect: (to) => {
      // 保留所有查询参数（包括 AuthToken）
      return {
        path: '/',
        query: to.query
      }
    }
  },
  // ... 其他错误路由
]
```

**工作原理：**
- 用户访问 `/index.html?AuthToken=xxx`
- 路由匹配到 `/index.html` 规则
- 重定向到 `/?AuthToken=xxx`（保留查询参数）
- 首页组件加载，`App.vue` 正确处理 AuthToken

### 2. Nginx 配置说明 ✅

确保 nginx 配置正确支持 HTML5 History 模式：

```nginx
# 前台网站路由
location / {
    # 处理 Vue Router 的 HTML5 History 模式
    try_files $uri $uri/ /index.html;
    
    # 确保 index.html 始终返回，让 Vue Router 处理路由
    # 这样 /index.html?AuthToken=xxx 也能正确处理
}
```

**说明：**
- `try_files $uri $uri/ /index.html;` 的作用：
  1. 先尝试查找请求的文件 ($uri)
  2. 如果不存在，尝试作为目录 ($uri/)
  3. 如果都不存在，返回 index.html（让 Vue Router 处理）
  
- 对于 `/index.html?AuthToken=xxx` 的处理：
  1. Nginx 找到 index.html 文件并返回
  2. 浏览器加载 Vue 应用
  3. Vue Router 检测到 URL 是 `/index.html?AuthToken=xxx`
  4. 匹配到重定向规则，跳转到 `/?AuthToken=xxx`
  5. App.vue 处理 AuthToken 参数

## 验证测试

### 本地测试
```bash
# 1. 构建项目
npm run build

# 2. 使用本地服务器测试
npx http-server dist -p 8080

# 3. 访问以下 URL 测试：
# http://localhost:8080/index.html?AuthToken=test123
# 应该自动重定向到 http://localhost:8080/?AuthToken=test123
```

### 部署后测试
```bash
# 访问以下 URL：
https://dszk.fzu.edu.cn/index.html?AuthToken=41ed05ed306e4f87b697aca8f3ae4cb4

# 预期结果：
# 1. 自动重定向到 https://dszk.fzu.edu.cn/?AuthToken=41ed05ed306e4f87b697aca8f3ae4cb4
# 2. 首页正常显示
# 3. AuthToken 被保存到 localStorage
# 4. 后续 API 请求自动携带 AuthToken
```

### 检查 AuthToken 是否保存成功
打开浏览器开发者工具：
```javascript
// 在 Console 中执行
localStorage.getItem('AUTH_TOKEN')
// 应该返回: "41ed05ed306e4f87b697aca8f3ae4cb4"
```

## 部署步骤

### 1. 更新代码
```bash
# 拉取最新代码
git pull

# 安装依赖（如有更新）
npm install

# 构建项目
npm run build
```

### 2. 部署到服务器
```bash
# 上传 dist 目录到服务器
scp -r dist/* user@dszk.fzu.edu.cn:/var/www/dszk/dist/

# 或使用 rsync
rsync -avz --delete dist/ user@dszk.fzu.edu.cn:/var/www/dszk/dist/
```

### 3. 检查 Nginx 配置
```bash
# 确保 nginx 配置包含正确的 try_files 规则
cat /etc/nginx/sites-available/dszk.conf

# 测试配置
sudo nginx -t

# 如果有修改，重新加载 nginx
sudo nginx -s reload
```

## 相关文件说明

### 路由配置
- `src/router/index.ts` - 主路由配置，添加了 /index.html 重定向规则

### AuthToken 处理
- `src/App.vue` - 应用初始化时处理 URL 参数中的 AuthToken
- `src/stores/user.ts` - UserStore，管理 AuthToken 的存储和读取
- `src/api/request.ts` - Axios 拦截器，自动在请求头中添加 AuthToken

### 工具函数
- `src/utils/url.ts` - URL 参数解析工具
- `src/utils/storage.ts` - localStorage 操作工具

## 技术细节

### HTML5 History 模式 vs Hash 模式

**当前使用：HTML5 History 模式**
- URL 格式：`https://example.com/about`
- 优点：URL 更美观，符合传统 URL 规范
- 缺点：需要服务器配置支持（所有路由都返回 index.html）

**Hash 模式（备选方案）**
- URL 格式：`https://example.com/#/about`
- 优点：不需要服务器配置
- 缺点：URL 中有 `#`，不够美观

### 为什么不改用 Hash 模式？
虽然 Hash 模式可以避免这个问题，但：
1. History 模式的 URL 更规范，符合 RESTful 风格
2. 对 SEO 更友好
3. 可以使用 `window.history.pushState` 等现代浏览器 API
4. 通过添加路由重定向规则，问题已经解决

## 常见问题

### Q1: 为什么会有人访问 /index.html？
**A:** 可能的原因：
- 用户手动在 URL 中输入了 `index.html`
- 旧的书签或链接包含 `index.html`
- 其他系统生成的链接默认加上了 `index.html`
- SSO 回调地址配置为 `index.html`

### Q2: AuthToken 参数是否会丢失？
**A:** 不会。重定向时使用了：
```typescript
{
  path: '/',
  query: to.query  // 保留所有查询参数
}
```

### Q3: 是否影响其他页面？
**A:** 不影响。只是添加了一个特定的重定向规则，其他路由正常工作。

### Q4: 性能是否有影响？
**A:** 几乎没有影响。只是一次客户端的路由重定向，不涉及网络请求。

## 总结

通过在路由配置中添加 `/index.html` 的重定向规则，问题已经彻底解决：
1. ✅ 用户可以正常访问带 AuthToken 的 URL
2. ✅ AuthToken 参数不会丢失
3. ✅ AuthToken 被正确保存和使用
4. ✅ 不影响现有功能
5. ✅ 代码改动最小，维护成本低

## 修复日期
2025-12-26

