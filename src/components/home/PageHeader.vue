<template>
  <header class="header">
    <div class="header-content">
      <div class="logo-section">
        <img 
          src="/images/00dcb4e82f32dad380c689b6a020ef7171d0aa8f.png" 
          alt="Logo" 
          class="logo-img"
        >
        <span class="logo-text">福州大学大思政教育未来学习中心</span>
      </div>
      <div class="action-section">
        <div class="search-bar">
          <input 
            v-model="searchKeyword"
            type="text" 
            placeholder="课程 名师 新闻 资源搜索"
            class="search-input"
            @keyup.enter="handleSearch"
          >
          <button class="search-btn" @click="handleSearch">
            资源搜索
          </button>
        </div>
        <button class="admin-btn" @click="goToAdmin">
          后台管理系统
        </button>
        <button class="login-btn" @click="handleLogin">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="#c30d23"/>
            <path d="M10 12.5C4.47715 12.5 0 14.4772 0 17V20H20V17C20 14.4772 15.5228 12.5 10 12.5Z" fill="#c30d23"/>
          </svg>
          登录
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchKeyword = ref('')

const handleSearch = () => {
  console.log('搜索关键词:', searchKeyword.value)
  // TODO: 实现搜索功能
}

const goToAdmin = () => {
  window.location.href = '/admin'
}

const handleLogin = () => {
  router.push('/auth/login')
}
</script>

<style scoped>
.header {
  background: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  max-width: 1920px;
  margin: 0 auto;
  height: 110px;
  padding: 0 360px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.logo-img {
  height: 52px;
  width: 195px;
  object-fit: contain;
}

.logo-text {
  font-family: 'Source Han Sans CN', sans-serif;
  font-size: 24px;
  color: #515151;
  white-space: nowrap;
}

.action-section {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
  flex-shrink: 0;
}

.search-bar {
  display: flex;
  align-items: center;
  border: 1px solid #c30d23;
  border-radius: 5px;
  overflow: hidden;
}

.search-input {
  width: 216px;
  padding: 6px 16px;
  border: none;
  outline: none;
  font-size: 14px;
  color: #757575;
}

.search-btn {
  background: #c30d23;
  color: white;
  border: none;
  padding: 6px 19px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s;
  white-space: nowrap;
}

.search-btn:hover {
  background: #a00a1c;
}

.admin-btn {
  border: 1px solid #c30d23;
  background: white;
  color: #c30d23;
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.admin-btn:hover {
  background: #c30d23;
  color: white;
}

.login-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: #c30d23;
  font-size: 18px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.login-btn:hover {
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 1600px) {
  .header-content {
    padding-left: 40px;
    padding-right: 40px;
  }
}

@media (max-width: 768px) {
  .header-content {
    height: auto;
    padding: 20px;
    flex-direction: column;
    gap: 16px;
  }
  
  .logo-section {
    flex-direction: column;
    text-align: center;
  }
  
  .logo-text {
    font-size: 18px;
  }
  
  .action-section {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>

