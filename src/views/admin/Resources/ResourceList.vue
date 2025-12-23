<template>
  <div class="resource-list">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="page-title">
        <h2>思政资源</h2>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-left: 8px;">
          <path d="M12 5.33333L6.66667 10.6667L4 8" stroke="#999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <p class="page-desc">管理课程思政资源设施内容</p>
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
      共 {{ totalCount }} 条
    </div>

    <!-- 加载状态 -->
    <div v-if="isLoading" class="loading-state">
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

        <!-- 内容信息 -->
        <div class="item-content">
          <h3 class="item-title">
            {{ item.title }}
            <span v-if="item.pinTop === 1 || item.pinTop === 32" class="pin-badge">置顶</span>
            <span v-if="item.category === 0" class="category-badge">政策文件</span>
            <span v-else-if="item.category === 1 || item.category === 2" class="category-badge category-badge--material">思政素材</span>
          </h3>
          <p class="item-description">{{ item.content ? (item.content.substring(0, 100) + (item.content.length > 100 ? '...' : '')) : '-' }}</p>

          <div class="item-footer">
            <div class="footer-info">
              <span class="sort-info">第 {{ (currentPage - 1) * pageSize + index + 1 }} 位</span>
              <span class="time-info">创建时间：{{ item.createTime || '-' }}</span>
              <span class="view-info">浏览量：{{ item.statPv || 0 }}</span>
              <span class="status-info" :class="{ 'status-info--active': item.showFront === 1 || item.showFront === 64 }">
                {{ (item.showFront === 1 || item.showFront === 64) ? '前台显示' : '已隐藏' }}
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

    <!-- 分页组件 -->
    <Pagination
      v-if="!isLoading && items.length > 0"
      :page="currentPage"
      :pageSize="pageSize"
      :total="total"
      @pageChange="handlePageChange"
      @sizeChange="handleSizeChange"
    />

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
            <label>分类 <span class="required">*</span></label>
            <select v-model.number="formData.category" class="form-select">
              <option :value="0">政策文件</option>
              <option :value="1">思政素材</option>
            </select>
          </div>

          <div class="form-group">
            <label>内容类型 <span class="required">*</span></label>
            <select v-model.number="formData.contentType" class="form-select">
              <option :value="0">富文本内容（内部详情）</option>
              <option :value="1">URL地址（外部跳转）</option>
            </select>
          </div>

          <div class="form-group">
            <label>详情内容 <span class="required">*</span></label>
            <div v-if="formData.contentType === 0" class="editor-container">
              <Toolbar
                :editor="editorRef"
                :defaultConfig="{}"
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
              type="text"
              placeholder="请输入URL地址"
              class="form-input"
            />
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

          <div class="form-group form-group--inline">
            <label class="checkbox-label">
              <input v-model="formData.pinTop" type="checkbox" :true-value="1" :false-value="0" />
              <span>置顶显示</span>
            </label>
            
            <label class="checkbox-label">
              <input v-model="formData.showFront" type="checkbox" :true-value="1" :false-value="0" />
              <span>前台显示</span>
            </label>
          </div>
        </div>

        <div class="dialog__footer">
          <button class="btn-cancel" @click="closeDialog" :disabled="isSaving">取消</button>
          <button class="btn-confirm" @click="saveItem" :disabled="isSaving">
            <svg v-if="!isSaving" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11.6667 6.33333V11.6667C11.6667 12.0203 11.5262 12.3594 11.2762 12.6095C11.0261 12.8595 10.687 13 10.3333 13H3.66667C3.31304 13 2.97391 12.8595 2.72386 12.6095C2.47381 12.3594 2.33333 12.0203 2.33333 11.6667V2.33333C2.33333 1.97971 2.47381 1.64057 2.72386 1.39052C2.97391 1.14048 3.31304 1 3.66667 1H9L11.6667 3.66667V6.33333Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.66667 13V8.33333H4.33333V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span v-if="isSaving">保存中...</span>
            <span v-else>保存</span>
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
import { ref, computed, onBeforeUnmount, onMounted, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import type { IEditorConfig } from '@wangeditor/editor'
import { addPoliticalResource, getPoliticalResourceList } from '@/api/resource'
import type { PoliticalResourceAddParams, PoliticalResourceItem } from '@/types'
import Pagination from '@/components/common/Pagination/index.vue'

// 数据列表
const items = ref<PoliticalResourceItem[]>([])

// 分页状态
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 加载状态
const isLoading = ref(false)

// 搜索和筛选
const searchKeyword = ref('')
const statusFilter = ref('all')

// 对话框状态
const showAddDialog = ref(false)
const showEditDialog = ref(false)
const showPreviewDialog = ref(false)

// 表单数据
const formData = ref({
  id: '',
  title: '',
  category: 1 as 0 | 1, // 0=政策文件；1=思政素材
  contentType: 0 as 0 | 1, // 0=富文本内容；1=URL地址
  content: '',
  pinTop: 0 as 0 | 1, // 0=不置顶；1=置顶
  showFront: 1 as 0 | 1, // 0=不显示；1=显示
  displayOrder: 1
})

// 富文本编辑器
const editorRef = shallowRef()
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入详情内容...',
  MENU_CONF: {}
}

const handleCreated = (editor: any) => {
  editorRef.value = editor
}

// 组件销毁前，销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor) {
    editor.destroy()
  }
})

// 预览数据
const previewData = ref<ResourceItem | null>(null)

// 拖拽相关
const draggedIndex = ref<number | null>(null)

