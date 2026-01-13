<template>
  <div class="classroom-page">
    <!-- Header -->
    <AppHeader />

    <!-- Banner -->
    <AppBanner />

    <!-- Navigation -->
    <AppNavigation />

    <!-- Main Content -->
    <main class="main-content">
      <!-- 督导点赞课 Section -->
      <section class="supervisor-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="title-highlight">督导</span>点赞课
          </h2>
          <div class="title-divider" />
          <button class="view-more-btn">【查看更多】</button>
        </div>

        <!-- Loading -->
        <div v-if="isLoadingSupervisor" class="loading">
          <div class="loading-spinner" />
          <p>加载中...</p>
        </div>

        <!-- Supervisor Course List -->
        <div v-else class="supervisor-grid">
          <a
            v-for="course in supervisorCourses"
            :key="course.id"
            :href="`/classroom/supervisor/${course.id}`"
            class="course-card"
          >
            <div class="course-cover">
              <img :src="course.coverUrl" :alt="course.title" class="cover-image">
              <div class="cover-overlay" />
              <div class="course-badge">
                <span class="badge-text">{{ course.period }}</span>
              </div>
              <div class="view-count">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3.33333C4.66667 3.33333 1.82 5.07333 0.666667 7.66667C1.82 10.26 4.66667 12 8 12C11.3333 12 14.18 10.26 15.3333 7.66667C14.18 5.07333 11.3333 3.33333 8 3.33333ZM8 10.6667C6.16 10.6667 4.66667 9.17333 4.66667 7.33333C4.66667 5.49333 6.16 4 8 4C9.84 4 11.3333 5.49333 11.3333 7.33333C11.3333 9.17333 9.84 10.6667 8 10.6667ZM8 5.33333C6.89333 5.33333 6 6.22667 6 7.33333C6 8.44 6.89333 9.33333 8 9.33333C9.10667 9.33333 10 8.44 10 7.33333C10 6.22667 9.10667 5.33333 8 5.33333Z" fill="white"/>
                </svg>
                <span>{{ formatViewCount(course.viewCount) }}人次</span>
              </div>
            </div>
            <div class="course-info">
              <h3 class="course-title">{{ course.title }}</h3>
              <p class="course-teacher">授课教师：{{ course.teacher }}</p>
              <p class="course-time">授课时间：{{ course.semester }}</p>
            </div>
          </a>
        </div>
      </section>

      <!-- 课程汇总 Section -->
      <section class="course-summary-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="title-highlight">课程</span>汇总
          </h2>
          <div class="title-divider" />
        </div>

        <div class="course-summary-content">
          <!-- Left Sidebar: Category Filter -->
          <div class="category-sidebar">
            <div class="category-header">学科门类</div>
            <div 
              v-for="(category, index) in categories" 
              :key="index"
              class="category-item"
              :class="{ active: selectedCategory === index }"
              @click="selectCategory(index)"
            >
              {{ category }}
            </div>
          </div>

          <!-- Right Content: Filter and Course List -->
          <div class="course-content">
            <!-- Filter Panel -->
            <div class="filter-panel">
              <!-- Selected Filters -->
              <div class="filter-row">
                <span class="filter-label">您已选择</span>
                <div class="filter-divider" />
                <div class="filter-tags">
                  <span class="filter-tag">全部</span>
                </div>
              </div>

              <!-- Teaching Type Filter -->
              <div class="filter-row">
                <span class="filter-label">教学类别</span>
                <div class="filter-divider" />
                <div class="filter-options">
                  <button 
                    class="filter-option"
                    :class="{ active: selectedTeachingType === '党员示范课' }"
                    @click="selectedTeachingType = '党员示范课'"
                  >
                    党员示范课
                  </button>
                  <button 
                    class="filter-option"
                    @click="selectedTeachingType = '新华网站展播课'"
                  >
                    新华网站展播课
                  </button>
                </div>
              </div>

              <!-- Demo Level Filter -->
              <div class="filter-row">
                <span class="filter-label">示范等级</span>
                <div class="filter-divider" />
                <div class="filter-options">
                  <button 
                    class="filter-option"
                    :class="{ active: selectedDemoLevel === '国家级示范' }"
                    @click="selectedDemoLevel = '国家级示范'"
                  >
                    国家级示范
                  </button>
                  <button 
                    class="filter-option"
                    @click="selectedDemoLevel = '省级示范'"
                  >
                    省级示范
                  </button>
                  <button 
                    class="filter-option"
                    @click="selectedDemoLevel = '院级示范'"
                  >
                    院级示范
                  </button>
                </div>
              </div>
            </div>

            <!-- Statistics and Search -->
            <div class="course-toolbar">
              <div class="course-stats">
                <svg width="38" height="35" viewBox="0 0 38 35" fill="none" class="stats-icon">
                  <rect width="38" height="35" rx="4" fill="#c30d23" opacity="0.1"/>
                  <path d="M19 12C16.79 12 15 13.79 15 16C15 18.21 16.79 20 19 20C21.21 20 23 18.21 23 16C23 13.79 21.21 12 19 12ZM19 18C17.9 18 17 17.1 17 16C17 14.9 17.9 14 19 14C20.1 14 21 14.9 21 16C21 17.1 20.1 18 19 18Z" fill="#c30d23"/>
                  <path d="M19 10C14.03 10 10 14.03 10 19C10 23.97 14.03 28 19 28C23.97 28 28 23.97 28 19C28 14.03 23.97 10 19 10ZM19 26C15.13 26 12 22.87 12 19C12 15.13 15.13 12 19 12C22.87 12 26 15.13 26 19C26 22.87 22.87 26 19 26Z" fill="#c30d23"/>
                </svg>
                <span>共计收录 <span class="stats-number">19467个</span> 视频</span>
              </div>
              <div class="search-box">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" fill="#333333"/>
                </svg>
                <input 
                  v-model="searchKeyword" 
                  type="text" 
                  placeholder="请输入"
                  class="search-input"
                  @keyup.enter="handleSearch"
                >
                <button class="search-btn" @click="handleSearch">搜索</button>
              </div>
            </div>

            <!-- Loading -->
            <div v-if="isLoadingCourses" class="loading">
              <div class="loading-spinner" />
            </div>

            <!-- Course Grid -->
            <div v-else class="courses-grid">
              <a
                v-for="course in courseList"
                :key="course.id"
                :href="`/classroom/course/${course.id}`"
                class="course-item"
              >
                <div class="item-cover">
                  <img :src="course.coverUrl" :alt="course.title" class="cover-img">
                  <div class="cover-title">{{ course.caseName }}</div>
                </div>
                <div class="item-info">
                  <h3 class="item-title">{{ course.title }}</h3>
                  <div class="item-meta">
                    <span class="meta-text">教师：{{ course.teacher }}</span>
                    <div class="meta-views">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3.33333C4.66667 3.33333 1.82 5.07333 0.666667 7.66667C1.82 10.26 4.66667 12 8 12C11.3333 12 14.18 10.26 15.3333 7.66667C14.18 5.07333 11.3333 3.33333 8 3.33333ZM8 10.6667C6.16 10.6667 4.66667 9.17333 4.66667 7.33333C4.66667 5.49333 6.16 4 8 4C9.84 4 11.3333 5.49333 11.3333 7.33333C11.3333 9.17333 9.84 10.6667 8 10.6667ZM8 5.33333C6.89333 5.33333 6 6.22667 6 7.33333C6 8.44 6.89333 9.33333 8 9.33333C9.10667 9.33333 10 8.44 10 7.33333C10 6.22667 9.10667 5.33333 8 5.33333Z" fill="#333333"/>
                      </svg>
                      <span>{{ course.viewCount }}人</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <!-- Pagination -->
            <div v-if="totalCourses > 0" class="pagination">
              <button 
                class="page-btn page-arrow"
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
                class="page-btn page-arrow"
                :disabled="currentPage === totalPages"
                @click="goToPage(currentPage + 1)"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AppHeader from '@/components/common/AppHeader/index.vue'
