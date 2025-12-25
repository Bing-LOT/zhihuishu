# 红色文化资源 API 接入说明

## 更新时间
2025-12-25

## 更新内容

已成功接入红色文化资源列表 API，实现动态数据加载和下拉分页功能。

## 一、API 接口信息

### 接口地址
```
POST /redCulture/page/list
```

### 请求参数（Body JSON）

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| pageIndex | number | 是 | 页码，默认1 |
| pageSize | number | 是 | 每页大小，默认10条 |
| keyword | string | 否 | 搜索关键词 |

### 返回数据结构

```typescript
{
  msg: string       // 消息
  code: number      // 状态码，200=成功
  data: {
    records: [      // 业务数据记录集合
      {
        id: number
        title: string
        coverUrl: string
        address: string
        tags: string[]
        lng: number     // 经度
        lat: number     // 纬度
        contentType: string
        content: string
        createTime: string
        // ...其他字段
      }
    ]
    total: number    // 总数
    size: number     // 每页大小
    current: number  // 当前页码
    pages: number    // 总页数
  }
}
```

## 二、实现的功能

### 1. 动态数据加载 ✅
- ✅ 从 API 获取真实的红色文化资源数据
- ✅ 替换了原有的静态示例数据
- ✅ 页面加载时自动获取第一页数据

### 2. 下拉分页加载 ✅
- ✅ 滚动到列表底部自动加载下一页
- ✅ 触发距离：距离底部50px时开始加载
- ✅ 新数据追加到列表末尾
- ✅ 防重复加载机制

### 3. 搜索功能 ✅
- ✅ 支持关键词搜索
- ✅ 搜索时重置页码
- ✅ 搜索结果实时更新

### 4. 加载状态显示 ✅
- ✅ 加载中显示转圈动画
- ✅ 没有更多数据提示
- ✅ 空状态提示

### 5. 地图联动 ✅
- ✅ 选中资源在地图上显示标记
- ✅ 默认选中第一个资源
- ✅ 点击资源列表项更新地图和详情卡片

## 三、代码实现

### 1. API 导入
```typescript
import { getRedCultureList, type RedCultureItem } from '@/api/redCulture'
```

### 2. 数据状态
```typescript
// 资源列表
const cultureResources = ref<CultureResource[]>([])
// 当前选中的资源
const selectedResource = ref<CultureResource | null>(null)

// 分页参数
const culturePageIndex = ref(1)
const culturePageSize = ref(10)
const cultureTotal = ref(0)
const culturePages = ref(0)
const cultureLoading = ref(false)
const cultureHasMore = ref(true)

// 列表容器引用
const cultureListContainer = ref<HTMLDivElement | null>(null)
```

### 3. 获取数据函数
```typescript
const fetchCultureResources = async (loadMore = false) => {
  if (cultureLoading.value) return
  if (loadMore && !cultureHasMore.value) return

  try {
    cultureLoading.value = true

    const response = await getRedCultureList({
      pageIndex: culturePageIndex.value,
      pageSize: culturePageSize.value,
      keyword: searchQuery.value || undefined
    })

    // 数据映射
    const mappedData = response.records.map((item: RedCultureItem) => ({
      id: String(item.id),
      name: item.title,
      type: item.tags && item.tags.length > 0 ? item.tags[0] : '文化资源',
      cover: item.coverUrl || '/images/indexBg.png',
      description: item.content || '',
      longitude: item.lng || 119.296,
      latitude: item.lat || 26.075,
      address: item.address || ''
    }))

    if (loadMore) {
      cultureResources.value = [...cultureResources.value, ...mappedData]
    } else {
      cultureResources.value = mappedData
    }

    // 更新分页信息
    cultureTotal.value = response.total
    culturePages.value = response.pages
    cultureHasMore.value = culturePageIndex.value < response.pages
  } catch (error) {
    console.error('获取红色文化资源失败:', error)
  } finally {
    cultureLoading.value = false
  }
}
```

### 4. 加载更多
```typescript
const loadMoreCulture = () => {
  if (!cultureHasMore.value || cultureLoading.value) return
  culturePageIndex.value++
  fetchCultureResources(true)
}
```

### 5. 滚动事件
```typescript
const handleScroll = (e: Event) => {
  const container = e.target as HTMLDivElement
  const scrollTop = container.scrollTop
  const scrollHeight = container.scrollHeight
  const clientHeight = container.clientHeight

  // 滚动到距离底部50px时加载更多
  if (scrollHeight - scrollTop - clientHeight < 50) {
    loadMoreCulture()
  }
}
```

### 6. 搜索处理
```typescript
const handleSearch = () => {
  culturePageIndex.value = 1
  cultureHasMore.value = true
  fetchCultureResources(false)
}
```

### 7. 模板更新
```vue
<div 
  ref="cultureListContainer"
  class="culture-map__list-content"
  @scroll="handleScroll"
>
  <!-- 资源列表 -->
  <div v-for="resource in cultureResources" ...>
    ...
  </div>

  <!-- 加载状态 -->
  <div v-if="cultureLoading" class="culture-loading">
    <div class="loading-spinner"></div>
    <span>加载中...</span>
  </div>

  <!-- 没有更多数据 -->
  <div v-else-if="!cultureHasMore && cultureResources.length > 0" 
       class="culture-no-more">
    没有更多数据了
  </div>

  <!-- 空状态 -->
  <div v-if="!cultureLoading && cultureResources.length === 0" 
       class="culture-empty">
    <p>暂无文化资源数据</p>
  </div>
</div>
```

