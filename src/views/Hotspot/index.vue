<template>
  <div class="hotspot-page">
    <!-- Header -->
    <AppHeader />

    <!-- Banner -->
    <AppBanner />

    <!-- Navigation -->
    <AppNavigation />

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
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getHotspotList, getSpecialTopicList } from '@/api/hotspot'
import type { HotspotItem, SpecialTopicItem } from '@/types/hotspot'
import AppHeader from '@/components/common/AppHeader/index.vue'
import AppBanner from '@/components/common/AppBanner/index.vue'
import AppNavigation from '@/components/common/AppNavigation/index.vue'
import AppFooter from '@/components/common/AppFooter/index.vue'

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

// Mock Data - 模拟数据
const mockHotspotData: HotspotItem[] = [
  {
    id: 1,
    title: '党建引领成渝地区双城经济圈职业院校"大思政课"建设高质量发展研讨会暨2025年共同体年会举办',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 1,
    statPv: 1250,
    showFront: 1,
    createTime: '2025-01-10'
  },
  {
    id: 2,
    title: '党建领航 融创赋能——福建信息职业技术学院物联网与人工智能学院探索"1354"党建工作机制纪实',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 980,
    showFront: 1,
    createTime: '2025-01-09'
  },
  {
    id: 3,
    title: '党建引领·体系赋能 河南经贸职业学院人工智能技术应用专业群打造人才培养新范式',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 856,
    showFront: 1,
    createTime: '2025-01-08'
  },
  {
    id: 4,
    title: '深耕区域发展 江西洪州职业学院以产教融合书写育人新篇',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 742,
    showFront: 1,
    createTime: '2025-01-07'
  },
  {
    id: 5,
    title: '总书记关心的重大文化工程｜存史启智润民心',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 1580,
    showFront: 1,
    createTime: '2025-01-06'
  },
  {
    id: 6,
    title: '有人用AI"拍"了一部《芭本海默》，堪比好莱坞原片',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 2100,
    showFront: 1,
    createTime: '2025-01-05'
  },
  {
    id: 7,
    title: '马斯克：如果没有外星人，那么我们就只是黑暗深渊中一根小蜡烛',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 1890,
    showFront: 1,
    createTime: '2025-01-04'
  },
  {
    id: 8,
    title: '一家三口吃瓜中毒！凌晨3点进医院…',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 3200,
    showFront: 1,
    createTime: '2025-01-03'
  },
  {
    id: 9,
    title: '上市三年，突然"易主"？',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 1450,
    showFront: 1,
    createTime: '2025-01-02'
  },
  {
    id: 10,
    title: '智慧农业风起，中科原动力带机器人走进田间地头',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 920,
    showFront: 1,
    createTime: '2025-01-01'
  },
  {
    id: 11,
    title: '曾比恒大冲更猛，他比许家印更可惜',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 2500,
    showFront: 1,
    createTime: '2024-12-31'
  },
  {
    id: 12,
    title: '买彩票的年轻人：用确定的不确定性对抗焦虑',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 1680,
    showFront: 1,
    createTime: '2024-12-30'
  },
  {
    id: 13,
    title: '暑期游火爆，文旅企业收入却"令人意外"在下降？',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 1120,
    showFront: 1,
    createTime: '2024-12-29'
  },
  {
    id: 14,
    title: '中国电影行业的王座，正在悄悄易主？',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 1340,
    showFront: 1,
    createTime: '2024-12-28'
  },
  {
    id: 15,
    title: '弘扬践行教育家精神 书写教育强国篇章——习近平总书记给全国特岗教师代表的回信激励广大教师',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 2800,
    showFront: 1,
    createTime: '2024-12-27'
  },
  {
    id: 16,
    title: '纪念中国人民抗日战争暨世界反法西斯战争胜利80周年',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 3500,
    showFront: 1,
    createTime: '2024-12-26'
  },
  {
    id: 17,
    title: '文化是灵魂——习近平文化思想在浙江的溯源与实践（上）',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 2200,
    showFront: 1,
    createTime: '2024-12-25'
  },
  {
    id: 18,
    title: '江西省高校课程思政教学示范研究中心暨课程思政建设工作推进会在江西中医药大学举办',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 1560,
    showFront: 1,
    createTime: '2024-12-24'
  },
  {
    id: 19,
    title: '习近平总书记关切事丨流金淌银！北国冰雪资源释放新红利——冰雪经济高质量发展新实践之一',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 1890,
    showFront: 1,
    createTime: '2024-12-23'
  },
  {
    id: 20,
    title: '女子去银行取15万现金，工作人员细查后报警，民警顺线抓洗钱团伙',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 4200,
    showFront: 1,
    createTime: '2024-12-22'
  },
  {
    id: 21,
    title: '同甘不共苦， "消失"的房企合伙人',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 1750,
    showFront: 1,
    createTime: '2024-12-21'
  },
  {
    id: 22,
    title: '银行业危机风波未完：仍有一颗定时炸弹滴滴作响！',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 2600,
    showFront: 1,
    createTime: '2024-12-20'
  },
  {
    id: 23,
    title: '信息量非常大！房地产，一个转向要来了？',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 3100,
    showFront: 1,
    createTime: '2024-12-19'
  },
  {
    id: 24,
    title: '一文看懂，居民的钱都投资去了哪里？',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 1980,
    showFront: 1,
    createTime: '2024-12-18'
  },
  {
    id: 25,
    title: '七、八十年代风靡全国的"的确良"是什么面料，为何突然消失了？',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 2300,
    showFront: 1,
    createTime: '2024-12-17'
  },
  {
    id: 26,
    title: '国产电车的遮羞布，被高温撕掉了',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 2750,
    showFront: 1,
    createTime: '2024-12-16'
  },
  {
    id: 27,
    title: '深化新时代教育评价改革 推动高等教育高质量发展',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 1450,
    showFront: 1,
    createTime: '2024-12-15'
  },
  {
    id: 28,
    title: '加强思政课建设 培养时代新人——各地高校深入学习贯彻习近平总书记重要讲话精神',
    content: '<p>详细内容...</p>',
    contentType: 0,
    pinTop: 0,
    statPv: 1820,
    showFront: 1,
    createTime: '2024-12-14'
  }
]

