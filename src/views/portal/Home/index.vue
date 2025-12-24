<template>
  <div class="home">
    <!-- 英雄横幅区 -->
    <section class="home__hero">
      <!-- 背景图容器 -->
      <div class="home__hero-background">
        <img 
          v-if="!bannersLoading && banners.length > 0" 
          :src="banners[currentBanner]?.picUrl || '/images/image 947.png'" 
          alt="背景" 
          class="home__hero-bg-image" 
        />
        <img 
          v-else-if="!bannersLoading"
          src="/images/image 947.png" 
          alt="背景" 
          class="home__hero-bg-image" 
        />
      </div>

      <!-- 主标题图 -->
      <div class="home__hero-title">
      </div>

      <!-- 加载状态 -->
      <div v-if="bannersLoading" class="home__hero-loading">
        <span>加载中...</span>
      </div>

      <!-- 轮播指示器 -->
      <div v-if="!bannersLoading && banners.length > 0" class="home__hero-indicators">
        <button
          v-for="(banner, index) in banners"
          :key="banner.id"
          class="home__hero-indicator"
          :class="{ 'home__hero-indicator--active': currentBanner === index }"
          @click="goToBanner(index)"
        ></button>
      </div>

      <!-- 左侧箭头按钮 -->
      <button 
        v-if="!bannersLoading && banners.length > 1" 
        class="home__hero-prev" 
        @click="prevBanner" 
        aria-label="上一张"
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M20 24L12 16L20 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <!-- 右侧箭头按钮 -->
      <button 
        v-if="!bannersLoading && banners.length > 1" 
        class="home__hero-next" 
        @click="nextBanner" 
        aria-label="下一张"
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M12 24L20 16L12 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <!-- 滚动继续提示 -->
      <button class="home__scroll-hint" @click="scrollToVideo">
        <span>滚动继续</span>
        <div class="home__scroll-icon">
          <img src="/images/home__scroll-icon.svg" alt="滚动" />
        </div>
      </button>
    </section>

    <!-- 视频展示区 -->
    <section ref="videoSection" class="home__video">
      <!-- 背景视频 -->
      <div class="home__video-background">
        <video
          v-if="!videosLoading && videoList.length > 0"
          ref="backgroundVideo"
          :key="currentVideo"
          autoplay
          loop
          muted
          playsinline
          class="home__video-bg"
          :src="videoList[currentVideo]?.videoUrl"
        >
        </video>
        <div class="home__video-overlay"></div>
      </div>

      <!-- 视频信息卡片 -->
      <div v-if="!videosLoading && videoList.length > 0" class="home__video-info">
        <p class="home__video-date">{{ videoList[currentVideo]?.createTime || '' }}</p>
        <p class="home__video-source">{{ videoList[currentVideo]?.college || '' }}</p>
        <div class="home__video-title">
          <p>{{ videoList[currentVideo]?.title || '' }}</p>
        </div>
        <div class="home__video-description" v-if="videoList[currentVideo]?.description">
          <p>{{ videoList[currentVideo]?.description }}</p>
        </div>
        <button class="home__video-play" @click="playVideo">
          播放
        </button>
      </div>

      <!-- 视频缩略图轮播 -->
      <div v-if="!videosLoading && videoList.length > 0" class="home__video-carousel">
        <div ref="videoListContainer" class="home__video-list">
          <VideoCard
            v-for="(video, index) in videoList"
            :key="video.id"
            :ref="(el) => setVideoCardRef(el, index)"
            :thumbnail="video.thumbnail"
            :title="video.title"
            :is-large="index === currentVideo"
            @click="selectVideo(index)"
          />
        </div>
        <div class="home__video-controls">
          <button class="home__video-control" @click="prevVideo" aria-label="上一个视频">
            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
              <path d="M36 9C21.0883 9 9 21.0883 9 36C9 50.9117 21.0883 63 36 63C50.9117 63 63 50.9117 63 36C63 21.0883 50.9117 9 36 9Z" fill="#BC2220"/>
              <path d="M39 27L30 36L39 45" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="home__video-control" @click="nextVideo" aria-label="下一个视频">
            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
              <path d="M36 9C50.9117 9 63 21.0883 63 36C63 50.9117 50.9117 63 36 63C21.0883 63 9 50.9117 9 36C9 21.0883 21.0883 9 36 9Z" fill="#BC2220"/>
              <path d="M33 27L42 36L33 45" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- 视频加载状态 -->
      <div v-else-if="videosLoading" class="home__video-loading">
        <span>加载视频中...</span>
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
            <img src="/images/xiaohui1.png" alt="" />
          </div>
          <div class="home__courses-title-left">
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
          <div class="home__courses-title-right">
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
          <div class="home__courses-title">
            <h2>学院案例</h2>
            <div class="home__courses-title-icon">
            <img src="/images/xiaohui2.png" alt="" />
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

      <!-- 课程加载状态 -->
      <div v-if="coursesLoading" class="home__courses-loading">
        <span>加载学院案例中...</span>
      </div>

      <!-- 课程卡片网格 -->
      <template v-else-if="!coursesLoading && courseList.length > 0">
        <div class="home__courses-grid">
          <CourseCard
            v-for="course in courseList.slice(0, 4)"
            :key="course.id"
            :course="course"
            @click="handleCourseClick"
          />
        </div>

        <div v-if="courseList.length > 4" class="home__courses-grid">
          <CourseCard
            v-for="course in courseList.slice(4, 8)"
            :key="course.id"
            :course="course"
            @click="handleCourseClick"
          />
        </div>
      </template>

      <!-- 空状态 -->
      <div v-else class="home__courses-empty">
        <span>暂无学院案例</span>
      </div>
    </section>

    <!-- 视频播放器弹窗 -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showVideoPlayer" class="video-player-modal" @click.self="closeVideoPlayer">
          <div class="video-player-modal__content">
            <button class="video-player-modal__close" @click="closeVideoPlayer" aria-label="关闭">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M24 8L8 24M8 8L24 24" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <VideoPlayer
              :src="currentPlayingVideoUrl"
              :poster="currentPlayingVideoPoster"
              :autoplay="true"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import CourseCard from '@/components/common/CourseCard/index.vue'
