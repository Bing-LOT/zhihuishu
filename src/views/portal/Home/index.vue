<template>
  <div class="home">
    <!-- 英雄横幅区 -->
    <section class="home__hero">
      <!-- 背景图容器 -->
      <div class="home__hero-background">
        <img src="/images/image 947.png" alt="背景" class="home__hero-bg-image" />
      </div>

      <!-- 主标题图 -->
      <div class="home__hero-title">
        <h1 class="home__hero-title-text">
          <span>不忘初心</span>
          <span>牢记使命</span>
        </h1>
      </div>

      <!-- 轮播指示器 -->
      <div class="home__hero-indicators">
        <button
          v-for="(banner, index) in banners"
          :key="banner.id"
          class="home__hero-indicator"
          :class="{ 'home__hero-indicator--active': currentBanner === index }"
          @click="goToBanner(index)"
        ></button>
      </div>

      <!-- 左侧箭头按钮 -->
      <button class="home__hero-prev" @click="prevBanner" aria-label="上一张">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M20 24L12 16L20 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <!-- 右侧箭头按钮 -->
      <button class="home__hero-next" @click="nextBanner" aria-label="下一张">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M12 24L20 16L12 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <!-- 滚动继续提示 -->
      <button class="home__scroll-hint" @click="scrollToVideo">
        <span>滚动继续</span>
        <div class="home__scroll-icon">
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <path d="M8 0V16M8 16L1 9M8 16L15 9" stroke="#bc2220" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </button>
    </section>

    <!-- 视频展示区 -->
    <section ref="videoSection" class="home__video">
      <!-- 背景视频 -->
      <div class="home__video-background">
        <video
          ref="backgroundVideo"
          autoplay
          loop
          muted
          playsinline
          class="home__video-bg"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        <div class="home__video-overlay"></div>
      </div>

      <!-- 视频信息卡片 -->
      <div class="home__video-info">
        <p class="home__video-date">{{ featuredVideo.date }}</p>
        <p class="home__video-source">{{ featuredVideo.source }}</p>
        <div class="home__video-title">
          <p>{{ featuredVideo.title }}</p>
          <p>{{ featuredVideo.subtitle }}</p>
        </div>
        <div class="home__video-description">
          <p>{{ featuredVideo.description }}</p>
          <p>此处共放置字体3行..</p>
        </div>
        <button class="home__video-play" @click="playVideo">
          播放
        </button>
      </div>

      <!-- 视频缩略图轮播 -->
      <div class="home__video-carousel">
        <div class="home__video-list">
          <VideoCard
            v-for="(video, index) in videoList"
            :key="video.id"
            :thumbnail="video.thumbnail"
            :title="video.title"
            :is-large="index === currentVideo"
            @click="selectVideo(index)"
          />
        </div>
        <div class="home__video-controls">
          <button class="home__video-control" @click="prevVideo" aria-label="上一个视频">
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
              <path d="M45 54L27 36L45 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
            </svg>
          </button>
          <button class="home__video-control" @click="nextVideo" aria-label="下一个视频">
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
              <path d="M27 54L45 36L27 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- 学院案例展示区 -->
    <section class="home__courses">
      <div class="home__courses-header">
        <button class="home__courses-more" style="opacity: 0;" aria-label="查看更多">
          <span>查看更多</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="#333333" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- 标题装饰 -->
        <div class="home__courses-title-wrapper">
          <div class="home__courses-title-bg">
            <img src="/images/home/title-decoration.png" alt="" />
          </div>
          <div class="home__courses-title-left">
            <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0 10 L100 10" stroke="#bc2220" stroke-width="2" />
              <circle cx="0" cy="10" r="3" fill="#bc2220" />
            </svg>
          </div>
          <div class="home__courses-title-right">
            <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0 10 L100 10" stroke="#bc2220" stroke-width="2" />
              <circle cx="100" cy="10" r="3" fill="#bc2220" />
            </svg>
          </div>
          <div class="home__courses-title">
            <h2>学院案例</h2>
            <div class="home__courses-title-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 0L12.2451 7.75491H20L13.8274 12.2451L16.1803 20L10 15.2451L3.81966 20L6.17257 12.2451L0 7.75491H7.75491L10 0Z" fill="#bc2220" fill-opacity="0.2"/>
              </svg>
            </div>
          </div>
        </div>

        <button class="home__courses-more" @click="viewMoreCourses" aria-label="查看更多">
          <span>查看更多</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="#333333" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- 课程卡片网格 -->
      <div class="home__courses-grid">
        <CourseCard
          v-for="course in courseList.slice(0, 4)"
          :key="course.id"
          :course="course"
          @click="handleCourseClick"
        />
      </div>

      <div class="home__courses-grid">
        <CourseCard
          v-for="course in courseList.slice(4, 8)"
          :key="course.id"
          :course="course"
          @click="handleCourseClick"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import CourseCard from '@/components/common/CourseCard/index.vue'
