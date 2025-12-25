<template>
  <div class="excellent-courses-page">
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <span class="breadcrumb__item">您的位置： </span>
      <span class="breadcrumb__item">习思想的伟大实践</span>
      <span class="breadcrumb__separator">>> </span>
      <span class="breadcrumb__item">优秀思政课堂</span>
      <span class="breadcrumb__separator">>> </span>
      <span class="breadcrumb__current">更多视频</span>
    </div>

    <!-- 页面标题 -->
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
        <h1>优秀思政课堂</h1>
        <div class="page-title__icon">
          <img src="/images/xiaohui2.png" alt="" />
        </div>
      </div>
    </div>

    <!-- 课堂目录和搜索 -->
    <div class="course-header">
      <div class="course-header__left">
        <svg class="course-header__icon" width="38" height="35" viewBox="0 0 38 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 0L0 10L19 20L38 10L19 0Z" fill="#BE2B28"/>
          <path d="M0 20L19 30L38 20" stroke="#BE2B28" stroke-width="2"/>
        </svg>
        <h2 class="course-header__title">课堂目录</h2>
        <p class="course-header__count">
          <span>共计收录 </span>
          <span class="highlight">{{ total }}个 </span>
          <span>视频</span>
        </p>
      </div>
      <div class="course-header__search">
        <div class="search-input">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#333333" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17.5 17.5L13.875 13.875" stroke="#333333" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
      >
        <div class="course-card__image">
          <img :src="course.cover" alt="" />
        </div>
        <div class="course-card__content">
          <div class="course-card__header">
            <h3 class="course-card__title">{{ course.title }}</h3>
            <div class="course-card__views">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 7C8.61929 7 7.5 8.11929 7.5 9.5C7.5 10.8807 8.61929 12 10 12C11.3807 12 12.5 10.8807 12.5 9.5C12.5 8.11929 11.3807 7 10 7Z" fill="#333333" fill-opacity="0.5"/>
                <path d="M10 4.16667C5.83333 4.16667 2.27500 6.73333 0.833336 10.4167C2.27500 14.1 5.83333 16.6667 10 16.6667C14.1667 16.6667 17.725 14.1 19.1667 10.4167C17.725 6.73333 14.1667 4.16667 10 4.16667ZM10 14.5C7.51667 14.5 5.5 12.4833 5.5 10C5.5 7.51667 7.51667 5.5 10 5.5C12.4833 5.5 14.5 7.51667 14.5 10C14.5 12.4833 12.4833 14.5 10 14.5Z" fill="#333333" fill-opacity="0.5"/>
              </svg>
              <span>{{ course.views }}人</span>
            </div>
          </div>
          <p class="course-card__description">{{ course.description }}</p>
          <div class="course-card__info">
            <div class="course-card__info-item">
              <span>课程名称：{{ course.courseName }}</span>
            </div>
            <div class="course-card__info-item">
              <span>授课老师：{{ course.teacher }}</span>
            </div>
            <div class="course-card__info-item">
              <span>授课时间：{{ course.semester }}</span>
            </div>
            <div class="course-card__info-item">
              <span>推荐督导员：{{ course.supervisor }}</span>
            </div>
            <div class="course-card__info-item">
              <span>发布时间：{{ course.publishTime }}</span>
            </div>
          </div>
          <button class="course-card__watch-btn" @click="watchCourse(course)">
            观看
          </button>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>

    <!-- 空状态 -->
    <div v-if="!loading && courses.length === 0" class="empty-state">
      <p>暂无课程数据</p>
    </div>

    <!-- 分页 -->
    <!-- <div v-if="!loading && courses.length > 0" class="pagination">
      <button
        class="pagination__btn"
        :disabled="currentPage === 1"
        @click="prevPage"
      >
        上一页
      </button>
      <div class="pagination__info">
        第 {{ currentPage }} / {{ totalPages }} 页（共 {{ total }} 条）
      </div>
      <button
        class="pagination__btn"
        :disabled="currentPage >= totalPages"
        @click="nextPage"
      >
        下一页
      </button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getNiceCoursePageList, type NiceCourseItem } from '@/api/resource'

// 课程数据
interface CourseItem {
  id: string
  title: string
  cover: string
  courseName: string
  teacher: string
  semester: string
  supervisor: string
  publishTime: string
  views: number
  description: string
  playUrl?: string
}

const courses = ref<CourseItem[]>([])
const loading = ref(false)
const searchKeyword = ref('')

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const totalPages = ref(1)

