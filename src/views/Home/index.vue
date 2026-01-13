<template>
  <div class="home-page">
    <!-- Header -->
    <AppHeader />

    <!-- Banner -->
    <AppBanner />

    <!-- Navigation -->
    <AppNavigation />

    <!-- Main Content -->
    <main class="main-content">
      <!-- 建党之路 Section -->
      <section class="party-journey-section">
        <div class="section-header">
          <div class="section-title-wrapper">
            <h2 class="section-title">
              <span class="title-highlight">"党建+课程思政"</span><span class="title-normal">工作概览</span>
            </h2>
            <div class="title-divider" />
          </div>
          <a href="/party-journey" class="more-link-bracket">
            【查看更多】
          </a>
        </div>
        
        <div class="party-journey-content">
          <!-- 左侧：图片轮播区 -->
          <div class="journey-carousel">
            <div class="carousel-wrapper">
              <transition name="fade">
                <img 
                  v-if="partyJourneyList.length > 0"
                  :key="currentJourneyIndex"
                  :src="partyJourneyList[currentJourneyIndex].videoUrl || '/images/home/video-1.jpg'" 
                  alt="党建+课程思政" 
                  class="carousel-img"
                >
                <img 
                  v-else
                  src="/images/home/video-1.jpg" 
                  alt="党建+课程思政" 
                  class="carousel-img"
                >
              </transition>
              
              <!-- 左右切换按钮 -->
              <div class="carousel-controls">
                <button 
                  class="carousel-btn carousel-btn-prev" 
                  @click="prevJourney"
                  :disabled="partyJourneyList.length <= 1"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M8.75 3.5L5.25 7L8.75 10.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <button 
                  class="carousel-btn carousel-btn-next" 
                  @click="nextJourney"
                  :disabled="partyJourneyList.length <= 1"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              
              <!-- 底部渐变区域 + 标题 + 指示器 -->
              <div class="carousel-bottom">
                <p v-if="partyJourneyList.length > 0" class="carousel-title">
                  {{ partyJourneyList[currentJourneyIndex].title }}
                </p>
                <p v-else class="carousel-title">
                  习近平总书记关切事·嘱托｜科研追光者的破壁之路
                </p>
                <div class="carousel-indicators">
                  <span 
                    v-for="(item, index) in Math.min(partyJourneyList.length, 3)" 
                    :key="index" 
                    class="carousel-dot"
                    :class="{ active: index === currentJourneyIndex }"
                    @click="currentJourneyIndex = index"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <!-- 右侧：列表 -->
          <div class="journey-list">
            <div 
              v-for="(item, index) in partyJourneyList.slice(0, 4)" 
              :key="item.id"
              class="journey-list-item"
              :class="{ 'is-top': index === 0 }"
              @click="viewJourneyDetail(item)"
            >
              <p class="journey-list-title">{{ item.title }}</p>
            </div>
            <div v-if="partyJourneyList.length === 0">
              <div class="journey-list-item is-top">
                <p class="journey-list-title">党建引领成渝地区双城经济圈职业院校"大思政课"建设高质量发展研讨会暨2025年共同体年会举办</p>
              </div>
              <div class="journey-list-item">
                <p class="journey-list-title">党建领航 融创赋能——福建信息职业技术学院物联网与人工智能学院探索"1354"党建工作机制纪实</p>
              </div>
              <div class="journey-list-item">
                <p class="journey-list-title">党建引领·体系赋能 河南经贸职业学院人工智能技术应用专业群打造人才培养新范式</p>
              </div>
              <div class="journey-list-item">
                <p class="journey-list-title">深耕区域发展 江西洪州职业学院以产教融合书写育人新篇</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 思政热点 Section -->
      <section class="hotspot-section">
        <div class="section-header">
          <div class="section-title-wrapper">
            <h2 class="section-title">
              <span class="title-highlight">思政</span><span class="title-normal">热点</span>
            </h2>
            <div class="title-divider" />
          </div>
          <a href="/hotspot" class="more-link-bracket">
            【查看更多】
          </a>
        </div>
        
        <div class="hotspot-content">
          <!-- 左列 -->
          <div class="hotspot-column">
            <a 
              v-for="(item, index) in leftColumnHotspots" 
              :key="item.id"
              :href="getHotspotLink(item)"
              class="hotspot-item"
              :class="{ 'is-first': index === 0 }"
            >
              <img 
                v-if="index === 0"
                src="/images/0a69d61733100a7d75e3b855e4423c16317cd7e8.svg" 
                alt="" 
                class="hotspot-icon"
              >
              <img 
                v-else
                src="/images/9f21d90a8d17396bf95f57db531344599e1c097e.svg" 
                alt="" 
                class="hotspot-icon"
              >
              <p class="hotspot-title">{{ item.title }}</p>
            </a>
          </div>
          
          <!-- 右列 -->
          <div class="hotspot-column">
            <a 
              v-for="item in rightColumnHotspots" 
              :key="item.id"
              :href="getHotspotLink(item)"
              class="hotspot-item"
            >
              <img 
                src="/images/9f21d90a8d17396bf95f57db531344599e1c097e.svg" 
                alt="" 
                class="hotspot-icon"
              >
              <p class="hotspot-title">{{ item.title }}</p>
            </a>
          </div>
        </div>
      </section>

      <!-- 教学有道 Section -->
      <section class="teaching-section">
        <div class="section-header">
          <div class="section-title-wrapper">
            <h2 class="section-title">
              <span class="title-highlight">教学</span><span class="title-normal">有道</span>
            </h2>
            <div class="title-divider" />
          </div>
          <a href="/teaching" class="more-link-bracket">
            【查看更多】
          </a>
        </div>
        
        <div class="teaching-content">
          <!-- 左侧侧边栏 -->
          <div class="teaching-sidebar">
            <div class="sidebar-header">教学案例</div>
            <div class="sidebar-item active">
              <span>全部</span>
              <svg width="6" height="12" viewBox="0 0 6 12" fill="none" class="sidebar-arrow">
                <path d="M1 1L5 6L1 11" stroke="#C30D23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="sidebar-item">电气工程与自动化学院</div>
            <div class="sidebar-item">机械工程及自动化学院</div>
            <div class="sidebar-item">数学与统计学院</div>
            <div class="sidebar-item">化工学院</div>
            <div class="sidebar-item">土木工程学院</div>
            <div class="sidebar-item">环境与安全工程学院</div>
            <div class="sidebar-item">经济与管理学院</div>
            <div class="sidebar-item more">更多</div>
          </div>
          
          <!-- 右侧内容区 -->
          <div class="teaching-main">
            <div class="teaching-grid">
              <div 
                v-for="item in teachingCaseList" 
                :key="item.id"
                class="teaching-card"
                @click="viewTeachingCase(item)"
              >
                <div class="teaching-card-image">
                  <img :src="item.coverUrl" :alt="item.title" class="card-img">
                  <div class="image-overlay">
                    <p class="case-name">案例名称：{{ item.caseName || item.title }}</p>
                  </div>
                </div>
                <div class="teaching-card-info">
                  <h3 class="teaching-card-title">{{ item.title }}</h3>
                  <div class="teaching-card-meta">
                    <span class="teacher-name">教师：{{ item.teacher }}</span>
                    <div class="view-count">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="#333" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="8" cy="8" r="2" stroke="#333" stroke-opacity="0.5" stroke-width="1.5"/>
                      </svg>
                      <span>{{ item.viewCount || 3456 }}人</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 分页指示器 -->
            <div class="teaching-pagination">
              <span 
                v-for="page in 3" 
                :key="page" 
                class="pagination-dot"
                :class="{ active: page === 1 }"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- 一院一品 Section -->
      <section class="college-special-section">
        <div class="section-header">
          <div class="section-title-wrapper">
            <h2 class="section-title">
              <span class="title-highlight">一院</span><span class="title-normal">一品</span>
            </h2>
            <div class="title-divider" />
          </div>
          <a href="/college" class="more-link-bracket">
            【查看更多】
          </a>
        </div>
        
        <div class="college-special-content">
          <div class="college-special-grid">
            <div 
              v-for="item in collegeSpecialList" 
              :key="item.id"
              class="college-special-card"
              @click="viewCollegeSpecial(item)"
            >
              <div class="college-special-image">
                <img :src="item.coverUrl" :alt="item.title" class="card-img">
                <div class="image-overlay">
                  <p class="college-name-label">{{ item.collegeName }}</p>
                </div>
              </div>
              <div class="college-special-info">
                <h3 class="college-special-title">{{ item.title }}</h3>
                <div class="college-special-meta">
                  <span class="teacher-name">教师：{{ item.teacher }}</span>
                  <div class="view-count">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="#333" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <circle cx="8" cy="8" r="2" stroke="#333" stroke-opacity="0.5" stroke-width="1.5"/>
                    </svg>
                    <span>{{ item.viewCount || 3456 }}人</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 分页指示器 -->
          <div class="college-special-pagination">
            <span 
              v-for="page in 3" 
              :key="page" 
              class="pagination-dot"
              :class="{ active: page === 1 }"
            />
          </div>
        </div>
      </section>

      <!-- 育人资源 Section -->
      <!-- <section class="resource-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="title-highlight">育人</span>资源
          </h2>
          <a href="/resource" class="more-link">
            <span>更多</span>
            <img src="/images/arrow-right.svg" alt="更多" class="arrow-icon">
          </a>
        </div>
        
        <div class="resource-grid">
          <div 
            v-for="item in resourceList" 
            :key="item.id"
            class="resource-card"
            @click="viewResourceDetail(item)"
          >
            <img :src="item.coverUrl" :alt="item.title" class="resource-img">
            <div class="resource-info">
              <h3 class="resource-title">{{ item.title }}</h3>
              <p class="resource-college">{{ item.college }}</p>
            </div>
          </div>
        </div>
      </section> -->

      <!-- 精彩课堂 Section -->
      <section class="wonderful-classroom-section">
        <div class="section-header">
          <div class="section-title-wrapper">
            <h2 class="section-title">
              <span class="title-highlight">精彩</span><span class="title-normal">课堂</span>
            </h2>
            <div class="title-divider" />
          </div>
          <a href="/classroom" class="more-link-bracket">
            【查看更多】
          </a>
        </div>
        
        <!-- 党员示范课 -->
        <div class="classroom-category">
          <div class="category-content">
            <div class="classroom-sidebar">
              <div class="sidebar-header">党员示范课</div>
              <div class="sidebar-item active">
                <span>全部</span>
                <svg width="6" height="12" viewBox="0 0 6 12" fill="none" class="sidebar-arrow">
                  <path d="M1 1L5 6L1 11" stroke="#C30D23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="sidebar-item">国家级示范</div>
              <div class="sidebar-item">省级示范</div>
              <div class="sidebar-item more">更多</div>
            </div>
            
            <div class="classroom-main">
              <div class="classroom-grid">
                <div 
                  v-for="item in partyDemoCourseList" 
                  :key="item.id"
                  class="classroom-card"
                  @click="viewCourse(item)"
                >
                  <div class="classroom-card-image">
                    <img :src="item.coverUrl" :alt="item.title" class="card-img">
                    <div class="image-overlay">
                      <p class="case-name">案例名称：{{ item.caseName || 'xxxx' }}</p>
                    </div>
                    <div v-if="item.levelTag" class="level-badge">{{ item.levelTag }}</div>
                  </div>
                  <div class="classroom-card-info">
                    <h3 class="classroom-card-title">{{ item.title }}</h3>
                    <div class="classroom-card-meta">
                      <span class="teacher-name">教师：{{ item.teacher }}</span>
                      <div class="view-count">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="#333" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <circle cx="8" cy="8" r="2" stroke="#333" stroke-opacity="0.5" stroke-width="1.5"/>
                        </svg>
                        <span>{{ item.viewCount || 3456 }}人</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="classroom-pagination">
                <span 
                  v-for="page in 3" 
                  :key="page" 
                  class="pagination-dot"
                  :class="{ active: page === 1 }"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 好课推荐 -->
        <div class="course-recommend">
          <div class="recommend-header">
            <h3 class="recommend-title">好课推荐</h3>
            <div class="recommend-divider">
              <div class="divider-line-red"></div>
              <div class="divider-line-gray"></div>
            </div>
          </div>
          <div class="recommend-banners">
            <div 
              v-for="banner in recommendBanners" 
              :key="banner.id"
              class="recommend-banner"
              @click="viewRecommendCourse(banner)"
            >
              <img :src="banner.imageUrl" :alt="banner.title" class="recommend-img">
              <div v-if="banner.tag" class="recommend-tag">{{ banner.tag }}</div>
            </div>
          </div>
        </div>

        <!-- 新华网展播课 -->
        <div class="classroom-category">
          <div class="category-content">
            <div class="classroom-sidebar">
              <div class="sidebar-header">新华网展播课</div>
              <div class="sidebar-item active">
                <span>全部</span>
                <svg width="6" height="12" viewBox="0 0 6 12" fill="none" class="sidebar-arrow">
                  <path d="M1 1L5 6L1 11" stroke="#C30D23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="sidebar-item">省级示范</div>
              <div class="sidebar-item">院级示范</div>
              <div class="sidebar-item more">更多</div>
            </div>
            
            <div class="classroom-main">
              <div class="classroom-grid">
                <div 
                  v-for="item in xinhuaCourseList" 
                  :key="item.id"
                  class="classroom-card"
                  @click="viewCourse(item)"
                >
                  <div class="classroom-card-image">
                    <img :src="item.coverUrl" :alt="item.title" class="card-img">
                    <div class="image-overlay">
                      <p class="case-name">案例名称：{{ item.caseName || 'xxxx' }}</p>
                    </div>
                    <div v-if="item.levelTag" class="level-badge">{{ item.levelTag }}</div>
                  </div>
                  <div class="classroom-card-info">
                    <h3 class="classroom-card-title">{{ item.title }}</h3>
                    <div class="classroom-card-meta">
                      <span class="teacher-name">教师：{{ item.teacher }}</span>
                      <div class="view-count">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="#333" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <circle cx="8" cy="8" r="2" stroke="#333" stroke-opacity="0.5" stroke-width="1.5"/>
                        </svg>
                        <span>{{ item.viewCount || 3456 }}人</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="classroom-pagination">
                <span 
                  v-for="page in 3" 
                  :key="page" 
                  class="pagination-dot"
                  :class="{ active: page === 1 }"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 督导点赞课 Section -->
      <section class="excellent-course-section">
        <div class="section-header">
          <div class="section-title-wrapper">
            <h2 class="section-title">
              <span class="title-highlight">督导</span><span class="title-normal">点赞课</span>
            </h2>
            <div class="title-divider" />
          </div>
          <a href="/excellent-course" class="more-link-bracket">
            【查看更多】
          </a>
        </div>
        
        <div class="excellent-course-content">
          <div class="excellent-course-rows">
            <div class="excellent-course-grid">
              <div 
                v-for="item in excellentCourseList" 
                :key="item.id"
                class="excellent-course-card"
                @click="playExcellentCourse(item)"
              >
                <div class="excellent-course-image">
                  <img 
                    :src="item.picUrls && item.picUrls.length > 0 ? item.picUrls[0] : '/images/placeholder.png'" 
                    :alt="item.title" 
                    class="course-img"
                  >
                  <div class="image-bottom-overlay">
                    <p class="course-period">{{ item.period || '督导课堂第24期' }}</p>
                  </div>
                  <div class="view-count-badge">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <circle cx="8" cy="8" r="2" stroke="white" stroke-width="1.5"/>
                    </svg>
                    <span>{{ item.viewCountText || '345.6w人次' }}</span>
                  </div>
                </div>
                <div class="excellent-course-info">
                  <h3 class="excellent-course-title">{{ item.title }}</h3>
                  <p class="course-teacher">授课教师：{{ item.teacher || '董海峰' }}</p>
                  <p class="course-time">授课时间：{{ item.courseTime || '2025年春季学期' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 智慧教学依托优质教育资源 Section -->
      <!-- <section class="smart-teaching-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="title-highlight">智慧教学</span>依托优质教育资源
          </h2>
        </div>
        
        <div class="smart-teaching-grid">
          <div 
            v-for="item in smartTeachingList" 
            :key="item.id"
            class="smart-teaching-card"
            @click="viewSmartTeachingDetail(item)"
          >
            <img :src="item.coverUrl" :alt="item.title" class="smart-teaching-img">
            <div class="smart-teaching-info">
              <h3 class="smart-teaching-title">{{ item.title }}</h3>
            </div>
          </div>
        </div>
      </section> -->

      <!-- 学院特色 Section -->
      <!-- <section class="college-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="title-highlight">学院</span>特色
          </h2>
          <a href="/college" class="more-link">
            <span>更多</span>
            <img src="/images/arrow-right.svg" alt="更多" class="arrow-icon">
          </a>
        </div>
        
        <div class="college-grid">
          <div 
            v-for="item in collegeList" 
            :key="item.id"
            class="college-card"
            @click="viewCollegeDetail(item)"
          >
            <img :src="item.coverUrl" :alt="item.name" class="college-img">
            <div class="college-info">
              <h3 class="college-name">{{ item.name }}</h3>
              <p class="college-college">{{ item.college }}</p>
              <div v-if="item.teachers && item.teachers.length" class="college-teachers">
                主讲: {{ item.teachers.map(t => t.name).join('、') }}
              </div>
            </div>
          </div>
        </div>
      </section> -->
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getPoliticalCourseList, getCourseExpoList, getNiceCourseTopList, getCollegeSpecialTopList } from '@/api/course'
import { getTopCollegeList } from '@/api/college'
import { getHotspotList } from '@/api/hotspot'
import AppHeader from '@/components/common/AppHeader/index.vue'
import AppBanner from '@/components/common/AppBanner/index.vue'
import AppNavigation from '@/components/common/AppNavigation/index.vue'
import AppFooter from '@/components/common/AppFooter/index.vue'

const router = useRouter()

// 建党之路
const partyJourneyList = ref<any[]>([])
const currentJourneyIndex = ref(0)

// 思政热点
const hotspotList = ref<any[]>([])

// 计算左右列数据
const leftColumnHotspots = computed(() => {
  return hotspotList.value.slice(0, 6)
})

const rightColumnHotspots = computed(() => {
  return hotspotList.value.slice(6, 12)
})

// 教学有道 (模拟数据)
const teachingCaseList = ref<any[]>([])

// 一院一品
const collegeSpecialList = ref<any[]>([])

// 育人资源 (模拟数据)
const resourceList = ref<any[]>([])

// 精彩课堂 - 党员示范课
const partyDemoCourseList = ref<any[]>([])
// 精彩课堂 - 好课推荐
const recommendBanners = ref<any[]>([])
// 精彩课堂 - 新华网展播课
const xinhuaCourseList = ref<any[]>([])

// 优秀思政课堂
const excellentCourseList = ref<any[]>([])

// 智慧教学 (模拟数据)
const smartTeachingList = ref<any[]>([])

// 学院特色
const collegeList = ref<any[]>([])

// Methods
const getHotspotLink = (item: any) => {
  if (item.contentType === 1) {
    return item.content
  }
  return `/hotspot/detail/${item.id}`
}

const viewCollegeSpecial = (item: any) => {
  console.log('查看一院一品:', item)
  router.push(`/college/detail/${item.id}`)
}

const getCourseLink = (item: any) => {
  return `/course/detail/${item.id}`
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

const playVideo = (item: any) => {
  console.log('播放视频:', item)
  // TODO: 实现视频播放
}

const prevJourney = () => {
  if (partyJourneyList.value.length <= 1) return
  currentJourneyIndex.value = (currentJourneyIndex.value - 1 + partyJourneyList.value.length) % partyJourneyList.value.length
}

const nextJourney = () => {
  if (partyJourneyList.value.length <= 1) return
  currentJourneyIndex.value = (currentJourneyIndex.value + 1) % partyJourneyList.value.length
}

const viewJourneyDetail = (item: any) => {
  console.log('查看建党之路详情:', item)
  // TODO: 跳转到详情页或播放视频
  if (item.videoUrl) {
    window.open(item.videoUrl, '_blank')
  }
}

const viewTeachingCase = (item: any) => {
  console.log('查看教学案例:', item)
  // TODO: 跳转到案例详情页
}

const viewResourceDetail = (resource: any) => {
  console.log('查看资源详情:', resource)
  // TODO: 跳转到资源详情页
}

const viewCourse = (course: any) => {
  console.log('查看课程:', course)
  if (course.videoUrl) {
    window.open(course.videoUrl, '_blank')
  }
}

const viewRecommendCourse = (course: any) => {
  console.log('查看推荐课程:', course)
  if (course.link) {
    window.open(course.link, '_blank')
  }
}

const playExcellentCourse = (course: any) => {
  console.log('播放优秀课程:', course)
  if (course.playUrl) {
    window.open(course.playUrl, '_blank')
  }
}

const viewSmartTeachingDetail = (item: any) => {
  console.log('查看智慧教学详情:', item)
  // TODO: 跳转到详情页
}

const viewCollegeDetail = (item: any) => {
  router.push(`/college/detail/${item.id}`)
}

// Data Loading
const loadPartyJourney = async () => {
  try {
    const data = await getPoliticalCourseList()
    partyJourneyList.value = data.sort((a, b) => a.sort - b.sort).slice(0, 5)
  } catch (error) {
    console.error('加载建党之路失败:', error)
  }
}

const loadHotspots = async () => {
  try {
    const response = await getHotspotList({
      pageIndex: 1,
      pageSize: 12,
      showFront: 1
    })
    hotspotList.value = response.records || []
  } catch (error) {
    console.error('加载思政热点失败:', error)
  }
}

const loadCollegeSpecials = async () => {
  try {
    const data = await getCollegeSpecialTopList()
    collegeSpecialList.value = data.slice(0, 8)
  } catch (error) {
    console.error('加载一院一品失败:', error)
  }
}

const loadExcellentCourses = async () => {
  try {
    const data = await getNiceCourseTopList()
    excellentCourseList.value = data.slice(0, 8).map((item, index) => ({
      ...item,
      period: item.period || `督导课堂第${24 + index}期`,
      viewCountText: item.viewCountText || '345.6w人次',
      teacher: item.teacher || '董海峰',
      courseTime: item.courseTime || '2025年春季学期'
    }))
  } catch (error) {
    console.error('加载督导点赞课失败:', error)
  }
}

const loadColleges = async () => {
  try {
    const data = await getTopCollegeList()
    collegeList.value = data.slice(0, 4)
  } catch (error) {
    console.error('加载学院特色失败:', error)
  }
}

// Lifecycle
onMounted(() => {
  loadPartyJourney()
  loadHotspots()
  loadCollegeSpecials()
  loadExcellentCourses()
  loadColleges()
  
  // Mock data for sections without APIs
  teachingCaseList.value = [
    { 
      id: 1, 
      title: '为党为国育人才  擘画东南强校梦', 
      caseName: 'xxxx',
      teacher: '薛美玉', 
      viewCount: 3456,
      coverUrl: '/images/placeholder.png' 
    },
    { 
      id: 2, 
      title: '为党为国育人才  擘画东南强校梦', 
      caseName: 'xxxx',
      teacher: '薛美玉', 
      viewCount: 3456,
      coverUrl: '/images/placeholder.png' 
    },
    { 
      id: 3, 
      title: '为党为国育人才  擘画东南强校梦', 
      caseName: 'xxxx',
      teacher: '薛美玉', 
      viewCount: 3456,
      coverUrl: '/images/placeholder.png' 
    },
    { 
      id: 4, 
      title: '为党为国育人才  擘画东南强校梦', 
      caseName: 'xxxx',
      teacher: '薛美玉', 
      viewCount: 3456,
      coverUrl: '/images/placeholder.png' 
    },
    { 
      id: 5, 
      title: '为党为国育人才  擘画东南强校梦', 
      caseName: 'xxxx',
      teacher: '薛美玉', 
      viewCount: 3456,
      coverUrl: '/images/placeholder.png' 
    },
    { 
      id: 6, 
      title: '为党为国育人才  擘画东南强校梦', 
      caseName: 'xxxx',
      teacher: '薛美玉', 
      viewCount: 3456,
      coverUrl: '/images/placeholder.png' 
    },
    { 
      id: 7, 
      title: '为党为国育人才  擘画东南强校梦', 
      caseName: 'xxxx',
      teacher: '薛美玉', 
      viewCount: 3456,
      coverUrl: '/images/placeholder.png' 
    },
    { 
      id: 8, 
      title: '为党为国育人才  擘画东南强校梦', 
      caseName: 'xxxx',
      teacher: '薛美玉', 
      viewCount: 3456,
      coverUrl: '/images/placeholder.png' 
    }
  ]
  
  resourceList.value = [
    { id: 1, title: '红色文化资源', college: '福州市', coverUrl: '/images/placeholder.png' },
    { id: 2, title: '革命历史遗址', college: '厦门市', coverUrl: '/images/placeholder.png' },
    { id: 3, title: '爱国主义教育基地', college: '泉州市', coverUrl: '/images/placeholder.png' },
    { id: 4, title: '党史学习资源', college: '漳州市', coverUrl: '/images/placeholder.png' }
  ]
  
  smartTeachingList.value = [
    { id: 1, title: '智慧课堂平台', coverUrl: '/images/Frame_1000015326.png' },
    { id: 2, title: 'AI教学助手', coverUrl: '/images/Frame_1000015327.png' },
    { id: 3, title: '虚拟仿真实验', coverUrl: '/images/Frame_1000015361.png' }
  ]
  
  // 精彩课堂 - 党员示范课
  partyDemoCourseList.value = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: '为党为国育人才  擘画东南强校梦',
    caseName: 'xxxx',
    teacher: '薛美玉',
    viewCount: 3456,
    levelTag: i === 0 || i === 1 ? '国家示范' : i === 2 ? '国家省级示范' : i === 3 || i === 4 ? '省级示范' : '院级示范',
    coverUrl: '/images/placeholder.png'
  }))
  
  // 精彩课堂 - 好课推荐
  recommendBanners.value = [
    { id: 1, title: '刑法学', imageUrl: '/images/placeholder.png', tag: '国家示范' },
    { id: 2, title: '产品创新设计与开发', imageUrl: '/images/placeholder.png', tag: '国家示范' }
  ]
  
  // 精彩课堂 - 新华网展播课
  xinhuaCourseList.value = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: '为党为国育人才  擘画东南强校梦',
    caseName: 'xxxx',
    teacher: '薛美玉',
    viewCount: 3456,
    levelTag: i === 0 || i === 1 ? '国家示范' : i === 2 || i === 3 ? '省级示范' : '院级示范',
    coverUrl: '/images/placeholder.png'
  }))
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 60px 360px;
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
}

