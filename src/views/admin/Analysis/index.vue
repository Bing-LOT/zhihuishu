<template>
  <div class="admin-analysis">
    <div class="page-header">
      <h2>数据分析与统计</h2>
      <p>查看平台使用数据和统计分析</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-card__icon" style="background: #e3f2fd;">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="#2196f3" stroke-width="2"/>
            <path d="M16 10V16L20 20" stroke="#2196f3" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="stat-card__info">
          <p class="stat-card__label">总访问量</p>
          <h3 class="stat-card__value">12,345</h3>
          <span class="stat-card__trend stat-card__trend--up">+12.5%</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-card__icon" style="background: #f3e5f5;">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z" stroke="#9c27b0" stroke-width="2"/>
            <path d="M16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4Z" stroke="#9c27b0" stroke-width="2"/>
          </svg>
        </div>
        <div class="stat-card__info">
          <p class="stat-card__label">活跃用户</p>
          <h3 class="stat-card__value">3,456</h3>
          <span class="stat-card__trend stat-card__trend--up">+8.2%</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-card__icon" style="background: #fff3e0;">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M6 26H26M10 22V14M16 22V10M22 22V18" stroke="#ff9800" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="stat-card__info">
          <p class="stat-card__label">课程总数</p>
          <h3 class="stat-card__value">128</h3>
          <span class="stat-card__trend stat-card__trend--up">+5</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-card__icon" style="background: #e8f5e9;">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M28 20V26C28 26.5304 27.7893 27.0391 27.4142 27.4142C27.0391 27.7893 26.5304 28 26 28H6C5.46957 28 4.96086 27.7893 4.58579 27.4142C4.21071 27.0391 4 26.5304 4 26V20" stroke="#4caf50" stroke-width="2" stroke-linecap="round"/>
            <path d="M8 12L16 4L24 12M16 4V20" stroke="#4caf50" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="stat-card__info">
          <p class="stat-card__label">资源总数</p>
          <h3 class="stat-card__value">456</h3>
          <span class="stat-card__trend stat-card__trend--up">+23</span>
        </div>
      </div>
    </div>

    <div class="content-card">
      <h3>访问趋势</h3>
      <div class="chart-placeholder">
        <svg width="100%" height="300" viewBox="0 0 800 300" fill="none">
          <path d="M50 250L150 200L250 150L350 180L450 120L550 160L650 100L750 140" stroke="#e31e24" stroke-width="3" fill="none"/>
          <path d="M50 250L150 200L250 150L350 180L450 120L550 160L650 100L750 140L750 250L50 250Z" fill="url(#gradient)" opacity="0.2"/>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#e31e24"/>
              <stop offset="100%" stop-color="#e31e24" stop-opacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 数据分析页面
</script>

<style scoped>
.admin-analysis {
  max-width: 1200px;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h2 {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.page-header p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.stat-card__icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-card__info {
  flex: 1;
}

.stat-card__label {
  margin: 0 0 8px;
  font-size: 14px;
  color: #666;
}

.stat-card__value {
  margin: 0 0 4px;
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.stat-card__trend {
  font-size: 12px;
  font-weight: 500;
}

.stat-card__trend--up {
  color: #4caf50;
}

.stat-card__trend--down {
  color: #f44336;
}

.content-card {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.content-card h3 {
  margin: 0 0 20px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.chart-placeholder {
  width: 100%;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  border-radius: 4px;
}
</style>
