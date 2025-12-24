<template>
  <div class="excellent-class">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="page-title">
        <h2>优秀思政课堂</h2>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-left: 8px;">
          <path d="M12 5.33333L6.66667 10.6667L4 8" stroke="#999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <p class="page-desc">管理优秀思政课堂内容</p>
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
      共 {{ pagination.total }} 条
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>

    <!-- 列表内容 -->
    <div v-else class="content-list">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="content-item"
      >
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

          <div class="item-description" v-html="getPlainText(item.description)"></div>

          <div class="item-footer">
            <div class="footer-info">
              <span class="time-info">发布时间：{{ item.publishTime || item.createTime || '-' }}</span>
              <span :class="['status-badge', item.showFront === 1 ? 'status-badge--active' : 'status-badge--inactive']">
                {{ item.showFront === 1 ? '已显示' : '已隐藏' }}
              </span>
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
      <div v-if="items.length === 0" class="empty-state">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" stroke="#d9d9d9" stroke-width="2"/>
          <path d="M32 20V36M32 44H32.02" stroke="#d9d9d9" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <p>暂无数据</p>
      </div>
    </div>

    <!-- 分页器 -->
    <div v-if="pagination.total > 0" class="pagination">
      <button 
        class="pagination-btn" 
        :disabled="pagination.current <= 1"
        @click="handlePageChange(pagination.current - 1)"
      >
        上一页
      </button>
      
      <div class="pagination-pages">
        <template v-for="page in visiblePages" :key="page">
          <span v-if="page === -1" class="pagination-ellipsis">...</span>
          <button
            v-else
            :class="['pagination-page', { 'pagination-page--active': page === pagination.current }]"
            @click="handlePageChange(page)"
          >
            {{ page }}
          </button>
        </template>
      </div>
      
      <button 
        class="pagination-btn"
        :disabled="pagination.current >= pagination.pages"
        @click="handlePageChange(pagination.current + 1)"
      >
        下一页
      </button>
      
      <div class="pagination-info">
        共 {{ pagination.total }} 条，第 {{ pagination.current }} / {{ pagination.pages }} 页
      </div>
    </div>

    <!-- 新增/编辑对话框 -->
    <div v-if="showAddDialog || showEditDialog" class="dialog-overlay" @click.self="closeDialog">
      <div class="dialog">
        <div class="dialog__header">
          <h3>{{ showEditDialog ? '编辑课堂' : '新增课堂' }}</h3>
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
              v-model="formData.teacher"
              type="text"
              placeholder="请输入教师姓名"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label>所属单位 <span class="required">*</span></label>
            <select v-model="formData.college" class="form-input">
              <option value="">请选择学院</option>
              <option value="计算机与大数据学院">计算机与大数据学院</option>
              <option value="机械工程学院">机械工程学院</option>
              <option value="材料科学与工程学院">材料科学与工程学院</option>
              <option value="化学化工学院">化学化工学院</option>
              <option value="土木工程学院">土木工程学院</option>
              <option value="经济与管理学院">经济与管理学院</option>
              <option value="法学院">法学院</option>
              <option value="外国语学院">外国语学院</option>
              <option value="数学与统计学院">数学与统计学院</option>
              <option value="物理与信息工程学院">物理与信息工程学院</option>
              <option value="生物科学与工程学院">生物科学与工程学院</option>
              <option value="环境与安全工程学院">环境与安全工程学院</option>
              <option value="建筑与城乡规划学院">建筑与城乡规划学院</option>
              <option value="紫金矿业学院">紫金矿业学院</option>
              <option value="海洋学院">海洋学院</option>
              <option value="石油化工学院">石油化工学院</option>
              <option value="交通运输学院">交通运输学院</option>
              <option value="马克思主义学院">马克思主义学院</option>
              <option value="人文社会科学学院">人文社会科学学院</option>
            </select>
          </div>

          <div class="form-group">
            <label>课程分类 <span class="required">*</span></label>
            <select v-model="formData.category" class="form-input">
              <option value="">请选择课程分类</option>
              <option value="通识教育课程">通识教育课程</option>
              <option value="学科基础课程">学科基础课程</option>
              <option value="专业必修课程">专业必修课程</option>
              <option value="专业选修课程">专业选修课程</option>
              <option value="跨学科或本硕博课程">跨学科或本硕博课程</option>
              <option value="双创实践与素质拓展课程">双创实践与素质拓展课程</option>
              <option value="集中性实践课程">集中性实践课程</option>
            </select>
          </div>

          <div class="form-group">
            <label>详情内容 <span class="required">*</span></label>
            <div class="editor-container">
              <Toolbar
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                mode="default"
                class="editor-toolbar"
              />
              <Editor
                v-model="formData.description"
                :defaultConfig="editorConfig"
                mode="default"
                class="editor-content"
                @onCreated="handleEditorCreated"
              />
            </div>
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
          <h3>课堂预览</h3>
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
            <div class="preview-description" v-html="previewData.description"></div>
            <div class="preview-time">发布时间：{{ previewData.publishTime }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, shallowRef, onBeforeUnmount } from 'vue'
