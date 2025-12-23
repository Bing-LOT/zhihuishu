# 思政资源新增接口联调说明

## 接口信息

- **接口地址**: `/politicalResource/add`
- **请求方法**: `POST`
- **Content-Type**: `application/json`

## 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | string | ✅ | 标题 |
| category | number | ✅ | 分类：0=政策文件；1=思政素材 |
| contentType | number | ✅ | 内容类型：0=富文本内容（内部详情）；1=URL地址（外部跳转） |
| content | string | ✅ | 内容配置，配置富文本详情或URL跳转地址 |
| pinTop | number | ✅ | 是否置顶：1=置顶；0=不置顶 |
| showFront | number | ✅ | 前台显示：1=显示；0=不显示 |

## 请求示例

### 富文本内容示例

```json
{
  "title": "新时代中国特色社会主义思想融入专业课程实践",
  "category": 1,
  "contentType": 0,
  "content": "<p>这是富文本内容，支持HTML标签</p><p><strong>加粗文本</strong></p>",
  "pinTop": 0,
  "showFront": 1
}
```

### URL地址示例

```json
{
  "title": "中央思政文件精神学习",
  "category": 0,
  "contentType": 1,
  "content": "https://example.com/policy-document",
  "pinTop": 1,
  "showFront": 1
}
```

## 前端实现

### 1. 类型定义 (`src/types/resource.d.ts`)

```typescript
export interface PoliticalResourceAddParams {
  title: string
  category: 0 | 1
  contentType: 0 | 1
  content: string
  pinTop: 0 | 1
  showFront: 0 | 1
}
```

### 2. API 接口 (`src/api/resource.ts`)

```typescript
export function addPoliticalResource(data: PoliticalResourceAddParams): Promise<any> {
  return request({
    url: '/politicalResource/add',
    method: 'POST',
    data
  })
}
```

### 3. 组件调用 (`src/views/admin/Resources/ResourceList.vue`)

```typescript
const saveItem = async () => {
  // 表单验证
  if (!formData.value.title) {
    alert('请输入标题')
    return
  }
  if (!formData.value.content) {
    alert('请输入详情内容')
    return
  }

  try {
    isSaving.value = true
    
    const params: PoliticalResourceAddParams = {
      title: formData.value.title,
      category: formData.value.category,
      contentType: formData.value.contentType,
      content: formData.value.content,
      pinTop: formData.value.pinTop,
      showFront: formData.value.showFront
    }
    
    await addPoliticalResource(params)
    alert('新增成功！')
    closeDialog()
  } catch (error: any) {
    console.error('新增失败:', error)
    alert(`新增失败：${error.message || '网络错误'}`)
  } finally {
    isSaving.value = false
  }
}
```

## 表单字段说明

### 1. 标题 (title)
- 类型：文本输入框
- 必填项
- 占位符：请输入标题

### 2. 分类 (category)
- 类型：下拉选择框
- 必填项
- 选项：
  - 0 - 政策文件
  - 1 - 思政素材

### 3. 内容类型 (contentType)
- 类型：下拉选择框
- 必填项
- 选项：
  - 0 - 富文本内容（内部详情）
  - 1 - URL地址（外部跳转）
- **说明**：选择不同类型，内容输入框会切换：
  - 选择"富文本内容"时显示 wangEditor 富文本编辑器
  - 选择"URL地址"时显示普通文本输入框

### 4. 详情内容 (content)
- 类型：根据 contentType 动态切换
  - contentType=0：wangEditor 富文本编辑器
  - contentType=1：普通文本输入框
- 必填项
- 富文本编辑器支持：
  - 文字格式（加粗、斜体、下划线等）
  - 列表（有序、无序）
  - 链接
  - 图片
  - 表格
  - 代码块等

### 5. 置顶显示 (pinTop)
- 类型：复选框
- 选项：
  - 勾选 = 1（置顶）
  - 不勾选 = 0（不置顶）

### 6. 前台显示 (showFront)
- 类型：复选框
- 选项：
  - 勾选 = 1（显示）
  - 不勾选 = 0（不显示）
- 默认：勾选

## 测试步骤

1. **启动开发服务器**
   ```bash
   npm run dev
   ```

2. **访问页面**
   - 打开浏览器访问：http://localhost:5173/
   - 登录后台管理系统
   - 进入"思政资源"页面

3. **测试新增功能**
   - 点击"新增"按钮
   - 填写表单：
     - 标题：输入资源标题
     - 分类：选择"政策文件"或"思政素材"
     - 内容类型：选择"富文本内容"或"URL地址"
     - 详情内容：使用富文本编辑器输入内容或输入URL
     - 勾选"置顶显示"和"前台显示"选项
   - 点击"保存"按钮

4. **查看请求**
   - 打开浏览器开发者工具（F12）
   - 切换到 Network 标签
   - 查看 `/politicalResource/add` 请求
   - 检查请求头和请求体是否符合要求

5. **验证响应**
   - 成功：弹出"新增成功！"提示
   - 失败：弹出错误信息提示

## 注意事项

1. **富文本内容处理**
   - wangEditor 生成的是 HTML 格式内容
   - 后端需要能够存储和返回 HTML 内容
   - 显示时需要使用 `v-html` 或类似方式渲染

2. **URL 验证**
   - 前端暂未添加 URL 格式验证
   - 建议后端添加 URL 格式校验

3. **权限控制**
   - 请求头会自动携带 `AuthToken`
   - 后端需验证用户权限

4. **错误处理**
   - 已添加 try-catch 捕获异常
   - 会展示后端返回的错误信息
   - 保存按钮在请求期间会显示"保存中..."并禁用

5. **请求拦截器配置**
   - Content-Type 会自动设置为 `application/json`
   - AuthToken 会自动添加到请求头
   - 响应拦截器会统一处理 code 200/0 的成功响应

## 集成的功能特性

✅ wangEditor 富文本编辑器集成  
✅ 动态表单切换（富文本/URL）  
✅ 表单验证  
✅ 加载状态提示  
✅ 错误处理  
✅ 响应式设计  
✅ 类型安全（TypeScript）  

## 相关文件

- `src/types/resource.d.ts` - 类型定义
- `src/api/resource.ts` - API 接口
- `src/api/request.ts` - Axios 配置
- `src/views/admin/Resources/ResourceList.vue` - 资源列表页面

---

**测试完成后请及时反馈结果！** 🎉

