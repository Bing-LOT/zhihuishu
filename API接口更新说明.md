# API 接口更新说明

## 更新时间
2026-01-16

## 详情接口更新

### 接口地址
```
旧接口：/api/special/college/detail/{id}
新接口：/api/special/college/get/{id}
```

### 返回数据结构

#### HTTP 响应格式
```typescript
{
  msg: string      // 消息
  code: number     // 状态码，200=成功，其他为失败
  data: object     // 数据对象
}
```

#### data 字段结构（CollegeItem）

```typescript
interface CollegeItem {
  id: number              // 业务id
  name: string           // 课程名称
  coverUrl: string       // 课程封面
  college: string        // 所在学院
  teachers: Teacher[]    // 教师信息数组
  levelName?: string     // 示范等级（如：国家示范、省级示范等）
  property?: string      // 课程性质
  brief?: string         // 课程简介
  docUrl?: string        // 教学设计文档URL
  videoUrl?: string      // 教学视频URL
  showStatPv?: number    // 显示学习统计：1=显示；0=不显示
  statPv: number         // 浏览量
  showFront: number      // 是否前台显示：1=显示；0=不显示
  exampleName?: string   // 案例名称
  direction?: string     // 入选方向：面向产出、教学有道、默认：无
  content?: string       // 思政元素
  createTime?: string    // 发布时间
}
```

#### Teacher 结构
```typescript
interface Teacher {
  name: string    // 教师姓名
  title: string   // 教师职称
}
```

### 字段说明

#### 新增字段
1. **levelName** - 示范等级
   - 用途：显示课程的示范等级（如"国家示范"）
   - 显示位置：封面图右上角的标签

2. **property** - 课程性质
   - 用途：标识课程的性质分类
   - 可用于筛选和展示

3. **brief** - 课程简介
   - 用途：课程的简要介绍
   - 显示位置：详情卡片中的"课程简介"区域

4. **docUrl** - 教学设计文档
   - 用途：教学设计文档的下载地址
   - 可用于文档下载功能

5. **showStatPv** - 显示学习统计
   - 用途：控制是否显示浏览量统计
   - 取值：1=显示，0=不显示

6. **exampleName** - 案例名称
   - 用途：案例的具体名称

7. **direction** - 入选方向
   - 用途：标识案例的入选方向
   - 可选值：面向产出、教学有道、无（默认）

8. **content** - 思政元素
   - 用途：思政相关的内容描述
   - 注意：与之前的"课程详细内容"语义不同

#### 字段变化

| 旧字段名 | 新字段名 | 说明 |
|---------|---------|------|
| content | brief | 课程简介（语义更明确） |
| - | content | 思政元素（新增，用途不同） |
| types | - | 建设课程类型（详情接口中不返回，仅在列表接口中使用） |

### 更新的文件

1. **API 接口定义**
   - 文件：`src/api/college.ts`
   - 更新内容：
     - 更新 `CollegeItem` 接口定义
     - 更新 `getCollegeDetail` 接口路径

2. **详情页组件**
   - 文件：`src/views/College/Detail.vue`
   - 更新内容：
     - 使用 `brief` 字段显示课程简介
     - 添加 `levelName` 标签显示
     - 更新字段引用

### 兼容性说明

#### 可选字段
以下字段为可选字段，如果后端未返回，前端会使用默认值或隐藏相关UI：
- `levelName` - 无值时不显示标签
- `property` - 无值时不影响显示
- `brief` - 无值时显示"暂无简介"
- `docUrl` - 无值时不显示下载按钮
- `videoUrl` - 无值时显示"暂无视频"
- `exampleName` - 无值时不影响显示
- `direction` - 无值时不影响显示
- `content` - 无值时不影响显示
- `createTime` - 无值时不影响显示

#### 必需字段
以下字段为必需字段，必须有值：
- `id` - 业务主键
- `name` - 课程名称
- `coverUrl` - 封面图片
- `college` - 所在学院
- `teachers` - 教师信息（可以是空数组）
- `statPv` - 浏览量（可以为0）
- `showFront` - 是否前台显示

### 使用示例