import { 
  getNiceCoursePageList, 
  addNiceCourse, 
  editNiceCourse, 
  deleteNiceCourse,
  type NiceCourseItem 
} from '@/api/resource'
import { uploadFile } from '@/api/banner'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css'

// 数据列表
const items = ref<NiceCourseItem[]>([])

// 加载状态
const loading = ref(false)

// 分页信息
const pagination = ref({
  current: 1,
  size: 10,
  total: 0,
  pages: 0
})

// 搜索和筛选
const searchKeyword = ref('')
const statusFilter = ref<'all' | 'active' | 'inactive'>('all')

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
  teacher: '',
  college: '',
  category: '',
  description: '',
  displayOrder: 1,
  showOnFrontend: true
})

// 预览数据
const previewData = ref<NiceCourseItem | null>(null)

// 富文本编辑器
const editorRef = shallowRef()

// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入详情内容...',
  MENU_CONF: {
    uploadImage: {
      async customUpload(file: File, insertFn: (url: string) => void) {
        try {
          const result = await uploadFile(file)
          insertFn(result.url)
        } catch (error) {
          console.error('图片上传失败：', error)
          alert('图片上传失败')
        }
      }
    }
  }
}

// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {
  toolbarKeys: [
    'headerSelect',
    'bold',
    'italic',
    'underline',
    'color',
    'bgColor',
    '|',
    'fontSize',
    'fontFamily',
    'lineHeight',
    '|',
    'bulletedList',
    'numberedList',
    'todo',
    '|',
    'justifyLeft',
    'justifyCenter',
    'justifyRight',
    'justifyJustify',
    '|',
    'emotion',
    'insertLink',
    'uploadImage',
    'insertTable',
    'codeBlock',
    'divider',
    '|',
    'undo',
    'redo',
    '|',
    'fullScreen'
  ]
}

// 编辑器创建完成
const handleEditorCreated = (editor: any) => {
  editorRef.value = editor
}

// 获取纯文本（用于列表显示）
const getPlainText = (html: string) => {
  if (!html) return ''
  // 移除HTML标签，只保留文本内容，限制长度
  const text = html.replace(/<[^>]+>/g, '').substring(0, 150)
  return text + (html.length > 150 ? '...' : '')
}

// 计算可见的页码
const visiblePages = computed(() => {
  const total = pagination.value.pages
  const current = pagination.value.current
  const pages: number[] = []
  
  if (total <= 7) {
    // 总页数小于等于7，显示全部
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // 总页数大于7，显示部分
    if (current <= 4) {
      // 当前页在前面
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push(-1) // 省略号
      pages.push(total)
    } else if (current >= total - 3) {
      // 当前页在后面
      pages.push(1)
      pages.push(-1) // 省略号
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      // 当前页在中间
      pages.push(1)
      pages.push(-1) // 省略号
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push(-1) // 省略号
      pages.push(total)
    }
  }
  
  return pages
})

// 加载数据列表
const loadDataList = async () => {
  try {
    loading.value = true
    
    // 构建查询参数
    const params: any = {
      pageIndex: pagination.value.current,
      pageSize: pagination.value.size
    }
    
    // 添加搜索关键词
    if (searchKeyword.value.trim()) {
      params.keyword = searchKeyword.value.trim()
    }
    
    // 添加显示状态筛选
    if (statusFilter.value === 'active') {
      params.showFront = 1
    } else if (statusFilter.value === 'inactive') {
      params.showFront = 0
    }
    
    console.log('查询优秀思政课堂列表，参数：', params)
    
    const response = await getNiceCoursePageList(params)
    
    console.log('查询结果：', response)
    
    items.value = response.records || []
    pagination.value = {
      current: response.current || 1,
      size: response.size || 10,
      total: response.total || 0,
      pages: response.pages || 0
    }
  } catch (error) {
    console.error('加载数据失败：', error)
    alert('加载数据失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 搜索处理（防抖）
let searchTimer: number | null = null
const handleSearch = () => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }
  searchTimer = window.setTimeout(() => {
    pagination.value.current = 1 // 重置到第一页
    loadDataList()
  }, 500)
}

// 筛选处理
const handleFilter = () => {
  pagination.value.current = 1 // 重置到第一页
  loadDataList()
}

// 分页切换
const handlePageChange = (page: number) => {
  if (page < 1 || page > pagination.value.pages) return
  pagination.value.current = page
  loadDataList()
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
const editItem = (item: NiceCourseItem) => {
  formData.value = {
    id: item.id.toString(),
    title: item.title,
    cover: item.cover || '',
    teacher: item.teacher,
    college: item.college,
    category: item.category,
    description: item.description,
    displayOrder: item.displayOrder || 1,
    showOnFrontend: item.showFront === 1
  }
  showEditDialog.value = true
}

// 预览项目
const previewItem = (item: NiceCourseItem) => {
  previewData.value = item
  showPreviewDialog.value = true
}

// 删除项目
const deleteItem = async (id: string | number) => {
  if (!confirm('确定要删除这个课堂吗？')) {
    return
  }
  
  try {
    await deleteNiceCourse(id)
    alert('删除成功')
    loadDataList() // 重新加载列表
  } catch (error) {
    console.error('删除失败：', error)
    alert('删除失败，请稍后重试')
  }
}

// 保存项目
const saveItem = async () => {
  // 验证必填项
  if (!formData.value.title) {
    alert('请输入标题')
    return
  }
  if (!formData.value.cover) {
    alert('请上传封面图片')
    return
  }
  if (!formData.value.teacher) {
    alert('请输入教师姓名')
    return
  }
  if (!formData.value.college) {
    alert('请选择所属单位')
    return
  }
  if (!formData.value.category) {
    alert('请选择课程分类')
    return
  }
  if (!formData.value.description) {
    alert('请输入详情内容')
    return
  }

  try {
    const requestData = {
      title: formData.value.title,
      cover: formData.value.cover,
      teacher: formData.value.teacher,
      college: formData.value.college,
      category: formData.value.category,
      description: formData.value.description,
      displayOrder: formData.value.displayOrder,
      showFront: formData.value.showOnFrontend ? 1 : 0
    }

    if (showEditDialog.value) {
      // 编辑
      await editNiceCourse({
        ...requestData,
        id: formData.value.id
      })
      alert('编辑成功')
    } else {
      // 新增
      await addNiceCourse(requestData)
      alert('新增成功')
    }

    closeDialog()
    loadDataList() // 重新加载列表
  } catch (error) {
    console.error('保存失败：', error)
    alert('保存失败，请稍后重试')
  }
}

// 关闭对话框
const closeDialog = () => {
  showAddDialog.value = false
  showEditDialog.value = false
  formData.value = {
    id: '',
    title: '',
    cover: '',
    teacher: '',
    college: '',
    category: '',
    description: '',
    displayOrder: 1,
    showOnFrontend: true
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadDataList()
})

// 组件卸载前销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor) {
    editor.destroy()
  }
})
</script>