section {
  margin-bottom: 80px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}

.section-title-wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.section-title {
  font-size: 30px;
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
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
  background: url('/images/0284b4e501c92c66c4350a706aae467b7ebb06a3.png') repeat-x;
  background-size: 5px 15px;
}

.more-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
}

.more-link:hover {
  color: #c30d23;
}

.more-link-bracket {
  color: #c30d23;
  text-decoration: none;
  font-size: 14px;
  white-space: nowrap;
  transition: opacity 0.3s;
}

.more-link-bracket:hover {
  opacity: 0.8;
}

.arrow-icon {
  width: 16px;
  height: 16px;
}

/* 建党之路 */
.party-journey-section .section-header {
  border-bottom: none;
}

.party-journey-content {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

/* 左侧轮播区 */
.journey-carousel {
  width: 579px;
  flex-shrink: 0;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  height: 324px;
  border-radius: 5px;
  overflow: hidden;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.carousel-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  pointer-events: none;
}

.carousel-btn {
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.15);
  border: none;
  border-radius: 5px 0 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  transition: background 0.3s;
}

.carousel-btn:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.3);
}

.carousel-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.carousel-btn-next {
  border-radius: 0 5px 5px 0;
}

.carousel-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 44px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-radius: 0 0 5px 5px;
}

