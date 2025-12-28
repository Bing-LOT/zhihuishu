<template>
  <div class="college-video-detail">
    <!-- 背景层 -->
    <div class="college-video-detail__bg">
      <img
        src="/images/indexBg.png"
        alt=""
      >
    </div>

    <div class="college-video-detail__container">
      <!-- 面包屑 -->
      <div class="college-video-detail__breadcrumb">
        <span class="label">您的位置：</span>
        <router-link
          to="/"
          class="link"
        >
          首页
        </router-link>
        <span class="separator">&gt;&gt;</span>
        <router-link
          to="/study"
          class="link"
        >
          学院案例
        </router-link>
        <span class="separator">&gt;&gt;</span>
        <span class="current">视频详情</span>
      </div>

      <!-- 主要内容区 -->
      <div class="college-video-detail__content">
        <!-- 左侧：文字讲稿 -->
        <div class="text-script-card">
          <div class="card-bg-decoration" />
          <h2 class="text-script-card__title">
            文字讲稿
          </h2>
          <div
            class="text-script-card__content"
            v-html="videoDetail.content"
          />
        </div>

        <!-- 右侧：视频播放器和信息 -->
        <div class="video-main-card">
          <div class="card-bg-decoration" />
          
          <!-- 视频信息 -->
          <div class="video-info-header">
            <h1 class="video-title">
              {{ videoDetail.name }}
            </h1>
            <div class="video-stats">
              <span class="label">观看次数：</span>
              <span class="value">{{ formatViewCount(videoDetail.statPv) }}</span>
            </div>
          </div>

          <!-- 视频播放器 -->
          <div class="video-player-wrapper">
            <video
              ref="videoPlayer"
              class="video-player"
              :src="videoDetail.videoUrl"
              :poster="videoDetail.coverUrl"
              @timeupdate="handleTimeUpdate"
              @loadedmetadata="handleLoadedMetadata"
            />
            
            <!-- 自定义视频控制栏 -->
            <div class="video-controls">
              <!-- 进度条 -->
              <div
                class="progress-bar"
                @click="handleProgressClick"
              >
                <div
                  class="progress-played"
                  :style="{ width: playedProgress + '%' }"
                />
                <div
                  class="progress-thumb"
                  :style="{ left: playedProgress + '%' }"
                />
              </div>

              <!-- 功能条 -->
              <div class="controls-bar">
                <span class="time-display">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
                
                <button
                  class="control-btn play-btn"
                  @click="togglePlay"
                >
                  <svg
                    v-if="!isPlaying"
                    viewBox="0 0 32 32"
                    width="32"
                    height="32"
                  >
                    <circle
                      cx="16"
                      cy="16"
                      r="16"
                      fill="rgba(255,255,255,0.1)"
                    />
                    <path
                      d="M12 8 L24 16 L12 24 Z"
                      fill="white"
                    />
                  </svg>
                  <svg
                    v-else
                    viewBox="0 0 32 32"
                    width="32"
                    height="32"
                  >
                    <circle
                      cx="16"
                      cy="16"
                      r="16"
                      fill="rgba(255,255,255,0.1)"
                    />
                    <rect
                      x="11"
                      y="9"
                      width="3"
                      height="14"
                      fill="white"
                    />
                    <rect
                      x="18"
                      y="9"
                      width="3"
                      height="14"
                      fill="white"
                    />
                  </svg>
                </button>

                <div class="controls-right">
                  <button
                    class="control-btn fullscreen-btn"
                    @click="toggleFullscreen"
                  >
                    <svg
                      viewBox="0 0 32 32"
                      width="32"
                      height="32"
                    >
                      <circle
                        cx="16"
                        cy="16"
                        r="16"
                        fill="rgba(255,255,255,0.1)"
                      />
                      <path
                        d="M10 10 L10 14 M10 10 L14 10 M22 10 L22 14 M22 10 L18 10 M10 22 L10 18 M10 22 L14 22 M22 22 L22 18 M22 22 L18 22" 
                        stroke="white"
                        stroke-width="1.5"
                        fill="none"
                        stroke-linecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 教工信息 -->
          <div class="teacher-info">
            <span class="label">教工：</span>
            <span class="value">
              <template v-if="videoDetail.teachers && videoDetail.teachers.length > 0">
                {{ videoDetail.teachers.map(t => t.name).join('、') }}
              </template>
            </span>
          </div>
        </div>
      </div>

      <!-- 推荐视频列表 -->
      <div class="recommend-section">
        <div class="recommend-header">
          <h2 class="recommend-title">
            其他教学岗教工视频
          </h2>
          <button
            class="view-more-btn"
            @click="handleViewMore"
          >
            <span>查看更多</span>
            <img
              src="/images/arrow-right.svg"
              alt=""
            >
          </button>
        </div>

        <div class="recommend-list">
          <div
            v-for="video in recommendVideos"
            :key="video.id"
            class="video-card"
            @click="handleVideoClick(video.id)"
          >
            <!-- 视频封面 -->
            <div class="video-card__cover">
              <img
                :src="video.coverUrl"
                :alt="video.name"
              >
              <div
                v-if="video.levelName"
                class="video-card__badge"
              >
                {{ video.levelName }}
              </div>
            </div>

            <!-- 视频信息 -->
            <div class="video-card__info">
              <h3 class="video-card__title">
                {{ video.name }}
              </h3>
              <div class="video-card__meta">
                <span class="video-card__description">
                  教师课程<template v-if="video.teachers && video.teachers.length > 0">（教工：{{ video.teachers[0].name }}）</template>
                </span>
                <div class="video-card__views">
                  <svg
                    viewBox="0 0 20 20"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M10 5 C5 5 2 10 2 10 S5 15 10 15 S18 10 18 10 S15 5 10 5 Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      fill="none"
                    />
                    <circle
                      cx="10"
                      cy="10"
                      r="3"
                      stroke="currentColor"
                      stroke-width="1.5"
                      fill="none"
                    />
                  </svg>
                  <span>{{ video.showStatPv || 3456 }}人</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getExampleExpoDetail, type ExampleExpoListItem } from '@/api/banner'
