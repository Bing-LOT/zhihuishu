/**
 * API 配置
 */

// API 基础地址配置
export const API_CONFIG = {
  // 开发环境（测试地址）
  development: 'https://dszk.fzu.edu.cn/dszk-api',
  
  // 生产环境
  production: 'http://prod-cn.your-api-server.com',
  
  // 当前环境
  get baseURL() {
    // 优先使用环境变量
    if (import.meta.env.VITE_API_BASE_URL) {
      return import.meta.env.VITE_API_BASE_URL
    }
    
    // 根据开发/生产环境自动选择
    return import.meta.env.MODE === 'production' 
      ? this.production 
      : this.development
  }
}

// 请求超时配置
export const TIMEOUT = 30000

// AuthToken 配置
export const AUTH_TOKEN_KEY = 'AuthToken' // URL参数名
export const AUTH_TOKEN_HEADER = 'AuthToken' // 请求头名称

