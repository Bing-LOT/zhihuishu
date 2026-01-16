<template>
  <div class="college-page">
    <!-- Header -->
    <AppHeader />

    <!-- Banner 轮播 -->
    <div class="banner">
      <img src="/images/e1abaefd40f9ac8751d3843a47b777c872cdb435.png" alt="Banner" class="banner-img">
    </div>

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
          <span class="stats-text">
            参与学院 <span class="stats-count">27</span> 个
          </span>
        </div>
        <div class="search-box">
          <div class="search-input-wrapper">
            <input
              type="text"
              placeholder="请输入"
              class="search-input"
            />
          </div>
          <button class="search-btn">搜索</button>
        </div>
      </div>

      <!-- 学院案例卡片列表 -->
      <div class="college-grid">
        <div
          v-for="item in mockData"
          :key="item.id"
          class="college-card"
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
              <span class="publish-date">发布时间：{{ item.createTime }}</span>
              <div class="view-count">
                <span>👁 {{ item.statPv }}人</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <div class="pagination-wrapper">
        <div class="pagination">
          <button class="page-arrow prev">
            <svg width="7" height="11" viewBox="0 0 7 11" fill="currentColor">
              <path d="M6 1L1 5.5L6 10" stroke="currentColor" stroke-width="1.5" fill="none"/>
            </svg>
          </button>
          <button class="page-num active">1</button>
          <button class="page-num">2</button>
          <button class="page-num">3</button>
          <button class="page-num">4</button>
          <button class="page-num">5</button>
          <button class="page-dots">...</button>
          <button class="page-num">278</button>
          <button class="page-arrow next">
            <svg width="7" height="11" viewBox="0 0 7 11" fill="currentColor">
              <path d="M1 1L6 5.5L1 10" stroke="currentColor" stroke-width="1.5" fill="none"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <PageFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/common/AppHeader/index.vue'
import AppNavigation from '@/components/common/AppNavigation/index.vue'
import PageFooter from '@/components/common/PageFooter/index.vue'

console.log('一院一品测试页面已加载 - 静态版本')

// 模拟数据
const mockData = ref([
  {
    id: 1,
    name: '为党为国育人才 擘画东南强校梦',
    coverUrl: 'https://via.placeholder.com/364x200/c30d23/ffffff?text=学院案例1',
    college: '马克思主义学院',
    createTime: '2026-01-07',
    statPv: 3456
  },
  {
    id: 2,
    name: '立德树人守初心 培根铸魂担使命',
    coverUrl: 'https://via.placeholder.com/364x200/c30d23/ffffff?text=学院案例2',
    college: '经济与管理学院',
    createTime: '2026-01-06',
    statPv: 2890
  },
  {
    id: 3,
    name: '守正创新育英才 笃行致远谱新篇',
    coverUrl: 'https://via.placeholder.com/364x200/c30d23/ffffff?text=学院案例3',
    college: '计算机与大数据学院',
    createTime: '2026-01-05',
    statPv: 4123
  },
  {
    id: 4,
    name: '传承红色基因 培育时代新人',
    coverUrl: 'https://via.placeholder.com/364x200/c30d23/ffffff?text=学院案例4',
    college: '人文社会科学学院',
    createTime: '2026-01-04',
    statPv: 3678
  },
  {
    id: 5,
    name: '培根铸魂启智润心 立德树人守正创新',
    coverUrl: 'https://via.placeholder.com/364x200/c30d23/ffffff?text=学院案例5',
    college: '电气工程与自动化学院',
    createTime: '2026-01-03',
    statPv: 2987
  },
  {
    id: 6,
    name: '厚植家国情怀 培养时代新人',
    coverUrl: 'https://via.placeholder.com/364x200/c30d23/ffffff?text=学院案例6',
    college: '机械工程及自动化学院',
    createTime: '2026-01-02',
    statPv: 3234
  },
  {
    id: 7,
    name: '聚焦立德树人 赋能成长成才',
    coverUrl: 'https://via.placeholder.com/364x200/c30d23/ffffff?text=学院案例7',
    college: '土木工程学院',
    createTime: '2026-01-01',
    statPv: 2756
  },
  {
    id: 8,
    name: '守正创新担使命 立德树人育新人',
    coverUrl: 'https://via.placeholder.com/364x200/c30d23/ffffff?text=学院案例8',
    college: '化学学院',
    createTime: '2025-12-31',
    statPv: 3890
  }
])
</script>

<style scoped>
.college-page {
  min-height: 100vh;
  background: #fff;
}

/* Banner */
.banner {
  height: 500px;
  background: #f0f0f0;
  overflow: hidden;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  height: 2px;
  background: linear-gradient(to right, #c30d23, transparent);
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

.search-input {
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;
  width: 200px;
}

.search-input::placeholder {
  color: #999;
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
  color: #666;
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

.pagination {
  display: flex;
  align-items: center;
  gap: 11.43px;
}

.page-arrow,
.page-num,
.page-dots {
  min-width: 32px;
  height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f4f4f5;
  border: none;
  border-radius: 3.429px;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Arial', sans-serif;
  font-size: 13.714px;
  color: #333;
}

.page-arrow {
  color: #333;
}

.page-arrow:hover {
  background: #e5e5e5;
}

.page-num:hover {
  background: #e5e5e5;
}

.page-num.active {
  background: #c30d23;
  color: #fff;
  font-weight: bold;
}

.page-dots {
  cursor: default;
  pointer-events: none;
}

.page-arrow svg {
  width: 6.857px;
  height: 11.429px;
}

/* 响应式 */
@media (max-width: 1200px) {
  .college-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .college-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .toolbar {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .college-grid {
    grid-template-columns: 1fr;
  }
}
</style>
