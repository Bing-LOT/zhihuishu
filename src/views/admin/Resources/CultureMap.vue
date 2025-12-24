<template>
  <div class="culture-map">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="page-title">
        <h2>红色文化资源地图（福州地区）</h2>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-left: 8px;">
          <path d="M12 5.33333L6.66667 10.6667L4 8" stroke="#999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <p class="page-desc">管理红色文化资源内容</p>
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

      <button class="btn-add" @click="openAddDialog">
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
          <img :src="item.coverUrl || '/images/home/video-1.jpg'" :alt="item.title" />
        </div>

        <!-- 内容信息 -->
        <div class="item-content">
          <h3 class="item-title">{{ item.title }}</h3>
          <p class="item-description">{{ item.address }}</p>
          <div class="item-tags" v-if="item.tags && item.tags.length > 0">
            <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>

          <div class="item-footer">
            <div class="footer-info">
              <span class="sort-info">排序：第 {{ (currentPage - 1) * pageSize + index + 1 }} 位</span>
              <span class="time-info">发布时间：{{ item.createTime }}</span>
              <span class="status-info">
                {{ item.showFront === 1 ? '显示中' : '已隐藏' }}
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
      <div v-if="!loading && filteredItems.length === 0" class="empty-state">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" stroke="#d9d9d9" stroke-width="2"/>
          <path d="M32 20V36M32 44H32.02" stroke="#d9d9d9" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <p>暂无数据</p>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>加载中...</p>
      </div>
    </div>

    <!-- 分页器 -->
    <div v-if="!loading && totalCount > 0" class="pagination">
      <div class="pagination-info">
        共 {{ totalCount }} 条数据，第 {{ currentPage }} / {{ totalPages }} 页
      </div>
      <div class="pagination-controls">
        <button 
          class="page-btn" 
          :disabled="currentPage === 1"
          @click="handlePageChange(currentPage - 1)"
        >
          上一页
        </button>
        <div class="page-numbers">
          <button 
            v-for="page in getPageNumbers()" 
            :key="page"
            class="page-number"
            :class="{ active: page === currentPage }"
            @click="typeof page === 'number' && handlePageChange(page)"
            :disabled="typeof page === 'string'"
          >
            {{ page }}
          </button>
        </div>
        <button 
          class="page-btn" 
          :disabled="currentPage === totalPages"
          @click="handlePageChange(currentPage + 1)"
        >
          下一页
        </button>
        <select 
          v-model.number="pageSize" 
          class="page-size-select"
          @change="handlePageSizeChange(pageSize)"
        >
          <option :value="10">10条/页</option>
          <option :value="20">20条/页</option>
          <option :value="50">50条/页</option>
        </select>
      </div>
    </div>

    <!-- 新增/编辑对话框 -->
    <div v-if="showAddDialog || showEditDialog" class="dialog-overlay" @click.self="closeDialog">
      <div class="dialog">
        <div class="dialog__header">
          <h3>{{ showEditDialog ? '编辑资源' : '新增资源' }}</h3>
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
            <label>详细地址 <span class="required">*</span></label>
            <input
              v-model="formData.address"
              type="text"
              placeholder="请输入详细地址"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label>标签（建设课程类型） <span class="required">*</span></label>
            <div class="tags-container">
              <div class="selected-tags">
                <span v-for="(tag, index) in formData.tags" :key="index" class="selected-tag">
                  {{ tag }}
                  <button type="button" @click="removeTag(index)" class="remove-tag-btn">×</button>
                </span>
              </div>
              <div class="tag-input-row">
                <input
                  v-model="tagInput"
                  type="text"
                  placeholder="输入标签后按回车添加"
                  class="form-input"
                  @keypress.enter.prevent="addTag"
                />
                <button type="button" class="btn-add-tag" @click="addTag">添加</button>
              </div>
              <!-- <div class="available-tags">
                <span>常用标签：</span>
                <button
                  v-for="tag in availableTags"
                  :key="tag"
                  type="button"
                  class="available-tag"
                  :class="{ selected: formData.tags.includes(tag) }"
                  @click="toggleTag(tag)"
                >
                  {{ tag }}
                </button>
              </div> -->
            </div>
          </div>

          <!-- <div class="form-group">
            <label>地图坐标</label>
            <div class="coordinate-row">
              <input
                v-model.number="formData.lng"
                type="number"
                step="0.000001"
                placeholder="经度"
                class="form-input"
              />
              <input
                v-model.number="formData.lat"
                type="number"
                step="0.000001"
                placeholder="纬度"
                class="form-input"
              />
            </div>
          </div> -->

          <div class="form-group">
            <label>内容类型 <span class="required">*</span></label>
            <select v-model.number="formData.contentType" class="form-input">
              <option :value="0">富文本</option>
              <option :value="1">URL地址</option>
            </select>
          </div>

          <div class="form-group">
            <label>
              {{ formData.contentType === 0 ? '资源详情（富文本）' : 'URL地址' }}
              <span class="required">*</span>
            </label>
            <div v-if="formData.contentType === 0" class="editor-container">
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
            <input
              v-else
              v-model="formData.content"
              type="url"
              placeholder="请输入URL地址"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input v-model="formData.pinTop" type="checkbox" :true-value="1" :false-value="0" />
              <span>置顶显示</span>
            </label>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input v-model="formData.showFront" type="checkbox" :true-value="1" :false-value="0" />
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
          <h3>资源预览</h3>
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
            <h2>{{ previewData.title }}</h2>
            <div class="preview-tags" v-if="previewData.tags && previewData.tags.length > 0">
              <span v-for="tag in previewData.tags" :key="tag" class="preview-tag">{{ tag }}</span>
            </div>
            <div v-if="previewData.address" class="preview-address">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 8.66667C8.73638 8.66667 9.33333 8.06971 9.33333 7.33333C9.33333 6.59695 8.73638 6 8 6C7.26362 6 6.66667 6.59695 6.66667 7.33333C6.66667 8.06971 7.26362 8.66667 8 8.66667Z" stroke="#666" stroke-width="1.5"/>
                <path d="M8 14C10 11.3333 13.3333 9.07619 13.3333 6.66667C13.3333 3.72115 10.9455 1.33333 8 1.33333C5.05448 1.33333 2.66667 3.72115 2.66667 6.66667C2.66667 9.07619 6 11.3333 8 14Z" stroke="#666" stroke-width="1.5"/>
              </svg>
              <span>{{ previewData.address }}</span>
            </div>
            <div class="preview-coordinates" v-if="previewData.lng && previewData.lat">
              坐标：{{ previewData.lng }}, {{ previewData.lat }}
            </div>
            <div class="preview-description" v-if="previewData.contentType === '0'">
              <div v-html="previewData.content"></div>
            </div>
            <div class="preview-description" v-else>
              <a :href="previewData.content" target="_blank">{{ previewData.content }}</a>
            </div>
            <div class="preview-time">发布时间：{{ previewData.createTime }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, shallowRef, onBeforeUnmount, watch } from 'vue'
