<template>
  <div class="college-page">
    <!-- Header -->
    <AppHeader />

    <!-- Banner 轮播 -->
    <PageBanner />

    <!-- 导航栏 -->
    <AppNavigation />

    <!-- 主内容区 -->
    <div class="college-content">
      <!-- 一院一品标题区 -->
      <div class="section-title-wrapper">
        <div class="section-title">
          <span class="title-highlight">一院</span>
          <span class="title-normal">一品</span>
        </div>
        <div class="title-decoration"></div>
      </div>

      <!-- 统计信息和搜索栏 -->
      <div class="toolbar">
        <div class="stats">
          <svg class="stats-icon" width="38" height="35" viewBox="0 0 38 35" fill="none">
            <rect x="2" y="2" width="34" height="31" rx="2" stroke="#c30d23" stroke-width="2"/>
            <path d="M12 10h14v3H12v-3zm0 6h14v3H12v-3zm0 6h10v3H12v-3z" fill="#c30d23"/>
          </svg>
          <span class="stats-text">
            参与学院 <span class="stats-count">{{ total }}</span> 个
          </span>
        </div>
        <div class="search-box">
          <div class="search-input-wrapper">
            <el-icon class="search-icon"><Search /></el-icon>
            <input
              v-model="searchKeyword"
              type="text"
              placeholder="请输入"
              class="search-input"
              @keyup.enter="handleSearch"
            />
          </div>
          <button class="search-btn" @click="handleSearch">搜索</button>
        </div>
      </div>

      <!-- 学院案例卡片列表 -->
      <div v-if="loading" class="loading-wrapper">
        <el-icon class="is-loading"><Loading /></el-icon>
        <span>加载中...</span>
      </div>

      <div v-else-if="collegeList.length > 0" class="college-grid">
        <div
          v-for="item in collegeList"
          :key="item.id"
          class="college-card"
          @click="goToDetail(item.id)"
        >
          <div class="card-image">
            <img :src="item.coverUrl" :alt="item.name" />
            <div class="card-overlay">
              <span class="college-name">{{ item.college }}</span>
            </div>
          </div>
          <div class="card-content">
            <h3 class="card-title">{{ item.name }}</h3>
            <div class="card-footer">
              <span class="publish-date">发布时间:{{ formatDate(item.createTime) }}</span>
              <div class="view-count">
                <el-icon><View /></el-icon>
                <span>{{ item.statPv }}人</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EmptyState v-else message="暂无数据" />

      <!-- 分页 -->
      <div v-if="total > 0" class="pagination-wrapper">
        <el-pagination
          v-model:current-page="pagination.pageIndex"
          v-model:page-size="pagination.pageSize"
          :total="total"
          :page-sizes="[8, 16, 24, 32]"
          layout="prev, pager, next, jumper"
          background
          @current-change="handlePageChange"
        />
      </div>
    </div>

    <!-- 轻虚仿专题区域 -->
    <div class="virtual-section">
      <div class="virtual-bg"></div>
      <div class="virtual-title">
        <div class="virtual-logo">
          <svg class="logo-img" width="120" height="35" viewBox="0 0 120 35" fill="none">
            <circle cx="17.5" cy="17.5" r="15" fill="#4CAF50"/>
            <path d="M17.5 8v19M8 17.5h19" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <text x="40" y="23" font-family="Arial" font-size="18" font-weight="bold" fill="white">智慧树</text>
          </svg>
        </div>
        <h2 class="virtual-heading">智慧福州轻虚仿专题实验</h2>
      </div>

      <div class="virtual-content">
        <!-- 轻虚仿标题 -->
        <div class="section-title-wrapper">
          <div class="section-title">
            <span class="title-highlight">轻</span>
            <span class="title-normal">虚仿</span>
          </div>
          <div class="title-decoration"></div>
          <a href="https://www.zhihuishu.com/" target="_blank" class="view-more">【查看更多】</a>
        </div>

        <!-- 轻虚仿卡片列表 -->
        <div v-if="virtualList.length > 0" class="virtual-grid">
          <div v-for="item in virtualList" :key="item.id" class="virtual-card">
            <div class="card-image">
              <img :src="item.coverUrl" :alt="item.name" />
              <div class="card-overlay">
                <span class="college-name">{{ item.college }}</span>
              </div>
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ item.name }}</h3>
              <div class="card-footer">
                <span class="teacher-info">教师:{{ formatTeachers(item.teachers) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <PageFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Search, View, Loading } from '@element-plus/icons-vue'
import AppHeader from '@/components/common/AppHeader/index.vue'
import PageBanner from '@/components/common/PageBanner/index.vue'
import AppNavigation from '@/components/common/AppNavigation/index.vue'
import PageFooter from '@/components/common/PageFooter/index.vue'
import EmptyState from '@/components/common/EmptyState/index.vue'
import { getCollegePageList, type CollegeItem, type Teacher } from '@/api/college'

const router = useRouter()

// 列表数据
const collegeList = ref<CollegeItem[]>([])
const virtualList = ref<CollegeItem[]>([])
const loading = ref(false)
const total = ref(0)

// 调试日志
console.log('一院一品页面组件已加载')

// 搜索关键词
const searchKeyword = ref('')

// 分页参数
const pagination = ref({
  pageIndex: 1,
  pageSize: 16
})

// 格式化日期
const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 格式化教师列表
const formatTeachers = (teachers: Teacher[]) => {
  if (!teachers || teachers.length === 0) return ''
  return teachers.map(t => t.name).join('、')
}

// 加载一院一品列表
const loadCollegeList = async () => {
  loading.value = true
  try {
    const params = {
      pageIndex: pagination.value.pageIndex,
      pageSize: pagination.value.pageSize,
      showFront: 1,
      keyword: searchKeyword.value || undefined
    }
    const result = await getCollegePageList(params)
    collegeList.value = result.records
    total.value = result.total
  } catch (error) {
    console.error('加载一院一品列表失败:', error)
    ElMessage.error('加载失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 加载轻虚仿列表(固定8条)
const loadVirtualList = async () => {
  try {
    const params = {
      pageIndex: 1,
      pageSize: 8,
      showFront: 1
    }
    const result = await getCollegePageList(params)
    virtualList.value = result.records
  } catch (error) {
    console.error('加载轻虚仿列表失败:', error)
  }
}

// 搜索
const handleSearch = () => {
  pagination.value.pageIndex = 1
  loadCollegeList()
}

// 分页切换
const handlePageChange = (page: number) => {
  pagination.value.pageIndex = page
  loadCollegeList()
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 跳转详情
const goToDetail = (id: number) => {
  router.push(`/college/detail/${id}`)
}

onMounted(() => {
  loadCollegeList()
  loadVirtualList()
})
</script>

<style scoped>
.college-page {
  min-height: 100vh;
  background: #fff;
}

/* 主内容区 */
.college-content {
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 20px;
}

/* 标题区域 */
.section-title-wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  font-family: 'Source Han Sans CN', sans-serif;
  white-space: nowrap;
}

.title-highlight {
  color: #c30d23;
}

.title-normal {
  color: #333;
}

.title-decoration {
  flex: 1;
  height: 15px;
  background-image: url('/images/image.png');
  background-repeat: repeat-x;
  background-size: 5px 15px;
  background-position: left top;
}

/* 工具栏 */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
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
}

.stats-count {
  color: #bc2220;
  font-weight: bold;
}

/* 搜索框 */
.search-box {
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 100px;
  overflow: hidden;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  gap: 4px;
}

.search-icon {
  font-size: 16px;
  color: #333;
  opacity: 0.5;
}

.search-input {
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;
  width: 200px;
}

.search-input::placeholder {
  color: #333;
  opacity: 0.5;
}

.search-btn {
  padding: 8px 24px;
  background: none;
  border: none;
  color: #d50100;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.search-btn:hover {
  opacity: 0.8;
}

/* 加载状态 */
.loading-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  gap: 12px;
  color: #999;
}

/* 卡片网格 */
.college-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 48px;
}

/* 学院卡片 */
.college-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s;
}

