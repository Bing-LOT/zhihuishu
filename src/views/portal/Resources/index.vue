<template>
  <div class="resources-page">
    <div class="resources-bg">
      <img src="/images/indexBg.png" alt="" />
    </div>

    <div class="resources-container">
      <!-- 页面标题 -->
      <div class="resources-page-header">
        <div class="page-title-wrapper">
          <div class="page-title-bg">
            <img src="/images/xiaohui1.png" alt="" />
          </div>
          <div class="page-title-decoration left">
            <svg xmlns="http://www.w3.org/2000/svg" width="122" height="37" viewBox="0 0 122 37" fill="none">
              <path d="M55.4995 25.1402C58.5629 25.1402 60.8086 22.6335 60.8086 19.5701C60.8086 16.5068 58.565 14 55.4995 14" stroke="#EFE0D3" stroke-linejoin="round"/>
              <path d="M54.8086 36.2809C51.7452 36.2809 49.4995 33.7741 49.4995 30.7108C49.4995 27.6474 51.7431 25.1406 54.8086 25.1406" stroke="#EFE0D3" stroke-linejoin="round"/>
              <path d="M121.283 36.2801L50.4349 36.2805C47.3715 36.2805 44.8647 33.7737 44.8647 30.7104C44.8647 27.647 47.3715 25.1402 50.4349 25.1402H58H51.8651H59.4303C62.4936 25.1402 65.0004 22.6335 65.0004 19.5701C65.0004 16.5068 62.4936 14 59.4303 14L0 14" stroke="#EFE0D3" stroke-linejoin="round"/>
              <path d="M102.5 36.8879H81.5V36.2697C81.5 30.6064 86.2102 25.999 92 25.999C97.7898 25.999 102.5 30.6064 102.5 36.2697V36.8879ZM82.7825 35.6537H101.215C100.89 30.9583 96.8809 27.2355 91.9977 27.2355C87.1145 27.2355 83.1054 30.9583 82.7802 35.6537" fill="#EFE0D3"/>
              <path d="M98.6109 36.8894H85.3887V36.2693C85.3887 32.7501 88.3548 29.8894 91.9986 29.8894C95.6424 29.8894 98.6085 32.7523 98.6085 36.2693V36.8894H98.6109ZM86.7111 35.6514H97.2884C96.9719 33.1076 94.7209 31.1296 92.001 31.1296C89.281 31.1296 87.03 33.1076 86.7111 35.6514Z" fill="#EFE0D3"/>
              <path d="M95.4854 36.7893H88.4854V36.4448C88.4854 34.4896 90.0557 32.9004 91.9847 32.9004C93.9138 32.9004 95.4841 34.4909 95.4841 36.4448V36.7893H95.4854ZM89.1855 36.1015H94.7852C94.6176 34.6883 93.426 33.5894 91.986 33.5894C90.546 33.5894 89.3543 34.6883 89.1855 36.1015Z" fill="#EFE0D3"/>
              <path d="M44.5 14H17.5V13.2051C17.5 5.92375 23.556 0 31 0C38.444 0 44.5 5.92375 44.5 13.2051V14ZM19.1489 12.4132H42.8481C42.4299 6.37627 37.2755 1.58972 30.997 1.58972C24.7186 1.58972 19.5641 6.37627 19.146 12.4132" fill="#EFE0D3"/>
              <path d="M39.5 14H22.5V13.2027C22.5 8.67799 26.3136 5 30.9985 5C35.6834 5 39.497 8.6809 39.497 13.2027V14H39.5ZM24.2003 12.4083H37.7997C37.3927 9.13771 34.4986 6.59456 31.0015 6.59456C27.5045 6.59456 24.6103 9.13771 24.2003 12.4083Z" fill="#EFE0D3"/>
              <path d="M35.4805 13.8691H26.4805V13.4262C26.4805 10.9125 28.4995 8.86914 30.9797 8.86914C33.4599 8.86914 35.4789 10.9141 35.4789 13.4262V13.8691H35.4805ZM27.3806 12.9849H34.5803C34.3648 11.1679 32.8327 9.75501 30.9813 9.75501C29.1299 9.75501 27.5977 11.1679 27.3806 12.9849Z" fill="#EFE0D3"/>
            </svg>
          </div>
          <div class="page-title-decoration right">
            <svg xmlns="http://www.w3.org/2000/svg" width="122" height="37" viewBox="0 0 122 37" fill="none">
              <path d="M65.7837 25.1402C62.7203 25.1402 60.4746 22.6335 60.4746 19.5701C60.4746 16.5068 62.7182 14 65.7837 14" stroke="#EFE0D3" stroke-linejoin="round"/>
              <path d="M66.4746 36.2809C69.538 36.2809 71.7837 33.7741 71.7837 30.7108C71.7837 27.6474 69.5401 25.1406 66.4746 25.1406" stroke="#EFE0D3" stroke-linejoin="round"/>
              <path d="M0 36.2801L70.8484 36.2805C73.9117 36.2805 76.4185 33.7737 76.4185 30.7104C76.4185 27.647 73.9117 25.1402 70.8484 25.1402H63.2832H69.4181H61.8529C58.7896 25.1402 56.2828 22.6335 56.2828 19.5701C56.2828 16.5068 58.7896 14 61.8529 14L121.283 14" stroke="#EFE0D3" stroke-linejoin="round"/>
              <path d="M18.7832 36.8879H39.7832V36.2697C39.7832 30.6064 35.073 25.999 29.2832 25.999C23.4934 25.999 18.7832 30.6064 18.7832 36.2697V36.8879ZM38.5007 35.6537H20.068C20.3933 30.9583 24.4023 27.2355 29.2855 27.2355C34.1687 27.2355 38.1778 30.9583 38.503 35.6537" fill="#EFE0D3"/>
              <path d="M22.6723 36.8894H35.8945V36.2693C35.8945 32.7501 32.9284 29.8894 29.2846 29.8894C25.6408 29.8894 22.6747 32.7523 22.6747 36.2693V36.8894H22.6723ZM34.5721 35.6514H23.9948C24.3113 33.1076 26.5623 31.1296 29.2822 31.1296C32.0022 31.1296 34.2532 33.1076 34.5721 35.6514Z" fill="#EFE0D3"/>
              <path d="M25.7979 36.7893H32.7979V36.4448C32.7979 34.4896 31.2275 32.9004 29.2985 32.9004C27.3694 32.9004 25.7991 34.4909 25.7991 36.4448V36.7893H25.7979ZM32.0977 36.1015H26.498C26.6656 34.6883 27.8573 33.5894 29.2972 33.5894C30.7372 33.5894 31.9289 34.6883 32.0977 36.1015Z" fill="#EFE0D3"/>
              <path d="M76.7832 14H103.783V13.2051C103.783 5.92375 97.7272 0 90.2832 0C82.8392 0 76.7832 5.92375 76.7832 13.2051V14ZM102.134 12.4132H78.4351C78.8533 6.37627 84.0077 1.58972 90.2862 1.58972C96.5646 1.58972 101.719 6.37627 102.137 12.4132" fill="#EFE0D3"/>
              <path d="M81.7832 14H98.7832V13.2027C98.7832 8.67799 94.9696 5 90.2847 5C85.5998 5 81.7862 8.6809 81.7862 13.2027V14H81.7832ZM97.0829 12.4083H83.4835C83.8905 9.13771 86.7846 6.59456 90.2817 6.59456C93.7787 6.59456 96.6729 9.13771 97.0829 12.4083Z" fill="#EFE0D3"/>
              <path d="M85.8027 13.8691H94.8027V13.4262C94.8027 10.9125 92.7837 8.86914 90.3035 8.86914C87.8233 8.86914 85.8043 10.9141 85.8043 13.4262V13.8691H85.8027ZM93.9026 12.9849H86.7029C86.9184 11.1679 88.4505 9.75501 90.3019 9.75501C92.1533 9.75501 93.6855 11.1679 93.9026 12.9849Z" fill="#EFE0D3"/>
            </svg>
          </div>
          
          <div class="page-title-content">
            <h1 class="page-title">思政资源总览库</h1>
            <div class="page-title-icon">
              <img src="/images/xiaohui2.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div class="resources-content">
        <!-- 左侧侧边栏 -->
        <div class="resources-sidebar">
          <div class="sidebar-header">
            <div class="sidebar-header-bg">
              <!-- <img src="/images/home/title-decoration.png" alt="" /> -->
            </div>
            <div class="sidebar-icon">
              <img src="/images/xiaohui2.png" alt="" />
              <!-- <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 0L12.2451 7.75491H20L13.8274 12.2451L16.1803 20L10 15.2451L3.81966 20L6.17257 12.2451L0 7.75491H7.75491L10 0Z" fill="#bc2220" fill-opacity="0.2"/>
              </svg> -->
            </div>
            <h2>思政资源</h2>
          </div>
          
          <div class="sidebar-menu">
            <div 
              class="menu-item" 
              :class="{ active: currentCategory === 'policy' }"
              @click="currentCategory = 'policy'"
            >
              政策文件库
            </div>
            <div 
              class="menu-item" 
              :class="{ active: currentCategory === 'material' }"
              @click="currentCategory = 'material'"
            >
              思政素材库
            </div>
          </div>
        </div>

        <!-- 右侧内容区 -->
        <div class="resources-main">
          <!-- 头部统计与搜索 -->
          <div class="main-header">
            <div class="header-info">
              <img src="/images/gailanmulu_icon.png" alt="" class="header-icon" />
              <h3>文件目录</h3>
              <span class="header-count">共计收录 <span class="highlight">{{ total }}个</span> 文件</span>
            </div>
            <div class="header-search">
              <div class="search-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M17.5 17.5L13.875 13.875" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="请输入" 
                v-model="searchQuery"
                @keyup.enter="handleSearch"
              />
              <button class="search-btn" @click="handleSearch">搜索</button>
            </div>
          </div>

          <!-- 资源列表 -->
          <div class="resource-list">
            <div v-if="loading" class="loading-state">
              <p>加载中...</p>
            </div>
            <div v-else-if="resourceList.length === 0" class="empty-state">
              <p>暂无数据</p>
            </div>
            <div 
              v-else
              v-for="item in resourceList" 
              :key="item.id"
              class="resource-item"
              @click="handleResourceClick(item)"
            >
              <div class="resource-title">
                <span class="bullet"></span>
                {{ item.title }}
              </div>
              <span class="resource-date">{{ formatDate(item.createTime) }}</span>
            </div>
          </div>

          <!-- 分页 -->
          <div class="pagination" v-if="total > 0">
            <span class="page-info">共 {{ total }} 条，每页 {{ pageSize }} 条</span>
            <button 
              class="page-btn" 
              :disabled="currentPage <= 1"
              @click="handlePrevPage"
            >
              上一页
            </button>
            <div class="page-numbers">
              <template v-for="(page, index) in pageNumbers" :key="index">
                <button 
                  v-if="typeof page === 'number'"
                  class="page-num"
                  :class="{ active: currentPage === page }"
                  @click="handlePageChange(page)"
                >
                  {{ page }}
                </button>
                <span v-else class="page-ellipsis">{{ page }}</span>
              </template>
            </div>
            <button 
              class="page-btn"
              :disabled="currentPage >= totalPages"
              @click="handleNextPage"
            >
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getPoliticalResourceList } from '@/api/resource'
import type { PoliticalResourceItem } from '@/types'

