<template>
  <div class="teaching-detail-page">
    <!-- Header -->
    <AppHeader />

    <!-- Banner -->
    <AppBanner />

    <!-- Navigation -->
    <AppNavigation />

    <!-- Main Content -->
    <main class="main-content">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <span class="breadcrumb-item inactive">您的位置： </span>
        <span class="breadcrumb-item inactive" @click="goToHome">首页</span>
        <span class="breadcrumb-item inactive">>> </span>
        <span class="breadcrumb-item inactive" @click="goToTeaching">教学有道</span>
        <span class="breadcrumb-item inactive">>> </span>
        <span class="breadcrumb-item active">课程详情</span>
      </div>

      <!-- 课程信息卡片 -->
      <div v-if="caseInfo" class="info-card">
        <div class="info-cover">
          <img :src="caseInfo.coverUrl" alt="" class="cover-img">
        </div>
        <div class="info-content">
          <h1 class="info-title">{{ caseInfo.title }}</h1>
          <div class="info-meta">
            <div class="meta-item">
              <span class="meta-label">学        校：</span>
              <span class="meta-value">{{ caseInfo.schoolName || '长安大学' }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">学科门类：</span>
              <span class="meta-value">{{ caseInfo.categoryName || caseInfo.collegeName || '信息学院' }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">教学类别：</span>
              <span class="meta-value">{{ caseInfo.caseTypeName || (caseInfo.caseType === 1 ? '教学案例' : '一流本科') }}</span>
            </div>
          </div>
          <div class="teachers-box">
            <div class="teachers-header">
              <div class="header-bar" />
              <span class="header-title">授课教师</span>
            </div>
            <div class="teachers-list">
              <div 
                v-for="(teacher, index) in displayTeachers" 
                :key="index" 
                class="teacher-item"
              >
                <div class="teacher-name">{{ teacher.name }}</div>
                <div class="teacher-title">{{ teacher.title || '教师' }}</div>
              </div>
            </div>
          </div>
          <div class="view-count">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 7.5C11.3807 7.5 12.5 8.61929 12.5 10C12.5 11.3807 11.3807 12.5 10 12.5C8.61929 12.5 7.5 11.3807 7.5 10C7.5 8.61929 8.61929 7.5 10 7.5Z" stroke="#333" opacity="0.5" stroke-width="1"/>
              <path d="M2.5 10C2.5 10 5 5 10 5C15 5 17.5 10 17.5 10C17.5 10 15 15 10 15C5 15 2.5 10 2.5 10Z" stroke="#333" opacity="0.5" stroke-width="1"/>
            </svg>
            <span class="count-label">累计观看人数</span>
            <span class="count-value">{{ caseInfo.viewCount }}</span>
            <span class="count-label">人</span>
          </div>
        </div>
        <div v-if="caseInfo.isNational" class="national-badge">
          国家示范
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
            class="tab-item"
            :class="{ active: activeTab === 'design' }"
            @click="activeTab = 'design'"
          >
            <div class="tab-dot" />
            <span>教学设计</span>
          </div>
          <div 
            class="tab-item"
            :class="{ active: activeTab === 'video' }"
            @click="activeTab = 'video'"
          >
            <div class="tab-dot" />
            <span>教学视频</span>
          </div>
        </aside>

        <!-- 右侧内容 -->
        <div class="tab-content">
          <div class="content-header">
            <div class="content-bar" />
            <h2 class="content-title">{{ tabTitles[activeTab] }}</h2>
          </div>
          <div class="content-divider" />
          <div class="content-body">
            <!-- 课程简介 -->
            <div v-if="activeTab === 'introduction'" class="content-text" v-html="formatContent(caseInfo?.introduction)" />
            
            <!-- 教学设计 -->
            <div v-else-if="activeTab === 'design'" class="content-text" v-html="formatContent(caseInfo?.designContent)" />
            
            <!-- 教学视频 -->
            <div v-else-if="activeTab === 'video'" class="video-wrapper">
              <video 
                v-if="caseInfo?.videoUrl" 
                :src="caseInfo.videoUrl" 
                controls 
                class="video-player"
              />
              <div v-else class="no-video">暂无视频</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 相关推荐 -->
      <div v-if="relatedCases.length > 0" class="related-section">
        <div class="section-header">
          <div class="section-title-wrapper">
            <h2 class="section-title">
              <span class="title-highlight">相关</span><span class="title-normal">推荐</span>
            </h2>
          </div>
          <div class="title-divider" />
        </div>
        <div class="related-grid">
          <div 
            v-for="item in relatedCases" 
            :key="item.id" 
            class="case-card"
            @click="goToDetail(item.id)"
          >
            <div class="card-cover">
              <img :src="item.coverUrl" alt="" class="cover-img">
              <div class="cover-overlay">
                <span class="case-label">案例名称：{{ item.title }}</span>
              </div>
              <div v-if="item.isNational" class="national-badge-small">
                国家示范
              </div>
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ item.title }}</h3>
              <div class="card-footer">
                <span class="teacher-name">教师：{{ item.teacherName }}</span>
                <div class="view-count-small">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 5C9.65685 5 11 6.34315 11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5Z" stroke="#333" opacity="0.5" stroke-width="1"/>
                    <path d="M1 8C1 8 3 3 8 3C13 3 15 8 15 8C15 8 13 13 8 13C3 13 1 8 1 8Z" stroke="#333" opacity="0.5" stroke-width="1"/>
                  </svg>
                  <span>{{ formatViewCount(item.viewCount) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getTeachingCaseDetail, increaseViewCount, getRelatedCases } from '@/api/teaching'
import type { TeachingCase } from '@/types/teaching'
import AppHeader from '@/components/common/AppHeader/index.vue'
import AppBanner from '@/components/common/AppBanner/index.vue'
import AppNavigation from '@/components/common/AppNavigation/index.vue'
import AppFooter from '@/components/common/AppFooter/index.vue'

const route = useRoute()
const router = useRouter()

const caseInfo = ref<TeachingCase>()
const activeTab = ref<'introduction' | 'design' | 'video'>('introduction')
const relatedCases = ref<TeachingCase[]>([])

const tabTitles = {
  introduction: '课程简介',
  design: '教学设计',
  video: '教学视频'
}

// 显示的教师列表（最多显示2个）
const displayTeachers = computed(() => {
  if (caseInfo.value?.teachers && caseInfo.value.teachers.length > 0) {
    return caseInfo.value.teachers.slice(0, 2)
  }
  // 如果没有教师列表，使用teacherName生成默认教师
  return [
    { name: caseInfo.value?.teacherName || '张三', title: '教师' },
    { name: '张三', title: '教师' }
  ]
})

/**
 * 加载详情
 */
async function loadDetail() {
  const id = route.params.id
  if (!id) return

  try {
    const res = await getTeachingCaseDetail(id as string)
    if (res.code === 200 && res.data) {
      caseInfo.value = res.data
      // 增加浏览量
      increaseViewCount(id as string)
      // 加载相关推荐
      loadRelatedCases(id as string)
    } else {
      // 使用模拟数据
      caseInfo.value = generateMockDetail()
      loadRelatedCases(id as string)
    }
  } catch (error) {
    console.error('加载详情失败:', error)
    // 使用模拟数据
    caseInfo.value = generateMockDetail()
    loadRelatedCases(id as string)
  }
}

/**
 * 加载相关推荐
 */
async function loadRelatedCases(id: string) {
  try {
    const res = await getRelatedCases(id, 4)
    if (res.code === 200 && res.data) {
      relatedCases.value = res.data
    } else {
      relatedCases.value = generateMockRelated()
    }
  } catch (error) {
    console.error('加载相关推荐失败:', error)
    relatedCases.value = generateMockRelated()
  }
}

/**
 * 生成模拟详情数据
 */
function generateMockDetail(): TeachingCase {
  return {
    id: route.params.id as string,
    title: '交通运输系统导论',
    coverUrl: '/images/home/video-1.jpg',
    teacherName: '张三',
    viewCount: 17645,
    collegeName: '信息学院',
    schoolName: '长安大学',
    categoryName: '信息学院',
    caseType: 1,
    caseTypeName: '教学案例',
    isNational: true,
    teachers: [
      { name: '张三', title: '教师' },
      { name: '张三', title: '教师' }
    ],
    introduction: `<p style="text-indent: 32px;">课程是人才培养的最后一公里。随着大数据时代的来临，"概率论与数理统计"作为大数据的主要基础理论之一，受到专家学者的广泛关注，这一课程已成为高等院校理工科、经管类各专业重要的基础课程之一，大量应用于社会、经济、科学等领域。其中概率论以现代数学框架为基础研究随机现象的统计规律性，数理统计则以概率论为理论基础，研究怎样用有效的方法去收集、整理、分析受随机性影响的数据，并对所研究的问题作出统计推断和预测，同时为决策和行动提供依据和建议。</p>
<p>&nbsp;</p>
<p style="text-indent: 32px;">通过本课程的学习，学生能掌握概率论与数理统计的基本概念、基本理论和方法，从而理解随机现象的基本思想、训练数理逻辑思维，培养运用概率统计方法分析和解决实际问题的能力，为后续学习乃至工作奠定必备的数理基础。</p>`,
    designContent: '<p>教学设计内容待补充...</p>',
    videoUrl: ''
  }
}

/**
 * 生成模拟相关推荐数据
 */
function generateMockRelated(): TeachingCase[] {
  const titles = [
    '为党为国育人才  擘画东南强校梦',
    '传承红色基因  培育时代新人',
    '立德树人守初心  铸魂育人担使命',
    '思政引领促发展  立德树人谱新篇'
  ]
  
  const covers = [
    '/images/home/video-1.jpg',
    '/images/home/video-2.jpg',
    '/images/home/video-3.jpg',
    '/images/home/video-4.jpg'
  ]

  const result: TeachingCase[] = []
  for (let i = 0; i < 4; i++) {
    result.push({
      id: 100 + i,
      title: titles[i],
      coverUrl: covers[i],
      teacherName: '薛美玉',
      viewCount: 3456,
      isNational: false
    })
  }
  
  return result
}

/**
 * 格式化内容
 */
function formatContent(content?: string): string {
  if (!content) {
    return '<p>暂无内容</p>'
  }
  return content
}

/**
 * 格式化浏览量
 */
function formatViewCount(count: number): string {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}万人`
  }
  return `${count}人`
}

/**
 * 跳转到首页
 */
function goToHome() {
  router.push('/')
}

/**
 * 跳转到教学有道列表
 */
function goToTeaching() {
  router.push('/teaching')
}

/**
 * 跳转到详情
 */
function goToDetail(id: number | string) {
  router.push(`/teaching/detail/${id}`)
  // 刷新页面数据
  loadDetail()
}

// 初始化加载
onMounted(() => {
  loadDetail()
})
</script>

<style scoped>
.teaching-detail-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
}

/* ===== Main Content ===== */
.main-content {
  flex: 1;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 360px 80px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* ===== 面包屑导航 ===== */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 24px 0;
  border-bottom: 1px solid #ebebeb;
  font-family: 'Source Han Sans CN', sans-serif;
  font-size: 16px;
  line-height: 1.75;
}

.breadcrumb-item {
  cursor: pointer;
  transition: color 0.3s;
}

.breadcrumb-item.inactive {
  color: #333;
  opacity: 0.5;
}

.breadcrumb-item.inactive:hover {
  opacity: 0.7;
}

.breadcrumb-item.active {
  color: #c30d23;
}

/* ===== 课程信息卡片 ===== */
.info-card {
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  gap: 32px;
  position: relative;
}

.info-cover {
  width: 540px;
  height: 304px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
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
  gap: 16px;
}

.info-title {
  font-family: 'Source Han Sans CN', sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0;
  line-height: normal;
}

.info-meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-size: 14px;
  color: #333;
  line-height: normal;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.meta-label {
  opacity: 0.5;
  min-width: 70px;
}

.meta-value {
  white-space: nowrap;
}

.teachers-box {
  flex: 1;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
}

.teachers-header {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.header-bar {
  width: 5px;
  height: 16px;
  background: #c30d23;
  flex-shrink: 0;
}

.header-title {
  font-family: 'Source Han Sans CN', sans-serif;
  font-size: 16px;
  line-height: 1.75;
  color: #c30d23;
  white-space: nowrap;
}

.teachers-list {
  display: flex;
  gap: 24px;
  padding: 0 12px;
  font-family: 'Source Han Sans CN', sans-serif;
  line-height: normal;
}

.teacher-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.teacher-name {
  font-size: 16px;
  color: #333;
}

.teacher-title {
  font-size: 14px;
  color: #333;
  opacity: 0.5;
}

.view-count {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  opacity: 0.5;
}

.view-count svg {
  opacity: 1;
}

.count-label {
  font-family: 'Source Han Sans CN', sans-serif;
  font-size: 14px;
  line-height: normal;
  color: #333;
}

.count-value {
  font-family: 'Source Han Sans CN', sans-serif;
  font-size: 14px;
  line-height: normal;
  color: #c30d23;
  opacity: 1;
}

.national-badge {
  position: absolute;
  top: 16px;
  left: 500px;
  padding: 4px 8px;
  background: linear-gradient(to left, #bc7120, #bc2220);
  color: white;
  font-size: 14px;
  font-family: 'Source Han Sans CN', sans-serif;
  border-radius: 0 4px 0 4px;
  line-height: normal;
}

/* ===== Tab切换区域 ===== */
.tab-section {
  display: flex;
  gap: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  height: 720px;
  position: relative;
  isolation: isolate;
}

.tab-sidebar {
  flex: 0 0 214px;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px;
  position: relative;
  z-index: 2;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 24px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Source Han Sans CN', sans-serif;
  font-size: 18px;
  line-height: normal;
  color: #333;
  white-space: nowrap;
}

.tab-item:hover {
  background: rgba(195, 13, 35, 0.05);
}

.tab-item.active {
  background: #c30d23;
  color: white;
}

.tab-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #333;
  flex-shrink: 0;
}

.tab-item.active .tab-dot {
  background: white;
}

.tab-content {
  flex: 1;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px 24px 24px 48px;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.content-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.content-bar {
  width: 5px;
  height: 100%;
  background: #c30d23;
  flex-shrink: 0;
}

.content-title {
  font-family: 'Source Han Sans CN', sans-serif;
  font-size: 20px;
  font-weight: bold;
  line-height: normal;
  color: #333;
  margin: 0;
  white-space: nowrap;
}

.content-divider {
  width: 100%;
  height: 1px;
  background: #e5e5e5;
}

.content-body {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.content-text {
  font-family: 'Source Han Sans CN', sans-serif;
  font-size: 16px;
  line-height: 1.75;
  color: #333;
  width: 100%;
}

.content-text :deep(p) {
  margin: 0 0 16px 0;
}

.content-text :deep(p:last-child) {
  margin-bottom: 0;
}

.video-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-player {
  width: 100%;
  max-height: 100%;
  border-radius: 4px;
}

.no-video {
  font-size: 16px;
  color: #999;
}

/* ===== 相关推荐 ===== */
.related-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.section-title-wrapper {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.section-title {
  font-family: 'Source Han Sans CN', sans-serif;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin: 0;
}

.title-highlight {
  color: #c30d23;
}

.title-normal {
  color: #000;
}

.title-divider {
  flex: 1;
  height: 15px;
  background-image: url('/images/0284b4e501c92c66c4350a706aae467b7ebb06a3.png');
  background-repeat: repeat-x;
  background-size: 5px 15px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 100%;
}

.case-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.case-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-cover {
  width: 100%;
  aspect-ratio: 364 / 200;
  position: relative;
  overflow: hidden;
}

.card-cover .cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.5);
}

.case-label {
  color: white;
  font-size: 14px;
  font-family: 'Source Han Sans CN', sans-serif;
  line-height: normal;
}

.national-badge-small {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 8px;
  background: linear-gradient(to left, #bc7120, #bc2220);
  color: white;
  font-size: 14px;
  font-family: 'Source Han Sans CN', sans-serif;
  border-radius: 0 4px 0 4px;
  line-height: normal;
}

.card-content {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: white;
}

.card-title {
  font-size: 16px;
  color: #333;
  font-family: 'Source Han Sans CN', sans-serif;
  margin: 0;
  line-height: normal;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.teacher-name {
  font-size: 14px;
  color: #333;
  opacity: 0.5;
  font-family: 'Source Han Sans CN', sans-serif;
  line-height: normal;
}

.view-count-small {
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0.5;
}

.view-count-small span {
  font-size: 12px;
  color: #333;
  font-family: 'Source Han Sans CN', sans-serif;
  line-height: normal;
}
</style>

