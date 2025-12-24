<template>
  <div class="footprint-detail-page">
    <!-- 背景图 -->
    <div class="detail-bg">
      <img src="/images/indexBg.png" alt="" />
    </div>

    <div class="detail-container">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <span class="breadcrumb-item">您的位置：</span>
        <span class="breadcrumb-item clickable" @click="$router.push('/topics')">习思想的伟大实践</span>
        <span class="breadcrumb-item">&gt;&gt;</span>
        <span class="breadcrumb-item clickable" @click="$router.push('/topics')">总书记的福建脚步</span>
        <span class="breadcrumb-item">&gt;&gt;</span>
        <span class="breadcrumb-item clickable" @click="$router.push('/topics/footprints')">更多内容</span>
        <span class="breadcrumb-item">&gt;&gt;</span>
        <span class="breadcrumb-item active">详情</span>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="loading-state">
        <p>加载中...</p>
      </div>

      <!-- 主内容区 -->
      <div v-else-if="footprintDetail" class="main-content">
        <!-- 标题 -->
        <div class="content-header">
          <h1 class="content-title">{{ footprintDetail.title }}</h1>
          <div class="content-meta">
            <span class="meta-item">
              发布时间：{{ formatDate(footprintDetail.createTime) }}
            </span>
            <span class="meta-item">
              浏览量：<span class="count-number">{{ formatViewCount(footprintDetail.statPv) }}</span>
            </span>
          </div>
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
import { getFootprintPageList } from '@/api/redCulture'
import type { FootprintItem } from '@/api/redCulture'

const route = useRoute()
const footprintDetail = ref<FootprintItem | null>(null)
const loading = ref(false)

// 格式化日期
const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 格式化浏览量
const formatViewCount = (count: number) => {
  if (!count) return '0'
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}万`
  }
  return count.toString()
}

// 获取足迹详情
const fetchFootprintDetail = async () => {
  const id = route.params.id
  if (!id) return

  loading.value = true
  try {
    // 由于没有单独的详情接口，我们通过列表接口获取所有数据，然后筛选
    // 这里简化处理，实际应该有专门的详情接口
    const response = await getFootprintPageList({
      pageIndex: 1,
      pageSize: 1000  // 获取足够多的数据
    })
    
    if (response && response.records) {
      const item = response.records.find(item => item.id === Number(id))
      if (item) {
        footprintDetail.value = item
      }
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 40px 80px;
  z-index: 1;
}

/* 面包屑 */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  color: #333;
  opacity: 0.5;
  margin-bottom: 48px;
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
  opacity: 0.8;
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
  background: #fff;
  border-radius: 8px;
  padding: 48px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 内容头部 */
.content-header {
  margin-bottom: 48px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.content-title {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  line-height: 1.5;
  margin: 0 0 24px 0;
}

.content-meta {
  display: flex;
  align-items: center;
  gap: 32px;
  font-size: 16px;
  color: #666;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.count-number {
  color: #bc2220;
  font-weight: 500;
}

/* 富文本内容 */
.content-body {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
}

.content-body :deep(p) {
  margin: 0 0 16px 0;
}

.content-body :deep(h1),
.content-body :deep(h2),
.content-body :deep(h3),
.content-body :deep(h4),
.content-body :deep(h5),
.content-body :deep(h6) {
  margin: 24px 0 16px 0;
  font-weight: 600;
  line-height: 1.4;
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
}

.content-body :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 24px 0;
  border-radius: 4px;
}

.content-body :deep(blockquote) {
  margin: 24px 0;
  padding: 16px 24px;
  background: #f5f5f5;
  border-left: 4px solid #bc2220;
  color: #666;
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
}

.content-body :deep(pre code) {
  padding: 0;
  background: transparent;
}

.content-body :deep(table) {
  width: 100%;
  margin: 24px 0;
  border-collapse: collapse;
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
</style>