import AppBanner from '@/components/common/AppBanner/index.vue'
import AppNavigation from '@/components/common/AppNavigation/index.vue'
import AppFooter from '@/components/common/AppFooter/index.vue'

// 督导点赞课数据
interface SupervisorCourse {
  id: number
  title: string
  teacher: string
  semester: string
  period: string
  coverUrl: string
  viewCount: number
}

// 课程数据
interface Course {
  id: number
  title: string
  teacher: string
  caseName: string
  coverUrl: string
  viewCount: number
  category: string
  teachingType: string
  demoLevel: string
}

// 督导点赞课
const isLoadingSupervisor = ref(false)
const supervisorCourses = ref<SupervisorCourse[]>([])

// 课程汇总
const isLoadingCourses = ref(false)
const courseList = ref<Course[]>([])
const currentPage = ref(1)
const pageSize = ref(12)
const totalCourses = ref(0)

// 筛选条件
const selectedCategory = ref(0)
const selectedTeachingType = ref('党员示范课')
const selectedDemoLevel = ref('国家级示范')
const searchKeyword = ref('')

// 学科门类
const categories = [
  '全部',
  '电气工程与自动化学院',
  '机械工程及自动化学院',
  '数学与统计学院',
  '化工学院',
  '土木工程学院',
  '环境与安全工程学院',
  '经济与管理学院',
  '生物科学与工程学院',
  '外国语学院',
  '计算机与大数据学院',
  '化学学院',
  '建筑与城乡规划学院',
  '紫金地质与矿业学院',
  '厦门工艺美术学院',
  '材料科学与工程学院',
  '法学院',
  '海洋学院(先进制造学院)',
  '人文社会科学学院',
  '体育教学研究部',
  '军事教研室'
]

