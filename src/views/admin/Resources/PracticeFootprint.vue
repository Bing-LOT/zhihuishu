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

      <div v-if="isLoadingBanners" class="loading-state">
        <p>加载中...</p>
      </div>
      
      <div v-else-if="banners.length === 0" class="empty-state">
        <p>暂无 Banner 图片</p>
      </div>

      <div v-else class="banner-list">
        <div
          v-for="banner in banners"
          :key="banner.id"
          class="banner-card"
        >
          <div class="banner-card__image">
            <img :src="banner.picUrl" alt="Banner图片" />
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
        共 {{ totalCount }} 条
      </div>

      <!-- 加载状态 -->
      <div v-if="isLoadingItems" class="loading-state">
        <p>加载中...</p>
      </div>

      <!-- 列表内容 -->
      <div v-else class="content-list">
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
              <span v-if="item.pinTop === 1" class="badge-pinned">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z" fill="white"/>
                </svg>
                置顶
              </span>
              <span class="badge-status" :class="{ 'badge-status--active': item.showFront === 1 }">
                {{ item.showFront === 1 ? '显示中' : '已隐藏' }}
              </span>
            </div>
            
            <div class="item-meta">
              <span class="meta-item">
                类型：{{ item.footprintType === 0 ? '富文本内容' : 'URL地址' }}
              </span>
              <span class="meta-item">
                浏览量：{{ item.statPv }}
              </span>
            </div>
            
            <p class="item-description">{{ item.content?.substring(0, 100) }}{{ item.content?.length > 100 ? '...' : '' }}</p>

            <div class="item-footer">
              <div class="footer-info">
                <span class="sort-info">排序：第 {{ index + 1 }} 位</span>
                <span class="time-info">发布时间：{{ item.createTime }}</span>
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="item-actions">
            <button
              :class="['action-btn', 'action-btn--pin', { 'action-btn--pinned': item.pinTop === 1 }]"
              @click="togglePin(item)"
              :title="item.pinTop === 1 ? '取消置顶' : '置顶'"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L9.545 5.13L13 5.635L10.5 8.07L11.09 11.51L8 9.885L4.91 11.51L5.5 8.07L3 5.635L6.455 5.13L8 2Z" :fill="item.pinTop === 1 ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </button>
            <button class="action-btn action-btn--edit" @click="editItem(item)" title="编辑">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.3879 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08575 14.552 3.33337C14.552 3.58099 14.5032 3.82619 14.4084 4.05497C14.3137 4.28374 14.1748 4.49161 13.9997 4.66671L5.33301 13.3334L1.99967 14.3334L2.99967 11L11.6663 2.33337L11.333 2.00004Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button 
              :class="['action-btn', 'action-btn--visibility', { 'action-btn--hidden': item.showFront === 0 }]" 
              @click="toggleVisibility(item)" 
              :title="item.showFront === 1 ? '隐藏' : '显示'"
            >
              <svg v-if="item.showFront === 1" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <!-- 眼睛图标 - 显示中 -->
                <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.5"/>
              </svg>
              <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
                <!-- 眼睛斜杠图标 - 已隐藏 -->
                <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.5"/>
                <path d="M2 2L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
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

      <!-- 分页 -->
      <div v-if="filteredItems.length > 0" class="pagination">
        <div class="pagination-info">
          显示第 {{ (pagination.current - 1) * pagination.pageSize + 1 }} 到 
          {{ Math.min(pagination.current * pagination.pageSize, pagination.total) }} 条，
          共 {{ pagination.total }} 条
        </div>
        <div class="pagination-controls">
          <select v-model.number="pagination.pageSize" @change="handlePageSizeChange(pagination.pageSize)" class="page-size-select">
            <option :value="10">10 条/页</option>
            <option :value="20">20 条/页</option>
            <option :value="50">50 条/页</option>
            <option :value="100">100 条/页</option>
          </select>
          <button 
            class="page-btn" 
            :disabled="pagination.current === 1"
            @click="handlePageChange(1)"
          >
            首页
          </button>
          <button 
            class="page-btn" 
            :disabled="pagination.current === 1"
            @click="handlePageChange(pagination.current - 1)"
          >
            上一页
          </button>
          <div class="page-numbers">
            <button
              v-for="page in getPageNumbers()"
              :key="page"
              :class="['page-number', { 'active': page === pagination.current, 'ellipsis': page === -1 }]"
              :disabled="page === -1"
              @click="page !== -1 && handlePageChange(page)"
            >
              {{ page === -1 ? '...' : page }}
            </button>
          </div>
          <button 
            class="page-btn" 
            :disabled="pagination.current === pagination.pages"
            @click="handlePageChange(pagination.current + 1)"
          >
            下一页
          </button>
          <button 
            class="page-btn" 
            :disabled="pagination.current === pagination.pages"
            @click="handlePageChange(pagination.pages)"
          >
            末页
          </button>
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
            <!-- 富文本编辑器 -->
            <div v-if="formData.contentType === 'richtext'" class="editor-wrapper">
              <Toolbar
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                class="editor-toolbar"
              />
              <Editor
                v-model="formData.content"
                :defaultConfig="editorConfig"
                class="editor-content"
                @onCreated="handleCreated"
              />
            </div>
            <!-- URL输入框 -->
            <input
              v-else
              v-model="formData.content"
              type="text"
              placeholder="请输入URL地址"
              class="form-input"
            />
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
import { ref, computed, onMounted, shallowRef, onBeforeUnmount, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css'
import { 
  getFootprintBannerList, 
  addFootprintBanner, 
  removeFootprintBanner, 
  uploadFile, 
  getFootprintList,
  addFootprint,
  editFootprint,
  type FootprintBannerItem,
  type FootprintListParams,
  type FootprintListItem,
  type FootprintAddItem,
  type FootprintEditItem
} from '@/api/banner'

interface BannerItem {
  id: number
  picUrl: string
  sort: number
}

// Banner列表
const banners = ref<BannerItem[]>([])
const isLoadingBanners = ref(false)

// 内容列表
const items = ref<FootprintListItem[]>([])
const isLoadingItems = ref(false)

// 搜索和筛选
const searchKeyword = ref('')
const statusFilter = ref('all')

// 分页参数
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  pages: 0
})