## 四、数据映射关系

| API 字段 | 组件字段 | 说明 |
|----------|----------|------|
| id | id | 资源ID（转为字符串） |
| title | name | 资源名称 |
| tags[0] | type | 资源类型（取第一个标签） |
| coverUrl | cover | 封面图片 |
| content | description | 资源描述 |
| lng | longitude | 经度 |
| lat | latitude | 纬度 |
| address | address | 详细地址 |

## 五、用户体验优化

### 1. 平滑加载
- 新数据追加到列表末尾，不会打断用户浏览
- 加载时显示转圈动画，提示用户正在加载

### 2. 防重复加载
- 加载中时不响应新的加载请求
- 没有更多数据时不再请求

### 3. 智能触发
- 距离底部50px时触发，提前加载下一页
- 用户感知不到加载延迟

### 4. 状态反馈
- 加载中：显示动画
- 加载完成：自动隐藏加载提示
- 没有更多：显示"没有更多数据了"
- 无数据：显示空状态提示

## 六、测试场景

### 场景 1：首次加载
```
1. 用户进入页面
   ↓
2. 自动请求第一页数据（10条）
   ↓
3. 显示加载动画
   ↓
4. 数据加载成功，显示资源列表
   ↓
5. 默认选中第一个资源，地图显示标记
```

### 场景 2：滚动加载更多
```
1. 用户滚动列表
   ↓
2. 滚动到距离底部50px
   ↓
3. 自动触发加载下一页
   ↓
4. 底部显示"加载中..."
   ↓
5. 新数据追加到列表末尾
   ↓
6. 继续滚动可以查看更多
```

### 场景 3：搜索
```
1. 用户输入搜索关键词
   ↓
2. 点击"搜索"按钮
   ↓
3. 页码重置为1
   ↓
4. 请求搜索结果
   ↓
5. 列表替换为搜索结果
   ↓
6. 可以继续滚动加载更多搜索结果
```

### 场景 4：无更多数据
```
1. 用户滚动到最后一页
   ↓
2. 显示"没有更多数据了"
   ↓
3. 继续滚动不再触发请求
```

### 场景 5：空状态
```
1. API 返回空数据（或搜索无结果）
   ↓
2. 显示"暂无文化资源数据"
   ↓
3. 地图保持可用
```

## 七、性能优化

### 1. 防抖加载
- 加载中时阻止重复请求
- 避免短时间内多次触发

### 2. 按需加载
- 每页10条数据，按需加载
- 不一次性加载所有数据

### 3. 数据缓存
- 已加载的数据保留在内存中
- 不会重复请求已加载的页面

## 八、错误处理

### API 请求失败
```typescript
try {
  // API 请求
} catch (error) {
  console.error('获取红色文化资源失败:', error)
  // 保持当前状态，不清空已有数据
} finally {
  cultureLoading.value = false
}
```

### 图片加载失败
- 使用默认占位图：`/images/indexBg.png`
- 不影响其他功能

### 坐标缺失
- 使用福州市中心默认坐标：`[119.296, 26.075]`
- 地图仍可正常显示

## 九、相关文件

### 修改的文件
- `src/views/portal/Study/index.vue` - 主文件，实现分页和滚动加载

### API 文件（已存在）
- `src/api/redCulture.ts` - 红色文化资源 API

### 文档文件
- `红色文化资源API接入说明.md` - 本文件

## 十、未来优化建议

### 1. 虚拟滚动
如果数据量特别大（如上千条），可以考虑使用虚拟滚动技术，只渲染可见区域的数据。

### 2. 骨架屏
首次加载时使用骨架屏替代转圈动画，提升视觉体验。

### 3. 搜索防抖
为搜索输入框添加防抖功能，用户停止输入后自动搜索。

### 4. 数据预加载
提前预加载下一页数据，减少用户等待时间。

### 5. 离线缓存
使用 localStorage 或 IndexedDB 缓存数据，支持离线浏览。

## 十一、常见问题

### Q1: 滚动加载不触发？
**检查**：
- 确认列表容器有滚动条
- 确认 `@scroll` 事件绑定正确
- 查看 `cultureHasMore` 是否为 true

### Q2: 数据重复加载？
**原因**：可能是滚动事件触发过快
**解决**：已添加 `cultureLoading` 防重复加载机制

### Q3: 搜索后无法加载更多？
**检查**：
- 确认搜索后 `cultureHasMore` 正确更新
- 确认 `culturePageIndex` 正确递增

### Q4: 地图标记不更新？
**原因**：可能是数据加载完成但地图未初始化
**解决**：使用 `nextTick` 确保地图已渲染

## 十二、总结

✅ **已完成**：
- 接入红色文化资源列表 API
- 实现下拉分页自动加载
- 实现搜索功能
- 优化加载状态显示
- 完善错误处理

✅ **用户体验**：
- 流畅的滚动加载
- 清晰的状态反馈
- 无感知的数据追加

✅ **技术实现**：
- 合理的数据映射
- 完善的错误处理
- 优雅的防重复加载

---

**版本**：v1.2.0
**更新日期**：2025-12-25
**状态**：✅ 已完成并测试