<style scoped>
.excellent-class {
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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.item-description :deep(*) {
  margin: 0;
  padding: 0;
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

/* 富文本编辑器容器 */
.editor-container {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
}

.editor-toolbar {
  border-bottom: 1px solid #d9d9d9;
  background: #fafafa;
}

.editor-content {
  min-height: 400px;
  max-height: 600px;
  overflow-y: auto;
}

/* 编辑器内容样式 */
:deep(.w-e-text-container) {
  background: white;
}

:deep(.w-e-text-placeholder) {
  color: #999;
  font-style: normal;
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

/* 复选框标签 */
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #1890ff;
}

/* 字段提示 */
.field-hint {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: #999;
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

.preview-description :deep(img) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 16px 0;
}

.preview-description :deep(p) {
  margin: 12px 0;
}

.preview-description :deep(h1),
.preview-description :deep(h2),
.preview-description :deep(h3),
.preview-description :deep(h4),
.preview-description :deep(h5),
.preview-description :deep(h6) {
  margin: 16px 0 12px;
  font-weight: 600;
}

.preview-description :deep(ul),
.preview-description :deep(ol) {
  margin: 12px 0;
  padding-left: 24px;
}

.preview-description :deep(blockquote) {
  margin: 12px 0;
  padding: 12px 16px;
  background: #f5f5f5;
  border-left: 4px solid #e31e24;
}

.preview-description :deep(code) {
  padding: 2px 6px;
  background: #f5f5f5;
  border-radius: 2px;
  font-family: 'Courier New', monospace;
}

.preview-description :deep(pre) {
  margin: 12px 0;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 4px;
  overflow-x: auto;
}

.preview-description :deep(table) {
  width: 100%;
  margin: 12px 0;
  border-collapse: collapse;
}

.preview-description :deep(table th),
.preview-description :deep(table td) {
  padding: 8px 12px;
  border: 1px solid #e8e8e8;
}

.preview-time {
  font-size: 14px;
  color: #999;
}

/* 加载状态 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #999;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f0f0f0;
  border-top-color: #e31e24;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-state p {
  margin: 16px 0 0;
  font-size: 14px;
}

/* 状态徽章 */
.status-badge {
  padding: 2px 8px;
  border-radius: 2px;
  font-size: 12px;
}

.status-badge--active {
  background: #f6ffed;
  color: #52c41a;
}

.status-badge--inactive {
  background: #fff1f0;
  color: #ff4d4f;
}

/* 分页器 */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
  padding: 20px 0;
}

.pagination-btn {
  padding: 8px 16px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination-btn:hover:not(:disabled) {
  border-color: #e31e24;
  color: #e31e24;
}

.pagination-btn:disabled {
  background: #f5f5f5;
  color: #d9d9d9;
  cursor: not-allowed;
}

.pagination-pages {
  display: flex;
  gap: 8px;
}

.pagination-page {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination-page:hover {
  border-color: #e31e24;
  color: #e31e24;
}

.pagination-page--active {
  background: #e31e24;
  color: white;
  border-color: #e31e24;
}

.pagination-page--active:hover {
  background: #c71b20;
  border-color: #c71b20;
  color: white;
}

.pagination-ellipsis {
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #999;
}

.pagination-info {
  margin-left: 12px;
  font-size: 14px;
  color: #666;
}
</style>

