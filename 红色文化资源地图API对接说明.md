# 红色文化资源地图 API 对接说明

## 📋 对接概览

已成功完成红色文化资源地图页面的 API 对接工作，实现了列表查询、分页、搜索等功能。

## 🔧 修改文件清单

### 1. 新增 API 文件：`src/api/redCulture.ts`

创建了红色文化资源的 API 模块，包含以下接口：

#### 接口定义

##### 数据类型
```typescript
interface RedCultureItem {
  id: number              // 业务ID
  title: string           // 标题
  coverUrl: string        // 封面图片
  address: string         // 地址
  tags: string[]          // 标签数组
  lng: number            // 地图坐标：经度
  lat: number            // 地图坐标：纬度
  contentType: string    // 资源详情内容类型：0=富文本；1=URL地址
  content: string        // 富文本或URL地址
  pinTop: number         // 是否置顶：1=置顶；0=不置顶
  showFront: number      // 是否前台显示：1=显示；0=隐藏
  createTime: string     // 发布时间
}
```

##### 分页参数
```typescript
interface RedCulturePageParams {
  pageIndex: number      // 页码，默认1
  pageSize: number       // 每页大小，默认10条
  keyword?: string       // 搜索关键词（可选）
}
```

##### API 方法

1. **获取分页列表**
   - 方法：`getRedCultureList(params: RedCulturePageParams)`
   - 接口：`GET /redCulture/page/list`
   - 参数：
     - `pageIndex`: 页码（必需）
     - `pageSize`: 每页大小（必需）
     - `keyword`: 搜索关键词（可选）
   - 返回：分页数据对象，包含 `records`、`total`、`size`、`current`、`pages`

2. **新增资源**（预留接口，已注释）
   - 方法：`createRedCulture(data)`
   - 接口：`POST /redCulture/create`

3. **更新资源**（预留接口，已注释）
   - 方法：`updateRedCulture(id, data)`
   - 接口：`PUT /redCulture/update/{id}`

4. **删除资源**（预留接口，已注释）
   - 方法：`deleteRedCulture(id)`
   - 接口：`DELETE /redCulture/delete/{id}`

### 2. 更新 API 导出：`src/api/index.ts`

在 API 统一导出文件中添加了红色文化资源模块的导出：

```typescript
export * from './redCulture'
```

### 3. 更新页面组件：`src/views/admin/Resources/CultureMap.vue`

#### 主要修改内容

##### A. 导入 API 和类型
```typescript
import { getRedCultureList, type RedCultureItem, type RedCulturePageParams } from '@/api/redCulture'
```

##### B. 数据结构调整
- 更新了 `CultureItem` 接口，使其匹配 API 返回的数据结构
- 移除了模拟数据，改为从 API 获取真实数据
- 添加了分页状态管理：
  - `currentPage`: 当前页码
  - `pageSize`: 每页大小
  - `totalCount`: 总记录数
  - `totalPages`: 总页数
  - `loading`: 加载状态

##### C. 功能实现

1. **列表加载 (`loadData`)**
   ```typescript
   - 从 API 获取分页数据
   - 支持搜索关键词过滤
   - 显示加载状态
   - 错误处理
   ```

2. **搜索功能 (`handleSearch`)**
   ```typescript
   - 实现防抖处理（500ms）
   - 搜索时重置到第一页
   - 自动调用 loadData 重新加载数据
   ```

3. **状态筛选 (`handleFilter`)**
   ```typescript
   - 通过计算属性 filteredItems 实现前端筛选
   - 支持：全部状态、显示中、已隐藏
   ```

4. **分页功能**
   ```typescript
   - handlePageChange(page): 切换页码
   - handlePageSizeChange(size): 改变每页大小
   - getPageNumbers(): 智能显示页码按钮
   ```

##### D. 界面更新

1. **列表项显示**
   - 显示封面图片（`coverUrl`）
   - 显示标题和地址
   - 显示标签数组（`tags`）
   - 显示状态（显示中/已隐藏）
   - 显示排序位置和发布时间

2. **加载状态**
   - 添加加载动画（旋转的圆圈）
   - 加载时显示"加载中..."提示

