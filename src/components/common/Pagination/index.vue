<template>
  <div v-if="total > 0" class="pagination">
    <div v-if="showTotal" class="pagination__total">
      共 {{ total }} 条
    </div>

    <div class="pagination__controls">
      <!-- 上一页 -->
      <button
        class="pagination__btn"
        :class="{ 'pagination__btn--disabled': page <= 1 }"
        :disabled="page <= 1"
        @click="handlePageChange(page - 1)"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M7.5 2.5L4 6L7.5 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        上一页
      </button>

      <!-- 页码 -->
      <div class="pagination__pages">
        <button
          v-for="pageNum in pageNumbers"
          :key="pageNum"
          class="pagination__page"
          :class="{ 'pagination__page--active': pageNum === page, 'pagination__page--ellipsis': pageNum === -1 }"
          :disabled="pageNum === -1"
          @click="pageNum !== -1 && handlePageChange(pageNum)"
        >
          {{ pageNum === -1 ? '...' : pageNum }}
        </button>
      </div>

      <!-- 下一页 -->
      <button
        class="pagination__btn"
        :class="{ 'pagination__btn--disabled': page >= totalPages }"
        :disabled="page >= totalPages"
        @click="handlePageChange(page + 1)"
      >
        下一页
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <!-- 每页数量选择器 -->
    <div v-if="showSizeChanger" class="pagination__size-changer">
      <select :value="pageSize" class="pagination__select" @change="handleSizeChange">
        <option v-for="size in pageSizes" :key="size" :value="size">
          {{ size }} 条/页
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PaginationProps, PaginationEmits } from './types'

/**
 * 分页组件
 */
const props = withDefaults(defineProps<PaginationProps>(), {
  pageSizes: () => [10, 20, 50, 100],
  showTotal: true,
  showSizeChanger: true
})

const emit = defineEmits<PaginationEmits>()

// 总页数
const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

// 生成页码数组
const pageNumbers = computed(() => {
  const pages: number[] = []
  const total = totalPages.value
  const current = props.page

  if (total <= 7) {
    // 总页数小于等于7，显示所有页码
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // 总页数大于7，显示省略号
    if (current <= 4) {
      // 当前页在前面
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push(-1) // 省略号
      pages.push(total)
    } else if (current >= total - 3) {
      // 当前页在后面
      pages.push(1)
      pages.push(-1) // 省略号
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      // 当前页在中间
      pages.push(1)
      pages.push(-1) // 省略号
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push(-1) // 省略号
      pages.push(total)
    }
  }

  return pages
})

// 页码改变
const handlePageChange = (newPage: number) => {
  if (newPage >= 1 && newPage <= totalPages.value && newPage !== props.page) {
    emit('pageChange', newPage)
  }
}

// 每页数量改变
const handleSizeChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const newSize = Number(target.value)
  emit('sizeChange', newSize)
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 0;
  font-size: 14px;
}

.pagination__total {
  color: #666;
}

.pagination__controls {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: center;
}

.pagination__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination__btn:hover:not(:disabled) {
  border-color: #e31e24;
  color: #e31e24;
}

.pagination__btn--disabled,
.pagination__btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.pagination__pages {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pagination__page {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination__page:hover:not(:disabled):not(.pagination__page--active) {
  border-color: #e31e24;
  color: #e31e24;
}

.pagination__page--active {
  background: #e31e24;
  border-color: #e31e24;
  color: white;
  cursor: default;
}

.pagination__page--ellipsis {
  border: none;
  cursor: default;
}

.pagination__page--ellipsis:hover {
  border: none;
  color: #333;
}

.pagination__size-changer {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination__select {
  padding: 6px 12px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.pagination__select:hover {
  border-color: #e31e24;
}

.pagination__select:focus {
  outline: none;
  border-color: #e31e24;
}
</style>