const mockSpecialTopics: SpecialTopicItem[] = [
  {
    id: 1,
    title: '结合专业特色领会习近平总书记关于教育...',
    coverUrl: '/images/Frame_1000015326.png',
    content: '<p>结合专业特色领会习近平总书记关于教育的重要论述，推动思政课程与课程思政同向同行。</p>',
    contentType: 0,
    sort: 1,
    showFront: 1,
    createTime: '2025-01-10'
  },
  {
    id: 2,
    title: '民无信不立 楼无廉不坚',
    coverUrl: '/images/Frame_1000015327.png',
    content: '<p>加强廉政文化建设，培养新时代廉洁自律的社会主义建设者和接班人。</p>',
    contentType: 0,
    sort: 2,
    showFront: 1,
    createTime: '2025-01-09'
  },
  {
    id: 3,
    title: '弘扬五四精神 谱写奋斗青春',
    coverUrl: '/images/Frame_1000015361.png',
    content: '<p>传承五四精神，激励广大青年学生在新时代建功立业，谱写壮丽的青春篇章。</p>',
    contentType: 0,
    sort: 3,
    showFront: 1,
    createTime: '2025-01-08'
  }
]

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
    
    // 使用模拟数据
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Filter by search keyword if provided
    let filteredData = mockHotspotData
    if (searchKeyword.value) {
      filteredData = mockHotspotData.filter(item => 
        item.title.toLowerCase().includes(searchKeyword.value.toLowerCase())
      )
    }
    
    // Paginate
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    newsList.value = filteredData.slice(start, end)
    total.value = filteredData.length
    
    /* 实际API调用代码（已注释）：
    const response = await getHotspotList({
      pageIndex: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchKeyword.value || undefined,
      showFront: 1 // Only show active items
    })
    
    newsList.value = response.records || []
    total.value = response.total || 0
    */
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
    
    // 使用模拟数据
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    specialTopics.value = mockSpecialTopics
    
    /* 实际API调用代码（已注释）：
    const response = await getSpecialTopicList()
    // Filter to show only active items and limit to 3
    specialTopics.value = (response || [])
      .filter(item => item.showFront === 1)
      .sort((a, b) => a.sort - b.sort)
      .slice(0, 3)
    */
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
})
</script>

<style scoped>
.hotspot-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
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

/* Responsive */
@media (max-width: 1600px) {
  .main-content {
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
  .news-columns {
    grid-template-columns: 1fr;
  }
}
</style>

