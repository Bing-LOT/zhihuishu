<template>
  <div class="video-detail-page">
    <!-- 背景图 -->
    <div class="detail-bg">
      <img src="/images/indexBg.png" alt="" />
    </div>

    <div class="detail-container">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <span class="breadcrumb-item">您的位置：</span>
        <span class="breadcrumb-item" @click="$router.push('/topics')">习思想的伟大实践</span>
        <span class="breadcrumb-item">&gt;&gt;</span>
        <span class="breadcrumb-item">习思想优秀视频展播</span>
        <span class="breadcrumb-item">&gt;&gt;</span>
        <span class="breadcrumb-item">更多视频</span>
        <span class="breadcrumb-item">&gt;&gt;</span>
        <span class="breadcrumb-item active">视频详情</span>
      </div>

      <!-- 主内容区 -->
      <div class="main-content">
        <!-- 左侧：文字讲稿 -->
        <div class="transcript-section">
          <h3 class="section-title">文字讲稿</h3>
          <div class="transcript-content" v-html="videoDetail?.content || '暂无讲稿内容'"></div>
        </div>

        <!-- 右侧：视频信息 -->
        <div class="video-section">
          <!-- 标题和观看次数 -->
          <div class="video-header">
            <h2 class="video-title">{{ videoDetail?.title || '加载中...' }}</h2>
            <div class="view-count">
              观看次数：<span class="count-number">{{ formatViewCount(videoDetail?.statPv || 0) }}</span>
            </div>
          </div>

          <!-- 视频播放器 -->
          <div class="video-player-wrapper">
            <video
              v-if="videoDetail?.videoUrl"
              ref="videoPlayerRef"
              class="video-player"
              :src="videoDetail.videoUrl"
              controls
              controlsList="nodownload"
              @loadedmetadata="onVideoLoaded"
              @timeupdate="onTimeUpdate"
            >
              您的浏览器不支持视频播放
            </video>
            <div v-else class="video-placeholder">
              <p>视频加载中...</p>
            </div>
          </div>

          <!-- 视频信息 -->
          <div class="video-info">
            <div class="info-left">
              <span class="info-label">主持人：</span>
              <div class="presenter-list">
                <span v-for="(presenter, index) in presenterList" :key="index" class="presenter-name">
                  {{ presenter }}
                </span>
              </div>
            </div>
            <div class="info-right">
              <span class="info-item">
                所在单位：<span class="info-value">{{ videoDetail?.college || '-' }}</span>
              </span>
              <span class="info-item">
                展播系列：<span class="info-value">{{ videoDetail?.expoType || '-' }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 其他优秀视频展播 -->
      <div class="recommend-section">
        <div class="recommend-header">
          <h3 class="recommend-title">其他优秀视频展播</h3>
          <button class="more-btn" @click="$router.push('/topics')">
            <span>查看更多</span>
<img src="/images/arrow-right.svg" alt="">
          </button>
        </div>

        <div class="recommend-grid">
          <CourseCard
            v-for="video in recommendList"
            :key="video.id"
            :course="video"
            @click="handleVideoClick(video)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CourseCard from '@/components/common/CourseCard/index.vue'
import { getXiThoughtVideoTopList, getXiThoughtVideoDetail } from '@/api/redCulture'
import type { XiThoughtVideo } from '@/api/redCulture'
import type { Course } from '@/types'

const route = useRoute()
const router = useRouter()

// 视频详情数据
const videoDetail = ref<XiThoughtVideo | null>(null)
const recommendList = ref<Course[]>([])
const videoPlayerRef = ref<HTMLVideoElement>()

// 主持人列表（支持多个主持人）
const presenterList = computed(() => {
  if (!videoDetail.value?.presenter) return []
  return videoDetail.value.presenter.split(/[,，、]/).map(name => name.trim()).filter(Boolean)
})

// 格式化观看次数
const formatViewCount = (count: number): string => {
  if (count >= 10000) {
    return Math.floor(count / 10000) + 'w+'
  }
  return count.toString()
}

// 将 API 数据转换为 Course 格式
const convertVideoToCourse = (video: XiThoughtVideo): Course => {
  return {
    id: String(video.id),
    title: video.title,
    cover: video.coverUrl,
    description: video.content,
    level: 'primary' as any,
    teacherList: [{
      id: String(video.id),
      name: video.presenter || '未知',
      title: '主讲人',
      avatar: '',
      bio: '',
      department: video.college
    }],
    sort: 0,
    status: 'published' as any,
    studentCount: video.statPv,
    chapterCount: 0,
    totalDuration: 0,
    tags: [video.expoType],
    createTime: video.createTime,
    updateTime: video.createTime,
    video: video.videoUrl
  }
}

// 获取视频详情和推荐列表
const fetchVideoDetail = async () => {
  try {
    const videoId = route.params.id as string
    
    // 获取视频详情
    const detail = await getXiThoughtVideoDetail(videoId)
    if (detail) {
      videoDetail.value = detail
    }
    
    // 获取推荐视频列表
    const topList = await getXiThoughtVideoTopList()
    if (topList && Array.isArray(topList)) {
      // 获取推荐视频（排除当前视频）
      const otherVideos = topList.filter(v => String(v.id) !== videoId).slice(0, 4)
      recommendList.value = otherVideos.map(convertVideoToCourse)
    }
  } catch (error) {
    console.error('获取视频详情失败：', error)
  }
}

// 视频加载完成
const onVideoLoaded = () => {
  console.log('视频加载完成')
}

// 视频时间更新
const onTimeUpdate = () => {
  // 可以在这里处理播放进度
}

// 点击推荐视频
const handleVideoClick = async (video: Course) => {
  await router.push(`/topics/video/${video.id}`)
  // 重新加载数据
  await fetchVideoDetail()
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  fetchVideoDetail()
})
</script>

