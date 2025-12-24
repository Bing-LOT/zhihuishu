<template>
  <div class="college-special">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="page-title">
        <h2>一院一品</h2>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-left: 8px;">
          <path d="M12 5.33333L6.66667 10.6667L4 8" stroke="#999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <p class="page-desc">管理一院一品特色展播内容</p>
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
          <img :src="item.coverUrl || '/images/home/video-1.jpg'" :alt="item.name" />
        </div>

        <!-- 内容信息 -->
        <div class="item-content">
          <h3 class="item-title">
            {{ item.name }}
            <span v-if="item.showFront === 0" class="status-badge status-badge--hidden">前台隐藏</span>
          </h3>
          
          <div class="item-meta">
            <div class="meta-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 7C8.38071 7 9.5 5.88071 9.5 4.5C9.5 3.11929 8.38071 2 7 2C5.61929 2 4.5 3.11929 4.5 4.5C4.5 5.88071 5.61929 7 7 7Z" fill="#666"/>
                <path d="M7 8.5C4.51472 8.5 2.5 10.0147 2.5 11.9V12.5H11.5V11.9C11.5 10.0147 9.48528 8.5 7 8.5Z" fill="#666"/>
              </svg>
              <span>{{ item.teachers.join('、') }}</span>
            </div>

            <div class="meta-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M12 5.5L7 2L2 5.5V11C2 11.2652 2.10536 11.5196 2.29289 11.7071C2.48043 11.8946 2.73478 12 3 12H11C11.2652 12 11.5196 11.8946 11.7071 11.7071C11.8946 11.5196 12 11.2652 12 11V5.5Z" stroke="#d4a574" stroke-width="1.2" fill="none"/>
              </svg>
              <span style="color: #d4a574;">{{ item.college }}</span>
            </div>

            <span v-for="type in item.types" :key="type" class="category-tag">{{ type }}</span>
          </div>

          <p class="item-description">{{ item.content }}</p>

          <div class="item-footer">
            <div class="footer-info">
              <span class="sort-info">排序：第 {{ index + 1 }} 位</span>
              <span class="time-info">发布时间：{{ item.createTime }}</span>
              <span class="view-info">浏览量：{{ item.statPv }}</span>
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
          <button 
            class="action-btn" 
            :class="item.showFront === 1 ? 'action-btn--hide' : 'action-btn--show'" 
            @click="toggleShowFront(item)" 
            :title="item.showFront === 1 ? '隐藏' : '显示'"
          >
            <svg v-if="item.showFront === 1" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <!-- 眼睛关闭图标 -->
              <path d="M11.8 11.8L4.2 4.2M11.1 8.6C10.8 9.8 9.9 10.7 8.7 11C7.2 11.4 5.6 10.8 4.8 9.5M8 3C12.5 3 15 8 15 8C14.7 8.5 14.3 9.1 13.8 9.6M1 8C1.5 7.1 2.3 6.1 3.5 5.3C4.6 4.6 6.1 4 8 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
              <!-- 眼睛睁开图标 -->
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

    <!-- 分页 -->
    <Pagination
      v-if="!loading && pagination.total > 0"
      :page="pagination.current"
      :page-size="pagination.size"
      :total="pagination.total"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
    />

    <!-- 新增/编辑对话框 -->
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
            <label>课程名称 <span class="required">*</span></label>
            <input
              v-model="formData.name"
              type="text"
              placeholder="请输入课程名称"
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
              <div v-if="formData.coverUrl" class="image-preview-box">
                <img :src="formData.coverUrl" alt="预览" />
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
              v-model="formData.teachers"
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
            <select v-model="formData.types" class="form-input">
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
            <label>课程详细内容 <span class="required">*</span></label>
            <div class="editor-container">
              <Toolbar
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                mode="default"
                class="editor-toolbar"
              />
              <Editor
                v-model="formData.content"
                :defaultConfig="editorConfig"
                mode="default"
                class="editor-content"
                @onCreated="handleCreated"
              />
            </div>
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
          <h3>内容预览</h3>
          <button class="dialog__close" @click="showPreviewDialog = false">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="#666" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        
        <div class="dialog__body">
          <div v-if="previewData" class="preview-content">
            <div v-if="previewData.coverUrl" class="preview-cover">
              <img :src="previewData.coverUrl" alt="封面" />
            </div>
            <h2>{{ previewData.name }}</h2>
            <div class="preview-meta">
              <span>教师：{{ previewData.teachers.join('、') }}</span>
              <span>学院：{{ previewData.college }}</span>
              <span>类别：{{ previewData.types.join('、') }}</span>
              <span>浏览量：{{ previewData.statPv }}</span>
            </div>
            <p class="preview-description">{{ previewData.content }}</p>
            <div class="preview-time">发布时间：{{ previewData.createTime }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, shallowRef } from 'vue'
