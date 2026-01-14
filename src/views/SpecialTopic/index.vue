<template>
  <div class="special-topic-page">
    <!-- Header -->
    <PageHeader />
    
    <!-- Navigation -->
    <AppNavigation />
    
    <!-- Hero Banner Section -->
    <section class="hero-banner">
      <!-- Decorative Background Elements -->
      <div class="deco-layer deco-pattern"></div>
      <div class="deco-layer deco-pillar"></div>
      <div class="deco-layer deco-petal-left"></div>
      <div class="deco-layer deco-petal-right"></div>
      <div class="deco-layer deco-flower-left"></div>
      <div class="deco-layer deco-flower-right"></div>
      <div class="deco-layer deco-landscape"></div>
      
      <div class="hero-content">
        <div class="achievement-card">
          <div class="card-header">
            <!-- Red Ribbon Decoration -->
            <div class="ribbon-wrapper">
              <div class="ribbon-flag">
                <svg class="star-icon" viewBox="0 0 54 54" fill="none">
                  <path d="M27 0L32.5 21.5L54 27L32.5 32.5L27 54L21.5 32.5L0 27L21.5 21.5L27 0Z" fill="white"/>
                </svg>
              </div>
              <div class="ribbon-base"></div>
            </div>
            
            <!-- Golden Seal Style Title -->
            <div class="title-seal">
              <div class="seal-background"></div>
              <h2 class="achievement-title">融入成果</h2>
            </div>
          </div>
          <div class="card-body">
            <p class="achievement-text">
              &nbsp;&nbsp;&nbsp;&nbsp;1990年至2010年，习近平同志以莅校视察调研、会见福州大学专家学者、为大学生作报告、致校庆贺信等方式14次关怀福州大学建设发展，给我校留下了宝贵的思想和精神财富。
            </p>
            <p class="achievement-text">
              &nbsp;&nbsp;&nbsp;&nbsp;为深入贯彻落实习近平总书记关于"大思政课"建设的重要指示批示精神，领会习近平同志关怀福州大学建设发展思想精髓，充分发挥高校思政课程和课程思政在立德树人中的主渠道作用，坚持不懈用习近平新时代中国特色社会主义思想铸魂育人，引导学生深刻领悟"两个确立"的决定性意义，增强"四个意识"，坚定"四个自信"，福州大学教务处于2024年9月开展了"习近平同志关怀福州大学建设发展"教学视频展示活动暨2024年福州大学课程思政教学改革视频征集工作。
            </p>
            <p class="achievement-text">
              &nbsp;&nbsp;&nbsp;&nbsp;29位教师结合岗位工作建设的教学视频获批立项，其中13个视频获评优秀。
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Main Content -->
    <main class="main-content">
      <!-- Leadership Care Section -->
      <section class="section leadership-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="title-highlight">领导</span>
            <span class="title-normal">关怀</span>
          </h2>
          <div class="title-divider"></div>
          <a href="javascript:void(0)" class="view-more">【查看更多】</a>
        </div>
        
        <div v-if="loading" class="loading-container">
          <div class="loading">加载中...</div>
        </div>
        <div v-else class="card-grid leadership-grid">
          <div 
            v-for="item in leadershipList" 
            :key="item.id"
            class="video-card"
            @click="handleLeadershipClick(item)"
          >
            <div class="card-image">
              <img :src="item.coverUrl" :alt="item.title" />
            </div>
            <div class="card-footer">
              <p class="card-title">{{ item.title }}</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Special Topic Section -->
      <section class="section topic-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="title-highlight">专题</span>
            <span class="title-normal">网页</span>
          </h2>
          <div class="title-divider"></div>
          <a href="https://news.fzu.edu.cn/ztwy1.htm" target="_blank" class="view-more">【查看更多】</a>
        </div>
        
        <div v-if="loading" class="loading-container">
          <div class="loading">加载中...</div>
        </div>
        <div v-else class="card-grid topic-grid">
          <div 
            v-for="item in topicList" 
            :key="item.id"
            class="topic-card"
            @click="handleTopicClick(item)"
          >
            <div class="card-image">
              <img :src="item.coverUrl" :alt="item.title" />
            </div>
            <div class="card-footer">
              <p class="card-title">{{ item.title }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <!-- Footer -->
    <PageFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PageHeader from '@/components/common/PageHeader/index.vue'
import PageFooter from '@/components/common/PageFooter/index.vue'
import AppNavigation from '@/components/common/AppNavigation/index.vue'

const router = useRouter()

interface VideoItem {
  id: number
  title: string
  coverUrl: string
  url?: string
}

const loading = ref(false)
const leadershipList = ref<VideoItem[]>([])
const topicList = ref<VideoItem[]>([])

// 加载领导关怀数据
const loadLeadershipData = () => {
  // 使用已有的图片资源作为占位符
  const covers = [
    '/images/home/video-1.jpg',
    '/images/home/video-2.jpg',
    '/images/home/video-3.jpg',
    '/images/home/video-4.jpg',
    '/images/Frame_1000015326.png',
    '/images/Frame_1000015327.png',
    '/images/Frame_1000015361.png',
    '/images/guanhuaiBG.png',
    '/images/indexBg.png'
  ]
  
  leadershipList.value = [
    {
      id: 1,
      title: '牢记殷殷嘱托 建设一流大学 福州大学助力福建经济社会发展彰显新作为',
      coverUrl: covers[0]
    },
    {
      id: 2,
      title: '习近平同志助力福州大学\"东南强校\"木林圆:\"产学研\"协同发展',
      coverUrl: covers[1]
    },
    {
      id: 3,
      title: '弘扬五四精神 谱写奋斗青春',
      coverUrl: covers[2]
    },
    {
      id: 4,
      title: '结合专业特色领会习近平总书记关于教育的重要...',
      coverUrl: covers[3]
    },
    {
      id: 5,
      title: '\'面\'向未来，\'封\'启智慧:Java编程的\'箱\'里乾坤',
      coverUrl: covers[4]
    },
    {
      id: 6,
      title: '民无信不立 楼无廉不坚一一土木工程职业道德...',
      coverUrl: covers[5]
    },
    {
      id: 7,
      title: '以福州大学\"三种精神\"育新时代的文化自信、创..',
      coverUrl: covers[6]
    },
    {
      id: 8,
      title: '\"智叟短视\"与\"愚公移山\"一土木工程思政教育改..',
      coverUrl: covers[7]
    },
    {
      id: 9,
      title: '为党为国育人才 擘画东南强校梦人',
      coverUrl: covers[8]
    }
  ]
}

// 加载专题网页数据
const loadTopicData = () => {
  // 模拟数据
  topicList.value = [
    {
      id: 1,
      title: '学习贯彻党的二十届四中全会精神',
      coverUrl: '/images/Frame427321179.png'
    },
    {
      id: 2,
      title: '深入贯彻中央八项规定精神学习教育',
      coverUrl: '/images/Frame427321180.png'
    },
    {
      id: 3,
      title: '党建引领',
      coverUrl: '/images/Frame427321181.png'
    },
    {
      id: 4,
      title: '学习贯彻党的二十届三中全会精神',
      coverUrl: '/images/Frame427321182.png'
    },
    {
      id: 5,
      title: '党纪学习教育',
      coverUrl: '/images/Frame427321183.png'
    },
    {
      id: 6,
      title: '学习贯彻习近平新时代中国特色社会主义思想主..',
      coverUrl: '/images/Frame427321184.png'
    },
    {
      id: 7,
      title: '学习贯彻党的二十大精神专题网',
      coverUrl: '/images/Frame427321185.png'
    },
    {
      id: 8,
      title: '党史学习教育专题网',
      coverUrl: '/images/Frame427321186.png'
    },
    {
      id: 9,
      title: '不忘初心 牢记使命',
      coverUrl: '/images/Frame427321187.png'
    },
    {
      id: 10,
      title: '学习宣传贯彻党的十九大精神专题',
      coverUrl: '/images/Frame427321188.png'
    },
    {
      id: 11,
      title: '两学一做',
      coverUrl: '/images/Frame427321189.png'
    },
    {
      id: 12,
      title: '三严三实专题网',
      coverUrl: '/images/Frame427321190.png'
    }
  ]
}

// 处理领导关怀卡片点击
const handleLeadershipClick = (item: VideoItem) => {
  if (item.url) {
    window.open(item.url, '_blank')
  }
}

// 处理专题卡片点击
const handleTopicClick = (item: VideoItem) => {
  if (item.url) {
    window.open(item.url, '_blank')
  }
}

// 初始化数据
onMounted(() => {
  loading.value = true
  loadLeadershipData()
  loadTopicData()
  loading.value = false
})
</script>

<style scoped>
.special-topic-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
}

