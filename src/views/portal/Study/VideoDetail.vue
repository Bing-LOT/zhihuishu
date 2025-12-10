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
        <span class="current">{{ course.title }}</span>
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
                  {{ teacher.name }}-{{ teacher.title }}
                </span>
              </div>
            </div>
            <div class="course-info__row">
              <span class="label">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;院：</span>
              <span class="highlight">信息学院</span>
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
            <div v-if="currentTab === 'intro'" class="course-intro text-content">
              <p>课程是人才培养的最后一公里。随着大数据时代的来临，“概率论与数理统计”作为大数据的主要基础理论之一，受到专家学者的广泛关注，这一课程已成为高等院校理工科、经管类各专业重要的基础课程之一，大量应用于社会、经济、科学等领域。其中概率论以现代数学框架为基础研究随机现象的统计规律性，数理统计则以概率论为理论基础，研究怎样用有效的方法去收集、整理、分析受随机性影响的数据，并对所研究的问题作出统计推断和预测，同时为决策和行动提供依据和建议。</p>
              <br>
              <p>通过本课程的学习，学生能掌握概率论与数理统计的基本概念、基本理论和方法，从而理解随机现象的基本思想、训练数理逻辑思维，培养运用概率统计方法分析和解决实际问题的能力，为后续学习乃至工作奠定必备的数理基础。</p>
            </div>
            
            <div v-else-if="currentTab === 'design'" class="course-design text-content">
              <h3>教学设计理念</h3>
              <p>本课程坚持以学生为中心，采用混合式教学模式...</p>
            </div>
            
            <div v-else-if="currentTab === 'video'" class="course-video">
              <div class="video-list">
                <!-- 模拟视频列表 -->
                <div class="video-item" v-for="i in 3" :key="i">
                  <div class="video-thumbnail">
                    <img :src="course.cover" alt="" />
                    <div class="play-icon">▶</div>
                  </div>
                  <div class="video-info">
                    <h4>第一章 第{{ i }}节 随机事件与概率</h4>
                    <span>时长：45:00</span>
                  </div>
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
import { ref } from 'vue'
import { useRoute } from 'vue-router'

/**
 * 课程详情页
 */
const route = useRoute()
const courseId = route.params.id

// 模拟课程数据
const course = ref({
  id: courseId || '1',
  title: '概率论与数理统计',
  cover: '/images/home/video-1.jpg',
  badge: '国家示范',
  studentCount: 3456,
  teacherList: [
    { name: '薛美玉', title: '教授' },
    { name: '张三', title: '副教授' }
  ]
})

// 标签页配置
const tabs = [
  { label: '课程简介', value: 'intro' },
  { label: '教学设计', value: 'design' },
  { label: '教学视频', value: 'video' }
]

const currentTab = ref('intro')
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
</style>
