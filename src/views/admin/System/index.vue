<template>
  <div class="admin-system">
    <!-- 左侧标签页 -->
    <div class="system-sidebar">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        :class="['sidebar-tab', { 'sidebar-tab--active': currentTab === tab.key }]"
        @click="currentTab = tab.key"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" stroke-width="1.5"/>
          <path d="M12.9 8.7C12.8427 8.90964 12.8427 9.13036 12.9 9.34L13.9 10.34C13.9665 10.4085 14.0129 10.4947 14.0339 10.5886C14.0549 10.6825 14.0497 10.7803 14.019 10.871L13.019 13.371C12.9884 13.4617 12.9332 13.5422 12.8596 13.6032C12.786 13.6641 12.697 13.7029 12.603 13.715L9.9 14.115C9.69036 14.1424 9.49815 14.2424 9.355 14.397L8 15.752" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <span>{{ tab.label }}</span>
      </div>
    </div>

    <!-- 右侧内容区 -->
    <div class="system-content">
      <!-- 基本信息 -->
      <div v-if="currentTab === 'basic'" class="content-section">
        <div class="section-header">
          <div class="section-title">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#e31e24" stroke-width="1.5"/>
              <path d="M16.125 10.875C16.0537 11.1371 16.0537 11.4129 16.125 11.675L17.375 12.925C17.4581 12.9606 17.5287 13.0189 17.5786 13.0927C17.6285 13.1665 17.6558 13.2527 17.6574 13.3413C17.6589 13.4298 17.6345 13.5168 17.5872 13.592C17.5399 13.6671 17.4714 13.7277 17.39 13.7663L14.39 15.2663C14.3086 15.3049 14.2177 15.3199 14.1275 15.3097C14.0373 15.2995 13.9514 15.2645 13.88 15.2088L12.175 13.9963C11.9629 13.8531 11.7031 13.8031 11.4513 13.8563L8.275 14.5063" stroke="#e31e24" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <h2>系统基本信息</h2>
          </div>
          <p class="section-desc">配置系统的基本信息，包括名称、Logo、联系方式等</p>
        </div>

        <div class="form-container">
          <div class="form-row">
            <div class="form-col">
              <label>系统名称</label>
              <input v-model="config.systemName" type="text" class="form-input" />
            </div>
            <div class="form-col">
              <label>系统简称</label>
              <input v-model="config.systemShortName" type="text" class="form-input" />
            </div>
          </div>

          <div class="form-group">
            <label>系统Logo</label>
            <div class="logo-upload">
              <div class="logo-preview">
                <img v-if="config.logo" :src="config.logo" alt="Logo" />
                <div v-else class="logo-placeholder">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect width="48" height="48" rx="8" fill="#e31e24"/>
                    <path d="M24 16L16 32H32L24 16Z" fill="white"/>
                  </svg>
                </div>
              </div>
              <div class="logo-upload-info">
                <input
                  ref="logoInput"
                  type="file"
                  accept="image/png,image/svg+xml"
                  style="display: none"
                  @change="handleLogoChange"
                />
                <button class="btn-upload-logo" @click="triggerLogoUpload">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 9.33333V2.33333M4 5.33333L7 2.33333L10 5.33333" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.6667 9.33333V11.6667C11.6667 11.8435 11.5964 12.013 11.4714 12.1381C11.3464 12.2631 11.1768 12.3333 11 12.3333H3C2.82319 12.3333 2.65362 12.2631 2.5286 12.1381C2.40357 12.013 2.33333 11.8435 2.33333 11.6667V9.33333" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  上传Logo
                </button>
                <small class="upload-hint">建议尺寸：200x200px，支持PNG、SVG格式</small>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-col">
              <label>学校名称</label>
              <input v-model="config.schoolName" type="text" class="form-input" />
            </div>
            <div class="form-col">
              <label>主管单位</label>
              <input v-model="config.department" type="text" class="form-input" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-col">
              <label>联系电话</label>
              <input v-model="config.phone" type="text" class="form-input" />
            </div>
            <div class="form-col">
              <label>联系邮箱</label>
              <input v-model="config.email" type="email" class="form-input" />
            </div>
          </div>

          <div class="form-group">
            <label>系统介绍</label>
            <textarea v-model="config.introduction" rows="6" class="form-textarea"></textarea>
          </div>

          <div class="form-actions">
            <button class="btn-cancel" @click="handleCancel">取消</button>
            <button class="btn-save" @click="handleSave">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11.6667 6.33333V11.6667C11.6667 12.0203 11.5262 12.3594 11.2762 12.6095C11.0261 12.8595 10.687 13 10.3333 13H3.66667C3.31304 13 2.97391 12.8595 2.72386 12.6095C2.47381 12.3594 2.33333 12.0203 2.33333 11.6667V2.33333C2.33333 1.97971 2.47381 1.64057 2.72386 1.39052C2.97391 1.14048 3.31304 1 3.66667 1H9L11.6667 3.66667V6.33333Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.66667 13V8.33333H4.33333V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              保存配置
            </button>
          </div>
        </div>
      </div>

      <!-- 菜单结构 -->
      <div v-if="currentTab === 'menu'" class="content-section">
        <div class="section-header">
          <div class="section-title">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 6H17M3 10H17M3 14H17" stroke="#e31e24" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <h2>一级菜单列表</h2>
          </div>
          <p class="section-desc">展示所有一级菜单项，包含：当前名称、显示名称、排序、显示/隐藏</p>
        </div>

        <!-- 菜单表格 -->
        <div class="menu-table">
          <div class="table-header">
            <div class="th th-name">当前名称</div>
            <div class="th th-display">显示名称</div>
            <div class="th th-sort">排序</div>
            <div class="th th-visible">显示/隐藏</div>
            <div class="th th-action">操作</div>
          </div>

          <div class="table-body">
            <div
              v-for="(menu, index) in menuList"
              :key="menu.id"
              class="table-row"
              :draggable="true"
              @dragstart="handleMenuDragStart(index, $event)"
              @dragover.prevent
              @drop="handleMenuDrop(index, $event)"
            >
              <div class="td td-name">
                <div class="drag-handle-small">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="4" cy="2" r="0.8" fill="#999"/>
                    <circle cx="8" cy="2" r="0.8" fill="#999"/>
                    <circle cx="4" cy="6" r="0.8" fill="#999"/>
                    <circle cx="8" cy="6" r="0.8" fill="#999"/>
                    <circle cx="4" cy="10" r="0.8" fill="#999"/>
                    <circle cx="8" cy="10" r="0.8" fill="#999"/>
                  </svg>
                </div>
                <span>{{ menu.name }}</span>
              </div>
              <div class="td td-display">
                <input
                  v-model="menu.displayName"
                  type="text"
                  class="inline-input"
                  maxlength="8"
                />
                <span class="char-count">{{ menu.displayName.length }}/8 字</span>
              </div>
              <div class="td td-sort">第 {{ index + 1 }} 位</div>
              <div class="td td-visible">
                <div class="visible-badge">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="#52c41a" stroke-width="1.5"/>
                    <circle cx="8" cy="8" r="2" stroke="#52c41a" stroke-width="1.5"/>
                  </svg>
                  <span>显示</span>
                </div>
              </div>
              <div class="td td-action">
                <button
                  class="btn-arrow"
                  :disabled="index === 0"
                  @click="moveMenu(index, -1)"
                  title="上移"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M9 7.5L6 4.5L3 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <button
                  class="btn-arrow"
                  :disabled="index === menuList.length - 1"
                  @click="moveMenu(index, 1)"
                  title="下移"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部统计和按钮 -->
        <div class="menu-footer">
          <div class="menu-stats">
            共 {{ menuList.length }} 个一级菜单项，已显示 {{ visibleMenuCount }} 个
          </div>
          <div class="menu-actions">
            <button class="btn-reset" @click="resetMenu">重置</button>
            <button class="btn-save-menu" @click="saveMenu">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11.6667 6.33333V11.6667C11.6667 12.0203 11.5262 12.3594 11.2762 12.6095C11.0261 12.8595 10.687 13 10.3333 13H3.66667C3.31304 13 2.97391 12.8595 2.72386 12.6095C2.47381 12.3594 2.33333 12.0203 2.33333 11.6667V2.33333C2.33333 1.97971 2.47381 1.64057 2.72386 1.39052C2.97391 1.14048 3.31304 1 3.66667 1H9L11.6667 3.66667V6.33333Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.66667 13V8.33333H4.33333V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              保存/发布
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const currentTab = ref('basic')
const logoInput = ref<HTMLInputElement | null>(null)
const draggedMenuIndex = ref<number | null>(null)

