<template>
  <div class="teaching-page">
    <!-- Header -->
    <AppHeader />

    <!-- Banner -->
    <AppBanner />

    <!-- Navigation -->
    <AppNavigation />

    <!-- Main Content -->
    <main class="main-content">
      <div class="section-header">
        <div class="section-title-wrapper">
          <h2 class="section-title">
            <span class="title-highlight">教学</span><span class="title-normal">有道</span>
          </h2>
          <div class="title-divider" />
        </div>
      </div>

      <div class="content-wrapper">
        <!-- 左侧学科门类侧边栏 -->
        <aside class="sidebar">
          <div class="sidebar-header">
            学科门类
          </div>
          <div 
            class="sidebar-item"
            :class="{ active: selectedCollegeId === 0 }"
            @click="selectCollege(0)"
          >
            <span>全部</span>
            <svg v-if="selectedCollegeId === 0" class="arrow-icon" width="6" height="12" viewBox="0 0 6 12" fill="none">
              <path d="M0 0L6 6L0 12V0Z" fill="#c30d23"/>
            </svg>
          </div>
          <div 
            v-for="college in colleges" 
            :key="college.id"
            class="sidebar-item"
            :class="{ active: selectedCollegeId === college.id }"
            @click="selectCollege(college.id)"
          >
            <span>{{ college.name }}</span>
          </div>
        </aside>

        <!-- 右侧内容区 -->
        <div class="main-container">
          <!-- 筛选条件 -->
          <div class="filter-section">
            <div class="filter-row">
              <span class="filter-label">您已选择</span>
              <div class="divider" />
              <div class="filter-tags">
                <span class="filter-tag active">
                  {{ selectedCollegeId === 0 ? '全部' : colleges.find(c => c.id === selectedCollegeId)?.name || '全部' }}
                </span>
              </div>
            </div>
            <div class="filter-row type-filter">
              <span class="filter-label">教学类别</span>
              <div class="divider" />
              <div class="filter-tags">
                <span 
                  class="filter-tag"
                  :class="{ active: selectedCaseType === 1 }"
                  @click="selectCaseType(1)"
                >
                  教学案例
                </span>
                <span 
                  class="filter-tag"
                  :class="{ inactive: selectedCaseType !== 2 }"
                  @click="selectCaseType(2)"
                >
                  一流本科
                </span>
              </div>
            </div>
          </div>

          <!-- 统计和搜索 -->
          <div class="stats-search">
            <div class="stats">
              <svg class="stats-icon" width="38" height="35" viewBox="0 0 38 35" fill="none">
                <rect x="2" y="2" width="34" height="31" rx="2" stroke="#c30d23" stroke-width="2"/>
                <circle cx="19" cy="17.5" r="8" fill="#c30d23"/>
                <path d="M16 15L22 17.5L16 20V15Z" fill="white"/>
              </svg>
              <span class="stats-text">共计收录 <span class="stats-count">{{ total }}</span>个 视频</span>
            </div>
            <div class="search-box">
              <div class="search-input-wrapper">
                <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="#333" opacity="0.5" stroke-width="1"/>
                  <path d="M11 11L14 14" stroke="#333" opacity="0.5" stroke-width="1"/>
                </svg>
                <input 
                  v-model="searchKeyword" 
                  type="text" 
                  placeholder="请输入"
                  class="search-input-field"
                  @keyup.enter="handleSearch"
                >
              </div>
              <button class="search-button" @click="handleSearch">
                搜索
              </button>
            </div>
          </div>

          <!-- 案例卡片列表 -->
          <div v-if="loading" class="loading-container">
            <div class="loading">加载中...</div>
          </div>
          <div v-else-if="caseList.length === 0" class="empty-container">
            <div class="empty">暂无数据</div>
          </div>
          <div v-else class="case-grid">
            <div 
              v-for="item in caseList" 
              :key="item.id" 
              class="case-card"
              @click="goToDetail(item.id)"
            >
              <div class="card-cover">
                <img :src="item.coverUrl" alt="" class="cover-img">
                <div class="cover-overlay">
                  <span class="case-label">案例名称：{{ item.title }}</span>
                </div>
                <div v-if="item.isNational" class="national-badge">
                  国家示范
                </div>
              </div>
              <div class="card-content">
                <h3 class="card-title">{{ item.title }}</h3>
                <div class="card-footer">
                  <span class="teacher-name">教师：{{ item.teacherName }}</span>
                  <div class="view-count">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 5C9.65685 5 11 6.34315 11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5Z" stroke="#333" opacity="0.5" stroke-width="1"/>
                      <path d="M1 8C1 8 3 3 8 3C13 3 15 8 15 8C15 8 13 13 8 13C3 13 1 8 1 8Z" stroke="#333" opacity="0.5" stroke-width="1"/>
                    </svg>
                    <span>{{ formatViewCount(item.viewCount) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 分页器 -->
          <div v-if="total > 0" class="pagination">
            <button 
              class="page-btn"
              :disabled="currentPage === 1"
              @click="goToPage(currentPage - 1)"
            >
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path d="M6 1L1 6L6 11" stroke="#333" stroke-width="1.5"/>
              </svg>
            </button>
            <button 
              class="page-number"
              :class="{ active: currentPage === 1 }"
              @click="goToPage(1)"
            >
              1
            </button>
            <button 
              v-if="totalPages > 1"
              class="page-number"
              :class="{ active: currentPage === 2 }"
              @click="goToPage(2)"
            >
              2
            </button>
            <button 
              v-if="totalPages > 2"
              class="page-number"
              :class="{ active: currentPage === 3 }"
              @click="goToPage(3)"
            >
              3
            </button>
            <button 
              v-if="totalPages > 3"
              class="page-number"
              :class="{ active: currentPage === 4 }"
              @click="goToPage(4)"
            >
              4
            </button>
            <button 
              v-if="totalPages > 4"
              class="page-number"
              :class="{ active: currentPage === 5 }"
              @click="goToPage(5)"
            >
              5
            </button>
            <span v-if="totalPages > 6" class="page-ellipsis">...</span>
            <button 
              v-if="totalPages > 5"
              class="page-number"
              :class="{ active: currentPage === totalPages }"
              @click="goToPage(totalPages)"
            >
              {{ totalPages }}
            </button>
            <button 
              class="page-btn"
              :disabled="currentPage === totalPages"
              @click="goToPage(currentPage + 1)"
            >
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path d="M1 1L6 6L1 11" stroke="#333" stroke-width="1.5"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getCollegeList, getTeachingCaseList } from '@/api/teaching'
import type { TeachingCase, College } from '@/types/teaching'
import { ElMessage } from 'element-plus'
import AppHeader from '@/components/common/AppHeader/index.vue'
import AppBanner from '@/components/common/AppBanner/index.vue'
import AppNavigation from '@/components/common/AppNavigation/index.vue'
import AppFooter from '@/components/common/AppFooter/index.vue'

const router = useRouter()

// 学院列表
const colleges = ref<College[]>([
  { id: 1, name: '电气工程与自动化学院' },
  { id: 2, name: '机械工程及自动化学院' },
  { id: 3, name: '数学与统计学院' },
  { id: 4, name: '化工学院' },
  { id: 5, name: '土木工程学院' },
  { id: 6, name: '环境与安全工程学院' },
  { id: 7, name: '经济与管理学院' },
  { id: 8, name: '生物科学与工程学院' },
  { id: 9, name: '外国语学院' },
  { id: 10, name: '计算机与大数据学院' },
  { id: 11, name: '化学学院' },
  { id: 12, name: '建筑与城乡规划学院' },
  { id: 13, name: '紫金地质与矿业学院' },
  { id: 14, name: '厦门工艺美术学院' },
  { id: 15, name: '材料科学与工程学院' },
  { id: 16, name: '法学院' },
  { id: 17, name: '海洋学院(先进制造学院)' },
  { id: 18, name: '人文社会科学学院' },
  { id: 19, name: '体育教学研究部' },
  { id: 20, name: '军事教研室' }
])

// 筛选条件
const selectedCollegeId = ref<number | string>(0)
const selectedCaseType = ref<number>(1) // 1-教学案例, 2-一流本科

// 搜索关键词
const searchKeyword = ref('')

// 案例列表
const caseList = ref<TeachingCase[]>([])
const loading = ref(false)
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(15)

// 计算总页数
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

/**
 * 选择学院
 */
function selectCollege(collegeId: number | string) {
  selectedCollegeId.value = collegeId
  currentPage.value = 1
  loadCaseList()
}

/**
 * 选择案例类型
 */
function selectCaseType(type: number) {
  selectedCaseType.value = type
  currentPage.value = 1
  loadCaseList()
}

/**
 * 搜索
 */
function handleSearch() {
  currentPage.value = 1
  loadCaseList()
}

/**
 * 跳转到指定页
 */
function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) {
    return
  }
  currentPage.value = page
  loadCaseList()
}

