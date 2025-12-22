<template>
  <div class="practice-case">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="page-title">
        <h2>习思想融入学科教学实践示范案例展播</h2>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-left: 8px;">
          <path d="M12 5.33333L6.66667 10.6667L4 8" stroke="#999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <p class="page-desc">管理习思想融入学科教学实践示范案例</p>
    </div>

    <!-- 搜索和筛选栏 -->
    <div class="page-toolbar">
      <div class="toolbar-left">
        <div class="search-box">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="#999" stroke-width="1.5"/>
            <path d="M11 11L14 14" stroke="#999" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="搜索标题..."
            class="search-input"
            @input="handleSearch"
          />
        </div>
        
        <select v-model="statusFilter" class="filter-select" @change="handleFilter">
          <option value="all">全部状态</option>
          <option value="active">显示中</option>
          <option value="inactive">已隐藏</option>
        </select>
      </div>

      <button class="btn-add" @click="showAddDialog = true">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 2.33333V11.6667M2.33333 7H11.6667" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
        新增
      </button>
    </div>

    <!-- 数据统计 -->
    <div class="data-stats">
      共 {{ totalCount }} 条，筛选结果 {{ filteredItems.length }} 条
    </div>

    <!-- 列表内容 -->
    <div class="content-list">
      <div
        v-for="(item, index) in filteredItems"
        :key="item.id"
        class="content-item"
        :draggable="true"
        @dragstart="handleDragStart(index, $event)"
        @dragover.prevent
        @drop="handleDrop(index, $event)"
      >
        <!-- 拖动手柄 -->
        <div class="drag-handle">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="5" cy="3" r="1" fill="#999"/>
            <circle cx="11" cy="3" r="1" fill="#999"/>
            <circle cx="5" cy="8" r="1" fill="#999"/>
            <circle cx="11" cy="8" r="1" fill="#999"/>
            <circle cx="5" cy="13" r="1" fill="#999"/>
            <circle cx="11" cy="13" r="1" fill="#999"/>
          </svg>
        </div>

        <!-- 缩略图 -->
        <div class="item-thumbnail">
          <img :src="item.cover || '/images/home/video-1.jpg'" :alt="item.title" />
        </div>

        <!-- 内容信息 -->
        <div class="item-content">
          <h3 class="item-title">{{ item.title }}</h3>
          
          <div class="item-meta">
            <div class="meta-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 7C8.38071 7 9.5 5.88071 9.5 4.5C9.5 3.11929 8.38071 2 7 2C5.61929 2 4.5 3.11929 4.5 4.5C4.5 5.88071 5.61929 7 7 7Z" fill="#666"/>
                <path d="M7 8.5C4.51472 8.5 2.5 10.0147 2.5 11.9V12.5H11.5V11.9C11.5 10.0147 9.48528 8.5 7 8.5Z" fill="#666"/>
              </svg>
              <span>{{ item.teacher }}</span>
            </div>

            <div class="meta-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M12 5.5L7 2L2 5.5V11C2 11.2652 2.10536 11.5196 2.29289 11.7071C2.48043 11.8946 2.73478 12 3 12H11C11.2652 12 11.5196 11.8946 11.7071 11.7071C11.8946 11.5196 12 11.2652 12 11V5.5Z" stroke="#d4a574" stroke-width="1.2" fill="none"/>
              </svg>
              <span style="color: #d4a574;">{{ item.college }}</span>
            </div>

            <span class="category-tag">{{ item.category }}</span>
          </div>

          <p class="item-description">{{ item.description }}</p>

          <div class="item-footer">
            <div class="footer-info">
              <span class="sort-info">排序：第 {{ index + 1 }} 位</span>
              <span class="time-info">发布时间：{{ item.publishTime }}</span>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="item-actions">
          <button class="action-btn action-btn--edit" @click="editItem(item)" title="编辑">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.3879 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08575 14.552 3.33337C14.552 3.58099 14.5032 3.82619 14.4084 4.05497C14.3137 4.28374 14.1748 4.49161 13.9997 4.66671L5.33301 13.3334L1.99967 14.3334L2.99967 11L11.6663 2.33337L11.333 2.00004Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="action-btn action-btn--preview" @click="previewItem(item)" title="预览">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.5"/>
            </svg>
          </button>
          <button class="action-btn action-btn--delete" @click="deleteItem(item.id)" title="删除">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4H3.33333H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5.33301 4.00004V2.66671C5.33301 2.31309 5.47348 1.97395 5.72353 1.7239C5.97358 1.47385 6.31272 1.33337 6.66634 1.33337H9.33301C9.68663 1.33337 10.0258 1.47385 10.2758 1.7239C10.5259 1.97395 10.6663 2.31309 10.6663 2.66671V4.00004M12.6663 4.00004V13.3334C12.6663 13.687 12.5259 14.0261 12.2758 14.2762C12.0258 14.5262 11.6866 14.6667 11.333 14.6667H4.66634C4.31272 14.6667 3.97358 14.5262 3.72353 14.2762C3.47348 14.0261 3.33301 13.687 3.33301 13.3334V4.00004H12.6663Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredItems.length === 0" class="empty-state">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" stroke="#d9d9d9" stroke-width="2"/>
          <path d="M32 20V36M32 44H32.02" stroke="#d9d9d9" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <p>暂无数据</p>
      </div>
    </div>

    <!-- 新增/编辑对话框 -->
    <div v-if="showAddDialog || showEditDialog" class="dialog-overlay" @click.self="closeDialog">
      <div class="dialog">
        <div class="dialog__header">
          <h3>{{ showEditDialog ? '编辑案例' : '新增案例' }}</h3>
          <button class="dialog__close" @click="closeDialog">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="#666" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        
        <div class="dialog__body">
          <div class="form-group">
            <label>标题 <span class="required">*</span></label>
            <input
              v-model="formData.title"
              type="text"
              placeholder="请输入标题"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label>封面图片 <span class="required">*</span></label>
            <div class="image-upload-box">
              <input
                ref="coverInput"
                type="file"
                accept="image/*"
                style="display: none"
                @change="handleCoverChange"
              />
              <div v-if="formData.cover" class="image-preview-box">
                <img :src="formData.cover" alt="预览" />
                <button class="btn-remove-image" @click="removeCover">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
              <div v-else class="image-upload-empty">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <rect x="10" y="15" width="60" height="50" rx="4" stroke="#999" stroke-width="2" fill="none"/>
                  <circle cx="30" cy="32" r="6" stroke="#999" stroke-width="2" fill="none"/>
                  <path d="M10 55L25 40L35 50L50 35L70 55" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p class="upload-hint">上传封面图片</p>
                <button class="btn-upload-blue" type="button" @click="triggerCoverUpload">选择图片</button>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>教师姓名 <span class="required">*</span></label>
            <input
              v-model="formData.teacherName"
              type="text"
              placeholder="请输入教师姓名"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label>所属单位 <span class="required">*</span></label>
            <select v-model="formData.unit" class="form-input">
              <option value="">请选择学院</option>
              <option value="电气工程与自动学院">电气工程与自动学院</option>
              <option value="计算机学院">计算机学院</option>
              <option value="机械学院">机械学院</option>
              <option value="化学学院">化学学院</option>
              <option value="数学与统计学院">数学与统计学院</option>
              <option value="物理与信息工程学院">物理与信息工程学院</option>
              <option value="土木工程学院">土木工程学院</option>
              <option value="经济与管理学院">经济与管理学院</option>
              <option value="马克思主义学院">马克思主义学院</option>
            </select>
          </div>

          <div class="form-group">
            <label>课程分类 <span class="required">*</span></label>
            <select v-model="formData.category" class="form-input">
              <option value="">请选择课程分类</option>
              <option value="专业必修课程">专业必修课程</option>
              <option value="通识教育课程">通识教育课程</option>
              <option value="专业选修课程">专业选修课程</option>
              <option value="实践课程">实践课程</option>
            </select>
          </div>

          <div class="form-group">
            <label>详情内容 <span class="required">*</span></label>
            <textarea
              v-model="formData.content"
              rows="10"
              placeholder="请输入详情内容（支持富文本）"
              class="form-textarea"
            ></textarea>
            <small class="field-hint">提示：实际使用时可集成富文本编辑器</small>
          </div>

          <div class="form-group">
            <label>显示顺序</label>
            <input
              v-model.number="formData.displayOrder"
              type="number"
              min="1"
              class="form-input"
              placeholder="1"
            />
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input v-model="formData.showOnFrontend" type="checkbox" />
              <span>前台显示</span>
            </label>
          </div>
        </div>

        <div class="dialog__footer">
          <button class="btn-cancel" @click="closeDialog">取消</button>
          <button class="btn-confirm" @click="saveItem">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11.6667 6.33333V11.6667C11.6667 12.0203 11.5262 12.3594 11.2762 12.6095C11.0261 12.8595 10.687 13 10.3333 13H3.66667C3.31304 13 2.97391 12.8595 2.72386 12.6095C2.47381 12.3594 2.33333 12.0203 2.33333 11.6667V2.33333C2.33333 1.97971 2.47381 1.64057 2.72386 1.39052C2.97391 1.14048 3.31304 1 3.66667 1H9L11.6667 3.66667V6.33333Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.66667 13V8.33333H4.33333V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            保存
          </button>
        </div>
      </div>
    </div>

    <!-- 预览对话框 -->
    <div v-if="showPreviewDialog" class="dialog-overlay" @click.self="showPreviewDialog = false">
      <div class="dialog dialog--large">
        <div class="dialog__header">
          <h3>案例预览</h3>
          <button class="dialog__close" @click="showPreviewDialog = false">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="#666" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        
        <div class="dialog__body">
          <div v-if="previewData" class="preview-content">
            <div v-if="previewData.cover" class="preview-cover">
              <img :src="previewData.cover" alt="封面" />
            </div>
            <h2>{{ previewData.title }}</h2>
            <div class="preview-meta">
              <span>教师：{{ previewData.teacher }}</span>
              <span>学院：{{ previewData.college }}</span>
              <span>类别：{{ previewData.category }}</span>
            </div>
            <p class="preview-description">{{ previewData.description }}</p>
            <div class="preview-time">发布时间：{{ previewData.publishTime }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface CaseItem {
  id: string
  title: string
  teacher: string
  college: string
  category: string
  description: string
  status: 'active' | 'inactive'
  publishTime: string
  cover?: string
  sort: number
}

// 数据列表
const items = ref<CaseItem[]>([
  {
    id: '1',
    title: '新时代中国特色社会主义思想融入专业课程实践',
    teacher: '张教授',
    college: '计算机学院',
    category: '专业必修课程',
    description: '本课程将新时代中国特色社会主义思想与专业教学深度融合。',
    status: 'active',
    publishTime: '2024-11-20',
    cover: '/images/home/video-1.jpg',
    sort: 1
  },
  {
    id: '2',
    title: '工程伦理与职业道德',
    teacher: '王教授',
    college: '机械学院',
    category: '通识教育课程',
    description: '通过案例教学，引导学生树立正确的工程伦理观。',
    status: 'active',
    publishTime: '2024-11-18',
    cover: '/images/home/video-2.jpg',
    sort: 2
  }
])

// 搜索和筛选
const searchKeyword = ref('')
const statusFilter = ref('all')

// 对话框状态
const showAddDialog = ref(false)
const showEditDialog = ref(false)
const showPreviewDialog = ref(false)
const coverInput = ref<HTMLInputElement | null>(null)

// 表单数据
const formData = ref({
  id: '',
  title: '',
  cover: '',
  teacherName: '',
  unit: '',
  category: '',
  content: '',
  displayOrder: 1,
  showOnFrontend: true
})

// 预览数据
const previewData = ref<CaseItem | null>(null)

// 拖拽相关
const draggedIndex = ref<number | null>(null)

// 计算属性
const totalCount = computed(() => items.value.length)

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchSearch = !searchKeyword.value || 
      item.title.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchKeyword.value.toLowerCase())
    const matchStatus = statusFilter.value === 'all' || item.status === statusFilter.value
    return matchSearch && matchStatus
  }).sort((a, b) => a.sort - b.sort)
})

