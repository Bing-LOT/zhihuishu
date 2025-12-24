<template>
  <div class="example-detail-page">
    <!-- 背景图 -->
    <div class="detail-bg">
      <img src="/images/indexBg.png" alt="" />
    </div>

    <div class="detail-container">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <span class="breadcrumb-item">您的位置：</span>
        <span class="breadcrumb-item clickable" @click="$router.push('/topics')">习思想的伟大实践</span>
        <span class="breadcrumb-item">&gt;&gt;</span>
        <span class="breadcrumb-item">习思想优秀视频展播</span>
        <span class="breadcrumb-item">&gt;&gt;</span>
        <span class="breadcrumb-item">更多视频</span>
        <span class="breadcrumb-item">&gt;&gt;</span>
        <span class="breadcrumb-item active">视频详情</span>
      </div>

      <!-- 主内容区 -->
      <div class="main-content">
        <!-- 左侧：课程信息卡片 -->
        <div class="info-card">
          <div class="card-cover">
            <img :src="exampleDetail?.coverUrl || '/images/home/video-1.jpg'" alt="" />
          </div>
          <h3 class="card-title">{{ exampleDetail?.name || '加载中...' }}</h3>
          <div class="card-info">
            <div class="info-row">
              <span class="info-label">主讲教师：</span>
              <div class="teacher-list">
                <span 
                  v-for="(teacher, index) in exampleDetail?.teachers" 
                  :key="index" 
                  class="teacher-name"
                >
                  {{ teacher.name }}
                </span>
                <span v-if="!exampleDetail?.teachers || exampleDetail.teachers.length === 0" class="teacher-name">-</span>
              </div>
            </div>
            <div class="info-row">
              <span class="info-label">案例名称：</span>
              <span class="info-value">{{ exampleDetail?.name || '-' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">课程性质：</span>
              <span class="info-value">{{ exampleDetail?.property || '-' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">入选方向：</span>
              <span class="info-value">{{ exampleDetail?.direction || '-' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">学院类型：</span>
              <span class="info-value">{{ exampleDetail?.college || '-' }}</span>
            </div>
            <div class="info-row full">
              <span class="info-label">思政元素：</span>
              <span class="info-value">{{ exampleDetail?.content || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 右侧：视频播放区 -->
        <div class="video-card">
          <!-- 标题和观看次数 -->
          <div class="video-header">
            <h2 class="video-title">{{ exampleDetail?.name || '加载中...' }}</h2>
            <div class="view-count">
              观看次数：<span class="count-number">{{ formatViewCount(exampleDetail?.statPv || 0) }}</span>
            </div>
          </div>

          <!-- 视频播放器 -->
          <div class="video-player-wrapper">
            <video
              v-if="exampleDetail?.videoUrl"
              ref="videoPlayerRef"
              class="video-player"
              :src="exampleDetail.videoUrl"
              controls
              controlsList="nodownload"
            >
              您的浏览器不支持视频播放
            </video>
            <div v-else class="video-placeholder">
              <p>视频加载中...</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 其他示范案例展播 -->
      <div class="recommend-section">
        <div class="recommend-header">
          <h3 class="recommend-title">其他示范案例展播</h3>
          <button class="more-btn" @click="$router.push('/topics')">
            <span>查看更多</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="#333333" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <div class="recommend-grid">
          <CourseCard
            v-for="example in recommendList"
            :key="example.id"
            :course="example"
            @click="handleExampleClick(example)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CourseCard from '@/components/common/CourseCard/index.vue'
import { getXiThoughtExampleDetail, getXiThoughtExampleTopList } from '@/api/redCulture'
import type { XiThoughtExampleVideo } from '@/api/redCulture'
import type { Course } from '@/types'

const route = useRoute()
const router = useRouter()

const exampleDetail = ref<XiThoughtExampleVideo | null>(null)
const recommendList = ref<Course[]>([])
const videoPlayerRef = ref<HTMLVideoElement>()

// 格式化观看次数
const formatViewCount = (count: number): string => {
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + 'w+'
  }
  return count.toString()
}

// 将示例案例数据转换为 Course 格式
const convertExampleToCourse = (example: XiThoughtExampleVideo): Course => {
  return {
    id: String(example.id),
    title: example.name,
    cover: example.coverUrl,
    description: example.content || '',
    level: 'primary' as any,
    teacherList: example.teachers?.map((teacher, index) => ({
      id: String(example.id) + '-' + index,
      name: teacher.name,
      title: teacher.title || '教师',
      avatar: '',
      bio: '',
      department: example.college || ''
    })) || [],
    sort: 0,
    status: 'published' as any,
    studentCount: example.statPv || 0,
    chapterCount: 0,
    totalDuration: 0,
    tags: [example.direction || ''].filter(Boolean),
    createTime: example.createTime,
    updateTime: example.createTime,
    video: example.videoUrl || ''
  }
}

// 获取案例详情
const fetchExampleDetail = async () => {
  const id = route.params.id as string
  if (!id) {
    console.error('缺少案例ID')
    return
  }

  try {
    const response = await getXiThoughtExampleDetail(id)
    exampleDetail.value = response
  } catch (error) {
    console.error('获取案例详情失败：', error)
  }
}

// 获取推荐列表
const fetchRecommendList = async () => {
  try {
    const response = await getXiThoughtExampleTopList()
    if (response && Array.isArray(response)) {
      // 过滤掉当前案例，最多显示4个
      const currentId = route.params.id as string
      recommendList.value = response
        .filter(item => String(item.id) !== currentId)
        .slice(0, 4)
        .map(convertExampleToCourse)
    }
  } catch (error) {
    console.error('获取推荐列表失败：', error)
  }
}

// 处理案例点击
const handleExampleClick = (example: Course) => {
  router.push(`/topics/example/${example.id}`)
}

onMounted(() => {
  fetchExampleDetail()
  fetchRecommendList()
})
</script>

<style scoped>
.example-detail-page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-bottom: 80px;
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
  padding: 64px 0;
  z-index: 1;
}

/* 面包屑 */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 32px;
  font-size: 16px;
  line-height: 1.75;
}

.breadcrumb-item {
  color: #333;
  opacity: 0.5;
  white-space: nowrap;
}

.breadcrumb-item.clickable {
  cursor: pointer;
}

.breadcrumb-item.clickable:hover {
  opacity: 0.8;
}

.breadcrumb-item.active {
  color: #bc2220;
  opacity: 1;
}

/* 主内容区 */
.main-content {
  display: flex;
  gap: 24px;
  margin-bottom: 64px;
}

/* 左侧信息卡片 */
.info-card {
  width: 364px;
  flex-shrink: 0;
  /* background: rgba(236, 221, 185, 0.9); */
  border: 1px solid #fdd4a6;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  overflow: hidden;
}

.info-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/images/Frame_1000015326.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.2;
  pointer-events: none;
  z-index: 0;
}

.info-card > * {
  position: relative;
  z-index: 1;
}

.card-cover {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
}

.card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-title {
  font-size: 18px;
  font-weight: 500;
  color: #bc2220;
  margin: 0;
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-row {
  display: flex;
  align-items: flex-start;
  font-size: 16px;
}

.info-row.full {
  flex-direction: column;
  gap: 4px;
}

.info-label {
  color: #333;
  flex-shrink: 0;
}

.info-value {
  color: #bc2220;
  flex: 1;
  word-break: break-word;
}

.teacher-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.teacher-name {
  color: #bc2220;
}

/* 右侧视频卡片 */
.video-card {
  flex: 1;
  /* background: rgba(236, 221, 185, 0.9); */
  border: 1px solid #fdd4a6;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  overflow: hidden;
}

.video-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/images/Frame_1000015327.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.2;
  pointer-events: none;
  z-index: 0;
}

.video-card > * {
  position: relative;
  z-index: 1;
}

.video-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
}

.count-number {
  color: #bc2220;
}

.video-player-wrapper {
  flex: 1;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.video-player {
  width: 100%;
  height: 100%;
}

.video-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
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
}

.more-btn:hover {
  opacity: 1;
}

.recommend-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
</style>