/**
 * 加载案例列表
 */
async function loadCaseList() {
  try {
    loading.value = true
    const res = await getTeachingCaseList({
      collegeId: selectedCollegeId.value,
      caseType: selectedCaseType.value,
      keyword: searchKeyword.value,
      page: currentPage.value,
      pageSize: pageSize.value
    })
    
    if (res.code === 200 && res.data) {
      caseList.value = res.data.list || []
      total.value = res.data.total || 0
    } else {
      // 模拟数据
      const mockData = generateMockData()
      caseList.value = mockData
      total.value = 19467
    }
  } catch (error) {
    console.error('加载教学案例失败:', error)
    // 使用模拟数据
    const mockData = generateMockData()
    caseList.value = mockData
    total.value = 19467
  } finally {
    loading.value = false
  }
}

/**
 * 生成模拟数据
 */
function generateMockData(): TeachingCase[] {
  const titles = [
    '为党为国育人才  擘画东南强校梦',
    '传承红色基因  培育时代新人',
    '立德树人守初心  铸魂育人担使命',
    '思政引领促发展  立德树人谱新篇',
    '党建引领聚合力  立德树人育英才'
  ]
  
  const teachers = ['薛美玉', '王海龙', '陈晓明', '李思远', '张文华']
  
  const covers = [
    '/images/home/video-1.jpg',
    '/images/home/video-2.jpg',
    '/images/home/video-3.jpg',
    '/images/home/video-4.jpg',
    '/images/Frame_1000015326.png'
  ]

  const result: TeachingCase[] = []
  for (let i = 0; i < 15; i++) {
    result.push({
      id: i + 1,
      title: titles[i % titles.length],
      coverUrl: covers[i % covers.length],
      teacherName: teachers[i % teachers.length],
      viewCount: Math.floor(Math.random() * 10000) + 1000,
      isNational: i % 5 === 0
    })
  }
  
  return result
}

