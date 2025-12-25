<template>
  <div class="college-special-more-page">
    <!-- 背景 -->
    <div class="college-special-bg"></div>

    <!-- 主要内容 -->
    <div class="college-special-container">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <span class="breadcrumb-item">您的位置： </span>
        <span class="breadcrumb-item" @click="$router.push('/study')">习思想的伟大实践</span>
        <span class="breadcrumb-separator">>> </span>
        <span class="breadcrumb-item" @click="$router.push('/study')">习思想融入学科教学实践示范案例展播</span>
        <span class="breadcrumb-separator">>> </span>
        <span class="breadcrumb-item active">更多视频</span>
      </div>

      <!-- 页面标题 -->
      <div class="page-title-section">
        <div class="page-title">
          <div class="page-title__bg">
            <img src="/images/xiaohui1.png" alt="" />
          </div>
          <div class="page-title__left">
            <svg xmlns="http://www.w3.org/2000/svg" width="122" height="37" viewBox="0 0 122 37" fill="none">
              <path d="M55.4995 25.1402C58.5629 25.1402 60.8086 22.6335 60.8086 19.5701C60.8086 16.5068 58.565 14 55.4995 14" stroke="#BC2220" stroke-linejoin="round"/>
              <path d="M54.8086 36.2809C51.7452 36.2809 49.4995 33.7741 49.4995 30.7108C49.4995 27.6474 51.7431 25.1406 54.8086 25.1406" stroke="#BC2220" stroke-linejoin="round"/>
              <path d="M121.283 36.2801L50.4349 36.2805C47.3715 36.2805 44.8647 33.7737 44.8647 30.7104C44.8647 27.647 47.3715 25.1402 50.4349 25.1402H58H51.8651H59.4303C62.4936 25.1402 65.0004 22.6335 65.0004 19.5701C65.0004 16.5068 62.4936 14 59.4303 14L0 14" stroke="#BC2220" stroke-linejoin="round"/>
              <path d="M102.5 36.8879H81.5V36.2697C81.5 30.6064 86.2102 25.999 92 25.999C97.7898 25.999 102.5 30.6064 102.5 36.2697V36.8879ZM82.7825 35.6537H101.215C100.89 30.9583 96.8809 27.2355 91.9977 27.2355C87.1145 27.2355 83.1054 30.9583 82.7802 35.6537" fill="#BC2220"/>
              <path d="M98.6109 36.8894H85.3887V36.2693C85.3887 32.7501 88.3548 29.8894 91.9986 29.8894C95.6424 29.8894 98.6085 32.7523 98.6085 36.2693V36.8894H98.6109ZM86.7111 35.6514H97.2884C96.9719 33.1076 94.7209 31.1296 92.001 31.1296C89.281 31.1296 87.03 33.1076 86.7111 35.6514Z" fill="#BC2220"/>
              <path d="M95.4854 36.7893H88.4854V36.4448C88.4854 34.4896 90.0557 32.9004 91.9847 32.9004C93.9138 32.9004 95.4841 34.4909 95.4841 36.4448V36.7893H95.4854ZM89.1855 36.1015H94.7852C94.6176 34.6883 93.426 33.5894 91.986 33.5894C90.546 33.5894 89.3543 34.6883 89.1855 36.1015Z" fill="#BC2220"/>
              <path d="M44.5 14H17.5V13.2051C17.5 5.92375 23.556 0 31 0C38.444 0 44.5 5.92375 44.5 13.2051V14ZM19.1489 12.4132H42.8481C42.4299 6.37627 37.2755 1.58972 30.997 1.58972C24.7186 1.58972 19.5641 6.37627 19.146 12.4132" fill="#BC2220"/>
              <path d="M39.5 14H22.5V13.2027C22.5 8.67799 26.3136 5 30.9985 5C35.6834 5 39.497 8.6809 39.497 13.2027V14H39.5ZM24.2003 12.4083H37.7997C37.3927 9.13771 34.4986 6.59456 31.0015 6.59456C27.5045 6.59456 24.6103 9.13771 24.2003 12.4083Z" fill="#BC2220"/>
              <path d="M35.4805 13.8691H26.4805V13.4262C26.4805 10.9125 28.4995 8.86914 30.9797 8.86914C33.4599 8.86914 35.4789 10.9141 35.4789 13.4262V13.8691H35.4805ZM27.3806 12.9849H34.5803C34.3648 11.1679 32.8327 9.75501 30.9813 9.75501C29.1299 9.75501 27.5977 11.1679 27.3806 12.9849Z" fill="#BC2220"/>
            </svg>
          </div>
          <div class="page-title__right">
            <svg xmlns="http://www.w3.org/2000/svg" width="122" height="37" viewBox="0 0 122 37" fill="none">
              <path d="M65.7837 25.1402C62.7203 25.1402 60.4746 22.6335 60.4746 19.5701C60.4746 16.5068 62.7182 14 65.7837 14" stroke="#BC2220" stroke-linejoin="round"/>
              <path d="M66.4746 36.2809C69.538 36.2809 71.7837 33.7741 71.7837 30.7108C71.7837 27.6474 69.5401 25.1406 66.4746 25.1406" stroke="#BC2220" stroke-linejoin="round"/>
              <path d="M0 36.2801L70.8484 36.2805C73.9117 36.2805 76.4185 33.7737 76.4185 30.7104C76.4185 27.647 73.9117 25.1402 70.8484 25.1402H63.2832H69.4181H61.8529C58.7896 25.1402 56.2828 22.6335 56.2828 19.5701C56.2828 16.5068 58.7896 14 61.8529 14L121.283 14" stroke="#BC2220" stroke-linejoin="round"/>
              <path d="M18.7832 36.8879H39.7832V36.2697C39.7832 30.6064 35.073 25.999 29.2832 25.999C23.4934 25.999 18.7832 30.6064 18.7832 36.2697V36.8879ZM38.5007 35.6537H20.068C20.3933 30.9583 24.4023 27.2355 29.2855 27.2355C34.1687 27.2355 38.1778 30.9583 38.503 35.6537" fill="#BC2220"/>
              <path d="M22.6723 36.8894H35.8945V36.2693C35.8945 32.7501 32.9284 29.8894 29.2846 29.8894C25.6408 29.8894 22.6747 32.7523 22.6747 36.2693V36.8894H22.6723ZM34.5721 35.6514H23.9948C24.3113 33.1076 26.5623 31.1296 29.2822 31.1296C32.0022 31.1296 34.2532 33.1076 34.5721 35.6514Z" fill="#BC2220"/>
              <path d="M25.7979 36.7893H32.7979V36.4448C32.7979 34.4896 31.2275 32.9004 29.2985 32.9004C27.3694 32.9004 25.7991 34.4909 25.7991 36.4448V36.7893H25.7979ZM32.0977 36.1015H26.498C26.6656 34.6883 27.8573 33.5894 29.2972 33.5894C30.7372 33.5894 31.9289 34.6883 32.0977 36.1015Z" fill="#BC2220"/>
              <path d="M76.7832 14H103.783V13.2051C103.783 5.92375 97.7272 0 90.2832 0C82.8392 0 76.7832 5.92375 76.7832 13.2051V14ZM102.134 12.4132H78.4351C78.8533 6.37627 84.0077 1.58972 90.2862 1.58972C96.5646 1.58972 101.719 6.37627 102.137 12.4132" fill="#BC2220"/>
              <path d="M81.7832 14H98.7832V13.2027C98.7832 8.67799 94.9696 5 90.2847 5C85.5998 5 81.7862 8.6809 81.7862 13.2027V14H81.7832ZM97.0829 12.4083H83.4835C83.8905 9.13771 86.7846 6.59456 90.2817 6.59456C93.7787 6.59456 96.6729 9.13771 97.0829 12.4083Z" fill="#BC2220"/>
              <path d="M85.8027 13.8691H94.8027V13.4262C94.8027 10.9125 92.7837 8.86914 90.3035 8.86914C87.8233 8.86914 85.8043 10.9141 85.8043 13.4262V13.8691H85.8027ZM93.9026 12.9849H86.7029C86.9184 11.1679 88.4505 9.75501 90.3019 9.75501C92.1533 9.75501 93.6855 11.1679 93.9026 12.9849Z" fill="#BC2220"/>
            </svg>
          </div>
          <div class="page-title__text">
            <h1>一院一品课程思政优秀示范案例展播</h1>
            <div class="page-title__icon">
              <img src="/images/xiaohui2.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <!-- 筛选区域 -->
      <div class="filter-section">
        <!-- 课程类型 -->
        <div class="filter-row">
          <span class="filter-label">课程类型：</span>
          <div class="filter-options">
            <button 
              v-for="type in courseTypes" 
              :key="type"
              class="filter-btn"
              :class="{ active: activeCourseType === type }"
              @click="handleTypeChange(type)"
            >
              {{ type }}
            </button>
          </div>
        </div>

        <!-- 学院名称 -->
        <div class="filter-row">
          <span class="filter-label">学院名称：</span>
          <div class="filter-options">
            <button 
              v-for="(college, index) in collegeOptions.slice(0, 7)" 
              :key="college"
              class="filter-btn"
              :class="{ active: activeCollege === college }"
              @click="handleCollegeChange(college)"
            >
              {{ college }}
            </button>
          </div>
        </div>

        <!-- 学院名称 - 第2行 -->
        <div class="filter-row">
          <span class="filter-label" style="opacity: 0">学院名称：</span>
          <div class="filter-options">
            <button 
              v-for="college in collegeOptions.slice(7, 14)" 
              :key="college"
              class="filter-btn"
              :class="{ active: activeCollege === college }"
              @click="handleCollegeChange(college)"
            >
              {{ college }}
            </button>
          </div>
        </div>

        <!-- 学院名称 - 第3行 -->
        <div class="filter-row">
          <span class="filter-label" style="opacity: 0">学院名称：</span>
          <div class="filter-options">
            <button 
              v-for="college in collegeOptions.slice(14)" 
              :key="college"
              class="filter-btn"
              :class="{ active: activeCollege === college }"
              @click="handleCollegeChange(college)"
            >
              {{ college }}
            </button>
          </div>
        </div>
      </div>

      <!-- 目录标题和搜索 -->
      <div class="course-header">
        <div class="course-header__left">
          <img src="/images/gailanmulu_icon.png" alt="" class="course-header__icon" />
          <h2 class="course-header__title">展播目录</h2>
          <p class="course-header__count">
            <span>共计收录 </span>
            <span class="highlight">{{ total }}个 </span>
            <span>视频</span>
          </p>
        </div>
        <div class="course-header__search">
          <div class="search-input">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#333333" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17.5 17.5L13.875 13.875" stroke="#333333" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <input
              v-model="searchKeyword"
              type="text"
              placeholder="请输入"
              @keyup.enter="handleSearch"
            />
          </div>
          <button class="search-btn" @click="handleSearch">搜索</button>
        </div>
      </div>

      <!-- 课程列表 -->
      <div class="course-list" v-if="!loading && courses.length > 0">
        <div
          v-for="course in courses"
          :key="course.id"
          class="course-card"
          @click="handleCourseClick(course)"
        >
          <div class="course-card__image">
            <img :src="course.coverUrl || '/images/home/video-1.jpg'" alt="" />
            <div class="course-card__badge">{{ course.college }}</div>
          </div>
          <div class="course-card__content">
            <h3 class="course-card__title">{{ course.name }}</h3>
            <div class="course-card__footer">
              <span class="course-card__teacher">教师：{{ course.teachers.join('、') || '未知' }}</span>
              <div class="course-card__views">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 7C8.61929 7 7.5 8.11929 7.5 9.5C7.5 10.8807 8.61929 12 10 12C11.3807 12 12.5 10.8807 12.5 9.5C12.5 8.11929 11.3807 7 10 7Z" fill="#333333" fill-opacity="0.5"/>
                  <path d="M10 4.16667C5.83333 4.16667 2.27500 6.73333 0.833336 10.4167C2.27500 14.1 5.83333 16.6667 10 16.6667C14.1667 16.6667 17.725 14.1 19.1667 10.4167C17.725 6.73333 14.1667 4.16667 10 4.16667ZM10 14.5C7.51667 14.5 5.5 12.4833 5.5 10C5.5 7.51667 7.51667 5.5 10 5.5C12.4833 5.5 14.5 7.51667 14.5 10C14.5 12.4833 12.4833 14.5 10 14.5Z" fill="#333333" fill-opacity="0.5"/>
                </svg>
                <span>{{ course.statPv || 3456 }}人</span>
              </div>
            </div>
          </div>
        </div>
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

      <!-- 分页 -->
      <div class="pagination" v-if="!loading && courses.length > 0 && totalPages > 1">
        <button 
          class="pagination-btn" 
          :disabled="currentPage === 1"
          @click="handlePageChange(currentPage - 1)"
        >
          上一页
        </button>
        <div class="pagination-pages">
          <button
            v-for="page in visiblePages"
            :key="page"
            class="pagination-page"
            :class="{ active: page === currentPage }"
            @click="handlePageChange(page)"
          >
            {{ page }}
          </button>
        </div>
        <button 
          class="pagination-btn" 
          :disabled="currentPage === totalPages"
          @click="handlePageChange(currentPage + 1)"
        >
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getCollegePageList, type CollegeItem } from '@/api/college'

