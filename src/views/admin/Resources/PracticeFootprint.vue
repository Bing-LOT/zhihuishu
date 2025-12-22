<template>
  <div class="practice-footprint">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="page-title">
        <h2>总书记的福建足迹</h2>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-left: 8px;">
          <path d="M12 5.33333L6.66667 10.6667L4 8" stroke="#999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <p class="page-desc">管理总书记的福建足迹内容和Banner图</p>
    </div>

    <!-- Banner图管理 -->
    <div class="banner-section">
      <h3 class="section-title">Banner图管理</h3>
      <button class="btn-add-banner" @click="showBannerDialog = true">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 2.33333V11.6667M2.33333 7H11.6667" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
        添加Banner图
      </button>

      <div class="banner-list">
        <div
          v-for="banner in banners"
          :key="banner.id"
          class="banner-card"
        >
          <div class="banner-card__image">
            <img :src="banner.image" :alt="banner.title" />
            <button class="banner-card__delete" @click="deleteBanner(banner.id)">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 内容列表区域 -->
    <div class="content-section">
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

          <!-- 内容信息 -->
          <div class="item-content">
            <div class="item-header">
              <h3 class="item-title">{{ item.title }}</h3>
              <span v-if="item.isPinned" class="badge-pinned">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z" fill="white"/>
                </svg>
                置顶
              </span>
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
            <button
              :class="['action-btn', 'action-btn--pin', { 'action-btn--pinned': item.isPinned }]"
              @click="togglePin(item)"
              :title="item.isPinned ? '取消置顶' : '置顶'"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L9.545 5.13L13 5.635L10.5 8.07L11.09 11.51L8 9.885L4.91 11.51L5.5 8.07L3 5.635L6.455 5.13L8 2Z" :fill="item.isPinned ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </button>
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
    </div>

    <!-- Banner对话框 -->
    <div v-if="showBannerDialog" class="dialog-overlay" @click.self="closeBannerDialog">
      <div class="dialog">
        <div class="dialog__header">
          <h3>添加Banner图</h3>
          <button class="dialog__close" @click="closeBannerDialog">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="#666" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        
        <div class="dialog__body">
          <div class="form-group">
            <label>Banner图片 <span class="required">*</span></label>
            <div class="image-upload-box">
              <input
                ref="bannerInput"
                type="file"
                accept="image/*"
                style="display: none"
                @change="handleBannerChange"
              />
              <div v-if="bannerFormData.image" class="image-preview-box">
                <img :src="bannerFormData.image" alt="预览" />
                <button class="btn-remove-image" @click="removeBannerImage">
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
                <p class="upload-hint">上传Banner图片</p>
                <button class="btn-upload-blue" type="button" @click="triggerBannerUpload">选择图片</button>
              </div>
            </div>
          </div>
        </div>

        <div class="dialog__footer">
          <button class="btn-cancel" @click="closeBannerDialog">取消</button>
          <button class="btn-confirm" @click="saveBanner">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11.6667 6.33333V11.6667C11.6667 12.0203 11.5262 12.3594 11.2762 12.6095C11.0261 12.8595 10.687 13 10.3333 13H3.66667C3.31304 13 2.97391 12.8595 2.72386 12.6095C2.47381 12.3594 2.33333 12.0203 2.33333 11.6667V2.33333C2.33333 1.97971 2.47381 1.64057 2.72386 1.39052C2.97391 1.14048 3.31304 1 3.66667 1H9L11.6667 3.66667V6.33333Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.66667 13V8.33333H4.33333V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            保存
          </button>
        </div>
      </div>
    </div>

    <!-- 新增/编辑内容对话框 -->
    <div v-if="showAddDialog || showEditDialog" class="dialog-overlay" @click.self="closeDialog">
      <div class="dialog">
        <div class="dialog__header">
          <h3>{{ showEditDialog ? '编辑内容' : '新增内容' }}</h3>
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
              placeholder="定选事件名称"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label>足迹内容类型 <span class="required">*</span></label>
            <div class="radio-group">
              <label class="radio-label">
                <input
                  v-model="formData.contentType"
                  type="radio"
                  value="richtext"
                  name="contentType"
                />
                <span>富文本内容（内部详情）</span>
              </label>
              <label class="radio-label">
                <input
                  v-model="formData.contentType"
                  type="radio"
                  value="url"
                  name="contentType"
                />
                <span>URL地址（外部跳转）</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>内容配置 <span class="required">*</span></label>
            <textarea
              v-model="formData.content"
              rows="8"
              :placeholder="formData.contentType === 'richtext' 
                ? '根据内容类型选择，配置富文本详情或URL跳转地址' 
                : '请输入URL地址'"
              class="form-textarea"
            ></textarea>
            <small class="field-hint">
              提示：若选择富文本内容，此处输入详情；若选择URL地址，此处输入链接
            </small>
          </div>

          <div class="form-group">
            <label class="toggle-label">
              <div class="toggle-label-text">
                <span>是否置顶</span>
                <small>用于控制该足迹是否置顶显示</small>
              </div>
              <label class="toggle-switch">
                <input v-model="formData.isPinned" type="checkbox" />
                <span class="toggle-slider"></span>
              </label>
            </label>
          </div>

          <div class="form-group">
            <label class="toggle-label">
              <div class="toggle-label-text">
                <span>前台显示状态 <span class="required">*</span></span>
                <small>控制足迹数据在前台的展示状态</small>
              </div>
              <label class="toggle-switch">
                <input v-model="formData.showOnFrontend" type="checkbox" />
                <span class="toggle-slider"></span>
              </label>
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
          <h3>内容预览</h3>
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

