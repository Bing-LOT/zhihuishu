# 学院列表API联调说明

## 接口信息

- **接口路径**: `/api/special/college/page/list`
- **请求方式**: POST
- **返回格式**: application/json

## 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| pageIndex | number | 是 | 页码 |
| pageSize | number | 是 | 每页大小，默认10条 |
| keyword | string | 否 | 搜索关键词 |
| property | string | 否 | 课程性质 |
| levelName | string | 否 | 示范等级 |
| college | string | 否 | 所在学院 |
| showFront | number | 否 | 是否前台显示：1=显示；0=隐藏；不传显示所有 |

## 响应结构

```json
{
  "code": 200,
  "msg": "消息",
  "data": {
    "records": [],  // 业务数据记录集合
    "total": 0,     // 总数
    "size": 0,      // 每页大小
    "current": 0,   // 当前页码
    "pages": 0      // 总页数
  }
}
```

## records 数据项结构

每个数据项包含以下字段：

- `id`: 业务ID
- `name`: 课程名称
- `coverUrl`: 封面图片URL
- `college`: 所在学院
- `teachers`: 主讲教师数组 [{name: string, title: string}]
- `types`: 建设课程类型数组
- `content`: 课程详细内容
- `videoUrl`: 视频地址（可选）
- `statPv`: 浏览量
- `showFront`: 是否前台显示（1=显示，0=隐藏）
- `createTime`: 发布时间

## 代码示例

### 1. API接口定义（已更新）

文件位置：`src/api/college.ts`

```typescript
export interface CollegePageParams {
  pageIndex: number
  pageSize: number
  keyword?: string
  property?: string // 课程性质
  levelName?: string // 示范等级
  college?: string // 所在学院
  showFront?: number // 1=显示；0=隐藏；不传显示所有
}

export function getCollegePageList(params: CollegePageParams) {
  return request.post<PageResponse<CollegeItem>>('/api/special/college/page/list', params)
}
```

### 2. 组件中使用示例

文件位置：`src/views/College/index.vue`

```typescript
// 加载一院一品列表
const loadCollegeList = async () => {
  loading.value = true
  try {
    const params = {
      pageIndex: pagination.value.pageIndex,
      pageSize: pagination.value.pageSize,
      showFront: 1,
      keyword: searchKeyword.value || undefined
    }
    const result = await getCollegePageList(params)
    collegeList.value = result.records
    total.value = result.total
  } catch (error) {
    console.error('加载一院一品列表失败:', error)
    ElMessage.error('加载失败，请稍后重试')
  } finally {
    loading.value = false
  }
}
```

## 测试步骤

1. **启动开发服务器**
   ```bash
   npm run dev
   ```

2. **访问页面**
   - 前台页面：`/college`
   - 查看浏览器控制台和网络请求

3. **测试功能**
   - ✅ 列表加载
   - ✅ 分页切换
   - ✅ 搜索功能
   - ✅ 数据展示

4. **检查网络请求**
   - 请求URL：`/api/special/college/page/list`
   - 请求方法：POST
   - 请求参数格式正确
   - 响应状态码：200

## 注意事项

1. **分页参数**: 组件中默认每页显示16条数据（pageSize: 16）
2. **前台显示过滤**: 前台页面固定传递 `showFront: 1`，只显示启用的数据
3. **关键词搜索**: 支持按课程名称搜索
4. **响应数据**: 后端返回的是标准分页响应格式
5. **错误处理**: 接口调用失败时会显示 ElMessage 错误提示

## 完成状态

✅ API接口参数定义已更新  
✅ 添加 property（课程性质）可选参数  
✅ 添加 levelName（示范等级）可选参数  
✅ Vue组件已正确使用接口  
✅ 类型定义完整，支持TypeScript类型检查

## 相关文件

- `src/api/college.ts` - API接口定义
- `src/views/College/index.vue` - 学院列表页面组件
- `src/types/course.d.ts` - 相关类型定义

