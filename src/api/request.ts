/**
 * Axios 请求实例配置
 */

import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { ApiResponse } from '@/types'
import { useUserStore } from '@/stores/user'

// API基础地址配置
// 开发服务器（npm run dev）：空字符串（使用相对路径，通过 Vite 代理转发）
// 打包构建（npm run build 或 build:test）：拼接完整的API地址
const API_BASE_URL = import.meta.env.DEV
  ? '' // 开发服务器使用空字符串，走 Vite 代理
  : `${import.meta.env.VITE_APP_BASE_URL_DEV || 'https://dszk.fzu.edu.cn/'}${import.meta.env.VITE_APP_BASE_API || 'dszk-api'}` // 打包后使用完整地址

// 创建 Axios 实例
const request: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000
  // 不要在这里设置默认Content-Type，让axios根据data类型自动设置
})

console.log('================== API配置 ==================')
console.log('当前模式:', import.meta.env.MODE)
console.log('是否开发服务器 (DEV):', import.meta.env.DEV)
console.log('API Base URL:', API_BASE_URL || '(空，使用 Vite 代理)')
console.log('BASE_URL_DEV:', import.meta.env.VITE_APP_BASE_URL_DEV || 'https://dszk.fzu.edu.cn/')
console.log('BASE_API:', import.meta.env.VITE_APP_BASE_API || 'dszk-api')
if (!import.meta.env.DEV) {
  console.log('✅ 打包模式 - 完整API地址:', API_BASE_URL)
} else {
  console.log('🔧 开发服务器 - 使用 Vite 代理')
}
console.log('=============================================')

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    
    // 添加 AuthToken 到请求头
    if (userStore.authToken) {
      config.headers['AuthToken'] = userStore.authToken
    }
    
    console.log('========== 请求拦截器 ==========')
    console.log('URL:', config.url)
    console.log('Method:', config.method)
    console.log('Data类型:', config.data?.constructor?.name)
    console.log('是否为FormData:', config.data instanceof FormData)
    
    // 🔑 关键：如果是FormData，确保不覆盖Content-Type
    if (config.data instanceof FormData) {
      console.log('✅ 检测到FormData，删除Content-Type让axios自动处理')
      // 删除可能存在的Content-Type设置
      delete config.headers['Content-Type']
    } else {
      // 非FormData请求，设置JSON
      if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json'
      }
    }
    
    console.log('最终Content-Type:', config.headers['Content-Type'] || 'axios自动设置')
    console.log('AuthToken:', userStore.authToken)
    console.log('==============================')
    
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
    console.log('========== API 响应 ==========')
    console.log('URL:', response.config.url)
    console.log('HTTP Status:', response.status)
    console.log('响应数据完整结构:', response.data)
    console.log('=============================')
    
    // 处理响应数据
    const { code, data, msg, ssoLoginUrl } = response.data as any
    
    console.log('解析后 - code:', code, 'msg:', msg)
    
    // 处理登录状态失效
    if (code === 501) {
      console.warn('⚠️ 登录状态已过期 (code 501):', msg)
      
      // 清除过期的用户信息
      const userStore = useUserStore()
      userStore.token = ''
      userStore.refreshToken = ''
      userStore.user = null
      
      // 只在生产环境才跳转到 SSO 登录页面
      if (!import.meta.env.DEV) {
        if (ssoLoginUrl) {
          console.log('🔄 生产环境 - 跳转到 SSO 登录:', ssoLoginUrl)
          window.location.href = ssoLoginUrl
        } else {
          console.error('❌ 未提供 ssoLoginUrl，无法跳转')
        }
      } else {
        console.log('🔧 开发环境 - 跳过 SSO 登录跳转')
        if (ssoLoginUrl) {
          console.log('SSO 登录地址:', ssoLoginUrl)
        }
      }
      
      return Promise.reject(new Error(msg || '登录状态已过期'))
    }
    
    if (code === 200 || code === 0) {
      console.log('✅ API响应成功:', msg || '操作成功')
      return data
    } else if (code === undefined) {
      // 如果 code 不存在，可能整个 response.data 就是数据本身
      console.warn('⚠️ 响应数据中没有 code 字段，直接返回整个 response.data')
      return response.data
    } else {
      // 业务错误
      console.error('❌ API业务错误:', msg || '操作失败', 'code:', code)
      return Promise.reject(new Error(msg || '操作失败'))
    }
  },
  (error) => {
    // 网络错误或HTTP错误
    console.error('API请求失败:', error)
    
    if (error.response) {
      const status = error.response.status
      const data = error.response.data
      const msg = data?.msg || error.message
      const code = data?.code
      
      console.error(`HTTP ${status}:`, msg, 'code:', code)
      
      // 处理业务错误码 501 (Token过期)
      if (code === 501) {
        console.warn('⚠️ 登录状态已过期 (code 501):', msg)
        
        // 清除过期的用户信息
        const userStore = useUserStore()
        userStore.token = ''
        userStore.refreshToken = ''
        userStore.user = null
        
        // 只在生产环境才跳转到 SSO 登录页面
        if (!import.meta.env.DEV) {
          if (data?.ssoLoginUrl) {
            console.log('🔄 生产环境 - 跳转到 SSO 登录:', data.ssoLoginUrl)
            window.location.href = data.ssoLoginUrl
          } else {
            console.error('❌ 未提供 ssoLoginUrl，无法跳转')
          }
        } else {
          console.log('🔧 开发环境 - 跳过 SSO 登录跳转')
          if (data?.ssoLoginUrl) {
            console.log('SSO 登录地址:', data.ssoLoginUrl)
          }
        }
      }
      
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