import VideoCard from '@/components/common/VideoCard/index.vue'
import type { Course } from '@/types'

/**
 * 首页组件
 */
const router = useRouter()

// ===== 英雄横幅轮播 =====
const currentBanner = ref(0)
let bannerTimer: number | null = null

const banners = [
  {
    id: '1',
    image: '/images/home/hero-banner-1.jpg',
    title: '不忘初心 牢记使命'
  },
  {
    id: '2',
    image: '/images/home/hero-banner-2.jpg',
    title: '学习贯彻党的二十大精神'
  },
  {
    id: '3',
    image: '/images/home/hero-banner-3.jpg',
    title: '习近平新时代中国特色社会主义思想'
  }
]

const nextBanner = () => {
  currentBanner.value = (currentBanner.value + 1) % banners.length
}

const prevBanner = () => {
  currentBanner.value = (currentBanner.value - 1 + banners.length) % banners.length
}

const goToBanner = (index: number) => {
  currentBanner.value = index
}

const startBannerAutoplay = () => {
  bannerTimer = window.setInterval(() => {
    nextBanner()
  }, 5000)
}

const stopBannerAutoplay = () => {
  if (bannerTimer) {
    clearInterval(bannerTimer)
    bannerTimer = null
  }
}

// ===== 滚动到视频区域 =====
const videoSection = ref<HTMLElement | null>(null)

const scrollToVideo = () => {
  if (videoSection.value) {
    videoSection.value.scrollIntoView({ behavior: 'smooth' })
  }
}

// ===== 视频展示 =====
const backgroundVideo = ref<HTMLVideoElement | null>(null)
const currentVideo = ref(0)

const featuredVideo = {
  date: '2025-06-25',
  source: '党委宣传部 融媒体中心',
  title: '福州大学2025毕业季',
  subtitle: '——微电影《干杯》',
  description: '谨以此片献给福州大学2025届毕业生'
}

const videoList = [
  {
    id: '1',
    thumbnail: '/images/home/video-1.jpg',
    title: '福州大学2025毕业季微电影《干杯》'
  },
  {
    id: '2',
    thumbnail: '/images/home/video-2.jpg',
    title: '每个人都是青春的C位'
  },
  {
    id: '3',
    thumbnail: '/images/home/video-3.jpg',
    title: '下一站，10386'
  },
  {
    id: '4',
    thumbnail: '/images/home/video-4.jpg',
    title: '每个人都是青春的C位'
  }
]

const nextVideo = () => {
  currentVideo.value = (currentVideo.value + 1) % videoList.length
}

const prevVideo = () => {
  currentVideo.value = (currentVideo.value - 1 + videoList.length) % videoList.length
}

const selectVideo = (index: number) => {
  currentVideo.value = index
}

const playVideo = () => {
  // TODO: 实现视频播放功能
  console.log('播放视频')
}

