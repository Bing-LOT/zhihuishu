<template>
  <div class="admin-questions">
    <div class="page-header">
      <h2>题库管理</h2>
      <p>管理思政课程题库、试卷和考试</p>
    </div>

    <div class="page-actions">
      <button class="btn-primary" @click="showAddDialog = true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3.5V12.5M3.5 8H12.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
        添加题目
      </button>
    </div>

    <div class="content-card">
      <div class="empty-state">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path d="M32 8V56M8 32H56" stroke="#d9d9d9" stroke-width="3" stroke-linecap="round"/>
        </svg>
        <p>暂无题目数据</p>
        <button class="btn-secondary" @click="showAddDialog = true">立即添加</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showAddDialog = ref(false)
</script>

<style scoped>
.admin-questions {
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

.page-actions {
  margin-bottom: 24px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #e31e24;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-primary:hover {
  background: #c71b20;
}

.content-card {
  background: white;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.empty-state p {
  margin: 16px 0;
  font-size: 14px;
  color: #999;
}

.btn-secondary {
  padding: 8px 20px;
  background: white;
  color: #e31e24;
  border: 1px solid #e31e24;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: #e31e24;
  color: white;
}
</style>