/**
 * 门户 - 大资源（思政资源）
 */
const router = useRouter()

// 当前分类：'policy'=政策文件(0), 'material'=思政素材(1)
const currentCategory = ref<'policy' | 'material'>('policy')
const searchQuery = ref('')
const loading = ref(false)

// 分页数据
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)
const totalPages = ref(0)

// 资源列表数据
const resourceList = ref<PoliticalResourceItem[]>([])

// 计算分类对应的数字值
const categoryValue = computed(() => {
  return currentCategory.value === 'policy' ? 0 : 1
})

// 获取资源列表
const fetchResourceList = async () => {
  try {
    loading.value = true
    const params = {
      pageIndex: currentPage.value,
      pageSize: pageSize.value,
      category: categoryValue.value,
      keyword: searchQuery.value || undefined
    }
    
    const response = await getPoliticalResourceList(params)
    resourceList.value = response.records || []
    total.value = response.total || 0
    totalPages.value = response.pages || 0
  } catch (error) {
    console.error('获取资源列表失败:', error)
    resourceList.value = []
    total.value = 0
    totalPages.value = 0
  } finally {
    loading.value = false
  }
}

// 监听分类变化，重置页码并刷新列表
watch(currentCategory, () => {
  currentPage.value = 1
  fetchResourceList()
})

