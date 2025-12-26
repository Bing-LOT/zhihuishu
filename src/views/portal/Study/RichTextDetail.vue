<template>
  <div class="rich-text-detail">
    <!-- 背景图 -->
    <div class="detail-bg" />

    <!-- 主内容区 -->
    <div class="detail-container">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <span class="breadcrumb-item">您的位置：</span>
        <span class="breadcrumb-item">特色专题</span>
        <span class="breadcrumb-item">&gt;&gt;</span>
        <span class="breadcrumb-item">红色文化资源</span>
        <span class="breadcrumb-item">&gt;&gt;</span>
        <span class="breadcrumb-item active">详情</span>
      </div>

      <!-- 内容区 -->
      <div class="content-wrapper">
        <!-- 标题和元信息 -->
        <div class="header-section">
          <h1 class="title">{{ detail?.title || '加载中...' }}</h1>
          <div class="meta-info">
            <span class="meta-item">发布时间：{{ formatDate(detail?.createTime) }}</span>
            <div class="divider" />
            <span class="meta-item">浏览人数：{{ detail?.statPv || 0 }}</span>
            <div class="divider" />
            <span class="meta-item">地址：{{ detail?.address }}</span>
          </div>
          <div class="header-divider" />
        </div>

        <!-- 富文本内容 -->
        <div
          class="rich-content"
          v-html="detail?.content"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { RedCultureItem } from '@/api/redCulture'

const route = useRoute()
const router = useRouter()

// 详情数据
const detail = ref<RedCultureItem | null>(null)

// 格式化日期
const formatDate = (dateStr?: string) => {
  if (!dateStr) return '--'
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 初始化页面
onMounted(() => {
  // 从路由参数中获取数据
  const data = route.query.data
  if (data) {
    try {
      detail.value = JSON.parse(decodeURIComponent(data as string))
    } catch (error) {
      console.error('解析数据失败:', error)
      router.back()
    }
  } else {
    console.error('未找到详情数据')
    router.back()
  }
})
</script>

<style scoped>
.rich-text-detail {
  width: 100%;
  min-height: 100vh;
  background: #fff9ed;
  position: relative;
  overflow-x: hidden;
  padding-top: 80px;
}

.detail-bg {
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  height: 1080px;
  background-image: url('/images/53efab5bf3ac8beaaa2b78e3fc1d00083edbcbe3.png');
  background-size: cover;
  background-position: center;
  opacity: 0.1;
  pointer-events: none;
  z-index: 0;
}

.detail-container {
  position: relative;
  max-width: 1440px;
  margin: 0 auto;
  padding: 64px 240px 96px;
  z-index: 1;
}

/* 面包屑导航 */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 28px;
  font-size: 16px;
  line-height: 28px;
  margin-bottom: 32px;
}

.breadcrumb-item {
  color: #333;
  opacity: 0.5;
  white-space: nowrap;
}

.breadcrumb-item.active {
  color: #bc2220;
  opacity: 1;
}

/* 内容包装 */
.content-wrapper {
  background: transparent;
  border-radius: 16px;
  padding: 24px 0;
}

/* 标题和元信息区域 */
.header-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 48px;
}

.title {
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin: 0;
  line-height: normal;
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 24px;
}

.meta-item {
  font-size: 16px;
  color: #333;
  white-space: nowrap;
  line-height: normal;
}

.divider {
  width: 1px;
  height: 16px;
  background: rgba(51, 51, 51, 0.2);
}

.header-divider {
  width: 100%;
  height: 1px;
  background: rgba(51, 51, 51, 0.1);
}

/* 富文本内容 */
.rich-content {
  font-size: 18px;
  color: #333;
  line-height: 1.75;
}

.rich-content :deep(p) {
  margin: 0 0 16px 0;
  text-indent: 36px;
}

.rich-content :deep(p:last-child) {
  margin-bottom: 0;
}

.rich-content :deep(h2) {
  font-size: 24px;
  font-weight: 500;
  color: #bc2220;
  margin: 32px 0 24px 0;
  line-height: normal;
}

.rich-content :deep(h3) {
  font-size: 20px;
  font-weight: 500;
  color: #bc2220;
  margin: 24px 0 16px 0;
  line-height: normal;
}

.rich-content :deep(img) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 24px auto;
  border-radius: 8px;
}

.rich-content :deep(ul),
.rich-content :deep(ol) {
  padding-left: 36px;
  margin: 16px 0;
}

.rich-content :deep(li) {
  margin: 8px 0;
}

.rich-content :deep(a) {
  color: #bc2220;
  text-decoration: underline;
}

.rich-content :deep(a:hover) {
  opacity: 0.8;
}

.rich-content :deep(blockquote) {
  border-left: 4px solid #bc2220;
  padding-left: 16px;
  margin: 24px 0;
  color: #666;
  font-style: italic;
}

.rich-content :deep(code) {
  background: rgba(188, 34, 32, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
}

.rich-content :deep(pre) {
  background: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 24px 0;
}

.rich-content :deep(pre code) {
  background: none;
  padding: 0;
}

.rich-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 24px 0;
}

.rich-content :deep(table th),
.rich-content :deep(table td) {
  border: 1px solid rgba(51, 51, 51, 0.1);
  padding: 12px;
  text-align: left;
}

.rich-content :deep(table th) {
  background: rgba(188, 34, 32, 0.05);
  font-weight: 500;
}
</style>