import { getCourseExpoPageList, type CourseExpoItem } from '@/api/course'

/**
 * 学院案例视频详情页
 */
const route = useRoute()
const router = useRouter()
const videoId = ref(route.params.id as string)

// 加载状态
const loading = ref(false)

// 从 sessionStorage 中获取传递的数据
const getInitialData = () => {
  const key = `college-video-${videoId.value}`
  console.log('🔍 尝试从 sessionStorage 读取数据，key:', key)
  
  const stored = sessionStorage.getItem(key)
  if (stored) {
    console.log('✅ 找到存储的数据!')
    const data = JSON.parse(stored)
    console.log('📦 数据内容:', data)
    // 读取后删除，避免内存泄漏
    sessionStorage.removeItem(key)
    return data
  }
  
  console.log('❌ 没有找到存储的数据')
  return null
}

// 视频详情数据（默认值）
const videoDetail = ref<ExampleExpoListItem>({
  id: 0,
  name: '',
  coverUrl: '',
  college: '',
  teachers: [{ name: '', title: '' }],
  content: ``,
  videoUrl: '',
  showFront: 1,
  statPv: 100000
})

// 推荐视频列表
const recommendVideos = ref<CourseExpoItem[]>([])

// 视频播放器相关状态
const videoPlayer = ref<HTMLVideoElement>()
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const playedProgress = ref(0)