/**
 * 格式化浏览量
 */
function formatViewCount(count: number): string {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}万人`
  }
  return `${count}人`
}

/**
 * 跳转到详情
 */
function goToDetail(id: number | string) {
  router.push(`/teaching/detail/${id}`)
}

// 初始化加载
onMounted(() => {
  loadCaseList()
})
</script>

<style scoped>
.teaching-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
}

/* ===== Main Content ===== */
.main-content {
  flex: 1;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 60px 360px 80px;
}

.section-header {
  margin-bottom: 40px;
}

.section-title-wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.section-title {
  font-family: 'Source Han Sans CN', sans-serif;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin: 0;
  white-space: nowrap;
}

.title-highlight {
  color: #c30d23;
}

.title-normal {
  color: #000;
}

.title-divider {
  flex: 1;
  height: 15px;
  background-image: url('/images/0284b4e501c92c66c4350a706aae467b7ebb06a3.png');
  background-repeat: repeat-x;
  background-size: 5px 15px;
}

.content-wrapper {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

/* ===== Sidebar ===== */
.sidebar {
  flex: 0 0 208px;
  background: #f9f9f9;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
}

.sidebar-header {
  padding: 24px 25px;
  background: #c30d23;
  color: white;
  font-size: 16px;
  font-weight: bold;
  font-family: 'Microsoft YaHei', sans-serif;
  text-align: center;
}

.sidebar-item {
  padding: 16px 24px;
  background: #f9f9f9;
  color: #333;
  font-size: 16px;
  font-family: 'Source Han Sans CN', sans-serif;
  text-align: center;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
}

.sidebar-item:hover {
  background: #ececec;
}

.sidebar-item.active {
  background: #ececec;
  color: #c30d23;
}

.arrow-icon {
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
}

/* ===== Main Container ===== */
.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

/* ===== Filter Section ===== */
.filter-section {
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px;
}

.type-filter {
  background: white;
}

.filter-label {
  font-size: 16px;
  color: #333;
  font-family: 'Source Han Sans CN', sans-serif;
  white-space: nowrap;
}

.divider {
  width: 1px;
  height: 24px;
  background: #e5e5e5;
}

.filter-tags {
  display: flex;
  align-items: center;
  gap: 0;
}

.filter-tag {
  padding: 4px 24px;
  border: 1px solid #c30d23;
  border-radius: 100px;
  color: #c30d23;
  font-size: 16px;
  font-family: 'Source Han Sans CN', sans-serif;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.filter-tag.inactive {
  border: none;
  color: #333;
}

.filter-tag.active {
  background: transparent;
}

/* ===== Stats & Search ===== */
.stats-search {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stats {
  display: flex;
  align-items: center;
  gap: 4px;
}

.stats-icon {
  width: 38px;
  height: 35px;
  object-fit: contain;
}

.stats-text {
  font-size: 16px;
  color: #333;
  font-family: 'Source Han Sans CN', sans-serif;
}

.stats-count {
  color: #bc2220;
  font-weight: bold;
}

.search-box {
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 100px;
  padding: 8px 16px;
  gap: 16px;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
}

.search-icon {
  opacity: 0.5;
}

.search-input-field {
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;
  font-family: 'Source Han Sans CN', sans-serif;
  width: 200px;
}

.search-input-field::placeholder {
  color: #333;
  opacity: 0.5;
}

.search-button {
  border: none;
  background: transparent;
  color: #d50100;
  font-size: 16px;
  font-family: 'Source Han Sans CN', sans-serif;
  cursor: pointer;
  padding: 0;
}

/* ===== Case Grid ===== */
.case-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.case-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.case-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-cover {
  width: 100%;
  aspect-ratio: 364 / 200;
  position: relative;
  overflow: hidden;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.5);
}

.case-label {
  color: white;
  font-size: 14px;
  font-family: 'Source Han Sans CN', sans-serif;
}

.national-badge {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 8px;
  background: linear-gradient(to left, #bc7120, #bc2220);
  color: white;
  font-size: 14px;
  font-family: 'Source Han Sans CN', sans-serif;
  border-radius: 0 4px 0 4px;
}

.card-content {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-title {
  font-size: 16px;
  color: #333;
  font-family: 'Source Han Sans CN', sans-serif;
  margin: 0;
  line-height: 1.4;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.teacher-name {
  font-size: 14px;
  color: #333;
  opacity: 0.5;
  font-family: 'Source Han Sans CN', sans-serif;
}

.view-count {
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0.5;
}

.view-count span {
  font-size: 12px;
  color: #333;
  font-family: 'Source Han Sans CN', sans-serif;
}

/* ===== Loading & Empty ===== */
.loading-container,
.empty-container {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading,
.empty {
  font-size: 16px;
  color: #999;
}

/* ===== Pagination ===== */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
}

.page-btn,
.page-number,
.page-ellipsis {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: #f4f4f5;
  border-radius: 3.429px;
  font-size: 13.714px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-number.active {
  background: #c30d23;
  color: white;
  font-weight: bold;
}

.page-ellipsis {
  cursor: default;
}
</style>