3. **空状态**
   - 当无数据时显示空状态提示

4. **分页器**
   - 显示总数据量和当前页信息
   - 上一页/下一页按钮
   - 智能页码显示（超过5页时显示省略号）
   - 每页大小选择（10/20/50条）

##### E. 样式新增
- `.item-tags`: 标签容器样式
- `.tag`: 单个标签样式
- `.status-info`: 状态标签样式
- `.loading-state`: 加载状态容器
- `.loading-spinner`: 加载动画（旋转效果）
- `.pagination`: 分页器容器
- `.pagination-controls`: 分页控制按钮组
- `.page-btn`: 上一页/下一页按钮
- `.page-numbers`: 页码按钮组
- `.page-number`: 单个页码按钮
- `.page-size-select`: 每页大小选择器

## 📊 API 请求示例

### 获取第一页数据（10条）
```http
GET /redCulture/page/list?pageIndex=1&pageSize=10
```

### 搜索"博物馆"关键词
```http
GET /redCulture/page/list?pageIndex=1&pageSize=10&keyword=博物馆
```

### API 响应格式
```json
{
  "msg": "消息",
  "code": 200,
  "data": {
    "records": [
      {
        "id": 1,
        "title": "标题",
        "coverUrl": "封面图片URL",
        "address": "地址",
        "tags": ["标签1", "标签2"],
        "lng": 119.123456,
        "lat": 26.123456,
        "contentType": "0",
        "content": "富文本内容",
        "pinTop": 0,
        "showFront": 1,
        "createTime": "2024-12-24"
      }
    ],
    "total": 100,
    "size": 10,
    "current": 1,
    "pages": 10
  }
}
```

## 🎯 功能特性

### ✅ 已实现
- [x] 分页列表查询
- [x] 搜索功能（带防抖）
- [x] 状态筛选（显示中/已隐藏）
- [x] 加载状态显示
- [x] 空状态提示
- [x] 智能分页器
- [x] 每页大小调整
- [x] 标签显示
- [x] 响应式数据绑定
- [x] **新增资源功能**
  - [x] 图片上传（自动调用上传接口）
  - [x] 标签多选（支持手动输入和快捷选择）
  - [x] 内容类型选择（富文本/URL）
  - [x] 地图坐标输入
  - [x] 置顶设置
  - [x] 前台显示控制

### 🔜 待实现（已预留接口）
- [ ] 编辑资源（表单已完成，待对接更新API）
- [ ] 删除资源（待对接删除API）
- [ ] 拖拽排序

## 📝 新增功能详细说明

### 新增资源表单字段

1. **标题** (必填)
   - 类型：文本输入
   - 验证：不能为空

2. **封面图片** (必填)
   - 类型：图片上传
   - 功能：自动调用 `/upload` 接口上传图片
   - 支持：预览、删除
   - 返回：图片URL地址

3. **详细地址** (必填)
   - 类型：文本输入
   - 示例："福州市鼓楼区某某路123号"

4. **标签（建设课程类型）** (必填)
   - 类型：多选标签
   - 输入方式：
     - 手动输入：在输入框中输入后按回车或点击"添加"按钮
     - 快捷选择：点击下方常用标签快速添加/移除
   - 常用标签：博物馆、纪念馆、烈士陵园、革命遗址、党校、党群中心、人物故居、红色教育基地、党史馆、展览馆
   - 至少选择一个标签

5. **地图坐标** (可选)
   - 经度 (lng)：数字，支持小数点后6位
   - 纬度 (lat)：数字，支持小数点后6位
   - 示例：119.296606, 26.074507

6. **内容类型** (必填)
   - 选项：
     - 0 = 富文本
     - 1 = URL地址
   - 根据选择显示不同的输入框

7. **资源详情** (必填)
   - 富文本模式：多行文本框，支持输入HTML内容
   - URL模式：单行输入框，输入网址

8. **置顶显示** (可选)
   - 类型：复选框
   - 值：1=置顶，0=不置顶
   - 默认：不置顶

9. **前台显示** (可选)
   - 类型：复选框
   - 值：1=显示，0=隐藏
   - 默认：显示

### 新增流程

