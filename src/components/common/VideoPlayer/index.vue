<template>
  <div class="video-player">
    <video
      ref="videoRef"
      class="video-player__video"
      :src="src"
      :poster="poster"
      :autoplay="autoplay"
      :loop="loop"
      :muted="muted"
      controls
      controlslist="nodownload"
      @play="handlePlay"
      @pause="handlePause"
      @ended="handleEnded"
      @timeupdate="handleTimeUpdate"
      @progress="handleProgress"
    >
      您的浏览器不支持视频播放
    </video>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { VideoPlayerProps, VideoPlayerEmits } from './types'

/**
 * 视频播放器组件
 */
const props = withDefaults(defineProps<VideoPlayerProps>(), {
  autoplay: false,
  loop: false,
  muted: false,
  playbackRate: 1
})

const emit = defineEmits<VideoPlayerEmits>()

const videoRef = ref<HTMLVideoElement | null>(null)

// 监听播放速率变化
watch(() => props.playbackRate, (rate) => {
  if (videoRef.value) {
    videoRef.value.playbackRate = rate
  }
})

// 事件处理
const handlePlay = () => {
  emit('play')
}

const handlePause = () => {
  emit('pause')
}

const handleEnded = () => {
  emit('ended')
}

const handleTimeUpdate = () => {
  if (videoRef.value) {
    emit('timeupdate', videoRef.value.currentTime)
  }
}

const handleProgress = () => {
  if (videoRef.value && videoRef.value.duration) {
    const progress = (videoRef.value.currentTime / videoRef.value.duration) * 100
    emit('progress', progress)
  }
}

// 暴露方法
defineExpose({
  play: () => videoRef.value?.play(),
  pause: () => videoRef.value?.pause(),
  seek: (time: number) => {
    if (videoRef.value) {
      videoRef.value.currentTime = time
    }
  }
})
</script>

<style scoped>
.video-player {
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-player__video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
