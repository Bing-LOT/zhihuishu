<template>
  <div class="resource-detail-page">
    <div class="page-bg">
      <img src="/images/indexBg.png" alt="" />
    </div>

    <div class="page-container">
      <!-- 面包屑 -->
      <div class="breadcrumb" v-if="detail">
        <span class="label">您的位置：</span>
        <router-link to="/" class="link">首页</router-link>
        <span class="separator">>></span>
        <router-link to="/resources" class="link">思政资源</router-link>
        <span class="separator">>></span>
        <span class="link">{{ getCategoryName(detail.category) }}</span>
        <span class="separator">>></span>
        <span class="current">文件详情</span>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="detail-card">
        <div class="loading-state">
          <p>加载中...</p>
        </div>
      </div>

      <!-- 详情内容 -->
      <div v-else-if="detail" class="detail-card">
        <div class="detail-header">
          <h1 class="detail-title">{{ detail.title }}</h1>
          <div class="detail-meta">
            <span class="meta-item">发布时间：{{ formatDate(detail.createTime) }}</span>
            <span class="separator">|</span>
            <span class="meta-item">浏览人数：{{ detail.statPv || 0 }}</span>
          </div>
        </div>

        <!-- 富文本内容 -->
        <div class="detail-body" v-if="detail.contentType === 0" v-html="detail.content"></div>
      </div>

      <!-- 空状态 -->
      <div v-else class="detail-card">
        <div class="empty-state">
          <p>暂无数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPoliticalResourceDetail } from '@/api/resource'
import type { PoliticalResourceItem } from '@/types'

/**
 * 资源详情页
 */
const route = useRoute()
const router = useRouter()

const loading = ref(false)
const detail = ref<PoliticalResourceItem | null>(null)

// 获取分类名称
const getCategoryName = (category: number) => {
  return category === 0 ? '政策文件库' : '思政素材库'
}

// 格式化日期
const formatDate = (dateStr: string | undefined) => {
  if (!dateStr) return ''
  return dateStr.split(' ')[0] // 只取日期部分
}

// 获取详情数据
const fetchDetail = async () => {
  const id = route.params.id
  if (!id) {
    console.error('缺少资源ID')
    return
  }

  try {
    loading.value = true
    const data = await getPoliticalResourceDetail(id as string)
    detail.value = data

    // 如果是外部链接类型，直接跳转
    if (data.contentType === 1 && data.content) {
      window.location.href = data.content
    }
  } catch (error) {
    console.error('获取资源详情失败:', error)
  } finally {
    loading.value = false
  }
}

// 初始化加载
onMounted(() => {
  fetchDetail()
})
</script>

<style scoped>
.resource-detail-page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-bottom: 80px;
}

.page-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.page-bg img {
  width: 100%;
  object-fit: cover;
  opacity: 0.1;
}

.page-container {
  position: relative;
  max-width: 1440px; /* 根据设计稿，内容区宽度较宽 */
  margin: 0 auto;
  padding: 40px 0;
  z-index: 1;
}

/* 面包屑 */
.breadcrumb {
  display: flex;
  justify-content: flex-start;
  font-size: 16px;
  margin-bottom: 32px;
  color: #333;
}

.breadcrumb .label,
.breadcrumb .link,
.breadcrumb .separator {
  color: #333;
  opacity: 0.5;
  text-decoration: none;
}

.breadcrumb .current {
  color: #bc2220;
}

.breadcrumb .separator {
  margin: 0 8px;
}

/* 详情卡片 */
.detail-card {
  border-radius: 16px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.detail-header {
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail-title {
  font-size: 24px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: 500;
  color: #333;
  margin: 0 0 16px;
  text-align: center;
}

.detail-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  color: #333;
  font-size: 16px;
}

.detail-meta .separator {
  width: 1px;
  height: 16px;
  background: #ccc;
}

/* 正文 */
.detail-body {
  width: 100%;
  max-width: 1200px;
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  padding: 24px 0;
}

/* 富文本内容样式 */
.detail-body :deep(p) {
  margin-bottom: 16px;
  text-indent: 2em;
}

.detail-body :deep(img) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 20px auto;
}

.detail-body :deep(h1),
.detail-body :deep(h2),
.detail-body :deep(h3),
.detail-body :deep(h4),
.detail-body :deep(h5),
.detail-body :deep(h6) {
  margin: 20px 0 16px;
  font-weight: 600;
  text-indent: 0;
}

.detail-body :deep(ul),
.detail-body :deep(ol) {
  margin: 16px 0;
  padding-left: 2em;
}

.detail-body :deep(li) {
  margin-bottom: 8px;
}

.detail-body :deep(a) {
  color: #bc2220;
  text-decoration: underline;
}

/* 加载和空状态 */
.loading-state,
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #999;
  font-size: 16px;
}
</style>

