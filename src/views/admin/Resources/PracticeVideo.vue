<template>
  <div class="practice-video">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="page-title">
        <h2>习思想优秀视频展播</h2>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-left: 8px;">
          <path d="M12 5.33333L6.66667 10.6667L4 8" stroke="#999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <p class="page-desc">管理习思想优秀视频展播内容</p>
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
            placeholder="搜索视频主题/关键词..."
            class="search-input"
            @keyup.enter="handleSearch"
          />
          <button class="btn-search" @click="handleSearch" title="搜索">
            搜索
          </button>
        </div>
        
        <select v-model="seriesFilter" class="filter-select" @change="handleFilter">
          <option value="all">全部类型</option>
          <option value="教师岗">教师岗</option>
          <option value="管理岗">管理岗</option>
        </select>

        <select v-model="unitFilter" class="filter-select" @change="handleFilter">
          <option value="all">全部单位</option>
          <option value="计算机学院">计算机学院</option>
          <option value="机械学院">机械学院</option>
          <option value="电气学院">电气学院</option>
        </select>

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
      共 {{ totalCount }} 条，当前显示 {{ displayItems.length }} 条
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>

    <!-- 列表内容 -->
    <div v-else class="content-list">
      <div
        v-for="(item, index) in displayItems"
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
                <path d="M12 5.5L7 2L2 5.5V11C2 11.2652 2.10536 11.5196 2.29289 11.7071C2.48043 11.8946 2.73478 12 3 12H11C11.2652 12 11.5196 11.8946 11.7071 11.7071C11.8946 11.5196 12 11.2652 12 11V5.5Z" stroke="#d4a574" stroke-width="1.2" fill="none"/>
              </svg>
              <span style="color: #d4a574;">{{ item.unit }}</span>
            </div>
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
      <div v-if="displayItems.length === 0" class="empty-state">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" stroke="#d9d9d9" stroke-width="2"/>
          <path d="M32 20V36M32 44H32.02" stroke="#d9d9d9" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <p>暂无数据</p>
      </div>
    </div>

    <!-- 分页 -->
    <div v-if="!loading && displayItems.length > 0" class="pagination-wrapper">
      <div class="pagination">
        <button 
          class="pagination-btn" 
          :disabled="currentPage === 1"
          @click="handlePageChange(currentPage - 1)"
        >
          上一页
        </button>
        
        <div class="pagination-pages">
          <button
            v-for="page in getPageNumbers()"
            :key="page"
            class="pagination-page"
            :class="{ active: page === currentPage }"
            @click="handlePageChange(page)"
          >
            {{ page }}
          </button>
        </div>
        
        <button 
          class="pagination-btn"
          :disabled="currentPage === totalPages"
          @click="handlePageChange(currentPage + 1)"
        >
          下一页
        </button>
        
        <div class="pagination-info">
          <span>共 {{ totalPages }} 页</span>
          <span class="divider">|</span>
          <span>每页</span>
          <select v-model.number="pageSize" @change="handlePageSizeChange(pageSize)" class="page-size-select">
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
          </select>
          <span>条</span>
        </div>
      </div>
    </div>

    <!-- 新增/编辑对话框 -->
    <div v-if="showAddDialog || showEditDialog" class="dialog-overlay" @click.self="closeDialog">
      <div class="dialog">
        <div class="dialog__header">
          <h3>{{ showEditDialog ? '编辑视频' : '新增视频' }}</h3>
          <button class="dialog__close" @click="closeDialog">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="#666" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        
        <div class="dialog__body">
          <!-- 封面上传 -->
          <div class="form-group">
            <label>封面 <span class="required">*</span></label>
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
                <p class="upload-hint">用于前台卡片列表展示</p>
                <button class="btn-upload-blue" type="button" @click="triggerCoverUpload">选择图片</button>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>视频主题 <span class="required">*</span></label>
            <input
              v-model="formData.title"
              type="text"
              placeholder="请输入视频主题"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label>主持人 <span class="required">*</span></label>
            <input
              v-model="formData.host"
              type="text"
              placeholder="请输入主持人姓名（仅支持配置1位）"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label>展播类型 <span class="required">*</span></label>
            <select v-model="formData.series" class="form-input">
              <option value="">请选择展播类型</option>
              <option value="教师岗">教师岗</option>
              <option value="管理岗">管理岗</option>
            </select>
            <small class="field-hint">用于前台筛选</small>
          </div>

          <div class="form-group">
            <label>所在单位 <span class="required">*</span></label>
            <select v-model="formData.unit" class="form-input">
              <option value="">请选择学院</option>
              <option value="计算机学院">计算机学院</option>
              <option value="机械学院">机械学院</option>
              <option value="电气工程与自动学院">电气工程与自动学院</option>
              <option value="化学学院">化学学院</option>
              <option value="数学与统计学院">数学与统计学院</option>
              <option value="物理与信息工程学院">物理与信息工程学院</option>
              <option value="土木工程学院">土木工程学院</option>
              <option value="经济与管理学院">经济与管理学院</option>
              <option value="马克思主义学院">马克思主义学院</option>
            </select>
          </div>

          <div class="form-group">
            <label>课程简介</label>
            <textarea
              v-model="formData.description"
              rows="5"
              placeholder="用于详情页的纯文本简介（选填）"
              class="form-input"
            ></textarea>
          </div>

          <div class="form-group">
            <label>优秀视频 <span class="required">*</span></label>
            <div class="video-upload-box">
              <input
                ref="videoInput"
                type="file"
                accept="video/mp4"
                style="display: none"
                @change="handleVideoChange"
              />
              <div v-if="formData.videoFile" class="file-preview">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="#e31e24" stroke-width="2"/>
                  <path d="M10 9L15 12L10 15V9Z" fill="#e31e24"/>
                </svg>
                <span class="file-name">{{ formData.videoFile.name }}</span>
                <button class="btn-remove-file" type="button" @click="removeVideo">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
              <div v-else class="video-upload-empty">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <path d="M30 18V42M18 30H42" stroke="#999" stroke-width="3" stroke-linecap="round"/>
                  <path d="M30 12L30 6M25 9L30 4L35 9" stroke="#999" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p class="upload-title">上传优秀视频</p>
                <p class="upload-hint">仅支持上传 1 个视频</p>
                <p class="upload-hint">需符合质控要求</p>
                <button class="btn-upload-blue" type="button" @click="triggerVideoUpload">选择视频文件</button>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="toggle-label">
              <div class="toggle-label-text">
                <span>前台显示状态 <span class="required">*</span></span>
                <small>控制视频在前台的展示状态</small>
              </div>
              <label class="toggle-switch">
                <input v-model="formData.isActive" type="checkbox" />
                <span class="toggle-slider"></span>
              </label>
            </label>
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
        </div>

        <div class="dialog__footer">
          <button class="btn-cancel" @click="closeDialog">取消</button>
          <button class="btn-confirm" @click="saveItem">保存</button>
        </div>
      </div>
    </div>

    <!-- 预览对话框 -->
    <div v-if="showPreviewDialog" class="dialog-overlay" @click.self="showPreviewDialog = false">
      <div class="dialog dialog--large">
        <div class="dialog__header">
          <h3>视频预览</h3>
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
              <span>展播类型：{{ previewData.series }}</span>
              <span>单位：{{ previewData.unit }}</span>
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
import { ref, computed, onMounted } from 'vue'
import { uploadFile, addVideoExpo, getVideoExpoList, editVideoExpo } from '@/api/banner'
import type { VideoExpoItem, VideoExpoListItem, VideoExpoEditItem } from '@/api/banner'