import { 
  getRedCultureList, 
  createRedCulture,
  editRedCulture,
  type RedCultureItem, 
  type RedCulturePageParams,
  type CreateRedCultureParams,
  type EditRedCultureParams 
} from '@/api/redCulture'
import { uploadFile } from '@/api/banner'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css'

interface CultureItem {
  id: number
  title: string
  address: string
  tags: string[]
  lng: number
  lat: number
  contentType: string
  content: string
  coverUrl: string
  pinTop: number
  showFront: number
  createTime: string
}

// 数据列表
const items = ref<CultureItem[]>([])

// 分页状态
const currentPage = ref(1)
const pageSize = ref(10)
const totalCount = ref(0)
const totalPages = ref(0)

// 加载状态
const loading = ref(false)

// 搜索和筛选
const searchKeyword = ref('')
const statusFilter = ref('all')

// 对话框状态
const showAddDialog = ref(false)
const showEditDialog = ref(false)
const showPreviewDialog = ref(false)
const coverInput = ref<HTMLInputElement | null>(null)

// 富文本编辑器
const editorRef = shallowRef<IDomEditor>()

// 标记是否允许监听类型切换（避免在编辑模式加载数据时误触发）
const allowTypeSwitch = ref(false)

// 编辑器工具栏配置
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