/* ===== Hero Banner ===== */
.hero-banner {
  position: relative;
  min-height: 1100px;
  height: auto;
  background: #fff9ed;
  background-image: url('/images/guanhuaiBG.png');
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% auto;
  overflow: hidden;
}

/* Decorative Layers */
.deco-layer {
  position: absolute;
  pointer-events: none;
}

/* Central Pattern - using SVG pattern */
.deco-pattern {
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 370px;
  height: 369px;
  background: radial-gradient(circle, rgba(195, 13, 35, 0.03) 0%, transparent 70%);
  z-index: 1;
}

.deco-pattern::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background-image: 
    repeating-conic-gradient(
      from 45deg,
      rgba(195, 13, 35, 0.05) 0deg 45deg,
      transparent 45deg 90deg
    );
  border-radius: 50%;
}

/* Chinese Pillar/Column - using existing zhuzi images */
.deco-pillar {
  top: 44px;
  right: -50px;
  width: 300px;
  height: 600px;
  /* background-image: url('/images/zhuzi.png'); */
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.15;
  z-index: 0;
}

/* Landscape/Mountains on the left - now handled by hero-banner background */
.deco-landscape {
  display: none; /* Background is now on hero-banner itself */
}

/* Petal decorations - using existing petal images */
.deco-petal-left {
  top: 50px;
  left: 80%;
  width: 188px;
  height: 187px;
  /* background-image: url('/images/piaodai1.png'); */
  background-repeat: no-repeat;
  background-size: contain;
  transform: rotate(15deg);
  opacity: 0.2;
  z-index: 1;
}

