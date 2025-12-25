<template>
  <div class="care-page">
    <div class="care-bg">
      <img src="/images/indexBg.png" alt="" />
    </div>

    <div class="care-container">
      <!-- 顶部 Hero 区域 -->
      <section class="care-hero">
        <!-- 装饰背景 (红绸、鸽子等，假设在 indexBg 或独立图片) -->
        
        <!-- 左侧人物介绍 -->
        <div class="hero-person">
          <div class="person-image">
            <!-- 占位人物图，实际开发应替换为切图 -->
            <!-- <img src="/images/person-zhangsan.png" alt="" /> -->
            <div class="placeholder-person"></div>
          </div>
          <div class="person-info">
            <div class="vertical-text title">优秀党员</div>
            <div class="vertical-text name">张三</div>
            <div class="star-decoration">
              <img src="/images/xiaohui1.png" alt="" /> <!-- 暂时用校徽替代五角星 -->
            </div>
          </div>
        </div>

        <!-- 中间文字 -->
        <div class="hero-slogan">
          <div class="slogan-main">
            <span>“</span>
            <div class="text-group">
              <div class="text-row">用热血作笔</div>
              <div class="text-row">书写强国篇章</div>
            </div>
            <span class="quote-right">”</span>
          </div>
          <button class="play-btn">播放访谈视频</button>
        </div>

        <!-- 右侧访谈列表 -->
        <div class="hero-interviews">
          <div class="interview-header">
            <img src="/images/xiaohui2.png" class="icon" />
            <h3>优秀教师访谈</h3>
            <router-link to="/care/interviews" class="more">查看更多 ></router-link>
          </div>
          <div class="interview-list">
            <!-- 模拟访谈图片墙 -->
            <div class="interview-item" v-for="i in 4" :key="i">
              <div class="interview-cover">
                <img :src="`/images/home/video-${i}.jpg`" alt="" />
              </div>
              <div class="interview-name">李老师</div>
            </div>
          </div>
        </div>
      </section>

      <!-- “一院一品”专题 -->
      <section class="care-section">
        <div class="section-header">
          <div class="section-title-wrapper">
            <div class="section-title-decoration left">
              <svg xmlns="http://www.w3.org/2000/svg" width="122" height="37" viewBox="0 0 122 37" fill="none">
                <path d="M55.4995 25.1402C58.5629 25.1402 60.8086 22.6335 60.8086 19.5701C60.8086 16.5068 58.565 14 55.4995 14" stroke="#EFE0D3" stroke-linejoin="round"/>
                <path d="M54.8086 36.2809C51.7452 36.2809 49.4995 33.7741 49.4995 30.7108C49.4995 27.6474 51.7431 25.1406 54.8086 25.1406" stroke="#EFE0D3" stroke-linejoin="round"/>
                <path d="M121.283 36.2801L50.4349 36.2805C47.3715 36.2805 44.8647 33.7737 44.8647 30.7104C44.8647 27.647 47.3715 25.1402 50.4349 25.1402H58H51.8651H59.4303C62.4936 25.1402 65.0004 22.6335 65.0004 19.5701C65.0004 16.5068 62.4936 14 59.4303 14L0 14" stroke="#EFE0D3" stroke-linejoin="round"/>
              </svg>
            </div>
            <h2 class="section-title">“一院一品”专题</h2>
            <div class="section-title-decoration right">
              <svg xmlns="http://www.w3.org/2000/svg" width="122" height="37" viewBox="0 0 122 37" fill="none">
                <path d="M65.7837 25.1402C62.7203 25.1402 60.4746 22.6335 60.4746 19.5701C60.4746 16.5068 62.7182 14 65.7837 14" stroke="#EFE0D3" stroke-linejoin="round"/>
                <path d="M66.4746 36.2809C69.538 36.2809 71.7837 33.7741 71.7837 30.7108C71.7837 27.6474 69.5401 25.1406 66.4746 25.1406" stroke="#EFE0D3" stroke-linejoin="round"/>
                <path d="M0 36.2801L70.8484 36.2805C73.9117 36.2805 76.4185 33.7737 76.4185 30.7104C76.4185 27.647 73.9117 25.1402 70.8484 25.1402H63.2832H69.4181H61.8529C58.7896 25.1402 56.2828 22.6335 56.2828 19.5701C56.2828 16.5068 58.7896 14 61.8529 14L121.283 14" stroke="#EFE0D3" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="section-title-icon">
              <img src="/images/xiaohui2.png" alt="" />
            </div>
          </div>
          <button class="more-btn">
            <span>查看更多</span>