// ===== 课程列表 =====
const courseList = ref<Course[]>([
  {
    id: '1',
    title: '概率论与数理统计',
    cover: '/images/home/course-1.jpg',
    description: '概率论与数理统计课程',
    level: 'university',
    teacherList: [
      {
        id: '1',
        name: '刘丽军',
        title: '教授',
        department: '电气工程与自动学院'
      }
    ],
    sort: 1,
    status: 'published',
    studentCount: 3456,
    chapterCount: 12,
    totalDuration: 720,
    tags: ['数学', '统计'],
    createTime: '2024-01-01',
    updateTime: '2024-12-01'
  },
  {
    id: '2',
    title: '概率论与数理统计',
    cover: '/images/home/course-1.jpg',
    description: '概率论与数理统计课程',
    level: 'university',
    teacherList: [
      {
        id: '1',
        name: '刘丽军',
        title: '教授',
        department: '电气工程与自动学院'
      }
    ],
    sort: 2,
    status: 'published',
    studentCount: 2563,
    chapterCount: 12,
    totalDuration: 720,
    tags: ['数学', '统计'],
    createTime: '2024-01-01',
    updateTime: '2024-12-01'
  },
  {
    id: '3',
    title: '概率论与数理统计',
    cover: '/images/home/course-1.jpg',
    description: '概率论与数理统计课程',
    level: 'university',
    teacherList: [
      {
        id: '1',
        name: '刘丽军',
        title: '教授',
        department: '电气工程与自动学院'
      }
    ],
    sort: 3,
    status: 'published',
    studentCount: 4521,
    chapterCount: 12,
    totalDuration: 720,
    tags: ['数学', '统计'],
    createTime: '2024-01-01',
    updateTime: '2024-12-01'
  },
  {
    id: '4',
    title: '概率论与数理统计',
    cover: '/images/home/course-1.jpg',
    description: '概率论与数理统计课程',
    level: 'university',
    teacherList: [
      {
        id: '1',
        name: '刘丽军',
        title: '教授',
        department: '电气工程与自动学院'
      }
    ],
    sort: 4,
    status: 'published',
    studentCount: 3256,
    chapterCount: 12,
    totalDuration: 720,
    tags: ['数学', '统计'],
    createTime: '2024-01-01',
    updateTime: '2024-12-01'
  },
  {
    id: '5',
    title: '概率论与数理统计',
    cover: '/images/home/course-1.jpg',
    description: '概率论与数理统计课程',
    level: 'university',
    teacherList: [
      {
        id: '1',
        name: '刘丽军',
        title: '教授',
        department: '电气工程与自动学院'
      }
    ],
    sort: 5,
    status: 'published',
    studentCount: 2845,
    chapterCount: 12,
    totalDuration: 720,
    tags: ['数学', '统计'],
    createTime: '2024-01-01',
    updateTime: '2024-12-01'
  },
  {
    id: '6',
    title: '概率论与数理统计',
    cover: '/images/home/course-1.jpg',
    description: '概率论与数理统计课程',
    level: 'university',
    teacherList: [
      {
        id: '1',
        name: '刘丽军',
        title: '教授',
        department: '电气工程与自动学院'
      }
    ],
    sort: 6,
    status: 'published',
    studentCount: 3698,
    chapterCount: 12,
    totalDuration: 720,
    tags: ['数学', '统计'],
    createTime: '2024-01-01',
    updateTime: '2024-12-01'
  },
  {
    id: '7',
    title: '概率论与数理统计',
    cover: '/images/home/course-1.jpg',
    description: '概率论与数理统计课程',
    level: 'university',
    teacherList: [
      {
        id: '1',
        name: '刘丽军',
        title: '教授',
        department: '电气工程与自动学院'
      }
    ],
    sort: 7,
    status: 'published',
    studentCount: 2156,
    chapterCount: 12,
    totalDuration: 720,
    tags: ['数学', '统计'],
    createTime: '2024-01-01',
    updateTime: '2024-12-01'
  },
  {
    id: '8',
    title: '概率论与数理统计',
    cover: '/images/home/course-1.jpg',
    description: '概率论与数理统计课程',
    level: 'university',
    teacherList: [
      {
        id: '1',
        name: '刘丽军',
        title: '教授',
        department: '电气工程与自动学院'
      }
    ],
    sort: 8,
    status: 'published',
    studentCount: 4123,
    chapterCount: 12,
    totalDuration: 720,
    tags: ['数学', '统计'],
    createTime: '2024-01-01',
    updateTime: '2024-12-01'
  }
])