.deco-petal-right {
  top: 100px;
  right: 15%;
  width: 150px;
  height: 150px;
  /* background-image: url('/images/piaodai3.png'); */
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.25;
  z-index: 1;
}

/* Flower decorations */
.deco-flower-left {
  bottom: 50px;
  left: -50px;
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle at center,
    rgba(195, 13, 35, 0.03) 0%,
    rgba(255, 210, 94, 0.02) 50%,
    transparent 70%
  );
  z-index: 0;
}

.deco-flower-right {
  bottom: -50px;
  right: 100px;
  width: 450px;
  height: 450px;
  /* background-image: url('/images/piaodai4.png'); */
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.15;
  transform: rotate(-20deg);
  z-index: 0;
}

.hero-content {
  position: relative;
  max-width: 1920px;
  height: 100%;
  margin: 0 auto;
  padding: 0 120px;
  display: flex;
  align-items: center;
  z-index: 5;
}

.achievement-card {
  width: 863px;
  margin-top: 33px;
  position: relative;
}

.card-header {
  position: relative;
  text-align: center;
  margin-bottom: -120px;
  z-index: 10;
}

/* Red Ribbon/Flag Style */
.ribbon-wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
}

.ribbon-flag {
  width: 120px;
  height: 140px;
  background: linear-gradient(135deg, #c30d23 0%, #a00a1c 100%);
  clip-path: polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  box-shadow: 0 8px 24px rgba(195, 13, 35, 0.4);
  position: relative;
}

.ribbon-flag::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%);
  clip-path: inherit;
}

