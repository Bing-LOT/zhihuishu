/**
 * Axios 请求实例配置
 */

import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { ApiResponse } from '@/types'
import { useUserStore } from '@/stores/user'
import { API_CONFIG, TIMEOUT, AUTH_TOKEN_HEADER } from '@/config/api'

// 创建 Axios 实例
const request: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 打印当前API地址（便于调试）
console.log('API Base URL:', API_CONFIG.baseURL)

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    
    // 添加 AuthToken 到请求头（优先级最高）
    if (userStore.authToken) {
      config.headers[AUTH_TOKEN_HEADER] = userStore.authToken
      console.log('携带 AuthToken:', userStore.authToken)
    }
    
    // 添加普通 Token 到请求头
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
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
    // TODO: 统一处理响应数据
    const { code, data, message } = response.data
    
    if (code === 200 || code === 0) {
      return data
    } else {
      // TODO: 错误处理
      console.error('API Error:', message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // TODO: 统一错误处理
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，跳转登录
          console.error('未授权，请重新登录')
          break
        case 403:
          // 无权限
          console.error('无权限访问')
          break
        case 404:
          // 资源不存在
          console.error('请求的资源不存在')
          break
        case 500:
          // 服务器错误
          console.error('服务器错误')
          break
        default:
          console.error('请求失败')
      }
    }
    return Promise.reject(error)
  }
)

export default request