// Mock Data - 督导点赞课
const mockSupervisorCourses: SupervisorCourse[] = [
  {
    id: 1,
    title: '张志君：媒体融合背景下的思政工...',
    teacher: '董海峰',
    semester: '2025年春季学期',
    period: '督导课堂第24期',
    coverUrl: '/images/home/video-1.jpg',
    viewCount: 3456000
  },
  {
    id: 2,
    title: '张志君：媒体融合背景下的思政工...',
    teacher: '董海峰',
    semester: '2025年春季学期',
    period: '督导课堂第24期',
    coverUrl: '/images/home/video-2.jpg',
    viewCount: 3456000
  },
  {
    id: 3,
    title: '张志君：媒体融合背景下的思政工...',
    teacher: '董海峰',
    semester: '2025年春季学期',
    period: '督导课堂第24期',
    coverUrl: '/images/home/video-3.jpg',
    viewCount: 3456000
  },
  {
    id: 4,
    title: '张志君：媒体融合背景下的思政工...',
    teacher: '董海峰',
    semester: '2025年春季学期',
    period: '督导课堂第24期',
    coverUrl: '/images/home/video-4.jpg',
    viewCount: 3456000
  },
  {
    id: 5,
    title: '张志君：媒体融合背景下的思政工...',
    teacher: '董海峰',
    semester: '2025年春季学期',
    period: '督导课堂第24期',
    coverUrl: '/images/home/video-1.jpg',
    viewCount: 3456000
  },
  {
    id: 6,
    title: '张志君：媒体融合背景下的思政工...',
    teacher: '董海峰',
    semester: '2025年春季学期',
    period: '督导课堂第24期',
    coverUrl: '/images/home/video-2.jpg',
    viewCount: 3456000
  },
  {
    id: 7,
    title: '张志君：媒体融合背景下的思政工...',
    teacher: '董海峰',
    semester: '2025年春季学期',
    period: '督导课堂第24期',
    coverUrl: '/images/home/video-3.jpg',
    viewCount: 3456000
  },
  {
    id: 8,
    title: '张志君：媒体融合背景下的思政工...',
    teacher: '董海峰',
    semester: '2025年春季学期',
    period: '督导课堂第24期',
    coverUrl: '/images/home/video-4.jpg',
    viewCount: 3456000
  },
  {
    id: 9,
    title: '张志君：媒体融合背景下的思政工...',
    teacher: '董海峰',
    semester: '2025年春季学期',
    period: '督导课堂第24期',
    coverUrl: '/images/home/video-1.jpg',
    viewCount: 3456000
  },
  {
    id: 10,
    title: '张志君：媒体融合背景下的思政工...',
    teacher: '董海峰',
    semester: '2025年春季学期',
    period: '督导课堂第24期',
    coverUrl: '/images/home/video-2.jpg',
    viewCount: 3456000
  },
  {
    id: 11,
    title: '张志君：媒体融合背景下的思政工...',
    teacher: '董海峰',
    semester: '2025年春季学期',
    period: '督导课堂第24期',
    coverUrl: '/images/home/video-3.jpg',
    viewCount: 3456000
  },
  {
    id: 12,
    title: '张志君：媒体融合背景下的思政工...',
    teacher: '董海峰',
    semester: '2025年春季学期',
    period: '督导课堂第24期',
    coverUrl: '/images/home/video-4.jpg',
    viewCount: 3456000
  }
]

