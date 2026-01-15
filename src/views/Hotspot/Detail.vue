<template>
  <div class="detail-page">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <div class="logo-section">
          <img 
            src="/images/00dcb4e82f32dad380c689b6a020ef7171d0aa8f.png" 
            alt="Logo" 
            class="logo-img"
          >
          <span class="logo-text">福州大学大思政教育未来学习中心</span>
        </div>
        <div class="action-section">
          <div class="search-bar">
            <input 
              type="text" 
              placeholder="课程 名师 新闻 资源搜索"
              class="search-input"
            >
            <button class="search-btn">
              资源搜索
            </button>
          </div>
          <button class="admin-btn">
            后台管理系统
          </button>
          <button class="login-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="#c30d23"/>
              <path d="M10 12.5C4.47715 12.5 0 14.4772 0 17V20H20V17C20 14.4772 15.5228 12.5 10 12.5Z" fill="#c30d23"/>
            </svg>
            登录
          </button>
        </div>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="nav-bar">
      <a href="/" class="nav-item">首页</a>
      <a href="/hotspot" class="nav-item active">思政热点</a>
      <a href="/teaching" class="nav-item">教学有道</a>
      <a href="/classroom" class="nav-item">精彩课堂</a>
      <a href="/college" class="nav-item">一院一品</a>
      <a href="/special" class="nav-item">特色专题</a>
      <a href="/resource" class="nav-item">育人资源</a>
      <a href="/exam" class="nav-item">学习题库</a>
      <a href="/reference" class="nav-item">他山之石</a>
    </nav>

    <!-- Page Title Banner -->
    <div class="page-banner">
      <h1 class="banner-title">思政热点</h1>
    </div>

    <!-- Breadcrumb -->
    <div class="breadcrumb-container">
      <div class="breadcrumb">
        <span class="breadcrumb-item">您的位置： </span>
        <a href="/" class="breadcrumb-item">首页</a>
        <span class="breadcrumb-separator">&gt;&gt;</span>
        <a href="/hotspot" class="breadcrumb-item">思政热点</a>
        <span class="breadcrumb-separator">&gt;&gt;</span>
        <span class="breadcrumb-item active">新闻详情</span>
      </div>
    </div>

    <!-- Main Content -->
    <main class="main-content">
      <div class="content-wrapper">
        <!-- Loading -->
        <div v-if="isLoading" class="loading">
          <div class="loading-spinner" />
          <p>加载中...</p>
        </div>

        <!-- Content -->
        <template v-else-if="detail">
          <!-- Left: Article Content -->
          <div class="article-section">
            <h1 class="article-title">{{ detail.title }}</h1>
            
            <div class="article-meta">
              <span v-if="detail.source" class="meta-item">来源：{{ detail.source }}</span>
              <span class="meta-item">发布时间：{{ formatDate(detail.createTime) }}</span>
              <span class="meta-divider" />
              <span class="meta-item">浏览人数：{{ detail.statPv || 0 }}</span>
            </div>

            <div class="article-body" v-html="detail.content" />

            <!-- Related Links -->
            <div class="related-links">
              <div class="links-header">
                <h3>新闻链接</h3>
                <div class="header-divider">
                  <div class="divider-active" />
                  <div class="divider-inactive" />
                </div>
              </div>
              
              <div class="link-list">
                <a 
                  v-for="link in relatedLinks" 
                  :key="link.id"
                  :href="link.url"
                  class="link-item"
                >
                  <span class="link-dot" />
                  <div class="link-text">
                    <p class="link-title">{{ link.title }}</p>
                    <p class="link-source">({{ link.source }})</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <!-- Right: Special Topics -->
          <div class="topics-section">
            <div class="section-header">
              <h2 class="section-title">
                <span class="title-highlight">特别</span>专题
              </h2>
            </div>
            <div class="section-divider">
              <div class="divider-line active" />
              <div class="divider-line" />
            </div>

            <div v-if="isLoadingTopics" class="loading">
              <div class="loading-spinner" />
            </div>

            <div v-else class="topics-list">
              <a
                v-for="topic in specialTopics"
                :key="topic.id"
                :href="getTopicLink(topic)"
                :target="topic.contentType === 1 ? '_blank' : '_self'"
                class="topic-card"
              >
                <img 
                  :src="topic.coverUrl" 
                  :alt="topic.title"
                  class="topic-image"
                >
                <div class="topic-overlay">
                  <span class="topic-title">{{ topic.title }}</span>
                </div>
              </a>
            </div>
          </div>
        </template>

        <!-- Error -->
        <div v-else class="error-state">
          <p>内容加载失败</p>
          <button class="retry-btn" @click="loadDetail">
            重新加载
          </button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logos">
          <img 
            src="/images/8a264f96ca2ef2ae41fc9455a3252271c5f03a12.png" 
            alt="福州大学" 
            class="footer-logo"
          >
          <img 
            src="/images/95fe256e7055215419581e0b2171ddf24fbd0e16.png" 
            alt="Logo" 
            class="footer-logo-small"
          >
        </div>
        <div class="footer-divider" />
        <div class="footer-info">
          <p>地址：福建省福州市福州大学城乌龙江北大道2号</p>
          <p>邮编：350108</p>
          <p>中文域名：福州大学.公益</p>
          <div class="footer-bottom">
            <p>© 2021 福州大学     <a href="https://beian.miit.gov.cn/" target="_blank">闽ICP备05005463号</a></p>
            <p class="beian">
              <img src="/images/b7ed956a421650d887b7c14004ee575109d9f658.png" alt="公安备案">
              闽公网安备35018302000122
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getHotspotDetail, getSpecialTopicList } from '@/api/hotspot'
import type { HotspotItem, SpecialTopicItem } from '@/types/hotspot'