interface BannerItem {
  id: string
  title: string
  image: string
}

interface ContentItem {
  id: string
  title: string
  description: string
  cover?: string
  status: 'active' | 'inactive'
  publishTime: string
  isPinned: boolean
  sort: number
}

// Banner列表
const banners = ref<BannerItem[]>([
  {
    id: '1',
    title: 'Banner 1',
    image: '/images/home/video-1.jpg'
  },
  {
    id: '2',
    title: 'Banner 2',
    image: '/images/home/video-2.jpg'
  }
])

// 内容列表
const items = ref<ContentItem[]>([
  {
    id: '1',
    title: '新时代中国特色社会主义思想融入专业课程实践',
    description: '本课程将新时代中国特色社会主义思想与专业教学深度融合。',
    status: 'active',
    publishTime: '2024-11-20',
    isPinned: true,
    sort: 1
  },
  {
    id: '2',
    title: '工程伦理与职业道德',
    description: '通过案例教学，引导学生树立正确的工程伦理观。',
    status: 'active',
    publishTime: '2024-11-18',
    isPinned: false,
    sort: 2
  }
])

// 搜索和筛选
const searchKeyword = ref('')
const statusFilter = ref('all')

// 对话框状态
const showBannerDialog = ref(false)
const showAddDialog = ref(false)
const showEditDialog = ref(false)
const showPreviewDialog = ref(false)
const bannerInput = ref<HTMLInputElement | null>(null)

// Banner表单数据
const bannerFormData = ref({
  image: ''
})

// 内容表单数据
const formData = ref({
  id: '',
  title: '',
  contentType: 'richtext' as 'richtext' | 'url',
  content: '',
  isPinned: false,
  showOnFrontend: true
})

// 预览数据
const previewData = ref<ContentItem | null>(null)

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
  }).sort((a, b) => {
    // 置顶的排在前面
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return a.sort - b.sort
  })
})

// 搜索处理
const handleSearch = () => {
  // 搜索逻辑已通过 computed 实现
}

// 筛选处理
const handleFilter = () => {
  // 筛选逻辑已通过 computed 实现
}

// === Banner管理 ===
const triggerBannerUpload = () => {
  bannerInput.value?.click()
}

const handleBannerChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      bannerFormData.value.image = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const removeBannerImage = () => {
  bannerFormData.value.image = ''
  if (bannerInput.value) {
    bannerInput.value.value = ''
  }
}

const saveBanner = () => {
  if (!bannerFormData.value.image) {
    alert('请上传Banner图片')
    return
  }

  const newBanner: BannerItem = {
    id: Date.now().toString(),
    title: `Banner ${banners.value.length + 1}`,
    image: bannerFormData.value.image
  }
  banners.value.push(newBanner)
  closeBannerDialog()
}

const deleteBanner = (id: string) => {
  if (confirm('确定要删除这个Banner吗？')) {
    const index = banners.value.findIndex(b => b.id === id)
    if (index > -1) {
      banners.value.splice(index, 1)
    }
  }
}

const closeBannerDialog = () => {
  showBannerDialog.value = false
  bannerFormData.value = { image: '' }
}

// === 内容管理 ===
const handleDragStart = (index: number, event: DragEvent) => {
  draggedIndex.value = index
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
  }
}

const handleDrop = (targetIndex: number, event: DragEvent) => {
  event.preventDefault()
  if (draggedIndex.value === null || draggedIndex.value === targetIndex) return

  const draggedItem = filteredItems.value[draggedIndex.value]
  const targetItem = filteredItems.value[targetIndex]
  
  const tempSort = draggedItem.sort
  draggedItem.sort = targetItem.sort
  targetItem.sort = tempSort

  draggedIndex.value = null
}

const togglePin = (item: ContentItem) => {
  item.isPinned = !item.isPinned
}

