<template>
  <div class="banner">
    <transition name="fade">
      <img 
        v-if="banners.length > 0"
        :key="currentBannerIndex"
        :src="banners[currentBannerIndex].imageUrl || banners[currentBannerIndex].picUrl" 
        :alt="banners[currentBannerIndex].title" 
        class="banner-img"
      >
      <img 
        v-else
        src="/images/e1abaefd40f9ac8751d3843a47b777c872cdb435.png" 
        alt="Banner" 
        class="banner-img"
      >
    </transition>
    <div v-if="banners.length > 1" class="banner-indicators">
      <span 
        v-for="(item, index) in banners" 
        :key="item.id || index" 
        class="indicator"
        :class="{ active: index === currentBannerIndex }"
        @click="currentBannerIndex = index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { getBannerList } from '@/api/banner'

const banners = ref<any[]>([])
const currentBannerIndex = ref(0)
let bannerTimer: number | null = null

const loadBanners = async () => {
  try {
    const data = await getBannerList()
    banners.value = data.sort((a, b) => a.sort - b.sort)
  } catch (error) {
    console.error('加载Banner失败:', error)
  }
}

const startBannerAutoPlay = () => {
  if (banners.value.length <= 1) return
  
  bannerTimer = window.setInterval(() => {
    currentBannerIndex.value = (currentBannerIndex.value + 1) % banners.value.length
  }, 5000)
}

const stopBannerAutoPlay = () => {
  if (bannerTimer) {
    clearInterval(bannerTimer)
    bannerTimer = null
  }
}

onMounted(() => {
  loadBanners().then(() => {
    startBannerAutoPlay()
  })
})

onUnmounted(() => {
  stopBannerAutoPlay()
})
</script>

<style scoped>
.banner {
  position: relative;
  height: 500px;
  background: #f0f0f0;
  overflow: hidden;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-indicators {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 18px;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s;
}

.indicator.active {
  background: #c30d23;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .banner {
    height: 300px;
  }
}
</style>