const route = useRoute()

const detail = ref<HotspotItem | null>(null)
const isLoading = ref(false)
const specialTopics = ref<SpecialTopicItem[]>([])
const isLoadingTopics = ref(false)

// Related links
const relatedLinks = ref([
  {
    id: 1,
    title: '2025年中国国际形象全球调查报告：习近平新时代中国特色社会主义思想获国际社会高度认同 国际社会对华好感度持续提升',
    source: '新华网',
    url: '#'
  },
  {
    id: 2,
    title: '2025年中国国际形象全球调查报告：习近平新时代中国特色社会主义思想获国际社会高度认同 国际社会对华好感度持续提升',
    source: '新华网',
    url: '#'
  }
])

// Mock special topics (extended)
const mockSpecialTopics: SpecialTopicItem[] = [
  {
    id: 1,
    title: '结合专业特色领会习近平总书记关于教育...',
    coverUrl: '/images/Frame_1000015326.png',
    content: '<p>结合专业特色领会习近平总书记关于教育的重要论述</p>',
    contentType: 0,
    sort: 1,
    showFront: 1,
    createTime: '2025-01-10'
  },
  {
    id: 2,
    title: '民无信不立 楼无廉不坚',
    coverUrl: '/images/Frame_1000015327.png',
    content: '<p>加强廉政文化建设</p>',
    contentType: 0,
    sort: 2,
    showFront: 1,
    createTime: '2025-01-09'
  },
  {
    id: 3,
    title: '弘扬五四精神 谱写奋斗青春',
    coverUrl: '/images/Frame_1000015361.png',
    content: '<p>传承五四精神</p>',
    contentType: 0,
    sort: 3,
    showFront: 1,
    createTime: '2025-01-08'
  },
  {
    id: 4,
    title: '数字经济成为福建经济发展的重要引擎',
    coverUrl: '/images/guanhuaiBG.png',
    content: '<p>数字经济发展</p>',
    contentType: 0,
    sort: 4,
    showFront: 1,
    createTime: '2025-01-07'
  },
  {
    id: 5,
    title: '解析校园火山地质讲好福州大学故事',
    coverUrl: '/images/indexBg.png',
    content: '<p>校园地质文化</p>',
    contentType: 0,
    sort: 5,
    showFront: 1,
    createTime: '2025-01-06'
  }
]

const loadDetail = async () => {
  const id = route.params.id as string
  if (!id) return

  try {
    isLoading.value = true
    
    // 调用真实API
    detail.value = await getHotspotDetail(id)
    
    console.log('思政热点详情加载成功:', {
      id: detail.value.id,
      标题: detail.value.title,
      浏览量: detail.value.statPv
    })
  } catch (error) {
    console.error('加载详情失败:', error)
    detail.value = null
  } finally {
    isLoading.value = false
  }
}

