<template>
  <div class="hotspot-page">
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
              v-model="searchKeyword"
              type="text" 
              placeholder="课程 名师 新闻 资源搜索"
              class="search-input"
              @keyup.enter="handleSearch"
            >
            <button class="search-btn" @click="handleSearch">
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

    <!-- Banner -->
    <div class="banner">
      <img 
        src="/images/e1abaefd40f9ac8751d3843a47b777c872cdb435.png" 
        alt="Banner" 
        class="banner-img"
      >
      <div class="banner-indicators">
        <span 
          v-for="(item, index) in bannerCount" 
          :key="index" 
          class="indicator"
          :class="{ active: index === currentBanner }"
          @click="currentBanner = index"
        />
      </div>
    </div>

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

    <!-- Main Content -->
    <main class="main-content">
      <div class="content-wrapper">
        <!-- Left: News List -->
        <div class="news-section">
          <div class="section-header">
            <h2 class="section-title">
              <span class="title-highlight">思政</span>热点
            </h2>
            <div class="title-divider" />
          </div>

          <!-- Loading -->
          <div v-if="isLoading" class="loading">
            <div class="loading-spinner" />
            <p>加载中...</p>
          </div>

          <!-- News List -->
          <div v-else class="news-list">
            <div class="news-columns">
              <!-- Left Column -->
              <div class="news-column">
                <a
                  v-for="(item, index) in leftColumnNews"
                  :key="item.id"
                  :href="getNewsLink(item)"
                  :target="item.contentType === 1 ? '_blank' : '_self'"
                  class="news-item"
                  :class="{ featured: index === 0 && item.pinTop }"
                >
                  <span class="news-icon" :class="{ featured: index === 0 && item.pinTop }" />
                  <span class="news-title">{{ item.title }}</span>
                </a>
              </div>

              <!-- Right Column -->
              <div class="news-column">
                <a
                  v-for="item in rightColumnNews"
                  :key="item.id"
                  :href="getNewsLink(item)"
                  :target="item.contentType === 1 ? '_blank' : '_self'"
                  class="news-item"
                >
                  <span class="news-icon" />
                  <span class="news-title">{{ item.title }}</span>
                </a>
              </div>
            </div>

            <!-- Pagination -->
            <div v-if="total > 0" class="pagination">
              <button 
                class="page-btn"
                :disabled="currentPage === 1"
                @click="goToPage(currentPage - 1)"
              >
                ‹
              </button>
              <button 
                v-for="page in displayPages"
                :key="page"
                class="page-btn"
                :class="{ active: page === currentPage, ellipsis: page === '...' }"
                :disabled="page === '...'"
                @click="typeof page === 'number' && goToPage(page)"
              >
                {{ page }}
              </button>
              <button 
                class="page-btn"
                :disabled="currentPage === totalPages"
                @click="goToPage(currentPage + 1)"
              >
                ›
              </button>
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
import { ref, computed, onMounted } from 'vue'
import { getHotspotList, getSpecialTopicList } from '@/api/hotspot'
import type { HotspotItem, SpecialTopicItem } from '@/types/hotspot'

// Banner
const bannerCount = 3
const currentBanner = ref(0)

// Search
const searchKeyword = ref('')

// News List
const newsList = ref<HotspotItem[]>([])
const isLoading = ref(false)
const currentPage = ref(1)
const pageSize = ref(28) // 14 items per column * 2 columns
const total = ref(0)

// Special Topics
const specialTopics = ref<SpecialTopicItem[]>([])
const isLoadingTopics = ref(false)

// Computed
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

const leftColumnNews = computed(() => {
  const itemsPerColumn = pageSize.value / 2
  return newsList.value.slice(0, itemsPerColumn)
})

const rightColumnNews = computed(() => {
  const itemsPerColumn = pageSize.value / 2
  return newsList.value.slice(itemsPerColumn)
})

const displayPages = computed(() => {
  const pages: (number | string)[] = []
  const maxDisplay = 5
  
  if (totalPages.value <= maxDisplay + 2) {
    // Show all pages
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    // Show first page
    pages.push(1)
    
    if (currentPage.value > 3) {
      pages.push('...')
    }
    
    // Show pages around current
    const start = Math.max(2, currentPage.value - 1)
    const end = Math.min(totalPages.value - 1, currentPage.value + 1)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    if (currentPage.value < totalPages.value - 2) {
      pages.push('...')
    }
    
    // Show last page
    if (totalPages.value > 1) {
      pages.push(totalPages.value)
    }
  }
  
  return pages
})