// 对话框状态
const showBannerDialog = ref(false)
const showAddDialog = ref(false)
const showEditDialog = ref(false)
const showPreviewDialog = ref(false)
const bannerInput = ref<HTMLInputElement | null>(null)

// Banner表单数据
const bannerFormData = ref({
  image: '',
  file: null as File | null
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

// 富文本编辑器
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
    'insertLink',
    'insertImage',
    'insertVideo',
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
  placeholder: '请输入富文本内容...',
  MENU_CONF: {
    uploadImage: {
      async customUpload(file: File, insertFn: any) {
        try {
          const result = await uploadFile(file)
          insertFn(result.url, file.name, result.url)
        } catch (error) {
          console.error('图片上传失败:', error)
          alert('图片上传失败，请重试')
        }
      }
    }
  }
}

// 编辑器创建回调
const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor
}

// 组件卸载时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor) {
    editor.destroy()
  }
})

// 监听内容类型切换，清空内容
watch(() => formData.value.contentType, (newType, oldType) => {
  if (oldType && newType !== oldType) {
    // 切换类型时清空内容
    formData.value.content = ''
    
    // 如果从富文本切换，销毁编辑器
    if (oldType === 'richtext' && editorRef.value) {
      editorRef.value.destroy()
      editorRef.value = undefined
    }
  }
})

// 加载 Banner 列表
const loadBannerList = async () => {
  try {
    isLoadingBanners.value = true
    const data = await getFootprintBannerList()
    banners.value = data.sort((a, b) => a.sort - b.sort)
    console.log('✅ 获取总书记的福建足迹 Banner 列表成功:', data)
  } catch (error) {
    console.error('❌ 获取 Banner 列表失败:', error)
    alert('获取 Banner 列表失败，请稍后重试')
  } finally {
    isLoadingBanners.value = false
  }
}

