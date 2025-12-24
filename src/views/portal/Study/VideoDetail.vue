<template>
  <div class="course-detail">
    <!-- 背景层 -->
    <div class="course-detail__bg">
      <img src="/images/indexBg.png" alt="" />
    </div>

    <div class="course-detail__container">
      <!-- 面包屑 -->
      <div class="course-detail__breadcrumb">
        <span class="label">您的位置：</span>
        <router-link to="/study" class="link">学习中心</router-link>
        <span class="separator">>></span>
        <router-link to="/overview" class="link">党员教师课程思政示范课展播</router-link>
        <span class="separator">>></span>
        <span class="current">{{ course.title || '课程详情' }}</span>
      </div>

      <div class="course-detail__content">
        <!-- 左侧信息栏 -->
        <div class="course-info-card">
          <!-- 装饰背景 -->
          <div class="card-bg-decoration">
            <div class="bg-gradient"></div>
            <div class="bg-pattern"></div>
          </div>

          <!-- 封面图 -->
          <div class="course-info__cover-wrapper">
            <img :src="course.cover" :alt="course.title" class="course-cover" />
            <div class="course-info__badge" v-if="course.badge">
              <div class="badge-bg"></div>
              <span>{{ course.badge }}</span>
            </div>
          </div>

          <h1 class="course-info__title">{{ course.title }}</h1>

          <div class="course-info__meta">
            <div class="course-info__row">
              <span class="label">主讲教师：</span>
              <div class="teachers highlight">
                <span v-for="(teacher, index) in course.teacherList" :key="index" class="teacher-item">
                  {{ teacher.name }}
                </span>
              </div>
            </div>
            <div class="course-info__row">
              <span class="label">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;院：</span>
              <span class="highlight">{{ course.college || '暂无' }}</span>
            </div>
            <div class="course-info__row">
              <span class="label">累计观看学习：</span>
              <span class="highlight">{{ course.studentCount }}人</span>
            </div>
          </div>
        </div>

        <!-- 右侧内容栏 -->
        <div class="course-main-content">
          <!-- 标签页导航 -->
          <div class="course-tabs">
            <button 
              v-for="tab in tabs" 
              :key="tab.value"
              class="course-tab-btn"
              :class="{ 'active': currentTab === tab.value }"
              @click="currentTab = tab.value"
            >
              <div class="dot"></div>
              <span>{{ tab.label }}</span>
              <div class="dot"></div>
            </button>
          </div>

          <!-- 标签页内容 -->
          <div class="course-tab-content">
            <!-- 课程简介 -->
            <div v-if="currentTab === 'intro'" class="course-intro text-content">
              <div v-if="course.brief" v-html="course.brief"></div>
              <p v-else style="text-indent: 0; opacity: 0.5;">暂无课程简介</p>
            </div>
            
            <!-- 教学设计 -->
            <div v-else-if="currentTab === 'design'" class="course-design text-content">
              <div v-if="course.docUrl" class="doc-download">
                <h3>教学设计文档</h3>
                <a :href="course.docUrl" target="_blank" class="download-btn">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 13L6 9H8.5V4H11.5V9H14L10 13Z" fill="currentColor"/>
                    <path d="M4 14H16V16H4V14Z" fill="currentColor"/>
                  </svg>
                  <span>下载教学设计文档</span>
                </a>
              </div>
              <p v-else style="text-indent: 0; opacity: 0.5;">暂无教学设计文档</p>
            </div>
            
            <!-- 教学视频 -->
            <div v-else-if="currentTab === 'video'" class="course-video">
              <div v-if="course.videoUrl" class="video-player">
                <video 
                  :src="course.videoUrl"
                  controls
                  class="video-content"
                >
                </video>
              </div>
              <p v-else style="text-indent: 0; opacity: 0.5; text-align: center; padding: 40px 0;">暂无教学视频</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getCourseExpoDetail, type CourseExpoItem } from '@/api/course'

/**
 * 课程详情页
 */
const route = useRoute()
const courseId = route.params.id as string

// 课程数据
const course = ref({
  id: '',
  title: '',
  cover: '',
  badge: '',
  studentCount: 0,
  college: '',
  teacherList: [] as Array<{ name: string; title: string }>,
  brief: '',
  docUrl: '',
  videoUrl: ''
})

// 获取课程详情
const fetchCourseDetail = async () => {
  try {
    const data = await getCourseExpoDetail(courseId)
    course.value = {
      id: data.id.toString(),
      title: data.name,
      cover: data.coverUrl,
      badge: data.levelName,
      studentCount: data.statPv,
      college: data.college,
      teacherList: data.teachers.map(t => ({
        name: t.name,
        title: t.department || '教师'
      })),
      brief: data.brief,
      docUrl: data.docUrl,
      videoUrl: data.videoUrl
    }
  } catch (error) {
    console.error('获取课程详情失败:', error)
  }
}