// 编辑器内容配置
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入资源详细内容...',
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

// 表单数据
const formData = ref({
  id: '',
  title: '',
  coverUrl: '',
  address: '',
  tags: [] as string[],
  contentType: 0,
  content: '',
  lng: 0,
  lat: 0,
  pinTop: 0,
  showFront: 1
})

// 标签输入
const tagInput = ref('')

// 可用标签选项
const availableTags = [
  '博物馆',
  '纪念馆',
  '烈士陵园',
  '革命遗址',
  '党校',
  '党群中心',
  '人物故居',
  '红色教育基地',
  '党史馆',
  '展览馆'
]

// 预览数据
const previewData = ref<CultureItem | null>(null)

// 拖拽相关
const draggedIndex = ref<number | null>(null)

// 计算属性 - 显示的项（后端已筛选）
const filteredItems = computed(() => {
  return items.value
})

/**
 * 加载数据列表
 */
const loadData = async () => {
  try {
    loading.value = true
    
    const params: RedCulturePageParams = {
      pageIndex: currentPage.value,
      pageSize: pageSize.value
    }
    
    // 添加搜索关键词（如果有）
    if (searchKeyword.value.trim()) {
      params.keyword = searchKeyword.value.trim()
    }
    
    // 添加状态筛选（如果不是全部）
    if (statusFilter.value === 'active') {
      params.showFront = 1
    } else if (statusFilter.value === 'inactive') {
      params.showFront = 0
    }
    
    console.log('请求参数:', params)
    
    const response = await getRedCultureList(params)
    
    console.log('API响应:', response)
    
    items.value = response.records || []
    totalCount.value = response.total || 0
    totalPages.value = response.pages || 0
    currentPage.value = response.current || 1
    
    console.log('数据加载成功，共', totalCount.value, '条')
  } catch (error) {
    console.error('加载数据失败:', error)
    alert('加载数据失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 搜索处理 - 防抖
let searchTimer: number | null = null
const handleSearch = () => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }
  searchTimer = window.setTimeout(() => {
    currentPage.value = 1 // 重置到第一页
    loadData()
  }, 500)
}

// 筛选处理
const handleFilter = () => {
  currentPage.value = 1 // 重置到第一页
  loadData()
}

// 页码变化
const handlePageChange = (page: number) => {
  currentPage.value = page
  loadData()
}

// 页面大小变化
const handlePageSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1
  loadData()
}

// 监听内容类型切换
watch(() => formData.value.contentType, (newType, oldType) => {
  // 只有在允许切换时才处理（避免在加载编辑数据时误触发）
  if (allowTypeSwitch.value && newType !== oldType) {
    // 当从富文本切换到 URL 模式，或从 URL 切换到富文本时，清空内容
    formData.value.content = ''
    
    // 如果切换到富文本模式，清空编辑器
    if (newType === 0 && editorRef.value) {
      editorRef.value.clear()
    }
  }
})

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
  
  const tempSort = draggedItem.sort
  draggedItem.sort = targetItem.sort
  targetItem.sort = tempSort

  draggedIndex.value = null
}

// 触发封面上传
const triggerCoverUpload = () => {
  coverInput.value?.click()
}

// 处理封面选择并上传
const handleCoverChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    try {
      console.log('开始上传图片...')
      const result = await uploadFile(file)
      formData.value.coverUrl = result.url
      console.log('图片上传成功:', result.url)
      alert('图片上传成功')
    } catch (error) {
      console.error('图片上传失败:', error)
      alert('图片上传失败，请重试')
    }
  }
}

