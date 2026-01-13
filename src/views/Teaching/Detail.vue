<template>
  <div class="teaching-detail-page">
    <div class="detail-container">
      <h1 class="detail-title">{{ caseInfo?.title }}</h1>
      <div class="detail-meta">
        <span>教师：{{ caseInfo?.teacherName }}</span>
        <span>浏览量：{{ caseInfo?.viewCount }}</span>
        <span>发布时间：{{ caseInfo?.createTime }}</span>
      </div>
      <div class="detail-content">
        <!-- 详情内容待补充 -->
        <p>教学案例详情页面开发中...</p>
      </div>
      <button class="back-btn" @click="goBack">
        返回列表
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getTeachingCaseDetail, increaseViewCount } from '@/api/teaching'
import type { TeachingCase } from '@/types/teaching'

const route = useRoute()
const router = useRouter()

const caseInfo = ref<TeachingCase>()

async function loadDetail() {
  const id = route.params.id
  if (!id) return

  try {
    const res = await getTeachingCaseDetail(id as string)
    if (res.code === 200 && res.data) {
      caseInfo.value = res.data
      // 增加浏览量
      increaseViewCount(id as string)
    }
  } catch (error) {
    console.error('加载详情失败:', error)
  }
}

function goBack() {
  router.back()
}

onMounted(() => {
  loadDetail()
})
</script>

<style scoped>
.teaching-detail-page {
  min-height: 100vh;
  padding: 40px 20px;
  background: #f5f5f5;
}

.detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.detail-title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin: 0 0 24px 0;
}

.detail-meta {
  display: flex;
  gap: 24px;
  padding: 16px 0;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 32px;
  font-size: 14px;
  color: #666;
}

.detail-content {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  min-height: 400px;
}

.back-btn {
  margin-top: 40px;
  padding: 12px 32px;
  background: #c30d23;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.back-btn:hover {
  background: #a00a1c;
}
</style>