import VideoCard from '@/components/common/VideoCard/index.vue'
import VideoPlayer from '@/components/common/VideoPlayer/index.vue'
import type { Course } from '@/types'
import { getBannerList, type BannerItem } from '@/api/banner'
import { getVideoList, type VideoItem } from '@/api/video'
import { getTopCollegeList, type CollegeItem } from '@/api/college'

/**
 * 首页组件
 */
const router = useRouter()

// ===== 英雄横幅轮播 =====
const currentBanner = ref(0)
const banners = ref<BannerItem[]>([])
const bannersLoading = ref(true)
let bannerTimer: number | null = null

/**
 * 加载轮播图数据
 */
const loadBanners = async () => {
  try {
    bannersLoading.value = true
    const data = await getBannerList()
    // 按 sort 字段排序
    banners.value = data.sort((a, b) => a.sort - b.sort)
    console.log('✅ 轮播图加载成功:', banners.value)
  } catch (error) {
    console.error('❌ 轮播图加载失败:', error)
    // 保持空数组，不使用硬编码数据
    banners.value = []
  } finally {
    bannersLoading.value = false
  }
}

const nextBanner = () => {
  if (banners.value.length === 0) return
  currentBanner.value = (currentBanner.value + 1) % banners.value.length
}

const prevBanner = () => {
  if (banners.value.length === 0) return
  currentBanner.value = (currentBanner.value - 1 + banners.value.length) % banners.value.length
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
const videosLoading = ref(true)
const videoListContainer = ref<HTMLElement | null>(null)
const videoCardRefs = ref<(HTMLElement | null)[]>([])

const videoList = ref<Array<{
  id: string
  thumbnail: string
  title: string
  videoUrl?: string
  college?: string
  createTime?: string
  description?: string
}>>([])

/**
 * 设置视频卡片 ref
 */
const setVideoCardRef = (el: any, index: number) => {
  if (el) {
    videoCardRefs.value[index] = el.$el || el
  }
}

/**
 * 滚动到当前视频
 */
const scrollToCurrentVideo = () => {
  nextTick(() => {
    if (!videoListContainer.value || !videoCardRefs.value[currentVideo.value]) {
      return
    }

    const container = videoListContainer.value
    const currentCard = videoCardRefs.value[currentVideo.value]
    
    if (currentCard) {
      // 计算当前视频卡片相对于容器的位置
      const cardRect = currentCard.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      
      // 计算需要滚动的距离（让当前卡片居中）
      const scrollLeft = currentCard.offsetLeft - (container.clientWidth / 2) + (currentCard.clientWidth / 2)
      
      // 平滑滚动到目标位置
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      })
    }
  })
}

/**
 * 监听当前视频变化，自动滚动
 */
watch(currentVideo, () => {
  scrollToCurrentVideo()
})

/**
 * 加载视频列表数据
 */