interface VideoItem {
  id: string
  title: string
  series: string
  unit: string
  host?: string // 主持人
  description: string
  status: 'active' | 'inactive'
  publishTime: string
  cover?: string
  videoFile?: { name: string; url: string }
  sort: number
}

// 数据列表
const items = ref<VideoItem[]>([])

// 搜索和筛选
const searchKeyword = ref('')
const seriesFilter = ref('all')
const unitFilter = ref('all')
const statusFilter = ref('all')

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const totalCount = ref(0)
const loading = ref(false)

// 对话框状态
const showAddDialog = ref(false)
const showEditDialog = ref(false)
const showPreviewDialog = ref(false)
const coverInput = ref<HTMLInputElement | null>(null)
const videoInput = ref<HTMLInputElement | null>(null)

// 表单数据
const formData = ref({
  id: '',
  title: '',
  host: '',
  series: '',
  unit: '',
  description: '',
  cover: '',
  coverFile: null as File | null, // 保存原始封面文件
  videoFile: null as { name: string; url: string } | null,
  videoRawFile: null as File | null, // 保存原始视频文件
  isActive: true,
  displayOrder: 1,
  publishTime: new Date().toISOString().split('T')[0]
})

// 预览数据
const previewData = ref<VideoItem | null>(null)

// 拖拽相关
const draggedIndex = ref<number | null>(null)

