<template>
  <div class="callback-page">
    <h1>登录中...</h1>
    <!-- TODO: 实现 SSO 回调处理 -->
  </div>
</template>

<script setup lang="ts">
/**
 * SSO 回调页
 */

import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

onMounted(() => {
  // TODO: 处理 SSO 回调
  // 1. 获取授权码
  // 2. 调用登录接口
  // 3. 保存 Token
  // 4. 跳转到原页面
})
</script>

<style scoped>
.callback-page {
  /* TODO: 添加样式 */
}
</style>