// 加载足迹内容列表
const loadFootprintList = async () => {
  try {
    isLoadingItems.value = true
    
    // 构建查询参数
    const params: FootprintListParams = {
      pageIndex: pagination.value.current,
      pageSize: pagination.value.pageSize
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
    
    const response = await getFootprintList(params)
    items.value = response.records
    pagination.value.total = response.total
    pagination.value.current = response.current
    pagination.value.pages = response.pages
    
    console.log('✅ 获取足迹列表成功:', response)
  } catch (error) {
    console.error('❌ 获取足迹列表失败:', error)
    alert('获取列表失败，请稍后重试')
  } finally {
    isLoadingItems.value = false
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadBannerList()
  loadFootprintList()
})

// 计算属性
const totalCount = computed(() => pagination.value.total)

const filteredItems = computed(() => {
  // 数据已经在后端筛选过，直接返回
  return items.value
})

// 搜索处理
const handleSearch = () => {
  pagination.value.current = 1  // 重置到第一页
  loadFootprintList()
}

// 筛选处理
const handleFilter = () => {
  pagination.value.current = 1  // 重置到第一页
  loadFootprintList()
}

// 分页处理
const handlePageChange = (page: number) => {
  pagination.value.current = page
  loadFootprintList()
}

const handlePageSizeChange = (size: number) => {
  pagination.value.pageSize = size
  pagination.value.current = 1  // 重置到第一页
  loadFootprintList()
}

// === Banner管理 ===
const triggerBannerUpload = () => {
  bannerInput.value?.click()
}

const handleBannerChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    // 保存文件对象，用于上传
    bannerFormData.value.file = file
    
    // 读取预览图
    const reader = new FileReader()
    reader.onload = (e) => {
      bannerFormData.value.image = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const removeBannerImage = () => {
  bannerFormData.value.image = ''
  bannerFormData.value.file = null
  if (bannerInput.value) {
    bannerInput.value.value = ''
  }
}

const saveBanner = async () => {
  if (!bannerFormData.value.image || !bannerFormData.value.file) {
    alert('请上传Banner图片')
    return
  }

  try {
    // 1. 上传图片文件，获取 picUrl
    console.log('🔄 开始上传 Banner 图片...')
    const uploadResult = await uploadFile(bannerFormData.value.file)
    const picUrl = uploadResult.url
    console.log('✅ 图片上传成功，URL:', picUrl)

    // 2. 计算排序序号（最大值 + 1）
    const maxSort = banners.value.length > 0 
      ? Math.max(...banners.value.map(b => b.sort))
      : 0
    const sort = maxSort + 1

    // 3. 调用添加 Banner API
    console.log('🔄 调用添加 Banner API...', { picUrl, sort })
    await addFootprintBanner(picUrl, sort)
    console.log('✅ Banner 添加成功')

    // 4. 重新加载列表
    await loadBannerList()
    
    alert('添加成功！')
    closeBannerDialog()
  } catch (error: any) {
    console.error('❌ 添加 Banner 失败:', error)
    alert(error.message || '添加失败，请稍后重试')
  }
}

const deleteBanner = async (id: number) => {
  if (!confirm('确定要删除这个 Banner 吗？')) {
    return
  }

  try {
    console.log('🔄 开始删除 Banner，ID:', id)
    await removeFootprintBanner(id)
    console.log('✅ Banner 删除成功')
    
    // 重新加载列表
    await loadBannerList()
    alert('删除成功！')
  } catch (error: any) {
    console.error('❌ 删除 Banner 失败:', error)
    alert(error.message || '删除失败，请稍后重试')
  }
}

const closeBannerDialog = () => {
  showBannerDialog.value = false
  bannerFormData.value = { image: '', file: null }
}

// 获取分页页码数组
const getPageNumbers = () => {
  const pages = pagination.value.pages
  const current = pagination.value.current
  const pageNumbers: number[] = []
  
  if (pages <= 7) {
    // 总页数小于等于7，显示所有页码
    for (let i = 1; i <= pages; i++) {
      pageNumbers.push(i)
    }
  } else {
    // 总页数大于7，显示部分页码
    if (current <= 4) {
      // 当前页在前面
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(i)
      }
      pageNumbers.push(-1) // 省略号
      pageNumbers.push(pages)
    } else if (current >= pages - 3) {
      // 当前页在后面
      pageNumbers.push(1)
      pageNumbers.push(-1) // 省略号
      for (let i = pages - 4; i <= pages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // 当前页在中间
      pageNumbers.push(1)
      pageNumbers.push(-1) // 省略号
      for (let i = current - 1; i <= current + 1; i++) {
        pageNumbers.push(i)
      }
      pageNumbers.push(-1) // 省略号
      pageNumbers.push(pages)
    }
  }
  
  return pageNumbers
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

  // TODO: 实现拖拽排序的后端API调用
  alert('拖拽排序功能待实现后端API')
  draggedIndex.value = null
}

const togglePin = async (item: FootprintListItem) => {
  try {
    console.log('🔄 切换置顶状态...', item.title)
    
    const newPinTopStatus = item.pinTop === 1 ? 0 : 1
    
    const editData: FootprintEditItem = {
      id: item.id,
      title: item.title,
      footprintType: item.footprintType,
      content: item.content,
      pinTop: newPinTopStatus,
      showFront: item.showFront
    }
    
    console.log('请求数据:', editData)
    
    await editFootprint(editData)
    console.log('✅ 置顶状态切换成功')
    
    // 重新加载列表
    await loadFootprintList()
    
    const statusText = newPinTopStatus === 1 ? '置顶' : '取消置顶'
    alert(`${statusText}成功！`)
  } catch (error: any) {
    console.error('❌ 切换置顶状态失败:', error)
    alert(error.message || '操作失败，请稍后重试')
  }
}

const editItem = (item: FootprintListItem) => {
  formData.value = {
    id: item.id.toString(),
    title: item.title,
    contentType: item.footprintType === 0 ? 'richtext' : 'url',
    content: item.content,
    isPinned: item.pinTop === 1,
    showOnFrontend: item.showFront === 1
  }
  showEditDialog.value = true
}

const toggleVisibility = async (item: FootprintListItem) => {
  try {
    console.log('🔄 切换显示状态...', item.title)
    
    const newShowFrontStatus = item.showFront === 1 ? 0 : 1
    
    const editData: FootprintEditItem = {
      id: item.id,
      title: item.title,
      footprintType: item.footprintType,
      content: item.content,
      pinTop: item.pinTop,
      showFront: newShowFrontStatus
    }
    
    console.log('请求数据:', editData)
    
    await editFootprint(editData)
    console.log('✅ 显示状态切换成功')
    
    // 重新加载列表
    await loadFootprintList()
    
    const statusText = newShowFrontStatus === 1 ? '显示' : '隐藏'
    alert(`已设置为${statusText}！`)
  } catch (error: any) {
    console.error('❌ 切换显示状态失败:', error)
    alert(error.message || '操作失败，请稍后重试')
  }
}

const deleteItem = (id: number) => {
  if (confirm('确定要删除这条内容吗？')) {
    // TODO: 实现删除功能的后端API调用
    alert('删除功能待实现后端API')
  }
}

const saveItem = async () => {
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

  try {
    if (showEditDialog.value) {
      // 编辑功能
      console.log('🔄 开始编辑足迹...')
      
      const editData: FootprintEditItem = {
        id: Number(formData.value.id),
        title: formData.value.title,
        footprintType: formData.value.contentType === 'richtext' ? 0 : 1,
        content: formData.value.content,
        pinTop: formData.value.isPinned ? 1 : 0,
        showFront: formData.value.showOnFrontend ? 1 : 0
      }
      
      console.log('请求数据:', editData)
      
      await editFootprint(editData)
      console.log('✅ 足迹编辑成功')
      
      alert('编辑成功！')
      closeDialog()
      
      // 重新加载列表
      await loadFootprintList()
    } else {
      // 新增功能
      console.log('🔄 开始新增足迹...')
      
      const addData: FootprintAddItem = {
        title: formData.value.title,
        footprintType: formData.value.contentType === 'richtext' ? 0 : 1,
        content: formData.value.content,
        pinTop: formData.value.isPinned ? 1 : 0,
        showFront: formData.value.showOnFrontend ? 1 : 0
      }
      
      console.log('请求数据:', addData)
      
      await addFootprint(addData)
      console.log('✅ 足迹新增成功')
      
      alert('新增成功！')
      closeDialog()
      
      // 重新加载列表
      await loadFootprintList()
    }
  } catch (error: any) {
    console.error('❌ 保存失败:', error)
    alert(error.message || '保存失败，请稍后重试')
  }
}

const closeDialog = () => {
  // 销毁编辑器
  if (editorRef.value) {
    editorRef.value.destroy()
    editorRef.value = undefined
  }
  
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

.badge-status {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  background: #d9d9d9;
  color: #666;
  border-radius: 2px;
  font-size: 12px;
  flex-shrink: 0;
}

.badge-status--active {
  background: #52c41a;
  color: white;
}

.item-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
  font-size: 13px;
  color: #666;
}

.meta-item {
  display: flex;
  align-items: center;
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

.action-btn--visibility {
  color: #52c41a;
}

.action-btn--visibility:hover {
  background: #f6ffed;
}

.action-btn--hidden {
  color: #999;
}

.action-btn--hidden:hover {
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

/* 分页 */
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e8e8e8;
}

.pagination-info {
  font-size: 14px;
  color: #666;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.page-size-select {
  padding: 6px 10px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  background: white;
}

.page-btn {
  padding: 6px 12px;
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
  color: #d9d9d9;
  cursor: not-allowed;
  background: #f5f5f5;
}

.page-numbers {
  display: flex;
  align-items: center;
  gap: 4px;
}

.page-number {
  min-width: 32px;
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
  color: white;
  border-color: #e31e24;
}

.page-number.ellipsis {
  border: none;
  cursor: default;
}

.page-number:disabled {
  cursor: default;
}

/* 加载状态 */
.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #666;
}

/* 富文本编辑器 */
.editor-wrapper {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
  transition: border-color 0.3s;
}

.editor-wrapper:focus-within {
  border-color: #e31e24;
}

.editor-toolbar {
  border-bottom: 1px solid #d9d9d9;
  background: #fafafa;
}

.editor-content {
  height: 400px;
  overflow-y: auto;
  background: white;
}

.editor-content :deep(.w-e-text-container) {
  background: white;
}

.editor-content :deep(.w-e-text-placeholder) {
  color: #999;
  font-style: normal;
}
</style>