// 搜索处理
const handleSearch = () => {
  currentPage.value = 1
  fetchResourceList()
}

// 分页处理
const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchResourceList()
}

const handlePrevPage = () => {
  if (currentPage.value > 1) {
    handlePageChange(currentPage.value - 1)
  }
}

const handleNextPage = () => {
  if (currentPage.value < totalPages.value) {
    handlePageChange(currentPage.value + 1)
  }
}

// 生成分页按钮
const pageNumbers = computed(() => {
  const pages: (number | string)[] = []
  const showPages = 7 // 显示的页码数量
  
  if (totalPages.value <= showPages) {
    // 总页数较少，显示所有页码
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    // 总页数较多，显示部分页码
    if (currentPage.value <= 4) {
      // 当前页靠前
      for (let i = 1; i <= 4; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(totalPages.value - 2)
      pages.push(totalPages.value - 1)
      pages.push(totalPages.value)
    } else if (currentPage.value >= totalPages.value - 3) {
      // 当前页靠后
      pages.push(1)
      pages.push(2)
      pages.push(3)
      pages.push('...')
      for (let i = totalPages.value - 3; i <= totalPages.value; i++) {
        pages.push(i)
      }
    } else {
      // 当前页在中间
      pages.push(1)
      pages.push(2)
      pages.push('...')
      pages.push(currentPage.value - 1)
      pages.push(currentPage.value)
      pages.push(currentPage.value + 1)
      pages.push('...')
      pages.push(totalPages.value - 1)
      pages.push(totalPages.value)
    }
  }
  
  return pages
})

// 资源点击处理
const handleResourceClick = (item: PoliticalResourceItem) => {
  router.push(`/resources/detail/${item.id}`)
}

// 格式化日期
const formatDate = (dateStr: string | undefined) => {
  if (!dateStr) return ''
  return dateStr.split(' ')[0] // 只取日期部分
}

// 初始化加载
fetchResourceList()
</script>

<style scoped>
.resources-page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-bottom: 80px;
}

