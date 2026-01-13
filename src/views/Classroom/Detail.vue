<template>
  <div class="classroom-detail-page">
    <!-- Header -->
    <AppHeader />

    <!-- Banner -->
    <AppBanner />

    <!-- Navigation -->
    <AppNavigation />

    <!-- Main Content -->
    <main class="main-content">
      <div class="detail-container">
        <h1>课程详情</h1>
        <p>课程 ID: {{ courseId }}</p>
        <p>该页面正在开发中...</p>
        <button @click="goBack" class="back-btn">返回</button>
      </div>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/common/AppHeader/index.vue'
import AppBanner from '@/components/common/AppBanner/index.vue'
import AppNavigation from '@/components/common/AppNavigation/index.vue'
import AppFooter from '@/components/common/AppFooter/index.vue'

const route = useRoute()
const router = useRouter()

const courseId = computed(() => route.params.id)

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.classroom-detail-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.main-content {
  flex: 1;
  padding: 60px 360px;
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
}

.detail-container {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.detail-container h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
}

.detail-container p {
  font-size: 18px;
  color: #666;
  margin-bottom: 10px;
}

.back-btn {
  background: #c30d23;
  color: white;
  border: none;
  padding: 10px 24px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 20px;
}

.back-btn:hover {
  background: #a00a1c;
}

@media (max-width: 1600px) {
  .main-content {
    padding-left: 40px;
    padding-right: 40px;
  }
}
</style>