// 加载视频详情数据
const loadVideoDetail = async () => {
  try {
    loading.value = true
    
    // 优先使用路由传递的数据
    const initialData = getInitialData()
    if (initialData && String(initialData.id) === String(videoId.value)) {
      console.log('✅ 使用路由传递的数据:', initialData)
      // 直接使用传递的数据，不调用 API
      videoDetail.value = {
        id: Number(initialData.id),
        name: initialData.title,
        coverUrl: initialData.cover,
        college: initialData.teacherList?.[0]?.department || '',
        teachers: initialData.teacherList?.map((t: any) => ({ 
          name: t.name, 
          title: t.title 
        })) || [],
        content: initialData.description || videoDetail.value.content,
        videoUrl: initialData.video || '/videos/hero-video.mp4', // 使用传递的视频或默认视频
        showFront: 1,
        statPv: initialData.studentCount || 0
      }
      
      // 格式化内容
      if (videoDetail.value.content && !videoDetail.value.content.includes('<p')) {
        const paragraphs = videoDetail.value.content.split('\n').filter(p => p.trim())
        videoDetail.value.content = paragraphs
          .map(p => `<p style="text-indent: 32px;">${p}</p>`)
          .join('')
      }
      
      console.log('✅ 视频详情设置完成:', videoDetail.value)
      loading.value = false
      return
    }
    
    // 如果没有传递数据，从API加载（例如直接访问详情页URL）
    console.log('⚠️ 没有传递数据，从 API 加载')
    const data = await getExampleExpoDetail(videoId.value)
    videoDetail.value = data
    
    // 如果内容中没有段落标签，自动添加缩进样式
    if (data.content && !data.content.includes('<p')) {
      const paragraphs = data.content.split('\n').filter(p => p.trim())
      videoDetail.value.content = paragraphs
        .map(p => `<p style="text-indent: 32px;">${p}</p>`)
        .join('')
    }
    console.log('✅ 视频详情从 API 加载成功:', videoDetail.value)
  } catch (error) {
    console.error('❌ 加载视频详情失败:', error)
    // 失败时保持默认数据
  } finally {
    loading.value = false
  }
}

// 加载推荐视频列表
const loadRecommendVideos = async () => {
  try {
    const data = await getCourseExpoPageList({
      pageIndex: 1,
      pageSize: 4
    })
    recommendVideos.value = data.records
    console.log('✅ 推荐视频加载成功:', recommendVideos.value)
  } catch (error) {
    console.error('❌ 加载推荐视频失败:', error)
    // 使用默认数据
    recommendVideos.value = [
      {
        id: 1,
        createTime: '',
        name: '概率论与数理统计',
        coverUrl: '/images/home/video-2.jpg',
        college: '数学与统计学院',
        teachers: [{ name: '薛美玉' }],
        levelName: '国家示范',
        property: '',
        brief: '',
        docUrl: '',
        videoUrl: '',
        showStatPv: 3456,
        statPv: 3456
      },
      {
        id: 2,
        createTime: '',
        name: '概率论与数理统计',
        coverUrl: '/images/home/video-3.jpg',
        college: '数学与统计学院',
        teachers: [{ name: '薛美玉' }],
        levelName: '国家示范',
        property: '',
        brief: '',
        docUrl: '',
        videoUrl: '',
        showStatPv: 3456,
        statPv: 3456
      },
      {
        id: 3,
        createTime: '',
        name: '概率论与数理统计',
        coverUrl: '/images/home/video-4.jpg',
        college: '数学与统计学院',
        teachers: [{ name: '薛美玉' }],
        levelName: '国家示范',
        property: '',
        brief: '',
        docUrl: '',
        videoUrl: '',
        showStatPv: 3456,
        statPv: 3456
      },
      {
        id: 4,
        createTime: '',
        name: '概率论与数理统计',
        coverUrl: '/images/home/video-1.jpg',
        college: '数学与统计学院',
        teachers: [{ name: '薛美玉' }],
        levelName: '国家示范',
        property: '',
        brief: '',
        docUrl: '',
        videoUrl: '',
        showStatPv: 3456,
        statPv: 3456
      }
    ]
  }
}

// 格式化观看次数
const formatViewCount = (count: number) => {
  if (count >= 10000) {
    return (count / 10000).toFixed(0) + 'w+'
  }
  return count.toString()
}

// 格式化时间
const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  
  if (h > 0) {
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

// 播放/暂停切换
const togglePlay = () => {
  if (!videoPlayer.value) return
  
  if (isPlaying.value) {
    videoPlayer.value.pause()
  } else {
    videoPlayer.value.play()
  }
  isPlaying.value = !isPlaying.value
}

// 切换全屏
const toggleFullscreen = () => {
  if (!videoPlayer.value) return
  
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    videoPlayer.value.requestFullscreen()
  }
}