const tabs = [
  { key: 'basic', label: '基本信息' },
  { key: 'menu', label: '菜单结构' }
]

const config = ref({
  systemName: '党员教师课程思政示范范播资源管理系统',
  systemShortName: '"大思政课"数智化',
  logo: '',
  schoolName: '福州大学',
  department: '党委宣传部',
  phone: '0591-12345678',
  email: 'xuanchuan@university.edu.cn',
  introduction: '本系统是党员教师课程思政示范范播资源管理平台，旨在推动课程思政建设，展示优秀教学案例，促进教师交流学习。'
})

// 菜单列表
const menuList = ref([
  {
    id: '1',
    name: '首页',
    displayName: '首页',
    visible: true,
    sort: 1
  },
  {
    id: '2',
    name: '思政概览',
    displayName: '思政概览',
    visible: true,
    sort: 2
  },
  {
    id: '3',
    name: '习思想的伟大实践',
    displayName: '习思想的伟大实践',
    visible: true,
    sort: 3
  },
  {
    id: '4',
    name: '思政资源',
    displayName: '思政资源',
    visible: true,
    sort: 4
  },
  {
    id: '5',
    name: '特色专题',
    displayName: '特色专题',
    visible: true,
    sort: 5
  }
])

// 原始菜单备份
const originalMenuList = ref(JSON.parse(JSON.stringify(menuList.value)))