// 搜索处理
const handleSearch = () => {
  // 搜索逻辑已通过 computed 实现
}

// 筛选处理
const handleFilter = () => {
  // 筛选逻辑已通过 computed 实现
}

// 拖拽开始
const handleDragStart = (index: number, event: DragEvent) => {
  draggedIndex.value = index
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
  }
}

// 拖拽放下
const handleDrop = (targetIndex: number, event: DragEvent) => {
  event.preventDefault()
  if (draggedIndex.value === null || draggedIndex.value === targetIndex) return

  const draggedItem = filteredItems.value[draggedIndex.value]
  const targetItem = filteredItems.value[targetIndex]
  
  // 交换排序
  const tempSort = draggedItem.sort
  draggedItem.sort = targetItem.sort
  targetItem.sort = tempSort

  draggedIndex.value = null
}

// 触发封面上传
const triggerCoverUpload = () => {
  coverInput.value?.click()
}

// 处理封面选择
const handleCoverChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      formData.value.cover = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

// 移除封面
const removeCover = () => {
  formData.value.cover = ''
  if (coverInput.value) {
    coverInput.value.value = ''
  }
}

// 编辑项目
const editItem = (item: CaseItem) => {
  formData.value = {
    id: item.id,
    title: item.title,
    cover: item.cover || '',
    teacherName: item.teacher,
    unit: item.college,
    category: item.category,
    content: item.description,
    displayOrder: item.sort,
    showOnFrontend: item.status === 'active'
  }
  showEditDialog.value = true
}

