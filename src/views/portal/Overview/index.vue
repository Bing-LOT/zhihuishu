<template>
  <div class="overview">
    <!-- 背景图层 -->
    <div class="overview__bg">
      <!-- 复用首页背景或特定背景 -->
      <img src="/images/indexBg.png" alt="" />
    </div>

    <div class="overview__container">
      <!-- 上部：目录与视频 -->
      <section class="overview__hero">
        <!-- 柱子装饰图 -->
        <img src="/images/zhuzi.png" alt="" class="overview__pillar" />

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
              :key="index"
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
                <p class="overview__menu-desc">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧视频 -->
        <div class="overview__video">
          <div class="overview__player">
            <video 
              class="overview__video-content"
              controls
              poster="/images/home/video-1.jpg"
            >
              <source src="/videos/hero-video.mp4" type="video/mp4">
            </video>
          </div>
        </div>
      </section>

      <!-- 下部：课程展示 -->
      <section class="overview__courses">
        <div class="overview__courses-header">
          <div class="overview__courses-title-wrapper">
            <h2 class="overview__courses-title">党员教师课程思政示范课展播</h2>
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
            :badge="course.badge"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CourseCard from '@/components/common/CourseCard/index.vue'
import type { Course } from '@/types'

/**
 * 概览页面
 */

// 目录数据
const menuItems = [
  {
    title: '介绍',
    description: '介绍党建引领、学校党委统筹-职能部门及院系党组织落实-党支部攻坚-党员教师带头”机制、思政课程与课程思政一体推进、习思想分学科有机融入各学科的构想设计、出台的规章制度等。'
  },
  {
    title: '特色亮点',
    description: '学校课程思政建设具有启动早、工作实、特色足的特色，梳理课程思政建设'
  },
  {
    title: '建设成效',
    description: '实现了三全育人、马院两项省教学成果、获批省级以上思政类教改项目数量、'
  }
]

const activeMenu = ref(0)

// 模拟课程数据
const courseList = ref<any[]>([
  {
    id: '1',
    title: '国产电车的遮羞布，被高温撕掉了',
    cover: '/images/home/video-1.jpg',
    teacherList: [{ name: '薛美玉', department: '电气工程与自动学院' }],
    studentCount: 3456,
    badge: '国家示范'
  },
  {
    id: '2',
    title: '纽约时报 | 没有中国，世界还能造动力电池吗',
    cover: '/images/home/video-2.jpg',
    teacherList: [{ name: '薛美玉', department: '电气工程与自动学院' }],
    studentCount: 3456,
    badge: '国家示范'
  },
  {
    id: '3',
    title: '一家三口吃瓜中毒！凌晨3点进医院…',
    cover: '/images/home/video-3.jpg',
    teacherList: [{ name: '薛美玉', department: '电气工程与自动学院' }],
    studentCount: 3456,
    badge: '国家示范'
  },
  {
    id: '4',
    title: '水果不甜也会高糖？山楂到底会不会让人长胖？',
    cover: '/images/home/video-4.jpg',
    teacherList: [{ name: '薛美玉', department: '电气工程与自动学院' }],
    studentCount: 3456,
    badge: '国家示范'
  },
  {
    id: '5',
    title: '10万吨级的“海上粮仓”，到底有多厉害？',
    cover: '/images/home/video-1.jpg',
    teacherList: [{ name: '薛美玉', department: '电气工程与自动学院' }],
    studentCount: 3456,
    badge: '省级示范'
  },
  {
    id: '6',
    title: '国产电车的遮羞布，被高温撕掉了',
    cover: '/images/home/video-2.jpg',
    teacherList: [{ name: '薛美玉', department: '电气工程与自动学院' }],
    studentCount: 3456,
    badge: '省级示范'
  },
  {
    id: '7',
    title: '长租公寓的风险应留意',
    cover: '/images/home/video-3.jpg',
    teacherList: [{ name: '薛美玉', department: '电气工程与自动学院' }],
    studentCount: 3456,
    badge: '省级示范'
  },
  {
    id: '8',
    title: '曾比恒大冲更猛，他比许家印更可惜',
    cover: '/images/home/video-4.jpg',
    teacherList: [{ name: '薛美玉', department: '电气工程与自动学院' }],
    studentCount: 3456,
    badge: '国家示范'
  }
])
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

/* 上部布局 */
.overview__hero {
  position: relative; /* 确保作为定位参考 */
  display: flex;
  gap: 48px;
  margin-bottom: 96px;
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
