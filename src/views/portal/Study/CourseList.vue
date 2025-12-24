<template>
  <div class="study-page">
    <!-- 背景层 -->
    <div class="study-page__bg">
      <img src="/images/indexBg.png" alt="" />
    </div>

    <div class="study-container">
      <!-- 面包屑 -->
      <div class="breadcrumb">
        <span class="label">您的位置：</span>
        <router-link to="/" class="link">首页</router-link>
        <span class="separator">>></span>
        <span class="current">党员教师课程思政示范课展播</span>
      </div>

      <!-- 页面标题 -->
      <div class="page-header">
        <div class="page-title-wrapper">
          <div class="page-title-bg">
            <img src="/images/xiaohui1.png" alt="" />
          </div>
          <!-- 装饰线条 -->
          <div class="page-title-decoration left">
            <svg xmlns="http://www.w3.org/2000/svg" width="122" height="37" viewBox="0 0 122 37" fill="none">
              <path d="M55.4995 25.1402C58.5629 25.1402 60.8086 22.6335 60.8086 19.5701C60.8086 16.5068 58.565 14 55.4995 14" stroke="#EFE0D3" stroke-linejoin="round"/>
              <path d="M54.8086 36.2809C51.7452 36.2809 49.4995 33.7741 49.4995 30.7108C49.4995 27.6474 51.7431 25.1406 54.8086 25.1406" stroke="#EFE0D3" stroke-linejoin="round"/>
              <path d="M121.283 36.2801L50.4349 36.2805C47.3715 36.2805 44.8647 33.7737 44.8647 30.7104C44.8647 27.647 47.3715 25.1402 50.4349 25.1402H58H51.8651H59.4303C62.4936 25.1402 65.0004 22.6335 65.0004 19.5701C65.0004 16.5068 62.4936 14 59.4303 14L0 14" stroke="#EFE0D3" stroke-linejoin="round"/>
              <path d="M102.5 36.8879H81.5V36.2697C81.5 30.6064 86.2102 25.999 92 25.999C97.7898 25.999 102.5 30.6064 102.5 36.2697V36.8879ZM82.7825 35.6537H101.215C100.89 30.9583 96.8809 27.2355 91.9977 27.2355C87.1145 27.2355 83.1054 30.9583 82.7802 35.6537" fill="#EFE0D3"/>
              <path d="M98.6109 36.8894H85.3887V36.2693C85.3887 32.7501 88.3548 29.8894 91.9986 29.8894C95.6424 29.8894 98.6085 32.7523 98.6085 36.2693V36.8894H98.6109ZM86.7111 35.6514H97.2884C96.9719 33.1076 94.7209 31.1296 92.001 31.1296C89.281 31.1296 87.03 33.1076 86.7111 35.6514Z" fill="#EFE0D3"/>
              <path d="M95.4854 36.7893H88.4854V36.4448C88.4854 34.4896 90.0557 32.9004 91.9847 32.9004C93.9138 32.9004 95.4841 34.4909 95.4841 36.4448V36.7893H95.4854ZM89.1855 36.1015H94.7852C94.6176 34.6883 93.426 33.5894 91.986 33.5894C90.546 33.5894 89.3543 34.6883 89.1855 36.1015Z" fill="#EFE0D3"/>
              <path d="M44.5 14H17.5V13.2051C17.5 5.92375 23.556 0 31 0C38.444 0 44.5 5.92375 44.5 13.2051V14ZM19.1489 12.4132H42.8481C42.4299 6.37627 37.2755 1.58972 30.997 1.58972C24.7186 1.58972 19.5641 6.37627 19.146 12.4132" fill="#EFE0D3"/>
              <path d="M39.5 14H22.5V13.2027C22.5 8.67799 26.3136 5 30.9985 5C35.6834 5 39.497 8.6809 39.497 13.2027V14H39.5ZM24.2003 12.4083H37.7997C37.3927 9.13771 34.4986 6.59456 31.0015 6.59456C27.5045 6.59456 24.6103 9.13771 24.2003 12.4083Z" fill="#EFE0D3"/>
              <path d="M35.4805 13.8691H26.4805V13.4262C26.4805 10.9125 28.4995 8.86914 30.9797 8.86914C33.4599 8.86914 35.4789 10.9141 35.4789 13.4262V13.8691H35.4805ZM27.3806 12.9849H34.5803C34.3648 11.1679 32.8327 9.75501 30.9813 9.75501C29.1299 9.75501 27.5977 11.1679 27.3806 12.9849Z" fill="#EFE0D3"/>
            </svg>
          </div>
          <div class="page-title-decoration right">
            <svg xmlns="http://www.w3.org/2000/svg" width="122" height="37" viewBox="0 0 122 37" fill="none">
              <path d="M65.7837 25.1402C62.7203 25.1402 60.4746 22.6335 60.4746 19.5701C60.4746 16.5068 62.7182 14 65.7837 14" stroke="#EFE0D3" stroke-linejoin="round"/>
              <path d="M66.4746 36.2809C69.538 36.2809 71.7837 33.7741 71.7837 30.7108C71.7837 27.6474 69.5401 25.1406 66.4746 25.1406" stroke="#EFE0D3" stroke-linejoin="round"/>
              <path d="M0 36.2801L70.8484 36.2805C73.9117 36.2805 76.4185 33.7737 76.4185 30.7104C76.4185 27.647 73.9117 25.1402 70.8484 25.1402H63.2832H69.4181H61.8529C58.7896 25.1402 56.2828 22.6335 56.2828 19.5701C56.2828 16.5068 58.7896 14 61.8529 14L121.283 14" stroke="#EFE0D3" stroke-linejoin="round"/>
              <path d="M18.7832 36.8879H39.7832V36.2697C39.7832 30.6064 35.073 25.999 29.2832 25.999C23.4934 25.999 18.7832 30.6064 18.7832 36.2697V36.8879ZM38.5007 35.6537H20.068C20.3933 30.9583 24.4023 27.2355 29.2855 27.2355C34.1687 27.2355 38.1778 30.9583 38.503 35.6537" fill="#EFE0D3"/>
              <path d="M22.6723 36.8894H35.8945V36.2693C35.8945 32.7501 32.9284 29.8894 29.2846 29.8894C25.6408 29.8894 22.6747 32.7523 22.6747 36.2693V36.8894H22.6723ZM34.5721 35.6514H23.9948C24.3113 33.1076 26.5623 31.1296 29.2822 31.1296C32.0022 31.1296 34.2532 33.1076 34.5721 35.6514Z" fill="#EFE0D3"/>
              <path d="M25.7979 36.7893H32.7979V36.4448C32.7979 34.4896 31.2275 32.9004 29.2985 32.9004C27.3694 32.9004 25.7991 34.4909 25.7991 36.4448V36.7893H25.7979ZM32.0977 36.1015H26.498C26.6656 34.6883 27.8573 33.5894 29.2972 33.5894C30.7372 33.5894 31.9289 34.6883 32.0977 36.1015Z" fill="#EFE0D3"/>
              <path d="M76.7832 14H103.783V13.2051C103.783 5.92375 97.7272 0 90.2832 0C82.8392 0 76.7832 5.92375 76.7832 13.2051V14ZM102.134 12.4132H78.4351C78.8533 6.37627 84.0077 1.58972 90.2862 1.58972C96.5646 1.58972 101.719 6.37627 102.137 12.4132" fill="#EFE0D3"/>
              <path d="M81.7832 14H98.7832V13.2027C98.7832 8.67799 94.9696 5 90.2847 5C85.5998 5 81.7862 8.6809 81.7862 13.2027V14H81.7832ZM97.0829 12.4083H83.4835C83.8905 9.13771 86.7846 6.59456 90.2817 6.59456C93.7787 6.59456 96.6729 9.13771 97.0829 12.4083Z" fill="#EFE0D3"/>
              <path d="M85.8027 13.8691H94.8027V13.4262C94.8027 10.9125 92.7837 8.86914 90.3035 8.86914C87.8233 8.86914 85.8043 10.9141 85.8043 13.4262V13.8691H85.8027ZM93.9026 12.9849H86.7029C86.9184 11.1679 88.4505 9.75501 90.3019 9.75501C92.1533 9.75501 93.6855 11.1679 93.9026 12.9849Z" fill="#EFE0D3"/>
            </svg>
          </div>
          
          <div class="page-title-content">
            <h1 class="page-title">党员教师课程思政示范课展播</h1>
            <div class="page-title-icon">
              <img src="/images/xiaohui2.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <!-- 筛选区域 -->
      <div class="filter-section">
        <div class="filter-row">
          <span class="filter-label">展播类型：</span>
          <div class="filter-options">
            <button 
              v-for="opt in typeOptions" 
              :key="opt"
              class="filter-btn"
              :class="{ active: activeType === opt }"
              @click="activeType = opt"
            >
              {{ opt }}
            </button>
          </div>
        </div>
        <div class="filter-row">
          <span class="filter-label">获评课程：</span>
          <div class="filter-options">
            <button 
              v-for="opt in levelOptions" 
              :key="opt"
              class="filter-btn"
              :class="{ active: activeLevel === opt }"
              @click="activeLevel = opt"
            >
              {{ opt }}
            </button>
          </div>
        </div>
        <div class="filter-row">
          <span class="filter-label">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;院：</span>
          <div class="filter-options wrap">
            <button 
              v-for="opt in departmentOptions" 
              :key="opt"
              class="filter-btn"
              :class="{ active: activeDepartment === opt }"
              @click="activeDepartment = opt"
            >
              {{ opt }}
            </button>
          </div>
        </div>
      </div>

      <!-- 列表头部 -->
      <div class="list-header">
        <div class="list-info">
          <!-- 这里的图标可以用 gailanmulu_icon.png 或者是其他的 -->
          <img src="/images/gailanmulu_icon.png" alt="" class="list-icon" />
          <h2 class="list-title">展播目录</h2>
          <span class="list-count">共计收录 <span class="highlight">{{ totalCount }}个</span> 视频</span>
        </div>
        <div class="search-box">
          <div class="search-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17.5 17.5L13.875 13.875" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <input type="text" placeholder="请输入课程名称" v-model="searchQuery" @keyup.enter="handleSearch" />
          <button class="search-btn" @click="handleSearch">搜索</button>
        </div>
      </div>

      <!-- 课程列表 -->
      <div v-if="loading" class="loading-container">
        <div class="loading-text">加载中...</div>
      </div>
      <div v-else-if="filteredCourseList.length === 0" class="empty-container">
        <div class="empty-text">暂无数据</div>
      </div>
      <div v-else class="course-grid">
        <CourseCard
          v-for="course in filteredCourseList"
          :key="course.id"
          :course="course"
          :badge="course.badge"
          @click="handleCourseClick"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import CourseCard from '@/components/common/CourseCard/index.vue'
