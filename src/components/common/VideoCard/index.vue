<template>
  <button 
    class="video-card" 
    :class="{ 'video-card--large': isLarge }"
    @click="handleClick"
  >
    <img :src="thumbnail" :alt="title" class="video-card__thumbnail" />
    <div class="video-card__overlay">
      <span class="video-card__title">{{ title }}</span>
    </div>
  </button>
</template>

<script setup lang="ts">
/**
 * 视频卡片组件
 */
interface VideoCardProps {
  /** 缩略图 */
  thumbnail: string
  /** 标题 */
  title: string
  /** 是否为大尺寸 */
  isLarge?: boolean
}

interface VideoCardEmits {
  (e: 'click'): void
}

defineProps<VideoCardProps>()
const emit = defineEmits<VideoCardEmits>()

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.video-card {
  position: relative;
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 0;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  width: 320px;
  height: 172px;
}

.video-card--large {
  width: 320px;
  height: 212px;
}

.video-card:hover {
  transform: scale(1.02);
}

.video-card__thumbnail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  pointer-events: none;
  border-radius: 8px;
}

.video-card__overlay {
  position: relative;
  width: 100%;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.video-card__title {
  font-size: 16px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: 400;
  color: #ffffff;
  line-height: normal;
  text-align: left;
  white-space: pre;
}
</style>