#### 调用接口
```typescript
import { getCollegeDetail } from '@/api/college'

// 获取详情
const detail = await getCollegeDetail(1)

console.log(detail.name)        // 课程名称
console.log(detail.brief)       // 课程简介
console.log(detail.levelName)   // 示范等级
console.log(detail.videoUrl)    // 视频地址
```

#### 显示示范等级标签
```vue
<template>
  <!-- 如果有示范等级，显示标签 -->
  <div v-if="detail.levelName" class="level-badge">
    {{ detail.levelName }}
  </div>
</template>
```

#### 显示课程简介
```vue
<template>
  <div class="intro-content">
    <p>{{ detail.brief || '暂无简介' }}</p>
  </div>
</template>
```

#### 条件显示浏览量
```vue
<template>
  <!-- 根据 showStatPv 决定是否显示 -->
  <div v-if="detail.showStatPv === 1" class="detail-stats">
    <span>累计观看人数：{{ detail.statPv }}人</span>
  </div>
</template>
```

### 测试建议

#### 测试场景

1. **正常数据测试**
   - 所有字段都有值的情况
   - 验证所有信息正确显示

2. **可选字段缺失测试**
   - `levelName` 为空时，标签不显示
   - `brief` 为空时，显示"暂无简介"
   - `videoUrl` 为空时，显示"暂无视频"

3. **数组字段测试**
   - `teachers` 为空数组时不报错
   - `teachers` 有多个教师时正确显示

4. **异常情况测试**
   - 无效的 ID 参数
   - 后端返回 404
   - 网络错误

#### 测试数据示例

```json
{
  "msg": "成功",
  "code": 200,
  "data": {
    "id": 1,
    "coverUrl": "https://example.com/cover.jpg",
    "name": "交通运输系统导论",
    "levelName": "国家示范",
    "property": "专业课程",
    "college": "信息学院",
    "teachers": [
      {
        "name": "张教授",
        "title": "教授"
      }
    ],
    "brief": "本课程是交通运输专业的核心课程...",
    "docUrl": "https://example.com/doc.pdf",
    "videoUrl": "https://example.com/video.mp4",
    "showStatPv": 1,
    "statPv": 17645,
    "showFront": 1,
    "exampleName": "交通运输系统案例",
    "direction": "教学有道",
    "content": "课程融入思政元素..."
  }
}
```

### 注意事项

1. **字段命名**
   - `brief` 用于课程简介
   - `content` 用于思政元素
   - 两者语义不同，不要混淆

2. **显示控制**
   - 使用 `showStatPv` 控制浏览量显示
   - 使用 `showFront` 控制前台是否显示

3. **标签显示**
   - `levelName` 有值时才显示标签
   - 标签样式为渐变金色（`#bc7120` → `#bc2220`）

4. **教师信息**
   - `teachers` 是数组，即使没有教师也应返回空数组 `[]`
   - 不要返回 `null` 或 `undefined`

5. **URL 字段**
   - `coverUrl`、`videoUrl`、`docUrl` 应为完整的 URL
   - 支持相对路径和绝对路径

### 迁移指南

如果你的代码中还在使用旧的字段名或接口，请按以下步骤迁移：

#### 1. 更新 API 接口调用
```typescript
// 旧代码
const detail = await request.get('/api/special/college/detail/1')

// 新代码
import { getCollegeDetail } from '@/api/college'
const detail = await getCollegeDetail(1)
```

#### 2. 更新字段引用
```typescript
// 旧代码
console.log(detail.content)  // 课程详细内容

// 新代码
console.log(detail.brief)    // 课程简介
console.log(detail.content)  // 思政元素
```

#### 3. 添加新字段支持
```vue
<!-- 添加示范等级标签 -->
<div v-if="detail.levelName" class="level-badge">
  {{ detail.levelName }}
</div>

<!-- 添加教学设计文档下载 -->
<a v-if="detail.docUrl" :href="detail.docUrl" target="_blank">
  下载教学设计文档
</a>
```

---

## 相关文档

- [学院案例详情页开发说明](./学院案例详情页开发说明.md)
- [学院案例详情页快速开始](./学院案例详情页快速开始.md)
- [学院案例详情页完成总结](./学院案例详情页完成总结.md)

---

更新者：AI Assistant  
更新时间：2026-01-16