const editItem = (item: ContentItem) => {
  formData.value = {
    id: item.id,
    title: item.title,
    contentType: 'richtext',
    content: item.description,
    isPinned: item.isPinned,
    showOnFrontend: item.status === 'active'
  }
  showEditDialog.value = true
}

const previewItem = (item: ContentItem) => {
  previewData.value = item
  showPreviewDialog.value = true
}

const deleteItem = (id: string) => {
  if (confirm('确定要删除这条内容吗？')) {
    const index = items.value.findIndex(item => item.id === id)
    if (index > -1) {
      items.value.splice(index, 1)
      items.value.forEach((item, idx) => {
        item.sort = idx + 1
      })
    }
  }
}

const saveItem = () => {
  if (!formData.value.title) {
    alert('请输入标题')
    return
  }
  if (!formData.value.content) {
    alert('请输入内容配置')
    return
  }
  
  // 验证URL格式
  if (formData.value.contentType === 'url') {
    try {
      new URL(formData.value.content)
    } catch {
      alert('请输入有效的URL地址')
      return
    }
  }

  if (showEditDialog.value) {
    const index = items.value.findIndex(item => item.id === formData.value.id)
    if (index > -1) {
      items.value[index] = {
        ...items.value[index],
        title: formData.value.title,
        description: formData.value.content,
        status: formData.value.showOnFrontend ? 'active' : 'inactive',
        isPinned: formData.value.isPinned
      }
    }
  } else {
    const newItem: ContentItem = {
      id: Date.now().toString(),
      title: formData.value.title,
      description: formData.value.content,
      status: formData.value.showOnFrontend ? 'active' : 'inactive',
      publishTime: new Date().toISOString().split('T')[0],
      isPinned: formData.value.isPinned,
      sort: items.value.length + 1
    }
    items.value.push(newItem)
  }

  closeDialog()
}

const closeDialog = () => {
  showAddDialog.value = false
  showEditDialog.value = false
  formData.value = {
    id: '',
    title: '',
    contentType: 'richtext',
    content: '',
    isPinned: false,
    showOnFrontend: true
  }
}
</script>

<style scoped>
.practice-footprint {
  max-width: 1400px;
}

/* 页面标题 */
.page-header {
  margin-bottom: 32px;
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

/* Banner区域 */
.banner-section {
  margin-bottom: 40px;
}

.section-title {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.btn-add-banner {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
  margin-bottom: 16px;
}

.btn-add-banner:hover {
  background: #096dd9;
}

.banner-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 16px;
}

.banner-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.banner-card__image {
  position: relative;
  width: 100%;
  height: 140px;
  background: #f5f5f5;
}

.banner-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-card__delete {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(227, 30, 36, 0.8);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s;
}

.banner-card:hover .banner-card__delete {
  opacity: 1;
}

.banner-card__delete:hover {
  background: rgba(227, 30, 36, 1);
}

/* 内容区域 */
.content-section {
  background: white;
  border-radius: 8px;
  padding: 24px;
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

.data-stats {
  margin-bottom: 16px;
  font-size: 14px;
  color: #666;
}

/* 列表内容 */
.content-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.content-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  background: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  transition: all 0.3s;
  cursor: move;
}

.content-item:hover {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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

.item-content {
  flex: 1;
  min-width: 0;
}

.item-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.item-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.badge-pinned {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 10px;
  background: #e31e24;
  color: white;
  border-radius: 2px;
  font-size: 12px;
  flex-shrink: 0;
}

.item-description {
  margin: 0 0 12px;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.item-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.action-btn--pin {
  color: #faad14;
}

.action-btn--pin:hover {
  background: #fff7e6;
}

.action-btn--pinned {
  color: #faad14;
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
  padding: 60px 20px;
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

.form-textarea {
  width: 100%;
  min-height: 140px;
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

/* 单选按钮组 */
.radio-group {
  display: flex;
  gap: 32px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.radio-label input[type="radio"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #1890ff;
}

/* 开关标签 */
.toggle-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: #fafafa;
  border-radius: 4px;
}

.toggle-label-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.toggle-label-text span {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.toggle-label-text small {
  font-size: 12px;
  color: #999;
  font-weight: 400;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

.toggle-switch input:checked + .toggle-slider {
  background-color: #52c41a;
}

.toggle-switch input:checked + .toggle-slider:before {
  transform: translateX(20px);
}

/* 字段提示 */
.field-hint {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: #999;
}

/* 图片上传区域 */
.image-upload-box {
  border: 2px dashed #d9d9d9;
  border-radius: 4px;
  padding: 24px;
  min-height: 180px;
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
  max-height: 240px;
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

.preview-description {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  white-space: pre-wrap;
}

.preview-time {
  font-size: 14px;
  color: #999;
}
</style>