<style scoped>
.video-detail-page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #fff9ed;
}

.detail-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.detail-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.1;
}

.detail-container {
  position: relative;
  max-width: 1440px;
  margin: 0 auto;
  padding: 64px 0 80px;
  z-index: 1;
}

/* 面包屑导航 */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  line-height: 1.75;
  margin-bottom: 32px;
}

.breadcrumb-item {
  color: #333;
  opacity: 0.5;
  cursor: pointer;
  white-space: nowrap;
}

.breadcrumb-item.active {
  color: #bc2220;
  opacity: 1;
  cursor: default;
}

/* 主内容区 */
.main-content {
  display: flex;
  gap: 24px;
  margin-bottom: 64px;
}

/* 文字讲稿 */
.transcript-section {
  width: 364px;
  flex-shrink: 0;
  border: 1px solid #fdd4a6;
  border-radius: 16px;
  padding: 24px;
  background-color: #ecd9ba;
  background-image: url('/images/Frame_1000015326.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.section-title {
  font-size: 24px;
  font-weight: 500;
  color: #bc2220;
  margin: 0 0 12px;
  position: relative;
  z-index: 1;
}

.transcript-content {
  font-size: 16px;
  line-height: 1.75;
  color: #333;
  position: relative;
  z-index: 1;
  max-height: 600px;
  overflow-y: auto;
}

.transcript-content :deep(p) {
  text-indent: 32px;
  margin-bottom: 12px;
}

/* 视频区域 */
.video-section {
  flex: 1;
  border: 1px solid #fdd4a6;
  border-radius: 16px;
  padding: 24px;
  background-color: #ecd9ba;
  background-image: url('/images/Frame_1000015327.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.video-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}

.video-title {
  font-size: 24px;
  font-weight: 500;
  color: #bc2220;
  margin: 0;
  flex: 1;
}

.view-count {
  font-size: 16px;
  color: #333;
  white-space: nowrap;
}

.count-number {
  color: #bc2220;
}

/* 视频播放器 */
.video-player-wrapper {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}

.video-player {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
}

/* 视频信息 */
.video-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  position: relative;
  z-index: 1;
}

.info-left {
  display: flex;
  align-items: center;
  gap: 4px;
}

.info-label {
  color: #333;
}

.presenter-list {
  display: flex;
  gap: 16px;
}

.presenter-name {
  color: #bc2220;
}

.info-right {
  display: flex;
  gap: 32px;
}

.info-item {
  color: #333;
}

.info-value {
  color: #bc2220;
}

/* 推荐区域 */
.recommend-section {
  margin-top: 64px;
}

.recommend-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.recommend-title {
  font-size: 24px;
  font-weight: 500;
  color: #bc2220;
  margin: 0;
}

.more-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 16px;
  color: #333;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.more-btn:hover {
  opacity: 1;
}

.recommend-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

/* 响应式 */
@media (max-width: 1440px) {
  .detail-container {
    padding-left: 40px;
    padding-right: 40px;
  }
}
</style>


