<template>
  <div class="topics-page">
    <div class="topics-bg">
      <img src="/images/indexBg.png" alt="" />
    </div>

    <div class="topics-container">
      <!-- 顶部 Hero 区域 -->
      <section class="topics-hero">
        <!-- 装饰元素 -->
        <div class="hero-decorations">
          <img src="/images/guanhuaiBG.png" class="hero-bg-full" alt="" />
        </div>

        <!-- 左侧内容框 -->
        <div class="hero-content-box">
          <div class="hero-header">
            <div class="hero-title-wrapper">
              <img src="/images/chengguo.svg" alt="" />
              <!-- <div class="hero-title-en">the Great China</div>
              <div class="hero-title-cn">融入成果</div>
              <div class="hero-title-icon">
                <img src="/images/xiaohui2.png" alt="" />
              </div> -->
            </div>
          </div>
          
          <div class="hero-text">
            <p>1990年至2010年，习近平同志以莅校视察调研、会见福州大学专家学者、为大学生作报告、致校庆贺信等方式14次关怀福州大学建设发展，给我校留下了宝贵的思想和精神财富。</p>
            <br>
            <p>为深入贯彻落实习近平总书记关于“大思政课”建设的重要指示批示精神，领会习近平同志关怀福州大学建设发展思想精髓，充分发挥高校思政课程和课程思政在立德树人中的主渠道作用，坚持不懈用习近平新时代中国特色社会主义思想铸魂育人，引导学生深刻领悟“两个确立”的决定性意义，增强“四个意识”，坚定“四个自信”，福州大学教务处于2024年9月开展了“习近平同志关怀福州大学建设发展”教学视频展示活动暨2024年福州大学课程思政教学改革视频征集工作。</p>
            <br>
            <p>29位教师结合岗位工作建设的教学视频获批立项，其中13个视频获评优秀。</p>
          </div>

          <div class="hero-scroll-hint" @click="scrollToContent">
            <span>滑动继续</span>
            <div class="scroll-icon">
              <img src="/images/home__scroll-icon.svg" alt="" />
            </div>
          </div>
        </div>
      </section>

      <!-- 列表区域 1 -->
      <section class="topics-section" id="section-1">
        <div class="section-header">
          <div class="section-title-wrapper">
            <div class="section-title-decoration left">
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
            <h2 class="section-title">习思想优秀视频展播</h2>
            <div class="section-title-decoration right">
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
            <div class="section-title-icon">
              <img src="/images/xiaohui2.png" alt="" />
            </div>
          </div>
          <button class="more-btn">
            <span>查看更多</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="#333333" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="course-grid">
          <CourseCard
            v-for="course in list1"
            :key="course.id"
            :course="course"
          />
        </div>
      </section>

      <!-- 列表区域 2 -->
      <section class="topics-section">
        <div class="section-header">
          <div class="section-title-wrapper">
            <h2 class="section-title">习思想融入学科教学实践示范案例展播</h2>
            <div class="section-title-icon">
              <img src="/images/xiaohui2.png" alt="" />
            </div>
          </div>
          <button class="more-btn">
            <span>查看更多</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="#333333" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="course-grid">
          <CourseCard
            v-for="course in list2"
            :key="course.id"
            :course="course"
          />
        </div>
      </section>

      <!-- 列表区域 3 -->
      <section class="topics-section">
        <div class="section-header">
          <div class="section-title-wrapper">
            <h2 class="section-title">习思想融入学科教学实践示范案例展播</h2>
            <div class="section-title-icon">
              <img src="/images/xiaohui2.png" alt="" />
            </div>
          </div>
          <button class="more-btn">
            <span>查看更多</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="#333333" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="course-grid">
          <CourseCard
            v-for="course in list3"
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
 * 习思想的伟大实践页面
 */

const scrollToContent = () => {
  const section1 = document.getElementById('section-1')
  if (section1) {
    section1.scrollIntoView({ behavior: 'smooth' })
  }
}

// 模拟数据
const generateList = (count: number, prefix: string) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${prefix}-${i}`,
    title: i % 2 === 0 ? '为党为国育人才 草画东南强校梦' : '树立马克思主义价值观培育青年',
    cover: `/images/home/video-${(i % 4) + 1}.jpg`,
    teacherList: [{ name: '薛美玉', title: '教授' }],
    studentCount: 3456
  }))
}

const list1 = ref(generateList(8, 's1'))
const list2 = ref(generateList(8, 's2'))
const list3 = ref(generateList(8, 's3'))

</script>

<style scoped>
.topics-page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-bottom: 80px;
  overflow-x: hidden; /* 防止全宽背景导致横向滚动条 */
}

.topics-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.topics-bg img {
  width: 100%;
  object-fit: cover;
  opacity: 0.1;
}

.topics-container {
  position: relative;
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 160px 80px; /* 移除顶部 padding */
  z-index: 1;
}

/* Hero 区域 */
.topics-hero {
  position: relative;
  height: 756px;
  margin-bottom: 456px;
  display: flex;
  align-items: center;
  padding-top: 80px; /* 内容保持原位置 */
}

.hero-decorations {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw; /* 强制占满视口宽度 */
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.hero-bg-full {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto; /* 高度自适应 */
  min-height: 100%; /* 确保填满容器 */
  object-fit: cover;
}

.pillar {
  position: absolute;
  width: 100vw;
  object-fit: contain;
}

.ribbon {
  position: absolute;
  right: 0;
  bottom: 100px;
  width: 80%;
  object-fit: contain;
}

/* 内容框 */
.hero-content-box {
  width: 863px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(2px);
  border: 2px solid #fff;
  border-radius: 8px;
  padding: 126px 24px 24px; /* 顶部留给标题 */
  position: relative;
  margin-left: 120px;
}

.hero-header {
  position: absolute;
  top: -90px; /* 突出顶部 */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
}

.hero-title-wrapper {
  text-align: center;
  /* background: linear-gradient(180deg, #FFFFFF 0%, #FFD25E 100%); */
  /* -webkit-background-clip: text; */
  /* color: transparent; */
}

.hero-title-en {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 2.88px;
  opacity: 0.5;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.hero-title-cn {
  font-size: 48px;
  font-weight: 700;
  letter-spacing: 7px;
  margin: 8px 0;
  color: #bc2220;
  text-shadow: 0 2px 4px rgba(255,255,255,0.5);
}

.hero-title-icon {
  width: 54px;
  height: 54px;
  margin: 0 auto;
}

.hero-title-icon img {
  width: 100%;
  height: 100%;
}

.hero-text {
  font-size: 18px;
  color: #333;
  line-height: 1.75;
  text-indent: 28px;
}

.hero-scroll-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
  cursor: pointer;
}

.hero-scroll-hint span {
  font-size: 18px;
  color: #bc2220;
}

.scroll-icon {
  width: 48px;
  height: 48px;
  margin-top: 2px;
}

.scroll-icon img {
  width: 100%;
  height: 100%;
}

/* 列表区域 */
.topics-section {
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
  left: calc(50% - 200px); /* 估算 */
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
