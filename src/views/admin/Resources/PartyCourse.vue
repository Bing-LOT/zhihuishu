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
          <h3>{{ showEditDialog ? '编辑' : '新增' }}</h3>
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
              placeholder="请输入标题（限制6字）"
              maxlength="6"
              class="form-input"
            />
            <div class="form-hint">
              <span class="char-count">{{ formData.title.length }}/6 字</span>
              <span class="hint-text">（备注：顶层设计、特色亮点、建设成效）</span>
            </div>
          </div>

          <div class="form-group">
            <label>正文内容 <span class="required">*</span></label>
            <textarea
              v-model="formData.content"
              rows="6"
              placeholder="核心文稿输入，用于承载主要的文字信息"
              class="form-input"
            ></textarea>
            <div class="form-hint">
              <span class="hint-text">请输入核心文稿内容</span>
            </div>
          </div>

          <div class="form-group">
            <label>优秀视频 <span class="required">*</span></label>
            <div class="upload-area video-upload">
              <input
                ref="videoInput"
                type="file"
                accept="video/mp4"
                style="display: none"
                @change="handleVideoChange"
              />
              <div v-if="formData.video" class="video-preview">
                <video :src="formData.video" controls></video>
                <button class="upload-remove" @click="removeVideo">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
              <div v-else class="upload-trigger-video">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M24 10V38M10 24H38" stroke="#999" stroke-width="3" stroke-linecap="round"/>
                </svg>
                <p class="upload-title">上传优秀视频</p>
                <p class="upload-desc">仅支持上传 1 个视频</p>
                <p class="upload-desc">支持 MP4 格式，最大 500MB</p>
                <button type="button" class="btn-select-file" @click="triggerVideoUpload">
                  选择视频文件
                </button>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input
                v-model="formData.showInFrontend"
                type="checkbox"
                class="checkbox-input"
              />
              <span>前台显示</span>
            </label>
          </div>
        </div>

        <div class="dialog__footer">
          <button class="btn-cancel" @click="closeDialog">取消</button>
          <button class="btn-confirm" @click="saveItem">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-right: 4px;">
              <path d="M13 4L6 11L3 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            保存
          </button>
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
  content: string
  video?: string
  showInFrontend: boolean
  status: 'active' | 'inactive'
  publishTime: string
}

// 数据列表
const items = ref<ContentItem[]>([
  {
    id: '1',
    title: '顶层设计',
    content: '党建+课程思政顶层设计相关内容',
    status: 'active',
    publishTime: '2024-12-15',
    video: '',
    showInFrontend: true
  },
  {
    id: '2',
    title: '特色亮点',
    content: '党建+课程思政特色亮点展示',
    status: 'active',
    publishTime: '2024-12-14',
    video: '',
    showInFrontend: true
  },
  {
    id: '3',
    title: '建设成效',
    content: '党建+课程思政建设成效总结',
    status: 'active',
    publishTime: '2024-12-13',
    video: '',
    showInFrontend: true
  }
])

// 对话框状态
const showAddDialog = ref(false)
const showEditDialog = ref(false)
const videoInput = ref<HTMLInputElement | null>(null)

// 表单数据
const formData = ref({
  id: '',
  title: '',
  content: '',
  status: 'active' as 'active' | 'inactive',
  publishTime: new Date().toISOString().split('T')[0],
  video: '',
  showInFrontend: true
})

// 当前编辑项
const currentItem = ref<ContentItem | null>(null)

// 获取状态文本
const getStatusText = (status: string) => {
  return status === 'active' ? '显示中' : '已隐藏'
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
    // 检查文件大小（500MB = 500 * 1024 * 1024 bytes）
    const maxSize = 500 * 1024 * 1024
    if (file.size > maxSize) {
      alert('视频文件大小不能超过 500MB')
      return
    }
    
    // 检查文件类型
    if (!file.type.startsWith('video/mp4')) {
      alert('仅支持 MP4 格式的视频文件')
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      formData.value.video = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

// 移除视频
const removeVideo = () => {
  formData.value.video = ''
  if (videoInput.value) {
    videoInput.value.value = ''
  }
}

// 编辑项目
const editItem = (item: ContentItem) => {
  currentItem.value = item
  formData.value = {
    id: item.id,
    title: item.title,
    content: item.content || '',
    status: item.status,
    publishTime: item.publishTime,
    video: item.video || '',
    showInFrontend: item.showInFrontend
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

  if (!formData.value.content) {
    alert('请输入正文内容')
    return
  }

  if (!formData.value.video) {
    alert('请上传优秀视频')
    return
  }

  if (showEditDialog.value && currentItem.value) {
    // 编辑
    const index = items.value.findIndex(item => item.id === formData.value.id)
    if (index > -1) {
      items.value[index] = {
        ...items.value[index],
        title: formData.value.title,
        content: formData.value.content,
        status: formData.value.status,
        publishTime: formData.value.publishTime,
        video: formData.value.video,
        showInFrontend: formData.value.showInFrontend
      }
    }
  } else {
    // 新增
    const newItem: ContentItem = {
      id: Date.now().toString(),
      title: formData.value.title,
      content: formData.value.content,
      status: 'active',
      publishTime: new Date().toISOString().split('T')[0],
      video: formData.value.video,
      showInFrontend: formData.value.showInFrontend
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
    content: '',
    status: 'active',
    publishTime: new Date().toISOString().split('T')[0],
    video: '',
    showInFrontend: true
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
  min-height: 120px;
}

.form-hint {
  margin-top: 8px;
  font-size: 12px;
  color: #999;
  display: flex;
  align-items: center;
  gap: 8px;
}

.char-count {
  color: #333;
}

.hint-text {
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

.checkbox-input {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #1890ff;
}

.upload-area {
  border: 2px dashed #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
}

.video-upload {
  background: #fafafa;
}

.upload-trigger-video {
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.upload-trigger-video svg {
  margin-bottom: 16px;
}

.upload-title {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.upload-desc {
  margin: 4px 0;
  font-size: 13px;
  color: #666;
}

.btn-select-file {
  margin-top: 20px;
  padding: 10px 32px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-select-file:hover {
  background: #0f7cdd;
}

.video-preview {
  position: relative;
  width: 100%;
  min-height: 300px;
  background: #000;
}

.video-preview video {
  width: 100%;
  height: 100%;
  max-height: 400px;
  object-fit: contain;
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
  display: inline-flex;
  align-items: center;
  background: #e31e24;
  color: white;
  border: none;
}

.btn-confirm:hover {
  background: #c71b20;
}

.btn-confirm svg {
  flex-shrink: 0;
}
</style>

