<template>
  <div class="topic-detail-page">
    <div class="detail-container">
      <!-- Back Button -->
      <button class="back-btn" @click="goBack">
        ← 返回列表
      </button>

      <!-- Loading -->
      <div v-if="isLoading" class="loading">
        <div class="loading-spinner" />
        <p>加载中...</p>
      </div>

      <!-- Content -->
      <div v-else-if="detail" class="detail-content">
        <h1 class="detail-title">{{ detail.title }}</h1>
        <img 
          v-if="detail.coverUrl"
          :src="detail.coverUrl" 
          :alt="detail.title"
          class="cover-image"
        >
        <div class="detail-body" v-html="detail.content" />
      </div>

      <!-- Error -->
      <div v-else class="error-state">
        <p>内容加载失败</p>
        <button class="retry-btn" @click="loadDetail">
          重新加载
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getSpecialTopicList } from '@/api/hotspot'
import type { SpecialTopicItem } from '@/types/hotspot'

const route = useRoute()
const router = useRouter()

const detail = ref<SpecialTopicItem | null>(null)
const isLoading = ref(false)

const loadDetail = async () => {
  const id = route.params.id as string
  if (!id) return

  try {
    isLoading.value = true
    // Load all topics and find the matching one
    const topics = await getSpecialTopicList()
    detail.value = topics.find(t => t.id === parseInt(id)) || null
  } catch (error) {
    console.error('加载详情失败:', error)
    detail.value = null
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  loadDetail()
})
</script>

<style scoped>
.topic-detail-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 40px 20px;
}

.detail-container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.back-btn {
  background: none;
  border: 1px solid #d9d9d9;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 24px;
}

.back-btn:hover {
  border-color: #c30d23;
  color: #c30d23;
}

.detail-title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin: 0 0 24px;
  line-height: 1.4;
}

.cover-image {
  width: 100%;
  max-width: 800px;
  height: auto;
  border-radius: 8px;
  margin: 0 auto 32px;
  display: block;
}

.detail-body {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
}

.detail-body :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 16px 0;
}

.detail-body :deep(p) {
  margin: 16px 0;
}

.detail-body :deep(h1),
.detail-body :deep(h2),
.detail-body :deep(h3) {
  margin: 24px 0 16px;
}

.loading {
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
  border-top: 3px solid #c30d23;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #999;
}

.retry-btn {
  margin-top: 16px;
  padding: 8px 24px;
  background: #c30d23;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.retry-btn:hover {
  background: #a00a1c;
}
</style>

