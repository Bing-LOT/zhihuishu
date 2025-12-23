<template>
  <div class="admin-resources">
    <!-- 页面标题 -->
    <div class="admin-resources__header">
      <h2 class="admin-resources__title">首页Banner配置</h2>
      <p class="admin-resources__desc">管理首页轮播图，支持上传多张</p>
    </div>

    <!-- 添加Banner按钮 -->
    <div class="admin-resources__actions">
      <button class="btn-add-banner" @click="showAddDialog = true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3.5V12.5M3.5 8H12.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
        添加Banner图
      </button>
    </div>

    <!-- Banner列表 -->
    <div class="banner-list">
      <div
        v-for="(banner, index) in banners"
        :key="banner.id"
        class="banner-item"
      >
        <div class="banner-item__image">
          <img :src="banner.image" :alt="banner.title" />
          <div class="banner-item__overlay">
            <button class="banner-item__btn" @click="editBanner(banner)">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.3879 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08575 14.552 3.33337C14.552 3.58099 14.5032 3.82619 14.4084 4.05497C14.3137 4.28374 14.1748 4.49161 13.9997 4.66671L5.33301 13.3334L1.99967 14.3334L2.99967 11L11.6663 2.33337L11.333 2.00004Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="banner-item__btn" @click="deleteBanner(banner.id)">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4H3.33333H14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.33301 4.00004V2.66671C5.33301 2.31309 5.47348 1.97395 5.72353 1.7239C5.97358 1.47385 6.31272 1.33337 6.66634 1.33337H9.33301C9.68663 1.33337 10.0258 1.47385 10.2758 1.7239C10.5259 1.97395 10.6663 2.31309 10.6663 2.66671V4.00004M12.6663 4.00004V13.3334C12.6663 13.687 12.5259 14.0261 12.2758 14.2762C12.0258 14.5262 11.6866 14.6667 11.333 14.6667H4.66634C4.31272 14.6667 3.97358 14.5262 3.72353 14.2762C3.47348 14.0261 3.33301 13.687 3.33301 13.3334V4.00004H12.6663Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <!-- <button
              class="banner-item__btn"
              :disabled="index === 0"
              @click="moveBanner(index, -1)"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 10L8 6L4 10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button
              class="banner-item__btn"
              :disabled="index === banners.length - 1"
              @click="moveBanner(index, 1)"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button> -->
          </div>
        </div>
        <div class="banner-item__info">
          <div class="banner-item__sort">排序：第 {{ index + 1 }} 位</div>
          <div class="banner-item__title">{{ banner.title || '未设置标题' }}</div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="banners.length === 0" class="banner-list__empty">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path d="M32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56Z" stroke="#d9d9d9" stroke-width="2"/>
          <path d="M32 20V36M32 44H32.02" stroke="#d9d9d9" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <p>暂无Banner图，请点击上方按钮添加</p>
      </div>
    </div>

    <!-- 添加/编辑 Banner 对话框 -->
    <div v-if="showAddDialog || showEditDialog" class="dialog-overlay" @click.self="closeDialog">
      <div class="dialog">
        <div class="dialog__header">
          <h3>{{ showEditDialog ? '编辑Banner' : '添加Banner' }}</h3>
          <button class="dialog__close" @click="closeDialog">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="#666" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <div class="dialog__body">
          <div class="form-group">
            <label>Banner标题</label>
            <input
              v-model="formData.title"
              type="text"
              placeholder="请输入Banner标题"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label>Banner图片</label>
            <div class="upload-area">
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                style="display: none"
                @change="handleFileChange"
              />
              <div v-if="formData.image" class="upload-preview">
                <img :src="formData.image" alt="预览" />
                <button class="upload-remove" @click="removeImage">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
              <div v-else class="upload-trigger" @click="triggerUpload">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M24 10V38M10 24H38" stroke="#999" stroke-width="3" stroke-linecap="round"/>
                </svg>
                <p>点击上传图片</p>
                <span>建议尺寸：1920x600px</span>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>跳转链接（可选）</label>
            <input
              v-model="formData.link"
              type="text"
              placeholder="请输入跳转链接"
              class="form-input"
            />
          </div>
        </div>
        <div class="dialog__footer">
          <button class="btn-cancel" @click="closeDialog">取消</button>
          <button class="btn-confirm" @click="saveBanner">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getBannerList, addBanner, deleteBanner as deleteBannerApi, uploadFile } from '@/api/banner'

interface Banner {
  id: string
  title: string
  image: string
  link?: string
  sort: number
}

// Banner列表
const banners = ref<Banner[]>([])

// 加载状态
const loading = ref(false)

// 选中的文件
const selectedFile = ref<File | null>(null)

// 对话框状态
const showAddDialog = ref(false)
const showEditDialog = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

// 表单数据
const formData = ref({
  id: '',
  title: '',
  image: '',
  link: ''
})

// 当前编辑的Banner
const currentBanner = ref<Banner | null>(null)

// 加载Banner列表
const loadBannerList = async () => {
  try {
    loading.value = true
    const result = await getBannerList()
    // 转换API返回的数据格式到前端格式
    banners.value = (result as any[]).map((item: any, index: number) => ({
      id: String(item.id),
      title: `Banner ${index + 1}`,
      image: item.picUrl,
      link: '',
      sort: item.sort || index + 1
    }))
    console.log('Banner列表加载成功:', banners.value)
  } catch (error: any) {
    console.error('加载Banner列表失败:', error)
    if (error.response?.data?.msg) {
      alert(`加载失败: ${error.response.data.msg}`)
    }
  } finally {
    loading.value = false
  }
}

