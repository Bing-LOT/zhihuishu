<template>
  <div class="footprint-detail-page">
    <!-- 背景图 -->
    <div class="detail-bg">
      <img src="/images/indexBg.png" alt="" />
    </div>

    <div class="detail-container">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <span class="breadcrumb-item">您的位置： </span>
        <span class="breadcrumb-item clickable" @click="$router.push('/topics')">习思想的伟大实践</span>
        <span class="breadcrumb-item"> >> </span>
        <span class="breadcrumb-item clickable" @click="$router.push('/topics')">总书记的福建脚步</span>
        <span class="breadcrumb-item"> >> </span>
        <span class="breadcrumb-item clickable" @click="$router.push('/topics/footprints')">更多内容</span>
        <span class="breadcrumb-item"> >> </span>
        <span class="breadcrumb-item active">内容详情</span>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="loading-state">
        <p>加载中...</p>
      </div>

      <!-- 主内容区 -->
      <div v-else-if="footprintDetail" class="main-content">
        <!-- 标题和元信息 -->
        <div class="content-header">
          <h1 class="content-title">{{ footprintDetail.title }}</h1>
          <div class="content-meta">
            <span class="meta-item">发布时间：{{ formatDate(footprintDetail.createTime) }}</span>
            <div class="meta-divider"></div>
            <span class="meta-item">浏览人数：{{ footprintDetail.statPv || 0 }}</span>
          </div>
        </div>

        <!-- 视频播放器（如果有视频内容） -->
        <div v-if="hasVideo" class="video-container">
          <video
            ref="videoPlayer"
            class="video-player"
            :src="videoUrl"
            controls
            controlsList="nodownload"
            @loadedmetadata="onVideoLoaded"
          >
            您的浏览器不支持视频播放。
          </video>
        </div>

        <!-- 富文本内容 -->
        <div class="content-body" v-html="footprintDetail.content"></div>
      </div>

      <!-- 错误状态 -->
      <div v-else class="error-state">
        <p>内容加载失败</p>
        <button class="back-btn" @click="$router.back()">返回</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getFootprintDetail } from '@/api/redCulture'
import type { FootprintItem } from '@/api/redCulture'

const route = useRoute()
const footprintDetail = ref<FootprintItem | null>(null)
const loading = ref(false)
const videoPlayer = ref<HTMLVideoElement | null>(null)

// 格式化日期
const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 检查是否有视频
const hasVideo = computed(() => {
  if (!footprintDetail.value?.content) return false
  // 检查内容中是否包含视频标签或视频URL
  const content = footprintDetail.value.content
  return content.includes('<video') || content.includes('.mp4') || content.includes('.webm')
})

// 提取视频URL（如果需要的话）
const videoUrl = computed(() => {
  if (!footprintDetail.value?.content) return ''
  const content = footprintDetail.value.content
  // 尝试从内容中提取视频URL
  const videoMatch = content.match(/src=["']([^"']*\.(mp4|webm|ogg))["']/i)
  return videoMatch ? videoMatch[1] : ''
})

// 视频加载完成
const onVideoLoaded = () => {
  console.log('视频加载完成')
}

// 获取足迹详情
const fetchFootprintDetail = async () => {
  const id = route.params.id
  if (!id) return

  loading.value = true
  try {
    const response = await getFootprintDetail(id)
    if (response) {
      footprintDetail.value = response
    }
  } catch (error) {
    console.error('获取足迹详情失败：', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchFootprintDetail()
})
</script>

<style scoped>
.footprint-detail-page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #fff9ed;
}

/* 背景图 */
.detail-bg {
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  height: calc(100vh - 80px);
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.detail-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.1;
}

.detail-container {
  position: relative;
  max-width: 1440px;
  margin: 0 auto;
  padding: 64px 240px 80px;
  z-index: 1;
}

/* 面包屑 */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0;
  font-size: 16px;
  color: #333;
  opacity: 0.5;
  margin-bottom: 32px;
  line-height: 1.75;
  flex-wrap: wrap;
}

.breadcrumb-item {
  white-space: nowrap;
}

