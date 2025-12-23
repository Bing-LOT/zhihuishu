/**
 * Axios 请求实例配置
 */

import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { ApiResponse } from '@/types'
import { useUserStore } from '@/stores/user'

// API基础地址配置
// 开发环境：使用 /api 走Vite代理（避免CORS问题）
// 生产环境：使用完整URL
const API_BASE_URL = import.meta.env.MODE === 'production' 
  ? (import.meta.env.VITE_API_BASE_URL || 'http://prod-cn.your-api-server.com')
  : '/api'

// 创建 Axios 实例
const request: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

console.log('当前环境:', import.meta.env.MODE)
console.log('API Base URL:', API_BASE_URL)
console.log('实际请求地址: 开发环境通过Vite代理到 https://dszk.fzu.edu.cn/dszk-api')

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    
    // 添加 AuthToken 到请求头
    if (userStore.authToken) {
      config.headers['AuthToken'] = userStore.authToken
      console.log('发送请求:', config.method?.toUpperCase(), config.url)
      console.log('携带 AuthToken:', userStore.authToken)
    }
    
    return config
  },
  (error) => {
    console.error('请求拦截器错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    console.log('响应:', response.config.url, response.status)
    
    // 处理响应数据
    const { code, data, msg } = response.data as any
    
    if (code === 200 || code === 0) {
      console.log('API响应成功:', msg || '操作成功')
      return data
    } else {
      // 业务错误
      console.error('API业务错误:', msg || '操作失败', 'code:', code)
      return Promise.reject(new Error(msg || '操作失败'))
    }
  },
  (error) => {
    // 网络错误或HTTP错误
    console.error('API请求失败:', error)
    
    if (error.response) {
      const status = error.response.status
      const msg = error.response.data?.msg || error.message
      
      console.error(`HTTP ${status}:`, msg)
      
      switch (status) {
        case 401:
          console.error('未授权，请重新登录')
          break
        case 403:
          console.error('无权限访问')
          break
        case 404:
          console.error('请求的资源不存在')
          break
        case 500:
          console.error('服务器内部错误')
          break
      }
    } else if (error.request) {
      console.error('网络错误，无法连接到服务器')
    }
    
    return Promise.reject(error)
  }
)

export default request

