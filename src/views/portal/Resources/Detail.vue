<template>
  <div class="resource-detail-page">
    <div class="page-bg">
      <img src="/images/indexBg.png" alt="" />
    </div>

    <div class="page-container">
      <!-- 面包屑 -->
      <div class="breadcrumb">
        <span class="label">您的位置：</span>
        <router-link to="/" class="link">首页</router-link>
        <span class="separator">>></span>
        <router-link to="/resources" class="link">思政资源</router-link>
        <span class="separator">>></span>
        <span class="link">政策文件库</span> <!-- 或者是动态分类 -->
        <span class="separator">>></span>
        <span class="current">文件详情</span>
      </div>

      <!-- 详情内容 -->
      <div class="detail-card">
        <div class="detail-header">
          <h1 class="detail-title">智慧农业风起，中科原动力带机器人走进田间地头</h1>
          <div class="detail-meta">
            <span class="meta-item">发布时间：2025-11-04</span>
            <span class="separator">|</span>
            <span class="meta-item">浏览人数：47698</span>
          </div>
        </div>

        <!-- 视频播放器 -->
        <div class="detail-player">
          <video 
            class="video-content"
            controls
            poster="/images/home/video-1.jpg"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4">
          </video>
        </div>

        <!-- 正文内容 -->
        <div class="detail-body">
          <p>课程是人才培养的最后一公里。随着大数据时代的来临，“概率论与数理统计”作为大数据的主要基础理论之一，受到专家学者的广泛关注，这一课程已成为高等院校理工科、经管类各专业重要的基础课程之一，大量应用于社会、经济、科学等领域。其中概率论以现代数学框架为基础研究随机现象的统计规律性，数理统计则以概率论为理论基础，研究怎样用有效的方法去收集、整理、分析受随机性影响的数据，并对所研究的问题作出统计推断和预测，同时为决策和行动提供依据和建议。</p>
          <br>
          <p>通过本课程的学习，学生能掌握概率论与数理统计的基本概念、基本理论和方法，从而理解随机现象的基本思想、训练数理逻辑思维，培养运用概率统计方法分析和解决实际问题的能力，为后续学习乃至工作奠定必备的数理基础。</p>
        </div>

        <!-- 底部图片 -->
        <div class="detail-images">
          <div class="image-item">
            <img src="/images/home/video-2.jpg" alt="" />
          </div>
          <div class="image-item">
            <img src="/images/home/video-3.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 资源详情页
 */
</script>

<style scoped>
.resource-detail-page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-bottom: 80px;
}

.page-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.page-bg img {
  width: 100%;
  object-fit: cover;
  opacity: 0.1;
}

.page-container {
  position: relative;
  max-width: 1440px; /* 根据设计稿，内容区宽度较宽 */
  margin: 0 auto;
  padding: 40px 0;
  z-index: 1;
}

/* 面包屑 */
.breadcrumb {
  display: flex;
  justify-content: flex-start;
  font-size: 16px;
  margin-bottom: 32px;
  color: #333;
}

.breadcrumb .label,
.breadcrumb .link,
.breadcrumb .separator {
  color: #333;
  opacity: 0.5;
  text-decoration: none;
}

.breadcrumb .current {
  color: #bc2220;
}

.breadcrumb .separator {
  margin: 0 8px;
}

/* 详情卡片 */
.detail-card {
  background: #fff;
  border: 1px solid #fdd4a6; /* 黄色边框 */
  border-radius: 16px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.detail-header {
  text-align: center;
  width: 100%;
}

.detail-title {
  font-size: 24px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: 500;
  color: #333;
  margin: 0 0 16px;
}

.detail-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  color: #333;
  font-size: 16px;
}

.detail-meta .separator {
  width: 1px;
  height: 16px;
  background: #ccc;
}

/* 播放器 */
.detail-player {
  width: 100%;
  max-width: 900px;
  aspect-ratio: 16/9;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}

.video-content {
  width: 100%;
  height: 100%;
}

/* 正文 */
.detail-body {
  width: 100%;
  max-width: 900px;
  font-size: 18px;
  line-height: 1.75;
  color: #333;
  text-indent: 2em;
}

/* 图片 */
.detail-images {
  width: 100%;
  max-width: 900px;
  display: flex;
  gap: 24px;
}

.image-item {
  flex: 1;
  height: 200px; /* 估算高度 */
  border-radius: 8px;
  overflow: hidden;
}

.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

