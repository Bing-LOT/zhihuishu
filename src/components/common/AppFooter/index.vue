<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logos">
        <img 
          src="/images/8a264f96ca2ef2ae41fc9455a3252271c5f03a12.png" 
          alt="福州大学" 
          class="footer-logo"
        >
        <img 
          src="/images/95fe256e7055215419581e0b2171ddf24fbd0e16.png" 
          alt="Logo" 
          class="footer-logo-small"
        >
      </div>
      <div class="footer-divider" />
      <div class="footer-info">
        <p>地址：福建省福州市福州大学城乌龙江北大道2号</p>
        <p>邮编：350108</p>
        <p>中文域名：福州大学.公益</p>
        <div class="footer-bottom">
          <p>© 2021 福州大学     <a href="https://beian.miit.gov.cn/" target="_blank">闽ICP备05005463号</a></p>
          <p class="beian">
            <img src="/images/b7ed956a421650d887b7c14004ee575109d9f658.png" alt="公安备案">
            闽公网安备35018302000122
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// 通用页脚组件
</script>

<style scoped>
.footer {
  background: #222;
  color: white;
  padding: 24px 360px;
  margin-top: auto;
}

.footer-content {
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
}

.footer-logos {
  display: flex;
  align-items: center;
  gap: 16px;
}

.footer-logo {
  height: 60px;
  width: 180px;
  object-fit: contain;
}

.footer-logo-small {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.footer-divider {
  width: 1px;
  height: 128px;
  background: white;
  opacity: 0.3;
}

.footer-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 16px;
  line-height: 1.75;
}

.footer-info p {
  margin: 0;
}

.footer-info a {
  color: white;
  text-decoration: underline;
}

.footer-bottom {
  display: flex;
  gap: 48px;
  align-items: center;
}

.beian {
  display: flex;
  align-items: center;
  gap: 4px;
}

.beian img {
  width: 18px;
  height: 20px;
}

/* Responsive */
@media (max-width: 1600px) {
  .footer {
    padding-left: 40px;
    padding-right: 40px;
  }
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 24px;
  }
  
  .footer-divider {
    width: 100%;
    height: 1px;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 16px;
  }
}
</style>