import type { Course } from '@/types'
import { getCourseExpoPageList, type CourseExpoItem } from '@/api/course'

/**
 * 学习中心（课程列表）页面
 */
const router = useRouter()

// 筛选状态
const activeType = ref('全部')
const activeLevel = ref('全部')
const activeDepartment = ref('全部')
const searchQuery = ref('')

// 课程列表数据
const courseList = ref<CourseExpoItem[]>([])
const totalCount = ref(0)
const loading = ref(false)

// 筛选选项
const typeOptions = ['全部', '示范课程', '建设发展', '一院一品', '思政微视频']
const levelOptions = ['全部', '国家示范', '省级示范']
const departmentOptions = [
  '全部',
  '电气工程与自动化学院', '机械工程及自动化学院', '数学与统计学院', '化工学院', '土木工程学院',
  '环境与安全工程学院', '经济与管理学院', '生物科学与工程学院', '外国语学院', '计算机与大数据学院',
  '物理与信息工程学院', '化学学院', '建筑与城乡规划学院', '紫金地质与矿业学院', '厦门工艺美术学院',
  '材料科学与工程学院', '法学院', '海洋学院（先进制造学院）', '人文社会科学学院', '体育教学研究部',
  '军事教研室'
]

/**
 * 获取课程列表
 */
