<template>
  <div class="practice-achievement">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="page-title">
        <h2>"习思想的伟大实践"融入成果</h2>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-left: 8px;">
          <path d="M12 5.33333L6.66667 10.6667L4 8" stroke="#999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <p class="page-desc">配置核心文稿内容</p>
    </div>

    <!-- 编辑表单 -->
    <div class="content-editor">
      <div class="form-group">
        <label>核心文稿 <span class="required">*</span></label>
        <textarea
          v-model="content"
          rows="20"
          placeholder="请输入核心文稿内容（纯文本）"
          class="form-textarea"
        ></textarea>
      </div>

      <div class="form-actions">
        <button class="btn-cancel" @click="handleCancel" :disabled="loading">取消</button>
        <button class="btn-save" @click="handleSave" :disabled="loading">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M11.6667 6.33333V11.6667C11.6667 12.0203 11.5262 12.3594 11.2762 12.6095C11.0261 12.8595 10.687 13 10.3333 13H3.66667C3.31304 13 2.97391 12.8595 2.72386 12.6095C2.47381 12.3594 2.33333 12.0203 2.33333 11.6667V2.33333C2.33333 1.97971 2.47381 1.64057 2.72386 1.39052C2.97391 1.14048 3.31304 1 3.66667 1H9L11.6667 3.66667V6.33333Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.66667 13V8.33333H4.33333V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ loading ? '保存中...' : '保存' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { editCoreText } from '@/api/resource'

// 内容数据
const content = ref('')
const loading = ref(false)
const originalContent = ref('')

// 加载已保存的内容
onMounted(() => {
  // TODO: 如果需要从后端加载已有内容，可以添加对应的API
  const saved = localStorage.getItem('practice_achievement_content')
  if (saved) {
    content.value = saved
    originalContent.value = saved
  }
})

// 取消操作
const handleCancel = () => {
  if (content.value !== originalContent.value && confirm('确定要取消吗？未保存的更改将丢失。')) {
    content.value = originalContent.value
  }
}

// 保存操作
const handleSave = async () => {
  if (!content.value.trim()) {
    alert('请输入核心文稿内容')
    return
  }

  try {
    loading.value = true
    await editCoreText(content.value)
    
    // 保存成功后更新本地备份和原始内容
    localStorage.setItem('practice_achievement_content', content.value)
    originalContent.value = content.value
    
    alert('保存成功！')
  } catch (error: any) {
    console.error('保存失败:', error)
    alert(error.message || '保存失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.practice-achievement {
  max-width: 1400px;
}

/* 页面标题 */
.page-header {
  margin-bottom: 24px;
}

.page-title {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.page-title h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 400;
  color: #e31e24;
}

.page-desc {
  margin: 0;
  font-size: 14px;
  color: #666;
}

/* 编辑器 */
.content-editor {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.form-group {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.required {
  color: #ff4d4f;
}

.form-textarea {
  width: 100%;
  min-height: 500px;
  padding: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  line-height: 1.8;
  resize: vertical;
  transition: border-color 0.3s;
}

.form-textarea:focus {
  outline: none;
  border-color: #e31e24;
  box-shadow: 0 0 0 2px rgba(227, 30, 36, 0.1);
}

.form-textarea::placeholder {
  color: #bfbfbf;
}

.form-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
}

.btn-cancel,
.btn-save {
  padding: 10px 24px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-cancel {
  background: white;
  color: #333;
  border: 1px solid #d9d9d9;
}

.btn-cancel:hover {
  border-color: #e31e24;
  color: #e31e24;
}

.btn-save {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #e31e24;
  color: white;
  border: none;
}

.btn-save:hover {
  background: #c71b20;
}

.btn-save:disabled,
.btn-cancel:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

