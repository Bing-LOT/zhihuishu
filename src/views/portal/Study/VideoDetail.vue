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
        <router-link to="/overview" class="link">思政概览</router-link>
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
            <div v-else-if="currentTab === 'design'" class="course-design">
              <div v-if="pdfLoading" class="pdf-loading">
                <div class="loading-spinner"></div>
                <p>正在加载PDF文档...</p>
              </div>
              <div v-else-if="pdfPages.length > 0" class="pdf-viewer">
                <!-- 第一页独占一行 -->
                <div class="pdf-page-row first-page">
                  <div class="pdf-page-wrapper first">
                    <img :src="pdfPages[0]" alt="第1页" class="pdf-page-image" />
                    <div class="pdf-page-number">第 1 页</div>
                  </div>
                </div>
                
                <!-- 其他页面两页一行 -->
                <template v-if="pdfPages.length > 1">
                  <div 
                    v-for="(page, index) in pdfPages.slice(1)" 
                    :key="index + 1"
                    class="pdf-page-wrapper"
                  >
                    <img :src="page" :alt="`第${index + 2}页`" class="pdf-page-image" />
                    <div class="pdf-page-number">第 {{ index + 2 }} 页</div>
                  </div>
                </template>
              </div>
              <div v-else-if="course.docUrl" class="doc-download">
                <h3>教学设计文档</h3>
                <a :href="course.docUrl" target="_blank" class="download-btn">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 13L6 9H8.5V4H11.5V9H14L10 13Z" fill="currentColor"/>
                    <path d="M4 14H16V16H4V14Z" fill="currentColor"/>
                  </svg>
                  <span>下载教学设计文档</span>
                </a>
              </div>
              <p v-else style="text-indent: 0; opacity: 0.5; text-align: center;">暂无教学设计文档</p>
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
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { getCourseExpoDetail, type CourseExpoItem } from '@/api/course'
import * as pdfjsLib from 'pdfjs-dist'

// 配置 PDF.js worker - 使用 jsDelivr CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`

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

// PDF 相关状态
const pdfPages = ref<string[]>([])
const pdfLoading = ref(false)

// 渲染 PDF
const renderPDF = async (url: string) => {
  if (!url) return
  
  pdfLoading.value = true
  pdfPages.value = []
  
  try {
    const loadingTask = pdfjsLib.getDocument(url)
    const pdf = await loadingTask.promise
    const numPages = pdf.numPages
    
    // 渲染每一页
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum)
      const viewport = page.getViewport({ scale: 1.5 })
      
      // 创建 canvas
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      canvas.height = viewport.height
      canvas.width = viewport.width
      
      if (context) {
        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise
        
        // 将 canvas 转为图片
        pdfPages.value.push(canvas.toDataURL())
      }
    }
  } catch (error) {
    console.error('PDF渲染失败:', error)
  } finally {
    pdfLoading.value = false
  }
}

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
    
    // 如果有文档URL，渲染PDF
    if (data.docUrl) {
      await nextTick()
      await renderPDF(data.docUrl)
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
  justify-content: flex-start; /* 左对齐 */
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
  height: 750px;
  flex-shrink: 0;
  background: #fff;
  background-image: url('/images/Frame_1000015326.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid #fdd4a6;
  border-radius: 16px;
  padding: 24px 24px 20px 24px; /* 底部 20px */
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 隐藏滚动条 */
.course-info-card::-webkit-scrollbar {
  display: none;
}

.course-info-card {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
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
  padding: 48px 24px 24px; /* 顶部留空间给 tabs，底部无 padding */
  background: rgba(255, 255, 255, 0.6);
  background-image: url('/images/Frame_1000015327.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  height: 750px;
  overflow: hidden; /* 外层不滚动 */
  display: flex;
  flex-direction: column;
}

.course-tabs {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
  flex-shrink: 0; /* 不收缩 */
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

/* 标签页内容容器 - 可滚动 */
.course-tab-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
}

/* 隐藏滚动条 */
.course-tab-content::-webkit-scrollbar {
  display: none;
}

.course-tab-content {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.text-content {
  font-size: 16px;
  line-height: 1.75;
  color: #333;
  text-indent: 2em;
  padding-bottom: 20px; /* 底部 20px 间距 */
}

.text-content p {
  margin-bottom: 1em;
}

/* 教学设计容器 */
.course-design {
  text-indent: 0;
}

/* 视频容器 */
.course-video {
  padding-bottom: 20px; /* 底部 20px 间距 */
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

/* PDF 加载状态 */
.pdf-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 16px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #bc2220;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.pdf-loading p {
  font-size: 16px;
  color: #666;
  margin: 0;
}

/* PDF 查看器容器 */
.pdf-viewer {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0 0 20px 0; /* 底部 20px 间距 */
}

/* 第一页独占一行 */
.pdf-page-row.first-page {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 0;
}

/* PDF 页面包装器 */
.pdf-page-wrapper {
  position: relative;
  width: calc(50% - 5px); /* 两页一行，减去间隔的一半 */
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* 第一页特殊样式 */
.pdf-page-row.first-page .pdf-page-wrapper.first {
  width: 100%;
  max-width: 800px;
}

.pdf-page-wrapper:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

/* PDF 页面图片 */
.pdf-page-image {
  width: 100%;
  height: auto;
  display: block;
}

/* 页码标签 */
.pdf-page-number {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

/* 文档下载样式 */
.doc-download {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  padding: 40px 20px;
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