// 预览项目
const previewItem = (item: CaseItem) => {
  previewData.value = item
  showPreviewDialog.value = true
}

// 删除项目
const deleteItem = (id: string) => {
  if (confirm('确定要删除这个案例吗？')) {
    const index = items.value.findIndex(item => item.id === id)
    if (index > -1) {
      items.value.splice(index, 1)
      // 重新排序
      items.value.forEach((item, idx) => {
        item.sort = idx + 1
      })
    }
  }
}

// 保存项目
const saveItem = () => {
  // 验证必填项
  if (!formData.value.title) {
    alert('请输入标题')
    return
  }
  if (!formData.value.cover) {
    alert('请上传封面图片')
    return
  }
  if (!formData.value.teacherName) {
    alert('请输入教师姓名')
    return
  }
  if (!formData.value.unit) {
    alert('请选择所属单位')
    return
  }
  if (!formData.value.category) {
    alert('请选择课程分类')
    return
  }
  if (!formData.value.content) {
    alert('请输入详情内容')
    return
  }

  if (showEditDialog.value) {
    // 编辑
    const index = items.value.findIndex(item => item.id === formData.value.id)
    if (index > -1) {
      items.value[index] = {
        ...items.value[index],
        title: formData.value.title,
        teacher: formData.value.teacherName,
        college: formData.value.unit,
        category: formData.value.category,
        description: formData.value.content,
        status: formData.value.showOnFrontend ? 'active' : 'inactive',
        cover: formData.value.cover,
        sort: formData.value.displayOrder
      }
    }
  } else {
    // 新增
    const newItem: CaseItem = {
      id: Date.now().toString(),
      title: formData.value.title,
      teacher: formData.value.teacherName,
      college: formData.value.unit,
      category: formData.value.category,
      description: formData.value.content,
      status: formData.value.showOnFrontend ? 'active' : 'inactive',
      publishTime: new Date().toISOString().split('T')[0],
      cover: formData.value.cover,
      sort: formData.value.displayOrder || items.value.length + 1
    }
    items.value.push(newItem)
  }

  closeDialog()
}

