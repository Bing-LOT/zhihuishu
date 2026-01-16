<template>
  <div class="college-detail-page">
    <!-- Header -->
    <AppHeader />

    <!-- 导航栏 -->
    <AppNavigation />

    <!-- Banner -->
    <div class="banner-section">
      <div class="banner-overlay"></div>
      <h1 class="banner-title">一院一品</h1>
    </div>

    <!-- 主内容 -->
    <div class="main-content">
      <!-- 面包屑 -->
      <div class="breadcrumb">
        <span class="breadcrumb-text">您的位置： </span>
        <router-link to="/" class="breadcrumb-link">首页</router-link>
        <span class="breadcrumb-text"> >> </span>
        <router-link to="/college" class="breadcrumb-link">一院一品</router-link>
        <span class="breadcrumb-text"> >> </span>
        <span class="breadcrumb-current">作品详情</span>
      </div>

      <!-- 作品信息卡片 -->
      <div v-if="!loading && detail" class="detail-card">
        <div class="detail-cover">
          <img :src="detail.coverUrl" :alt="detail.name" />
          <!-- 示范等级标签 -->
          <div v-if="detail.levelName" class="level-badge">
            {{ detail.levelName }}
          </div>
        </div>
        <div class="detail-info">
          <h2 class="detail-title">{{ detail.name }}</h2>
          <div class="detail-college">
            <span class="label">所属学院：</span>
            <span class="value">{{ detail.college }}</span>
          </div>
          <div class="detail-intro">
            <div class="intro-header">
              <div class="intro-indicator"></div>
              <span class="intro-title">课程简介</span>
            </div>
            <div class="intro-content">
              <p>{{ detail.brief || '暂无简介' }}</p>
            </div>
          </div>
          <div class="detail-stats">
            <el-icon class="stats-icon"><View /></el-icon>
            <span class="stats-label">累计观看人数</span>
            <span class="stats-count">{{ detail.statPv }}</span>
            <span class="stats-unit">人</span>
          </div>
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="loading-wrapper">
        <el-icon class="is-loading"><Loading /></el-icon>
        <span>加载中...</span>
      </div>

      <!-- 内容区域 -->
      <div v-if="!loading && detail" class="content-section">
        <!-- 左侧导航 -->
        <div class="side-nav">
          <div
            class="nav-item"
            :class="{ active: activeTab === 'video' }"
            @click="activeTab = 'video'"
          >
            <div class="nav-indicator"></div>
            <span>作品视频</span>
          </div>
          <div
            class="nav-item"
            :class="{ active: activeTab === 'intro' }"
            @click="activeTab = 'intro'"
          >
            <div class="nav-indicator"></div>
            <span>图文介绍（待定）</span>
          </div>
        </div>

        <!-- 右侧内容 -->
        <div class="content-main">
          <!-- 标题栏 -->
          <div class="content-header">
            <div class="header-indicator"></div>
            <h3 class="header-title">作品视频</h3>
          </div>
          <div class="header-divider"></div>

          <!-- 视频播放器 -->
          <div v-if="activeTab === 'video'" class="video-section">
            <div class="video-player-wrapper">
              <VideoPlayer
                v-if="currentVideoUrl"
                :src="currentVideoUrl"
                :poster="detail.coverUrl"
              />
              <div v-else class="no-video">
                <p>暂无视频</p>
              </div>
            </div>

            <!-- 视频列表 -->
            <div v-if="videoList.length > 0" class="video-list">
              <div
                v-for="(video, index) in videoList"
                :key="index"
                class="video-item"
                @click="playVideo(video)"
              >
                <div class="video-thumbnail">
                  <img :src="video.thumbnail || detail.coverUrl" :alt="video.name" />
                  <div class="video-overlay">
                    <div class="play-icon">
                      <el-icon :size="24"><VideoPlay /></el-icon>
                    </div>
                  </div>
                </div>
                <div class="video-name">{{ video.name }}</div>
              </div>
            </div>
          </div>

          <!-- 图文介绍 -->
          <div v-if="activeTab === 'intro'" class="intro-section">
            <div class="intro-placeholder">
              <p>图文介绍功能开发中...</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 相关推荐 -->
      <div v-if="!loading" class="recommend-section">
        <div class="recommend-header">
          <div class="section-title">
            <span class="title-highlight">相关</span>
            <span class="title-normal">推荐</span>
          </div>
          <div class="title-decoration"></div>
        </div>

        <div v-if="recommendList.length > 0" class="recommend-grid">
          <div
            v-for="item in recommendList"
            :key="item.id"
            class="recommend-card"
            @click="goToDetail(item.id)"
          >
            <div class="card-image">
              <img :src="item.coverUrl" :alt="item.name" />
              <div class="card-overlay">
                <span class="college-name">{{ item.college }}</span>
              </div>
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ item.name }}</h3>
              <div class="card-footer">
                <span class="publish-date">发布时间:{{ formatDate(item.createTime) }}</span>
                <div class="view-count">
                  <el-icon><View /></el-icon>
                  <span>{{ item.statPv }}人</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <PageFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { View, Loading, VideoPlay } from '@element-plus/icons-vue'