// 标签页配置
const tabs = [
  { label: '课程简介', value: 'intro' },
  { label: '教学设计', value: 'design' },
  { label: '教学视频', value: 'video' }
]

const currentTab = ref('intro')

onMounted(() => {
  fetchCourseDetail()
})
</script>

<style scoped>
.course-detail {
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-bottom: 80px;
}

.course-detail__bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.course-detail__bg img {
  width: 100%;
  object-fit: cover;
  opacity: 0.1;
}

.course-detail__container {
  position: relative;
  max-width: 1440px; /* 根据设计稿调整宽度 */
  margin: 0 auto;
  padding: 40px 0;
  z-index: 1;
}

/* 面包屑 */
.course-detail__breadcrumb {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #333;
  margin-bottom: 32px;
  justify-content: flex-end; /* 右对齐 */
}

.course-detail__breadcrumb .label,
.course-detail__breadcrumb .separator,
.course-detail__breadcrumb .link {
  opacity: 0.5;
  color: #333;
  text-decoration: none;
}

.course-detail__breadcrumb .separator {
  margin: 0 8px;
}

.course-detail__breadcrumb .current {
  color: #bc2220;
}

/* 内容布局 */
.course-detail__content {
  display: flex;
  gap: 24px;
  align-items: stretch;
}

/* 左侧信息卡片 */
.course-info-card {
  width: 364px;
  flex-shrink: 0;
  background: #fff;
  border: 1px solid #fdd4a6;
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-bg-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: 16px;
  overflow: hidden;
  z-index: 0;
}

.card-bg-decoration .bg-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgb(236, 217, 186) 0%, rgb(236, 217, 186) 100%), linear-gradient(90deg, rgb(213, 1, 0) 0%, rgb(213, 1, 0) 100%);
  opacity: 0.1;
}

.course-info__cover-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  z-index: 1;
}

.course-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-info__badge {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 8px;
  background: linear-gradient(270deg, #bc2220 0%, #bc7120 100%);
  color: #fff;
  font-size: 14px;
  border-radius: 0 8px 0 8px;
}

.course-info__title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin: 8px 0;
  z-index: 1;
}

.course-info__meta {
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 1;
}

.course-info__row {
  display: flex;
  align-items: flex-start;
  font-size: 16px;
  line-height: 1.5;
}

.course-info__row .label {
  color: #333;
  flex-shrink: 0;
}

.course-info__row .highlight {
  color: #bc2220;
}

.course-info__row .teachers {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  color: #bc2220;
}

.teacher-item:not(:last-child)::after {
  content: '';
  margin-left: 8px;
}

/* 右侧内容栏 */
.course-main-content {
  flex: 1;
  border: 1px solid #fdd4a6;
  border-radius: 16px;
  padding: 48px 24px 24px; /* 顶部留多一点给 tabs */
  background: rgba(255, 255, 255, 0.6);
  position: relative;
  min-height: 600px;
}

.course-tabs {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 32px;
}

.course-tab-btn {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 4px 10px;
  border-radius: 100px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.course-tab-btn span {
  font-size: 18px;
  color: #bc2220;
}

.course-tab-btn .dot {
  width: 6px;
  height: 6px;
  background: #bc2220; /* 默认未选中点的颜色？根据设计稿调整 */
  border-radius: 50%;
  opacity: 0.2; /* 装饰点 */
}

.course-tab-btn.active {
  background: #d50100;
}

.course-tab-btn.active span {
  color: #fff;
}

.course-tab-btn.active .dot {
  background: #fff;
  opacity: 1;
}

.text-content {
  font-size: 16px;
  line-height: 1.75;
  color: #333;
  text-indent: 2em;
}

.text-content p {
  margin-bottom: 1em;
}

/* 视频列表样式 (简易) */
.video-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.video-item {
  display: flex;
  gap: 16px;
  padding: 12px;
  background: #fff;
  border-radius: 8px;
  cursor: pointer;
}

.video-thumbnail {
  width: 160px;
  height: 90px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 24px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.video-info h4 {
  font-size: 16px;
  margin: 0 0 8px;
}

.video-info span {
  font-size: 14px;
  color: #666;
}

/* 文档下载样式 */
.doc-download {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.doc-download h3 {
  font-size: 18px;
  color: #333;
  margin: 0;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(270deg, #bc2220 0%, #bc7120 100%);
  color: #fff;
  font-size: 16px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(188, 34, 32, 0.3);
}

/* 视频播放器样式 */
.video-player {
  width: 100%;
  aspect-ratio: 16/9;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}

.video-content {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