const loadVideos = async () => {
  try {
    videosLoading.value = true
    const data = await getVideoList()
    // 将API数据映射到组件需要的格式
    videoList.value = data.map(video => ({
      id: String(video.id),
      thumbnail: video.coverUrl,
      title: video.title,
      videoUrl: video.videoUrl,
      college: video.college,
      createTime: video.createTime,
      description: video.description
    }))
    console.log('✅ 视频列表加载成功:', videoList.value)
  } catch (error) {
    console.error('❌ 视频列表加载失败:', error)
    // 失败时使用默认数据
    videoList.value = [
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
  } finally {
    videosLoading.value = false
  }
}

const nextVideo = () => {
  if (videoList.value.length === 0) return
  currentVideo.value = (currentVideo.value + 1) % videoList.value.length
}

const prevVideo = () => {
  if (videoList.value.length === 0) return
  currentVideo.value = (currentVideo.value - 1 + videoList.value.length) % videoList.value.length
}

const selectVideo = (index: number) => {
  currentVideo.value = index
}

// ===== 视频播放器弹窗 =====
const showVideoPlayer = ref(false)
const currentPlayingVideoUrl = ref('')
const currentPlayingVideoPoster = ref('')

const playVideo = () => {
  const video = videoList.value[currentVideo.value]
  if (video && video.videoUrl) {
    currentPlayingVideoUrl.value = video.videoUrl
    currentPlayingVideoPoster.value = video.thumbnail
    showVideoPlayer.value = true
  }
}

const closeVideoPlayer = () => {
  showVideoPlayer.value = false
  currentPlayingVideoUrl.value = ''
  currentPlayingVideoPoster.value = ''
}

// ===== 课程列表 =====
const courseList = ref<Course[]>([])
const coursesLoading = ref(true)

/**
 * 加载学院案例数据
 */
const loadCourses = async () => {
  try {
    coursesLoading.value = true
    const data = await getTopCollegeList()
    // 将API数据映射到Course类型
    courseList.value = data.map((college: CollegeItem, index: number) => ({
      id: String(college.id),
      title: college.name,
      cover: college.coverUrl,
      description: college.content,
      level: 'university' as const,
      teacherList: college.teachers.map((teacher: string, idx: number) => ({
        id: String(idx + 1),
        name: teacher,
        title: '教师',
        department: college.college
      })),
      video: '/videos/hero-video.mp4', // 添加默认视频
      sort: index + 1,
      status: 'published' as const,
      studentCount: college.statPv || 0,
      chapterCount: 0,
      totalDuration: 0,
      tags: college.types,
      createTime: college.createTime,
      updateTime: college.createTime
    }))
    console.log('✅ 学院案例加载成功:', courseList.value)
  } catch (error) {
    console.error('❌ 学院案例加载失败:', error)
    // 失败时保持空数组
    courseList.value = []
  } finally {
    coursesLoading.value = false
  }
}

const handleCourseClick = (course: Course) => {
  // 跳转到学院案例详情页，并传递数据
  console.log('🚀 跳转到详情页，传递数据:', course)
  
  // 使用 sessionStorage 临时存储数据
  sessionStorage.setItem(`college-video-${course.id}`, JSON.stringify(course))
  
  router.push(`/study/college-video/${course.id}`)
}

const viewMoreCourses = () => {
  router.push('/study')
}

// ===== 生命周期 =====
onMounted(async () => {
  window.scrollTo(0, 0) // 强制滚动到顶部，防止浏览器恢复滚动位置
  await loadBanners() // 加载轮播图数据
  await loadVideos() // 加载视频列表数据
  await loadCourses() // 加载学院案例数据
  if (banners.value.length > 0) {
    startBannerAutoplay() // 只有当有轮播图数据时才启动自动播放
  }
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
  /* max-width: 1920px; */ /* 移除最大宽度限制，使其占满浏览器 */
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
  background: url('/images/indexBg.png') no-repeat top center;
  background-size: 100% 100%; /* 强制拉伸以确保底部对齐 */
  z-index: 0;
}

/* 背景图 */
.home__hero-background {
  position: absolute;
  background: rgba(255, 249, 237, 0.9); /* 背景色不透明度 0.1 */
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%; /* 占满全宽 */
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

/* 加载状态 */
.home__hero-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  color: #bc2220;
  font-size: 18px;
  font-family: 'Source Han Sans CN', sans-serif;
}

/* 主标题图 */
.home__hero-title {
  position: absolute;
  /* top: 38px; */
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

.home__scroll-hint .home__scroll-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  /* 隐藏滚动条核心样式 */
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; 
  -ms-overflow-style: none; 
  display: flex;
  gap: 16px;
  align-items: flex-end;
  width: 1300px;
  overflow: auto;
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

/* 视频加载状态 */
.home__video-loading {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  color: #ffffff;
  font-size: 18px;
  font-family: 'Source Han Sans CN', sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
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

/* 课程加载状态 */
.home__courses-loading {
  width: 100%;
  text-align: center;
  color: #bc2220;
  font-size: 18px;
  font-family: 'Source Han Sans CN', sans-serif;
  padding: 48px 0;
}

/* 课程空状态 */
.home__courses-empty {
  width: 100%;
  text-align: center;
  color: #999;
  font-size: 16px;
  font-family: 'Source Han Sans CN', sans-serif;
  padding: 48px 0;
}

/* ===== 视频播放器弹窗 ===== */
.video-player-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 40px;
}

.video-player-modal__content {
  position: relative;
  width: 100%;
  max-width: 1280px;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}

.video-player-modal__close {
  position: absolute;
  top: -50px;
  right: 0;
  padding: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 10;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-player-modal__close:hover {
  opacity: 0.7;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