// 可见菜单数量
const visibleMenuCount = computed(() => {
  return menuList.value.filter(m => m.visible).length
})

// 加载已保存的配置
onMounted(() => {
  const saved = localStorage.getItem('system_config')
  if (saved) {
    try {
      const savedConfig = JSON.parse(saved)
      config.value = { ...config.value, ...savedConfig }
    } catch (e) {
      console.error('加载配置失败', e)
    }
  }
})

// 触发Logo上传
const triggerLogoUpload = () => {
  logoInput.value?.click()
}

// 处理Logo上传
const handleLogoChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    // 验证文件格式
    if (!file.type.includes('png') && !file.type.includes('svg')) {
      alert('仅支持PNG或SVG格式')
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      config.value.logo = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

// 取消操作
const handleCancel = () => {
  if (confirm('确定要取消吗？未保存的更改将丢失。')) {
    // 重新加载
    const saved = localStorage.getItem('system_config')
    if (saved) {
      try {
        const savedConfig = JSON.parse(saved)
        config.value = { ...config.value, ...savedConfig }
      } catch (e) {
        console.error('加载配置失败', e)
      }
    }
  }
}

// 保存配置
const handleSave = () => {
  // 验证必填项
  if (!config.value.systemName) {
    alert('请输入系统名称')
    return
  }
  if (!config.value.systemShortName) {
    alert('请输入系统简称')
    return
  }

  // TODO: 调用后端API保存
  localStorage.setItem('system_config', JSON.stringify(config.value))
  
  alert('保存成功！')
}

// === 菜单管理功能 ===

// 拖拽开始
const handleMenuDragStart = (index: number, event: DragEvent) => {
  draggedMenuIndex.value = index
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
  }
}

// 拖拽放下
const handleMenuDrop = (targetIndex: number, event: DragEvent) => {
  event.preventDefault()
  if (draggedMenuIndex.value === null || draggedMenuIndex.value === targetIndex) return

  const draggedItem = menuList.value[draggedMenuIndex.value]
  const targetItem = menuList.value[targetIndex]
  
  // 交换排序
  const tempSort = draggedItem.sort
  draggedItem.sort = targetItem.sort
  targetItem.sort = tempSort

  // 重新排序数组
  menuList.value.sort((a, b) => a.sort - b.sort)
  
  draggedMenuIndex.value = null
}

