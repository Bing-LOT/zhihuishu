/**
 * 请求处理 Hook
 */

import { ref } from 'vue'

/**
 * 请求状态
 */
export interface RequestState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

/**
 * 请求 Hook
 * @param requestFn 请求函数
 */
export function useRequest<T>(requestFn: (...args: any[]) => Promise<T>) {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  /**
   * 执行请求
   * @param args 请求参数
   */
  async function run(...args: any[]): Promise<T | null> {
    // TODO: 实现请求执行逻辑
    loading.value = true
    error.value = null
    
    try {
      const result = await requestFn(...args)
      data.value = result
      return result
    } catch (err) {
      error.value = err as Error
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * 重置状态
   */
  function reset() {
    // TODO: 实现重置状态逻辑
    data.value = null
    loading.value = false
    error.value = null
  }

  return {
    data,
    loading,
    error,
    run,
    reset
  }
}