.breadcrumb-item.clickable {
  cursor: pointer;
  transition: opacity 0.3s;
}

.breadcrumb-item.clickable:hover {
  opacity: 1;
}

.breadcrumb-item.active {
  color: #bc2220;
  opacity: 1;
}

/* 加载和错误状态 */
.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 0;
  gap: 24px;
}

.loading-state p,
.error-state p {
  font-size: 18px;
  color: #666;
  opacity: 0.7;
}

.back-btn {
  padding: 12px 32px;
  font-size: 16px;
  color: #fff;
  background: #bc2220;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.back-btn:hover {
  opacity: 0.9;
}

/* 主内容区 */
.main-content {
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 24px 24px 48px;
  border-radius: 16px;
}

/* 内容头部 */
.content-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  text-align: center;
}

.content-title {
  font-size: 24px;
  font-weight: 500;
  color: #333;
  line-height: normal;
  margin: 0;
}

.content-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  font-size: 16px;
  color: #333;
}

.meta-item {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.meta-divider {
  width: 1px;
  height: 16px;
  background: rgba(51, 51, 51, 0.3);
}

/* 视频容器 */
.video-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
}

.video-player {
  width: 100%;
  height: auto;
  min-height: 489px;
  display: block;
}

/* 富文本内容 */
.content-body {
  font-size: 18px;
  line-height: 1.75;
  color: #333;
}

.content-body :deep(p) {
  margin: 0 0 16px 0;
  text-indent: 36px;
}

.content-body :deep(p:first-of-type) {
  text-indent: 36px;
}

.content-body :deep(h1),
.content-body :deep(h2),
.content-body :deep(h3),
.content-body :deep(h4),
.content-body :deep(h5),
.content-body :deep(h6) {
  margin: 32px 0 16px 0;
  font-weight: 600;
  line-height: 1.4;
  text-indent: 0;
}

.content-body :deep(h1) {
  font-size: 28px;
}

.content-body :deep(h2) {
  font-size: 24px;
}

.content-body :deep(h3) {
  font-size: 20px;
}

.content-body :deep(ul),
.content-body :deep(ol) {
  margin: 16px 0;
  padding-left: 24px;
}

.content-body :deep(li) {
  margin: 8px 0;
  text-indent: 0;
}

.content-body :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 24px 0;
  border-radius: 8px;
  display: block;
}

.content-body :deep(video) {
  display: none;
}

/* 图片容器支持 */
.content-body :deep(.image-row) {
  display: flex;
  gap: 24px;
  margin: 24px 0;
}

.content-body :deep(.image-row img) {
  flex: 1;
  margin: 0;
}

.content-body :deep(blockquote) {
  margin: 24px 0;
  padding: 16px 24px;
  background: #f5f5f5;
  border-left: 4px solid #bc2220;
  color: #666;
  text-indent: 0;
}

.content-body :deep(code) {
  padding: 2px 6px;
  background: #f5f5f5;
  border-radius: 2px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
}

.content-body :deep(pre) {
  margin: 16px 0;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 4px;
  overflow-x: auto;
  text-indent: 0;
}

.content-body :deep(pre code) {
  padding: 0;
  background: transparent;
}

.content-body :deep(table) {
  width: 100%;
  margin: 24px 0;
  border-collapse: collapse;
  text-indent: 0;
}

.content-body :deep(table th),
.content-body :deep(table td) {
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  text-align: left;
}

.content-body :deep(table th) {
  background: #f5f5f5;
  font-weight: 600;
}

.content-body :deep(a) {
  color: #bc2220;
  text-decoration: none;
  transition: opacity 0.3s;
}

.content-body :deep(a:hover) {
  opacity: 0.8;
  text-decoration: underline;
}

/* 响应式调整 */
@media (max-width: 1680px) {
  .detail-container {
    padding: 64px 160px 80px;
  }
}

@media (max-width: 1440px) {
  .detail-container {
    padding: 64px 120px 80px;
  }
}

@media (max-width: 1200px) {
  .detail-container {
    padding: 48px 60px 80px;
  }
  
  .content-body {
    font-size: 16px;
  }
}
</style>

