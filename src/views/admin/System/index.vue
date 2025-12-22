<template>
  <div class="admin-system">
    <div class="page-header">
      <h2>系统配置</h2>
      <p>管理系统基础设置和参数</p>
    </div>

    <div class="system-tabs">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        :class="['system-tab', { 'system-tab--active': currentTab === tab.key }]"
        @click="currentTab = tab.key"
      >
        {{ tab.label }}
      </div>
    </div>

    <div class="system-content">
      <!-- 基础设置 -->
      <div v-if="currentTab === 'basic'" class="content-card">
        <h3>基础设置</h3>
        <div class="form-group">
          <label>网站名称</label>
          <input v-model="config.siteName" type="text" class="form-input" />
        </div>
        <div class="form-group">
          <label>网站描述</label>
          <textarea v-model="config.siteDesc" rows="4" class="form-input"></textarea>
        </div>
        <div class="form-group">
          <label>ICP备案号</label>
          <input v-model="config.icp" type="text" class="form-input" />
        </div>
        <div class="form-group">
          <label>客服邮箱</label>
          <input v-model="config.email" type="email" class="form-input" />
        </div>
        <button class="btn-primary">保存设置</button>
      </div>

      <!-- 用户管理 -->
      <div v-if="currentTab === 'users'" class="content-card">
        <h3>用户管理</h3>
        <div class="user-list">
          <div class="user-item" v-for="user in users" :key="user.id">
            <div class="user-avatar">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15" fill="#e8e8e8"/>
                <path d="M16 16C18.2091 16 20 14.2091 20 12C20 9.79086 18.2091 8 16 8C13.7909 8 12 9.79086 12 12C12 14.2091 13.7909 16 16 16Z" fill="#999"/>
                <path d="M16 18C12.134 18 9 20.134 9 22.8V24H23V22.8C23 20.134 19.866 18 16 18Z" fill="#999"/>
              </svg>
            </div>
            <div class="user-info">
              <h4>{{ user.name }}</h4>
              <p>{{ user.email }}</p>
            </div>
            <div class="user-role">{{ user.role }}</div>
            <div class="user-actions">
              <button class="btn-icon">编辑</button>
              <button class="btn-icon btn-danger">删除</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 权限管理 -->
      <div v-if="currentTab === 'permissions'" class="content-card">
        <h3>权限管理</h3>
        <div class="permission-grid">
          <div class="permission-item" v-for="perm in permissions" :key="perm.key">
            <div class="permission-header">
              <h4>{{ perm.name }}</h4>
              <p>{{ perm.desc }}</p>
            </div>
            <div class="permission-roles">
              <label v-for="role in roles" :key="role.key" class="checkbox-label">
                <input type="checkbox" :checked="perm.roles.includes(role.key)" />
                <span>{{ role.name }}</span>
              </label>
            </div>
          </div>
        </div>
        <button class="btn-primary">保存权限</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentTab = ref('basic')

const tabs = [
  { key: 'basic', label: '基础设置' },
  { key: 'users', label: '用户管理' },
  { key: 'permissions', label: '权限管理' }
]

const config = ref({
  siteName: '大思政课数智化平台',
  siteDesc: '福州大学新时代思政教育平台',
  icp: '闽ICP备05005463号',
  email: 'support@fzu.edu.cn'
})

const users = ref([
  { id: '1', name: '管理员', email: 'admin@fzu.edu.cn', role: '超级管理员' },
  { id: '2', name: '张老师', email: 'zhang@fzu.edu.cn', role: '教师' },
  { id: '3', name: '李老师', email: 'li@fzu.edu.cn', role: '教师' }
])

const roles = [
  { key: 'admin', name: '管理员' },
  { key: 'teacher', name: '教师' },
  { key: 'student', name: '学生' }
]

const permissions = ref([
  {
    key: 'resource_manage',
    name: '资源管理',
    desc: '管理思政资源和课程内容',
    roles: ['admin', 'teacher']
  },
  {
    key: 'question_manage',
    name: '题库管理',
    desc: '管理题库和试卷',
    roles: ['admin', 'teacher']
  },
  {
    key: 'data_view',
    name: '数据分析',
    desc: '查看统计数据',
    roles: ['admin']
  }
])
</script>

<style scoped>
.admin-system {
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

.system-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  background: white;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.system-tab {
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.system-tab:hover {
  background: #f5f5f5;
  color: #333;
}

.system-tab--active {
  background: #e31e24;
  color: white;
}

.system-content {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.content-card h3 {
  margin: 0 0 24px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  padding-bottom: 12px;
  border-bottom: 1px solid #e8e8e8;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
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
  font-family: inherit;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #e31e24;
}

.btn-primary {
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

.user-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #fafafa;
  border-radius: 4px;
}

.user-avatar {
  flex-shrink: 0;
}

.user-info {
  flex: 1;
}

.user-info h4 {
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.user-info p {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.user-role {
  padding: 4px 12px;
  background: #e31e24;
  color: white;
  border-radius: 12px;
  font-size: 12px;
}

.user-actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  padding: 6px 12px;
  background: white;
  color: #666;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-icon:hover {
  border-color: #e31e24;
  color: #e31e24;
}

.btn-danger:hover {
  border-color: #ff4444;
  color: #ff4444;
}

.permission-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.permission-item {
  padding: 20px;
  background: #fafafa;
  border-radius: 4px;
}

.permission-header h4 {
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.permission-header p {
  margin: 0 0 12px;
  font-size: 12px;
  color: #666;
}

.permission-roles {
  display: flex;
  gap: 16px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.checkbox-label input {
  cursor: pointer;
}
</style>
