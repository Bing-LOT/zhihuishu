/**
 * 分页处理 Hook
 */

import { ref, computed } from 'vue'
import type { PaginationParams } from '@/types'

/**
 * 分页配置
 */
export interface PaginationConfig {
  page?: number
  pageSize?: number
  pageSizes?: number[]
}

/**
 * 分页 Hook
 * @param config 分页配置
 */
export function usePagination(config: PaginationConfig = {}) {
  const page = ref(config.page || 1)
  const pageSize = ref(config.pageSize || 10)
  const total = ref(0)
  const pageSizes = ref(config.pageSizes || [10, 20, 50, 100])

  // 计算总页数
  const totalPages = computed(() => {
    return Math.ceil(total.value / pageSize.value)
  })

  // 计算是否有上一页
  const hasPrev = computed(() => page.value > 1)

  // 计算是否有下一页
  const hasNext = computed(() => page.value < totalPages.value)

  /**
   * 获取分页参数
   */
  function getParams(): PaginationParams {
    // TODO: 实现获取分页参数逻辑
    return {
      page: page.value,
      pageSize: pageSize.value
    }
  }

  /**
   * 设置总数
   * @param value 总数
   */
  function setTotal(value: number) {
    // TODO: 实现设置总数逻辑
    total.value = value
  }

  /**
   * 跳转到指定页
   * @param targetPage 目标页码
   */
  function goToPage(targetPage: number) {
    // TODO: 实现跳转页面逻辑
    if (targetPage < 1 || targetPage > totalPages.value) return
    page.value = targetPage
  }

  /**
   * 上一页
   */
  function prevPage() {
    // TODO: 实现上一页逻辑
    if (hasPrev.value) {
      page.value--
    }
  }

  /**
   * 下一页
   */
  function nextPage() {
    // TODO: 实现下一页逻辑
    if (hasNext.value) {
      page.value++
    }
  }

  /**
   * 改变每页数量
   * @param size 每页数量
   */
  function changePageSize(size: number) {
    // TODO: 实现改变每页数量逻辑
    pageSize.value = size
    page.value = 1 // 重置到第一页
  }

  /**
   * 重置分页
   */
  function reset() {
    // TODO: 实现重置分页逻辑
    page.value = 1
    total.value = 0
  }

  return {
    page,
    pageSize,
    total,
    totalPages,
    pageSizes,
    hasPrev,
    hasNext,
    getParams,
    setTotal,
    goToPage,
    prevPage,
    nextPage,
    changePageSize,
    reset
  }
}