// 计算属性
const filteredItems = computed(() => items.value)

// 计算总页数
const totalPages = computed(() => Math.ceil(totalCount.value / pageSize.value))

// 获取列表数据
const fetchList = async () => {
  try {
    loading.value = true
    console.log('========== 获取视频展播列表 ==========')
    
    const params: any = {
      pageIndex: currentPage.value,
      pageSize: pageSize.value
    }
    
    // 添加搜索关键词
    if (searchKeyword.value) {
      params.keyword = searchKeyword.value
    }
    
    // 添加显示状态筛选
    if (statusFilter.value !== 'all') {
      params.showFront = statusFilter.value === 'active' ? 1 : 0
    }
    
    console.log('请求参数:', params)
    
    const response = await getVideoExpoList(params)
    console.log('响应数据:', response)
    console.log('响应数据类型:', typeof response)
    console.log('响应数据结构:', JSON.stringify(response, null, 2))
    
    // 兼容多种可能的响应格式
    let listData: any[] = []
    let total = 0
    
    if (Array.isArray(response)) {
      // 如果响应直接是数组
      console.log('响应是数组格式')
      listData = response
      total = response.length
    } else if (response && typeof response === 'object') {
      // 如果响应是对象，尝试多种字段名
      console.log('响应是对象格式')
      listData = response.list || response.records || response.data || []
      total = response.total || response.totalCount || listData.length
    }
    
    console.log('解析后的列表数据:', listData)
    console.log('列表长度:', listData.length)
    
    // 转换数据格式
    if (Array.isArray(listData) && listData.length > 0) {
      items.value = listData.map((item: any) => ({
        id: item.id?.toString() || '',
        title: item.title || '',
        series: item.expoType || '',
        unit: item.college || '',
        host: item.presenter || '', // 主持人
        description: item.content || '',
        status: item.showFront === 1 ? 'active' : 'inactive',
        publishTime: item.createTime || item.updateTime || '',
        cover: item.coverUrl || '',
        videoFile: item.videoUrl ? { name: '视频文件', url: item.videoUrl } : undefined,
        sort: 0
      }))
    } else {
      console.warn('没有找到有效的列表数据')
      items.value = []
    }
    
    totalCount.value = total
    console.log('列表加载完成，共', totalCount.value, '条数据，当前页', items.value.length, '条')
    console.log('========================================')
  } catch (error: any) {
    console.error('获取列表失败:', error)
    console.error('错误详情:', error.stack)
    alert(`获取列表失败：${error.message || '未知错误'}`)
  } finally {
    loading.value = false
  }
}

// 前端筛选（在已加载的数据中筛选 expoType 和 college）
const displayItems = computed(() => {
  return items.value.filter(item => {
    const matchSeries = seriesFilter.value === 'all' || item.series === seriesFilter.value
    const matchUnit = unitFilter.value === 'all' || item.unit === unitFilter.value
    return matchSeries && matchUnit
  })
})

// 搜索处理
const handleSearch = () => {
  currentPage.value = 1
  fetchList()
}

// 筛选处理
const handleFilter = () => {
  currentPage.value = 1
  fetchList()
}

// 分页处理
const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchList()
}

// 改变每页大小
const handlePageSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1
  fetchList()
}

// 生成页码数组
const getPageNumbers = () => {
  const pages: number[] = []
  const maxVisible = 5 // 最多显示5个页码
  
  if (totalPages.value <= maxVisible) {
    // 总页数少于最大显示数，显示所有页码
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    // 总页数多于最大显示数，智能显示页码
    if (currentPage.value <= 3) {
      // 当前页在前面
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
    } else if (currentPage.value >= totalPages.value - 2) {
      // 当前页在后面
      for (let i = totalPages.value - 4; i <= totalPages.value; i++) {
        pages.push(i)
      }
    } else {
      // 当前页在中间
      for (let i = currentPage.value - 2; i <= currentPage.value + 2; i++) {
        pages.push(i)
      }
    }
  }
  
  return pages
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

  const draggedItem = displayItems.value[draggedIndex.value]
  const targetItem = displayItems.value[targetIndex]
  
  // 交换排序（仅前端展示，后续可对接排序接口）
  const tempSort = draggedItem.sort
  draggedItem.sort = targetItem.sort
  targetItem.sort = tempSort

  draggedIndex.value = null
  
  // TODO: 如果后端提供排序接口，在这里调用
  console.log('拖拽排序功能待对接后端排序接口')
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
    // 保存原始文件对象
    formData.value.coverFile = file
    // 生成预览
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
  formData.value.coverFile = null
  if (coverInput.value) {
    coverInput.value.value = ''
  }
}

