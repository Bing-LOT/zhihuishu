<template>
  <nav class="navigation-bar">
    <a href="/" class="nav-item" :class="{ active: currentPath === '/' }">首页</a>
    <a href="/hotspot" class="nav-item" :class="{ active: currentPath === '/hotspot' }">思政热点</a>
    <a href="/teaching" class="nav-item" :class="{ active: currentPath === '/teaching' }">教学有道</a>
    <a href="/classroom" class="nav-item" :class="{ active: currentPath === '/classroom' }">精彩课堂</a>
    <a href="/college" class="nav-item" :class="{ active: currentPath === '/college' }">一院一品</a>
    <a href="/special" class="nav-item" :class="{ active: currentPath === '/special' }">特色专题</a>
    <a href="/resource" class="nav-item" :class="{ active: currentPath === '/resource' }">育人资源</a>
    <a href="/exam" class="nav-item" :class="{ active: currentPath === '/exam' }">学习题库</a>
    <a href="/reference" class="nav-item" :class="{ active: currentPath === '/reference' }">他山之石</a>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentPath = computed(() => route.path)
</script>

<style scoped>
.navigation-bar {
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
  .navigation-bar {
    padding-left: 40px;
    padding-right: 40px;
  }
}

@media (max-width: 768px) {
  .navigation-bar {
    height: auto;
    flex-wrap: wrap;
    gap: 20px;
    padding: 16px;
  }
}
</style>