// 移动菜单
const moveMenu = (index: number, direction: number) => {
  const newIndex = index + direction
  if (newIndex >= 0 && newIndex < menuList.value.length) {
    const temp = menuList.value[index].sort
    menuList.value[index].sort = menuList.value[newIndex].sort
    menuList.value[newIndex].sort = temp
    
    // 重新排序
    menuList.value.sort((a, b) => a.sort - b.sort)
  }
}

// 重置菜单
const resetMenu = () => {
  if (confirm('确定要重置菜单配置吗？所有更改将恢复到初始状态。')) {
    menuList.value = JSON.parse(JSON.stringify(originalMenuList.value))
  }
}

// 保存菜单
const saveMenu = () => {
  // 验证显示名称长度
  const invalidMenu = menuList.value.find(m => m.displayName.length > 8)
  if (invalidMenu) {
    alert(`"${invalidMenu.name}"的显示名称超过8个字符限制`)
    return
  }

  // TODO: 调用后端API保存
  localStorage.setItem('menu_config', JSON.stringify(menuList.value))
  originalMenuList.value = JSON.parse(JSON.stringify(menuList.value))
  
  alert('菜单配置保存成功！')
}
</script>

<style scoped>
.admin-system {
  display: flex;
  gap: 0;
  height: calc(100vh - 194px);
  background: #f5f5f5;
}

/* 左侧标签页 */
.system-sidebar {
  width: 200px;
  background: white;
  flex-shrink: 0;
  padding: 16px 0;
}

.sidebar-tab {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;
}

.sidebar-tab:hover {
  background: #f5f5f5;
}

.sidebar-tab--active {
  background: #fff0f0;
  color: #e31e24;
  border-left: 3px solid #e31e24;
}

.sidebar-tab--active svg {
  color: #e31e24;
}

/* 右侧内容区 */
.system-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.content-section {
  background: white;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* 区域标题 */
.section-header {
  margin-bottom: 32px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.section-title h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.section-desc {
  margin: 0;
  font-size: 14px;
  color: #666;
}

/* 表单容器 */
.form-container {
  max-width: 1000px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-col {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label,
.form-col label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
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

/* Logo上传 */
.logo-upload {
  display: flex;
  align-items: center;
  gap: 24px;
}

.logo-preview {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
  flex-shrink: 0;
}

.logo-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.logo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-upload-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.btn-upload-logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
  align-self: flex-start;
}

.btn-upload-logo:hover {
  background: #096dd9;
}

.upload-hint {
  font-size: 12px;
  color: #999;
}

/* 操作按钮 */
.form-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
}

.btn-cancel,
.btn-save {
  padding: 10px 24px;
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

.btn-save {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #e31e24;
  color: white;
  border: none;
}

.btn-save:hover {
  background: #c71b20;
}

/* 菜单表格 */
.menu-table {
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 2fr 1.5fr 1.5fr 1fr;
  background: #fafafa;
  border-bottom: 1px solid #e8e8e8;
}

.th {
  padding: 14px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  text-align: left;
}

.table-body {
  background: white;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 2fr 1.5fr 1.5fr 1fr;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.3s;
  cursor: move;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background: #fafafa;
}

.td {
  padding: 14px 16px;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
}

.td-name {
  gap: 12px;
}

.drag-handle-small {
  cursor: grab;
  opacity: 0.5;
  transition: opacity 0.3s;
  flex-shrink: 0;
}

.drag-handle-small:hover {
  opacity: 1;
}

.td-display {
  gap: 8px;
}

.inline-input {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.inline-input:focus {
  outline: none;
  border-color: #e31e24;
}

.char-count {
  font-size: 12px;
  color: #999;
  white-space: nowrap;
}

.visible-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #52c41a;
  font-size: 14px;
}

.td-action {
  gap: 8px;
}

.btn-arrow {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  color: #666;
}

.btn-arrow:hover:not(:disabled) {
  border-color: #e31e24;
  color: #e31e24;
}

.btn-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* 菜单底部 */
.menu-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
}

.menu-stats {
  font-size: 14px;
  color: #666;
}

.menu-actions {
  display: flex;
  gap: 12px;
}

.btn-reset {
  padding: 10px 24px;
  background: white;
  color: #333;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-reset:hover {
  border-color: #e31e24;
  color: #e31e24;
}

.btn-save-menu {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: #e31e24;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-save-menu:hover {
  background: #c71b20;
}
</style>