```
用户点击"新增"按钮
    ↓
打开新增对话框
    ↓
填写表单（上传图片自动调用上传接口）
    ↓
点击"保存"按钮
    ↓
表单验证（检查必填项）
    ↓
调用 POST /redCulture/add
    ↓
成功：关闭对话框 → 刷新列表
失败：显示错误信息
```

### 新增 API 请求示例

```json
POST /redCulture/add
Content-Type: application/json

{
  "title": "林则徐纪念馆",
  "coverUrl": "https://example.com/image.jpg",
  "address": "福州市鼓楼区澳门路16号",
  "tags": ["纪念馆", "红色教育基地", "博物馆"],
  "contentType": 0,
  "content": "<p>林则徐纪念馆位于福州市鼓楼区...</p>",
  "lng": 119.296606,
  "lat": 26.074507,
  "pinTop": 0,
  "showFront": 1
}
```

## 💡 使用说明

### 开发环境测试

1. **启动开发服务器**
   ```bash
   npm run dev
   ```

2. **访问页面**
   ```
   http://localhost:5173/admin/resources/culture-map
   ```

3. **查看控制台**
   - API 请求日志
   - 响应数据日志
   - 错误信息（如果有）

### 数据流程

```
用户操作 → 触发事件 → 调用 loadData()
    ↓
设置 loading = true
    ↓
调用 getRedCultureList(params)
    ↓
API 请求 → 响应拦截器处理 → 返回数据
    ↓
更新组件状态（items, totalCount, etc.）
    ↓
设置 loading = false
    ↓
界面自动更新（Vue 响应式）
```

## 🔍 调试技巧

### 查看 API 请求
1. 打开浏览器开发者工具（F12）
2. 切换到 Network 标签
3. 筛选 XHR/Fetch 请求
4. 找到 `/redCulture/page/list` 请求
5. 查看请求参数和响应数据

### 查看控制台日志
项目中已添加详细的控制台日志：
- `请求参数:` - 显示发送给 API 的参数
- `API响应:` - 显示 API 返回的数据
- `数据加载成功，共 X 条` - 加载成功提示

## ⚠️ 注意事项

1. **AuthToken**：确保已登录并有有效的 AuthToken（在请求拦截器中自动添加）

2. **代理配置**：开发环境通过 Vite 代理转发请求，确保 `vite.config.ts` 中配置正确

3. **数据字段映射**：
   - API 返回 `coverUrl` → 组件中使用 `coverUrl`
   - API 返回 `createTime` → 组件中显示 `createTime`
   - API 返回 `showFront` → 组件中判断状态（1=显示，0=隐藏）

4. **分页参数**：
   - 后端使用 `pageIndex`（从1开始）
   - 注意与 `current` 字段保持一致

5. **搜索防抖**：搜索输入有 500ms 防抖，避免频繁请求

## 📝 后续优化建议

1. **错误处理优化**
   - 使用自定义的 Toast 组件替代 `alert()`
   - 添加网络错误重试机制

2. **性能优化**
   - 实现虚拟滚动（如果数据量大）
   - 添加请求缓存

3. **用户体验**
   - 添加骨架屏加载效果
   - 添加数据刷新按钮
   - 实现拖拽排序功能

4. **功能完善**
   - 完成新增/编辑/删除功能的 API 对接
   - 添加批量操作功能
   - 添加数据导出功能

## 📚 相关文档

- [API 接口文档](./API-测试说明.md)
- [项目总体说明](./PROJECT_SUMMARY.md)
- [首页使用说明](./首页使用说明.md)

---

## 📌 更新日志

### 2024-12-24 - 新增功能对接完成
- ✅ 实现新增资源功能
- ✅ 集成图片上传接口
- ✅ 支持标签多选（手动输入+快捷选择）
- ✅ 支持内容类型切换（富文本/URL）
- ✅ 支持地图坐标输入
- ✅ 支持置顶和前台显示控制
- ✅ 完善表单验证

### 2024-12-24 - 初始对接完成
- ✅ 列表查询、分页、搜索功能

---

**最后更新时间**：2024-12-24  
**对接人员**：AI Assistant  
**当前状态**：✅ 列表查询、分页、搜索、新增功能已完成

