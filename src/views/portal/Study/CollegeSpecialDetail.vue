<template>
  <div class="college-detail-page">
    <!-- 背景 -->
    <div class="college-detail-bg"></div>

    <!-- 主要内容 -->
    <div class="college-detail-container">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <span class="breadcrumb-item">您的位置： </span>
        <span class="breadcrumb-item" @click="$router.push('/study')">特色专题</span>
        <span class="breadcrumb-separator">>> </span>
        <span class="breadcrumb-item" @click="$router.push('/study')">优秀思政课堂</span>
        <span class="breadcrumb-separator">>> </span>
        <span class="breadcrumb-item active">教师详情</span>
      </div>

      <!-- 详情内容卡片 -->
      <div class="detail-card" v-if="!loading && detail">
        <!-- 头部信息 -->
        <div class="detail-header">
          <h1 class="detail-title">{{ detail.name }}</h1>
          <div class="detail-meta">
            <span class="meta-item">发布时间：{{ formatDate(detail.createTime) }}</span>
            <span class="meta-separator"></span>
            <span class="meta-item">浏览人数：{{ detail.statPv || 0 }}</span>
            <span class="meta-separator"></span>
            <span class="meta-item">学院：{{ detail.college }}</span>
          </div>
          <div class="detail-divider"></div>
        </div>

        <!-- 富文本内容 -->
        <div class="detail-content" v-html="detail.content"></div>
      </div>

      <!-- 加载状态 -->
      <div class="loading-state" v-else-if="loading">
        <div class="loading-spinner"></div>
        <p>加载中...</p>
      </div>

      <!-- 空状态 -->
      <div class="empty-state" v-else>
        <p>暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getCollegeSpecialDetail, type CollegeSpecialDetail } from '@/api/course'

const route = useRoute()
const loading = ref(false)
const detail = ref<CollegeSpecialDetail | null>(null)

// 格式化日期
const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 获取详情数据
const fetchDetail = async () => {
  const id = route.params.id as string
  if (!id) return

  try {
    loading.value = true
    const data = await getCollegeSpecialDetail(id)
    detail.value = data
  } catch (error) {
    console.error('获取一院一品专题详情失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDetail()
})
</script>

<style scoped>
.college-detail-page {
  width: 100%;
  min-height: 100vh;
  background: #fff9ed;
  position: relative;
  overflow-x: hidden;
}

.college-detail-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1080px;
  background-image: url('/images/indexBg.png');
  background-size: cover;
  background-position: center;
  opacity: 0.1;
  pointer-events: none;
  z-index: 0;
}

.college-detail-container {
  position: relative;
  max-width: 1440px;
  margin: 0 auto;
  padding: 64px 0;
  z-index: 1;
}

/* 面包屑导航 */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  font-family: 'Source Han Sans CN', sans-serif;
  line-height: 1.75;
  margin-bottom: 32px;
  padding: 0 240px;
}

.breadcrumb-item {
  color: #333;
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.breadcrumb-item:hover {
  opacity: 0.7;
}

.breadcrumb-item:first-child {
  cursor: default;
}

.breadcrumb-item:first-child:hover {
  opacity: 0.5;
}

.breadcrumb-item.active {
  color: #bc2220;
  opacity: 1;
  cursor: default;
}

.breadcrumb-item.active:hover {
  opacity: 1;
}

.breadcrumb-separator {
  color: #333;
  opacity: 0.5;
}

/* 详情卡片 */
.detail-card {
  /* background: white; */
  border-radius: 16px;
  padding: 24px 48px 48px;
  margin: 0 240px;
}

/* 头部信息 */
.detail-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 48px;
}

.detail-title {
  margin: 0;
  font-size: 24px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: 500;
  color: #333;
  line-height: normal;
  text-align: center;
}

.detail-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  font-size: 16px;
  font-family: 'Source Han Sans CN', sans-serif;
  color: #333;
  line-height: normal;
}

.meta-item {
  flex-shrink: 0;
}

.meta-separator {
  width: 1px;
  height: 16px;
  background: #333;
  opacity: 0.3;
}

.detail-divider {
  width: 100%;
  height: 1px;
  background: #333;
  opacity: 0.1;
}

/* 富文本内容 */
.detail-content {
  font-size: 18px;
  font-family: 'Source Han Sans CN', sans-serif;
  line-height: 1.75;
  color: #333;
}

.detail-content :deep(p) {
  margin: 0 0 16px 0;
}

.detail-content :deep(p:last-child) {
  margin-bottom: 0;
}

.detail-content :deep(h1),
.detail-content :deep(h2),
.detail-content :deep(h3),
.detail-content :deep(h4),
.detail-content :deep(h5),
.detail-content :deep(h6) {
  color: #bc2220;
  margin: 24px 0 16px 0;
  font-weight: 500;
}

.detail-content :deep(h1) {
  font-size: 24px;
}

.detail-content :deep(h2) {
  font-size: 22px;
}

.detail-content :deep(h3) {
  font-size: 20px;
}

.detail-content :deep(img) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 16px 0;
  border-radius: 8px;
}

.detail-content :deep(ul),
.detail-content :deep(ol) {
  margin: 16px 0;
  padding-left: 24px;
}

.detail-content :deep(li) {
  margin-bottom: 8px;
}

.detail-content :deep(blockquote) {
  margin: 16px 0;
  padding: 12px 16px;
  background: #f5f5f5;
  border-left: 4px solid #bc2220;
  color: #666;
}

.detail-content :deep(code) {
  background: #f5f5f5;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: monospace;
}

.detail-content :deep(pre) {
  background: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 16px 0;
}

.detail-content :deep(pre code) {
  background: transparent;
  padding: 0;
}

.detail-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
}

.detail-content :deep(table th),
.detail-content :deep(table td) {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.detail-content :deep(table th) {
  background: #f5f5f5;
  font-weight: 500;
}

.detail-content :deep(a) {
  color: #bc2220;
  text-decoration: none;
}

.detail-content :deep(a:hover) {
  text-decoration: underline;
}

/* 加载状态 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #333;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(188, 34, 32, 0.3);
  border-top-color: #bc2220;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-state p {
  margin: 0;
  font-size: 16px;
  color: #333;
  opacity: 0.8;
}

/* 空状态 */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #333;
}

.empty-state p {
  margin: 0;
  font-size: 16px;
  color: #333;
  opacity: 0.8;
}
</style>

