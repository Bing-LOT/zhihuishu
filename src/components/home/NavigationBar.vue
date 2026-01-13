<template>
  <nav class="nav-bar">
    <a 
      v-for="item in navItems" 
      :key="item.path"
      :href="item.path" 
      class="nav-item"
      :class="{ active: isActive(item.path) }"
    >
      {{ item.label }}
    </a>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { path: '/', label: '首页' },
  { path: '/party-journey', label: '建党之路' },
  { path: '/hotspot', label: '思政热点' },
  { path: '/teaching', label: '教学有道' },
  { path: '/college', label: '一院一品' },
  { path: '/classroom', label: '精彩课堂' },
  { path: '/excellent-course', label: '督导点赞课' }
]

const isActive = (path: string) => {
  return route.path === path
}
</script>

<style scoped>
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

/* Responsive */
@media (max-width: 1600px) {
  .nav-bar {
    padding-left: 40px;
    padding-right: 40px;
  }
}

@media (max-width: 768px) {
  .nav-bar {
    height: auto;
    flex-wrap: wrap;
    gap: 20px;
    padding: 16px;
  }
}
</style>