// Methods
const loadNewsList = async () => {
  try {
    isLoading.value = true
    
    const response = await getHotspotList({
      pageIndex: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchKeyword.value || undefined,
      showFront: 1 // Only show active items
    })
    
    newsList.value = response.records || []
    total.value = response.total || 0
  } catch (error) {
    console.error('加载新闻列表失败:', error)
    newsList.value = []
    total.value = 0
  } finally {
    isLoading.value = false
  }
}

const loadSpecialTopics = async () => {
  try {
    isLoadingTopics.value = true
    
    const response = await getSpecialTopicList()
    // Filter to show only active items and limit to 3
    specialTopics.value = (response || [])
      .filter(item => item.showFront === 1)
      .sort((a, b) => a.sort - b.sort)
      .slice(0, 3)
  } catch (error) {
    console.error('加载特别专题失败:', error)
    specialTopics.value = []
  } finally {
    isLoadingTopics.value = false
  }
}

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  loadNewsList()
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSearch = () => {
  currentPage.value = 1
  loadNewsList()
}

const getNewsLink = (item: HotspotItem) => {
  if (item.contentType === 1) {
    // External link
    return item.content
  } else {
    // Internal detail page
    return `/hotspot/detail/${item.id}`
  }
}

const getTopicLink = (topic: SpecialTopicItem) => {
  if (topic.contentType === 1) {
    // External link
    return topic.content
  } else {
    // Internal detail page
    return `/topic/detail/${topic.id}`
  }
}

// Lifecycle
onMounted(() => {
  loadNewsList()
  loadSpecialTopics()
  
  // Auto-rotate banner
  setInterval(() => {
    currentBanner.value = (currentBanner.value + 1) % bannerCount
  }, 5000)
})
</script>

<style scoped>
.hotspot-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
}

/* Header */
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

/* Banner */
.banner {
  position: relative;
  height: 500px;
  background: #f0f0f0;
  overflow: hidden;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-indicators {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 18px;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s;
}

.indicator.active {
  background: #c30d23;
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

/* News Section */
.news-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px dashed #ebebeb;
  padding-bottom: 10px;
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

.title-divider {
  flex: 1;
  height: 15px;
  background: url('/images/0284b4e501c92c66c4350a706aae467b7ebb06a3.png') repeat-x;
  background-size: 5px 15px;
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

/* News List */
.news-list {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.news-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.news-column {
  display: flex;
  flex-direction: column;
}

.news-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 24px 0;
  border-bottom: 1px solid #ebebeb;
  text-decoration: none;
  transition: all 0.3s;
}

.news-item:hover {
  background: #fafafa;
  padding-left: 8px;
  padding-right: 8px;
}

.news-item.featured .news-title {
  color: #c30d23;
}

.news-icon {
  width: 8px;
  height: 16px;
  flex-shrink: 0;
  background: url('/images/9f21d90a8d17396bf95f57db531344599e1c097e.svg') no-repeat center;
  background-size: contain;
  margin-top: 4px;
}

.news-icon.featured {
  background: url('/images/0a69d61733100a7d75e3b855e4423c16317cd7e8.svg') no-repeat center;
  background-size: contain;
}

.news-title {
  flex: 1;
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 11.43px;
}

.page-btn {
  width: 32px;
  height: 32px;
  border-radius: 3.429px;
  border: none;
  background: #f4f4f5;
  color: #333;
  font-size: 13.714px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn:hover:not(:disabled):not(.ellipsis) {
  background: #e0e0e0;
}

.page-btn.active {
  background: #c30d23;
  color: white;
  font-weight: bold;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn.ellipsis {
  cursor: default;
}

/* Topics Section */
.topics-section {
  width: 305px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 40px;
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
  .footer {
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
    flex-direction: row;
    overflow-x: auto;
  }
  
  .topic-card {
    min-width: 305px;
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
  
  .news-columns {
    grid-template-columns: 1fr;
  }
  
  .banner {
    height: 300px;
  }
}
</style>