const router = useRouter()

// 筛选状态
const activeCourseType = ref('全部')
const activeCollege = ref('全部')
const searchKeyword = ref('')

// 课程列表数据
const courses = ref<CollegeItem[]>([])
const loading = ref(false)

// 分页
const currentPage = ref(1)
const pageSize = ref(16) // 4列 x 4行
const total = ref(0)
const totalPages = ref(1)

// 课程类型选项
const courseTypes = [
  '全部',
  '通识教育课程',
  '学科基础课程',
  '专业必修课',
  '专业选修课',
  '跨学科或本硕博课程'
]

// 学院选项（与设计稿保持一致）
const collegeOptions = [
  '全部',
  '电气工程与自动化学院',
  '机械工程及自动化学院',
  '数学与统计学院',
  '化工学院',
  '土木工程学院',
  '环境与安全工程学院',
  '经济与管理学院',
  '生物科学与工程学院',
  '外国语学院',
  '计算机与大数据学院',
  '物理与信息工程学院',
  '化学学院',
  '建筑与城乡规划学院',
  '紫金地质与矿业学院',
  '厦门工艺美术学院',
  '材料科学与工程学院',
  '法学院',
  '海洋学院（先进制造学院）',
  '人文社会科学学院',
  '体育教学研究部',
  '军事教研室'
]

