<template>
  <div class="loading">
    <!-- TODO: 实现加载组件 -->
  </div>
</template>

<script setup lang="ts">
/**
 * 加载组件
 */

interface LoadingProps {
  /** 加载文本 */
  text?: string
  /** 是否全屏 */
  fullscreen?: boolean
}

defineProps<LoadingProps>()

// TODO: 实现加载动画
</script>

<style scoped>
.loading {
  /* TODO: 添加样式 */
}
</style>

