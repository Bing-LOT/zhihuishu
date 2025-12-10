/**
 * 配置状态管理
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * 主题类型
 */
export type Theme = 'light' | 'dark' | 'auto'

/**
 * 语言类型
 */
export type Language = 'zh-CN' | 'en-US'

/**
 * 系统配置接口
 */
export interface SystemConfig {
  /** 网站标题 */
  siteTitle: string
  /** 网站 Logo */
  siteLogo: string
  /** 是否启用 SSO */
  ssoEnabled: boolean
  /** SSO 登录地址 */
  ssoLoginUrl: string
  /** 是否启用 AI 助手 */
  aiEnabled: boolean
  /** 文件上传最大大小（MB） */
  maxUploadSize: number
  /** 允许的文件类型 */
  allowedFileTypes: string[]
}

export const useConfigStore = defineStore('config', () => {
  // State
  const theme = ref<Theme>('light')
  const language = ref<Language>('zh-CN')
  const sidebarCollapsed = ref(false)
  const systemConfig = ref<SystemConfig | null>(null)

  // Getters
  const isDarkMode = computed(() => {
    if (theme.value === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return theme.value === 'dark'
  })

  // Actions
  
  /**
   * 设置主题
   * @param newTheme 主题
   */
  function setTheme(newTheme: Theme) {
    // TODO: 实现设置主题逻辑
  }

  /**
   * 切换主题
   */
  function toggleTheme() {
    // TODO: 实现切换主题逻辑
  }

  /**
   * 设置语言
   * @param newLanguage 语言
   */
  function setLanguage(newLanguage: Language) {
    // TODO: 实现设置语言逻辑
  }

  /**
   * 切换侧边栏折叠状态
   */
  function toggleSidebar() {
    // TODO: 实现切换侧边栏逻辑
  }

  /**
   * 获取系统配置
   */
  async function fetchSystemConfig() {
    // TODO: 实现获取系统配置逻辑
  }

  /**
   * 更新系统配置
   * @param config 配置对象
   */
  async function updateSystemConfig(config: Partial<SystemConfig>) {
    // TODO: 实现更新系统配置逻辑
  }

  return {
    // State
    theme,
    language,
    sidebarCollapsed,
    systemConfig,
    
    // Getters
    isDarkMode,
    
    // Actions
    setTheme,
    toggleTheme,
    setLanguage,
    toggleSidebar,
    fetchSystemConfig,
    updateSystemConfig
  }
}, {
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'config',
        storage: localStorage,
        paths: ['theme', 'language', 'sidebarCollapsed']
      }
    ]
  }
})