// 触发视频上传
const triggerVideoUpload = () => {
  videoInput.value?.click()
}

// 处理视频选择
const handleVideoChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    if (file.type !== 'video/mp4') {
      alert('仅支持 MP4 格式')
      return
    }
    if (file.size > 500 * 1024 * 1024) {
      alert('视频文件不能超过 500MB')
      return
    }
    // 保存原始文件对象
    formData.value.videoRawFile = file
    // 生成预览信息
    formData.value.videoFile = {
      name: file.name,
      url: URL.createObjectURL(file)
    }
  }
}

// 移除视频
const removeVideo = () => {
  formData.value.videoFile = null
  formData.value.videoRawFile = null
  if (videoInput.value) {
    videoInput.value.value = ''
  }
}

// 编辑项目
const editItem = (item: VideoItem) => {
  formData.value = {
    id: item.id,
    title: item.title,
    host: item.host || '', // 修复：使用实际的主持人姓名
    series: item.series,
    unit: item.unit,
    description: item.description,
    cover: item.cover || '',
    coverFile: null, // 编辑时清空文件对象
    videoFile: item.videoFile || null,
    videoRawFile: null, // 编辑时清空文件对象
    isActive: item.status === 'active',
    displayOrder: item.sort,
    publishTime: item.publishTime
  }
  showEditDialog.value = true
}

// 预览项目
const previewItem = (item: VideoItem) => {
  previewData.value = item
  showPreviewDialog.value = true
}

