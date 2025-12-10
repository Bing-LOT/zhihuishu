<template>
  <router-view />
</template>

<script setup lang="ts">
/**
 * 根组件
 */

import { onMounted } from 'vue'
import { useConfigStore } from './stores/config'

const configStore = useConfigStore()

onMounted(() => {
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