// Mock Data - 课程列表
const mockCourses: Course[] = [
  {
    id: 1,
    title: '为党为国育人才  擘画东南强校梦',
    teacher: '薛美玉',
    caseName: '案例名称：xxxx',
    coverUrl: '/images/home/video-1.jpg',
    viewCount: 3456,
    category: '全部',
    teachingType: '党员示范课',
    demoLevel: '国家级示范'
  },
  {
    id: 2,
    title: '为党为国育人才  擘画东南强校梦',
    teacher: '薛美玉',
    caseName: '案例名称：xxxx',
    coverUrl: '/images/home/video-2.jpg',
    viewCount: 3456,
    category: '全部',
    teachingType: '党员示范课',
    demoLevel: '国家级示范'
  },
  {
    id: 3,
    title: '为党为国育人才  擘画东南强校梦',
    teacher: '薛美玉',
    caseName: '案例名称：xxxx',
    coverUrl: '/images/home/video-3.jpg',
    viewCount: 3456,
    category: '全部',
    teachingType: '党员示范课',
    demoLevel: '国家级示范'
  },
  {
    id: 4,
    title: '为党为国育人才  擘画东南强校梦',
    teacher: '薛美玉',
    caseName: '案例名称：xxxx',
    coverUrl: '/images/home/video-4.jpg',
    viewCount: 3456,
    category: '全部',
    teachingType: '党员示范课',
    demoLevel: '国家级示范'
  },
  {
    id: 5,
    title: '为党为国育人才  擘画东南强校梦',
    teacher: '薛美玉',
    caseName: '案例名称：xxxx',
    coverUrl: '/images/home/video-1.jpg',
    viewCount: 3456,
    category: '全部',
    teachingType: '党员示范课',
    demoLevel: '国家级示范'
  },
  {
    id: 6,
    title: '为党为国育人才  擘画东南强校梦',
    teacher: '薛美玉',
    caseName: '案例名称：xxxx',
    coverUrl: '/images/home/video-2.jpg',
    viewCount: 3456,
    category: '全部',
    teachingType: '党员示范课',
    demoLevel: '国家级示范'
  },
  {
    id: 7,
    title: '为党为国育人才  擘画东南强校梦',
    teacher: '薛美玉',
    caseName: '案例名称：xxxx',
    coverUrl: '/images/home/video-3.jpg',
    viewCount: 3456,
    category: '全部',
    teachingType: '党员示范课',
    demoLevel: '国家级示范'
  },
  {
    id: 8,
    title: '为党为国育人才  擘画东南强校梦',
    teacher: '薛美玉',
    caseName: '案例名称：xxxx',
    coverUrl: '/images/home/video-4.jpg',
    viewCount: 3456,
    category: '全部',
    teachingType: '党员示范课',
    demoLevel: '国家级示范'
  },
  {
    id: 9,
    title: '为党为国育人才  擘画东南强校梦',
    teacher: '薛美玉',
    caseName: '案例名称：xxxx',
    coverUrl: '/images/home/video-1.jpg',
    viewCount: 3456,
    category: '全部',
    teachingType: '党员示范课',
    demoLevel: '国家级示范'
  },
  {
    id: 10,
    title: '为党为国育人才  擘画东南强校梦',
    teacher: '薛美玉',
    caseName: '案例名称：xxxx',
    coverUrl: '/images/home/video-2.jpg',
    viewCount: 3456,
    category: '全部',
    teachingType: '党员示范课',
    demoLevel: '国家级示范'
  },
  {
    id: 11,
    title: '为党为国育人才  擘画东南强校梦',
    teacher: '薛美玉',
    caseName: '案例名称：xxxx',
    coverUrl: '/images/home/video-3.jpg',
    viewCount: 3456,
    category: '全部',
    teachingType: '党员示范课',
    demoLevel: '国家级示范'
  },
  {
    id: 12,
    title: '为党为国育人才  擘画东南强校梦',
    teacher: '薛美玉',
    caseName: '案例名称：xxxx',
    coverUrl: '/images/home/video-4.jpg',
    viewCount: 3456,
    category: '全部',
    teachingType: '党员示范课',
    demoLevel: '国家级示范'
  }
]