// 获取课程列表
const fetchCourses = async () => {
  try {
    loading.value = true
    const params: any = {
      pageIndex: currentPage.value,
      pageSize: pageSize.value,
      showFront: 1 // 只显示前台展示的内容
    }

    // 添加筛选条件
    if (activeCollege.value && activeCollege.value !== '全部') {
      params.college = activeCollege.value
    }

    // 添加搜索关键字
    if (searchKeyword.value && searchKeyword.value.trim()) {
      params.keyword = searchKeyword.value.trim()
    }

    const response = await getCollegePageList(params)
    
    // 如果选择了课程类型，前端进行筛选（因为API可能不支持类型筛选）
    let filteredCourses = response.records
    if (activeCourseType.value && activeCourseType.value !== '全部') {
      filteredCourses = response.records.filter(course => 
        course.types && course.types.includes(activeCourseType.value)
      )
    }

    courses.value = filteredCourses
    total.value = activeCourseType.value !== '全部' ? filteredCourses.length : response.total
    totalPages.value = response.pages
  } catch (error) {
    console.error('获取一院一品课程列表失败:', error)
    courses.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

// 监听筛选条件变化
watch([activeCourseType, activeCollege], () => {
  currentPage.value = 1 // 重置到第一页
  fetchCourses()
})

// 组件挂载时获取数据
onMounted(() => {
  fetchCourses()
})

// 处理课程类型变化
const handleTypeChange = (type: string) => {
  activeCourseType.value = type
}

// 处理学院变化
const handleCollegeChange = (college: string) => {
  activeCollege.value = college
}

// 处理搜索
const handleSearch = () => {
  currentPage.value = 1
  fetchCourses()
}

// 处理课程点击
const handleCourseClick = (course: CollegeItem) => {
  router.push(`/study/college-special/${course.id}`)
}

// 处理分页变化
const handlePageChange = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  fetchCourses()
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 可见的分页按钮
const visiblePages = computed(() => {
  const pages: number[] = []
  const maxVisible = 7
  
  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    if (currentPage.value <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push(-1) // 省略号占位符
      pages.push(totalPages.value)
    } else if (currentPage.value >= totalPages.value - 3) {
      pages.push(1)
      pages.push(-1)
      for (let i = totalPages.value - 4; i <= totalPages.value; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push(-1)
      for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) {
        pages.push(i)
      }
      pages.push(-1)
      pages.push(totalPages.value)
    }
  }
  
  return pages
})
</script>

<style scoped>
.college-special-more-page {
  width: 100%;
  min-height: 100vh;
  background: #fff9ed;
  position: relative;
  overflow-x: hidden;
}

.college-special-bg {
  position: fixed;
  top: 80px;
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

.college-special-container {
  position: relative;
  max-width: 1600px;
  margin: 0 auto;
  padding: 72px 0;
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
  margin-bottom: 48px;
}

.breadcrumb-item {
  color: #333;
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.3s ease;
  white-space: nowrap;
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

/* 页面标题区域 */
.page-title-section {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.page-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 78px;
}

.page-title__bg {
  position: absolute;
  left: 50%;
  top: -35px;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  opacity: 0.2;
  pointer-events: none;
}

.page-title__bg img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.page-title__left,
.page-title__right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.page-title__left {
  right: calc(50% + 210px);
}

.page-title__right {
  left: calc(50% + 210px);
}

.page-title__text {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  z-index: 2;
}

.page-title__text h1 {
  margin: 0;
  font-size: 24px;
  font-family: 'Source Han Serif CN', sans-serif;
  font-weight: bold;
  color: #bc2220;
  line-height: normal;
  letter-spacing: 3.84px;
  white-space: nowrap;
}

.page-title__icon {
  width: 20px;
  height: 20px;
}

.page-title__icon img {
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
  align-items: center;
  gap: 24px;
}

.filter-label {
  font-size: 18px;
  font-family: 'Source Han Sans CN', sans-serif;
  color: #333;
  white-space: nowrap;
  flex-shrink: 0;
}

.filter-options {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: nowrap;
}

.filter-btn {
  padding: 8px 24px;
  font-size: 18px;
  font-family: 'Source Han Sans CN', sans-serif;
  color: #333;
  background: transparent;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.5;
  white-space: nowrap;
  flex-shrink: 0;
}

.filter-btn:hover {
  opacity: 0.7;
}

.filter-btn.active {
  background: #bc2220;
  color: white;
  opacity: 1;
}

/* 课程列表头部 */
.course-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 48px;
}

.course-header__left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.course-header__icon {
  width: 38px;
  height: 35px;
  object-fit: contain;
}

.course-header__title {
  margin: 0;
  font-size: 24px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: bold;
  color: #be2b28;
  line-height: normal;
}

.course-header__count {
  margin: 0;
  font-size: 18px;
  font-family: 'Source Han Sans CN', sans-serif;
  color: #333;
  line-height: normal;
}

.course-header__count .highlight {
  color: #bc2220;
}

/* 搜索框 */
.course-header__search {
  display: flex;
  align-items: center;
  gap: 0;
  background: white;
  border-radius: 100px;
  padding: 8px 16px;
  width: 320px;
}

.search-input {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
}

.search-input svg {
  flex-shrink: 0;
  opacity: 0.5;
}

.search-input input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 18px;
  font-family: 'Source Han Sans CN', sans-serif;
  color: #333;
  background: transparent;
}

.search-input input::placeholder {
  color: #333;
  opacity: 0.5;
}

.search-btn {
  padding: 0;
  border: none;
  background: transparent;
  font-size: 18px;
  font-family: 'Source Han Sans CN', sans-serif;
  color: #d50100;
  cursor: pointer;
  transition: opacity 0.3s ease;
  flex-shrink: 0;
}

.search-btn:hover {
  opacity: 0.8;
}

/* 课程列表 */
.course-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px;
  margin-bottom: 48px;
}

