<template>
  <div class="admin-layout">
    <!-- 顶部导航栏 -->
    <header class="admin-header">
      <div class="admin-header__left">
        <div class="admin-logo">
          <img src="/images/fuzhoudaxue.png" alt="Logo" />
          <span>"大思政课"数智化</span>
        </div>
      </div>
      <div class="admin-header__right">
        <a href="/" class="admin-header__link" target="_blank">前台首页</a>
        <div class="admin-header__user">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="white"/>
            <path d="M8 9C4.68629 9 2 10.7909 2 13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13C14 10.7909 11.3137 9 8 9Z" fill="white"/>
          </svg>
          <span>账号 | {{ username }}</span>
        </div>
      </div>
    </header>

    <!-- 主导航栏 -->
    <nav class="admin-nav">
      <div
        v-for="tab in mainTabs"
        :key="tab.key"
        :class="['admin-nav__tab', { 'admin-nav__tab--active': currentTab === tab.key }]"
        @click="switchTab(tab.key)"
      >
        {{ tab.label }}
      </div>
    </nav>

    <!-- 内容区域 -->
    <div class="admin-content">
      <!-- 左侧菜单 -->
      <aside class="admin-sidebar">
        <div
          v-for="menu in sideMenus"
          :key="menu.key"
          class="admin-menu-item"
        >
          <div
            :class="['admin-menu-item__title', { 'admin-menu-item__title--active': currentMenu === menu.key }]"
            @click="toggleMenu(menu)"
          >
            <span>{{ menu.label }}</span>
            <svg
              v-if="menu.children"
              :class="['admin-menu-item__arrow', { 'admin-menu-item__arrow--open': menu.expanded }]"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div v-if="menu.children && menu.expanded" class="admin-menu-item__children">
            <div
              v-for="child in menu.children"
              :key="child.key"
              :class="['admin-menu-item__child', { 'admin-menu-item__child--active': currentMenu === child.key }]"
              @click="selectMenu(child.key, child.path)"
            >
              {{ child.label }}
            </div>
          </div>
        </div>
      </aside>

      <!-- 主内容区 -->
      <main class="admin-main">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const username = ref('用户名称')
const currentTab = ref('resources')
const currentMenu = ref('home')

// 主导航栏
const mainTabs = [
  { key: 'resources', label: '资源管理' },
  { key: 'questions', label: '题库管理' },
  { key: 'analysis', label: '数据分析与统计' },
  { key: 'ai', label: 'AI智能管理' },
  { key: 'system', label: '系统配置' }
]

// 左侧菜单
const sideMenus = ref([
  {
    key: 'home',
    label: '首页',
    path: '/admin/resources/home',
    expanded: false
  },
  {
    key: 'overview',
    label: '思政概览',
    expanded: false,
    children: [
      { key: 'party-course', label: '"党建+课程思政"工作概览', path: '/admin/resources/party-course' },
      { key: 'model-display', label: '党员教师课程思政示范展播', path: '/admin/resources/model-display' }
    ]
  },
  {
    key: 'great-practice',
    label: '习思想的伟大实践',
    expanded: false,
    children: [
      { key: 'practice-achievement', label: '习思想融入成果', path: '/admin/resources/practice-achievement' },
      { key: 'practice-video', label: '习思想优秀视频展播', path: '/admin/resources/practice-video' },
      { key: 'practice-case', label: '习思想融入学科教学实践示范案例展播', path: '/admin/resources/practice-case' },
      { key: 'practice-footprint', label: '总书记的福建足迹', path: '/admin/resources/practice-footprint' }
    ]
  },
  {
    key: 'resources',
    label: '思政资源',
    path: '/admin/resources/list',
    expanded: false
  },
  {
    key: 'special',
    label: '特色专题',
    expanded: false,
    children: [
      { key: 'excellent-class', label: '优秀思政课堂', path: '/admin/resources/excellent-class' },
      { key: 'college-special', label: '一院一品', path: '/admin/resources/college-special' },
      { key: 'culture-map', label: '红色文化资源地图（福州地区）', path: '/admin/resources/culture-map' }
    ]
  }
])

// 切换主导航
const switchTab = (tabKey: string) => {
  currentTab.value = tabKey
  const tabRoutes: Record<string, string> = {
    resources: '/admin/resources',
    questions: '/admin/questions',
    analysis: '/admin/analysis',
    ai: '/admin/ai',
    system: '/admin/system'
  }
  router.push(tabRoutes[tabKey])
}

// 切换菜单展开/收起
const toggleMenu = (menu: any) => {
  if (menu.children) {
    menu.expanded = !menu.expanded
  } else {
    selectMenu(menu.key, menu.path)
  }
}

// 选择菜单项
const selectMenu = (key: string, path: string) => {
  currentMenu.value = key
  if (path) {
    router.push(path)
  }
}

// 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    // 根据路由更新当前选中的标签页
    if (newPath.startsWith('/admin/resources')) {
      currentTab.value = 'resources'
    } else if (newPath.startsWith('/admin/questions')) {
      currentTab.value = 'questions'
    } else if (newPath.startsWith('/admin/analysis')) {
      currentTab.value = 'analysis'
    } else if (newPath.startsWith('/admin/ai')) {
      currentTab.value = 'ai'
    } else if (newPath.startsWith('/admin/system')) {
      currentTab.value = 'system'
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.admin-layout {
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

/* 顶部导航栏 */
.admin-header {
  height: 60px;
  background: #e31e24;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.admin-header__left {
  display: flex;
  align-items: center;
}

.admin-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.admin-logo img {
  height: 40px;
  width: auto;
}

.admin-header__right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.admin-header__link {
  color: white;
  text-decoration: none;
  font-size: 14px;
  transition: opacity 0.3s;
}

.admin-header__link:hover {
  opacity: 0.8;
}

.admin-header__user {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  font-size: 14px;
}

/* 主导航栏 */
.admin-nav {
  height: 50px;
  background: white;
  display: flex;
  align-items: center;
  gap: 48px;
  padding: 0 40px;
  border-bottom: 1px solid #e8e8e8;
  position: sticky;
  top: 60px;
  z-index: 999;
}

.admin-nav__tab {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 8px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  position: relative;
  transition: color 0.3s;
}

.admin-nav__tab:hover {
  color: #e31e24;
}

.admin-nav__tab--active {
  color: #e31e24;
  font-weight: 500;
}

.admin-nav__tab--active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #e31e24;
}

/* 内容区域 */
.admin-content {
  flex: 1;
  display: flex;
  background: #f5f5f5;
}

/* 左侧菜单 */
.admin-sidebar {
  width: 260px;
  background: white;
  padding: 24px 0;
  overflow-y: auto;
  flex-shrink: 0;
}

.admin-menu-item {
  margin-bottom: 4px;
}

.admin-menu-item__title {
  padding: 12px 24px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s;
}

.admin-menu-item__title:hover {
  background: #fff5f5;
  color: #e31e24;
}

.admin-menu-item__title--active {
  background: #fff0f0;
  color: #e31e24;
  font-weight: 500;
  border-left: 3px solid #e31e24;
}

.admin-menu-item__arrow {
  transition: transform 0.3s;
}

.admin-menu-item__arrow--open {
  transform: rotate(180deg);
}

.admin-menu-item__children {
  background: #fafafa;
}

.admin-menu-item__child {
  padding: 10px 24px 10px 48px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.admin-menu-item__child:hover {
  background: #fff5f5;
  color: #e31e24;
}

.admin-menu-item__child--active {
  background: #fff0f0;
  color: #e31e24;
  font-weight: 500;
}

/* 主内容区 */
.admin-main {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}
</style>