const handleCourseClick = (course: Course) => {
  router.push(`/study/${course.id}`)
}

const viewMoreCourses = () => {
  router.push('/study')
}

// ===== 生命周期 =====
onMounted(() => {
  startBannerAutoplay()
})

onUnmounted(() => {
  stopBannerAutoplay()
})
</script>

<style scoped>
.home {
  width: 100%;
  background: #fff9ed;
  position: relative;
  overflow-x: hidden;
}

/* ===== 英雄横幅区 ===== */
.home__hero {
  position: relative;
  width: 100%;
  max-width: 1920px;
  height: 756px;
  margin: 0 auto 140px;
}

.home__hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: calc(100% + 140px); /* 延伸到 Video Section 顶部 (756 + 140) */
  background: url('/images/indexBg.png') top center / cover no-repeat;
  z-index: 0;
}

/* 背景图 */
.home__hero-background {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1920px;
  height: 756px;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.home__hero-bg-image {
  position: absolute;
  top: -19.04%;
  left: 0;
  width: 100%;
  height: 126.98%;
  object-fit: cover;
  object-position: center;
}

/* 主标题图 */
.home__hero-title {
  position: absolute;
  top: 38px;
  left: 50%;
  transform: translateX(calc(-50% - 30px));
  width: 1116px;
  height: 275px;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home__hero-title-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

/* 文字版标题（图片加载失败时显示） */
.home__hero-title-text {
  margin: 0;
  display: flex;
  gap: 48px;
  align-items: center;
  justify-content: center;
  font-family: 'Source Han Serif CN', '华文行楷', 'STXingkai', serif;
  font-size: 96px;
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(180deg, #ffd89a 0%, #ffb347 50%, #d4905f 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(255, 216, 154, 0.5);
  letter-spacing: 8px;
}

.home__hero-title-text span {
  display: inline-block;
  animation: titleGlow 3s ease-in-out infinite;
}

.home__hero-title-text span:nth-child(2) {
  animation-delay: 0.5s;
}

@keyframes titleGlow {
  0%, 100% {
    filter: drop-shadow(0 0 10px rgba(255, 216, 154, 0.5));
  }
  50% {
    filter: drop-shadow(0 0 20px rgba(255, 216, 154, 0.8));
  }
}

/* 轮播指示器 */
.home__hero-indicators {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.home__hero-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.home__hero-indicator--active {
  background: #ffffff;
  width: 12px;
}

/* 轮播控制按钮 */
.home__hero-prev,
.home__hero-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 48px 8px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home__hero-prev:hover,
.home__hero-next:hover {
  background: rgba(0, 0, 0, 0.7);
}

.home__hero-prev {
  left: 24px;
}

.home__hero-next {
  right: 24px;
}

/* 滚动继续提示 */
.home__scroll-hint {
  position: absolute;
  bottom: -140px; /* 填满 margin-bottom 区域 */
  left: 0;
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px; /* 增加一点间距 */
  background: rgba(255, 249, 237, 0.9); /* 背景色不透明度 0.1 */
  border: none;
  cursor: pointer;
  z-index: 10;
}

.home__scroll-hint span {
  font-family: 'Source Han Sans CN', sans-serif;
  font-size: 18px;
  color: #bc2220;
  white-space: nowrap;
}

.home__scroll-hint .home__scroll-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent; /* 占位，保持布局稳定 */
}


/* ===== 视频展示区 ===== */
.home__video {
  position: relative;
  width: 100%;
  height: 1080px;
  overflow: hidden;
}

.home__video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.home__video-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.home__video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 960px;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 69.614%);
}

/* 视频信息卡片 */
.home__video-info {
  position: absolute;
  top: 281px;
  left: 105px;
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  color: #ffffff;
  z-index: 10;
}

.home__video-date {
  margin: 0;
  font-size: 16px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: 400;
  line-height: normal;
}

.home__video-source {
  margin: 0;
  font-size: 20px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: 400;
  line-height: normal;
}

.home__video-title {
  font-size: 32px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: 700;
  line-height: normal;
  white-space: pre;
}

.home__video-title p {
  margin: 0;
}

.home__video-description {
  font-size: 20px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: 400;
  line-height: normal;
  opacity: 0.5;
  white-space: pre;
}

.home__video-description p {
  margin: 0;
}

.home__video-play {
  padding: 12px 48px;
  background: linear-gradient(to right, #ecd9ba, #d4b48f);
  /* background-image: url('/images/home/button-pattern.png'); */
  /* background-size: 197px 261.095px; */
  /* background-position: top left; */
  /* background-repeat: repeat; */
  border: none;
  border-radius: 100px;
  color: #bc2220;
  font-size: 16px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: 400;
  cursor: pointer;
  transition: transform 0.3s ease;
  align-self: flex-start;
  position: relative;
  overflow: hidden;
}

.home__video-play::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.2) 10px,
    transparent 10px,
    transparent 20px
  );
  opacity: 0.3;
}