import { getCollegePageList, addCollege, updateCollege, type CollegeItem } from '@/api/college'
import { uploadFile } from '@/api/banner'
import Pagination from '@/components/common/Pagination/index.vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css'

// 数据列表
const items = ref<CollegeItem[]>([])

// 加载状态
const loading = ref(false)

// 搜索和筛选
const searchKeyword = ref('')
const statusFilter = ref('all')

// 分页数据
const pagination = ref({
  current: 1,
  size: 10,
  total: 0,
  pages: 0
})

// 对话框状态
const showAddDialog = ref(false)
const showEditDialog = ref(false)
const showPreviewDialog = ref(false)
const coverInput = ref<HTMLInputElement | null>(null)

// 表单数据
const formData = ref({
  id: '',
  name: '',
  coverUrl: '',
  teachers: '',
  college: '',
  types: '',
  content: '',
  showOnFrontend: true
})

// 预览数据
const previewData = ref<CollegeItem | null>(null)

// 拖拽相关
const draggedIndex = ref<number | null>(null)

// 富文本编辑器相关
const editorRef = shallowRef<IDomEditor>()

// 编辑器配置
const toolbarConfig: Partial<IToolbarConfig> = {
  toolbarKeys: [
    'headerSelect',
    'bold',
    'italic',
    'underline',
    'through',
    '|',
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
    'insertImage',
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

const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入课程详细内容...',
  MENU_CONF: {
    // 配置上传图片
    uploadImage: {
      // 单个文件的最大体积限制，默认为 2M
      maxFileSize: 5 * 1024 * 1024, // 5M
      // 最多可上传几个文件，默认为 100
      maxNumberOfFiles: 10,
      // 选择文件时的类型限制，默认为 ['image/*']
      allowedFileTypes: ['image/*'],
      // 自定义上传
      async customUpload(file: File, insertFn: any) {
        try {
          console.log('富文本编辑器上传图片:', file.name)
          const result = await uploadFile(file)
          console.log('图片上传成功:', result.url)
          // 插入图片到编辑器
          insertFn(result.url, '', result.url)
        } catch (error) {
          console.error('图片上传失败:', error)
          alert('图片上传失败，请重试')
        }
      }
    }
  }
}

// 编辑器创建完成
const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor
}

