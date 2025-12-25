# AuthToken 获取与持久化使用说明

## 功能概述

本项目已实现从 URL 参数中获取 `AuthToken` 并进行本地持久化存储的功能。当用户通过 `https://dszk.fzu.edu.cn/index.html?AuthToken=xxx` 访问时，系统会自动提取 token 并保存到本地存储，供后续 API 请求使用。

## 实现原理

### 1. URL 参数提取（`src/utils/url.ts`）
提供了一套 URL 参数处理工具函数：
- `getUrlParam(name)` - 获取指定 URL 参数
- `getAllUrlParams()` - 获取所有 URL 参数
- `setUrlParam()` / `removeUrlParam()` - 设置/移除 URL 参数

### 2. 本地存储（`src/utils/storage.ts`）
已有完整的本地存储工具：
- `setStorageItem()` - 保存数据到 localStorage
- `getStorageItem()` - 从 localStorage 读取数据
- 支持 JSON 序列化/反序列化

### 3. 用户状态管理（`src/stores/user.ts`）

#### 初始化逻辑
```typescript
// AuthToken 初始化顺序：
// 1. 从 localStorage 读取（应用启动时）
// 2. 如果 URL 有 AuthToken 参数，则覆盖本地值并保存
const authToken = ref<string>(
  getStorageItem<string>(AUTH_TOKEN_KEY) || 'e801656e474d45dda9036df21c0be90b'
)
```

#### 核心方法

**`initAuthToken(urlToken?: string)`**
- 在应用启动时调用（App.vue）
- 如果 URL 有 AuthToken，优先使用并保存
- 否则使用本地存储的值

**`setAuthToken(token: string)`**
- 更新 authToken 状态
- 同步保存到 localStorage
- 可手动调用更新 token

### 4. 应用初始化（`src/App.vue`）
```typescript
onMounted(() => {
  // 从 URL 参数中获取 AuthToken
  const urlAuthToken = getUrlParam('AuthToken')
  
  // 初始化 AuthToken（优先使用URL参数，否则使用本地存储）
  userStore.initAuthToken(urlAuthToken || undefined)
})
```

### 5. API 请求拦截（`src/api/request.ts`）
```typescript
// 请求拦截器自动添加 AuthToken 到请求头
request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  
  if (userStore.authToken) {
    config.headers['AuthToken'] = userStore.authToken
  }
  
  return config
})
```

## 使用场景

### 场景 1：首次访问（带 AuthToken 参数）
```
用户访问：https://dszk.fzu.edu.cn/index.html?AuthToken=ffb8de14ab9e43929020f0077345ffc6

执行流程：
1. App.vue 在 onMounted 中提取 URL 参数
2. 调用 initAuthToken('ffb8de14ab9e43929020f0077345ffc6')
3. Token 被保存到 localStorage（key: AUTH_TOKEN）
4. 后续所有 API 请求自动携带此 token
```

### 场景 2：后续访问（无 AuthToken 参数）
```
用户访问：https://dszk.fzu.edu.cn/index.html

执行流程：
1. App.vue 检测 URL 没有 AuthToken 参数
2. 从 localStorage 读取之前保存的 token
3. 使用本地存储的 token 进行 API 请求
```

### 场景 3：Token 更新
```
用户访问新的 URL：https://dszk.fzu.edu.cn/index.html?AuthToken=新token值

执行流程：
1. 系统检测到新的 AuthToken 参数
2. 覆盖旧 token 并保存新值
3. 后续请求使用新 token
```

## 控制台日志

系统会在控制台输出详细的 token 处理日志：

```
🔑 从 URL 参数初始化 AuthToken: ffb8de14ab9e43929020f0077345ffc6
✅ AuthToken 已保存到本地存储: ffb8de14ab9e43929020f0077345ffc6
```

或

```
🔑 使用本地存储的 AuthToken: ffb8de14ab9e43929020f0077345ffc6
```

## 手动操作 AuthToken

如果需要在代码中手动操作 token：

```typescript
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 获取当前 token
console.log(userStore.authToken)

// 手动更新 token
userStore.setAuthToken('new-token-value')
```

## 本地存储查看

在浏览器开发者工具中查看：
1. 打开 DevTools (F12)
2. Application / 应用程序 标签
3. Storage > Local Storage
4. 找到 `AUTH_TOKEN` 键

## 注意事项

1. **优先级**：URL 参数 > localStorage > 默认值
2. **持久化**：token 保存在 localStorage，浏览器关闭后依然保留
3. **安全性**：敏感 token 存储在客户端，注意使用 HTTPS
4. **默认值**：如果没有任何 token 来源，使用默认值 `e801656e474d45dda9036df21c0be90b`

## 测试建议

### 测试 1：URL 参数提取
```
访问：http://localhost:5173/?AuthToken=test-token-123
检查：控制台应显示 "从 URL 参数初始化 AuthToken: test-token-123"
```

### 测试 2：本地存储持久化
```
1. 带 AuthToken 参数访问
2. 刷新页面（不带参数）
3. 检查：控制台应显示 "使用本地存储的 AuthToken: xxx"
```

### 测试 3：API 请求携带 token
```
1. 设置 token
2. 发起任意 API 请求
3. 检查：Network 面板中的请求头应包含 "AuthToken: xxx"
```

## 文件清单

- ✅ `src/utils/url.ts` - URL 参数处理工具（新增）
- ✅ `src/utils/storage.ts` - 本地存储工具（已有）
- ✅ `src/stores/user.ts` - 用户状态管理（已更新）
- ✅ `src/App.vue` - 应用初始化（已更新）
- ✅ `src/api/request.ts` - API 请求拦截（已有）

## 总结

✨ 功能已完整实现，支持：
- ✅ 从 URL 自动提取 AuthToken
- ✅ 本地持久化存储
- ✅ 自动应用到所有 API 请求
- ✅ 优雅的降级策略（URL → localStorage → 默认值）
- ✅ 完整的日志追踪

部署到生产环境后，用户通过 `https://dszk.fzu.edu.cn/index.html?AuthToken=xxx` 访问即可自动完成 token 初始化和持久化！

