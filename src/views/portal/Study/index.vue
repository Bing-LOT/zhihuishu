<template>
  <div class="study-home">
    <div class="study-bg">
      <img src="/images/indexBg.png" alt="" />
    </div>

    <div class="study-container">
      <!-- 顶部 Hero -->
      <section class="study-hero">
        <div class="hero-decorations">
          <img src="/images/zhuzi.png" class="pillar" alt="" />
          <img src="/images/piaodai1.png" class="ribbon" alt="" />
        </div>
        
        <div class="hero-content">
          <div class="hero-left">
            <div class="quote-wrapper">
              <div class="star-decoration">★</div>
              <h1 class="hero-quote">
                <span class="line">用热血作笔</span>
                <span class="line indent">书写强国篇章</span>
              </h1>
              <div class="quote-mark">”</div>
            </div>
            <button class="play-btn">
              <span>播放访谈视频</span>
            </button>
          </div>
          
          <div class="hero-right">
            <div class="teacher-wall">
              <h3>优秀教师访谈</h3>
              <div class="photo-grid">
                <div class="photo-item" v-for="i in 3" :key="i">
                  <img :src="`/images/home/video-${i}.jpg`" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="scroll-hint">
          <span>滑动继续</span>
          <img src="/images/home__scroll-icon.svg" alt="" />
        </div>
      </section>

      <!-- 一院一品 -->
      <section class="section brand-section">
        <div class="section-header">
          <div class="section-title-wrapper">
            <div class="title-bg">
              <img src="/images/xiaohui1.png" alt="" />
            </div>
            <h2 class="section-title">“一院一品”专题</h2>
            <div class="title-icon">
              <img src="/images/xiaohui2.png" alt="" />
            </div>
          </div>
          <router-link to="/study/courses" class="more-link">
            <span>查看更多</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="#333333" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
        </div>
        
        <div class="brand-grid">
          <div v-for="i in 8" :key="i" class="brand-card">
            <div class="card-image">
              <img :src="`/images/home/course-1.jpg`" alt="" />
              <div class="card-overlay">
                <span>电气工程与自动化学院</span>
              </div>
            </div>
            <div class="card-content">
              <h3 class="card-title">概率论与数理统计</h3>
              <div class="card-meta">
                <span class="teacher">教师：刘丽军</span>
                <span class="views">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M10 5C5.83333 5 2.27583 7.34167 1 10.8333C2.27583 14.3217 5.83333 16.6667 10 16.6667C14.1667 16.6667 17.7242 14.325 19 10.8333C17.7242 7.34167 14.1667 5 10 5Z" fill="#333" fill-opacity="0.5"/>
                  </svg>
                  3456人
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 红色文化资源地图 -->
      <section class="section map-section">
        <div class="section-header">
          <div class="section-title-wrapper">
            <h2 class="section-title">红色文化资源地图（福州地区）</h2>
            <div class="title-icon">
              <img src="/images/xiaohui2.png" alt="" />
            </div>
          </div>
        </div>
        
        <div class="map-content">
          <!-- 左侧列表 -->
          <div class="map-list">
            <div class="list-header">
              <h3>文化资源列表</h3>
              <div class="search-box">
                <input type="text" placeholder="请输入" />
                <button>搜索</button>
              </div>
            </div>
            <div class="list-items">
              <div class="list-item" v-for="i in 5" :key="i">
                <span class="item-name">文化遗址</span>
                <span class="item-tag">人物故居</span>
              </div>
            </div>
          </div>
          
          <!-- 右侧地图 -->
          <div class="map-view">
            <!-- 简单的地图示意图 -->
            <div class="map-placeholder">
              <img src="/images/indexBg.png" alt="地图" class="map-bg" />
              <!-- 模拟标记点 -->
              <div class="map-marker" style="top: 30%; left: 40%;">
                <span>林觉民故居</span>
              </div>
              <div class="map-marker" style="top: 50%; left: 60%;">
                <span>马尾船政</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 福大思政微视频节 -->
      <section class="section video-section">
        <div class="section-header">
          <div class="section-title-wrapper">
            <h2 class="section-title">福大思政微视频节</h2>
            <div class="title-icon">
              <img src="/images/xiaohui2.png" alt="" />
            </div>
          </div>
          <a href="#" class="more-link">
            <span>查看更多</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="#333333" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
        
        <div class="video-grid">
          <div v-for="i in 4" :key="i" class="video-card">
            <div class="video-cover">
              <img :src="`/images/home/video-${i}.jpg`" alt="" />
              <div class="video-overlay">
                <div class="play-btn">▶</div>
              </div>
            </div>
            <div class="video-info">
              <h3>青春主场 | 欢聚在成都</h3>
              <div class="video-meta">
                <span>2025-12-27</span>
                <span>3456人</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 特色专题首页
 */