.carousel-title {
  color: white;
  font-size: 16px;
  margin: 0;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.carousel-indicators {
  display: flex;
  gap: 5px;
  align-items: center;
}

.carousel-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: background 0.3s;
}

.carousel-dot.active {
  background: #c30d23;
}

/* 右侧列表 */
.journey-list {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.journey-list-item {
  padding: 24px 0;
  border-bottom: 1px solid #ebebeb;
  cursor: pointer;
  transition: background 0.3s;
}

.journey-list-item:hover {
  background: #f8f8f8;
  padding-left: 8px;
  padding-right: 8px;
}

.journey-list-title {
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  margin: 0;
}

.journey-list-item.is-top .journey-list-title {
  color: #c30d23;
}

/* 思政热点 */
.hotspot-section .section-header {
  border-bottom: none;
}

.hotspot-content {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.hotspot-column {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.hotspot-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 24px 0;
  border-bottom: 1px solid #ebebeb;
  text-decoration: none;
  transition: background 0.3s;
}

.hotspot-item:hover {
  background: #f8f8f8;
  padding-left: 8px;
  padding-right: 8px;
}

.hotspot-icon {
  width: 8px;
  height: 16px;
  flex-shrink: 0;
  margin-top: 2px;
}

.hotspot-title {
  flex: 1;
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  margin: 0;
  min-height: 48px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hotspot-item.is-first .hotspot-title {
  color: #c30d23;
}

/* 教学有道 */
.teaching-section .section-header {
  border-bottom: none;
}

.teaching-content {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.teaching-sidebar {
  width: 208px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  background: #c30d23;
  color: white;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px 5px 0 0;
  text-align: center;
}

.sidebar-item {
  background: #f9f9f9;
  color: #333;
  padding: 16px 24px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s;
  position: relative;
}

.sidebar-item:hover {
  background: #ececec;
}

.sidebar-item.active {
  background: #ececec;
  color: #c30d23;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.sidebar-arrow {
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
}

.sidebar-item.more {
  opacity: 0.5;
}

.teaching-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.teaching-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.teaching-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.teaching-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.teaching-card-image {
  position: relative;
  width: 100%;
  aspect-ratio: 364 / 200;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px 4px 0 0;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 6px 12px;
  display: flex;
  align-items: center;
}

.case-name {
  color: white;
  font-size: 14px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.teaching-card-info {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: white;
  border-radius: 0 0 8px 8px;
}

.teaching-card-title {
  font-size: 16px;
  color: #333;
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.teaching-card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}

.teacher-name {
  color: #333;
  opacity: 0.5;
  font-size: 14px;
}

.view-count {
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0.5;
}

.view-count span {
  color: #333;
  font-size: 12px;
}

.teaching-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 8px;
}

.pagination-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #dcdcdc;
  cursor: pointer;
  transition: background 0.3s;
}

.pagination-dot.active {
  background: #c30d23;
}

/* 一院一品 */
.college-special-section .section-header {
  border-bottom: none;
}

.college-special-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.college-special-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.college-special-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.college-special-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.college-special-image {
  position: relative;
  width: 100%;
  aspect-ratio: 364 / 200;
  overflow: hidden;
}

.college-name-label {
  color: white;
  font-size: 14px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.college-special-info {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: white;
  border-radius: 0 0 8px 8px;
  min-height: 105px;
}

.college-special-title {
  font-size: 16px;
  color: #333;
  margin: 0;
  line-height: 1.4;
  flex: 1;
}

.college-special-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}

.college-special-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

/* 育人资源 */
.resource-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.resource-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.resource-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.resource-img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.resource-info {
  padding: 16px;
}

.resource-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0 0 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.resource-college {
  font-size: 14px;
  color: #666;
  margin: 0;
}

/* 精彩课堂 */
.wonderful-classroom-section .section-header {
  border-bottom: none;
}

.classroom-category {
  margin-bottom: 40px;
}

.category-content {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.classroom-sidebar {
  width: 208px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.classroom-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.classroom-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.classroom-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.classroom-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.classroom-card-image {
  position: relative;
  width: 100%;
  aspect-ratio: 364 / 200;
  overflow: hidden;
}

.level-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(to left, #bc2220, #bc7120);
  color: white;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 0 4px 0 4px;
}

.classroom-card-info {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: white;
  border-radius: 0 0 8px 8px;
}

.classroom-card-title {
  font-size: 16px;
  color: #333;
  margin: 0;
  line-height: 1.4;
}

.classroom-card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}

.classroom-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

/* 好课推荐 */
.course-recommend {
  margin-bottom: 40px;
}

.recommend-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 12px;
}

.recommend-title {
  font-size: 20px;
  font-weight: bold;
  color: #c30d23;
  margin: 0;
  white-space: nowrap;
}

.recommend-divider {
  flex: 1;
  display: flex;
  align-items: center;
}

.divider-line-red {
  width: 86px;
  height: 2px;
  background: #c30d23;
}

.divider-line-gray {
  flex: 1;
  height: 2px;
  background: #e0e0e0;
}

.recommend-banners {
  display: flex;
  gap: 12px;
}

.recommend-banner {
  position: relative;
  flex: 1;
  height: 130px;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.recommend-banner:hover {
  transform: translateY(-2px);
}

.recommend-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recommend-tag {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #c30d23;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 3px;
}

/* 督导点赞课 */
.excellent-course-section .section-header {
  border-bottom: none;
}

.excellent-course-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.excellent-course-rows {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.excellent-course-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.excellent-course-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  height: 272px;
}

.excellent-course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.excellent-course-image {
  position: relative;
  width: 100%;
  height: 158.242px;
  overflow: hidden;
  border-radius: 4px 4px 0 0;
}

.course-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-bottom-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 6px 12px;
  display: flex;
  align-items: center;
}

.course-period {
  color: white;
  font-size: 14px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.view-count-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  padding: 2px 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.view-count-badge span {
  color: white;
  font-size: 12px;
  white-space: nowrap;
}

.excellent-course-info {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: white;
  flex: 1;
}

.excellent-course-title {
  font-size: 16px;
  color: #333;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.course-teacher,
.course-time {
  font-size: 14px;
  color: #333;
  opacity: 0.5;
  margin: 0;
  white-space: nowrap;
}

/* 智慧教学 */
.smart-teaching-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.smart-teaching-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.smart-teaching-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.smart-teaching-img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.smart-teaching-info {
  padding: 16px;
}

.smart-teaching-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

/* 学院特色 */
.college-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.college-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.college-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.college-img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.college-info {
  padding: 16px;
}

.college-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0 0 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.college-college {
  font-size: 14px;
  color: #666;
  margin: 0 0 8px 0;
}

.college-teachers {
  font-size: 14px;
  color: #999;
}

/* Responsive */
@media (max-width: 1600px) {
  .main-content {
    padding-left: 40px;
    padding-right: 40px;
  }
}

@media (max-width: 1200px) {
  .teaching-grid,
  .college-special-grid,
  .classroom-grid,
  .resource-grid,
  .college-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .excellent-course-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .smart-teaching-grid {
    grid-template-columns: repeat(2, 1fr);
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
  
  .party-journey-content {
    flex-direction: column;
  }
  
  .journey-carousel {
    width: 100%;
  }
  
  .hotspot-list {
    grid-template-columns: 1fr;
  }
  
  .teaching-content {
    flex-direction: column;
  }
  
  .teaching-sidebar {
    width: 100%;
  }
  
  .teaching-content {
    flex-direction: column;
  }
  
  .category-content {
    flex-direction: column;
  }
  
  .classroom-sidebar {
    width: 100%;
  }
  
  .teaching-grid,
  .college-special-grid,
  .classroom-grid,
  .resource-grid,
  .college-grid,
  .smart-teaching-grid,
  .excellent-course-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .excellent-course-card {
    height: auto;
  }
  
  .recommend-banners {
    flex-direction: column;
  }
  
  .banner-section {
    height: 300px;
  }
}
</style>