// 关闭对话框
const closeDialog = () => {
  showAddDialog.value = false
  showEditDialog.value = false
  formData.value = {
    id: '',
    title: '',
    cover: '',
    teacherName: '',
    unit: '',
    category: '',
    content: '',
    displayOrder: 1,
    showOnFrontend: true
  }
}
</script>

<style scoped>
.practice-case {
  max-width: 1400px;
}

/* 页面标题 */
.page-header {
  margin-bottom: 24px;
}

.page-title {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.page-title h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 400;
  color: #e31e24;
}

.page-desc {
  margin: 0;
  font-size: 14px;
  color: #666;
}

/* 工具栏 */
.page-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 16px;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  min-width: 240px;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
}

.filter-select {
  padding: 8px 12px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  min-width: 120px;
}

.btn-add {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  background: #e31e24;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
  flex-shrink: 0;
}

.btn-add:hover {
  background: #c71b20;
}

/* 数据统计 */
.data-stats {
  margin-bottom: 16px;
  font-size: 14px;
  color: #666;
}

/* 列表内容 */
.content-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.content-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  transition: all 0.3s;
  cursor: move;
}

.content-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.drag-handle {
  flex-shrink: 0;
  padding: 8px 4px;
  cursor: grab;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.drag-handle:hover {
  opacity: 1;
}

.item-thumbnail {
  width: 160px;
  height: 100px;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
  background: #f5f5f5;
}

.item-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-title {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.item-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #666;
}

.category-tag {
  padding: 2px 12px;
  background: #fff7e6;
  color: #d48806;
  border-radius: 2px;
  font-size: 12px;
}

.item-description {
  margin: 8px 0;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.item-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
}

.footer-info {
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 14px;
  color: #999;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.action-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn--edit {
  color: #1890ff;
}

.action-btn--edit:hover {
  background: #e6f7ff;
}

.action-btn--preview {
  color: #666;
}

.action-btn--preview:hover {
  background: #f5f5f5;
}

.action-btn--delete {
  color: #ff4d4f;
}

.action-btn--delete:hover {
  background: #fff1f0;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #999;
}

.empty-state p {
  margin: 16px 0 0;
  font-size: 14px;
}

/* 对话框 */
.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.dialog {
  width: 600px;
  max-width: 90vw;
  max-height: 85vh;
  background: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.dialog--large {
  width: 800px;
}

.dialog__header {
  padding: 20px 24px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.dialog__header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.dialog__close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.dialog__close:hover {
  background: #f5f5f5;
}

.dialog__body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.form-group {
  margin-bottom: 20px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.required {
  color: #ff4d4f;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #e31e24;
}

textarea.form-input {
  resize: vertical;
  min-height: 80px;
}

.form-textarea {
  width: 100%;
  min-height: 200px;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  line-height: 1.8;
  resize: vertical;
  transition: border-color 0.3s;
}

.form-textarea:focus {
  outline: none;
  border-color: #e31e24;
}

.field-hint {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: #999;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #1890ff;
}

/* 图片上传区域 */
.image-upload-box {
  border: 2px dashed #d9d9d9;
  border-radius: 4px;
  padding: 24px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-preview-box {
  position: relative;
  width: 100%;
}

.image-preview-box img {
  width: 100%;
  max-height: 200px;
  object-fit: contain;
}

.btn-remove-image {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-remove-image:hover {
  background: rgba(0, 0, 0, 0.8);
}

.image-upload-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.upload-hint {
  margin: 0;
  font-size: 14px;
  color: #999;
}

.upload-title {
  margin: 0;
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.btn-upload-blue {
  padding: 8px 24px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-upload-blue:hover {
  background: #096dd9;
}

.dialog__footer {
  padding: 16px 24px;
  border-top: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-shrink: 0;
}

.btn-cancel,
.btn-confirm {
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-cancel {
  background: white;
  color: #333;
  border: 1px solid #d9d9d9;
}

.btn-cancel:hover {
  border-color: #e31e24;
  color: #e31e24;
}

.btn-confirm {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #e31e24;
  color: white;
  border: none;
}

.btn-confirm:hover {
  background: #c71b20;
}

/* 预览内容 */
.preview-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.preview-cover {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.preview-cover img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
}

.preview-content h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.preview-meta {
  display: flex;
  gap: 24px;
  font-size: 14px;
  color: #666;
}

.preview-description {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
}

.preview-time {
  font-size: 14px;
  color: #999;
}
</style>

