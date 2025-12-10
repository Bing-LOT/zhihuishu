<template>
  <div class="login-page">
    <h1>登录</h1>
    <!-- TODO: 实现 SSO 登录跳转 -->
  </div>
</template>

<script setup lang="ts">
/**
 * 登录页（SSO 跳转）
 */

import { onMounted } from 'vue'
import { redirectToSSO } from '@/utils/auth'

onMounted(() => {
  // TODO: 自动跳转到 SSO 登录
  // redirectToSSO()
})
</script>

<style scoped>
.login-page {
  /* TODO: 添加样式 */
}
</style>

