<template>
  <div class="overview">
    <!-- 背景图层 -->
    <div class="overview__bg">
      <!-- 复用首页背景或特定背景 -->
      <img src="/images/indexBg.png" alt="" />
    </div>

    <div class="overview__container">
      <!-- 页面标题 -->
      <div class="overview__page-header">
        <div class="overview__title-wrapper">
          <div class="overview__title-bg">
            <img src="/images/xiaohui1.png" alt="" />
          </div>
          <div class="overview__title-left">
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
          <div class="overview__title-right">
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
          <div class="overview__title-content">
            <h1 class="overview__title">{{ pageTitle }}</h1>
            <div class="overview__title-icon">
              <img src="/images/xiaohui2.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <!-- 上部：目录与视频 -->
      <section class="overview__hero">
        <!-- 柱子装饰图 -->
        <img src="/images/zhuzi.png" alt="" class="overview__pillar" />
        <img src="/images/piaodai1.png" alt="" class="overview__piaodai1" />

        <!-- 左侧目录 -->
        <div class="overview__menu">
          <!-- 背景图 -->
          <div class="overview__menu-bg">
            <img src="/images/overview__menu_BG1.png" alt="" />
          </div>
          <div class="overview__menu-bg2">
            <img src="/images/overview__menu_BG2.png" alt="" />
          </div>

          <div class="overview__menu-header">
            <!-- 图标暂时用 SVG 模拟 -->
            <img width="38px" height="35px" src="/images/gailanmulu_icon.png" alt="">
            <h2 class="overview__menu-title">概览目录</h2>
          </div>
          
          <div class="overview__menu-list">
            <div 
              v-for="(item, index) in menuItems" 
              :key="item.id"
              class="overview__menu-item"
              :class="{ 'overview__menu-item--active': activeMenu === index }"
              @click="activeMenu = index"
            >
              <div class="overview__menu-indicator"></div>
              <div class="overview__menu-content">
                <div class="overview__menu-top">
                  <h3 class="overview__menu-name">{{ item.title }}</h3>
                  <div class="overview__menu-status" v-if="activeMenu === index">
                    <span>正在播放..</span>
                  </div>
                  <div class="overview__menu-status" v-else>
                    <span>播放视频</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4L11 8L6 12V4Z" fill="#BC2220"/>
                    </svg>
                  </div>
                </div>
                <p class="overview__menu-desc">{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧视频 -->
        <div class="overview__video">
          <div class="overview__player">
            <video 
              :key="currentVideoUrl"
              class="overview__video-content"
              controls
              :src="currentVideoUrl"
            >
            </video>
          </div>
        </div>
      </section>

      <!-- 下部：课程展示 -->
      <section class="overview__courses">
        <div class="overview__courses-header">
          <div class="overview__courses-title-wrapper">
            <h2 class="overview__courses-title">{{ coursesTitle }}</h2>
            <img src="/images/xiaohui2.png" alt="" class="overview__courses-icon" />
          </div>
          
          <button class="overview__courses-more">
            <span>查看更多</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="#333333" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <div class="overview__courses-grid">
          <CourseCard
            v-for="course in courseList"
            :key="course.id"
            :course="course"
            :badge="course.badge as string"
            @click="handleCourseClick(course)"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import CourseCard from '@/components/common/CourseCard/index.vue'
import type { Course } from '@/types'
import { getTitles, getPoliticalCourseList, getCourseExpoList, type PoliticalCourseItem, type CourseExpoItem } from '@/api/course'

const router = useRouter()

/**
 * 概览页面
 */

// 标题数据
const pageTitle = ref('"党建+课程思政"工作概览')
const coursesTitle = ref('党员教师课程思政示范课展播')

// 获取标题
const fetchTitles = async () => {
  try {
    const titles = await getTitles()
    titles.forEach(item => {
      if (item.code === 'political_course') {
        pageTitle.value = item.title
      } else if (item.code === 'course_expo') {
        coursesTitle.value = item.title
      }
    })
  } catch (error) {
    console.error('获取标题失败:', error)
  }
}

// 目录数据
const menuItems = ref<PoliticalCourseItem[]>([])
const activeMenu = ref(0)

// 获取概览目录
const fetchPoliticalCourseList = async () => {
  try {
    const data = await getPoliticalCourseList()
    // 按 sort 字段排序
    menuItems.value = data.sort((a, b) => a.sort - b.sort)
    // 如果有数据，默认激活第一项
    if (menuItems.value.length > 0) {
      activeMenu.value = 0
    }
  } catch (error) {
    console.error('获取概览目录失败:', error)
  }
}

// 当前视频URL
const currentVideoUrl = computed(() => {
  if (menuItems.value.length > 0 && menuItems.value[activeMenu.value]) {
    return menuItems.value[activeMenu.value].videoUrl
  }
  return '/videos/hero-video.mp4' // 默认视频
})

// 课程列表数据（包含 badge）
interface CourseWithBadge extends Course {
  badge?: string
}
const courseList = ref<CourseWithBadge[]>([])

// 获取课程展播列表
const fetchCourseExpoList = async () => {
  try {
    const data = await getCourseExpoList()
    // 将 API 数据映射为 Course 格式
    courseList.value = data.map((item: CourseExpoItem) => ({
      id: item.id.toString(),
      title: item.name,
      cover: item.coverUrl,
      description: item.brief,
      level: 'national' as const,
      teacherList: item.teachers.map(t => ({
        id: '',
        name: t.name,
        title: '',
        department: item.college
      })),
      video: item.videoUrl,
      pdf: item.docUrl,
      sort: 0,
      status: 'published' as const,
      studentCount: item.statPv,
      chapterCount: 0,
      totalDuration: 0,
      tags: [],
      createTime: item.createTime,
      updateTime: item.createTime,
      badge: item.levelName
    }))
  } catch (error) {
    console.error('获取课程展播列表失败:', error)
  }
}

// 处理课程卡片点击
const handleCourseClick = (course: CourseWithBadge) => {
  router.push(`/study/video/${course.id}`)
}

onMounted(() => {
  fetchTitles()
  fetchPoliticalCourseList()
  fetchCourseExpoList()
})
</script>

<style scoped>
.overview {
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-bottom: 80px;
}

.overview__bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.overview__bg img {
  width: 100%;
  object-fit: cover;
  opacity: 0.1; /* 根据设计稿调整透明度 */
}

.overview__container {
  position: relative;
  max-width: 1920px;
  margin: 0 auto;
  padding: 80px 160px;
  z-index: 1;
}

/* 页面标题 */
.overview__page-header {
  display: flex;
  justify-content: center;
  margin-bottom: 72px;
}

.overview__title-wrapper {
  position: relative;
  width: 306.566px;
  height: 78px;
}

.overview__title-bg {
  position: absolute;
  top: 0;
  left: 42.08%;
  right: 42.26%;
  aspect-ratio: 1;
  opacity: 0.2;
}

.overview__title-bg img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.overview__title-left {
  position: absolute;
  bottom: 21.94%;
  left: -50px;
  right: auto;
  top: 30.77%;
}

.overview__title-right {
  position: absolute;
  bottom: 21.94%;
  right: -50px;
  left: auto;
  top: 30.77%;
}

.overview__title-content {
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

.overview__title {
  margin: 0;
  font-size: 24px;
  font-family: 'Source Han Serif CN', serif;
  font-weight: 700;
  color: #bc2220;
  line-height: normal;
  letter-spacing: 3.84px;
  white-space: nowrap;
}

.overview__title-icon {
  width: 20px;
  height: 20px;
  margin-top: 4px;
}

.overview__title-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 上部布局 */
.overview__hero {
  position: relative; /* 确保作为定位参考 */
  display: flex;
  gap: 48px;
  margin-bottom: 396px; /* 增加间距 (96 + 100) */
  align-items: flex-start;
}

.overview__pillar {
  position: absolute;
  left: -14%; /* 向左偏移，利用 padding 空间 */
  bottom: -40px; /* 稍微向下调整，或根据设计稿 */
  z-index: 2;
  pointer-events: none;
  height: 120%; /* 假设柱子比较高 */
  object-fit: contain;
  object-position: bottom;
  transform: scaleX(-1); /* 左右反转 */
}

.overview__piaodai1 {
  position: absolute;
  right: -260px; /* 向右偏移，对齐到容器边缘或浏览器边缘 */
  bottom: -150px; /* 位于视频播放器下方 */
  z-index: 2;
  pointer-events: none;
  /* 根据图片实际尺寸调整宽度，或者不设 */
  width: 1100px; 
  transform: scaleX(-1); /* 左右反转 */

}

/* 左侧目录 */
.overview__menu {
  top: 70px;
  right: -50px;

  /* left: 40px; */
  width: 598px;
  flex-shrink: 0;
  z-index: 5;
  position: relative;
  padding: 24px; /* 给背景图留出内边距，或者是背景图撑满 */
}

.overview__menu-bg {
  position: absolute;
  width: 100%;
  height: 534px;
  top: 0;
  left: 0;
  z-index: -1;
  border-radius: 8px;
  overflow: hidden;
}
.overview__menu-bg2 {
  position: absolute;
  width: 100%;
  top: 20px;
  z-index: -1;
  border-radius: 8px;
  overflow: hidden;
}

/* .overview__menu-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
} */

.overview__menu-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
}

.overview__menu-title {
  font-size: 24px;
  color: #BC2220;
  font-weight: 700;
  margin: 0;
}

.overview__menu-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.overview__menu-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 24px;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.overview__menu-item--active {
  background: #BC2220;
}

.overview__menu-indicator {
  width: 12px;
  height: 12px;
  background: #A00100;
  margin-top: 6px;
  flex-shrink: 0;
}

.overview__menu-item--active .overview__menu-indicator {
  background: #FFFFFF;
}

.overview__menu-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.overview__menu-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.overview__menu-name {
  font-size: 20px;
  font-weight: 700;
  color: #BC2220;
  margin: 0;
}

.overview__menu-item--active .overview__menu-name {
  color: #FFFFFF;
}

.overview__menu-status {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  color: #BC2220;
}

.overview__menu-item--active .overview__menu-status {
  color: #FFFFFF;
}

.overview__menu-desc {
  font-size: 16px;
  color: #333333;
  opacity: 0.5;
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.overview__menu-item--active .overview__menu-desc {
  color: #FFFFFF;
  opacity: 1;
}

/* 右侧视频 */
.overview__video {
  flex: 1;
  background: #952322;
  padding: 16px;
  border-radius: 8px;
  z-index: 5;
}

.overview__player {
  width: 100%;
  aspect-ratio: 16/9;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}

.overview__video-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 课程列表 */
.overview__courses {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.overview__courses-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
  padding-bottom: 20px;
}

.overview__courses-title-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}

.overview__courses-title {
  font-size: 24px;
  font-family: 'Source Han Serif CN', serif;
  font-weight: 700;
  color: #BC2220;
  letter-spacing: 3.84px;
  margin-bottom: 8px;
}

.overview__courses-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.overview__courses-more {
  position: absolute;
  right: 0;
  bottom: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 16px;
  color: #333333;
  opacity: 0.7;
}

.overview__courses-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px;
}
</style>