// 获取课程列表
const fetchCourses = async () => {
  try {
    loading.value = true
    const response = await getNiceCoursePageList({
      pageIndex: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchKeyword.value || undefined,
      showFront: 1 // 固定传递1，只显示前台展示的内容
    })
    
    // 数据映射
    const mappedData = response.records.map((item: NiceCourseItem) => ({
      id: String(item.id),
      title: item.title,
      cover: item.picUrls && item.picUrls.length > 0 ? item.picUrls[0] : '/images/home/video-1.jpg',
      courseName: item.name,
      teacher: item.teacher,
      semester: item.teachingTime,
      supervisor: item.director,
      publishTime: item.createTime,
      views: 3456, // API 返回中没有观看人数，使用默认值
      description: item.brief || '高校军事理论课肩负着传承军事智慧，培育国防素养的重要使命，是提升当代大学生国防观念，增强民族自豪感的重要途径。本期教学督导表扬的优秀课堂授课教师，在课堂教学中大胆改革与创新，将AI技术融入教学实践，实现课堂"赋能"。她通过动态问题链激发学生探索兴趣，',
      playUrl: item.playUrl
    }))

    courses.value = mappedData
    total.value = response.total
    totalPages.value = response.pages
  } catch (error) {
    console.error('获取课程列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  console.log('搜索关键词:', searchKeyword.value)
  currentPage.value = 1 // 搜索时重置到第一页
  fetchCourses()
}

// 观看课程
const watchCourse = (course: CourseItem) => {
  console.log('观看课程:', course)
  if (course.playUrl) {
    window.open(course.playUrl, '_blank')
  } else {
    console.warn('课程没有播放地址')
  }
}

// 分页
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchCourses()
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchCourses()
  }
}

// 挂载时获取数据
onMounted(() => {
  fetchCourses()
})
</script>

<style scoped>
.excellent-courses-page {
  width: 100%;
  min-height: 100vh;
  background: #fff9ed;
  padding: 48px 160px 72px;
  position: relative;
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

.breadcrumb__item {
  color: #333;
  opacity: 0.5;
}

.breadcrumb__separator {
  color: #333;
  opacity: 0.5;
}

.breadcrumb__current {
  color: #bc2220;
}

/* 页面标题 */
.page-title {
  position: relative;
  width: 306.566px;
  height: 78px;
  margin: 0 auto 48px;
}

.page-title__bg {
  position: absolute;
  top: 0;
  left: 42.08%;
  right: 42.26%;
  aspect-ratio: 1;
  opacity: 0.2;
}

.page-title__bg img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.page-title__left {
  position: absolute;
  bottom: -15%;
  left: 0;
  right: 70%;
  top: 30.77%;
}

.page-title__left svg {
  width: 100%;
  height: 100%;
}

.page-title__right {
  position: absolute;
  bottom: -15%;
  left: 70%;
  right: 0;
  top: 30.77%;
}

.page-title__right svg {
  width: 100%;
  height: 100%;
}

.page-title__text {
  position: absolute;
  bottom: 0;
  left: 39.56%;
  right: 39.56%;
  top: calc(50% + 12px);
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-title__text h1 {
  margin: 0;
  font-size: 24px;
  font-family: 'Source Han Serif CN', serif;
  font-weight: 700;
  color: #bc2220;
  line-height: normal;
  white-space: nowrap;
  letter-spacing: 3.84px;
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

/* 课堂目录和搜索 */
.course-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  flex-shrink: 0;
}

.course-header__title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #be2b28;
  line-height: normal;
}

.course-header__count {
  margin: 0;
  font-size: 18px;
  color: #333;
  line-height: normal;
}

.course-header__count .highlight {
  color: #bc2220;
}

.course-header__search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border-radius: 100px;
  padding: 8px 16px;
  width: 320px;
}

.search-input {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0.5;
}

.search-input input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 18px;
  color: #333;
}

.search-input input::placeholder {
  color: #333;
  opacity: 1;
}

.search-btn {
  background: transparent;
  border: none;
  color: #d50100;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
}

/* 课程列表 */
.course-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px;
  margin-bottom: 48px;
}

/* 课程卡片 */
.course-card {
  display: flex;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.course-card__image {
  width: 240px;
  flex-shrink: 0;
  background: #d9d9d9;
}

.course-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-card__content {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}

.course-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
}

.course-card__title {
  flex: 1;
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  line-height: 1.4;
}

.course-card__views {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  opacity: 0.5;
}

.course-card__views span {
  font-size: 14px;
  color: #333;
}

.course-card__description {
  flex: 1;
  margin: 0;
  font-size: 14px;
  color: #333;
  opacity: 0.5;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.course-card__info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.course-card__info-item {
  font-size: 14px;
  color: #333;
}

.course-card__watch-btn {
  position: absolute;
  right: 16px;
  bottom: 16px;
  padding: 12px 48px;
  background: #bc2220;
  color: white;
  border: none;
  border-radius: 100px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.course-card__watch-btn:hover {
  transform: scale(1.05);
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
  opacity: 0.8;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-top: 48px;
}

.pagination__btn {
  padding: 12px 24px;
  background: #bc2220;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.pagination__btn:hover:not(:disabled) {
  opacity: 0.8;
}

.pagination__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination__info {
  font-size: 16px;
  color: #333;
}
</style>

