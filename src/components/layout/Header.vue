<template>
  <header class="header">
    <div class="header__container">
      <!-- Logo 和平台名称 -->
      <div class="header__brand">
        <div class="header__logo">
          <img src="/images/fuzhoudaxue.png" alt="福州大学" />
        </div>
        <h1 class="header__title">福州大学新时代思政教育平台</h1>
      </div>

      <!-- 导航菜单 -->
      <nav class="header__nav">
        <router-link 
          v-for="item in navItems" 
          :key="item.path"
          :to="item.path"
          class="header__nav-item"
          active-class="header__nav-item--active"
        >
          {{ item.label }}
        </router-link>
      </nav>

      <!-- 右侧功能区 -->
      <div class="header__actions">
        <router-link to="/admin" class="header__btn">
          后台管理系统
        </router-link>
        <router-link to="/admin/analysis" class="header__btn">
          教学数据看板
        </router-link>
        <button class="header__search" @click="handleSearch">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle 
              cx="9.16667" 
              cy="9.16667" 
              r="6.66667" 
              stroke="white" 
              stroke-width="1.5" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            />
            <path 
              d="M17.5 17.5L13.875 13.875" 
              stroke="white" 
              stroke-width="1.5" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            />
          </svg>
          <span>搜索</span>
        </button>
        <div class="header__divider"></div>
        <router-link to="/auth/login" class="header__login">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path 
              d="M10 10C12.0711 10 13.75 8.32107 13.75 6.25C13.75 4.17893 12.0711 2.5 10 2.5C7.92893 2.5 6.25 4.17893 6.25 6.25C6.25 8.32107 7.92893 10 10 10Z" 
              stroke="white" 
              stroke-width="1.5" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            />
            <path 
              d="M17.5 17.5C17.5 14.2663 14.1421 11.6667 10 11.6667C5.85786 11.6667 2.5 14.2663 2.5 17.5" 
              stroke="white" 
              stroke-width="1.5" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            />
          </svg>
          <span>登录</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
/**
 * Header 导航组件
 */

// 导航菜单项
const navItems = [
  { path: '/', label: '首页' },
  { path: '/overview', label: '思政概览' },
  { path: '/topics', label: '习思想的伟大实践' },
  { path: '/resources', label: '思政资源' },
  { path: '/study', label: '特色专题' },
]

// 搜索功能
const handleSearch = () => {
  // TODO: 实现搜索功能
  console.log('搜索功能')
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #bc2220;
  width: 100%;
}

.header__container {
  max-width: 1920px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 24px;
}

/* ===== Logo 和品牌 ===== */
.header__brand {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.header__logo {
  width: 144px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header__logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.header__title {
  margin: 0;
  font-size: 18px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: 700;
  color: #ffffff;
  white-space: nowrap;
  line-height: normal;
}

/* ===== 导航菜单 ===== */
.header__nav {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  gap: 24px;
  min-width: 0;
}

.header__nav-item {
  font-size: 18px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: 400;
  color: #ffffff;
  text-decoration: none;
  white-space: nowrap;
  opacity: 0.5;
  transition: opacity 0.3s ease;
  text-align: center;
  line-height: normal;
}

.header__nav-item:hover,
.header__nav-item--active {
  opacity: 1;
}

/* ===== 右侧功能区 ===== */
.header__actions {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;
}

.header__btn {
  padding: 8px 24px;
  border: 1px solid #ffffff;
  border-radius: 100px;
  background: transparent;
  color: #ffffff;
  font-size: 18px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: 400;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.header__search {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 42px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #ffffff;
  font-size: 18px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: 400;
  transition: opacity 0.3s ease;
}

.header__search:hover {
  opacity: 0.8;
}

.header__divider {
  width: 0;
  height: 24px;
  border-left: 1px solid #ffffff;
}

.header__login {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #ffffff;
  font-size: 18px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: 400;
  text-decoration: none;
  transition: opacity 0.3s ease;
  white-space: nowrap;
  height: 27px;
}

.header__login:hover {
  opacity: 0.8;
}
</style>

