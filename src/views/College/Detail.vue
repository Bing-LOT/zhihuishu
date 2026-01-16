<template>
  <div class="college-detail-page">
    <!-- Header -->
    <AppHeader />

    <!-- Navigation -->
    <AppNavigation />

    <!-- 一院一品横幅 -->
    <section class="college-banner">
      <div class="banner-content">
        <h1 class="banner-title">
          <span class="title-highlight">一院</span>
          <span class="title-normal">一品</span>
        </h1>
      </div>
    </section>

    <!-- Main Content -->
    <main class="main-content">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <span class="breadcrumb-item inactive">您的位置： </span>
        <span class="breadcrumb-item inactive" @click="goToHome">首页</span>
        <span class="breadcrumb-item inactive">>> </span>
        <span class="breadcrumb-item inactive" @click="goToCollege">一院一品</span>
        <span class="breadcrumb-item inactive">>> </span>
        <span class="breadcrumb-item active">案例详情</span>
      </div>

      <!-- 案例信息卡片 -->
      <div v-if="collegeInfo" class="info-card">
        <div class="info-cover">
          <img :src="collegeInfo.coverUrl" alt="" class="cover-img">
        </div>
        <div class="info-content">
          <h1 class="info-title">{{ collegeInfo.name }}</h1>
          <div class="info-meta">
            <div class="meta-item">
              <span class="meta-label">所在学院：</span>
              <span class="meta-value">{{ collegeInfo.college }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">课程类型：</span>
              <span class="meta-value">{{ formatTypes(collegeInfo.types) }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">发布时间：</span>
              <span class="meta-value">{{ formatDate(collegeInfo.createTime) }}</span>
            </div>
          </div>
          <div class="teachers-box">
            <div class="teachers-header">
              <div class="header-bar" />
              <span class="header-title">主讲教师</span>
            </div>
            <div class="teachers-list">
              <div 
                v-for="(teacher, index) in collegeInfo.teachers" 
                :key="index" 
                class="teacher-item"
              >
                <div class="teacher-name">{{ teacher.name }}</div>
                <div class="teacher-title">{{ teacher.title || '教师' }}</div>
              </div>
            </div>
          </div>
          <div class="view-count">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 7.5C11.3807 7.5 12.5 8.61929 12.5 10C12.5 11.3807 11.3807 12.5 10 12.5C8.61929 12.5 7.5 11.3807 7.5 10C7.5 8.61929 8.61929 7.5 10 7.5Z" stroke="#333" stroke-width="1"/>
              <path d="M2.5 10C2.5 10 5 5 10 5C15 5 17.5 10 17.5 10C17.5 10 15 15 10 15C5 15 2.5 10 2.5 10Z" stroke="#333" stroke-width="1"/>
            </svg>
            <span class="count-label">累计观看人数</span>
            <span class="count-value">{{ collegeInfo.statPv }}</span>
            <span class="count-label">人</span>
          </div>
        </div>
      </div>

      <!-- Tab切换区域 -->
      <div class="tab-section">
        <!-- 左侧菜单 -->
        <aside class="tab-sidebar">
          <div 
            class="tab-item"
            :class="{ active: activeTab === 'introduction' }"
            @click="activeTab = 'introduction'"
          >
            <div class="tab-dot" />
            <span>课程简介</span>
          </div>
          <div 
            v-if="collegeInfo?.videoUrl"
            class="tab-item"
            :class="{ active: activeTab === 'video' }"
            @click="activeTab = 'video'"
          >
            <div class="tab-dot" />
            <span>课程视频</span>
          </div>
        </aside>

        <!-- 右侧内容区 -->
        <div class="tab-content">
          <!-- 课程简介 -->
          <div v-if="activeTab === 'introduction'" class="content-section">
            <div class="section-header">
              <h2 class="section-title">课程简介</h2>
            </div>
            <div class="section-body">
              <div v-if="collegeInfo?.content" class="rich-content" v-html="collegeInfo.content"></div>
              <div v-else class="empty-tip">暂无课程简介</div>
            </div>
          </div>

          <!-- 课程视频 -->
          <div v-if="activeTab === 'video' && collegeInfo?.videoUrl" class="content-section">
            <div class="section-header">
              <h2 class="section-title">课程视频</h2>
            </div>
            <div class="section-body">
              <VideoPlayer :url="collegeInfo.videoUrl" />
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <PageFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import AppHeader from '@/components/common/AppHeader/index.vue'
import AppNavigation from '@/components/common/AppNavigation/index.vue'
import PageFooter from '@/components/common/PageFooter/index.vue'
import VideoPlayer from '@/components/common/VideoPlayer/index.vue'
import { getCollegePageList, type CollegeItem } from '@/api/college'

const router = useRouter()
const route = useRoute()

const collegeInfo = ref<CollegeItem | null>(null)
const activeTab = ref('introduction')

// 格式化日期
const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 格式化类型列表
const formatTypes = (types: string[]) => {
  if (!types || types.length === 0) return ''
  return types.join('、')
}

// 加载案例详情
const loadCollegeDetail = async () => {
  try {
    const id = Number(route.params.id)
    if (!id) {
      ElMessage.error('参数错误')
      return
    }

    // 通过分页接口查询所有数据，然后筛选出目标案例
    const result = await getCollegePageList({
      pageIndex: 1,
      pageSize: 1000,
      showFront: 1
    })

    const targetCollege = result.records.find(item => item.id === id)
    if (!targetCollege) {
      ElMessage.error('案例不存在')
      router.push('/college')
      return
    }

    collegeInfo.value = targetCollege
  } catch (error) {
    console.error('加载案例详情失败:', error)
    ElMessage.error('加载失败，请稍后重试')
  }
}

// 导航方法
const goToHome = () => {
  router.push('/')
}

const goToCollege = () => {
  router.push('/college')
}

onMounted(() => {
  loadCollegeDetail()
})
</script>

<style scoped>
.college-detail-page {
  min-height: 100vh;
  background: #f5f5f5;
}

/* 横幅 */
.college-banner {
  height: 300px;
  background: linear-gradient(135deg, #c30d23 0%, #8b0a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.banner-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.banner-title {
  margin: 0;
  font-size: 64px;
  font-weight: bold;
  font-family: 'Source Han Sans CN', sans-serif;
}

.title-highlight {
  color: #fff;
}

.title-normal {
  color: rgba(255, 255, 255, 0.9);
}

/* 主内容 */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 20px 60px;
}

/* 面包屑 */
.breadcrumb {
  margin-bottom: 24px;
  font-size: 14px;
  color: #666;
}

.breadcrumb-item {
  margin-right: 4px;
}

.breadcrumb-item.inactive {
  cursor: pointer;
  transition: color 0.3s;
}

.breadcrumb-item.inactive:hover {
  color: #c30d23;
}

.breadcrumb-item.active {
  color: #c30d23;
  font-weight: bold;
}

/* 信息卡片 */
.info-card {
  position: relative;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 32px;
  margin-bottom: 24px;
  display: flex;
  gap: 32px;
}

.info-cover {
  flex-shrink: 0;
  width: 360px;
  height: 240px;
  border-radius: 8px;
  overflow: hidden;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.info-title {
  font-size: 28px;
  color: #333;
  margin: 0 0 24px 0;
  font-weight: bold;
}

.info-meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.meta-item {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.meta-label {
  color: #666;
  min-width: 100px;
}

.meta-value {
  color: #333;
  font-weight: 500;
}

/* 教师信息 */
.teachers-box {
  background: #f8f8f8;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
}

.teachers-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.header-bar {
  width: 4px;
  height: 18px;
  background: #c30d23;
  border-radius: 2px;
}

.header-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
}

.teachers-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.teacher-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.teacher-name {
  font-size: 15px;
  color: #333;
  font-weight: 500;
}

.teacher-title {
  font-size: 13px;
  color: #999;
}

/* 浏览量 */
.view-count {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
  margin-top: auto;
}

.count-value {
  color: #c30d23;
  font-weight: bold;
  font-size: 18px;
}

/* Tab区域 */
.tab-section {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.tab-sidebar {
  flex-shrink: 0;
  width: 200px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px 0;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 16px;
  color: #666;
}

.tab-item:hover {
  background: #f5f5f5;
}

.tab-item.active {
  background: #fff5f5;
  color: #c30d23;
  font-weight: 500;
}

.tab-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ddd;
  transition: background 0.3s;
}

.tab-item.active .tab-dot {
  background: #c30d23;
}

/* Tab内容区 */
.tab-content {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: 400px;
}

.content-section {
  padding: 32px;
}

.section-header {
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 16px;
  margin-bottom: 24px;
}

.section-title {
  font-size: 24px;
  color: #333;
  margin: 0;
  font-weight: bold;
}

.section-body {
  line-height: 1.8;
}

/* 富文本内容 */
.rich-content {
  color: #333;
  font-size: 15px;
}

.rich-content :deep(p) {
  margin: 1em 0;
}

.rich-content :deep(img) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1em auto;
}

.rich-content :deep(h1),
.rich-content :deep(h2),
.rich-content :deep(h3),
.rich-content :deep(h4),
.rich-content :deep(h5),
.rich-content :deep(h6) {
  margin: 1.5em 0 1em;
  font-weight: bold;
  color: #333;
}

.rich-content :deep(ul),
.rich-content :deep(ol) {
  padding-left: 2em;
  margin: 1em 0;
}

.rich-content :deep(blockquote) {
  border-left: 4px solid #c30d23;
  padding-left: 1em;
  margin: 1em 0;
  color: #666;
}

.empty-tip {
  text-align: center;
  color: #999;
  padding: 60px 0;
}

/* 响应式 */
@media (max-width: 1024px) {
  .info-card {
    flex-direction: column;
  }

  .info-cover {
    width: 100%;
    height: 300px;
  }

  .tab-section {
    flex-direction: column;
  }

  .tab-sidebar {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .banner-title {
    font-size: 48px;
  }

  .info-title {
    font-size: 24px;
  }

  .section-title {
    font-size: 20px;
  }
}
</style>