// 移除封面
const removeCover = () => {
  formData.value.coverUrl = ''
  if (coverInput.value) {
    coverInput.value.value = ''
  }
}

// 添加标签
const addTag = () => {
  const tag = tagInput.value.trim()
  if (tag && !formData.value.tags.includes(tag)) {
    formData.value.tags.push(tag)
    tagInput.value = ''
  }
}

// 移除标签
const removeTag = (index: number) => {
  formData.value.tags.splice(index, 1)
}

// 切换标签
const toggleTag = (tag: string) => {
  const index = formData.value.tags.indexOf(tag)
  if (index > -1) {
    formData.value.tags.splice(index, 1)
  } else {
    formData.value.tags.push(tag)
  }
}

// 打开新增对话框
const openAddDialog = () => {
  showAddDialog.value = true
  // 延迟启用类型切换监听，避免初始化时触发
  setTimeout(() => {
    allowTypeSwitch.value = true
  }, 100)
}

// 编辑项目
const editItem = (item: CultureItem) => {
  formData.value = {
    id: String(item.id),
    title: item.title,
    coverUrl: item.coverUrl || '',
    address: item.address || '',
    tags: [...(item.tags || [])],
    contentType: parseInt(item.contentType) || 0,
    content: item.content || '',
    lng: item.lng || 0,
    lat: item.lat || 0,
    pinTop: item.pinTop || 0,
    showFront: item.showFront
  }
  showEditDialog.value = true
  // 延迟启用类型切换监听，避免数据加载时触发
  setTimeout(() => {
    allowTypeSwitch.value = true
  }, 100)
}

// 获取分页按钮数字
const getPageNumbers = () => {
  const pages: (number | string)[] = []
  const showPages = 5 // 显示的页码数量
  
  if (totalPages.value <= showPages + 2) {
    // 总页数较少，全部显示
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    // 总页数较多，显示部分
    pages.push(1)
    
    if (currentPage.value > 3) {
      pages.push('...')
    }
    
    const start = Math.max(2, currentPage.value - 1)
    const end = Math.min(totalPages.value - 1, currentPage.value + 1)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    if (currentPage.value < totalPages.value - 2) {
      pages.push('...')
    }
    
    pages.push(totalPages.value)
  }
  
  return pages
}

// 预览项目
const previewItem = (item: CultureItem) => {
  previewData.value = item
  showPreviewDialog.value = true
}

// 删除项目
const deleteItem = async (id: number) => {
  if (confirm('确定要删除这个资源吗？')) {
    try {
      // TODO: 调用删除API
      // await deleteRedCulture(id)
      alert('删除成功')
      
      // 重新加载数据
      loadData()
    } catch (error) {
      console.error('删除失败:', error)
      alert('删除失败，请稍后重试')
    }
  }
}

// 保存项目
const saveItem = async () => {
  // 验证必填项
  if (!formData.value.title.trim()) {
    alert('请输入标题')
    return
  }
  if (!formData.value.coverUrl) {
    alert('请上传封面图片')
    return
  }
  if (!formData.value.address.trim()) {
    alert('请输入详细地址')
    return
  }
  if (formData.value.tags.length === 0) {
    alert('请至少选择一个标签')
    return
  }
  if (!formData.value.content.trim()) {
    alert('请输入资源详情内容')
    return
  }

  try {
    if (showEditDialog.value) {
      // 编辑
      const params: EditRedCultureParams = {
        id: Number(formData.value.id),
        title: formData.value.title.trim(),
        coverUrl: formData.value.coverUrl,
        address: formData.value.address.trim(),
        tags: formData.value.tags,
        contentType: formData.value.contentType,
        content: formData.value.content.trim(),
        pinTop: formData.value.pinTop,
        showFront: formData.value.showFront
      }
      
      // 如果填写了坐标，添加到参数中
      if (formData.value.lng && formData.value.lat) {
        params.lng = formData.value.lng
        params.lat = formData.value.lat
      }
      
      console.log('编辑参数:', params)
      
      await editRedCulture(params)
      alert('编辑成功')
    } else {
      // 新增
      const params: CreateRedCultureParams = {
        title: formData.value.title.trim(),
        coverUrl: formData.value.coverUrl,
        address: formData.value.address.trim(),
        tags: formData.value.tags,
        contentType: formData.value.contentType,
        content: formData.value.content.trim(),
        pinTop: formData.value.pinTop,
        showFront: formData.value.showFront
      }
      
      // 如果填写了坐标，添加到参数中
      if (formData.value.lng && formData.value.lat) {
        params.lng = formData.value.lng
        params.lat = formData.value.lat
      }
      
      console.log('新增参数:', params)
      
      await createRedCulture(params)
      alert('新增成功')
    }

    closeDialog()
    // 重新加载数据
    await loadData()
  } catch (error) {
    console.error('保存失败:', error)
    alert('保存失败：' + (error as Error).message)
  }
}