const loadSpecialTopics = async () => {
  try {
    isLoadingTopics.value = true
    
    // Mock data
    await new Promise(resolve => setTimeout(resolve, 300))
    specialTopics.value = mockSpecialTopics
    
    /* 实际API调用（已注释）：
    const response = await getSpecialTopicList()
    specialTopics.value = (response || [])
      .filter(item => item.showFront === 1)
      .sort((a, b) => a.sort - b.sort)
      .slice(0, 5)
    */
  } catch (error) {
    console.error('加载特别专题失败:', error)
    specialTopics.value = []
  } finally {
    isLoadingTopics.value = false
  }
}

const formatDate = (dateStr: string) => {
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  } catch {
    return dateStr
  }
}

const getTopicLink = (topic: SpecialTopicItem) => {
  if (topic.contentType === 1) {
    return topic.content
  } else {
    return `/topic/detail/${topic.id}`
  }
}

onMounted(() => {
  loadDetail()
  loadSpecialTopics()
})
</script>

<style scoped>
.detail-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
}

/* Header - Same as list page */
.header {
  background: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  max-width: 1920px;
  margin: 0 auto;
  height: 110px;
  padding: 0 360px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo-img {
  height: 52px;
  width: 195px;
  object-fit: contain;
}

.logo-text {
  font-family: 'Source Han Sans CN', sans-serif;
  font-size: 24px;
  color: #515151;
  white-space: nowrap;
}

.action-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-bar {
  display: flex;
  align-items: center;
  border: 1px solid #c30d23;
  border-radius: 5px;
  overflow: hidden;
}

.search-input {
  width: 216px;
  padding: 6px 16px;
  border: none;
  outline: none;
  font-size: 14px;
  color: #757575;
}

.search-btn {
  background: #c30d23;
  color: white;
  border: none;
  padding: 6px 19px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s;
  white-space: nowrap;
}

.search-btn:hover {
  background: #a00a1c;
}

.admin-btn {
  border: 1px solid #c30d23;
  background: white;
  color: #c30d23;
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.admin-btn:hover {
  background: #c30d23;
  color: white;
}

.login-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: #c30d23;
  font-size: 18px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.login-btn:hover {
  opacity: 0.8;
}

/* Navigation */
.nav-bar {
  background: #c30d23;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 76px;
  padding: 0 360px;
}

.nav-item {
  color: white;
  font-size: 18px;
  text-decoration: none;
  transition: opacity 0.3s;
  white-space: nowrap;
}

.nav-item:hover,
.nav-item.active {
  opacity: 0.8;
  font-weight: 500;
}

/* Page Banner */
.page-banner {
  height: 150px;
  background: linear-gradient(to bottom, #c30d23, #e84a5f);
  background-image: url('/images/4c8331d220c0e081675aafdc11c39282e1eb9cb9.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-title {
  font-size: 55.9px;
  font-weight: bold;
  background: linear-gradient(to bottom, white, #f7eea4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 2px 8px 2px rgba(0, 0, 0, 0.15);
  margin: 0;
}

/* Breadcrumb */
.breadcrumb-container {
  padding: 0 360px;
}

.breadcrumb {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 24px 0;
  border-bottom: 1px solid #ebebeb;
  font-size: 16px;
  line-height: 1.75;
  justify-content: flex-start;
}

.breadcrumb-item {
  color: #333;
  opacity: 0.5;
  text-decoration: none;
  transition: opacity 0.3s;
}

.breadcrumb-item:hover {
  opacity: 0.8;
}

.breadcrumb-item.active {
  color: #c30d23;
  opacity: 1;
}

.breadcrumb-separator {
  color: #333;
  opacity: 0.5;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 40px 360px;
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
}

.content-wrapper {
  display: flex;
  gap: 40px;
}

/* Article Section */
.article-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.article-title {
  font-size: 28px;
  font-weight: bold;
  color: #000;
  line-height: 45px;
  text-align: center;
  margin: 0;
  padding: 0 24px;
}

.article-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 14px;
  color: #999;
}

.meta-item {
  white-space: nowrap;
}

.meta-divider {
  width: 1px;
  height: 14px;
  background: #eee;
}

.article-body {
  font-size: 16px;
  line-height: 1.75;
  color: #666;
}

.article-body :deep(p) {
  margin: 0 0 16px;
}

.article-body :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 16px 0;
}

/* Related Links */
.related-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}

.links-header h3 {
  font-size: 16px;
  color: #333;
  margin: 0 0 12px;
}

.header-divider {
  display: flex;
  align-items: center;
  width: 100%;
}

.divider-active {
  width: 64px;
  height: 2px;
  background: #c30d23;
}

.divider-inactive {
  flex: 1;
  height: 2px;
  background: #eee;
}

.link-list {
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.link-item {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  text-decoration: none;
  transition: all 0.3s;
}

.link-item:hover {
  transform: translateX(4px);
}

.link-dot {
  width: 4px;
  height: 4px;
  background: #c30d23;
  border-radius: 2px;
  margin-top: 8px;
  flex-shrink: 0;
}

.link-text {
  flex: 1;
  font-size: 14px;
  color: #333;
  line-height: normal;
}

.link-title {
  margin: 0;
}

.link-source {
  margin: 0;
  color: #666;
}

/* Topics Section */
.topics-section {
  width: 305px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.section-header {
  display: flex;
  align-items: center;
}

.section-title {
  font-size: 30px;
  font-weight: bold;
  margin: 0;
  white-space: nowrap;
}

.title-highlight {
  color: #c30d23;
}

.section-divider {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 40px;
}

.divider-line {
  height: 2px;
  background: #e0e0e0;
  flex: 1;
}

.divider-line.active {
  background: #c30d23;
  width: 86px;
  flex: none;
}

.topics-list {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.topic-card {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: transform 0.3s;
  text-decoration: none;
  display: block;
}

.topic-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.topic-image {
  width: 100%;
  height: auto;
  aspect-ratio: 380 / 213;
  object-fit: cover;
  display: block;
}

.topic-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 6px 12px;
  border-radius: 0 0 4px 4px;
}

.topic-title {
  color: white;
  font-size: 14px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Loading */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #999;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #c30d23;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error State */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #999;
}

.retry-btn {
  margin-top: 16px;
  padding: 8px 24px;
  background: #c30d23;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.retry-btn:hover {
  background: #a00a1c;
}

/* Footer */
.footer {
  background: #222;
  color: white;
  padding: 24px 360px;
  margin-top: auto;
}

.footer-content {
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
}

.footer-logos {
  display: flex;
  align-items: center;
  gap: 16px;
}

.footer-logo {
  height: 60px;
  width: 180px;
  object-fit: contain;
}

.footer-logo-small {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.footer-divider {
  width: 1px;
  height: 128px;
  background: white;
  opacity: 0.3;
}

.footer-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 16px;
  line-height: 1.75;
}

.footer-info p {
  margin: 0;
}

.footer-info a {
  color: white;
  text-decoration: underline;
}

.footer-bottom {
  display: flex;
  gap: 48px;
  align-items: center;
}

.beian {
  display: flex;
  align-items: center;
  gap: 4px;
}

.beian img {
  width: 18px;
  height: 20px;
}

/* Responsive */
@media (max-width: 1600px) {
  .header-content,
  .nav-bar,
  .main-content,
  .footer,
  .breadcrumb-container {
    padding-left: 40px;
    padding-right: 40px;
  }
}

@media (max-width: 1200px) {
  .content-wrapper {
    flex-direction: column;
  }
  
  .topics-section {
    width: 100%;
  }
  
  .topics-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .header-content {
    height: auto;
    padding: 20px;
    flex-direction: column;
    gap: 16px;
  }
  
  .logo-section {
    flex-direction: column;
    text-align: center;
  }
  
  .logo-text {
    font-size: 18px;
  }
  
  .action-section {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav-bar {
    height: auto;
    flex-wrap: wrap;
    gap: 20px;
    padding: 16px;
  }
  
  .page-banner {
    height: 100px;
  }
  
  .banner-title {
    font-size: 36px;
  }
  
  .article-title {
    font-size: 22px;
    line-height: 1.4;
  }
}
</style>