const fetchCourseList = async () => {
  loading.value = true
  try {
    const params: any = {
      pageIndex: 1,
      pageSize: 16
    }

    // 添加筛选条件
    if (activeType.value && activeType.value !== '全部') {
      params.property = activeType.value
    }
    if (activeLevel.value && activeLevel.value !== '全部') {
      params.levelName = activeLevel.value
    }
    if (activeDepartment.value && activeDepartment.value !== '全部') {
      params.college = activeDepartment.value
    }
    // 添加搜索关键字
    if (searchQuery.value && searchQuery.value.trim()) {
      params.name = searchQuery.value.trim()
    }

    const response = await getCourseExpoPageList(params)
    courseList.value = response.records
    totalCount.value = response.total
  } catch (error) {
    console.error('获取课程列表失败:', error)
    courseList.value = []
    totalCount.value = 0
  } finally {
    loading.value = false
  }
}

// 监听筛选条件变化
watch([activeType, activeLevel, activeDepartment], () => {
  fetchCourseList()
})

// 组件挂载时获取数据
onMounted(() => {
  fetchCourseList()
})

// 转换课程数据为卡片所需格式
const filteredCourseList = computed(() => {
  return courseList.value.map(course => ({
    id: course.id.toString(),
    title: course.name,
    cover: course.coverUrl,
    teacherList: course.teachers.map(t => ({ name: t.name, title: t.department || '' })),
    studentCount: course.showStatPv || course.statPv || 0,
    badge: course.levelName,
    department: course.college,
    level: course.levelName,
    type: course.property
  }))
})