// Computed
const totalPages = computed(() => Math.ceil(totalCourses.value / pageSize.value))

const displayPages = computed(() => {
  const pages: (number | string)[] = []
  const maxDisplay = 5
  
  if (totalPages.value <= maxDisplay + 2) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)
    
    if (currentPage.value > 3) {
      pages.push('...')
    }
    
    const start = Math.max(2, currentPage.value - 1)
    const end = Math.min(totalPages.value - 1, currentPage.value + 1)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    if (currentPage.value < totalPages.value - 2) {
      pages.push('...')
    }
    
    if (totalPages.value > 1) {
      pages.push(totalPages.value)
    }
  }
  
  return pages
})

// Methods
const formatViewCount = (count: number): string => {
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + 'w'
  }
  return count.toString()
}

const loadSupervisorCourses = async () => {
  try {
    isLoadingSupervisor.value = true
    await new Promise(resolve => setTimeout(resolve, 300))
    supervisorCourses.value = mockSupervisorCourses
  } catch (error) {
    console.error('加载督导点赞课失败:', error)
    supervisorCourses.value = []
  } finally {
    isLoadingSupervisor.value = false
  }
}

const loadCourseList = async () => {
  try {
    isLoadingCourses.value = true
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Simulate pagination
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    courseList.value = mockCourses.slice(0, pageSize.value)
    totalCourses.value = 278 * pageSize.value // Simulate total of 278 pages
  } catch (error) {
    console.error('加载课程列表失败:', error)
    courseList.value = []
    totalCourses.value = 0
  } finally {
    isLoadingCourses.value = false
  }
}

const selectCategory = (index: number) => {
  selectedCategory.value = index
  currentPage.value = 1
  loadCourseList()
}

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  loadCourseList()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSearch = () => {
  currentPage.value = 1
  loadCourseList()
}

// Lifecycle
onMounted(() => {
  loadSupervisorCourses()
  loadCourseList()
})
</script>

<style scoped>
.classroom-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
}

/* Main Content */
.main-content {
  flex: 1;
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
  padding: 60px 360px;
  display: flex;
  flex-direction: column;
  gap: 60px;
}

/* Section Common Styles */
.section-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
}

.section-title {
  font-size: 30px;
  font-weight: bold;
  margin: 0;
  white-space: nowrap;
  font-family: 'Source Han Sans CN', sans-serif;
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

.view-more-btn {
  background: none;
  border: none;
  color: #c30d23;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  font-family: 'Source Han Sans CN', sans-serif;
}

/* 督导点赞课 Section */
.supervisor-section {
  width: 100%;
}

.supervisor-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px 16px;
  row-gap: 24px;
}

.course-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  transition: transform 0.3s, box-shadow 0.3s;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.course-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 364 / 200;
  overflow: hidden;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 50%);
}

.course-badge {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 6px 12px;
  display: flex;
  align-items: center;
}

.badge-text {
  color: white;
  font-size: 14px;
  font-family: 'Source Han Sans CN', sans-serif;
}

.view-count {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.5);
  padding: 2px 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  color: white;
  font-size: 12px;
  font-family: 'Source Han Sans CN', sans-serif;
}

.course-info {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: white;
}