.home__video-play:hover {
  transform: scale(1.05);
}

/* 视频缩略图轮播 */
.home__video-carousel {
  position: absolute;
  bottom: 36px; /* 调整底部间距以匹配设计稿 */
  left: 50%;
  transform: translateX(calc(-50% - 55px));
  width: 1600px;
  display: flex;
  align-items: flex-end;
  gap: 16px;
  z-index: 10;
}

.home__video-list {
  display: flex;
  gap: 16px;
  align-items: flex-end;
}

.home__video-controls {
  flex: 1;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  height: 172px;
}

.home__video-control {
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home__video-control:hover {
  opacity: 0.8;
}

/* ===== 学院案例展示区 ===== */
.home__courses {
  position: relative;
  width: 100%;
  padding: 96px 160px;
  display: flex;
  flex-direction: column;
  gap: 96px;
  align-items: center;
  justify-content: center;
  min-height: 1080px;
}

.home__courses-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.home__courses-more {
  display: flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.3s ease;
}

.home__courses-more:hover {
  opacity: 0.5 !important;
}

.home__courses-more span {
  font-size: 16px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: 400;
  color: #333333;
  opacity: 0.7;
  line-height: normal;
}

/* 标题装饰 */
.home__courses-title-wrapper {
  position: relative;
  width: 306.566px;
  height: 78px;
}

.home__courses-title-bg {
  position: absolute;
  top: 0;
  left: 42.08%;
  right: 42.26%;
  aspect-ratio: 1;
  opacity: 0.2;
}

.home__courses-title-bg img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.home__courses-title-left {
  position: absolute;
  bottom: 21.94%;
  left: 0;
  right: 60.44%;
  top: 30.77%;
}

.home__courses-title-left svg {
  width: 100%;
  height: 100%;
}

.home__courses-title-right {
  position: absolute;
  bottom: 21.94%;
  left: 60.44%;
  right: 0;
  top: 30.77%;
}

.home__courses-title-right svg {
  width: 100%;
  height: 100%;
}

.home__courses-title {
  position: absolute;
  bottom: 0;
  left: 39.56%;
  right: 39.56%;
  top: 30.77%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home__courses-title h2 {
  margin: 0;
  font-size: 24px;
  font-family: 'Source Han Serif CN', serif;
  font-weight: 700;
  color: #bc2220;
  line-height: normal;
  letter-spacing: 3.84px;
  white-space: pre;
}

.home__courses-title-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home__courses-title-icon svg {
  width: 100%;
  height: 100%;
}

/* 课程卡片网格 */
.home__courses-grid {
  width: 100%;
  display: flex;
  gap: 48px;
  align-items: center;
}
</style>
