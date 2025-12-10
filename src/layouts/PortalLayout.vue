<template>
  <div class="portal-layout">
    <!-- 顶部导航栏 -->
    <Header />
    
    <!-- 主内容区 -->
    <main class="portal-main">
      <router-view />
    </main>
    
    <!-- 页脚 -->
    <footer class="portal-footer">
      <div class="portal-footer__container">
        <!-- 左侧 Logo 区域 -->
        <div class="portal-footer__brand">
          <div class="portal-footer__logo-placeholder">
            <img src="/images/fuzhoudaxue.png" alt="福州大学" />
          </div>
          <div class="portal-footer__emblem-placeholder">
            <img src="/images/xiaohui.png" alt="福州大学" />
            <!-- <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="38" stroke="white" stroke-width="2" stroke-opacity="0.5"/>
              <text x="40" y="45" text-anchor="middle" fill="white" font-size="14" font-weight="bold">校徽</text>
            </svg> -->
          </div>
        </div>

        <!-- 分隔线 -->
        <div class="portal-footer__divider"></div>

        <!-- 右侧信息区域 -->
        <div class="portal-footer__info">
          <p>地址：福建省福州市福州大学城乌龙江北大道2号</p>
          <p>邮编：350108</p>
          <p>中文域名：福州大学.公益</p>
          <div class="portal-footer__copyright">
            <p>
              © 2021 福州大学&nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">
                闽ICP备05005463号
              </a>
            </p>
            <div class="portal-footer__beian">
              <img src="/images/beian.png" alt="备案" />
              <!-- <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 2L2 5V9C2 13.5 5 17.5 9 19C13 17.5 16 13.5 16 9V5L9 2Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
              </svg> -->
              <span>闽公网安备35018302000122</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/layout/Header.vue'

/**
 * 门户布局组件
 */
</script>

<style scoped>
.portal-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff9ed;
}

/* ===== 主内容区 ===== */
.portal-main {
  flex: 1;
  width: 100%;
}

/* ===== 页脚 ===== */
.portal-footer {
  position: relative;
  width: 100%;
  height: 220px;
  background: #bc2220;
  overflow: hidden;
}

.portal-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-image: url('/images/backgrounds/footer-pattern.png'); */
  background: linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%, transparent);
  background-size: 20px 20px;
  opacity: 0.1;
  pointer-events: none;
}

.portal-footer__container {
  position: relative;
  max-width: 1920px;
  margin: 0 auto;
  height: 100%;
  padding: 24px 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
  z-index: 1;
}

/* Logo 区域 */
.portal-footer__brand {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.portal-footer__logo-placeholder {
  width: 180px;
  height: 60px;
}

.portal-footer__emblem-placeholder {
  width: 80px;
  height: 80px;
}

/* 分隔线 */
.portal-footer__divider {
  width: 0;
  height: 128px;
  border-left: 1px solid #ffffff;
  flex-shrink: 0;
}

/* 信息区域 */
.portal-footer__info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #ffffff;
}

.portal-footer__info p {
  margin: 0;
  font-size: 16px;
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: 400;
  line-height: 1.75;
  white-space: pre;
}

.portal-footer__info a {
  color: #ffffff;
  text-decoration: underline;
  transition: opacity 0.3s ease;
}

.portal-footer__info a:hover {
  opacity: 0.8;
}

.portal-footer__copyright {
  display: flex;
  gap: 48px;
  align-items: center;
}

.portal-footer__beian {
  display: flex;
  align-items: center;
  gap: 4px;
}

.portal-footer__beian img {
  width: 18px;
  height: 20px;
}
</style>