.course-card {
  display: flex;
  flex-direction: column;
  height: 319px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.course-card:hover {
  transform: translateY(-4px);
}

.course-card__image {
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
}

.course-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-card__badge {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  font-family: 'Source Han Sans CN', sans-serif;
  color: white;
  line-height: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.course-card__content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 0 0 8px 8px;
  flex: 1;
}

.course-card__title {
  margin: 0;
  font-size: 18px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: 500;
  color: #333;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 50px;
}

.course-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.course-card__teacher {
  font-size: 14px;
  font-family: 'Source Han Sans CN', sans-serif;
  color: #333;
  opacity: 0.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.course-card__views {
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0.5;
  flex-shrink: 0;
}

.course-card__views svg {
  flex-shrink: 0;
}

.course-card__views span {
  font-size: 14px;
  font-family: 'Source Han Sans CN', sans-serif;
  color: #333;
  white-space: nowrap;
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

/* 分页 */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 48px;
}

.pagination-btn {
  padding: 8px 16px;
  font-size: 14px;
  font-family: 'Source Han Sans CN', sans-serif;
  color: #333;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  color: #bc2220;
  border-color: #bc2220;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-pages {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination-page {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  font-size: 14px;
  font-family: 'Source Han Sans CN', sans-serif;
  color: #333;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-page:hover {
  color: #bc2220;
  border-color: #bc2220;
}

.pagination-page.active {
  color: white;
  background: #bc2220;
  border-color: #bc2220;
}

.pagination-page:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