.resources-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.resources-bg img {
  width: 100%;
  object-fit: cover;
  opacity: 0.1;
}

.resources-container {
  position: relative;
  max-width: 1920px;
  margin: 0 auto;
  padding: 80px 160px;
  z-index: 1;
}

/* 页面标题 */
.resources-page-header {
  display: flex;
  justify-content: center;
  margin-bottom: 72px;
}

.page-title-wrapper {
  position: relative;
  width: 306.566px;
  height: 78px;
}

.page-title-bg {
  position: absolute;
  top: 0;
  left: 42.08%;
  right: 42.26%;
  aspect-ratio: 1;
  opacity: 0.2;
}

.page-title-bg img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.page-title-decoration {
  position: absolute;
  bottom: 21.94%;
  top: 30.77%;
}

.page-title-decoration.left {
  left: -50px;
}

.page-title-decoration.right {
  right: -50px;
}

.page-title-content {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  top: 30.77%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.page-title {
  margin: 0;
  font-size: 24px;
  font-family: 'Source Han Serif CN', serif;
  font-weight: 700;
  color: #bc2220;
  line-height: normal;
  letter-spacing: 3.84px;
  white-space: nowrap;
}

.page-title-icon {
  width: 20px;
  height: 20px;
  margin-top: 4px;
}

.page-title-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 内容布局 */
.resources-content {
  display: flex;
  gap: 24px;
  align-items: stretch;
}

/* 左侧侧边栏 */
.resources-sidebar {
  width: 240px;
  flex-shrink: 0;
  background: #fff;
  background-image: url('/images/Frame_1000015326.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid #fdd4a6;
  border-radius: 16px;
  overflow: hidden;
  padding-bottom: 24px;
}

.sidebar-header {
  position: relative;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.sidebar-header-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
}

.sidebar-header-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sidebar-icon {
  width: 48px;
  height: 48px;
  opacity: 0.2;
  margin-bottom: -20px;
}

.sidebar-icon svg {
  width: 100%;
  height: 100%;
}

.sidebar-header h2 {
  font-family: 'Source Han Serif CN', serif;
  font-size: 24px;
  font-weight: 700;
  color: #bc2220;
  margin: 0;
  position: relative;
  z-index: 1;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 24px;
}

.menu-item {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #333;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background: #f5f5f5;
}

.menu-item.active {
  background: #bc2220;
  color: #fff;
}

/* 右侧内容区 */
.resources-main {
  flex: 1;
  background: #fff;
  background-image: url('/images/Frame_1000015327.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid #fdd4a6;
  border-radius: 16px;
  padding: 24px;
  min-height: 800px;
  display: flex;
  flex-direction: column;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

.header-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon {
  width: 38px;
  height: 35px;
}

.header-info h3 {
  font-size: 24px;
  color: #be2b28;
  font-weight: 700;
  margin: 0;
}

.header-count {
  font-size: 18px;
  color: #333;
}

.header-count .highlight {
  color: #bc2220;
}

.header-search {
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 100px;
  padding: 8px 16px;
  width: 320px;
}

.search-icon {
  opacity: 0.5;
  display: flex;
  align-items: center;
}

.header-search input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 0 8px;
  font-size: 16px;
  outline: none;
  color: #333;
}

.search-btn {
  border: none;
  background: transparent;
  color: #d50100;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
}

/* 资源列表 */
.resource-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 500px;
}

.loading-state,
.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 16px;
}

.resource-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px;
  transition: background 0.3s ease;
  cursor: pointer;
}

.resource-item:hover {
  background: #fff9ed;
  border-radius: 4px;
}

.resource-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #333;
}

.bullet {
  width: 6px;
  height: 6px;
  background: #bc2220;
  opacity: 0.5;
  transform: rotate(45deg);
}

.resource-date {
  font-size: 16px;
  color: #999;
  opacity: 0.5;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  margin-top: 48px;
}

.page-info {
  font-size: 14px;
  color: #999;
}

.page-btn {
  font-size: 14px;
  color: #999;
  background: transparent;
  border: none;
  cursor: pointer;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 8px;
}

.page-num {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: #fff;
  border-radius: 2px;
  color: #666;
  cursor: pointer;
  font-size: 14px;
}

.page-num.active {
  background: #9e2121;
  color: #fff;
}

.page-ellipsis {
  color: #999;
}
</style>
