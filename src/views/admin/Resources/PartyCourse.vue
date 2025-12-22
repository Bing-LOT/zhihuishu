<template>
  <div class="party-course">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="page-title">
        <h2>"党建+课程思政"工作概览</h2>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-left: 8px;">
          <path d="M12 5.33333L6.66667 10.6667L4 8" stroke="#999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <p class="page-desc">管理工作概览下的各项内容</p>
    </div>

    <!-- 数据统计和操作栏 -->
    <div class="page-toolbar">
      <div class="data-count">共 {{ items.length }} 条数据</div>
      <button class="btn-add" @click="showAddDialog = true">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 2.33333V11.6667M2.33333 7H11.6667" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
        新增
      </button>
    </div>

    <!-- 内容卡片列表 -->
    <div class="content-cards">
      <div v-for="item in items" :key="item.id" class="content-card">
        <h3 class="card-title">{{ item.title }}</h3>
        
        <div class="card-meta">
          <div class="card-status">
            <span class="status-label">状态：</span>
            <span :class="['status-badge', `status-badge--${item.status}`]">
              <span class="status-dot"></span>
              {{ getStatusText(item.status) }}
            </span>
          </div>
          
          <div class="card-time">
            <span class="time-label">发布时间：</span>
            <span class="time-value">{{ item.publishTime }}</span>
          </div>
        </div>

        <div class="card-actions">
          <button class="btn-edit" @click="editItem(item)">编辑</button>
          <button class="btn-delete" @click="deleteItem(item.id)">删除</button>
        </div>
      </div>
    </div>

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
            <label>标题 <span class="required">*</span></label>
            <input
              v-model="formData.title"
              type="text"
              placeholder="请输入标题"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label>内容描述</label>
            <textarea
              v-model="formData.description"
              rows="4"
              placeholder="请输入内容描述"
              class="form-input"
            ></textarea>
          </div>

          <div class="form-group">
            <label>状态</label>
            <div class="radio-group">
              <label class="radio-label">
                <input
                  v-model="formData.status"
                  type="radio"
                  value="active"
                  name="status"
                />
                <span>显示中</span>
              </label>
              <label class="radio-label">
                <input
                  v-model="formData.status"
                  type="radio"
                  value="inactive"
                  name="status"
                />
                <span>已隐藏</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>发布时间</label>
            <input
              v-model="formData.publishTime"
              type="date"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label>封面图片</label>
            <div class="upload-area">
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                style="display: none"
                @change="handleFileChange"
              />
              <div v-if="formData.cover" class="upload-preview">
                <img :src="formData.cover" alt="预览" />
                <button class="upload-remove" @click="removeCover">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
              <div v-else class="upload-trigger" @click="triggerUpload">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 6V26M6 16H26" stroke="#999" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <p>点击上传图片</p>
                <span>建议尺寸：800x600px</span>
              </div>
            </div>
          </div>
        </div>

        <div class="dialog__footer">
          <button class="btn-cancel" @click="closeDialog">取消</button>
          <button class="btn-confirm" @click="saveItem">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ContentItem {
  id: string
  title: string
  description?: string
  status: 'active' | 'inactive'
  publishTime: string
  cover?: string
}

// 数据列表
const items = ref<ContentItem[]>([
  {
    id: '1',
    title: '顶层设计',
    description: '党建+课程思政顶层设计相关内容',
    status: 'active',
    publishTime: '2024-12-15',
    cover: ''
  },
  {
    id: '2',
    title: '特色亮点',
    description: '党建+课程思政特色亮点展示',
    status: 'active',
    publishTime: '2024-12-14',
    cover: ''
  },
  {
    id: '3',
    title: '建设成效',
    description: '党建+课程思政建设成效总结',
    status: 'active',
    publishTime: '2024-12-13',
    cover: ''
  }
])

// 对话框状态
const showAddDialog = ref(false)
const showEditDialog = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

// 表单数据
const formData = ref({
  id: '',
  title: '',
  description: '',
  status: 'active' as 'active' | 'inactive',
  publishTime: new Date().toISOString().split('T')[0],
  cover: ''
})

// 当前编辑项
const currentItem = ref<ContentItem | null>(null)

// 获取状态文本
const getStatusText = (status: string) => {
  return status === 'active' ? '显示中' : '已隐藏'
}

// 触发文件上传
const triggerUpload = () => {
  fileInput.value?.click()
}

// 处理文件选择
const handleFileChange = (event: Event) => {
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
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// 编辑项目
const editItem = (item: ContentItem) => {
  currentItem.value = item
  formData.value = {
    id: item.id,
    title: item.title,
    description: item.description || '',
    status: item.status,
    publishTime: item.publishTime,
    cover: item.cover || ''
  }
  showEditDialog.value = true
}

// 删除项目
const deleteItem = (id: string) => {
  if (confirm('确定要删除这条内容吗？')) {
    const index = items.value.findIndex(item => item.id === id)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }
}

// 保存项目
const saveItem = () => {
  if (!formData.value.title) {
    alert('请输入标题')
    return
  }

  if (showEditDialog.value && currentItem.value) {
    // 编辑
    const index = items.value.findIndex(item => item.id === formData.value.id)
    if (index > -1) {
      items.value[index] = {
        ...items.value[index],
        title: formData.value.title,
        description: formData.value.description,
        status: formData.value.status,
        publishTime: formData.value.publishTime,
        cover: formData.value.cover
      }
    }
  } else {
    // 新增
    const newItem: ContentItem = {
      id: Date.now().toString(),
      title: formData.value.title,
      description: formData.value.description,
      status: formData.value.status,
      publishTime: formData.value.publishTime,
      cover: formData.value.cover
    }
    items.value.unshift(newItem)
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
    description: '',
    status: 'active',
    publishTime: new Date().toISOString().split('T')[0],
    cover: ''
  }
  currentItem.value = null
}
</script>

<style scoped>
.party-course {
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
  margin-bottom: 24px;
}

.data-count {
  font-size: 14px;
  color: #666;
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
}

.btn-add:hover {
  background: #c71b20;
}

/* 内容卡片 */
.content-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 24px;
}

.content-card {
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 24px;
  transition: all 0.3s;
}

.content-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.card-title {
  margin: 0 0 20px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.card-meta {
  margin-bottom: 20px;
}

.card-status,
.card-time {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
}

.status-label,
.time-label {
  color: #666;
  margin-right: 8px;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #52c41a;
}

.status-badge--inactive {
  color: #999;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.time-value {
  color: #333;
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.btn-edit,
.btn-delete {
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.btn-edit {
  color: #1890ff;
}

.btn-delete {
  color: #ff4d4f;
}

.btn-edit:hover,
.btn-delete:hover {
  opacity: 0.7;
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

.radio-group {
  display: flex;
  gap: 24px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.radio-label input {
  cursor: pointer;
}

.upload-area {
  border: 2px dashed #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
}

.upload-trigger {
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.3s;
}

.upload-trigger:hover {
  border-color: #e31e24;
}

.upload-trigger p {
  margin: 12px 0 4px;
  font-size: 14px;
  color: #333;
}

.upload-trigger span {
  font-size: 12px;
  color: #999;
}

.upload-preview {
  position: relative;
  width: 100%;
  height: 240px;
}

.upload-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-remove {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.upload-remove:hover {
  background: rgba(0, 0, 0, 0.8);
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
</style>