.course-title {
  margin: 0;
  font-size: 16px;
  color: #333;
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: 'Source Han Sans CN', sans-serif;
}

.course-teacher,
.course-time {
  margin: 0;
  font-size: 14px;
  color: #333;
  opacity: 0.5;
  font-family: 'Source Han Sans CN', sans-serif;
}

/* 课程汇总 Section */
.course-summary-section {
  width: 100%;
}

.course-summary-content {
  display: flex;
  gap: 20px;
}

/* Category Sidebar */
.category-sidebar {
  width: 208px;
  flex-shrink: 0;
  background: white;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
}

.category-header {
  background: #c30d23;
  color: white;
  padding: 24px 25px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  font-family: 'Microsoft YaHei', sans-serif;
}

.category-item {
  background: #f9f9f9;
  padding: 16px 24px;
  font-size: 16px;
  color: #333;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  border-bottom: 1px solid #ebebeb;
  font-family: 'Source Han Sans CN', sans-serif;
  position: relative;
}

.category-item:hover {
  background: #ececec;
}

.category-item.active {
  background: #ececec;
  color: #c30d23;
}

.category-item.active::after {
  content: '';
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 6px solid #ececec;
}

/* Course Content */
.course-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

/* Filter Panel */
.filter-panel {
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
  background: white;
  border-bottom: 1px solid #ebebeb;
}

.filter-row:first-child {
  background: #f9f9f9;
}

.filter-label {
  font-size: 16px;
  color: #333;
  white-space: nowrap;
  font-family: 'Source Han Sans CN', sans-serif;
}

.filter-divider {
  width: 1px;
  height: 24px;
  background: #e0e0e0;
}

.filter-tags {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-tag {
  border: 1px solid #c30d23;
  border-radius: 100px;
  padding: 4px 24px;
  font-size: 16px;
  color: #c30d23;
  font-family: 'Source Han Sans CN', sans-serif;
}

.filter-options {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-option {
  background: none;
  border: none;
  border-radius: 100px;
  padding: 4px 24px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Source Han Sans CN', sans-serif;
}

.filter-option:hover {
  background: #f0f0f0;
}

.filter-option.active {
  border: 1px solid #c30d23;
  color: #c30d23;
}

/* Course Toolbar */
.course-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.course-stats {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  color: #333;
  font-family: 'Source Han Sans CN', sans-serif;
}

.stats-icon {
  width: 38px;
  height: 35px;
}

.stats-number {
  color: #bc2220;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 4px;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 100px;
  padding: 8px 16px;
  min-width: 320px;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;
  font-family: 'Source Han Sans CN', sans-serif;
}

.search-input::placeholder {
  color: #999;
  opacity: 0.5;
}

.search-btn {
  background: none;
  border: none;
  color: #d50100;
  font-size: 16px;
  cursor: pointer;
  font-family: 'Source Han Sans CN', sans-serif;
}

/* Course Grid */
.courses-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.course-item {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  transition: transform 0.3s, box-shadow 0.3s;
}

.course-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.item-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 364 / 200;
  overflow: hidden;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 6px 12px;
  color: white;
  font-size: 14px;
  font-family: 'Source Han Sans CN', sans-serif;
}

.item-info {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: white;
}

.item-title {
  margin: 0;
  font-size: 16px;
  color: #333;
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: 'Source Han Sans CN', sans-serif;
}

.item-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.meta-text {
  font-size: 14px;
  color: #333;
  opacity: 0.5;
  font-family: 'Source Han Sans CN', sans-serif;
}

.meta-views {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #333;
  opacity: 0.5;
  font-family: 'Source Han Sans CN', sans-serif;
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
  font-family: 'Arial', sans-serif;
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

.page-arrow {
  font-size: 20px;
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
  .supervisor-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .courses-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .course-summary-content {
    flex-direction: column;
  }
  
  .category-sidebar {
    width: 100%;
  }
  
  .category-item.active::after {
    display: none;
  }
}

@media (max-width: 768px) {
  .supervisor-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .courses-grid {
    grid-template-columns: 1fr;
  }
  
  .course-toolbar {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .search-box {
    width: 100%;
  }
}
</style>
