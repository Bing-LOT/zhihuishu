<template>
  <div class="admin-ai">
    <div class="page-header">
      <h2>AI智能管理</h2>
      <p>配置AI助手和智能推荐功能</p>
    </div>

    <div class="ai-sections">
      <div class="ai-card">
        <div class="ai-card__header">
          <div class="ai-card__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#e31e24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#e31e24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div>
            <h3>AI助手配置</h3>
            <p>设置AI对话助手的参数和行为</p>
          </div>
        </div>
        <div class="ai-card__content">
          <div class="form-item">
            <label>API密钥</label>
            <input type="password" placeholder="请输入API密钥" class="form-input" />
          </div>
          <div class="form-item">
            <label>模型选择</label>
            <select class="form-input">
              <option>GPT-4</option>
              <option>GPT-3.5-Turbo</option>
              <option>Claude</option>
            </select>
          </div>
          <div class="form-item">
            <label>温度参数 (0-1)</label>
            <input type="number" min="0" max="1" step="0.1" value="0.7" class="form-input" />
          </div>
          <button class="btn-primary">保存配置</button>
        </div>
      </div>

      <div class="ai-card">
        <div class="ai-card__header">
          <div class="ai-card__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#e31e24"/>
              <path d="M12 6V12L16 14" stroke="#e31e24" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div>
            <h3>智能推荐</h3>
            <p>配置个性化推荐算法</p>
          </div>
        </div>
        <div class="ai-card__content">
          <div class="toggle-item">
            <span>启用个性化推荐</span>
            <label class="toggle">
              <input type="checkbox" checked />
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="toggle-item">
            <span>基于浏览历史推荐</span>
            <label class="toggle">
              <input type="checkbox" checked />
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="toggle-item">
            <span>协同过滤推荐</span>
            <label class="toggle">
              <input type="checkbox" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// AI管理页面
</script>

<style scoped>
.admin-ai {
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

.ai-sections {
  display: grid;
  gap: 24px;
}

.ai-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.ai-card__header {
  padding: 20px 24px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  gap: 16px;
}

.ai-card__icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #fff0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ai-card__header h3 {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.ai-card__header p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.ai-card__content {
  padding: 24px;
}

.form-item {
  margin-bottom: 20px;
}

.form-item:last-child {
  margin-bottom: 0;
}

.form-item label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #e31e24;
}

.btn-primary {
  margin-top: 16px;
  padding: 10px 24px;
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

.toggle-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}

.toggle-item:last-child {
  border-bottom: none;
}

.toggle-item span {
  font-size: 14px;
  color: #333;
}

.toggle {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

.toggle input:checked + .toggle-slider {
  background-color: #e31e24;
}

.toggle input:checked + .toggle-slider:before {
  transform: translateX(20px);
}
</style>