// 时间更新
const handleTimeUpdate = () => {
  if (!videoPlayer.value) return
  currentTime.value = videoPlayer.value.currentTime
  playedProgress.value = (currentTime.value / duration.value) * 100
}

// 加载元数据
const handleLoadedMetadata = () => {
  if (!videoPlayer.value) return
  duration.value = videoPlayer.value.duration
}

// 进度条点击
const handleProgressClick = (e: MouseEvent) => {
  if (!videoPlayer.value) return
  
  const progressBar = e.currentTarget as HTMLElement
  const rect = progressBar.getBoundingClientRect()
  const clickX = e.clientX - rect.left
  const percentage = clickX / rect.width
  
  videoPlayer.value.currentTime = percentage * duration.value
}

// 查看更多
const handleViewMore = () => {
  router.push('/study/courses')
}

// 点击推荐视频
const handleVideoClick = (id: number) => {
  const video = recommendVideos.value.find(v => v.id === id)
  if (video) {
    // 将视频数据转换为 Course 格式并存储
    const courseData = {
      id: String(video.id),
      title: video.name,
      cover: video.coverUrl,
      description: video.content || '',
      teacherList: video.teachers?.map((t, idx) => ({
        id: String(idx + 1),
        name: t.name,
        title: t.title || '教师',
        department: video.college
      })) || [],
      video: video.videoUrl || '/videos/hero-video.mp4',
      studentCount: video.statPv || video.showStatPv || 0,
      level: 'university' as const,
      status: 'published' as const,
      sort: 0,
      chapterCount: 0,
      totalDuration: 0,
      tags: [],
      createTime: video.createTime || '',
      updateTime: video.updateTime || ''
    }
    
    // 存储到 sessionStorage
    sessionStorage.setItem(`college-video-${id}`, JSON.stringify(courseData))
    console.log('🚀 推荐视频跳转，存储数据:', courseData)
  }
  
  router.push(`/study/college-video/${id}`)
}

// 监听路由变化
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      videoId.value = newId as string
      // 停止当前视频
      if (videoPlayer.value) {
        videoPlayer.value.pause()
        isPlaying.value = false
      }
      // 重新加载数据
      loadVideoDetail()
      loadRecommendVideos()
      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
)

onMounted(() => {
  loadVideoDetail()
  loadRecommendVideos()
})

onUnmounted(() => {
  // 清理视频播放
  if (videoPlayer.value) {
    videoPlayer.value.pause()
  }
})
</script>

<style scoped>
.college-video-detail {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #fff9ed;
}

.college-video-detail__bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1080px;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.college-video-detail__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.1;
}

.college-video-detail__container {
  position: relative;
  max-width: 1440px;
  margin: 0 auto;
  padding: 64px 0;
  z-index: 1;
}

/* 面包屑 */
.college-video-detail__breadcrumb {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #333;
  margin-bottom: 32px;
  line-height: 1.75;
}

.college-video-detail__breadcrumb .label,
.college-video-detail__breadcrumb .separator,
.college-video-detail__breadcrumb .link {
  opacity: 0.5;
  color: #333;
  text-decoration: none;
  white-space: nowrap;
}

.college-video-detail__breadcrumb .separator {
  margin: 0 4px;
}

.college-video-detail__breadcrumb .link:hover {
  opacity: 0.7;
}

.college-video-detail__breadcrumb .current {
  color: #bc2220;
}

/* 主要内容布局 */
.college-video-detail__content {
  display: flex;
  gap: 24px;
  align-items: stretch;
  margin-bottom: 64px;
}