import AppHeader from '@/components/common/AppHeader/index.vue'
import AppNavigation from '@/components/common/AppNavigation/index.vue'
import PageFooter from '@/components/common/PageFooter/index.vue'
import VideoPlayer from '@/components/common/VideoPlayer/index.vue'
import { getCollegeDetail, getCollegePageList, type CollegeItem } from '@/api/college'

const route = useRoute()
const router = useRouter()

// 数据
const detail = ref<CollegeItem | null>(null)
const loading = ref(false)
const activeTab = ref('video')
const currentVideoUrl = ref('')
const recommendList = ref<CollegeItem[]>([])

// 视频列表（模拟数据，实际应从 API 获取）
const videoList = ref([
  { name: '视频名称', url: '', thumbnail: '' },
  { name: '视频名称', url: '', thumbnail: '' },
  { name: '视频名称', url: '', thumbnail: '' },
  { name: '视频名称', url: '', thumbnail: '' }
])

// 格式化日期
const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 加载详情
const loadDetail = async () => {
  const id = Number(route.params.id)
  if (!id) {
    ElMessage.error('参数错误')
    router.push('/college')
    return
  }

  loading.value = true
  try {
    detail.value = await getCollegeDetail(id)
    currentVideoUrl.value = detail.value.videoUrl || ''
    
    // 加载推荐列表
    loadRecommendList()
  } catch (error) {
    console.error('加载详情失败:', error)
    ElMessage.error('加载失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 加载推荐列表
const loadRecommendList = async () => {
  try {
    const result = await getCollegePageList({
      pageIndex: 1,
      pageSize: 4,
      showFront: 1
    })
    // 过滤掉当前详情项
    recommendList.value = result.records.filter(item => item.id !== detail.value?.id).slice(0, 4)
  } catch (error) {
    console.error('加载推荐列表失败:', error)
  }
}

// 播放视频
const playVideo = (video: any) => {
  if (video.url) {
    currentVideoUrl.value = video.url
  } else {
    ElMessage.warning('该视频暂无播放地址')
  }
}

// 跳转详情
const goToDetail = (id: number) => {
  router.push(`/college/detail/${id}`)
  // 重新加载详情
  loadDetail()
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  loadDetail()
})
</script>

<style scoped>
.college-detail-page {
  min-height: 100vh;
  background: #fff;
}

/* Banner */
.banner-section {
  position: relative;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #c30d23 0%, #8b0a19 50%, #c30d23 100%);
  background-size: cover;
  background-position: center;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
}

.banner-title {
  position: relative;
  margin: 0;
  font-size: 56px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: bold;
  background: linear-gradient(to bottom, #fff 0%, #f7eea4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 2px 8px 2px rgba(0, 0, 0, 0.15);
}

/* 主内容 */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 60px;
}

/* 面包屑 */
.breadcrumb {
  display: flex;
  align-items: center;
  padding: 24px 0;
  border-bottom: 1px solid #ebebeb;
  font-size: 16px;
  line-height: 1.75;
  color: #333;
}

.breadcrumb-text {
  opacity: 0.5;
}

.breadcrumb-link {
  color: #333;
  opacity: 0.5;
  text-decoration: none;
}

.breadcrumb-link:hover {
  opacity: 0.7;
}

.breadcrumb-current {
  color: #c30d23;
}

/* 详情卡片 */
.detail-card {
  display: flex;
  gap: 32px;
  margin-top: 40px;
  padding: 16px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.detail-cover {
  position: relative;
  width: 540px;
  height: 304px;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
}

.detail-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.level-badge {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 8px;
  background: linear-gradient(to left, #bc7120 0%, #bc2220 100%);
  color: #fff;
  font-size: 14px;
  border-bottom-left-radius: 4px;
  border-top-right-radius: 4px;
  font-family: 'Source Han Sans CN', sans-serif;
}

.detail-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.detail-title {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  font-family: 'Source Han Sans CN', sans-serif;
}

.detail-college {
  font-size: 14px;
  color: #333;
}

.detail-college .label {
  opacity: 0.5;
}

.detail-intro {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 10px 0;
  background: #f9f9f9;
}

.intro-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0;
}

.intro-indicator {
  width: 5px;
  height: 16px;
  background: #c30d23;
}

.intro-title {
  font-size: 16px;
  color: #c30d23;
  font-family: 'Source Han Sans CN', sans-serif;
}

.intro-content {
  padding: 0 13px;
}

.intro-content p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  opacity: 0.5;
}

.detail-stats {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  font-size: 14px;
  color: #333;
}

.stats-icon {
  font-size: 20px;
  opacity: 0.5;
}

.stats-label {
  opacity: 0.5;
}

.stats-count {
  color: #c30d23;
  font-weight: bold;
}

.stats-unit {
  opacity: 0.5;
}

/* 加载状态 */
.loading-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  gap: 12px;
  color: #999;
}

/* 内容区域 */
.content-section {
  display: flex;
  gap: 0;
  margin-top: 40px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.side-nav {
  width: 214px;
  flex-shrink: 0;
  background: #f9f9f9;
  padding: 24px 0 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 24px 8px 24px;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 4px;
  font-size: 18px;
  color: #333;
  font-family: 'Source Han Sans CN', sans-serif;
}

.nav-item .nav-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #999;
  flex-shrink: 0;
}

.nav-item.active {
  background: #c30d23;
  color: #fff;
}

.nav-item.active .nav-indicator {
  background: #fff;
}

.content-main {
  flex: 1;
  background: #fff;
  padding: 32px 24px 24px 48px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.content-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-indicator {
  width: 5px;
  height: 20px;
  background: #c30d23;
  flex-shrink: 0;
}

.header-title {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  font-family: 'Source Han Sans CN', sans-serif;
}

.header-divider {
  height: 1px;
  background: #e5e5e5;
}

/* 视频区域 */
.video-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.video-player-wrapper {
  width: 100%;
  height: 514px;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}

.no-video {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
  font-size: 18px;
}

.video-list {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 8px 0;
}

.video-item {
  width: 240px;
  flex-shrink: 0;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
}

.video-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.video-thumbnail {
  position: relative;
  width: 100%;
  height: 135px;
  overflow: hidden;
}

.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.video-item:hover .video-overlay {
  opacity: 1;
}

.play-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c30d23;
}

.video-name {
  padding: 12px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 图文介绍 */
.intro-section {
  padding: 40px 0;
}

.intro-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  color: #999;
  font-size: 16px;
}

/* 相关推荐 */
.recommend-section {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.recommend-header {
  display: flex;
  align-items: center;
  gap: 20px;
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  font-family: 'Source Han Sans CN', sans-serif;
  white-space: nowrap;
}

.title-highlight {
  color: #c30d23;
}

.title-normal {
  color: #333;
}

.title-decoration {
  flex: 1;
  height: 15px;
  background: repeating-linear-gradient(
    90deg,
    #c30d23 0px,
    #c30d23 3px,
    transparent 3px,
    transparent 8px
  );
  background-size: 8px 15px;
  background-position: left center;
}

.recommend-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.recommend-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s;
}

.recommend-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-image {
  position: relative;
  width: 100%;
  aspect-ratio: 364 / 200;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.recommend-card:hover .card-image img {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 6px 12px;
}

.college-name {
  font-size: 14px;
  color: #fff;
}

.card-content {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-title {
  font-size: 16px;
  color: #333;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: #333;
  opacity: 0.5;
}

.view-count {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
}

/* 响应式 */
@media (max-width: 1200px) {
  .recommend-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .detail-card {
    flex-direction: column;
  }
  
  .detail-cover {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
  }
}

@media (max-width: 768px) {
  .recommend-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .content-section {
    flex-direction: column;
  }
  
  .side-nav {
    width: 100%;
    flex-direction: row;
    padding: 16px;
  }
  
  .banner-title {
    font-size: 32px;
  }
}

@media (max-width: 480px) {
  .recommend-grid {
    grid-template-columns: 1fr;
  }
}
</style>