.star-icon {
  width: 45px;
  height: 45px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

/* Golden Seal Title Container */
.title-seal {
  position: relative;
  display: inline-block;
  margin-top: 15px;
}

.seal-background {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 70px;
  background: linear-gradient(135deg, #ff0009 10%, #ff813a 82%);
  opacity: 0.15;
  border-radius: 8px;
  filter: blur(8px);
}

.achievement-title {
  font-family: 'jiangxizhuokai', 'Source Han Sans CN', 'Microsoft YaHei', serif;
  font-size: 28px;
  font-weight: normal;
  letter-spacing: 7px;
  text-align: center;
  position: relative;
  margin: 0;
  padding: 10px 30px;
  background: linear-gradient(180deg, #ffffff 10%, #ffd25e 82%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 9px 4px rgba(0, 0, 0, 0.25);
  filter: drop-shadow(0 2px 4px rgba(255, 210, 94, 0.5));
}

.card-body {
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid white;
  border-radius: 8px;
  padding: 126px 24px 24px;
  backdrop-filter: blur(2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 5;
}

.achievement-text {
  font-family: 'Source Han Sans CN', sans-serif;
  font-size: 18px;
  line-height: 1.75;
  color: #333;
  margin: 0 0 16px 0;
  text-indent: 0;
}

.achievement-text:last-child {
  margin-bottom: 0;
}

.achievement-text:empty {
  display: none;
}

/* ===== Main Content ===== */
.main-content {
  flex: 1;
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  padding: 60px 360px 80px;
}

.section {
  margin-bottom: 60px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
}

.section-title {
  font-family: 'Source Han Sans CN', sans-serif;
  font-size: 30px;
  font-weight: bold;
  margin: 0;
  white-space: nowrap;
}

.title-highlight {
  color: #c30d23;
}

.title-normal {
  color: #000;
}

.title-divider {
  flex: 1;
  height: 15px;
  background-image: url('/images/0284b4e501c92c66c4350a706aae467b7ebb06a3.png');
  background-repeat: repeat-x;
  background-size: 5px 15px;
}

.view-more {
  font-family: 'Source Han Sans CN', sans-serif;
  font-size: 14px;
  color: #c30d23;
  text-decoration: underline;
  white-space: nowrap;
  cursor: pointer;
  transition: opacity 0.3s;
}

.view-more:hover {
  opacity: 0.8;
}

/* ===== Card Grid ===== */
.card-grid {
  display: grid;
  gap: 40px;
}

.leadership-grid {
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.topic-grid {
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

/* ===== Video Card ===== */
.video-card {
  background: white;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.video-card .card-image {
  position: relative;
  width: 100%;
  aspect-ratio: 580 / 320;
  overflow: hidden;
}

.video-card .card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-card .card-footer {
  background: rgba(0, 0, 0, 0.5);
  padding: 6px 12px;
}

.video-card .card-title {
  font-family: 'Source Han Sans CN', sans-serif;
  font-size: 16px;
  color: white;
  margin: 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ===== Topic Card ===== */
.topic-card {
  background: white;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.topic-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.topic-card .card-image {
  position: relative;
  width: 100%;
  aspect-ratio: 580 / 320;
  overflow: hidden;
}

.topic-card .card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.topic-card .card-footer {
  background: rgba(0, 0, 0, 0.5);
  padding: 6px 12px;
}

.topic-card .card-title {
  font-family: 'Source Han Sans CN', sans-serif;
  font-size: 16px;
  color: white;
  margin: 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ===== Loading ===== */
.loading-container {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading {
  font-size: 16px;
  color: #999;
}

/* ===== Responsive ===== */
@media (max-width: 1600px) {
  .main-content {
    padding-left: 40px;
    padding-right: 40px;
  }
  
  .hero-content {
    padding-left: 40px;
    padding-right: 40px;
  }
  
  /* Adjust decorative elements */
  .deco-pillar {
    opacity: 0.08;
  }
  
  .deco-petal-left,
  .deco-petal-right {
    opacity: 0.15;
  }
}

@media (max-width: 1200px) {
  .leadership-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .topic-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  /* Hide some decorative elements on medium screens */
  .deco-pillar,
  .deco-landscape {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero-banner {
    height: auto;
    min-height: 500px;
    padding: 40px 0;
  }
  
  .hero-content {
    padding: 20px;
  }
  
  .achievement-card {
    width: 100%;
    margin-top: 0;
  }
  
  .card-header {
    margin-bottom: -100px;
  }
  
  .ribbon-flag {
    width: 100px;
    height: 120px;
  }
  
  .star-icon {
    width: 35px;
    height: 35px;
  }
  
  .achievement-title {
    font-size: 24px;
    letter-spacing: 5px;
    padding: 8px 20px;
  }
  
  .card-body {
    padding: 110px 20px 20px;
  }
  
  .achievement-text {
    font-size: 16px;
    line-height: 1.6;
  }
  
  .leadership-grid,
  .topic-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .section-title {
    font-size: 24px;
  }
  
  .main-content {
    padding: 40px 20px 60px;
  }
  
  /* Hide decorative elements on mobile */
  .deco-petal-left,
  .deco-petal-right,
  .deco-flower-left,
  .deco-flower-right {
    display: none;
  }
  
  .deco-pattern {
    opacity: 0.5;
    width: 200px;
    height: 200px;
  }
}
</style>