/**
 * 处理搜索
 */
const handleSearch = () => {
  fetchCourseList()
}

const handleCourseClick = (course: any) => {
  router.push(`/study/video/${course.id}`)
}
</script>

<style scoped>
.study-page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-bottom: 80px;
}

.study-page__bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.study-page__bg img {
  width: 100%;
  object-fit: cover;
  opacity: 0.1;
}

.study-container {
  position: relative;
  max-width: 1920px;
  margin: 0 auto;
  padding: 80px 160px;
  z-index: 1;
}

/* 面包屑 */
.breadcrumb {
  display: flex;
  justify-content: flex-end;
  font-size: 16px;
  margin-bottom: 48px;
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

/* 页面标题 */
.page-header {
  display: flex;
  justify-content: center;
  margin-bottom: 72px;
}

.page-title-wrapper {
  position: relative;
  width: 306.566px;
  height: 78px;
}

.page-title-bg {
  position: absolute;
  top: 0;
  left: 42.08%;
  right: 42.26%;
  aspect-ratio: 1;
  opacity: 0.2;
}

.page-title-bg img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.page-title-decoration {
  position: absolute;
  bottom: 21.94%;
  top: 30.77%;
}

.page-title-decoration.left {
  left: -50px;
}

.page-title-decoration.right {
  right: -50px;
}

.page-title-content {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  top: 30.77%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.page-title {
  margin: 0;
  font-size: 24px;
  font-family: 'Source Han Serif CN', serif;
  font-weight: 700;
  color: #bc2220;
  line-height: normal;
  letter-spacing: 3.84px;
  white-space: nowrap;
}

.page-title-icon {
  width: 20px;
  height: 20px;
  margin-top: 4px;
}

.page-title-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 筛选区域 */
.filter-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 48px;
}

.filter-row {
  display: flex;
  align-items: flex-start;
}

.filter-label {
  width: 100px;
  flex-shrink: 0;
  font-size: 18px;
  color: #333;
  margin-top: 8px; /* 对齐按钮文字 */
}

.filter-options {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.filter-options.wrap {
  flex-wrap: wrap;
}

.filter-btn {
  padding: 8px 24px;
  border-radius: 100px;
  border: none;
  background: transparent;
  color: #333;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.5;
}

.filter-btn:hover {
  opacity: 0.8;
}

.filter-btn.active {
  background: #bc2220;
  color: #fff;
  opacity: 1;
}

/* 列表头部 */
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
}

.list-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.list-icon {
  width: 38px;
  height: 35px;
}

.list-title {
  font-size: 24px;
  font-weight: 700;
  color: #be2b28;
}

.list-count {
  font-size: 18px;
  color: #333;
}

.list-count .highlight {
  color: #bc2220;
  margin: 0 4px;
}

.search-box {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 100px;
  padding: 8px 16px;
  width: 320px;
}

.search-icon {
  opacity: 0.5;
  display: flex;
  align-items: center;
}

.search-box input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 0 8px;
  font-size: 18px;
  outline: none;
  color: #333;
}

.search-box input::placeholder {
  color: #333;
  opacity: 0.5;
}

.search-btn {
  border: none;
  background: transparent;
  color: #d50100;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
}

/* 课程列表 */
.course-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px;
}

/* 加载状态 */
.loading-container,
.empty-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 0;
  min-height: 400px;
}

.loading-text,
.empty-text {
  font-size: 18px;
  color: #999;
}
</style>

