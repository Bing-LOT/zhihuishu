# 教学设计PDF预览功能说明

## 功能概述

在教学有道详情页的"教学设计"标签中，现已集成PDF文档预览功能。用户可以直接在页面中查看教学设计PDF文档，每页占满容器宽度，垂直滚动浏览。

## 实现详情

### 1. 安装的依赖

```bash
npm install vue-pdf-embed
```

- **vue-pdf-embed**: 一个基于PDF.js的Vue 3组件，用于在Vue应用中嵌入和显示PDF文档

### 2. 修改的文件

#### 2.1 类型定义文件 `src/types/teaching.d.ts`

在 `TeachingCase` 接口中新增字段：

```typescript
/** 教学设计PDF URL */
designPdfUrl?: string
```

#### 2.2 详情页面 `src/views/Teaching/Detail.vue`

**引入PDF组件：**
```typescript
import VuePdfEmbed from 'vue-pdf-embed'
```

**模板修改：**
将教学设计tab的富文本内容替换为PDF预览：

```vue
<!-- 教学设计 -->
<div v-show="activeTab === 'design'" class="pdf-wrapper">
  <div v-if="caseInfo?.designPdfUrl" class="pdf-container">
    <VuePdfEmbed 
      :source="caseInfo.designPdfUrl"
      class="pdf-viewer"
    />
  </div>
  <div v-else class="no-pdf">暂无教学设计文档</div>
</div>
```

**样式调整：**
- PDF容器最大宽度：914px（符合设计稿）
- 每页PDF占满容器宽度
- 自动高度，垂直滚动
- 页面之间无间隙

### 3. 数据字段说明

后端API返回的教学案例数据中需要包含以下字段：

```typescript
{
  // ... 其他字段
  designPdfUrl: string  // 教学设计PDF文档的URL地址
}
```

### 4. 使用方式

#### 前端使用
当后端API返回的数据中包含 `designPdfUrl` 字段时，点击"教学设计"标签即可自动加载并显示PDF文档。

#### PDF文件要求
- 支持标准的PDF格式
- 建议文件大小不超过10MB以保证加载速度
- PDF文件需要托管在可访问的URL地址

### 5. 展示效果

- **布局**：左侧是标签菜单，右侧是PDF内容区域
- **宽度**：PDF内容最大宽度914px，水平居中
- **滚动**：内容区域支持垂直滚动，每页PDF占满宽度
- **响应式**：PDF自动适应容器宽度，高度按比例自动计算

### 6. 降级处理

如果没有提供 `designPdfUrl`，页面会显示"暂无教学设计文档"的提示信息。

## 后端对接

后端API需要确保在返回教学案例详情时包含 `designPdfUrl` 字段：

```json
{
  "code": 200,
  "data": {
    "id": "123",
    "title": "课程名称",
    "designPdfUrl": "https://example.com/path/to/design.pdf",
    // ... 其他字段
  }
}
```

## 测试建议

1. **测试有PDF的情况**：确保PDF能正常加载和显示
2. **测试无PDF的情况**：确保降级提示正常显示
3. **测试大文件**：测试较大PDF文件的加载性能
4. **测试多页PDF**：确保多页PDF能正常滚动浏览
5. **测试不同格式**：测试不同来源的PDF文件兼容性

## 注意事项

1. PDF文件需要配置CORS允许跨域访问
2. 建议对PDF文件进行压缩优化以提升加载速度
3. 大文件可能需要添加加载状态提示
4. 如果PDF加载失败，建议添加错误处理和重试机制

## 后续优化建议

1. 添加PDF加载进度条
2. 添加页码导航功能
3. 添加缩放控制功能
4. 添加下载PDF功能
5. 添加打印功能