// 计算属性
const totalCount = computed(() => total.value)

// 加载列表数据
const loadList = async () => {
  try {
    isLoading.value = true
    
    const params = {
      pageIndex: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchKeyword.value || undefined
      // showFront 不传，显示所有
    }
    
    console.log('📤 请求参数:', params)
    const response = await getPoliticalResourceList(params)
    console.log('📥 API 返回数据:', response)
    
    // 响应拦截器已经提取了 data，response 就是数据对象本身
    if (response && response.records) {
      items.value = response.records || []
      total.value = response.total || 0
      currentPage.value = response.current || currentPage.value
      pageSize.value = response.size || pageSize.value
      
      console.log('✅ 数据加载成功!')
      console.log('  - records 数量:', items.value.length)
      console.log('  - total:', total.value)
      console.log('  - 列表数据:', items.value)
    } else {
      items.value = []
      total.value = 0
      console.warn('⚠️ 数据格式异常:', response)
    }
  } catch (error: any) {
    console.error('❌ 列表加载失败:', error)
    alert(`加载失败：${error.message || '网络错误'}`)
    items.value = []
    total.value = 0
  } finally {
    isLoading.value = false
    console.log('🔄 isLoading:', isLoading.value)
    console.log('📊 items 数量:', items.value.length)
  }
}

// 分页改变
const handlePageChange = (page: number) => {
  currentPage.value = page
  loadList()
}

// 每页数量改变
const handleSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1 // 重置到第一页
  loadList()
}

// 组件挂载时加载数据
onMounted(() => {
  loadList()
})

// 搜索处理（防抖）
let searchTimer: ReturnType<typeof setTimeout> | null = null
const handleSearch = () => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    currentPage.value = 1 // 重置到第一页
    loadList()
  }, 500) // 500ms 防抖
}

// 筛选处理
const handleFilter = () => {
  currentPage.value = 1 // 重置到第一页
  loadList()
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

  const draggedItem = items.value[draggedIndex.value]
  const targetItem = items.value[targetIndex]
  
  // TODO: 调用后端接口更新排序
  const temp = items.value[draggedIndex.value]
  items.value[draggedIndex.value] = items.value[targetIndex]
  items.value[targetIndex] = temp

  draggedIndex.value = null
}

// 编辑项目
const editItem = (item: PoliticalResourceItem) => {
  formData.value = {
    id: String(item.id),
    title: item.title,
    category: item.category,
    contentType: item.contentType,
    content: item.content,
    pinTop: item.pinTop,
    showFront: item.showFront,
    displayOrder: 1
  }
  showEditDialog.value = true
}

// 预览项目
const previewItem = (item: PoliticalResourceItem) => {
  previewData.value = {
    id: String(item.id),
    title: item.title,
    description: item.content,
    status: item.showFront === 1 ? 'active' : 'inactive',
    publishTime: item.createTime || new Date().toISOString().split('T')[0],
    sort: 1
  }
  showPreviewDialog.value = true
}

// 删除项目
const deleteItem = (id: string | number) => {
  if (confirm('确定要删除这条资源吗？')) {
    // TODO: 调用后端删除接口
    const index = items.value.findIndex(item => item.id === id)
    if (index > -1) {
      items.value.splice(index, 1)
      total.value--
      alert('删除成功！')
    }
  }
}

// 保存加载状态
const isSaving = ref(false)

// 保存项目
const saveItem = async () => {
  if (!formData.value.title) {
    alert('请输入标题')
    return
  }
  if (!formData.value.content) {
    alert('请输入详情内容')
    return
  }

  if (showEditDialog.value) {
    // 编辑模式 - TODO: 调用后端编辑接口
    alert('编辑功能待实现')
    closeDialog()
  } else {
    // 新增模式 - 调用接口
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
      
      // 重新加载列表
      currentPage.value = 1
      await loadList()
    } catch (error: any) {
      console.error('新增失败:', error)
      alert(`新增失败：${error.message || '网络错误'}`)
    } finally {
      isSaving.value = false
    }
  }
}

// 关闭对话框
const closeDialog = () => {
  showAddDialog.value = false
  showEditDialog.value = false
  formData.value = {
    id: '',
    title: '',
    category: 1,
    contentType: 0,
    content: '',
    pinTop: 0,
    showFront: 1,
    displayOrder: 1
  }
}
</script>

<style scoped>
.resource-list {
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
  gap: 12px;
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

.form-group--inline {
  display: flex;
  gap: 24px;
  align-items: center;
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

.form-input,
.form-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.3s;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #e31e24;
}

.form-select {
  cursor: pointer;
  background-color: white;
}

.form-textarea {
  width: 100%;
  min-height: 180px;
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
}

.editor-content {
  min-height: 300px;
  overflow-y: auto;
}

.editor-content :deep(.w-e-text-container) {
  background-color: #fff;
}

.editor-content :deep(.w-e-text-placeholder) {
  font-style: normal;
  color: #bfbfbf;
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

.btn-confirm:disabled,
.btn-cancel:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 预览内容 */
.preview-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 徽章样式 */
.pin-badge,
.category-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  margin-left: 8px;
  font-size: 12px;
  border-radius: 3px;
  font-weight: normal;
}

.pin-badge {
  background: #ff4d4f;
  color: white;
}

.category-badge {
  background: #1890ff;
  color: white;
}

.category-badge--material {
  background: #52c41a;
}

.status-info {
  color: #999;
}

.status-info--active {
  color: #52c41a;
}
</style>