</script>

<style scoped>
.study-home {
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-bottom: 80px;
}

.study-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.study-bg img {
  width: 100%;
  object-fit: cover;
  opacity: 0.1;
}

.study-container {
  position: relative;
  max-width: 1920px;
  margin: 0 auto;
  padding: 80px 160px;
  z-index: 1;
}

/* Hero */
.study-hero {
  position: relative;
  height: 756px;
  margin-bottom: 96px;
  display: flex;
  align-items: center;
}

.hero-decorations {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.pillar {
  position: absolute;
  right: -100px;
  top: 0;
  height: 100%;
  object-fit: contain;
}

.ribbon {
  position: absolute;
  left: -100px;
  bottom: 100px;
  width: 80%;
  object-fit: contain;
  transform: scaleX(-1);
}

.hero-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 100px;
}

.hero-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.quote-wrapper {
  position: relative;
  margin-bottom: 48px;
}

.star-decoration {
  font-size: 48px;
  color: #fdd4a6;
  margin-bottom: 24px;
}

.hero-quote {
  font-size: 64px;
  font-weight: 700;
  color: #bc2220;
  line-height: 1.2;
}

.hero-quote .indent {
  display: block;
  margin-left: 2em;
}

.play-btn {
  width: 240px;
  height: 48px;
  border-radius: 100px;
  background: linear-gradient(90deg, #ecd9ba 0%, #bc2220 100%);
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-right {
  width: 400px;
}

.teacher-wall {
  background: rgba(255, 255, 255, 0.8);
  padding: 24px;
  border-radius: 16px;
  text-align: center;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 16px;
}

.photo-item img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.scroll-hint {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #bc2220;
}

/* Section 通用 */
.section {
  margin-bottom: 96px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 48px;
  position: relative;
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
  margin: 8px 0;
  z-index: 1;
}

.title-bg {
  position: absolute;
  top: -20px;
  width: 200px;
  opacity: 0.2;
}

.title-icon {
  width: 20px;
  height: 20px;
}

.more-link {
  position: absolute;
  right: 0;
  bottom: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  color: #333;
  text-decoration: none;
  opacity: 0.7;
}

/* 一院一品 */
.brand-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px;
}

.brand-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.card-image {
  position: relative;
  height: 200px;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.5);
  color: #fff;
  padding: 8px 16px;
  font-size: 14px;
}

.card-content {
  padding: 16px;
}

.card-title {
  font-size: 18px;
  margin: 0 0 12px;
  color: #333;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 14px;
}

/* 地图 */
.map-content {
  display: flex;
  gap: 24px;
  height: 600px;
}

.map-list {
  width: 360px;
  background: #fff;
  border: 1px solid #fdd4a6;
  border-radius: 16px;
  padding: 24px;
}

.map-view {
  flex: 1;
  background: #fff;
  border: 1px solid #fdd4a6;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
}

.map-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
}

.map-marker {
  position: absolute;
  background: #fff;
  padding: 4px 12px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  font-size: 14px;
  color: #bc2220;
}

.map-marker::before {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px 6px 0;
  border-style: solid;
  border-color: #fff transparent transparent;
}

/* 微视频 */
.video-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px;
}

.video-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.video-cover {
  position: relative;
  height: 200px;
}

.video-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.2);
  opacity: 0;
  transition: opacity 0.3s;
}

.video-card:hover .video-overlay {
  opacity: 1;
}

.play-btn {
  font-size: 32px;
  color: #fff;
}

.video-info {
  padding: 16px;
}

.video-info h3 {
  font-size: 16px;
  margin: 0 0 8px;
  color: #333;
}

.video-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}
</style>