// 删除项目
const deleteItem = (id: string) => {
  if (confirm('确定要删除这个视频吗？')) {
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
const saveItem = async () => {
  try {
    // 验证必填项
    if (!formData.value.cover) {
      alert('请上传封面图片')
      return
    }
    if (!formData.value.title) {
      alert('请输入视频主题')
      return
    }
    if (!formData.value.host) {
      alert('请输入主持人姓名')
      return
    }
    if (!formData.value.series) {
      alert('请选择展播类型')
      return
    }
    if (!formData.value.unit) {
      alert('请选择所在单位')
      return
    }
    // 新增时必须上传视频，编辑时如果没有videoFile说明没有修改
    if (!showEditDialog.value && !formData.value.videoFile) {
      alert('请上传优秀视频')
      return
    }

    if (showEditDialog.value) {
      // 编辑 - 调用真实 API
      console.log('========== 开始编辑视频展播 ==========')
      
      // 获取原始数据
      const originalItem = items.value.find(item => item.id === formData.value.id)
      if (!originalItem) {
        alert('未找到原始数据')
        return
      }
      
      // 1. 处理封面图片（如果上传了新的封面）
      let coverUrl = originalItem.cover || ''
      if (formData.value.coverFile) {
        console.log('正在上传新的封面图片...')
        const coverResult = await uploadFile(formData.value.coverFile)
        console.log('封面上传成功:', coverResult.url)
        coverUrl = coverResult.url
      } else {
        console.log('使用原封面URL:', coverUrl)
      }
      
      // 2. 处理视频文件（如果上传了新的视频）
      let videoUrl = originalItem.videoFile?.url || ''
      if (formData.value.videoRawFile) {
        console.log('正在上传新的视频文件...')
        const videoResult = await uploadFile(formData.value.videoRawFile)
        console.log('视频上传成功:', videoResult.url)
        videoUrl = videoResult.url
      } else {
        console.log('使用原视频URL:', videoUrl)
      }
      
      // 3. 调用编辑接口
      const editData: VideoExpoEditItem = {
        id: parseInt(formData.value.id),
        title: formData.value.title,
        coverUrl: coverUrl,
        expoType: formData.value.series, // 展播类型：教师岗 或 管理岗
        college: formData.value.unit,
        presenter: formData.value.host,
        content: formData.value.description || '',
        videoUrl: videoUrl,
        showFront: formData.value.isActive ? 1 : 0
      }
      
      console.log('正在保存编辑数据:', editData)
      await editVideoExpo(editData)
      console.log('编辑成功')
      console.log('========================================')
      
      alert('编辑成功！')
      closeDialog()
      
      // 重新加载列表
      fetchList()
    } else {
      // 新增 - 调用真实 API
      console.log('========== 开始新增视频展播 ==========')
      
      // 1. 上传封面图片
      if (!formData.value.coverFile) {
        alert('请选择封面图片文件')
        return
      }
      console.log('正在上传封面图片...')
      const coverResult = await uploadFile(formData.value.coverFile)
      console.log('封面上传成功:', coverResult.url)
      
      // 2. 上传视频文件
      if (!formData.value.videoRawFile) {
        alert('请选择视频文件')
        return
      }
      console.log('正在上传视频文件...')
      const videoResult = await uploadFile(formData.value.videoRawFile)
      console.log('视频上传成功:', videoResult.url)
      
      // 3. 调用新增接口
      const videoData: VideoExpoItem = {
        title: formData.value.title,
        coverUrl: coverResult.url,
        expoType: formData.value.series, // 展播类型：教师岗 或 管理岗
        college: formData.value.unit,
        presenter: formData.value.host,
        content: formData.value.description || '',
        videoUrl: videoResult.url,
        showFront: formData.value.isActive ? 1 : 0
      }
      
      console.log('正在保存视频数据:', videoData)
      const result = await addVideoExpo(videoData)
      console.log('保存成功，ID:', result.id)
      console.log('========================================')
      
      alert('新增成功！')
      closeDialog()
      
      // 重新加载列表
      fetchList()
    }
  } catch (error: any) {
    console.error('保存失败:', error)
    alert(`保存失败：${error.message || '未知错误'}`)
  }
}

// 关闭对话框
const closeDialog = () => {
  showAddDialog.value = false
  showEditDialog.value = false
  formData.value = {
    id: '',
    title: '',
    host: '',
    series: '',
    unit: '',
    description: '',
    cover: '',
    coverFile: null,
    videoFile: null,
    videoRawFile: null,
    isActive: true,
    displayOrder: 1,
    publishTime: new Date().toISOString().split('T')[0]
  }
}

// 组件挂载时加载数据
onMounted(() => {
  fetchList()
})
</script>

<style scoped>
.practice-video {
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
  min-width: 300px;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
}

.btn-search {
  padding: 4px 12px;
  background: #e31e24;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.3s;
  white-space: nowrap;
}

.btn-search:hover {
  background: #c71b20;
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
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #666;
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

/* 字段提示 */
.field-hint {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: #999;
}

/* 视频上传区域 */
.video-upload-box {
  border: 2px dashed #d9d9d9;
  border-radius: 4px;
  padding: 32px;
  min-height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-upload-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.file-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #fafafa;
  border-radius: 4px;
}

.file-name {
  flex: 1;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn-remove-file {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #ff4d4f;
  border: 1px solid #ffccc7;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-remove-file:hover {
  background: #fff1f0;
  border-color: #ff4d4f;
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
  border: 3px solid #f3f3f3;
  border-top: 3px solid #e31e24;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-state p {
  margin: 16px 0 0;
  font-size: 14px;
}

/* 分页 */
.pagination-wrapper {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e8e8e8;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.pagination-btn {
  padding: 8px 16px;
  background: white;
  color: #333;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination-btn:hover:not(:disabled) {
  color: #e31e24;
  border-color: #e31e24;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-pages {
  display: flex;
  gap: 4px;
}

.pagination-page {
  min-width: 36px;
  height: 36px;
  padding: 0 8px;
  background: white;
  color: #333;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination-page:hover {
  color: #e31e24;
  border-color: #e31e24;
}

.pagination-page.active {
  background: #e31e24;
  color: white;
  border-color: #e31e24;
}

.pagination-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 16px;
  font-size: 14px;
  color: #666;
}

.pagination-info .divider {
  color: #d9d9d9;
}

.page-size-select {
  padding: 4px 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  background: white;
}

.page-size-select:focus {
  outline: none;
  border-color: #e31e24;
}
</style>