<img src="/images/arrow-right.svg" alt="">
          </button>
        </div>
        <div class="course-grid">
          <CourseCard
            v-for="course in section1List"
            :key="course.id"
            :course="course"
          />
        </div>
      </section>

      <!-- 红色文化资源地图 -->
      <section class="care-section">
        <div class="section-header">
          <div class="section-title-wrapper">
            <h2 class="section-title">红色文化资源地图（福州地区）</h2>
            <div class="section-title-icon">
              <img src="/images/xiaohui2.png" alt="" />
            </div>
          </div>
        </div>
        
        <div class="map-container">
          <!-- 左侧列表 -->
          <div class="map-sidebar">
            <div class="map-header">
              <h3>文化资源列表</h3>
              <div class="search-box">
                <input type="text" placeholder="请输入" />
                <span class="search-btn">搜索</span>
              </div>
            </div>
            <div class="map-list">
              <div class="map-item" v-for="i in 6" :key="i">
                <div class="item-img">
                  <!-- 占位图 -->
                  <div class="img-placeholder"></div>
                </div>
                <div class="item-info">
                  <div class="item-row">
                    <span class="label">文化遗址</span>
                    <span class="type">博物馆</span>
                  </div>
                  <p class="desc">热到融化的马路、无穷无尽的野火</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧地图 -->
          <div class="map-content">
            <!-- 地图图片占位 -->
            <div class="map-placeholder">
              <span>地图区域</span>
            </div>
            <!-- 模拟弹出卡片 -->
            <div class="map-card">
              <div class="card-img"></div>
              <div class="card-info">
                <h4>展厅地址</h4>
                <p>烈士陵园</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 福大思政微视频节 -->
      <section class="care-section">
        <div class="section-header">
          <div class="section-title-wrapper">
            <h2 class="section-title">福大思政微视频节</h2>
            <div class="section-title-icon">
              <img src="/images/xiaohui2.png" alt="" />
            </div>
          </div>
          <button class="more-btn">
            <span>查看更多</span>
<img src="/images/arrow-right.svg" alt="">
          </button>
        </div>
        <div class="course-grid">
          <CourseCard
            v-for="course in section3List"
            :key="course.id"
            :course="course"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CourseCard from '@/components/common/CourseCard/index.vue'

/**
 * 大关怀（特色专题）页面
 */

// 模拟数据
const generateList = (count: number, prefix: string) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${prefix}-${i}`,
    title: '概率论与数理统计',
    cover: `/images/home/video-${(i % 4) + 1}.jpg`,
    teacherList: [{ name: '刘丽军', title: '教授' }],
    studentCount: 3456
  }))
}

const section1List = ref(generateList(8, 's1'))
const section3List = ref(generateList(4, 's3'))

</script>

<style scoped>
.care-page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-bottom: 80px;
}

.care-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.care-bg img {
  width: 100%;
  object-fit: cover;
  opacity: 0.1;
}

.care-container {
  position: relative;
  max-width: 1920px;
  margin: 0 auto;
  padding: 80px 160px;
  z-index: 1;
}

/* Hero 区域 */
.care-hero {
  position: relative;
  height: 700px;
  margin-bottom: 96px;
  display: flex;
  align-items: center;
}

/* 左侧人物 */
.hero-person {
  position: absolute;
  left: 0;
  top: 50px;
  display: flex;
}

.person-image {
  width: 400px;
  height: 600px;
}

.placeholder-person {
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.1);
  border-radius: 8px;
}

.person-info {
  margin-left: 20px;
  display: flex;
  gap: 16px;
}

.vertical-text {
  writing-mode: vertical-rl;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 4px;
  color: #bc2220;
}

.star-decoration {
  width: 100px;
  height: 100px;
  margin-top: auto;
}

.star-decoration img {
  width: 100%;
  height: 100%;
}

/* 中间文字 */
.hero-slogan {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.slogan-main {
  font-size: 48px;
  font-weight: 700;
  color: #bc2220;
  margin-bottom: 32px;
  position: relative;
}

.text-group {
  display: inline-block;
  vertical-align: middle;
}

.play-btn {
  padding: 12px 48px;
  border-radius: 100px;
  background: #bc2220;
  color: #fff;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

/* 右侧访谈 */
.hero-interviews {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
}

.interview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.interview-header h3 {
  font-size: 20px;
  color: #fff; /* 假设背景深色 */
}

.interview-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.interview-item {
  display: flex;
  gap: 12px;
  align-items: center;
}

.interview-cover {
  width: 120px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
}

.interview-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 地图区域 */
.map-container {
  display: flex;
  height: 800px;
  background: #fff;
  border: 1px solid #fdd4a6;
  border-radius: 16px;
  overflow: hidden;
}

.map-sidebar {
  width: 360px;
  border-right: 1px solid #fdd4a6;
  display: flex;
  flex-direction: column;
}

.map-header {
  padding: 24px;
  border-bottom: 1px solid #eee;
}

.search-box {
  display: flex;
  margin-top: 16px;
  background: #f5f5f5;
  border-radius: 100px;
  padding: 8px 16px;
}

.search-box input {
  border: none;
  background: transparent;
  flex: 1;
  outline: none;
}

.map-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.map-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.item-img {
  width: 64px;
  height: 64px;
  background: #eee;
  border-radius: 8px;
}

.map-content {
  flex: 1;
  background: #f0f0f0;
  position: relative;
}

.map-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #999;
}

.map-card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* 列表通用 */
.care-section {
  margin-bottom: 96px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 48px;
  position: relative;
  padding-bottom: 20px;
}

.section-title-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.section-title {
  font-size: 24px;
  color: #bc2220;
  font-weight: 700;
  margin: 0 0 8px;
  position: relative;
  z-index: 1;
}

.section-title-decoration {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.section-title-decoration.left {
  left: calc(50% - 200px);
}

.section-title-decoration.right {
  right: calc(50% - 200px);
}

.section-title-icon {
  width: 20px;
  height: 20px;
}

.section-title-icon img {
  width: 100%;
  height: 100%;
}

.more-btn {
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
  color: #333;
  opacity: 0.7;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px;
}
</style>