// 关闭对话框
const closeDialog = () => {
  // 禁用类型切换监听
  allowTypeSwitch.value = false
  
  showAddDialog.value = false
  showEditDialog.value = false
  formData.value = {
    id: '',
    title: '',
    coverUrl: '',
    address: '',
    tags: [],
    contentType: 0,
    content: '',
    lng: 0,
    lat: 0,
    pinTop: 0,
    showFront: 1
  }
  tagInput.value = ''
  
  // 清空富文本编辑器内容
  if (editorRef.value) {
    editorRef.value.clear()
  }
}
</script>

<style scoped>
.culture-map {
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
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
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

.form-textarea {
  width: 100%;
  min-height: 160px;
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

.preview-address {
  display: flex;
  align-items: center;
  gap: 8px;
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

/* 标签样式 */
.item-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.tag {
  padding: 2px 8px;
  background: #f0f0f0;
  color: #666;
  border-radius: 3px;
  font-size: 12px;
}

.status-info {
  padding: 2px 8px;
  background: #f0f0f0;
  border-radius: 3px;
  font-size: 12px;
}

.preview-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.preview-tag {
  padding: 4px 12px;
  background: #e6f7ff;
  color: #1890ff;
  border-radius: 4px;
  font-size: 14px;
}

.preview-coordinates {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
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

/* 分页器 */
.pagination {
  margin-top: 24px;
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.pagination-info {
  font-size: 14px;
  color: #666;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-btn {
  padding: 6px 16px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.page-btn:hover:not(:disabled) {
  border-color: #e31e24;
  color: #e31e24;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 8px;
}

.page-number {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.page-number:hover:not(:disabled):not(.active) {
  border-color: #e31e24;
  color: #e31e24;
}

.page-number.active {
  background: #e31e24;
  border-color: #e31e24;
  color: white;
}

.page-number:disabled {
  border: none;
  cursor: default;
}

.page-size-select {
  padding: 6px 12px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

/* 标签容器 */
.tags-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 32px;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 4px;
}

.selected-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: #1890ff;
  color: white;
  border-radius: 3px;
  font-size: 13px;
}

.remove-tag-btn {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-tag-btn:hover {
  opacity: 0.8;
}

.tag-input-row {
  display: flex;
  gap: 8px;
}

.tag-input-row .form-input {
  flex: 1;
}

.btn-add-tag {
  padding: 8px 16px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
  white-space: nowrap;
}

.btn-add-tag:hover {
  background: #096dd9;
}

.available-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  font-size: 13px;
  color: #666;
}

.available-tag {
  padding: 4px 12px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.available-tag:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.available-tag.selected {
  background: #e6f7ff;
  border-color: #1890ff;
  color: #1890ff;
}

/* 坐标输入行 */
.coordinate-row {
  display: flex;
  gap: 12px;
}

.coordinate-row .form-input {
  flex: 1;
}

/* 富文本编辑器样式 */
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
</style>