/* 左侧文字讲稿卡片 */
.text-script-card {
  width: 364px;
  flex-shrink: 0;
  /* background: rgba(255, 255, 255, 0.1); */
  border: 1px solid #fdd4a6;
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.text-script-card .card-bg-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: 16px;
  overflow: hidden;
  z-index: 0;
  background-image: url('/images/Frame_1000015326.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.text-script-card__title {
  font-size: 24px;
  font-weight: 500;
  color: #bc2220;
  margin: 0;
  z-index: 1;
}

.text-script-card__content {
  font-size: 16px;
  line-height: 1.75;
  color: #333;
  z-index: 1;
  flex: 1;
  overflow-y: auto;
}

.text-script-card__content::-webkit-scrollbar {
  width: 4px;
}

.text-script-card__content::-webkit-scrollbar-thumb {
  background: #bc2220;
  border-radius: 2px;
}

.text-script-card__content :deep(p) {
  margin: 0 0 12px 0;
}

/* 右侧视频主卡片 */
.video-main-card {
  flex: 1;
  /* background: rgba(255, 255, 255, 0.9); */
  border: 1px solid #fdd4a6;
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.video-main-card .card-bg-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: 16px;
  overflow: hidden;
  z-index: 0;
  background-image: url('/images/Frame_1000015327.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* 视频信息头部 */
.video-info-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
}

.video-title {
  font-size: 24px;
  font-weight: 500;
  color: #bc2220;
  margin: 0;
}

.video-stats {
  font-size: 16px;
  color: #333;
}

.video-stats .label {
  opacity: 0.8;
}

.video-stats .value {
  color: #bc2220;
  font-weight: 500;
}

/* 视频播放器 */
.video-player-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  z-index: 1;
}

.video-player {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 视频控制栏 */
.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: opacity 0.3s;
}

.video-player-wrapper:hover .video-controls {
  opacity: 1;
}

/* 进度条 */
.progress-bar {
  position: relative;
  height: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.progress-bar::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.5);
}

.progress-played {
  position: absolute;
  left: 0;
  height: 3px;
  background: #fff;
  transition: width 0.1s;
  z-index: 1;
}

.progress-thumb {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
  transform: translateX(-50%);
  transition: left 0.1s;
  z-index: 2;
}

/* 控制功能条 */
.controls-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.time-display {
  font-size: 16px;
  color: #fff;
  font-family: 'Source Han Sans CN', sans-serif;
}

.control-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.control-btn:hover {
  transform: scale(1.1);
}

.control-btn svg {
  display: block;
}

.controls-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* 教工信息 */
.teacher-info {
  font-size: 16px;
  color: #333;
  z-index: 1;
}

.teacher-info .label {
  opacity: 0.8;
}

.teacher-info .value {
  color: #bc2220;
  font-weight: 500;
}

/* 推荐视频区域 */
.recommend-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.recommend-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.recommend-title {
  font-size: 24px;
  font-weight: 500;
  color: #bc2220;
  margin: 0;
}

.view-more-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  font-size: 16px;
  color: #333;
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 0.3s;
}

.view-more-btn:hover {
  opacity: 1;
}

.view-more-btn svg {
  display: block;
}

/* 推荐视频列表 */
.recommend-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

/* 视频卡片 */
.video-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(188, 34, 32, 0.15);
}

.video-card__cover {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.video-card__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.video-card:hover .video-card__cover img {
  transform: scale(1.05);
}

.video-card__badge {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 8px;
  background: linear-gradient(270deg, #bc2220 0%, #bc7120 100%);
  color: #fff;
  font-size: 14px;
  border-radius: 0 0 0 8px;
}

.video-card__info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.video-card__title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 2.5em;
}

.video-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}

.video-card__description {
  color: #333;
  opacity: 0.5;
}

.video-card__views {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #333;
  opacity: 0.5;
}

.video-card__views svg {
  display: block;
}

/* 响应式 */
@media (max-width: 1440px) {
  .college-video-detail__container {
    padding-left: 24px;
    padding-right: 24px;
  }
}

@media (max-width: 1200px) {
  .recommend-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .college-video-detail__content {
    flex-direction: column;
  }

  .text-script-card {
    width: 100%;
  }

  .recommend-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .recommend-list {
    grid-template-columns: 1fr;
  }
}
</style>