.college-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-image {
  position: relative;
  width: 100%;
  aspect-ratio: 364 / 200;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.college-card:hover .card-image img {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 6px 12px;
}

.college-name {
  font-size: 14px;
  color: #fff;
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
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: #333;
  opacity: 0.5;
}

.view-count {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
}

/* 分页 */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
}

/* 自定义分页样式 - 根据Figma设计稿 */
.pagination-wrapper :deep(.el-pagination) {
  display: flex;
  gap: 8px;
  align-items: center;
}

.pagination-wrapper :deep(.el-pager) {
  display: flex;
  gap: 8px;
}

.pagination-wrapper :deep(.el-pager li),
.pagination-wrapper :deep(.btn-prev),
.pagination-wrapper :deep(.btn-next) {
  min-width: 32px;
  height: 32px;
  line-height: 32px;
  padding: 0;
  margin: 0;
  background-color: #f4f4f5;
  color: #333;
  border-radius: 4px;
  font-size: 14px;
  font-weight: normal;
  border: none;
}

.pagination-wrapper :deep(.el-pager li:hover),
.pagination-wrapper :deep(.btn-prev:hover),
.pagination-wrapper :deep(.btn-next:hover) {
  color: #333;
  background-color: #e5e5e5;
}

.pagination-wrapper :deep(.el-pager li.is-active) {
  background-color: #c30d23;
  color: #fff;
  font-weight: bold;
}

.pagination-wrapper :deep(.el-pager li.is-active:hover) {
  background-color: #c30d23;
  color: #fff;
}

.pagination-wrapper :deep(.btn-prev),
.pagination-wrapper :deep(.btn-next) {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-wrapper :deep(.el-icon) {
  font-size: 12px;
}

/* 隐藏跳转输入框 */
.pagination-wrapper :deep(.el-pagination__jump) {
  display: none;
}

/* 轻虚仿专题区域 */
.virtual-section {
  position: relative;
  padding: 60px 0;
  background: #222;
}

.virtual-bg {
  position: absolute;
  inset: 0;
  background-image: url('/images/Frame 427321180.png');
  background-size: cover;
  background-position: center;
  opacity: 0.3;
}

.virtual-title {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-bottom: 60px;
}

.virtual-logo {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 35px;
  object-fit: contain;
}

.virtual-heading {
  margin: 0;
  font-size: 64px;
  font-family: 'HYChaoCuSongJ', sans-serif;
  background: linear-gradient(to bottom, #fff 0%, #ffe87e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 16px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.virtual-content {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.view-more {
  font-size: 14px;
  color: #c30d23;
  text-decoration: none;
  white-space: nowrap;
  margin-left: auto;
}

.view-more:hover {
  text-decoration: underline;
}

/* 轻虚仿网格 */
.virtual-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.virtual-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s;
}

.virtual-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.teacher-info {
  font-size: 14px;
  color: #333;
  opacity: 0.5;
}

/* 响应式 */
@media (max-width: 1200px) {
  .college-grid,
  .virtual-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .college-grid,
  .virtual-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .toolbar {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .section-title {
    font-size: 24px;
  }

  .virtual-heading {
    font-size: 32px;
    letter-spacing: 8px;
  }
}

@media (max-width: 480px) {
  .college-grid,
  .virtual-grid {
    grid-template-columns: 1fr;
  }
}
</style>