// 加载数据
const loadData = async () => {
  try {
    loading.value = true
    
    // 构建查询参数
    const params: any = {
      pageIndex: pagination.value.current,
      pageSize: pagination.value.size
    }
    
    // 添加搜索关键词
    if (searchKeyword.value) {
      params.keyword = searchKeyword.value
    }
    
    // 添加显示状态筛选
    if (statusFilter.value === 'active') {
      params.showFront = 1
    } else if (statusFilter.value === 'inactive') {
      params.showFront = 0
    }
    // statusFilter.value === 'all' 时不传 showFront
    
    console.log('加载数据，参数:', params)
    
    const response = await getCollegePageList(params)
    
    console.log('API返回数据:', response)
    
    items.value = response.records || []
    pagination.value = {
      current: response.current,
      size: response.size,
      total: response.total,
      pages: response.pages
    }
  } catch (error) {
    console.error('加载数据失败:', error)
    alert('加载数据失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 搜索处理
const handleSearch = () => {
  // 重置到第一页并重新加载
  pagination.value.current = 1
  loadData()
}

// 筛选处理
const handleFilter = () => {
  // 重置到第一页并重新加载
  pagination.value.current = 1
  loadData()
}

// 页码改变
const handlePageChange = (newPage: number) => {
  pagination.value.current = newPage
  loadData()
}

// 每页数量改变
const handleSizeChange = (newSize: number) => {
  pagination.value.size = newSize
  pagination.value.current = 1 // 重置到第一页
  loadData()
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

  // 交换两个元素的位置
  const draggedItem = items.value[draggedIndex.value]
  items.value.splice(draggedIndex.value, 1)
  items.value.splice(targetIndex, 0, draggedItem)

  draggedIndex.value = null
  
  // TODO: 这里可以调用 API 更新排序
  // const sortData = items.value.map((item, index) => ({
  //   id: item.id,
  //   sort: index + 1
  // }))
  // await updateCollegeSort(sortData)
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
      formData.value.coverUrl = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

// 移除封面
const removeCover = () => {
  formData.value.coverUrl = ''
  if (coverInput.value) {
    coverInput.value.value = ''
  }
}

// 编辑项目
const editItem = (item: CollegeItem) => {
  formData.value = {
    id: item.id.toString(),
    name: item.name,
    coverUrl: item.coverUrl || '',
    teachers: item.teachers.join('、'),
    college: item.college,
    types: item.types[0] || '', // 取数组第一个元素
    content: item.content,
    showOnFrontend: item.showFront === 1
  }
  showEditDialog.value = true
}

// 预览项目
const previewItem = (item: CollegeItem) => {
  previewData.value = item
  showPreviewDialog.value = true
}

// 切换显示/隐藏状态
const toggleShowFront = async (item: CollegeItem) => {
  const newShowFront = item.showFront === 1 ? 0 : 1
  const actionText = newShowFront === 1 ? '显示' : '隐藏'
  
  if (!confirm(`确定要将该内容设置为${actionText}吗？`)) {
    return
  }
  
  try {
    loading.value = true
    
    // 调用编辑API，只更新 showFront 字段
    await updateCollege({
      id: item.id,
      name: item.name,
      coverUrl: item.coverUrl,
      teachers: item.teachers,
      college: item.college,
      types: item.types,
      content: item.content,
      showFront: newShowFront
    })
    
    console.log(`${actionText}成功`)
    alert(`${actionText}成功！`)
    
    // 刷新列表
    await loadData()
  } catch (error: any) {
    console.error(`${actionText}失败:`, error)
    const errorMsg = error?.message || `${actionText}失败，请稍后重试`
    alert(errorMsg)
  } finally {
    loading.value = false
  }
}

// 删除项目
const deleteItem = async (id: number) => {
  if (confirm('确定要删除这条内容吗？')) {
    try {
      // TODO: 调用删除API
      // await deleteCollege(id)
      alert('删除功能暂未实现，需要调用API接口')
      // 删除成功后重新加载数据
      // await loadData()
    } catch (error) {
      console.error('删除失败:', error)
      alert('删除失败，请稍后重试')
    }
  }
}

// 保存项目
const saveItem = async () => {
  // 验证必填项
  if (!formData.value.name) {
    alert('请输入课程名称')
    return
  }
  if (!formData.value.coverUrl) {
    alert('请上传封面图片')
    return
  }
  if (!formData.value.teachers) {
    alert('请输入教师姓名')
    return
  }
  if (!formData.value.college) {
    alert('请选择所属单位')
    return
  }
  if (!formData.value.types) {
    alert('请选择课程分类')
    return
  }
  if (!formData.value.content) {
    alert('请输入课程详细内容')
    return
  }

  try {
    loading.value = true
    
    // 处理封面图片：如果是 base64，需要先上传
    let coverUrl = formData.value.coverUrl
    if (coverUrl.startsWith('data:image/')) {
      // base64 图片，需要先转换为 File 对象并上传
      const blob = await fetch(coverUrl).then(r => r.blob())
      const file = new File([blob], 'cover.jpg', { type: blob.type })
      const uploadResult = await uploadFile(file)
      coverUrl = uploadResult.url
      console.log('封面图片上传成功:', coverUrl)
    }
    
    // 将字符串转换为数组
    const teachersArray = formData.value.teachers.split('、').filter(t => t.trim())
    const typesArray = [formData.value.types] // 单选值转为数组
    
    if (showEditDialog.value) {
      // 调用编辑API
      await updateCollege({
        id: Number(formData.value.id),
        name: formData.value.name,
        coverUrl: coverUrl,
        teachers: teachersArray,
        college: formData.value.college,
        types: typesArray,
        content: formData.value.content,
        showFront: formData.value.showOnFrontend ? 1 : 0
      })
      
      console.log('编辑成功')
      alert('编辑成功！')
      closeDialog()
      
      // 保存成功后重新加载数据
      await loadData()
    } else {
      // 调用新增API
      await addCollege({
        name: formData.value.name,
        coverUrl: coverUrl,
        teachers: teachersArray,
        college: formData.value.college,
        types: typesArray,
        content: formData.value.content,
        showFront: formData.value.showOnFrontend ? 1 : 0
      })
      
      console.log('新增成功')
      alert('新增成功！')
      closeDialog()
      
      // 保存成功后重新加载数据
      await loadData()
    }
  } catch (error: any) {
    console.error('保存失败:', error)
    const errorMsg = error?.message || '保存失败，请稍后重试'
    alert(errorMsg)
  } finally {
    loading.value = false
  }
}

// 关闭对话框
const closeDialog = () => {
  showAddDialog.value = false
  showEditDialog.value = false
  
  // 重置表单数据
  formData.value = {
    id: '',
    name: '',
    coverUrl: '',
    teachers: '',
    college: '',
    types: '',
    content: '',
    showOnFrontend: true
  }
  
  // 清空富文本编辑器内容
  if (editorRef.value) {
    editorRef.value.clear()
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadData()
})

// 组件销毁前
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor) {
    editor.destroy()
  }
})
</script>

<style scoped>
.college-special {
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
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

/* 状态标签 */
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 2px;
  font-size: 12px;
  font-weight: normal;
  line-height: 1.5;
}

.status-badge--hidden {
  background: #fff1f0;
  color: #cf1322;
  border: 1px solid #ffccc7;
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

.action-btn--show {
  color: #52c41a;
}

.action-btn--show:hover {
  background: #f6ffed;
}

.action-btn--hide {
  color: #ff9800;
}

.action-btn--hide:hover {
  background: #fff7e6;
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

/* 加载状态 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #999;
}

.loading-state p {
  margin: 16px 0 0;
  font-size: 14px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #e31e24;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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

/* 富文本编辑器 */
.editor-container {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
  transition: border-color 0.3s;
}

.editor-container:focus-within {
  border-color: #e31e24;
}

.editor-toolbar {
  border-bottom: 1px solid #d9d9d9;
  background-color: #fafafa;
}

.editor-content {
  min-height: 400px;
  max-height: 600px;
  overflow-y: auto;
}

/* 编辑器内容区域样式 */
.editor-content :deep(.w-e-text-container) {
  background-color: white;
}

.editor-content :deep(.w-e-text-placeholder) {
  color: #999;
  font-style: normal;
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
  white-space: pre-wrap;
}

.preview-time {
  font-size: 14px;
  color: #999;
}
</style>
