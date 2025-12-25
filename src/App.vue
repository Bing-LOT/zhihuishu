<template>
  <router-view />
</template>

<script setup lang="ts">
/**
 * 根组件
 */

import { onMounted } from 'vue'
import { useConfigStore } from './stores/config'
import { useUserStore } from './stores/user'
import { getUrlParam } from './utils/url'

const configStore = useConfigStore()
const userStore = useUserStore()

onMounted(() => {
  // 从 URL 参数中获取 AuthToken
  const urlAuthToken = getUrlParam('AuthToken')
  
  // 初始化 AuthToken（优先使用URL参数，否则使用本地存储）
  userStore.initAuthToken(urlAuthToken || undefined)
  
  // TODO: 初始化应用配置
  // configStore.fetchSystemConfig()
})
</script>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