// 页面加载时获取列表
onMounted(() => {
  loadBannerList()
})

// 触发文件上传
const triggerUpload = () => {
  fileInput.value?.click()
}

// 处理文件选择
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      alert('请上传图片文件')
      return
    }
    
    // 验证文件大小（最大5MB）
    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过5MB')
      return
    }
    
    // 保存文件对象
    selectedFile.value = file
    
    // 本地预览
    const reader = new FileReader()
    reader.onload = (e) => {
      formData.value.image = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

// 移除图片
const removeImage = () => {
  formData.value.image = ''
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// 编辑Banner
const editBanner = (banner: Banner) => {
  currentBanner.value = banner
  formData.value = {
    id: banner.id,
    title: banner.title,
    image: banner.image,
    link: banner.link || ''
  }
  showEditDialog.value = true
}

// 删除Banner
const deleteBanner = async (id: string) => {
  if (!confirm('确定要删除这个Banner吗？')) {
    return
  }
  
  try {
    loading.value = true
    await deleteBannerApi(Number(id))
    console.log('Banner删除成功')
    alert('删除成功')
    // 重新加载列表
    await loadBannerList()
  } catch (error: any) {
    console.error('删除Banner失败:', error)
    const errorMsg = error.response?.data?.msg || error.message || '删除失败'
    alert(`删除失败: ${errorMsg}`)
  } finally {
    loading.value = false
  }
}

// 移动Banner
const moveBanner = (index: number, direction: number) => {
  const newIndex = index + direction
  if (newIndex >= 0 && newIndex < banners.value.length) {
    const temp = banners.value[index]
    banners.value[index] = banners.value[newIndex]
    banners.value[newIndex] = temp
    // 更新排序
    banners.value.forEach((banner, idx) => {
      banner.sort = idx + 1
    })
  }
}

// 保存Banner
const saveBanner = async () => {
  if (!formData.value.image) {
    alert('请上传Banner图片')
    return
  }

  if (!selectedFile.value && !showEditDialog.value) {
    alert('请选择图片文件')
    return
  }

  try {
    loading.value = true
    let picUrl = formData.value.image

    // 如果是新上传的文件，先上传图片
    if (selectedFile.value) {
      try {
        console.log('====== 开始上传文件 ======')
        console.log('selectedFile.value:', selectedFile.value)
        console.log('文件名:', selectedFile.value.name)
        console.log('文件类型:', selectedFile.value.type)
        console.log('文件大小:', selectedFile.value.size, 'bytes')
        console.log('========================')
        
        const uploadRes = await uploadFile(selectedFile.value)
        picUrl = uploadRes.url
        console.log('✅ 图片上传成功，返回URL:', picUrl)
      } catch (uploadError: any) {
        console.error('❌ 上传图片失败')
        console.error('错误对象:', uploadError)
        console.error('错误响应:', uploadError.response?.data)
        console.error('错误状态:', uploadError.response?.status)
        const errorMsg = uploadError.response?.data?.msg || uploadError.response?.data?.error || uploadError.message || '上传失败'
        alert(`上传图片失败: ${errorMsg}`)
        loading.value = false
        return
      }
    }

    if (showEditDialog.value && currentBanner.value) {
      // 编辑（本地更新）
      const index = banners.value.findIndex(b => b.id === formData.value.id)
      if (index > -1) {
        banners.value[index] = {
          ...banners.value[index],
          title: formData.value.title,
          image: picUrl,
          link: formData.value.link
        }
      }
      console.log('Banner编辑成功')
      alert('更新成功')
    } else {
      // 新增 - 调用API
      const sort = banners.value.length + 1
      console.log('调用 /banner/add API，参数:', { picUrl, sort })
      
      const result = await addBanner(picUrl, sort)
      console.log('Banner添加成功，返回ID:', result.id)
      alert('添加成功')
      
      // 重新加载列表
      await loadBannerList()
    }

    closeDialog()
  } catch (error: any) {
    console.error('保存Banner失败:', error)
    const errorMsg = error.response?.data?.msg || error.message || '保存失败'
    alert(`操作失败: ${errorMsg}`)
  } finally {
    loading.value = false
  }
}

// 关闭对话框
const closeDialog = () => {
  showAddDialog.value = false
  showEditDialog.value = false
  formData.value = {
    id: '',
    title: '',
    image: '',
    link: ''
  }
  currentBanner.value = null
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>

<style scoped>
.admin-resources {
  max-width: 1200px;
}

.admin-resources__header {
  margin-bottom: 24px;
}

.admin-resources__title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.admin-resources__desc {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.admin-resources__actions {
  margin-bottom: 24px;
}

.btn-add-banner {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #e31e24;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-add-banner:hover {
  background: #c71b20;
}

/* Banner列表 */
.banner-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
  gap: 24px;
}

.banner-item {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.banner-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.banner-item__image {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
  background: #f5f5f5;
}

.banner-item__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-item__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  opacity: 0;
  transition: opacity 0.3s;
}

.banner-item:hover .banner-item__overlay {
  opacity: 1;
}

.banner-item__btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.banner-item__btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
}

.banner-item__btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.banner-item__info {
  padding: 16px;
}

.banner-item__sort {
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
}

.banner-item__title {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.banner-list__empty {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #999;
}

.banner-list__empty p {
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
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.dialog__header {
  padding: 20px 24px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  max-height: 60vh;
  overflow-y: auto;
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

.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #e31e24;
}

.upload-area {
  border: 2px dashed #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
}

.upload-trigger {
  padding: 40px;
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
  height: 300px;
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
